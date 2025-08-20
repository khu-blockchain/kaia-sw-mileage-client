import type { Address, ContractFunctionArgs } from "@kaiachain/viem-ext";

import { getContract } from "@kaiachain/viem-ext";

import { CONTRACT, ContractEnum } from "../contract";
import { useKaiaClient } from "./useKaiaClient";

export const useSwMileageToken = () => {
	const { publicClient } = useKaiaClient();
	const swMileageToken = CONTRACT[ContractEnum.SW_MILEAGE_TOKEN];

	const call = async (
		address: Address,
		method: string,
		args: ContractFunctionArgs,
	) => {
		const contract = getContract({
			address,
			abi: swMileageToken.abi,
			client: publicClient,
		});

		return await contract.read[method]([...args]);
	};

	return {
		call,
	};
};
