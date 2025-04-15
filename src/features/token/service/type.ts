import { SwMileageToken } from "@/entities";
import { ABI, Bytecode } from "@/shared/types";

type createTokenRequest = {
  swMileageTokenName: string;
  symbol: string;
  description: string;
  imageUrl: string;
  rlpEncodingString: string;
};

type createTokenResponse = {
  // sw_mileage_token_id: number;
  // sw_mileage_token_name: string;
  // contract_address: string;
  // sw_mileage_token_symbol: string;
  // sw_mileage_token_decimals: number;
  // sw_mileage_token_image_url: string;
  // contract_owner_address: string;
  // description: string;
  // is_paused: number;
  // is_activated: number;
  // created_at: string;
  // updated_at: string;
};

type getContractCodeResponse = {
  abi: ABI;
  bytecode: Bytecode;
};

type getSWMileageTokenResponse = SwMileageToken[];

type isRegisteredAdminRequest = {
  contractAddress: string;
  targetAddress: string;
};

type isRegisteredAdminResponse = {
  isValidAddress: boolean;
  isAdmin: boolean;
};

type activateTokenRequest = {
  swMileageTokenId: number;
};

type activateTokenResponse = SwMileageToken;

type registerAdminRequest = {
  swMileageTokenId: number;
  rawTransaction: string;
}

type registerAdminResponse = any;

export type {
  createTokenRequest,
  createTokenResponse,
  getContractCodeResponse,
  getSWMileageTokenResponse,
  isRegisteredAdminRequest,
  isRegisteredAdminResponse,
  activateTokenRequest,
  activateTokenResponse,
  registerAdminRequest,
  registerAdminResponse,
};
