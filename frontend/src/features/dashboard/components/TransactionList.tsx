import { useQuery } from "@tanstack/react-query";
import { getTransactions, getSummarizedTransactions } from "@/api/transactions"; // La ruta de tu archivo

// 1. Ya no necesitamos la interface TransactionListProps ni recibir el userId
export const TransactionList = () => {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    // 2. La caché ahora es global para el usuario logueado en esta sesión
    queryKey: ["SummarizedTransactions"],
    // 3. Llamamos a la función sin parámetros (el backend leerá la cookie)
    queryFn: () => getSummarizedTransactions(),
  });

  if (isLoading) return <p>Cargando transacciones de Finanz...</p>;
  if (isError) return <p>Error al cargar los datos.</p>;

  return (
    <ul>
      {transactions?.map((t) => (
        <li key={t.id}>
          {t.description} - ${t.amount}
        </li>
      ))}
    </ul>
  );
};
