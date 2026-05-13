export interface Bank {
  id: number;
  name: string;
}

export interface CardRead {
  id: number;
  name: string;
  last_four: string | null;
  billing_day: number | null;
  credit_limit: number | null;
}

export interface AccountResponse {
  id: number;
  name: string;
  type: "corriente" | "vista" | "ahorro";
  bank: Bank;
  cards: CardRead[];
}

export interface AccountCreate {
  bank_id: number;
  name: string;
  type: string;
}

export interface AccountUpdate {
  name?: string;
  type?: string;
}

export interface CardCreate {
  account_id: number;
  name: string;
  last_four?: string;
  billing_day?: number;
  credit_limit?: number;
}

export interface CardUpdate {
  name?: string;
  last_four?: string;
  billing_day?: number;
  credit_limit?: number;
}
