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
  // Lógica para calcular las páginas visibles
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(totalPages, 5); // Bajamos a 5 para ahorrar espacio
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

  // Clase base para los botones de navegación
  const navBtnClass = "flex items-center justify-center w-10 h-10 text-gray-400 bg-[#0d1625] transition-colors border-r border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-[#23395f] enabled:hover:text-white";

  return (
    <div className="mt-10 mx-auto flex flex-col items-center gap-4">
      {/* Indicador de página para móviles (opcional, ayuda a dar contexto) */}
      <span className="text-gray-500 text-xs font-medium sm:hidden">
        Página {currentPage} de {totalPages}
      </span>

      <div className="flex items-center text-sm font-medium border border-gray-700 rounded-md bg-[#0d1625] overflow-hidden w-max shadow-lg">
        
        {/* Botón: Primera Página - OCULTO EN MÓVIL */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`${navBtnClass} `} 
          title="Primera página"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 7l-5 5l5 5" /><path d="M17 7l-5 5l5 5" />
          </svg>
        </button>

        {/* Botón: Página Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={navBtnClass}
          title="Página anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Input de Salto Izquierdo - OCULTO EN MÓVIL */}
        <div className="hidden md:block">
            {showLeftEllipsis && <JumpInput totalPages={totalPages} onJump={onPageChange} />}
        </div>

        {/* Números de Página */}
        {pages.map((page) => {
          const isCurrent = currentPage === page;
          // Lógica responsiva: 
          // En móvil solo mostramos el actual y uno a cada lado si es posible.
          const isNear = Math.abs(currentPage - page) <= 1;

          return (
            <button
              key={page}
              onClick={() => !isCurrent && onPageChange(page)}
              disabled={isCurrent}
              className={`flex items-center justify-center w-10 h-10 border-r border-gray-700 transition-colors ${
                isCurrent
                  ? "bg-blue-600/20 text-blue-400 cursor-default" 
                  : isNear 
                    ? "text-gray-300 hover:bg-[#383a40]" 
                    : "hidden sm:flex text-gray-300 hover:bg-[#383a40]" // Oculta los lejanos en móvil
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Input de Salto Derecho - OCULTO EN MÓVIL */}
        <div className="hidden md:block">
            {showRightEllipsis && <JumpInput totalPages={totalPages} onJump={onPageChange} />}
        </div>

        {/* Botón: Página Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${navBtnClass} border-l border-r-0 sm:border-r`}
          title="Página siguiente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Botón: Última Página - OCULTO EN MÓVIL */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`${navBtnClass} border-l border-r-0 sm:border-r`}
          title="Última página"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
};
