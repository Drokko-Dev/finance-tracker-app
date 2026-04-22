import { useState, useEffect } from 'react';

/**
 * Hook para retrasar la actualización de un valor.
 * @param value - El valor que queremos "debouncear" (ej. el input de búsqueda).
 * @param delay - El tiempo de espera en milisegundos (por defecto 500ms).
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Seteamos un timer para actualizar el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpieza: si el valor cambia antes de que termine el delay,
    // cancelamos el timer anterior y empezamos de nuevo.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;