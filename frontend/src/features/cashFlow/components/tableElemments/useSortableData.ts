// useSortableData.ts
import { useState } from "react";

export const useSortableData = (initialKey = 'date', initialOrder = 'desc') => {
  const [sortConfig, setSortConfig] = useState({ 
    key: initialKey, 
    direction: initialOrder 
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return { 
    sortBy: sortConfig.key, 
    order: sortConfig.direction, 
    handleSort,
    sortConfig 
  };
};