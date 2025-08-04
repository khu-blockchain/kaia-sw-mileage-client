import { kaia } from "@/shared/constants";
import { encodeDeployData, encodeFunctionData, getContract } from "viem";
import type {
  ABI,
  Bytecode,
  ConstructorArgs,
  FunctionArgs,
  ContractAddress,
} from "@/shared/types";

const encodeContractDeployABI = (
  abi: ABI,
  bytecode: Bytecode,
  args: ConstructorArgs
) => {
  return encodeDeployData({
    abi,
    bytecode,
    args,
  });
};

const encodeContractExecutionABI = (
  abi: ABI,
  functionName: string,
  args: FunctionArgs
) => {
  return encodeFunctionData({
    abi,
    functionName,
    args,
  });
};

const contractCall = async (
  contractAddress: ContractAddress,
  abi: ABI,
  method: string,
  args: FunctionArgs
) => {
  const contract = getContract({
    address: contractAddress,
    abi,
    client: { wallet: kaia.wallet, public: kaia.public },
  });

  const result = await contract.read[method]([...args]);

  return result;
};

export {
  encodeContractDeployABI,
  encodeContractExecutionABI,
  contractCall,
};
