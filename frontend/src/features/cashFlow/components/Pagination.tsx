import React, { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Subcomponente para el Input de los "..."
const JumpInput: React.FC<{
  totalPages: number;
  onJump: (page: number) => void;
}> = ({ totalPages, onJump }) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    // Validar si el número está fuera de rango
    const page = parseInt(val, 10);
    if (val !== "" && (isNaN(page) || page < 1 || page > totalPages)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(value, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        onJump(page);
        setValue("");
        setIsError(false);
      }
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="..."
      title="Escribe una página y presiona Enter"
      className={`w-12 h-10 text-center bg-transparent outline-none border-l border-gray-700 focus:bg-gray-800 transition-colors ${
        isError
          ? "text-red-500 placeholder-red-500 bg-red-900/20"
          : "text-gray-400 placeholder-gray-400 hover:text-white"
      }`}
    />
  );
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Lógica para calcular las 5 páginas visibles (actual + 2 anteriores + 2 siguientes)
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  // Ajustes para mantener siempre 5 opciones visibles si estamos en los extremos
  if (currentPage <= 3) {
    endPage = Math.min(totalPages, 5);
  }
  if (currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - 4);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const showLeftEllipsis = startPage > 1;
  const showRightEllipsis = endPage < totalPages;

  return (
    <div className="mt-10 mx-auto self-center flex items-center text-sm font-medium border border-gray-700 rounded-md bg-[#2b2d31] overflow-hidden w-max">
      {/* Botón: Primera Página (Oculto si está en las páginas 1, 2 o 3) */}
      {currentPage > 3 && (
        <button
          onClick={() => onPageChange(1)}
          className="flex items-center justify-center w-10 h-10 text-gray-400 bg-[#4b3133] hover:bg-[#5c3c3f] transition-colors border-r border-gray-700"
          title="Primera página"
        >
          1
        </button>
      )}

      {/* Botón: Página Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 text-white bg-[#c94b4e] disabled:opacity-50 hover:bg-[#d95659] transition-colors border-l border-gray-700"
        title="Página anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Input de Salto Izquierdo */}
      {showLeftEllipsis && (
        <JumpInput totalPages={totalPages} onJump={onPageChange} />
      )}

      {/* Números de Página */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center w-10 h-10 border-l border-gray-700 transition-colors ${
            currentPage === page
              ? "bg-[#1c1d21] text-white" // Color activo
              : "text-gray-300 hover:bg-[#383a40]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Input de Salto Derecho */}
      {showRightEllipsis && (
        <JumpInput totalPages={totalPages} onJump={onPageChange} />
      )}
      {/* Botón: Última Página */}
      {currentPage < totalPages - 2 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="flex items-center justify-center w-10 h-10 text-white bg-[#c94b4e] hover:bg-[#d95659] transition-colors border-l border-gray-700"
          title="Última página"
        >
          {totalPages}
        </button>
      )}
      {/* Botón: Página Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 text-white bg-[#c94b4e] disabled:opacity-50 hover:bg-[#d95659] transition-colors border-l border-gray-700"
        title="Página siguiente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
