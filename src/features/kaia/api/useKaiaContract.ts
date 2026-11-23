import type { Hex } from "@kaiachain/viem-ext";
import type { Call, EncodeAbi, RequestSignTransaction } from "../model/types";

import { encodeFunctionData, getContract, TxType } from "@kaiachain/viem-ext";

import {
	CONTRACT,
	ContractEnum,
	KAIROS_NETWORK_ID,
	KaiaTransactionError,
	toEstimateGasError,
	WRONG_NETWORK_MESSAGE,
} from "../model";
import { useKaiaAccount } from "./useKaiaAccount";
import { useKaiaClient } from "./useKaiaClient";
import { useKaiaWallet } from "./useKaiaWallet";

// Kaia Wallet의 기본 계산과 동일: 추정값 × 2 + 수수료 대납 가스
const FEE_DELEGATION_GAS = 10_000n;

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
			throw new KaiaTransactionError("지갑 연결 후 다시 시도해주세요.");
		}

		if (Number(provider?.networkVersion) !== KAIROS_NETWORK_ID) {
			throw new KaiaTransactionError(WRONG_NETWORK_MESSAGE);
		}

		// 서명 전에 실행 가능 여부를 확인한다.
		// gas 없이 서명을 요청하면 Kaia Wallet의 가스 추정이 실패했을 때
		// revert 사유 대신 BigNumber 오류가 발생하고 실패할 트랜잭션이 팝업에 남는다.
		const estimatedGas = await publicClient
			.estimateGas({
				account: currentAccount,
				to: contractAddress,
				data: data as Hex,
			})
			.catch((error) => {
				throw toEstimateGasError(error);
			});

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
			gasLimit: Number(estimatedGas * 2n + FEE_DELEGATION_GAS),
		})) as Hex;
	};

	return {
		call,
		encodeAbi,
		requestSignTransaction,
	};
};
