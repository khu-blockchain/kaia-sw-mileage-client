import { WalletHistory } from "@/entities/walletHistory";

type useCreateWalletLostRequest = {
  studentId: string;
  targetAddress: string;
};

type useCreateWalletLostResponse = void;

type useCheckHasWalletChangeProcessRequest = void;

type useCheckHasWalletChangeProcessResponse =
  | hasWalletChangeProcessResponse
  | hasNotWalletChangeProcessResponse;

type hasNotWalletChangeProcessResponse = {
  result: false;
  data: null;
};

type hasWalletChangeProcessResponse = {
  result: true;
  data: walletChangeResponse | walletLostResponse;
};

type walletChangeResponse = {
  type: "WALLET_CHANGE";
  data: {
    createdAt: string;
    targetAccount: string;
  };
};

type walletLostResponse = {
  type: "WALLET_LOST";
  data: WalletHistory;
};

type useCreateWalletChangeRequest = {
  studentId: string;
  rawTransaction: string;
};

type useCreateWalletChangeResponse = void;

type useConfirmWalletChangeRequest = {
  studentId: string;
  rawTransaction: string;
};

type useConfirmWalletChangeResponse = void;


export type {
  useCreateWalletLostRequest,
  useCreateWalletLostResponse,
  useCheckHasWalletChangeProcessRequest,
  useCheckHasWalletChangeProcessResponse,
  useCreateWalletChangeRequest,
  useCreateWalletChangeResponse,
  useConfirmWalletChangeRequest,
  useConfirmWalletChangeResponse,
};
