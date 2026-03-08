import type {
	Abi,
	Address,
	ContractFunctionArgs,
	Hex,
} from "@kaiachain/viem-ext";
import type { ContractEnum } from "./contract";

import { TxType } from "@kaiachain/viem-ext";

type ABI = Abi;

const KaiaTxType = TxType;
const KAIROS_NETWORK_ID = 1001;

type Call = ({
	contractType,
	contractAddress,
	method,
	args,
}: {
	contractType: ContractEnum;
	contractAddress: Address;
	method: string;
	args: ContractFunctionArgs;
}) => Promise<unknown>;

type EncodeAbi = ({
	method,
	contractType,
	args,
}: {
	method: string;
	contractType: ContractEnum;
	args: ContractFunctionArgs;
}) => Hex;

type RequestSignTransaction = ({
	contractAddress,
	data,
	txType,
}: {
	contractAddress: Address;
	data: string;
	txType?: TxType;
}) => Promise<Hex>;

export type { ABI, Call, EncodeAbi, RequestSignTransaction };
export { KaiaTxType, KAIROS_NETWORK_ID };
