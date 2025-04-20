import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Query, SuspenseQuery } from "@/features/_core/api";
import {
  useGetMileagePointRequest,
  useGetMileagePointResponse,
  useGetSWMileageTokenRequest,
  useGetSWMileageTokenResponse,
} from "./type";

import {
  getActiveSwMileageTokenAPI,
  getSWMileageTokenAPI,
} from "@/features/token/api";
import { contractCall } from "@/shared/utils";
import { SW_MILEAGE_TOKEN_ABI } from "@/shared/constants";

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
      const result = await getActiveSwMileageTokenAPI();
      const contractAddress = result.contract_address;
      const point = await contractCall(
        contractAddress,
        SW_MILEAGE_TOKEN_ABI,
        "balanceOf",
        [targetAddress]
      );
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
