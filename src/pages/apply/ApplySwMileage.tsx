import { Separator } from "@/shared/ui";
import { PageLayout } from "@/widget/_frgment";
import { PageBoundary } from "@/widget/_suspense";
import {
  ApplySwMileageBasicInfo,
  ApplySwMileageDocument,
} from "@/widget/document";

const ApplySwMileage = () => {
  return (
    <PageBoundary>
      <PageLayout title="SW 마일리지 신청">
        <div className="grid gap-4 w-full">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            본 페이지는 비교과 활동에 대한 SW 마일리지 적립을 신청하는 곳입니다.
            <br />
            수행하신 활동 내용을 정확히 기입하고 증빙 자료를 첨부하여 제출해
            주시기 바랍니다.
          </p>
          <Separator />
          <div className="flex gap-4 w-full">
            <ApplySwMileageBasicInfo />
            <ApplySwMileageDocument />
          </div>
        </div>
      </PageLayout>
    </PageBoundary>
  );
};

export default ApplySwMileage;
