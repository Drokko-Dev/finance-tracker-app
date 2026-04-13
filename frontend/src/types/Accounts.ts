export interface Account {
  id: number;
  user_id: number;
  name: string;
  type: "expense" | "income" | "saving";
  bank: string;
}

export interface Bank {
  id: number;
  name: string;
}
