import { useGetSwMileageDetail } from "@/features/document/queries";
import { ACTIVITY_CATEGORIES } from "@/shared/constants";
import { parseToFormattedDate, sliceWalletAddress } from "@/shared/utils";
import { AlertCircle, CircleCheck, CircleDot } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui";
import { useParams } from "react-router";
import { useMemo } from "react";

const SwMileageDetailContent = () => {
  const { id: swMileageId } = useParams();
  const { data } = useGetSwMileageDetail({
    swMileageId: Number(swMileageId),
  });

  const handleFileDownload = (fileUrl: string, fileName: string) => {
    // 새 탭에서 파일 URL 열기 (브라우저에서 자동으로 다운로드 처리)
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const detailContentMapper = useMemo(() => {
    return {
      student: {
        name: {
          label: "이름",
          value: data.name,
        },
        walletAddress: {
          label: "지갑 주소",
          value: sliceWalletAddress(data.wallet_address.toUpperCase()),
        },
        email: {
          label: "이메일",
          value: data.email,
        },
        phoneNumber: {
          label: "전화번호",
          value: data.phone_number,
        },
      },
      document: {
        academic_field: {
          label: "학술 분야",
          value:
            ACTIVITY_CATEGORIES[
              data.academic_field as keyof typeof ACTIVITY_CATEGORIES
            ],
        },
        extracurricular_activity: {
          label: "비교과 활동",
          value: data.extracurricular_activity,
        },
        extracurricular_activity_classification: {
          label: "비교과 활동 분류",
          value: data.extracurricular_activity_classification ?? "-",
        },
        created_at: {
          label: "신청 일시",
          value: parseToFormattedDate(data.created_at),
        },
        content: {
          label: "활동 내용",
          value: data.content,
        },
      },
      status: data.status,
      comment: data.comment ?? "-",
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <SwMileageStatus status={data.status} comment={data.comment} />

      <div className="content-container">
        <div className="flex gap-2">
          <div className="grid gap-4 h-min">
            <p className="text-xl font-semibold">기본 정보</p>
            <div className="flex flex-col gap-3">
              {Object.entries(detailContentMapper.student).map(
                ([key, value]) => (
                  <div key={key} className="grid gap-1">
                    <p className="text-sm text-muted-foreground">
                      {value.label}
                    </p>
                    <p className="text-md text-body">{value.value}</p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="h-full w-[1px] bg-gray-200 mx-6" />
          <div className="grid gap-4 w-full h-min">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">제출 정보</p>
              <p className="text-sm text-muted-foreground">
                제출 일자: {detailContentMapper.document.created_at.value}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">학술 분야</p>
                <p className="text-md text-body break-all">
                  {detailContentMapper.document.academic_field.value}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">비교과 활동</p>
                <p className="text-md text-body break-all">
                  {detailContentMapper.document.extracurricular_activity.value}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">
                  비교과 활동 분류
                </p>
                <p className="text-md text-body break-all">
                  {
                    detailContentMapper.document
                      .extracurricular_activity_classification.value
                  }
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground mb-2">활동 내용</p>
                <div className="flex w-full border border-gray-300 rounded-md p-3">
                  <p className="text-md text-body break-all">
                    {detailContentMapper.document.content.value}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">제출 파일</p>
                <div className="flex flex-col gap-1">
                  {data.sw_mileage_files.map((file) => (
                    <div key={file.sw_mileage_file_id} className="flex gap-1">
                      <button
                        onClick={() => handleFileDownload(file.url, file.name)}
                        className="text-md text-blue-600 hover:text-blue-800 hover:underline break-all text-left cursor-pointer transition-colors"
                      >
                        {file.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwMileageDetailContent;

const SwMileageStatus = ({
  status,
  comment,
}: {
  status: 0 | 1 | 2;
  comment: string;
}) => {
  const statusText = {
    2: {
      text: "심사 진행 중",
      description: "제출하신 서류를 바탕으로 심사가 진행중입니다.",
      icon: <CircleDot className="w-4 h-4 text-pending" />,
      color: "pending",
    },
    1: {
      text: "제출 승인",
      description: "SW 마일리지 신청이 승인되었습니다.",
      icon: <CircleCheck className="w-4 h-4 text-approved" />,
      color: "approved",
    },
    0: {
      text: "제출 반려",
      description: comment ?? "-",
      icon: <AlertCircle className="w-4 h-4 text-destructive" />,
      color: "destructive",
    },
  };
  return (
    <Alert>
      {statusText[status].icon}
      <AlertTitle>{statusText[status].text}</AlertTitle>
      <AlertDescription>{statusText[status].description}</AlertDescription>
    </Alert>
  );
};
