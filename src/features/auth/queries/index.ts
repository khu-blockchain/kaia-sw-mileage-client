import { TokenType } from "@/entities/auth";
import {
  getLocalStorageData,
  getToday,
  setLocalStorageData,
} from "@/shared/utils";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { SuspenseQuery, Mutation } from "@/features/_core/api";
import { useStudentStore } from "@/features/student";
import { refreshAPI, signInAPI } from "@/features/auth/api";
import {
  useRefreshRequest,
  useRefreshResponse,
  useSignInRequest,
  useSignInResponse,
} from "./type";

// post 요청은 mutation이어야 한다는 법칙은 없음
const useRefresh: SuspenseQuery<useRefreshRequest, useRefreshResponse> = () => {
  const refreshToken = getLocalStorageData("refresh-token");
  const refreshExpires = getLocalStorageData("refresh-expires");
  const { setStudent } = useStudentStore((state) => state.actions);

  return useSuspenseQuery({
    queryKey: ["refresh"],
    queryFn: async () => {
      if (!refreshToken || refreshToken === null) {
        throw new Error("유효하지 않은 리프레시 토큰");
      }
      if (getToday().isAfter(refreshExpires)) {
        throw new Error("유효하지 않은 리프레시 토큰");
      }
      const result = await refreshAPI({ refreshToken });
      const { tokens } = result;
      const newToken = tokens[TokenType.REFRESH];
      setLocalStorageData("refresh-token", newToken.token);
      setLocalStorageData("refresh-expires", newToken.expires);
      setStudent(result);
      return result;
    },
    retry: false,
  });
};

const useSignIn: Mutation<useSignInRequest, useSignInResponse> = (args) => {
  const { onSuccess, onError } = args;
  const { setStudent } = useStudentStore((state) => state.actions);

  return useMutation({
    mutationFn: async (data) => {
      const result = await signInAPI({
        id: data.studentId,
        password: data.password,
        loginType: "STUDENT",
      });
      const { tokens } = result;
      const newToken = tokens[TokenType.REFRESH];
      setLocalStorageData("refresh-token", newToken.token);
      setLocalStorageData("refresh-expires", newToken.expires);
      setStudent(result);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

export { useRefresh, useSignIn };
