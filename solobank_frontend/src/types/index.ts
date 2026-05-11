export type AccountType = "checking" | "savings" | "credit" | "invest" | "swap";

export interface AccountCard {
  type: AccountType;
  symbol: string;
  title: string;
  description: string;
  command: string;
  protocol: string;
}


export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}
