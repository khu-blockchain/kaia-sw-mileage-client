import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Query, SuspenseQuery } from "@/features/_core/api";
import {
  useGetMileagePointRequest,
  useGetMileagePointResponse,
  useGetSWMileageTokenRequest,
  useGetSWMileageTokenResponse,
} from "./type";

import {
  getSWMileageTokenAPI,
} from "@/features/token/api";
import { contractCall } from "@/shared/utils";
import { STUDENT_MANAGER_ABI, SW_MILEAGE_TOKEN_ABI } from "@/shared/constants";
import { ContractAddress } from "@/shared/types";

const useGetMileagePoint: Query<
  useGetMileagePointRequest,
  useGetMileagePointResponse
> = ({ targetAddress }) => {
  return useQuery({
    queryKey: ["get-mileage-point", targetAddress],
    placeholderData: 0,
    queryFn: async () => {
      if (targetAddress === "" || !targetAddress) {
        return 0;
      }
      const studentManagerContract = import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS;

      const swMileageToken = await contractCall(
        studentManagerContract,
        STUDENT_MANAGER_ABI,
        "mileageToken",
        []
      ) as ContractAddress;

      const point = await contractCall(
        swMileageToken,
        SW_MILEAGE_TOKEN_ABI,
        "balanceOf",
        [targetAddress]
      );
      //TODO: point 있을 때 wei 처리해야하는지 확인
      console.log(point);
      return 100;
    },
    retry: false,
  });
};

// const useGetActiveSwMileageToken: Query<
//   useGetActiveSwMileageTokenRequest,
//   useGetActiveSwMileageTokenResponse
// > = () => {
//   return useQuery({
//     queryKey: ["get-active-sw-mileage-token"],
//     queryFn: async () => {
//       const result = await getActiveSwMileageTokenAPI();
//       return result;
//     },
//   });
// };

const useGetSwMileageTokenList: SuspenseQuery<
  useGetSWMileageTokenRequest,
  useGetSWMileageTokenResponse
> = () => {
  return useSuspenseQuery({
    queryKey: ["get-sw-mileage-token-list"],
    queryFn: async () => {
      const result = await getSWMileageTokenAPI();
      return result;
    },
  });
};

export { useGetSwMileageTokenList, useGetMileagePoint };
