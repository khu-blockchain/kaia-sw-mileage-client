import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { refreshAPI, signInAPI } from "./api";
import { getLocalStorageData, getToday, setLocalStorageData } from "@/shared/utils";
import { TokenType } from "@/entities";
import { signInRequest, signInResponse } from "./type";
import { Mutation, SuspenseQuery } from "@/features/_api";
import { useStudentStore } from "@/features/student/store";

// post 요청은 mutation이어야 한다는 법칙은 없음
const useRefresh: SuspenseQuery<void, signInResponse> = () => {
  const refreshToken = getLocalStorageData('refresh-token');
  const refreshExpires = getLocalStorageData('refresh-expires');
  const {setStudent} = useStudentStore((state) => state.actions);

  return useSuspenseQuery({
    queryKey: ['refresh'],
    queryFn: async () => {
      if (!refreshToken || refreshToken === null) {
        throw new Error('유효하지 않은 리프레시 토큰')
      }
      if (getToday().isAfter(refreshExpires)) {
        throw new Error('유효하지 않은 리프레시 토큰')
      }
      const result = await refreshAPI({ refreshToken });
      const {tokens} = result;
      const newToken = tokens[TokenType.REFRESH]
      setLocalStorageData('refresh-token', newToken.token);
      setLocalStorageData('refresh-expires', newToken.expires);
      setStudent(result)
      return result;
    },
    retry: false
  })
}

const useSignIn: Mutation<signInRequest, signInResponse> = (args) => {
  const {onSuccess, onError} = args
  const {setStudent} = useStudentStore((state) => state.actions);

  return useMutation({
    mutationFn: async(data) => {
      const result = await signInAPI(data);
      const {tokens} = result;
      const newToken = tokens[TokenType.REFRESH]
      setLocalStorageData('refresh-token', newToken.token);
      setLocalStorageData('refresh-expires', newToken.expires);
      setStudent(result)
      return result;
    },
    ...(onSuccess && {onSuccess: (res: any) => onSuccess(res)}),
    ...(onError && {onError: (res) => onError(res)})
  })
}

export {
  useRefresh,
  useSignIn
}