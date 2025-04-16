import { SignUpInput } from "@/widget/student";
import { Button, Separator } from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@/shared/component";
import { ISignUpForm } from "@/features/student/form";

const SignUpFormStep1 = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: 1 | 2) => void;
}) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<ISignUpForm>();

  const handleStep1Submit = async () => {
    const isValid = await trigger([
      "id",
      "password",
      "confirm_password",
      "name",
      "department",
      "email",
      "phone_number",
    ]);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="grid gap-4 mt-4">
      <SignUpInput
        label="아이디"
        id="id"
        type="text"
        placeholder="아이디를 입력해주세요."
        register={register}
        required
        name="id"
      />
      <SignUpInput
        label="비밀번호"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        register={register}
        required
        name="password"
      />
      <SignUpInput
        label="비밀번호 확인"
        id="confirm-password"
        type="password"
        placeholder="동일한 비밀번호를 입력해주세요."
        register={register}
        required
        name="confirm_password"
      />
      {(errors.id?.message ||
        errors.password?.message ||
        errors.confirm_password?.message) && (
        <ErrorMessage
          className="ml-30"
          errors={errors}
          fields={[
            { field: "id", label: "아이디" },
            { field: "password", label: "비밀번호" },
            { field: "confirm_password", label: "비밀번호 확인" },
          ]}
        />
      )}
      <Separator />
      <SignUpInput
        label="이름"
        id="name"
        type="text"
        placeholder="이름을 입력해주세요."
        register={register}
        name="name"
        required
        autoComplete="off"
      />
      <SignUpInput
        label="학과"
        id="department"
        type="text"
        placeholder="학과를 입력해주세요."
        register={register}
        name="department"
        required
        autoComplete="off"
      />
      <SignUpInput
        label="이메일"
        id="email"
        type="text"
        placeholder="이메일을 입력해주세요."
        register={register}
        name="email"
        required
        autoComplete="off"
      />
      <SignUpInput
        label="전화번호"
        id="phone_number"
        type="text"
        placeholder="010-0000-0000 형식으로 입력해주세요."
        register={register}
        required
        name="phone_number"
        autoComplete="off"
      />
      {(errors.name?.message ||
        errors.department?.message ||
        errors.email?.message ||
        errors.phone_number?.message) && (
        <ErrorMessage
          className="ml-30"
          errors={errors}
          fields={[
            { field: "name", label: "이름" },
            { field: "department", label: "학과" },
            { field: "email", label: "이메일" },
            { field: "phone_number", label: "전화번호" },
          ]}
        />
      )}
      <Separator />
      <Button
        type="button"
        onClick={() => handleStep1Submit()}
        className="w-full"
      >
        다음
      </Button>
    </div>
  );
};

export default SignUpFormStep1;
