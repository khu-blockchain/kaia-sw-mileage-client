import { API, AuthServer } from "@/features/_api";
import { signInRequest, signInResponse, refreshRequest, refreshResponse } from "./type";

const signInAPI: API<signInRequest, signInResponse> = async(request) => {
  const {loginType, id, password} = request;
  
  try{
    const result = await AuthServer.post('login', {json: {
      loginType,
      id,
      password
    }}).json();
    return result as signInResponse;
  }catch(e){
    throw e;
  }
}

const refreshAPI: API<refreshRequest, refreshResponse> = async(request) => {
  const {refreshToken} = request;
  
  try{
    const result = await AuthServer.post('refresh-token', {json: {refreshToken}}).json();
    return result as refreshResponse;
  }catch(e){
    throw e;
  }
}

export {
  signInAPI,
  refreshAPI
}