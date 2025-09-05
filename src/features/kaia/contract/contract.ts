import type { Abi } from "viem";

import { STUDENT_MANAGER_ABI, SW_MILEAGE_TOKEN_ABI } from "./abi";

export enum ContractEnum {
	STUDENT_MANAGER = "studentManager",
	SW_MILEAGE_TOKEN = "swMileageToken",
}

interface IContractParams {
	abi: Abi;
}

const ContractParams: Record<ContractEnum, IContractParams> = {
	[ContractEnum.STUDENT_MANAGER]: {
		abi: STUDENT_MANAGER_ABI,
	},
	[ContractEnum.SW_MILEAGE_TOKEN]: {
		abi: SW_MILEAGE_TOKEN_ABI,
	},
};

export default ContractParams;
