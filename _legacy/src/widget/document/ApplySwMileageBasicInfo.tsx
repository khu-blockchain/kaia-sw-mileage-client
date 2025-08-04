import { Student } from "@/entities/student";
import { useStudentStore } from "@/features/student";
import { Separator } from "@/shared/ui";

const ApplySwMileageBasicInfo = () => {
  const student = useStudentStore((state) => state.actions).getStudent();

  const basicInfoMapper: Partial<Record<keyof Student, string>> = {
    student_id: "학번",
    name: "이름",
    department: "학과",
    email: "이메일",
    phone_number: "전화번호",
  };

  return (
    <div className="sticky top-24 h-min content-container w-[380px]">
      <div className="grid gap-2">
        <p className="text-xl font-semibold">기본 정보</p>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {"기본 정보는 가입 시 등록된 정보를 바탕으로 기입됩니다.\n" +
            '잘못된 항목이 존재할 경우 "내 정보" 에서 수정해주세요.'}
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        {Object.entries(basicInfoMapper).map(([key, value]) => {
          const studentKey = key as keyof Student;
          return (
            <div className="flex items-center justify-between" key={key}>
              <p className="text-sm font-medium text-body">{value}</p>
              <p className="text-sm text-body">{student[studentKey]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplySwMileageBasicInfo;
