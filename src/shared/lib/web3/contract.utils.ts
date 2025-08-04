import type {
	ABI,
	Bytecode,
	ConstructorArgs,
	ContractAddress,
	FunctionArgs,
} from "./types";

import {
	encodeDeployData,
	encodeFunctionData,
	getContract,
} from "@kaiachain/viem-ext";

import { kaia } from "./kaia-client";

const encodeContractDeployABI = (
	abi: ABI,
	bytecode: Bytecode,
	args: ConstructorArgs,
) =>
	encodeDeployData({
		abi,
		bytecode,
		args,
	});
const encodeContractExecutionABI = (
	abi: ABI,
	functionName: string,
	args: FunctionArgs,
) =>
	encodeFunctionData({
		abi,
		functionName,
		args,
	});

const contractCall = async (
	contractAddress: ContractAddress,
	abi: ABI,
	method: string,
	args: FunctionArgs,
) => {
	const contract = getContract({
		address: contractAddress,
		abi,
		client: { wallet: kaia.wallet, public: kaia.public },
	});

	return await contract.read[method]([...args]);
};

export { encodeContractDeployABI, encodeContractExecutionABI, contractCall };
