import type { Address, ContractFunctionArgs, Hex } from "@kaiachain/viem-ext";

import { encodeFunctionData, getContract, TxType } from "@kaiachain/viem-ext";

import { CONTRACT, ContractEnum } from "../contract";
import { useKaiaAccount } from "./useKaiaAccount";
import { useKaiaClient } from "./useKaiaClient";
import { useKaiaWallet } from "./useKaiaWallet";

export const useKaiaContract = () => {
	const { currentAccount } = useKaiaAccount();
	const { provider } = useKaiaWallet();
	const { publicClient, createBrowserWalletClient } = useKaiaClient();

	const getContractInstance = (contractEnum: ContractEnum) => {
		return CONTRACT[contractEnum];
	};

	/**
	 *
	 * @param contractEnum: target contract enum (STUDENT_MANAGER, SW_MILEAGE_TOKEN)
	 * @param address: target contract address
	 * @param method: execute method name
	 * @param args: arguments for the method
	 * @returns
	 */
	const call = async (
		contractEnum: ContractEnum,
		address: Address,
		method: string,
		args: ContractFunctionArgs,
	) => {
		const contract = getContract({
			address,
			abi: getContractInstance(contractEnum).abi,
			client: publicClient,
		});

		return await contract.read[method]([...args]);
	};

	/**
	 *
	 * @param method: execute method name
	 * @param contractEnum: target contract enum (STUDENT_MANAGER, SW_MILEAGE_TOKEN)
	 * @param args: arguments for the method
	 * @returns
	 */
	const encodeAbi = (
		method: string,
		contractEnum: ContractEnum,
		args: ContractFunctionArgs,
	) =>
		encodeFunctionData({
			abi: getContractInstance(contractEnum).abi,
			functionName: method,
			args,
		});

	/**
	 *
	 * @param address: target contract address
	 * @param data: encoded data
	 * @param txType?: transaction type (default: FeeDelegatedSmartContractExecution)
	 * @returns
	 */
	const requestSignTransaction = async (
		address: Address,
		data: string,
		txType?: TxType,
	): Promise<Hex> => {
		if (!currentAccount) {
			throw new Error("지갑이 연결되어 있지 않습니다.");
		}

		const client = createBrowserWalletClient(provider);

		return (await client.signTransaction({
			type: txType ?? TxType.FeeDelegatedSmartContractExecution,
			to: address,
			from: currentAccount,
			data: data,
			value: "0",
		})) as Hex;
	};

	return {
		call,
		encodeAbi,
		requestSignTransaction,
	};
};
