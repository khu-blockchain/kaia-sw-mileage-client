import type { ContractAddress } from "@shared/lib/web3";

import { useQuery } from "@tanstack/react-query";

import { STUDENT_MANAGER_ABI, SW_MILEAGE_TOKEN_ABI } from "@shared/config";
import { contractCall } from "@shared/lib/web3";

export const useGetMileagePoint = ({
	targetAddress,
}: {
	targetAddress: string;
}) => {
	return useQuery({
		queryKey: ["get-mileage-point", targetAddress],
		placeholderData: 0,
		queryFn: async () => {

			if (targetAddress === "" || !targetAddress) {
				return 0;
			}

			const studentManagerContract = import.meta.env
				.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS;

			const swMileageToken = (await contractCall(
				studentManagerContract,
				STUDENT_MANAGER_ABI,
				"mileageToken",
				[],
			)) as ContractAddress;

      console.log(swMileageToken)

			const point = await contractCall(
				swMileageToken,
				SW_MILEAGE_TOKEN_ABI,
				"balanceOf",
				[targetAddress],
			);
			//TODO: point 있을 때 wei 처리해야하는지 확인
			return point;
		},
		retry: false,
	});
};
