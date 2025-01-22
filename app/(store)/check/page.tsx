"use client"

import React, { useState } from "react";
import FilterComponent from "@/components/ui/filter";

const ParentComponent = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(0);

  const handleCategoriesChange = (updatedCategories: string[]) => {
    setCategories(updatedCategories);
    console.log("Updated Categories:", updatedCategories);
  };

  const handlePriceRangeChange = (updatedPrice: number) => {
    setPriceRange(updatedPrice);
    console.log("Updated Price Range:", updatedPrice);
  };

  return (
    <div>
      <FilterComponent
        onCategoriesChange={handleCategoriesChange}
        onPriceRangeChange={handlePriceRangeChange}
      />
      <div className="mt-6">
        <h2>Selected Filters:</h2>
        <p>Categories: {categories.join(", ") || "None"}</p>
        <p>Price Range: ${priceRange}</p>
      </div>
    </div>
  );
};

export default ParentComponent;
