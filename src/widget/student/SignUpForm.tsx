import { useSignUpForm } from "@/features/student";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import SignUpFormStep1 from "@/widget/student/SignUpFormStep1";
import SignUpFormStep2 from "@/widget/student/SignUpFormStep2";
import { Separator } from "@/shared/ui";

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const methods = useSignUpForm();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-med font-bold">회원가입</h1>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          <span>
            {"회원가입 진행 전, Kaia Wallet이 설치되어 있지 않다면\n"}
          </span>
          <span>
            <a
              target="_blank"
              href="https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi?hl=ko"
              className="underline underline-offset-4"
            >
              Chrome 웹 스토어
            </a>
            를 통해 설치해주세요. (이후 브라우저를 새로고침 해주세요.)
          </span>
        </p>
      </div>
      <FormProvider {...methods}>
        {currentStep === 1 && (
          <SignUpFormStep1 setCurrentStep={setCurrentStep} />
        )}
        {currentStep === 2 && (
          <SignUpFormStep2 setCurrentStep={setCurrentStep} />
        )}
      </FormProvider>
      <Separator />
      <div className="text-center text-sm">
        계정이 이미 존재하나요?{" "}
        <a href="/sign-in" className="text-link">
          로그인
        </a>
      </div>
    </div>
  );
};

export default SignUpForm;
