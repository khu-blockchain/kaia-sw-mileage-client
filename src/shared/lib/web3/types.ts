import type {
	Abi,
	Address,
	ContractConstructorArgs,
	ContractFunctionArgs,
	Hex,
	TransactionRequest,
} from "@kaiachain/viem-ext";

import { TxType } from "@kaiachain/viem-ext";

type Transaction = TransactionRequest;
type ABI = Abi;
type Bytecode = Hex;
type ConstructorArgs = ContractConstructorArgs;
type FunctionArgs = ContractFunctionArgs;
type ContractAddress = Address;
type RawTransaction = Hex;
const KaiaTxType = TxType;

export type {
	Transaction,
	ABI,
	Bytecode,
	ConstructorArgs,
	FunctionArgs,
	ContractAddress,
	Address,
	RawTransaction,
};
export { KaiaTxType };
