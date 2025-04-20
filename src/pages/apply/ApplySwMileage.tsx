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
        <div>
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
