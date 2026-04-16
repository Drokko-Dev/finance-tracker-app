import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { categories } from "@/constants/categories";
import { useTransactions } from "@/hooks/useTransactions";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { GeneralFilter, DateInput } from "@/components/GeneralFilter";
import FinanceTable from "@/features/cashFlow/components/tableElemments/FinanceTable";
import { Pagination } from "@/features/cashFlow/components/Pagination";
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
  const [page, setPage] = useState<number>(1);
  const [initialdate, setinitialDate] = useState<Date>();
  const [finaldate, setfinalDate] = useState<Date>();
  const selectedIds =
    selected.length > 0 ? selected.map((obj) => obj.id).join(",") : undefined;
  const { data, isLoading } = useTransactions({
    page: page,
    search: search,
    category: selectedIds,
    initialDate: initialdate,
    finalDate: finaldate
  });
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    console.log(search);
  };
  console.log(data);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

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
                value={initialdate ? initialdate.toISOString().split("T")[0] : ""}
                onChange={(e) => setinitialDate(new Date(e.target.value))}
                min="2020-01-01"
              />
              <DateInput
                label="Fecha de Fin"
                value={finaldate ? finaldate.toISOString().split("T")[0] : ""}
                onChange={(e) => setfinalDate(new Date(e.target.value))}
                max={fechaFormateada}
              />
            </div>

            {data && <FinanceTable data={data.items} />}
            {data?.pages > 1 ? (
              <Pagination
                currentPage={page}
                totalPages={data ? data.pages : 0}
                onPageChange={onPageChange}
              />
            ) : (
              ''
            )}
          </GlassCard>
        </div>
      )}
    </>
  );
}
