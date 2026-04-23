import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { useTransactions } from "@/hooks/useTransactions";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { GeneralFilter, DateInput } from "@/components/GeneralFilter";
import FinanceTable from "@/features/cashFlow/components/tableElemments/FinanceTable";
import { Pagination } from "@/features/cashFlow/components/Pagination";
import { useSortableData } from "@/features/cashFlow/components/tableElemments/useSortableData";
import { useCategories } from "@/hooks/useCategories";
import { useAccount } from "@/hooks/useAccount";
import useDebounce from "@/hooks/useDebounce";
interface OptionItem {
  id: number;
  name: string;
}

const hoy = new Date(Date.now());
const fechaFormateada = hoy.toISOString().split("T")[0];

console.log(fechaFormateada);

export function CashsFlowPage() {
  const { sortBy, order, handleSort, sortConfig } = useSortableData(
    "created_at",
    "asc",
  );
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState<string | undefined>();
  const debouncedSearchTerm = useDebounce(search, 600);
  const [selected, setSelected] = useState<OptionItem[]>([]);
  const [type, setType] = useState();
  const [account, setAccount] = useState();
  const [page, setPage] = useState<number>(1);
  const [initialdate, setinitialDate] = useState<Date>();
  const [finaldate, setfinalDate] = useState<Date>();
  const selectedIds =
    selected.length > 0 ? selected.map((obj) => obj.id).join(",") : undefined;
  const { data, isLoading } = useTransactions({
    page: page,
    search: debouncedSearchTerm,
    category: selectedIds,
    type: type,
    account: account,
    initialDate: initialdate,
    finalDate: finaldate,
    sortBy: sortBy,
    order: order,
  });
  const { data: categories } = useCategories();
  const { data: banks } = useAccount();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    console.log(search);
  };
  console.log(data, categories);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };
  console.log(banks);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen bg-main-bg md:p-2 font-sans md:min-w-100 ">
          <GlassCard className="overflow: visible md:min-w-95">
            <SearchBar onSvgClick={handleClick} onchangeInput={handleChange} />
            {filter ? (
              <div className="flex flex-col sm:flex-row gap-4 w-full md:mt-4 md:justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories ? (
                    <GeneralFilter
                      label="categoria"
                      items={categories.data}
                      selected={selected}
                      onChange={setSelected}
                      multiple={true}
                    />
                  ) : (
                    ""
                  )}

                  <DateInput
                    label="Fecha de inicio"
                    value={
                      initialdate ? initialdate.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => setinitialDate(new Date(e.target.value))}
                    min="2020-01-01"
                  />
                  <DateInput
                    label="Fecha de Fin"
                    value={
                      finaldate ? finaldate.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => setfinalDate(new Date(e.target.value))}
                    max={fechaFormateada}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {data && (
              <FinanceTable
                data={data?.items || []}
                onSort={handleSort}
                sortConfig={sortConfig}
              />
            )}
            {data?.pages > 1 ? (
              <Pagination
                currentPage={page}
                totalPages={data ? data.pages : 0}
                onPageChange={onPageChange}
              />
            ) : (
              ""
            )}
          </GlassCard>
        </div>
      )}
    </>
  );
}
