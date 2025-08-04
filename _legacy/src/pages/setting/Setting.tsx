import { PageBoundary } from "@/widget/_suspense";
import { useStudentStore } from "@/features/student";
import { Student } from "@/entities/student";
import { Label, Separator } from "@/shared/ui";
import { User, AlertCircle, Wallet } from "lucide-react";
import { BANK_CODE } from "@/shared/constants";
import { parseToFormattedDateTime, sliceWalletAddress } from "@/shared/utils";
import { PageLayout } from "@/widget/_frgment";
import { Button } from "@/shared/ui/button";
import WalletLostDialog from "@/widget/setting/WalletLostDialog";
import { useCheckHasWalletChangeProcess } from "@/features/wallet";
import WalletChangeDialog from "@/widget/setting/WalletChangeDialog";
import ConfirmChangeDialog from "@/widget/setting/ConfirmChangeDialog";

const Setting = () => {
  return (
    <PageBoundary>
      <PageLayout title="내 정보">
        <div className="grid gap-4 w-full">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            개인정보 및 연결된 지갑 정보를 확인할 수 있습니다.
            <br />
            연결된 지갑 주소를 변경하고 싶다면 "지갑 변경하기"를 클릭해주세요.
          </p>
          <Separator />
          <div className="flex flex-col gap-4 w-full">
            <WalletInfo />
            <StudentProfile />
          </div>
        </div>
      </PageLayout>
    </PageBoundary>
  );
};

const StudentProfile = () => {
  const student = useStudentStore((state) => state.actions).getStudent();

  const profileSections = [
    {
      title: "기본 정보",
      icon: <User className="w-5 h-5" />,
      fields: [
        {
          key: "student_id" as keyof Student,
          label: "학번",
        },
        {
          key: "name" as keyof Student,
          label: "이름",
        },
        {
          key: "department" as keyof Student,
          label: "학과",
        },
        {
          key: "wallet_address" as keyof Student,
          label: "지갑 주소",
          displayValue: sliceWalletAddress(student.wallet_address),
        },
        {
          key: "email" as keyof Student,
          label: "이메일",
        },
        {
          key: "phone_number" as keyof Student,
          label: "전화번호",
        },
        {
          key: "bank_account_number" as keyof Student,
          label: "계좌번호",
        },
        {
          key: "bank_code" as keyof Student,
          label: "은행",
          displayValue: BANK_CODE[student.bank_code],
        },
      ],
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="content-container">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <h2 className="text-lg font-semibold">개인정보</h2>
        </div>

        <div className="grid gap-6">
          <div>
            <div className="grid gap-4 lg:grid-cols-2">
              {profileSections[0].fields.map((field) => (
                <div
                  key={field.key}
                  className="grid gap-2 pb-4 border-b border-gray-200"
                >
                  <Label className="text-sm font-medium text-body">
                    {field.label}
                  </Label>
                  <p className="text-sm text-body">
                    {field.displayValue || student[field.key] || "-"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;

const WalletInfo = () => {
  const student = useStudentStore((state) => state.actions).getStudent();
  const {
    data: { result, data },
    refetch,
  } = useCheckHasWalletChangeProcess();

  console.log(result, data);

  return (
    <div className="content-container">
      <div className="flex items-center gap-2">
        <Wallet className="w-5 h-5" />
        <h2 className="text-lg font-semibold">계정 정보</h2>
      </div>

      <div className="grid gap-4">
        {!result && (
          <>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-blue-900">
                  SW 마일리지 계정
                </p>
                <p className="text-xs text-blue-700">
                  연결된 계정 주소: {student.wallet_address}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <WalletChangeDialog refetch={refetch}>
                  <Button variant="link" className="text-xs text-blue-700">
                    지갑 변경하기
                  </Button>
                </WalletChangeDialog>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <WalletLostDialog refetch={refetch}>
                연결된 Kaia 계정을 사용할 수 없나요?
              </WalletLostDialog>
            </div>
          </>
        )}
        {result && data?.type === "WALLET_LOST" && (
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex flex-col w-full gap-1">
              <div className="flex w-full items-center justify-between mb-3">
                <p className="text-sm font-medium text-yellow-900">
                  SW 마일리지 계정 변경이 요청되었습니다.
                </p>
                <p className="text-xs text-yellow-700">
                  변경 요청 일시:{" "}
                  {parseToFormattedDateTime(data?.data?.created_at || "")}
                </p>
              </div>

              <p className="text-xs text-yellow-700">
                기존 계정: {data?.data?.address}
              </p>
              <p className="text-xs text-yellow-700">
                변경 요청 계정: {data?.data?.target_address}
              </p>
            </div>
          </div>
        )}
        {result && data?.type === "WALLET_CHANGE" && (
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-yellow-900">
                SW 마일리지 계정 변경이 진행중입니다.
              </p>
              <p className="text-xs text-yellow-700">
                소유권 증명이 완료된 계정: {data?.data?.targetAccount}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ConfirmChangeDialog targetAccount={data?.data?.targetAccount} refetch={refetch}>
                <Button variant="link" className="text-xs text-yellow-700">
                  지갑 변경 완료하기
                </Button>
              </ConfirmChangeDialog>
            </div>
          </div>
        )}
        <Separator />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-body">주의사항</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 지갑 주소를 제외한 정보는 수정할 수 없습니다.</li>
            <li>
              • 지갑 주소 변경 시 <strong>소유권 증명</strong>,{" "}
              <strong>최종 변경 승인</strong> 과정을 거치게 됩니다.
            </li>
            <li>
              • 잘못된 정보 입력 시 마일리지 지급에 문제가 발생할 수 있습니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
