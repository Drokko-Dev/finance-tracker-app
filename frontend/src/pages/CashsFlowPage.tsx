import { GeneralFilter, DateInput } from "@/components/GeneralFilter";
import { GlassCard } from "@/components/ui/GlassCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useTransactions } from "@/hooks/useTransactions";
import FinanceTable from "@/features/cashFlow/components/tableElemments/FinanceTable";
import { categories } from "@/constants/categories";
interface OptionItem {
  id: number;
  name: string;
}

const hoy = new Date(Date.now());
const fechaFormateada = hoy.toISOString().split("T")[0];

console.log(fechaFormateada);

export function CashsFlowPage() {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<OptionItem[]>([]);
  const selectedIds =
    selected.length > 0 ? selected.map((obj) => obj.id).join(",") : undefined;
  const { data, isLoading } = useTransactions({
    page: 1, 
    search: search, 
    category: selectedIds 
  });
  const [date, setDate] = useState<string>("2024-01-01");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    console.log(search);
  };
  console.log(data);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen bg-main-bg md:p-2 font-sans md:min-w-100 ">
          <GlassCard className="overflow: visible md:min-w-95">
            <SearchBar onSvgClick={handleClick} onchangeInput={handleChange} />
            <div className="flex flex-col sm:flex-row gap-4 w-full md:mt-4 md:justify-center">
              <GeneralFilter
                label="categoria"
                items={categories}
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

            {data && <FinanceTable data={data} />}
          </GlassCard>
        </div>
      )}
    </>
  );
}
