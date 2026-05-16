import { useState } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { useTransactions } from "@/hooks/useTransactions";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { GeneralFilter, DateInput } from "@/components/GeneralFilter";
import { useSortableData } from "@/features/cashFlow/components/tableElemments/useSortableData";
import { useCategories } from "@/hooks/useCategories";
import { useAccount } from "@/hooks/useAccount";
import useDebounce from "@/hooks/useDebounce";
import type { OptionItem } from "@/types/Category";
import TransactionCard from "@/features/cashFlow/components/tableElemments/TransactionCard";
import { SlidersHorizontal } from "lucide-react";
import { NewPagination } from "@/features/cashFlow/components/tableElemments/NewPagination";
const hoy = new Date(Date.now());
const fechaFormateada = hoy.toISOString().split("T")[0];

const test_data = [
  {
    id: 1,
    amount: 1000000000,
    title: "Sueldo mensual",
    description: "Sueldo recibido por trabajo de mesero",
    type: "income",
    created_at: "2026-01-01T11:37:34",
    tag: "par-time",
    cycle: {
      id: 1,
      name: "Segundo ciclo",
    },
    account: {
      id: 7,
      name: "Ahorro Vista",
      bank: "Banco Estado",
    },
    category: {
      id: 10,
      name: "trabajo",
    },
    debt: "friend_id",
  },
];
export function CashsFlowPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  // pre filtro
  const [preCategory, setPrecategory] = useState<OptionItem[]>([]);
  const [preBank, setPreBank] = useState<OptionItem[]>([]);
  const [preInitialDate, setPreInitialDate] = useState<OptionItem[]>([]);
  const [preEndtDate, setPreEndDate] = useState<OptionItem[]>([]);
  const [preAcountType, setPreAcountType] = useState<OptionItem[]>([]);
  const [preType, setPreType] = useState<OptionItem[]>([]);
  const [preTag, setPreTag] = useState<OptionItem[]>([]);

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
  };

  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    console.log(search);
  };
  console.log(data?.items);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen bg-main-bg md:p-2 font-sans md:min-w-100 ">
          <SearchBar onSvgClick={handleClick} onchangeInput={handleChange} />
          <button className="my-3 hover:scale-120 transition duration-300">
            <SlidersHorizontal
              onClick={() => setIsFilterOpen((prevState) => !prevState)}
            />
          </button>
          {isFilterOpen && (
            <div className="grid-cols-1 gap-y-28 md:gap-1.5 md:flex md:pr-4 md:pb-4 md:pl-4 md:pt-2 mb-6 max-w-7xl mx-auto mt-5 animate-in fade-in slide-in-from-top-2">
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
              {categories ? (
                <GeneralFilter
                  label="banco"
                  items={categories.data}
                  selected={selected}
                  onChange={setSelected}
                  multiple={true}
                />
              ) : (
                ""
              )}
              {categories ? (
                <GeneralFilter
                  label="tipo"
                  items={categories.data}
                  selected={selected}
                  onChange={setSelected}
                  multiple={true}
                />
              ) : (
                ""
              )}
              {categories ? (
                <GeneralFilter
                  label="tipo de cuenta"
                  items={categories.data}
                  selected={selected}
                  onChange={setSelected}
                  multiple={true}
                />
              ) : (
                ""
              )}
              {categories ? (
                <GeneralFilter
                  label="tag"
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
                value={finaldate ? finaldate.toISOString().split("T")[0] : ""}
                onChange={(e) => setfinalDate(new Date(e.target.value))}
                max={fechaFormateada}
              />
            </div>
          )}
          <hr className=" text-gray-200" />
          {data?.items.map((transaction) => {
            return (
              <TransactionCard key={transaction.id} transaction={transaction} />
            );
          })}
          {data?.pages != null ? (
            <NewPagination
              currentPage={page}
              totalPages={data ? data.pages : 0}
              onPageChange={onPageChange}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
