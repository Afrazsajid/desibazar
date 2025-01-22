import React, { useState } from "react";

interface FilterComponentProps {
  onCategoriesChange: (categories: string[]) => void;
  onPriceRangeChange: (price: number) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onCategoriesChange,
  onPriceRangeChange,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(0);

  const availableCategories = [
    "Electronics",
    "Books",
    "Clothing",
    "Toys",
    "Groceries",
    "Furniture",
  ];

  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      const updatedCategories = [...categories, category];
      setCategories(updatedCategories);
      onCategoriesChange(updatedCategories); // Send updated categories to parent
    }
  };

  const handleRemoveCategory = (category: string) => {
    const updatedCategories = categories.filter((c) => c !== category);
    setCategories(updatedCategories);
    onCategoriesChange(updatedCategories); // Send updated categories to parent
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setPriceRange(value);
    onPriceRangeChange(value); // Send updated price range to parent
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-96">
      {/* Categories Dropdown */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Categories</label>
        <div className="relative">
          <select
            onChange={(e) => handleAddCategory(e.target.value)}
            className="block w-full p-3 text-web-secondary bg-web-primary rounded-lg border border-web-secondary focus:outline-none focus:ring-2 focus:ring-web-secondary focus:border-web-secondary"
          >
            <option value="">Select a category</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* Display Selected Categories */}
        <div className="mt-4">
          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="bg-web-primary text-web-secondary text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {category}
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="text-web-secondary hover:text-red-500 focus:outline-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No categories selected.</p>
          )}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <label className="block text-lg font-medium mb-2">Price Range</label>
        <div className="flex items-center mt-2">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange}
            onChange={handlePriceRangeChange}
            className="w-full appearance-none h-2 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-web-secondary"
          />
        </div>
        <div className="text-lg font-medium mt-2 text-web-secondary">
          Selected Range: <span className="text-web-primary">${priceRange}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;