import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Mutation, SuspenseQuery } from "@/features/_core/api";
import {
  useCreateWalletLostRequest,
  useCreateWalletLostResponse,
  useCheckHasWalletChangeProcessRequest,
  useCheckHasWalletChangeProcessResponse,
  useCreateWalletChangeRequest,
  useCreateWalletChangeResponse,
  useConfirmWalletChangeRequest,
  useConfirmWalletChangeResponse,
} from "./type";
import {
  createWalletLostAPI,
  checkHasNotConfirmedWalletLostAPI,
} from "@/features/wallet/api";
import {
  confirmWalletChangeAPI,
  createWalletChangeAPI,
  useStudentStore,
} from "@/features/student";
import { contractCall } from "@/shared/utils";
import { STUDENT_MANAGER_ABI } from "@/shared/constants";
import dayjs from "dayjs";

export const ZERO_ADDRESS =
  "0x0000000000000000000000000000000000000000" as const;

const useCreateWalletLost: Mutation<
  useCreateWalletLostRequest,
  useCreateWalletLostResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => {
      const result = await createWalletLostAPI(data);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useCreateWalletChange: Mutation<
  useCreateWalletChangeRequest,
  useCreateWalletChangeResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => {
      const result = await createWalletChangeAPI(data);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useConfirmWalletChange: Mutation<
  useConfirmWalletChangeRequest,
  useConfirmWalletChangeResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => {
      const result = await confirmWalletChangeAPI(data);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useCheckHasWalletChangeProcess: SuspenseQuery<
  useCheckHasWalletChangeProcessRequest,
  useCheckHasWalletChangeProcessResponse
> = () => {
  // 1. 지갑 변경 요청이 존재하는지
  // 2. 학생 주관 지갑 변경이 진행중인지 확인
  const student = useStudentStore((state) => state.actions).getStudent();

  return useSuspenseQuery({
    queryKey: ["check-has-wallet-change-process"],
    queryFn: async () => {
      const walletLostResult = await checkHasNotConfirmedWalletLostAPI({
        studentId: student.student_id,
      });
      if (walletLostResult.result) {
        return {
          result: true,
          data: {
            type: "WALLET_LOST",
            data: walletLostResult.data,
          },
        };
      }

      const { createdAt, targetAccount } = (await contractCall(
        import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
        STUDENT_MANAGER_ABI,
        "getPendingAccountChange",
        [student.student_hash]
      )) as { createdAt: BigInt; targetAccount: string };

      console.log(createdAt);

      if (targetAccount !== ZERO_ADDRESS) {
        return {
          result: true,
          data: {
            type: "WALLET_CHANGE",
            data: {
              targetAccount,
            },
          },
        };
      }
      return {
        result: false,
        data: null,
      };
    },
  });
};

export {
  useCreateWalletLost,
  useCheckHasWalletChangeProcess,
  useCreateWalletChange,
  useConfirmWalletChange,
};
