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
import { useCreateWalletChange } from "@/features/wallet";
import { useState } from "react";
import { toast } from "sonner";
import { isAddress } from "viem";
import { encodeContractExecutionABI } from "@/shared/utils";
import { kaia, STUDENT_MANAGER_ABI } from "@/shared/constants";

type WalletChangeDialogProps = {
  children: React.ReactNode;
  refetch: () => void;
};

function WalletChangeDialog({ children, refetch }: WalletChangeDialogProps) {
  const student = useStudentStore().actions.getStudent();
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { mutate } = useCreateWalletChange({
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async () => {
    if (!walletAddress) {
      toast.error("지갑 주소를 입력해주세요.");
      return;
    }
    if (!isAddress(walletAddress)) {
      toast.error("올바른 지갑 주소를 입력해주세요.");
      return;
    }

    const data = encodeContractExecutionABI(
      STUDENT_MANAGER_ABI,
      "proposeAccountChange",
      [walletAddress]
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
            먼저, 변경하고자 하는 계정에 대한 소유권 증명이 완료되어야 합니다.
            <br />
            아래의 절차를 따라서 진행해주세요.
            <br />
            <br />
            <strong className="text-muted-foreground">
              1. 변경하고자 하는 계정의 주소를 입력해주세요.
            </strong>
            <br />
            <strong className="text-muted-foreground">
              2. 기존에 사용하던 계정으로 지갑을 연결해주세요.
            </strong>
            <br />
            <strong className="text-muted-foreground">
              3. 확인 버튼을 눌러 소유권 증명을 요청을 진행해주세요.
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Kaia 계정</span>
            <Input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="변경하고자 하는 계정의 주소를 입력해주세요."
            />
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

export default WalletChangeDialog;
