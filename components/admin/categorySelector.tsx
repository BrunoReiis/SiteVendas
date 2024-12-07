import { useState, useEffect } from "react";
import { getDataModelCategories } from "@/src/firebase/getData";

export interface CategoryData {
  id: string;
  status: string;
}

const CategorySelector = ({ selectedCategory, onCategoryChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getDataModelCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 relative">
      <h3 className="text-lg font-semibold mb-4">Selecionar Categoria:</h3>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 w-full bg-gray-200 text-gray-700 border rounded-lg hover:bg-gray-300"
        >
          {selectedCategory?.id || "Selecione uma Categoria"}
        </button>
        {isOpen && (
          <ul
            className="absolute z-50 mt-2 w-full max-h-48 bg-white border rounded-lg shadow-lg overflow-y-auto"
            style={{ top: "100%", transform: "translateY(0)", zIndex: 1050 }}
          >
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  onCategoryChange(category);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                  selectedCategory?.id === category.id ? "bg-blue-500 text-white" : ""
                }`}
              >
                {category.id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
