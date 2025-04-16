import { caver, provider } from "@/shared/constants";
import { ABI, Bytecode, Transaction } from "@/shared/types";

const encodeContractDeployABI = (abi: ABI, bytecode: Bytecode, args: Array<any>) => {
  const contract = caver.contract.create(abi);
  const input = contract.deploy({
    data: bytecode,
    arguments: args,
  }).encodeABI();
  return input;
}

const encodeContractExecutionABI = (abi: ABI, method: string, args: Array<any>) => {
  const contract = caver.contract.create(abi);
  const input = contract.methods[method](...args).encodeABI();
  return input;
}

const requestSignTransaction = async(transaction: Transaction) => {
  return await provider.request({
    method: "klay_signTransaction",
    params: [transaction],
  });
}

const contractCall = async (contractAddress: string, abi: ABI, method: string, args: Array<any>) => {
  const contract = caver.contract.create(abi, contractAddress);
  return await contract.methods[method](...args).call();
}

export { 
  encodeContractDeployABI,
  encodeContractExecutionABI,
  requestSignTransaction,
  contractCall
 };
