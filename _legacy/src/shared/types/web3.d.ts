// import { TransactionForSendRPC } from "caver-js";
import { TransactionRequest, Abi, ContractConstructorArgs, ContractFunctionArgs, Hex, Address } from "viem";

type Transaction = TransactionRequest;
type ABI = Abi;
type Bytecode = Hex;
type ConstructorArgs = ContractConstructorArgs;
type FunctionArgs = ContractFunctionArgs;
type ContractAddress = Address;

export type { Transaction, ABI, Bytecode, ConstructorArgs, FunctionArgs, ContractAddress, Address };
