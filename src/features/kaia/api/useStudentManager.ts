import type { ContractFunctionArgs, Hex } from "@kaiachain/viem-ext";

import {
	encodeFunctionData,
	getContract,
	TxType as KaiaTxType,
} from "@kaiachain/viem-ext";

import { CONTRACT, ContractEnum } from "../contract";
import { useKaiaAccount } from "./useKaiaAccount";
import { useKaiaClient } from "./useKaiaClient";

export const useStudentManager = () => {
	const { currentAccount } = useKaiaAccount();
	const { publicClient, walletClient } = useKaiaClient();
	const studentManager = CONTRACT[ContractEnum.STUDENT_MANAGER];

	const call = async (method: string, args: ContractFunctionArgs) => {
		const contract = getContract({
			address: studentManager.address,
			abi: studentManager.abi,
			client: publicClient,
		});

		return await contract.read[method]([...args]);
	};

	// Deploy Tx를 위한 encode function이 필요하지 않기에, 함수명은 아래와 같이 명명되었습니다.
	// 만약 Deploy Tx를 위한 encode function이 필요하다면, 명확한 역할 분리를 위해 함수명이 변경되어야 할 수 있습니다.
	const encodeAbi = (method: string, args: ContractFunctionArgs) =>
		encodeFunctionData({
			abi: studentManager.abi,
			functionName: method,
			args,
		});

	const requestSignTransaction = async (data: Hex): Promise<Hex> => {
		if (!currentAccount) {
			throw new Error("지갑이 연결되어 있지 않습니다.");
		}
		const tx = await publicClient.prepareTransactionRequest({
			type: KaiaTxType.FeeDelegatedSmartContractExecution,
			from: currentAccount,
			to: studentManager.address,
			data: data,
			value: "0",
		});

		const rawTransaction = await walletClient.signTransaction(tx);
		return rawTransaction as Hex;
	};

	return {
		call,
		encodeAbi,
		requestSignTransaction,
	};
};
