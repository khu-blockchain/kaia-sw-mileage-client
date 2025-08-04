import {
  AlertDialogHeader,
  Separator,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  Input,
  Button,
} from "@/shared/ui";
import { useStudentStore } from "@/features/student";
import { useConfirmWalletChange } from "@/features/wallet";
import { useState } from "react";
import { encodeContractExecutionABI } from "@/shared/utils";
import { kaia, STUDENT_MANAGER_ABI } from "@/shared/constants";
import { useConnect } from "@/shared/hooks";
import { ConnectButton } from "@/shared/component";

type ConfirmChangeDialogProps = {
  children: React.ReactNode;
  refetch: () => void;
  targetAccount: string;
};

function ConfirmChangeDialog({ children, refetch, targetAccount }: ConfirmChangeDialogProps) {
  const student = useStudentStore().actions.getStudent();
  const { walletAddress } = useConnect();
  const [open, setOpen] = useState(false);
  const { mutate } = useConfirmWalletChange({
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async () => {
    const data = encodeContractExecutionABI(
      STUDENT_MANAGER_ABI,
      "confirmAccountChange",
      [student.student_hash]
    );

    const { rawTransaction } = await kaia.wallet.klaySignTransaction({
      type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
      from: kaia.browserProvider.selectedAddress,
      to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
      data,
      gas: "0x4C4B40",
    });

    mutate({
      studentId: student.student_id,
      rawTransaction,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <span className="text-sm text-slate-600 hover:underline cursor-pointer">
          {children}
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>지갑 주소 변경</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-wrap text-sm break-keep">
            연결된 Kaia 계정을 변경할 수 있습니다.
            <br />
            소유권 증명이 완료된 계정을 연결한 후, 변경을 진행해주세요.
            <br />
            Kaia Wallet 앱 에서의 계정 변경 절차는 아래와 같습니다.
            <br />
            <br />
            <strong className="text-muted-foreground">
              1. 지갑 확장 프로그램을 열고, 우측 상단 3번째 아이콘을 클릭하세요.
            </strong>
            <br />
            <strong className="text-muted-foreground">
              2. 변경하고자 하는 계정을 선택해주세요.
            </strong>
            <br />
            <strong className="text-muted-foreground">
              3. 확인 버튼을 눌러 지갑을 연결한 후, 올바른 계정이 연결되었는지
              확인해주세요.
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">
              소유권 증명이 완료된 계정
            </span>
            <span className="font-medium text-body text-sm break-keep">
              {targetAccount}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">
              현재 연결된 Kaia 계정 주소
            </span>
            {walletAddress ? (
              <span className="font-medium text-body text-sm break-keep">
                {walletAddress}
              </span>
            ) : (
              <ConnectButton.DefaultButton />
            )}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            취소
          </AlertDialogCancel>
          <Button onClick={() => handleSubmit()}>확인</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmChangeDialog;
