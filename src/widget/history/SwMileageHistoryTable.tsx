import { SwMileage } from "@/entities/document";
import { useGetSwMileageList } from "@/features/document/queries";
import { useStudentStore } from "@/features/student";
import { ACTIVITY_CATEGORIES } from "@/shared/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { parseToFormattedDate } from "@/shared/utils";
import { useNavigate } from "react-router";

const SwMileageHistoryTable = () => {
  const student = useStudentStore((state) => state.actions).getStudent();
  const navigate = useNavigate();
  const { data } = useGetSwMileageList({
    studentId: student.student_id,
  });

  const historyTableMapper = (data: SwMileage[]) =>
    data.map((history) => {
      return {
        id: history.sw_mileage_id,
        status: history.status,
        academic_field:
          ACTIVITY_CATEGORIES[
            history.academic_field as keyof typeof ACTIVITY_CATEGORIES
          ],
        extracurricular_activity: history.extracurricular_activity,
        created_at: parseToFormattedDate(history.created_at),
      };
    });

  //TODO: 페이지네이션 구현

  return (
    <div className="flex w-full">
      <div className="w-full rounded-md border overflow-auto">
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-muted-foreground">
                학술 분야
              </TableHead>
              <TableHead className="text-center text-muted-foreground">
                비교과 활동
              </TableHead>
              <TableHead className="text-center text-muted-foreground">
                신청일
              </TableHead>
              <TableHead className="text-center text-muted-foreground">
                상태
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyTableMapper(data).map((history) => (
              <TableRow
                className="hover:cursor-pointer hover:bg-gray-50"
                key={history.id}
                onClick={() => {
                  navigate(`/history/${history.id}`);
                }}
              >
                <TableCell className="text-center">
                  {history.academic_field}
                </TableCell>
                <TableCell className="text-center">
                  {history.extracurricular_activity}
                </TableCell>
                <TableCell className="text-center">
                  {history.created_at}
                </TableCell>
                <TableCell className="text-center">
                  <SwMileageStatusBadge status={history.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SwMileageHistoryTable;

const SwMileageStatusBadge = ({ status }: { status: 1 | 2 | 3 }) => {
  const statusText = {
    1: {
      text: "심사중",
      color: "text-pending",
    },
    2: {
      text: "승인",
      color: "text-approved",
    },
    3: {
      text: "반려",
      color: "text-destructive",
    },
  };
  return (
    <p className={`${statusText[status].color}`}>{statusText[status].text}</p>
  );
};
