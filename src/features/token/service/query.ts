import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Mutation, SuspenseQuery } from "@/features/_api";
import {
  activateTokenRequest,
  activateTokenResponse,
  createTokenRequest,
  createTokenResponse,
  getSWMileageTokenResponse,
  isRegisteredAdminRequest,
  isRegisteredAdminResponse,
  registerAdminResponse,
} from "./type";
import {
  activateSwMileageTokenAPI,
  createTokenAPI,
  getSWMileageTokenAPI,
  registerAdminAPI,
} from "./api";
import {
  contractCall,
  encodeContractExecutionABI,
  requestSignTransaction,
} from "@/shared/utils";
import { SW_MILEAGE_TOKEN_ABI } from "@/shared/constants";

const useCreateToken: Mutation<createTokenRequest, createTokenResponse> = (
  args
) => {
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const result = await createTokenAPI(data);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useGetSwMileageTokenList: SuspenseQuery<
  void,
  getSWMileageTokenResponse
> = () => {
  return useSuspenseQuery({
    queryKey: ["get-sw-mileage-token-list"],
    queryFn: async () => {
      const result = await getSWMileageTokenAPI();
      return result;
    },
  });
};

const useActivateToken: Mutation<
  activateTokenRequest,
  activateTokenResponse
> = (args) => {
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const result = await activateSwMileageTokenAPI(data);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useIsRegisteredAdmin: SuspenseQuery<
  isRegisteredAdminRequest,
  isRegisteredAdminResponse
> = (args) => {
  const { contractAddress, targetAddress } = args;

  return useSuspenseQuery({
    queryKey: ["get-is-admin"],
    queryFn: async () => {
      if (!targetAddress || targetAddress === "") {
        return {
          isValidAddress: false,
          isAdmin: false,
        };
      }
      const result = await contractCall(
        contractAddress,
        SW_MILEAGE_TOKEN_ABI,
        "isAdmin",
        [targetAddress]
      );

      return {
        isValidAddress: true,
        isAdmin: result,
      };
    },
  });
};

const useRegisterAdmin: Mutation<
  { contractAddress: string; targetAddress: string; swMileageTokenId: number },
  registerAdminResponse
> = (args) => {
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const input = encodeContractExecutionABI(
        SW_MILEAGE_TOKEN_ABI,
        "addAdmin",
        [data.targetAddress]
      );

      const { rawTransaction } = await requestSignTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: data.targetAddress, 
        to: data.contractAddress,
        gas: '0x4C4B40',
        data: input,
      });
      console.log(data.swMileageTokenId);

      const result = await registerAdminAPI({
        swMileageTokenId: data.swMileageTokenId,
        rawTransaction,
      });
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};
export {
  useCreateToken,
  useGetSwMileageTokenList,
  useIsRegisteredAdmin,
  useActivateToken,
  useRegisterAdmin,
};
