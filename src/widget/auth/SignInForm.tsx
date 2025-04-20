import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { Button, Input, Label, Separator } from "@/shared/ui";
import { useNavigate } from "react-router";
import { ISignInForm, useSignInForm, useSignIn } from "@/features/auth";

const SignInForm = () => {
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const { mutate } = useSignIn({
    onSuccess: (response) => {
      toast(`${response.student.name}님, 로그인되었습니다.`);
      navigate("/");
    },
    onError: () => {},
  });

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    mutate({
      studentId: data.student_id,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-l font-bold">로그인</h1>
        <p className="text-balance text-sm text-muted-foreground">
          경희대학교 소프트웨어 중심사업단 SW 마일리지
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex justify-between w-full">
            <Label htmlFor="student_id">학번</Label>
            {errors.student_id && (
              <p className="text-xs leading-none text-destructive">
                {errors.student_id.message}
              </p>
            )}
          </div>
          <Input
            id="student_id"
            type="text"
            placeholder="학번을 입력해주세요."
            {...register("student_id")}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between w-full">
            <Label htmlFor="password">비밀번호</Label>
            {errors.password && (
              <p className="text-xs leading-none text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("password")}
          />
        </div>
        <Button type="submit" className="w-full">
          로그인
        </Button>
        <Separator />
      </div>
      <div className="text-center text-sm">
        계정이 없으신가요?{" "}
        <a href="/sign-up" className="text-link">
          회원가입
        </a>
      </div>
    </form>
  );
};

export default SignInForm;
