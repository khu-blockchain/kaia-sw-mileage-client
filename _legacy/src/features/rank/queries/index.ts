import { SuspenseQuery } from "@/features/_core/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGetRankRequest, useGetRankResponse } from "./type";
import { contractCall } from "@/shared/utils";
import { STUDENT_MANAGER_ABI, SW_MILEAGE_TOKEN_ABI } from "@/shared/constants";
import { ContractAddress } from "@/shared/types";

const useGetRank: SuspenseQuery<useGetRankRequest, useGetRankResponse> = (
  args
) => {
  return useSuspenseQuery({
    queryKey: ["get-rank"],
    queryFn: async () => {
      const swMileageToken = (await contractCall(
        import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
        STUDENT_MANAGER_ABI,
        "mileageToken",
        []
      )) as ContractAddress;

      console.log(33333);

      const point = await contractCall(
        swMileageToken,
        SW_MILEAGE_TOKEN_ABI,
        "getRankingRange",
        [1, 20]
      );
      console.log(point);
      return point;
    },
  });
};

export {
  useGetRank,
}
