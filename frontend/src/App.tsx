import { useEffect, useState } from "react";
import { getTransactions } from "./api/transactions";
import type { Transaction } from "./types/transactions";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  return (
    <div>
      <h1>Transacciones</h1>

      {transactions.map((t: Transaction) => (
        <div key={t.id}>
          {t.description} - {t.amount}
        </div>
      ))}
    </div>
  );
}

export default App;
