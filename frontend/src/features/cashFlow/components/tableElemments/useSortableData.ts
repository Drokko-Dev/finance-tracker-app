// useSortableData.ts
import { useState } from "react";

export const useSortableData = (initialKey = 'date', initialOrder: "asc" | "desc" | null = 'desc') => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" | null }>({
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