import { useState } from "react";

const CategorySelector = ({ selectedCategory, onCategoryChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Tecnologia", "Moda", "Esportes", "Alimentos", "Educação", "Saúde",
    "Viagens", "Música", "Filmes", "Jogos", "Arte", "Culinária"
  ];

  return (
    <div className="p-4 relative">
      <h3 className="text-lg font-semibold mb-4">Selecionar Categoria:</h3>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 w-full bg-gray-200 text-gray-700 border rounded-lg hover:bg-gray-300"
        >
          {selectedCategory || "Selecione uma Categoria"}
        </button>
        {isOpen && (
          <ul
            className="absolute z-50 mt-2 w-full max-h-48 bg-white border rounded-lg shadow-lg overflow-y-auto"
            style={{ top: "100%", transform: "translateY(0)", zIndex: 1050 }} // Ajuste o z-index e a posição
          >
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                  selectedCategory === category ? "bg-blue-500 text-white" : ""
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedCategory && (
        <p className="mt-4 text-sm text-gray-600">
          Categoria Selecionada: <span className="font-bold">{selectedCategory}</span>
        </p>
      )}
    </div>
  );
};

export default CategorySelector;

