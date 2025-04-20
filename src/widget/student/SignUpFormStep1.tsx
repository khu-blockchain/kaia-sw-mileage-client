import { RowLabelFormInput } from "@/shared/component";
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
      "student_id",
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
      <RowLabelFormInput
        label="학번"
        id="student_id"
        type="text"
        placeholder="학번을 입력해주세요."
        {...register("student_id")}
        required
      />
      <RowLabelFormInput
        label="비밀번호"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        {...register("password")}
        required
      />
      <RowLabelFormInput
        label="비밀번호 확인"
        id="confirm-password"
        type="password"
        placeholder="동일한 비밀번호를 입력해주세요."
        {...register("confirm_password")}
        required
      />
      {(errors.student_id?.message ||
        errors.password?.message ||
        errors.confirm_password?.message) && (
        <ErrorMessage
          className="ml-30"
          errors={errors}
          fields={[
            { field: "student_id", label: "학번" },
            { field: "password", label: "비밀번호" },
            { field: "confirm_password", label: "비밀번호 확인" },
          ]}
        />
      )}
      <Separator />
      <RowLabelFormInput
        label="이름"
        id="name"
        type="text"
        placeholder="이름을 입력해주세요."
        {...register("name")}
        required
        autoComplete="off"
      />
      <RowLabelFormInput
        label="학과"
        id="department"
        type="text"
        placeholder="학과를 입력해주세요."
        {...register("department")}
        required
        autoComplete="off"
      />
      <RowLabelFormInput
        label="이메일"
        id="email"
        type="text"
        placeholder="이메일을 입력해주세요."
        {...register("email")}
        required
        autoComplete="email"
      />
      <RowLabelFormInput
        label="전화번호"
        id="phone_number"
        type="text"
        placeholder="010-0000-0000 형식으로 입력해주세요."
        {...register("phone_number")}
        required
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
