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
} from "@/shared/ui";
import { useStudentStore } from "@/features/student";
import { ConnectButton } from "@/shared/component";
import { useConnect } from "@/shared/hooks";
import { CircleArrowDown } from "lucide-react";
import { useCreateWalletLost } from "@/features/wallet";
import { useState } from "react";

type ApproveMileageDialogProps = {
  children: React.ReactNode;
  refetch: () => void;
};

function WalletLostDialog({ children, refetch }: ApproveMileageDialogProps) {
  const student = useStudentStore().actions.getStudent();
  const [open, setOpen] = useState(false);
  const { walletAddress } = useConnect();
  const { mutate } = useCreateWalletLost({
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = () => {
    if (!walletAddress) {
      return;
    }
    mutate({
      studentId: student.student_id,
      targetAddress: walletAddress,
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
          <AlertDialogTitle>지갑 주소 변경 요청</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-wrap text-sm break-keep">
            연결된 Kaia 계정을 분실했을 경우, 관리자에게 계정 변경을 요청할 수
            있습니다.
            <br />
            <br />
            요청이 처리된 이후에는 이전에 사용하던 Kaia 계정으로 마일리지를
            지급받을 수 없으며, 이전 계정에 존재하는 마일리지는 변경된 계정으로
            이전됩니다.
            <br />
            <br />
            <strong className="text-red-600">
              반드시 변경할 지갑 주소를 확인해주세요.
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              기존 Kaia 계정
            </span>
            <span className="font-medium text-body text-sm break-keep">
              {student.wallet_address}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <CircleArrowDown className="w-6 h-6 text-blue-700" />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              변경할 Kaia 계정
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
          <AlertDialogAction onClick={() => handleSubmit()}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WalletLostDialog;
