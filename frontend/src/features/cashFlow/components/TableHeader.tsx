import { useState } from 'react';
import { MoveDown, MoveUp } from 'lucide-react';

interface item {
  monto: number;
  categoria: string;
  fecha: Date;
  descripcion: string
}

interface Props {
  data: item[];
  setData: (item[])=> void()
}


const TableHeader = ({ data, setData }: Props) => {
  // Estado para rastrear qué columna se ordena y en qué dirección
  const [sortConfig, setSortConfig] = useState({ key: 'monto', direction: 'desc' });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    // Si se hace clic en la misma columna, invertimos la dirección
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });

    // Lógica de ordenamiento
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  // Función para renderizar el icono solo si la columna es la activa
  const renderIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <MoveUp size={16} /> : <MoveDown size={16} />;
  };

  return (
    <div className="w-full flex flex-row bg-transparent pl-8 pr-8 justify-between items-center border-b-2 border-gray-400 pt-8 pb-2">
      {[
        { id: 'monto', label: 'monto' },
        { id: 'categoria', label: 'categoría' },
        { id: 'fecha', label: 'fecha' },
        { id: 'descripcion', label: 'Descripción' }
      ].map((col) => (
        <label
          key={col.id}
          onClick={() => handleSort(col.id)}
          className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-colors select-none first:ml-0 last:mr-0"
        >
          {col.label}
          <span className="w-4 h-4">
            {renderIcon(col.id)}
          </span>
        </label>
      ))}
    </div>
  );
};

export default TableHeader;