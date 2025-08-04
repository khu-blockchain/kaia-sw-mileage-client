import { WalletHistory } from "@/entities/walletHistory";

type createWalletLostAPIRequest = {
  studentId: string;
  targetAddress: string;
};

type createWalletLostAPIResponse = void;

type checkHasNotConfirmedWalletLostAPIRequest = {
  studentId: string;
};

type checkHasNotConfirmedWalletLostAPIResponse = {
  result: boolean;
  data: WalletHistory | null;
};

export type {
  createWalletLostAPIRequest,
  createWalletLostAPIResponse,
  checkHasNotConfirmedWalletLostAPIRequest,
  checkHasNotConfirmedWalletLostAPIResponse,
};
