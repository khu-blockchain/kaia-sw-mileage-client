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
  const { setStudent } = useStudentStore((state) => state.actions);

  return useSuspenseQuery({
    queryKey: ["refresh"],
    queryFn: async () => {
      const result = await refreshAPI();
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
      });
      setStudent(result);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

export { useRefresh, useSignIn };
