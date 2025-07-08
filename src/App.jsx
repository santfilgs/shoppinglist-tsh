import React, { useState, useEffect } from "react";

function App() {
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [customItems, setCustomItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [customItemName, setCustomItemName] = useState("");
  const [customItemQuantity, setCustomItemQuantity] = useState("");
  const [editItemData, setEditItemData] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("fas fa-shopping-bag");
  const [newCategoryColor, setNewCategoryColor] = useState("gray");
  const [savedLists, setSavedLists] = useState([]);
  const [categories, setCategories] = useState({
    hortifruti: {
      name: "Hortifruti",
      icon: "fas fa-apple-alt",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      textColor: "text-green-600",
      items: [
        { name: "Bananas", quantity: "2 kg" },
        { name: "Maçãs", quantity: "1.5 kg" },
        { name: "Tomates", quantity: "2 kg" },
        { name: "Cebolas", quantity: "1 kg" },
        { name: "Batatas", quantity: "3 kg" },
        { name: "Cenouras", quantity: "1 kg" },
        { name: "Alface", quantity: "4 pés" },
        { name: "Limões", quantity: "1 kg" },
      ],
    },
    acougue: {
      name: "Açougue",
      icon: "fas fa-drumstick-bite",
      color: "red",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      textColor: "text-red-600",
      items: [
        { name: "Frango inteiro", quantity: "2 kg" },
        { name: "Carne moída", quantity: "1.5 kg" },
        { name: "Bisteca suína", quantity: "1 kg" },
        { name: "Linguiça calabresa", quantity: "500g" },
        { name: "Ovos", quantity: "30 unid" },
      ],
    },
    mercearia: {
      name: "Mercearia",
      icon: "fas fa-shopping-basket",
      color: "yellow",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-600",
      textColor: "text-yellow-600",
      items: [
        { name: "Arroz", quantity: "5 kg" },
        { name: "Feijão", quantity: "2 kg" },
        { name: "Macarrão", quantity: "3 pacotes" },
        { name: "Óleo de soja", quantity: "2 litros" },
        { name: "Açúcar", quantity: "2 kg" },
        { name: "Sal", quantity: "1 kg" },
        { name: "Café", quantity: "1 kg" },
        { name: "Farinha de trigo", quantity: "1 kg" },
      ],
    },
    laticinios: {
      name: "Laticínios",
      icon: "fas fa-cheese",
      color: "amber",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-500",
      textColor: "text-amber-600",
      items: [
        { name: "Leite integral", quantity: "8 litros" },
        { name: "Queijo mussarela", quantity: "500g" },
        { name: "Iogurte natural", quantity: "4 potes" },
        { name: "Manteiga", quantity: "500g" },
        { name: "Requeijão", quantity: "2 potes" },
      ],
    },
    limpeza: {
      name: "Produtos de Limpeza",
      icon: "fas fa-spray-can",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      textColor: "text-blue-600",
      items: [
        { name: "Detergente", quantity: "4 unid" },
        { name: "Sabão em pó", quantity: "2 kg" },
        { name: "Amaciante", quantity: "2 litros" },
        { name: "Desinfetante", quantity: "2 litros" },
        { name: "Papel higiênico", quantity: "12 rolos" },
        { name: "Papel toalha", quantity: "6 rolos" },
      ],
    },
    higiene: {
      name: "Higiene Pessoal",
      icon: "fas fa-pump-soap",
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
      textColor: "text-orange-600",
      items: [
        { name: "Shampoo", quantity: "2 frascos" },
        { name: "Condicionador", quantity: "2 frascos" },
        { name: "Sabonete", quantity: "6 unid" },
        { name: "Pasta de dente", quantity: "3 tubos" },
        { name: "Desodorante", quantity: "2 unid" },
        { name: "Shampoo infantil", quantity: "1 frasco" },
      ],
    },
    petshop: {
      name: "Petshop",
      icon: "fas fa-paw",
      color: "purple",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
      textColor: "text-purple-600",
      items: [
        { name: "Ração para gatos", quantity: "3 kg" },
        { name: "Ração para cães", quantity: "15 kg" },
        { name: "Areia sanitária", quantity: "3 pacotes" },
        { name: "Sachês para gatos", quantity: "24 unid" },
        { name: "Petiscos para cães", quantity: "2 pacotes" },
      ],
    },
    bebidas: {
      name: "Bebidas",
      icon: "fas fa-glass-water",
      color: "teal",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-500",
      textColor: "text-teal-600",
      items: [
        { name: "Água mineral", quantity: "10 garrafas" },
        { name: "Suco de laranja", quantity: "2 litros" },
        { name: "Refrigerante", quantity: "4 garrafas" },
        { name: "Cerveja", quantity: "12 latas" },
        { name: "Chá", quantity: "2 caixas" },
      ],
    },
  });

  // Cores disponíveis para categorias
  const colorOptions = [
    {
      name: "green",
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-600",
      display: "Verde",
    },
    {
      name: "red",
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-600",
      display: "Vermelho",
    },
    {
      name: "blue",
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-600",
      display: "Azul",
    },
    {
      name: "yellow",
      bg: "bg-yellow-50",
      border: "border-yellow-600",
      text: "text-yellow-600",
      display: "Amarelo",
    },
    {
      name: "purple",
      bg: "bg-purple-50",
      border: "border-purple-500",
      text: "text-purple-600",
      display: "Roxo",
    },
    {
      name: "orange",
      bg: "bg-orange-50",
      border: "border-orange-500",
      text: "text-orange-600",
      display: "Laranja",
    },
    {
      name: "teal",
      bg: "bg-teal-50",
      border: "border-teal-500",
      text: "text-teal-600",
      display: "Verde-azulado",
    },
    {
      name: "pink",
      bg: "bg-pink-50",
      border: "border-pink-500",
      text: "text-pink-600",
      display: "Rosa",
    },
    {
      name: "indigo",
      bg: "bg-indigo-50",
      border: "border-indigo-500",
      text: "text-indigo-600",
      display: "Índigo",
    },
    {
      name: "gray",
      bg: "bg-gray-50",
      border: "border-gray-500",
      text: "text-gray-600",
      display: "Cinza",
    },
  ];

  // Ícones disponíveis
  const iconOptions = [
    "fas fa-shopping-bag",
    "fas fa-apple-alt",
    "fas fa-bread-slice",
    "fas fa-fish",
    "fas fa-cheese",
    "fas fa-wine-bottle",
    "fas fa-spray-can",
    "fas fa-pump-soap",
    "fas fa-paw",
    "fas fa-baby",
    "fas fa-home",
    "fas fa-car",
    "fas fa-heart",
    "fas fa-star",
    "fas fa-gift",
    "fas fa-coffee",
    "fas fa-pizza-slice",
  ];

  // Calcular total de itens
  const getTotalItems = () => {
    let total = 0;
    Object.values(categories).forEach((category) => {
      total += category.items.length;
    });
    Object.values(customItems).forEach((items) => {
      total += items.length;
    });
    return total;
  };

  // Toggle item checkbox
  const toggleItem = (categoryKey, itemIndex, isCustom = false) => {
    const itemId = `${categoryKey}-${itemIndex}-${isCustom}`;
    const newCheckedItems = new Set(checkedItems);

    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }

    setCheckedItems(newCheckedItems);
  };

  // Adicionar item customizado
  const addCustomItem = (categoryKey) => {
    setCurrentCategory(categoryKey);
    setIsModalOpen(true);
  };

  const addCustomItemToList = () => {
    if (!customItemName.trim() || !customItemQuantity.trim()) {
      alert("Por favor, preencha o nome e a quantidade do produto.");
      return;
    }

    const newCustomItems = { ...customItems };
    if (!newCustomItems[currentCategory]) {
      newCustomItems[currentCategory] = [];
    }

    newCustomItems[currentCategory].push({
      name: customItemName.trim(),
      quantity: customItemQuantity.trim(),
    });

    setCustomItems(newCustomItems);
    closeModal();
  };

  // Editar item
  const editItem = (categoryKey, itemIndex, isCustom = false) => {
    let item;
    if (isCustom) {
      item = customItems[categoryKey]?.[itemIndex];
    } else {
      item = categories[categoryKey]?.items[itemIndex];
    }

    if (item) {
      setEditItemData({
        categoryKey,
        itemIndex,
        isCustom,
        name: item.name,
        quantity: item.quantity,
      });
      setIsEditModalOpen(true);
    }
  };

  const saveEditItem = () => {
    if (!editItemData.name.trim() || !editItemData.quantity.trim()) {
      alert("Por favor, preencha o nome e a quantidade do produto.");
      return;
    }

    if (editItemData.isCustom) {
      const newCustomItems = { ...customItems };
      newCustomItems[editItemData.categoryKey][editItemData.itemIndex] = {
        name: editItemData.name.trim(),
        quantity: editItemData.quantity.trim(),
      };
      setCustomItems(newCustomItems);
    } else {
      const newCategories = { ...categories };
      newCategories[editItemData.categoryKey].items[editItemData.itemIndex] = {
        name: editItemData.name.trim(),
        quantity: editItemData.quantity.trim(),
      };
      setCategories(newCategories);
    }

    setIsEditModalOpen(false);
    setEditItemData(null);
  };

  // Remover item - versão com debug completo
  const removeItem = (categoryKey, itemIndex, isCustom = false) => {
    console.log("removeItem chamado:", { categoryKey, itemIndex, isCustom });
    console.log("Estado atual categories:", categories);
    console.log("Estado atual customItems:", customItems);
    console.log(
      "Item específico:",
      categories[categoryKey]?.items?.[itemIndex],
    );

    if (!window.confirm("Tem certeza que deseja remover este item?")) {
      return;
    }

    try {
      if (isCustom) {
        // Remover item customizado
        console.log("Removendo item customizado...");
        const newCustomItems = { ...customItems };
        if (
          newCustomItems[categoryKey] &&
          Array.isArray(newCustomItems[categoryKey]) &&
          newCustomItems[categoryKey][itemIndex]
        ) {
          console.log("Item encontrado, removendo...");
          newCustomItems[categoryKey].splice(itemIndex, 1);
          if (newCustomItems[categoryKey].length === 0) {
            delete newCustomItems[categoryKey];
          }
          setCustomItems(newCustomItems);
          console.log("Item customizado removido com sucesso");
        } else {
          console.log("Item customizado não encontrado");
        }
      } else {
        // Remover item padrão
        console.log("Removendo item padrão...");
        console.log("Categoria encontrada:", categories[categoryKey]);
        console.log("Array de itens:", categories[categoryKey]?.items);
        console.log(
          "Item no índice:",
          categories[categoryKey]?.items?.[itemIndex],
        );

        if (
          categories[categoryKey] &&
          categories[categoryKey].items &&
          Array.isArray(categories[categoryKey].items) &&
          categories[categoryKey].items[itemIndex]
        ) {
          console.log("Item encontrado, removendo...");
          const newCategories = { ...categories };
          newCategories[categoryKey] = { ...newCategories[categoryKey] };
          newCategories[categoryKey].items = [
            ...newCategories[categoryKey].items,
          ];
          newCategories[categoryKey].items.splice(itemIndex, 1);

          console.log("Nova lista de itens:", newCategories[categoryKey].items);
          setCategories(newCategories);
          console.log("Item padrão removido com sucesso");
        } else {
          console.log("Item padrão não encontrado ou estrutura inválida");
        }
      }

      // Limpar do checkedItems
      const itemId = `${categoryKey}-${itemIndex}-${isCustom}`;
      console.log("Removendo do checkedItems:", itemId);
      const newCheckedItems = new Set(checkedItems);
      newCheckedItems.delete(itemId);
      setCheckedItems(newCheckedItems);
      console.log("Item removido do checkedItems");
    } catch (error) {
      console.error("Erro ao remover item:", error);
      alert("Erro ao remover item: " + error.message);
    }
  };

  // Adicionar nova categoria
  const addNewCategory = () => {
    if (!newCategoryName.trim()) {
      alert("Por favor, digite o nome da categoria.");
      return;
    }

    const categoryKey = newCategoryName.toLowerCase().replace(/\s+/g, "_");
    const colorConfig = colorOptions.find((c) => c.name === newCategoryColor);

    const newCategories = { ...categories };
    newCategories[categoryKey] = {
      name: newCategoryName.trim(),
      icon: newCategoryIcon,
      color: newCategoryColor,
      bgColor: colorConfig.bg,
      borderColor: colorConfig.border,
      textColor: colorConfig.text,
      items: [],
    };

    setCategories(newCategories);
    setIsCategoryModalOpen(false);
    setNewCategoryName("");
    setNewCategoryIcon("fas fa-shopping-bag");
    setNewCategoryColor("gray");
  };

  // Remover categoria
  const removeCategory = (categoryKey) => {
    if (
      window.confirm(
        "Tem certeza que deseja remover esta categoria? Todos os itens serão perdidos.",
      )
    ) {
      const newCategories = { ...categories };
      delete newCategories[categoryKey];
      setCategories(newCategories);

      // Remover itens customizados da categoria
      const newCustomItems = { ...customItems };
      delete newCustomItems[categoryKey];
      setCustomItems(newCustomItems);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCustomItemName("");
    setCustomItemQuantity("");
    setCurrentCategory("");
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditItemData(null);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setNewCategoryName("");
    setNewCategoryIcon("fas fa-shopping-bag");
    setNewCategoryColor("gray");
  };

  // Limpar todos os checkboxes
  const clearAll = () => {
    if (window.confirm("Tem certeza que deseja desmarcar todos os itens?")) {
      setCheckedItems(new Set());
    }
  };

  // Função de impressão
  const handlePrint = () => {
    window.print();
  };

  // Salvar lista (usando localStorage)
  const saveList = () => {
    try {
      const listData = {
        checkedItems: Array.from(checkedItems),
        customItems: customItems,
        categories: categories,
        createdAt: new Date().toISOString(),
        totalItems: getTotalItems(),
        checkedCount: checkedItems.size,
        id: Date.now(),
      };

      const existingLists = JSON.parse(
        localStorage.getItem("shoppingLists") || "[]",
      );
      existingLists.push(listData);
      localStorage.setItem("shoppingLists", JSON.stringify(existingLists));

      alert("Lista salva com sucesso!");
      loadSavedLists();
    } catch (error) {
      console.error("Erro ao salvar lista:", error);
      alert("Erro ao salvar lista.");
    }
  };

  // Carregar listas salvas
  const loadSavedLists = () => {
    try {
      const existingLists = JSON.parse(
        localStorage.getItem("shoppingLists") || "[]",
      );
      setSavedLists(existingLists);
    } catch (error) {
      console.error("Erro ao carregar listas:", error);
    }
  };

  // Carregar lista específica
  const loadList = (listData) => {
    setCheckedItems(new Set(listData.checkedItems));
    setCustomItems(listData.customItems);
    if (listData.categories) {
      setCategories(listData.categories);
    }
    alert("Lista carregada com sucesso!");
  };

  // Deletar lista salva
  const deleteList = (listId) => {
    if (window.confirm("Tem certeza que deseja deletar esta lista?")) {
      try {
        const existingLists = JSON.parse(
          localStorage.getItem("shoppingLists") || "[]",
        );
        const filteredLists = existingLists.filter(
          (list) => list.id !== listId,
        );
        localStorage.setItem("shoppingLists", JSON.stringify(filteredLists));
        loadSavedLists();
        alert("Lista deletada com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar lista:", error);
        alert("Erro ao deletar lista.");
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isModalOpen) closeModal();
        if (isEditModalOpen) closeEditModal();
        if (isCategoryModalOpen) closeCategoryModal();
      }
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        handlePrint();
      }
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveList();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isEditModalOpen, isCategoryModalOpen]);

  // Carregar listas ao montar componente
  useEffect(() => {
    loadSavedLists();
  }, []);

  return (
    <div className="font-inter bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 print:relative print:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-green-600 text-2xl">🛒</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Lista de Compras Mensal
                </h1>
                <p className="text-sm text-gray-600">
                  Família: 2 adultos, 1 criança (5 anos), 3 gatas, 1 cachorro
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 print:hidden">
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <span>📁</span>
                <span>Categorias</span>
              </button>
              <button
                onClick={saveList}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>💾</span>
                <span>Salvar</span>
              </button>
              <button
                onClick={handlePrint}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <span>🖨️</span>
                <span>Imprimir</span>
              </button>
              <button
                onClick={clearAll}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>Limpar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Print Header */}
      <div className="hidden print:block">
        <div className="text-center mb-4 border-b-2 border-gray-800 pb-2">
          <h1 className="text-xl font-bold">LISTA DE COMPRAS MENSAL</h1>
          <p className="text-sm">
            Família: 2 adultos + 1 criança (5 anos) + 3 gatas + 1 cachorro
          </p>
          <p className="text-xs">
            Data: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      {/* FontAwesome CDN */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 print:mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 print:shadow-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-500 p-3 rounded-full print:bg-blue-600">
                  <i className="fas fa-list text-white text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-blue-700 font-medium">
                    Total de Itens
                  </p>
                  <p className="text-3xl font-bold text-blue-900">
                    {getTotalItems()}
                  </p>
                </div>
              </div>
              <div className="text-blue-400">
                <span className="text-lg">➡️</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 border border-green-200 hover:shadow-lg transition-all duration-300 print:shadow-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-500 p-3 rounded-full print:bg-green-600">
                  <i className="fas fa-check-circle text-white text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-green-700 font-medium">
                    Itens Marcados
                  </p>
                  <p className="text-3xl font-bold text-green-900">
                    {checkedItems.size}
                  </p>
                </div>
              </div>
              <div className="text-green-600 font-bold">
                {getTotalItems() > 0
                  ? Math.round((checkedItems.size / getTotalItems()) * 100)
                  : 0}
                %
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 print:shadow-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-purple-500 p-3 rounded-full print:bg-purple-600">
                  <i className="fas fa-tags text-white text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-purple-700 font-medium">
                    Categorias
                  </p>
                  <p className="text-3xl font-bold text-purple-900">
                    {Object.keys(categories).length}
                  </p>
                </div>
              </div>
              <div className="text-purple-400">
                <span className="text-lg">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-md p-6 border border-indigo-200 hover:shadow-lg transition-all duration-300 print:shadow-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-indigo-500 p-3 rounded-full print:bg-indigo-600">
                  <i className="fas fa-save text-white text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-indigo-700 font-medium">
                    Listas Salvas
                  </p>
                  <p className="text-3xl font-bold text-indigo-900">
                    {savedLists.length}
                  </p>
                </div>
              </div>
              <div className="text-indigo-400">
                <span className="text-lg">🕒</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listas Salvas */}
        {savedLists.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6 print:hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="text-indigo-600 mr-2 text-xl">🕒</span>
              Histórico de Listas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedLists
                .slice(-6)
                .reverse()
                .map((list) => (
                  <div
                    key={list.id}
                    className="bg-gray-50 rounded-md p-3 border"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(list.createdAt).toLocaleDateString("pt-BR")}{" "}
                          às{" "}
                          {new Date(list.createdAt).toLocaleTimeString(
                            "pt-BR",
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </p>
                        <p className="text-xs text-gray-600">
                          {list.checkedCount}/{list.totalItems} itens marcados
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => loadList(list)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                          title="Carregar lista"
                        >
                          <span>⬇️</span>
                        </button>
                        <button
                          onClick={() => deleteList(list.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                          title="Deletar lista"
                        >
                          <span>🗑️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(categories).map(([categoryKey, category]) => (
            <div
              key={categoryKey}
              className={`${category.bgColor} ${category.borderColor} border-l-4 rounded-lg shadow-sm p-6 print:break-inside-avoid print:mb-5 hover:shadow-md transition-shadow duration-200 print:border-l-8`}
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="text-2xl mr-3">
                    {categoryKey === "hortifruti" && "🍎"}
                    {categoryKey === "acougue" && "🥩"}
                    {categoryKey === "mercearia" && "🛒"}
                    {categoryKey === "laticinios" && "🧀"}
                    {categoryKey === "limpeza" && "🧽"}
                    {categoryKey === "higiene" && "🧴"}
                    {categoryKey === "petshop" && "🐾"}
                    {categoryKey === "bebidas" && "🥤"}
                    {![
                      "hortifruti",
                      "acougue",
                      "mercearia",
                      "laticinios",
                      "limpeza",
                      "higiene",
                      "petshop",
                      "bebidas",
                    ].includes(categoryKey) && "📦"}
                  </span>
                  <span>{category.name}</span>
                </h2>
                <div className="flex space-x-2 print:hidden">
                  <button
                    onClick={() => addCustomItem(categoryKey)}
                    className={`${category.textColor} hover:scale-110 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-100 hover:border-gray-200`}
                    title="Adicionar item personalizado"
                  >
                    <span className="text-xl font-bold">➕</span>
                  </button>
                  <button
                    onClick={() => removeCategory(categoryKey)}
                    className="text-red-600 hover:scale-110 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-100 hover:border-gray-200"
                    title="Remover categoria"
                  >
                    <span className="text-sm">🗑️</span>
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {/* Itens originais */}
                {category.items.map((item, index) => {
                  const itemId = `${categoryKey}-${index}-false`;
                  const isChecked = checkedItems.has(itemId);
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-3 py-2 border-b border-dotted border-gray-300 print:border-gray-400 hover:bg-white hover:bg-opacity-50 rounded px-2 transition-colors duration-150 group"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(categoryKey, index, false)}
                          className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-green-500 checked:bg-green-500 checked:border-green-500 transition-colors duration-150"
                        />
                        {isChecked && (
                          <span className="absolute top-0 left-0 w-5 h-5 text-white text-xs flex items-center justify-center pointer-events-none">
                            ✓
                          </span>
                        )}
                      </div>
                      <span
                        className={`flex-1 ${isChecked ? "line-through opacity-60" : ""} transition-all duration-200`}
                      >
                        {item.name}
                      </span>
                      <span className="text-gray-600 font-medium text-sm bg-gray-100 px-2 py-1 rounded-full">
                        {item.quantity}
                      </span>
                      <div className="flex space-x-1 print:hidden ml-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log(
                              "Editando item:",
                              categoryKey,
                              index,
                              false,
                            );
                            editItem(categoryKey, index, false);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm p-1 bg-white rounded shadow hover:shadow-md transition-all opacity-100"
                          title="Editar item"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log(
                              "Removendo item:",
                              categoryKey,
                              index,
                              false,
                            );
                            removeItem(categoryKey, index, false);
                          }}
                          className="text-red-600 hover:text-red-800 text-sm p-1 bg-white rounded shadow hover:shadow-md transition-all opacity-100"
                          title="Remover item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Itens customizados */}
                {customItems[categoryKey]?.map((item, index) => {
                  const itemId = `${categoryKey}-${index}-true`;
                  const isChecked = checkedItems.has(itemId);
                  return (
                    <div
                      key={`custom-${index}`}
                      className="flex items-center space-x-3 py-2 border-b border-dotted border-gray-300 print:border-gray-400 hover:bg-white hover:bg-opacity-50 rounded px-2 transition-colors duration-150 group"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(categoryKey, index, true)}
                          className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-green-500 checked:bg-green-500 checked:border-green-500 transition-colors duration-150"
                        />
                        {isChecked && (
                          <span className="absolute top-0 left-0 w-5 h-5 text-white text-xs flex items-center justify-center pointer-events-none">
                            ✓
                          </span>
                        )}
                      </div>
                      <span
                        className={`flex-1 ${isChecked ? "line-through opacity-60" : ""} transition-all duration-200`}
                      >
                        {item.name}
                        <span className="ml-2 text-xs text-gray-500 bg-blue-100 px-2 py-0.5 rounded-full print:bg-blue-200">
                          personalizado
                        </span>
                      </span>
                      <span className="text-gray-600 font-medium text-sm bg-gray-100 px-2 py-1 rounded-full">
                        {item.quantity}
                      </span>
                      <div className="flex space-x-1 print:hidden ml-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log(
                              "Editando item custom:",
                              categoryKey,
                              index,
                              true,
                            );
                            editItem(categoryKey, index, true);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm p-1 bg-white rounded shadow hover:shadow-md transition-all opacity-100"
                          title="Editar item"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log(
                              "Removendo item custom:",
                              categoryKey,
                              index,
                              true,
                            );
                            removeItem(categoryKey, index, true);
                          }}
                          className="text-red-600 hover:text-red-800 text-sm p-1 bg-white rounded shadow hover:shadow-md transition-all opacity-100"
                          title="Remover item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal para adicionar item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 print:hidden">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Adicionar Item Personalizado
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span>❌</span>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    value={customItemName}
                    onChange={(e) => setCustomItemName(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      document.getElementById("quantity-input").focus()
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Digite o nome do produto"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade
                  </label>
                  <input
                    id="quantity-input"
                    type="text"
                    value={customItemQuantity}
                    onChange={(e) => setCustomItemQuantity(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && addCustomItemToList()
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ex: 2 kg, 5 unid, 1 litro"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={addCustomItemToList}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar item */}
      {isEditModalOpen && editItemData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 print:hidden">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Editar Item
                </h3>
                <button
                  onClick={closeEditModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span>❌</span>
                </button>
              </div>
              <div className="space-y-4">
                {/* ... resto do modal de edição ... */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    value={editItemData.name}
                    onChange={(e) =>
                      setEditItemData({ ...editItemData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o nome do produto"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade
                  </label>
                  <input
                    type="text"
                    value={editItemData.quantity}
                    onChange={(e) =>
                      setEditItemData({
                        ...editItemData,
                        quantity: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 2 kg, 5 unid, 1 litro"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={saveEditItem}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={closeEditModal}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para gerenciar categorias */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 print:hidden">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Gerenciar Categorias
                </h3>
                <button
                  onClick={closeCategoryModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span>❌</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* ... resto do modal de categorias ... */}
                {/* Adicionar nova categoria */}
                <div className="border-b pb-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Adicionar Nova Categoria
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome da Categoria
                      </label>
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Ex: Bebês, Eletrônicos, etc."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ícone
                        </label>
                        <select
                          value={newCategoryIcon}
                          onChange={(e) => setNewCategoryIcon(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {iconOptions.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon
                                .split(" ")[1]
                                .replace("fa-", "")
                                .replace("-", " ")}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cor
                        </label>
                        <select
                          value={newCategoryColor}
                          onChange={(e) => setNewCategoryColor(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {colorOptions.map((color) => (
                            <option key={color.name} value={color.name}>
                              {color.display}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                      <i
                        className={`${newCategoryIcon} text-lg`}
                        style={{ color: `var(--tw-${newCategoryColor}-600)` }}
                      ></i>
                      <span className="font-medium">
                        {newCategoryName || "Nova Categoria"}
                      </span>
                    </div>

                    <button
                      onClick={addNewCategory}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Adicionar Categoria
                    </button>
                  </div>
                </div>

                {/* Lista de categorias existentes */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Categorias Existentes
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {Object.entries(categories).map(([key, category]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <i
                            className={`${category.icon} ${category.textColor} text-lg`}
                          ></i>
                          <span className="font-medium">{category.name}</span>
                          <span className="text-xs text-gray-500">
                            {category.items.length +
                              (customItems[key]?.length || 0)}{" "}
                            itens
                          </span>
                        </div>
                        <button
                          onClick={() => removeCategory(key)}
                          className="text-red-600 hover:text-red-800 text-sm p-1"
                          title="Remover categoria"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para impressão colorida */}
      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:relative {
            position: relative !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          .print\\:mb-5 {
            margin-bottom: 1.25rem;
          }
          .print\\:mb-6 {
            margin-bottom: 1.5rem;
          }
          .print\\:border-l-8 {
            border-left-width: 8px;
          }
          .print\\:border-gray-400 {
            border-color: #9ca3af;
          }
          .print\\:bg-blue-200 {
            background-color: #dbeafe;
          }
          .print\\:bg-blue-600 {
            background-color: #2563eb;
          }
          .print\\:bg-green-600 {
            background-color: #16a34a;
          }
          .print\\:bg-purple-600 {
            background-color: #9333ea;
          }
          .print\\:bg-indigo-600 {
            background-color: #4f46e5;
          }

          /* Preservar cores dos gradientes na impressão */
          .bg-gradient-to-br {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }

          /* Manter cores dos cards */
          .bg-green-50,
          .bg-red-50,
          .bg-blue-50,
          .bg-yellow-50,
          .bg-amber-50,
          .bg-orange-50,
          .bg-purple-50,
          .bg-teal-50 {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }

          /* Manter bordas coloridas */
          .border-green-500,
          .border-red-500,
          .border-blue-500,
          .border-yellow-600,
          .border-amber-500,
          .border-orange-500,
          .border-purple-500,
          .border-teal-500 {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }

          body {
            font-size: 12pt;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
