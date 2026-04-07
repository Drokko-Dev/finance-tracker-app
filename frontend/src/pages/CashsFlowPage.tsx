import { GeneralFilter, DateInput } from "@/components/GeneralFilter";
import { GlassCard } from "@/components/ui/GlassCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { useState, useEffect } from "react";
import TablaFinanzas from "@/features/cashFlow/components/Table";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface Transaccion {
  id: number;
  monto: number;
  categoria: string;
  fecha: string;
  descripcion: string;
}

interface OptionItem {
  id: string | number;
  name: string;
}

const hoy = new Date(Date.now());
const fechaFormateada = hoy.toISOString().split("T")[0];

console.log(fechaFormateada);

export function CashsFlowPage() {
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<string>("2024-01-01");
  const [selected, setSelected] = useState<OptionItem[]>([]);
  const [data, setData] = useState<Transaccion[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<OptionItem[]>([]);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    // Usamos AbortController para evitar fugas de memoria en el desmontaje
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/exampleData.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        // Tipamos el resultado del JSON
        const result: Transaccion[] = await response.json();
        console.log(result);

        setData(result);
        const unicas = [...new Set(result.map((t) => t.categoria))];
        const formatoOpciones: OptionItem[] = unicas.map((nombre, index) => ({
          id: index + 1, // Generamos un ID numérico simple
          name: nombre,
        }));
        setCategorias(formatoOpciones);
      } catch (err) {
        // En TS, el error en catch es de tipo 'unknown' por seguridad
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } else {
          setError("Ocurrió un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: cancela la petición si el componente se destruye
    return () => controller.abort();
  }, []);

  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    console.log(search);
  };
  console.log(data);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen bg-main-bg md:p-2 font-sans md:min-w-100 ">
          <GlassCard className="overflow: visible md:min-w-95">
            <SearchBar onSvgClick={handleClick} onchangeInput={handleChange} />
            <div className="flex flex-col sm:flex-row gap-4 w-full md:mt-4 md:justify-center">
              <GeneralFilter
                label="categoria"
                items={categorias}
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

            {data && <TablaFinanzas data={data} />}
          </GlassCard>
        </div>
      )}
    </>
  );
}
