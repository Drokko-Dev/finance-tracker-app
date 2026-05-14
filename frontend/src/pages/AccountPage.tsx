import { useState } from "react";
import { Plus, Building2, Pencil, Trash2, CreditCard } from "lucide-react";
import { useAccounts } from "@/features/account/hooks/useAccounts";
import type { AccountResponse, CardRead } from "@/types/Accounts";
import { CreditCardWidget } from "@/features/account/components/CreditCardWidget";
import { AccountModal } from "@/features/account/components/AccountModal";
import { CardModal } from "@/features/account/components/CardModal";

const TYPE_BADGE: Record<string, { label: string; bg: string; text: string }> =
  {
    corriente: {
      label: "corriente",
      bg: "bg-blue-500/10",
      text: "text-blue-600",
    },
    vista: { label: "vista", bg: "bg-green-500/10", text: "text-green-700" },
    ahorro: { label: "ahorro", bg: "bg-amber-500/10", text: "text-amber-700" },
  };

const CARD_COLORS = [
  "from-[#0f3460] to-[#1a1a2e]",
  "from-[#1b4332] to-[#081c15]",
  "from-[#3d0066] to-[#1a0033]",
  "from-[#7b2d00] to-[#3d1700]",
];

export const AccountsPage = () => {
  const {
    accounts,
    banks,
    isAccountsLoading,
    addAccount,
    editAccount,
    removeAccount,
    addCard,
    editCard,
    removeCard,
  } = useAccounts();

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountResponse | null>(
    null,
  );
  const [editingCard, setEditingCard] = useState<CardRead | null>(null);
  const [targetAccountId, setTargetAccountId] = useState<number | null>(null);

  const grouped = accounts
    ? Object.values(
        accounts.reduce(
          (acc, account) => {
            const bankId = account.bank.id;
            if (!acc[bankId])
              acc[bankId] = { bank: account.bank, accounts: [] };
            acc[bankId].accounts.push(account);
            return acc;
          },
          {} as Record<
            number,
            { bank: { id: number; name: string }; accounts: AccountResponse[] }
          >,
        ),
      )
    : [];

  const openAddCard = (accountId: number) => {
    setTargetAccountId(accountId);
    setEditingCard(null);
    setIsCardModalOpen(true);
  };

  const openEditCard = (accountId: number, card: CardRead) => {
    setTargetAccountId(accountId);
    setEditingCard(card);
    setIsCardModalOpen(true);
  };

  const openEditAccount = (account: AccountResponse) => {
    setEditingAccount(account);
    setIsAccountModalOpen(true);
  };

  if (isAccountsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-subtle text-sm">Cargando cuentas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Mis cuentas</h1>
          <p className="text-sm text-text-subtle">
            Administra tus cuentas y tarjetas
          </p>
        </div>
        <button
          onClick={() => {
            setEditingAccount(null);
            setIsAccountModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle text-sm font-semibold text-text-subtle hover:text-principal hover:border-principal/40 transition-all cursor-pointer"
        >
          <Plus size={16} /> Nueva cuenta
        </button>
      </div>

      {/* Sin cuentas */}
      {grouped.length === 0 && (
        <div className="bg-card-bg border border-border-subtle rounded-2xl p-12 flex flex-col items-center gap-3">
          <Building2 size={36} className="text-text-subtle" />
          <p className="text-text-subtle text-sm">
            No tenés cuentas registradas.
          </p>
          <button
            onClick={() => setIsAccountModalOpen(true)}
            className="text-principal text-sm font-semibold hover:underline cursor-pointer"
          >
            Crear tu primera cuenta
          </button>
        </div>
      )}

      {/* Secciones por banco */}
      {grouped.map(({ bank, accounts: bankAccounts }) => (
        <div
          key={bank.id}
          className="bg-card-bg border border-border-subtle rounded-2xl overflow-hidden"
        >
          {/* Header banco */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border-subtle">
            <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
              <Building2 size={20} className="text-text-subtle" />
            </div>
            <div>
              <p className="font-semibold text-text-main">{bank.name}</p>
              <p className="text-xs text-text-subtle">
                {bankAccounts.length}{" "}
                {bankAccounts.length === 1 ? "cuenta" : "cuentas"} ·{" "}
                {bankAccounts.reduce((n, a) => n + a.cards.length, 0)} tarjetas
              </p>
            </div>
          </div>

          {/* Cuentas */}
          <div className="flex flex-col gap-3 p-4">
            {bankAccounts.map((account) => {
              const badge = TYPE_BADGE[account.type] ?? TYPE_BADGE.corriente;
              return (
                <div
                  key={account.id}
                  className="group bg-background border border-border-subtle/50 rounded-xl p-4"
                >
                  {/* Fila cuenta */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-text-main">
                          {account.name}
                        </p>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${badge.bg} ${badge.text}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-text-subtle">
                        Saldo calculado desde transacciones
                      </p>
                    </div>
                    <div className="flex flex-shrink-0">
                      <button
                        onClick={() => openEditAccount(account)}
                        className="w-8 h-8 rounded-lg border border-border-subtle flex items-center justify-center text-text-subtle hover:text-principal hover:border-principal/40 transition-all cursor-pointer"
                        title="Editar cuenta"
                      >
                        <Pencil size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Tarjetas */}
                  <div className="border-t border-border-subtle pt-3">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs font-semibold text-text-subtle">
                        Tarjetas de crédito
                      </p>
                      <button
                        onClick={() => openAddCard(account.id)}
                        className="flex items-center gap-1 text-xs text-text-subtle hover:text-principal border border-border-subtle hover:border-principal/40 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                      >
                        <Plus size={12} /> Agregar tarjeta
                      </button>
                    </div>

                    <div
                      className="flex gap-3 overflow-x-auto pb-1
                      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                      {account.cards.map((card, idx) => (
                        <CreditCardWidget
                          key={card.id}
                          card={card}
                          colorClass={CARD_COLORS[idx % CARD_COLORS.length]}
                          onEdit={() => openEditCard(account.id, card)}
                          onDelete={() =>
                            removeCard({
                              accountId: account.id,
                              cardId: card.id,
                            })
                          }
                        />
                      ))}

                      {/* Placeholder agregar */}
                      <button
                        onClick={() => openAddCard(account.id)}
                        className="min-w-[200px] h-[130px] flex-shrink-0 rounded-2xl border-2 border-dashed border-border-subtle flex flex-col items-center justify-center gap-2 text-text-subtle hover:border-principal/40 hover:text-principal transition-all cursor-pointer"
                      >
                        <CreditCard size={22} />
                        <span className="text-xs font-semibold">
                          Agregar tarjeta
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Modales */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        editing={editingAccount}
        banks={banks ?? []}
        onSave={(data) => {
          if (editingAccount) {
            editAccount({ accountId: editingAccount.id, data });
          } else {
            addAccount(data as any);
          }
          setIsAccountModalOpen(false);
        }}
        onDelete={(id) => removeAccount(id)}
      />

      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        editing={editingCard}
        accountId={targetAccountId!}
        onSave={(data) => {
          if (editingCard && targetAccountId) {
            editCard({
              accountId: targetAccountId,
              cardId: editingCard.id,
              data,
            });
          } else {
            addCard({
              accountId: targetAccountId!,
              data: {
                account_id: targetAccountId!,
                name: data.name!,
                last_four: data.last_four,
                billing_day: data.billing_day,
                credit_limit: data.credit_limit,
              },
            });
          }
          setIsCardModalOpen(false);
        }}
      />
    </div>
  );
};
