import { Address } from "@/shared/types";

type WalletHistory = {
  wallet_history_id: number;
  student_id: string;
  address: Address;
  target_address: Address;
  is_confirmed: 0 | 1;
  created_at: string;
};

export type { WalletHistory };
