import { ISignUpForm, useSignUp } from "@/features/student";
import { ConnectButton, ErrorMessage } from "@/shared/component";
import { BANK_CODE } from "@/shared/constants";
import {
  Input,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/shared/ui";
import { useFormContext, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { kaia } from "@/shared/constants";
import { encodeContractExecutionABI } from "@/shared/utils";
import { STUDENT_MANAGER_ABI } from "@/shared/constants/contract";
import { keccak256, encodePacked, toHex } from "viem";

const SignUpFormStep2 = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: 1 | 2) => void;
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
    control,
    trigger,
  } = useFormContext<ISignUpForm>();

  const { mutate, isPending } = useSignUp({
    onSuccess: (response) => {
      toast(`${response.name}님, 회원가입이 완료되었습니다.`);
      navigate("/sign-in");
    },
    onError: () => {},
  });
  console.log(import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,)


  const onStep2Submit: SubmitHandler<ISignUpForm> = async (data) => {
    const isValid = await trigger([
      "wallet_address",
      "bank_account_number",
      "bank_code",
    ]);
    //이미 step1을 통과했으므로, 2를 통과하면 모든 데이터가 존재한다고 가정할 수 있음.
    if (isValid) {
      const studentIdHash = keccak256(encodePacked(['string'], [data.student_id!]));
      console.log(studentIdHash)
      const transaction = encodeContractExecutionABI(
        STUDENT_MANAGER_ABI,
        "registerStudent",
        [studentIdHash]
      );

      const {rawTransaction} = await kaia.wallet.klaySignTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: kaia.browserProvider.selectedAddress,
        to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
        data: transaction,
        gas: "0x4C4B40",
      });
      mutate({
        studentId: data.student_id!,
        password: data.password!,
        passwordConfirm: data.confirm_password!,
        name: data.name!,
        email: data.email!,
        walletAddress: data.wallet_address!,
        phoneNumber: data.phone_number!,
        department: data.department!,
        bankAccountNumber: data.bank_account_number!,
        bankCode: data.bank_code!,
        rawTransaction: rawTransaction,
        studentHash: studentIdHash,
      });
    }
  };

  const setWalletAddress = (address: string[]) => {
    clearErrors("wallet_address");
    setValue("wallet_address", address[0]);
  };

  return (
    <form onSubmit={handleSubmit(onStep2Submit)} className="grid gap-4 mt-4">
      <div className="flex flex-col justify-start">
        <div className="flex justify-between">
          <Controller
            name="bank_code"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="은행을 선택하세요" />
                </SelectTrigger>
                <SelectContent className="w-[160px]">
                  <SelectGroup>
                    <SelectLabel>은행</SelectLabel>
                    {Object.entries(BANK_CODE).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Input
            className="w-[280px]"
            id="bank_account_number"
            type="text"
            placeholder="계좌번호를 입력해주세요.(-제외)"
            autoComplete="off"
            required
            {...register("bank_account_number")}
          />
        </div>
        {errors.bank_code?.message && (
          <ErrorMessage
            className="ml-3"
            errors={errors}
            fields={[{ field: "bank_code", label: "은행" }]}
          />
        )}
      </div>

      <Separator />
      <div className="flex flex-col gap-4">
        <Input
          disabled={true}
          id="wallet_address"
          type="text"
          autoComplete="off"
          placeholder="연결된 지갑의 주소가 표시됩니다."
          {...register("wallet_address")}
        />
        <ul className="list-disc ml-4">
          <li className="text-xs text-muted-foreground whitespace-pre-wrap">
            아래의 지갑 연결 버튼을 눌러 Kaia를 연결하세요.
          </li>
          <li className="text-xs text-muted-foreground whitespace-pre-wrap">
            Kaia가 열리지 않는다면 페이지를 새로고침 해주세요.
          </li>
        </ul>
      </div>
      <div className="flex justify-between gap-4 ">
        <Button
          type="button"
          variant="secondary"
          className="w-20 h-10 rounded-md"
          onClick={() => setCurrentStep(1)}
        >
          이전으로
        </Button>
        {!watch("wallet_address") ? (
          <ConnectButton.DefaultButton
            connectCallback={setWalletAddress}
            className="w-full"
          />
        ) : (
          <Button
            disabled={isPending}
            type="submit"
            className="flex-1 w-full h-10 rounded-md"
          >
            회원가입
          </Button>
        )}
      </div>
    </form>
  );
};

export default SignUpFormStep2;
