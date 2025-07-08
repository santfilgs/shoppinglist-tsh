# Docker Setup - Tamy Shopping List App

Este documento explica como executar a aplicação Tamy Shopping List usando Docker e nginx.

## Pré-requisitos

- Docker instalado
- Docker Compose instalado (opcional, mas recomendado)

## Estrutura dos Arquivos Docker

- `Dockerfile` - Configuração multi-stage para build e produção
- `nginx.conf` - Configuração otimizada do nginx para SPA React
- `docker-compose.yml` - Orquestração dos containers
- `.dockerignore` - Arquivos ignorados no build

## Como executar

### Opção 1: Usando Docker Compose (Recomendado)

```bash
# Build e start da aplicação
docker-compose up --build

# Executar em background
docker-compose up -d --build

# Parar os containers
docker-compose down
```

A aplicação estará disponível em: http://localhost:3000

### Opção 2: Usando Docker diretamente

```bash
# Build da imagem
docker build -t tamy-shoppinglist-app .

# Executar o container
docker run -p 3000:80 tamy-shoppinglist-app

# Executar em background
docker run -d -p 3000:80 --name tamy-app tamy-shoppinglist-app
```

## Configuração do Nginx

O nginx está configurado para:

- ✅ Servir arquivos estáticos com cache otimizado
- ✅ Suporte a React Router (SPA routing)
- ✅ Compressão gzip habilitada
- ✅ Headers de segurança
- ✅ Redirecionamento 404 para index.html

## Comandos Úteis

```bash
# Ver logs do container
docker-compose logs -f tamy-shoppinglist-app

# Entrar no container
docker-compose exec tamy-shoppinglist-app sh

# Rebuild sem cache
docker-compose build --no-cache

# Remover volumes e imagens
docker-compose down -v --rmi all

# Ver status dos containers
docker-compose ps
```

## Customização

### Alterar porta

Edite o arquivo `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Mudar de 3000 para 8080
```

### Variáveis de ambiente

Adicione no `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - REACT_APP_API_URL=https://api.example.com
```

### Volumes persistentes

Para logs persistentes:

```yaml
volumes:
  - nginx-logs:/var/log/nginx
```

## Produção

Para deploy em produção:

1. Configure um proxy reverso (nginx, traefik, etc.)
2. Use HTTPS com certificados SSL
3. Configure monitoramento e logs
4. Considere usar um registry de imagens

### Exemplo com proxy reverso:

```yaml
services:
  nginx-proxy:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx-proxy.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - tamy-shoppinglist-app
```

## Troubleshooting

### Problemas comuns:

1. **Porta já em uso**: Altere a porta no docker-compose.yml
2. **Build falha**: Verifique se o node_modules está no .dockerignore
3. **404 em rotas**: Verifique se o nginx.conf está correto
4. **Arquivos não carregam**: Verifique as permissões e o MIME types

### Logs úteis:

```bash
# Logs do nginx
docker-compose exec tamy-shoppinglist-app tail -f /var/log/nginx/access.log

# Logs de erro
docker-compose exec tamy-shoppinglist-app tail -f /var/log/nginx/error.log
```

## Performance

A configuração inclui:

- Compressão gzip para todos os assets
- Cache de 1 ano para arquivos estáticos
- Headers de segurança
- Configuração otimizada do worker_connections

## Segurança

Headers de segurança incluídos:

- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy

Para produção, considere adicionar:
- Rate limiting
- SSL/TLS
- Firewall rules
- Monitoramento de segurança