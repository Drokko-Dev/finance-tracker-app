import { GeneralFilter, DateInput } from "@/components/GeneralFilter";
import { GlassCard } from "@/components/ui/GlassCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { useState } from "react";
import TablaFinanzas from "@/features/cashFlow/components/Table";



const hoy = new Date(Date.now());
const fechaFormateada = hoy.toISOString().split("T")[0];

console.log(fechaFormateada);

const months = [
  { id: 1, name: "Comida" },
  { id: 2, name: "Salud" },
  { id: 3, name: "Entretención" },
];

interface Item {
  id: string | number;
  name: string;
}

export function CashsFlowPage() {
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<string>("2024-01-01");
  const [selected, setSelected] = useState<Item[]>([]);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };
  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    console.log(search);
  };
  return (
    <div className="min-h-screen bg-main-bg p-4 md:p-2 font-sans min-w-100 ">
      <GlassCard className="overflow: visible min-w-95">
        <SearchBar onSvgClick={handleClick} onchangeInput={handleChange} />
        <div className="flex flex-row w-max mt-2 mx-2.5 flex-wrap gap-4">
          <GeneralFilter
            label="categoria"
            items={months}
            selected={selected}
            onChange={setSelected}
            multiple={true}
          />
          <DateInput
            label="Fecha de inicio"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min="2020-01-01"
          />
          <DateInput
            label="Fecha de Fin"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={fechaFormateada}
          />
        </div>
        
        <TablaFinanzas/>
      </GlassCard>
    </div>
  );
}
