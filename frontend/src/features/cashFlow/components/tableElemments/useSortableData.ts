import { useMemo, useState } from "react";

export const useSortableData = (items: any[]) => {
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc' | null}>({
    key: '',
    direction: null
  });

  // USAR useMemo es la clave:
  // Cada vez que 'items' (la data filtrada) cambie, 'datos' se recalculará
  const datos = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig.key !== '') {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]); // Se dispara cuando cambia la data o el orden

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return { datos, sortConfig, handleSort };
};