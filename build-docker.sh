#!/bin/bash

# Build script for Tamy Shopping List App Docker

set -e

echo "🚀 Building Tamy Shopping List App Docker Image..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
IMAGE_NAME="tamy-shoppinglist-app"
TAG="latest"
PORT="3000"
PUSH_TO_REGISTRY=false
REGISTRY=""

# Function to show usage
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -t, --tag TAG           Set image tag (default: latest)"
    echo "  -p, --port PORT         Set port mapping (default: 3000)"
    echo "  -r, --registry REGISTRY Push to registry after build"
    echo "  --no-cache              Build without cache"
    echo "  --push                  Push to registry after build"
    echo "  --run                   Run container after build"
    echo "  --logs                  Show logs after running"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                      # Simple build"
    echo "  $0 --run               # Build and run"
    echo "  $0 -t v1.0 --push      # Build, tag as v1.0 and push"
    echo "  $0 -p 8080 --run       # Build and run on port 8080"
}

# Parse command line arguments
RUN_AFTER_BUILD=false
SHOW_LOGS=false
NO_CACHE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--tag)
            TAG="$2"
            shift 2
            ;;
        -p|--port)
            PORT="$2"
            shift 2
            ;;
        -r|--registry)
            REGISTRY="$2"
            PUSH_TO_REGISTRY=true
            shift 2
            ;;
        --no-cache)
            NO_CACHE=true
            shift
            ;;
        --push)
            PUSH_TO_REGISTRY=true
            shift
            ;;
        --run)
            RUN_AFTER_BUILD=true
            shift
            ;;
        --logs)
            SHOW_LOGS=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Build command
BUILD_CMD="docker build -t ${IMAGE_NAME}:${TAG}"

if [ "$NO_CACHE" = true ]; then
    BUILD_CMD="$BUILD_CMD --no-cache"
fi

BUILD_CMD="$BUILD_CMD ."

echo -e "${YELLOW}📦 Building Docker image...${NC}"
echo "Image: ${IMAGE_NAME}:${TAG}"
echo "Command: ${BUILD_CMD}"
echo ""

# Execute build
if eval $BUILD_CMD; then
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

# Push to registry if requested
if [ "$PUSH_TO_REGISTRY" = true ]; then
    if [ -n "$REGISTRY" ]; then
        FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:${TAG}"
        echo -e "${YELLOW}🏷️  Tagging image for registry...${NC}"
        docker tag "${IMAGE_NAME}:${TAG}" "$FULL_IMAGE_NAME"

        echo -e "${YELLOW}📤 Pushing to registry...${NC}"
        if docker push "$FULL_IMAGE_NAME"; then
            echo -e "${GREEN}✅ Image pushed successfully!${NC}"
        else
            echo -e "${RED}❌ Failed to push image!${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}📤 Pushing to Docker Hub...${NC}"
        if docker push "${IMAGE_NAME}:${TAG}"; then
            echo -e "${GREEN}✅ Image pushed successfully!${NC}"
        else
            echo -e "${RED}❌ Failed to push image!${NC}"
            exit 1
        fi
    fi
fi

# Run container if requested
if [ "$RUN_AFTER_BUILD" = true ]; then
    echo -e "${YELLOW}🚀 Starting container...${NC}"

    # Stop existing container if running
    if docker ps -q -f name=tamy-app | grep -q .; then
        echo -e "${YELLOW}⏹️  Stopping existing container...${NC}"
        docker stop tamy-app
        docker rm tamy-app
    fi

    # Run new container
    RUN_CMD="docker run -d -p ${PORT}:80 --name tamy-app ${IMAGE_NAME}:${TAG}"

    if eval $RUN_CMD; then
        echo -e "${GREEN}✅ Container started successfully!${NC}"
        echo -e "${GREEN}🌐 Application available at: http://localhost:${PORT}${NC}"

        # Show logs if requested
        if [ "$SHOW_LOGS" = true ]; then
            echo -e "${YELLOW}📋 Container logs:${NC}"
            docker logs -f tamy-app
        fi
    else
        echo -e "${RED}❌ Failed to start container!${NC}"
        exit 1
    fi
fi

# Show final information
echo ""
echo -e "${GREEN}🎉 All done!${NC}"
echo -e "${GREEN}Image: ${IMAGE_NAME}:${TAG}${NC}"

if [ "$RUN_AFTER_BUILD" = true ]; then
    echo -e "${GREEN}URL: http://localhost:${PORT}${NC}"
    echo ""
    echo "Useful commands:"
    echo "  docker logs tamy-app           # View logs"
    echo "  docker stop tamy-app           # Stop container"
    echo "  docker start tamy-app          # Start container"
    echo "  docker rm tamy-app             # Remove container"
fi

echo ""
echo -e "${YELLOW}Docker images:${NC}"
docker images | grep $IMAGE_NAME || echo "No images found"
