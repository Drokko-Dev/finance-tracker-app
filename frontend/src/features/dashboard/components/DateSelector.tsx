import { useState, Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { Calendar, ChevronDown, Check } from "lucide-react";

const months = [
  { id: 1, name: "Agosto 2023" },
  { id: 2, name: "Septiembre 2023" },
  { id: 3, name: "Octubre 2023" },
];

export const DateSelector = () => {
  const [selectedMonth, setSelectedMonth] = useState(months[1]);

  return (
    <div className="relative w-full sm:w-auto">
      <Listbox value={selectedMonth} onChange={setSelectedMonth}>
        {({ open }) => (
          <>
            <ListboxButton className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto bg-white/5 border border-border-subtle rounded-xl hover:bg-white/10 transition-all text-sm font-medium text-text-main cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-95 outline-none group">
              <Calendar className="w-4 h-4 text-text-subtle" />
              <span className="tracking-tight">{selectedMonth.name}</span>
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
              <ListboxOptions className="absolute right-0 z-50 mt-2 w-48 origin-top-right bg-card-bg border border-border-subtle rounded-xl shadow-2xl overflow-hidden focus:outline-none py-1">
                {months.map((month) => (
                  <ListboxOption
                    key={month.id}
                    value={month}
                    className={({ active, selected }) => `
                      relative cursor-pointer select-none py-2.5 px-4 flex items-center justify-between text-sm transition-colors
                      ${active ? "bg-white/5 text-text-main" : "text-text-subtle"}
                      ${selected ? "bg-white/2 font-semibold" : ""}
                    `}
                  >
                    {({ selected }) => (
                      <>
                        <span className="tracking-tight">{month.name}</span>
                        {selected && (
                          <Check className="w-4 h-4 text-accent animate-in zoom-in duration-300" />
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};
