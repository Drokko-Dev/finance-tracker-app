import { useState, Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { ChevronDown, Check, CheckSquare, Square } from "lucide-react";

interface FilterOptions {
  id: number | string;
  name: string;
}

export const FilterDashboard = ({
  options,
  icon,
  value,
  onChange,
}: {
  options: FilterOptions[];
  icon: React.ReactNode;
  value: FilterOptions;
  onChange: (value: FilterOptions) => void;
}) => {
  return (
    <div className="relative w-full sm:w-auto">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <ListboxButton className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto bg-white/5 border border-border-subtle rounded-xl hover:bg-white/10 transition-all text-sm font-medium text-text-main cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-95 outline-none group">
              {icon}
              <span className="tracking-tight">{value.name}</span>
              <ChevronDown
                className={`w-4 h-4 text-text-subtle transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </ListboxButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <ListboxOptions className="absolute right-0 z-50 mt-2 w-origin-top-right origin-top-right origin-top-right origin-top-right bg-card-bg border border-border-subtle rounded-xl shadow-2xl overflow-hidden focus:outline-none py-1">
                {/* 1. PARTE SUPERIOR FIJA: "Seleccionar Todo" standalone. 
                     No necesita sticky, ya que es el primer elemento en un contenedor fijo.
                     Pero aún necesita un fondo sólido para ocaciones en que los scroll pasaran.
                */}
                <ListboxOption
                  key="ALL_OPTION"
                  value={{ id: "ALL", name: "Todas las cuentas" }} // Creamos la opción artificial aquí
                  className={({ active, selected }) => `
                    cursor-pointer select-none py-2.5 px-4 flex items-center text-sm transition-colors truncate border-b border-border-subtle mb-1
                    ${active ? "bg-white/5 text-text-main" : "text-text-subtle"}
                    ${selected ? "bg-white/2 font-semibold" : ""}
                  `}
                >
                  {({ selected }) => (
                    <>
                      {selected ? (
                        <CheckSquare className="w-4 h-4 text-accent mr-2 animate-in zoom-in duration-300" />
                      ) : (
                        <Square className="w-4 h-4 text-text-subtle mr-2" />
                      )}
                      <span className="tracking-tight">Todos</span>
                    </>
                  )}
                </ListboxOption>

                {/* 2. CUERPO DE LA LISTA QUE HACE SCROLL: 
                     Un nuevo contenedor solo para el mapa de bancos normales.
                */}
                <div className="max-h-60 overflow-y-auto overflow-x-hidden">
                  {" "}
                  {/* 👈 NUEVO CONTENEDOR DE SCROLL */}
                  {options
                    .filter((opt) => opt.id !== "ALL") // Filtramos el 'ALL' que inyectaste en el DashboardPage
                    .map((option) => (
                      <ListboxOption
                        key={option.id}
                        value={option}
                        className={({ active, selected }) => `
                          relative cursor-pointer select-none py-2.5 px-4 flex items-center justify-between text-sm transition-colors truncate min-w-35
                          ${active ? "bg-white/5 text-text-main" : "text-text-subtle"}
                          ${selected ? "bg-white/2 font-semibold" : ""}
                        `}
                      >
                        {({ selected }) => (
                          <>
                            <span className="tracking-tight">
                              {option.name}
                            </span>
                            {selected && (
                              <Check className="w-4 h-4 text-accent animate-in zoom-in duration-300" />
                            )}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                </div>
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};
