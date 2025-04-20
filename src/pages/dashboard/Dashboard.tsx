import { PageBoundary } from "@/widget/_suspense";
import { DashboardQuide, DashboardRank } from "@/widget/dashboard";

// TODO: Rank는 신청 및 발급 구현 이후 작업
const Dashboard = () => {
  return (
    <PageBoundary>
      <div className="grid gap-8 w-full">
        <DashboardRank />
        <DashboardQuide />
      </div>
    </PageBoundary>
  );
};

export default Dashboard;
