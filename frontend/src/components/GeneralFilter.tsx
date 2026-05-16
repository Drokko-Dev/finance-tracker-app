import { useState, useMemo, Fragment } from "react";
import { 
  Listbox, 
  ListboxButton, 
  ListboxOptions, 
  ListboxOption, 
  Transition 
} from "@headlessui/react";
import { Calendar, ChevronDown, Search, CheckSquare, Square, Check } from "lucide-react"; // Asumiendo que usas lucide

export interface OptionItem {
  id: number | string; // A veces los IDs vienen como strings, buena práctica permitir ambos
  name: string;
}

// MEJORA 1: Cambié el nombre de DateSelectorProps a GeneralFilterProps
export interface GeneralFilterProps<T extends OptionItem> {
  items: T[];
  label?: string;
  selected: T | T[] | null;
  onChange: (value: any) => void;
  multiple?: boolean;
  placeholder?: string;
}

export function GeneralFilter<T extends OptionItem>({
  items,
  label,
  selected,
  onChange,
  multiple = false,
  placeholder = "Seleccionar...",
}: GeneralFilterProps<T>) {
  const [query, setQuery] = useState("");

  const handleChange = (val: T | T[]) => {
    onChange(val);
  };

  const filteredItems = useMemo(() => {
    return query === ""
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
  }, [query, items]);

  // MEJORA 2: Validación más robusta para evitar errores si selected no es un array
  const isAllSelected = multiple && Array.isArray(selected) && items.length > 0 && selected.length === items.length;

  const toggleAll = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita comportamientos indeseados
    e.stopPropagation(); // Evita que se cierre el Listbox al hacer clic
    if (isAllSelected) {
      handleChange([]);
    } else {
      handleChange(items);
    }
  };

  const getLabel = () => {
    if (multiple && Array.isArray(selected)) {
      if (selected.length === 0) return placeholder;
      if (selected.length === items.length) return "Todos seleccionados";
      return `${selected.length} seleccionados`;
    }
    // MEJORA 3: Manejo seguro para single select
    return selected && !Array.isArray(selected) ? (selected as T).name : placeholder;
  };

  return (
    <div className="relative w-full sm:w-64 mb-3">
      {label && (
        <label className="text-xs font-medium text-text-main block mb-1">
          {label}
        </label>
      )}
      <Listbox value={selected} onChange={handleChange} multiple={multiple as any}>
        {({ open }) => (
          <>
            <ListboxButton className="flex items-center gap-2 px-3 py-2 w-full sm:w-40 sm:h-8 bg-white/5 border border-border-subtle rounded-xl hover:bg-white/10 transition-all text-sm font-medium text-text-main outline-none group cursor-pointer">
              <Calendar className="w-4 h-4 text-text-subtle shrink-0" />
              <span className="tracking-tight truncate text-sm flex-1 text-left">{getLabel()}</span>
              <ChevronDown className={`w-4 h-4 text-text-subtle transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
            </ListboxButton>

            <Transition
              as={Fragment}
              afterLeave={() => setQuery("")}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <ListboxOptions className="absolute right-0 z-50 mt-2 w-64 origin-top-right bg-card-bg border border-border-subtle rounded-xl shadow-2xl overflow-hidden focus:outline-none bg-white">
                
                {/* BUSCADOR */}
                <div className="p-2 border-b border-border-subtle bg-gray-50/50">
                  <div className="relative flex items-center">
                    <Search className="absolute left-2.5 w-3.5 h-3.5 text-text-subtle" />
                    <input
                      type="text"
                      // MEJORA 4: stopPropagation en el input para que al presionar la tecla "Espacio" no se cierre el modal
                      onKeyDown={(e) => e.stopPropagation()} 
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-white/5 border border-border-subtle rounded-lg py-1.5 pl-8 pr-3 text-xs text-text-main placeholder:text-text-subtle focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="Buscar..."
                      onChange={(e) => setQuery(e.target.value)}
                      value={query}
                    />
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto py-1">
                  {/* OPCIÓN SELECCIONAR TODOS */}
                  {multiple && query === "" && items.length > 0 && (
                    <button
                      onClick={toggleAll}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-accent hover:bg-gray-100 transition-colors border-b border-border-subtle/50 mb-1 cursor-pointer"
                    >
                      {isAllSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                      {isAllSelected ? "Deseleccionar todos" : "Seleccionar todos"}
                    </button>
                  )}

                  {filteredItems.length === 0 ? (
                    <div className="px-4 py-4 text-xs text-gray-500 text-center">No se encontraron resultados</div>
                  ) : (
                    filteredItems.map((item) => (
                      <ListboxOption
                        key={item.id}
                        value={item}
                        className={({ active, selected: isSelected }) => `
                          relative cursor-pointer select-none py-2 px-4 flex items-center justify-between text-sm
                          ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}
                          ${isSelected ? "text-blue-600 font-semibold" : ""}
                        `}
                      >
                        {({ selected: isSelected }) => (
                          <>
                            <span className={`truncate ${isSelected ? "font-semibold" : "font-normal"}`}>
                              {item.name}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                          </>
                        )}
                      </ListboxOption>
                    ))
                  )}
                </div>
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}


import React from "react";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const DateInput = ({ label, className, ...props }: DateInputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full sm:w-40">
      {label && (
        <label className="text-xs font-medium text-text-main">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {/* Icono decorativo a la izquierda */}
        <input
          type="date"
          className={`
            /* Reset y Estilos Base */
            
            appearance-none outline-none w-full
            bg-white/5 border border-border-subtle rounded-xl
            px-10 py-2 text-xs font-medium text-text-main
            transition-all duration-200
            
            /* Estados */
            hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5
            focus:border-accent/50 focus:ring-1 focus:ring-accent/50
            active:scale-[0.98]
            
            /* Asegurar color en los fragmentos de la fecha (Chrome/Safari/Edge) */
            [&::-webkit-datetime-edit]:text-text-main
            [&::-webkit-datetime-edit-fields-wrapper]:text-text-main
            [&::-webkit-datetime-edit-text]:text-text-main
            [&::-webkit-datetime-edit-month-field]:text-text-main
            [&::-webkit-datetime-edit-day-field]:text-text-main
            [&::-webkit-datetime-edit-year-field]:text-text-main

            /* Estilos específicos para el selector (invisible sobre el input) */
            [&::-webkit-calendar-picker-indicator]:absolute
            [&::-webkit-calendar-picker-indicator]:left-0
            [&::-webkit-calendar-picker-indicator]:top-0
            [&::-webkit-calendar-picker-indicator]:w-full
            [&::-webkit-calendar-picker-indicator]:h-full
            [&::-webkit-calendar-picker-indicator]:opacity-0
            [&::-webkit-calendar-picker-indicator]:cursor-pointer
            
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};