import type { Hex } from "@kaiachain/viem-ext";
import type { Call, EncodeAbi, RequestSignTransaction } from "../model/types";

import { encodeFunctionData, getContract, TxType } from "@kaiachain/viem-ext";

import { CONTRACT, ContractEnum } from "../model";
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

	const call: Call = async ({
		contractType,
		contractAddress,
		method,
		args,
	}) => {
		const contract = getContract({
			address: contractAddress,
			abi: getContractInstance(contractType).abi,
			client: publicClient,
		});

		return await contract.read[method]([...args]);
	};

	const encodeAbi: EncodeAbi = ({ method, contractType, args }) =>
		encodeFunctionData({
			abi: getContractInstance(contractType).abi,
			functionName: method,
			args,
		});

	const requestSignTransaction: RequestSignTransaction = async ({
		contractAddress,
		data,
		txType,
	}) => {
		if (!currentAccount) {
			throw new Error("지갑 연결 후 다시 시도해주세요.");
		}

		// Kaia Wallet이 내부 캐시된 nonce를 사용하면 tx 실패 후 재시도 시
		// stale nonce로 또 실패하는 문제 발생
		// → 온체인에서 실제 nonce를 조회하여 명시적으로 전달
		const nonce = await publicClient.getTransactionCount({
			address: currentAccount,
		});

		const client = createBrowserWalletClient(provider);

		return (await client.signTransaction({
			type: txType ?? TxType.FeeDelegatedSmartContractExecution,
			to: contractAddress,
			from: currentAccount,
			data: data,
			value: "0",
			nonce,
		})) as Hex;
	};

	return {
		call,
		encodeAbi,
		requestSignTransaction,
	};
};
