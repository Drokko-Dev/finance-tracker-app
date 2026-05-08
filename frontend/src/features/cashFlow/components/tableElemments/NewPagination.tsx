import React, { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function NewPagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [inputValue, setInputValue] = useState<string>(currentPage.toString());

  // Sincroniza el input si la página cambia desde afuera (ej. botones)
  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  // Maneja la escritura en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Permite solo números enteros (incluyendo el signo menos para validación) o un campo vacío
    if (/^-?\d*$/.test(val)) {
      setInputValue(val);
    }
  };

  // Envía la página si se presiona Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitPage();
    }
  };

  // Lógica principal de validación para cambiar de página
  const submitPage = () => {
    const newPage = parseInt(inputValue, 10);
    
    // Verifica si es un número válido dentro del rango
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      if (newPage !== currentPage) {
        onPageChange(newPage);
      } else {
        // Si es la misma página, simplemente reforma el texto evitando cambios de estado innecesarios
        setInputValue(currentPage.toString());
      }
    } else {
      // Si el número es incorrecto (negativo o mayor) o está vacío, revierte al valor actual
      setInputValue(currentPage.toString());
    }
  };

  const parsedValue = parseInt(inputValue, 10);
  // Determina si hay un error para aplicar los estilos de borde rojo
  const isError = 
    inputValue !== '' && 
    (isNaN(parsedValue) || parsedValue < 1 || parsedValue > totalPages);

  return (
    <div className="flex items-center space-x-2 font-sans text-red p-4 rounded-lg w-max mx-auto">
      
      {/* Botón: Ir a la primera página */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all"
        aria-label="Primera página"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 18l-6-6 6-6" />
          <path d="M7 6v12" />
        </svg>
      </button>

      {/* Botón: Página anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all"
        aria-label="Página anterior"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Input de la página actual y Total de páginas */}
      <div className="flex items-center space-x-3 px-3">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={submitPage}
          className={`w-14 h-10 text-center bg-white border rounded-lg shadow-sm outline-none transition-all duration-200
            ${isError 
              ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'border-[#b46b32] focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100'
            }
          `}
        />
        <span className="text-sm font-medium whitespace-nowrap">of {totalPages}</span>
      </div>

      {/* Botón: Página siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all"
        aria-label="Página siguiente"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Botón: Ir a la última página */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all"
        aria-label="Última página"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 18l6-6-6-6" />
          <path d="M17 6v12" />
        </svg>
      </button>

    </div>
  );
}