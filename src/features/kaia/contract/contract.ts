import { STUDENT_MANAGER_ABI, SW_MILEAGE_TOKEN_ABI } from "./abi";

export enum ContractEnum {
	STUDENT_MANAGER = "studentManager",
  SW_MILEAGE_TOKEN = "swMileageToken",
}

const ContractParams = {
	[ContractEnum.STUDENT_MANAGER]: {
		address: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
		abi: STUDENT_MANAGER_ABI,
	},
	[ContractEnum.SW_MILEAGE_TOKEN]: {
		abi: SW_MILEAGE_TOKEN_ABI,
	},
};

export default ContractParams;
