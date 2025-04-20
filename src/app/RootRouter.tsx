import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Dashboard from "@/pages/dashboard/Dashboard";
import { MainLayout } from "@/widget/_frgment";
import { Routes, Route, Navigate } from "react-router";
import { Init, Auth } from "@/app/RouteGuard";
import { ApplySwMileage } from "@/pages/apply";
import { SwMileageHistory, SwMileageHistoryDetail } from "@/pages/history";
import { Setting } from "@/pages/setting";

const RootRouter = () => {
  return (
    <Routes>
      <Route element={<Init />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route element={<Auth />}>
        <Route element={<MainLayout />}>
          <Route index path={"/"} element={<Dashboard />} />
          <Route path="apply" element={<ApplySwMileage />} />
          <Route path="history/*">
            <Route index element={<SwMileageHistory />} />
            <Route path=":id" element={<SwMileageHistoryDetail />} />
          </Route>
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;
