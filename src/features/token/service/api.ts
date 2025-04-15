import { API, SwMileageTokenServer } from "@/features/_api";
import { activateTokenRequest, activateTokenResponse, createTokenRequest, createTokenResponse, getSWMileageTokenResponse, registerAdminRequest, registerAdminResponse } from "./type";

const createTokenAPI: API<createTokenRequest, createTokenResponse> = async(request) => {
  const {swMileageTokenName, symbol, description, imageUrl, rlpEncodingString} = request;
  
  try{
    const result = await SwMileageTokenServer.post('', {json: {
      swMileageTokenName, 
      symbol,
      description,
      imageUrl,
      rlpEncodingString
    }}).json();
    return result as createTokenResponse;
  }catch(e){
    throw e;
  }
}

const getSWMileageTokenAPI: API<void, getSWMileageTokenResponse> = async() => {
  try{
    const result = await SwMileageTokenServer.get('').json();
    return result as getSWMileageTokenResponse;
  }catch(e){
    throw e;
  }
}

const activateSwMileageTokenAPI: API<activateTokenRequest, activateTokenResponse> = async(request) => {
  const {swMileageTokenId} = request;
  try{
    const result = await SwMileageTokenServer.post(`${swMileageTokenId}/activate`).json();
    return result as activateTokenResponse;
  }catch (e) {
    throw e
  }
}

const registerAdminAPI: API<registerAdminRequest, registerAdminResponse> = async(request) => {
  const {swMileageTokenId, rawTransaction} = request;
  try{
    const result = await SwMileageTokenServer.post(`${swMileageTokenId}/add-admin`, {json: {rawTransaction}}).json();
    return result as registerAdminResponse;
  }catch(e){
    throw e;
  }
} 

export {
  createTokenAPI,
  getSWMileageTokenAPI,
  activateSwMileageTokenAPI,
  registerAdminAPI
}