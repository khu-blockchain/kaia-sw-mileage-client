import SignIn from "@/pages/auth/SignIn";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Suspense, useEffect } from "react";
import SignUp from "@/pages/auth/SignUp";
import { removeLocalStorageData } from "@/shared/utils";
import { useRefresh } from "@/features/auth/service";
import MainLayout from "../widget/_frgment/MainLayout";
import { useStudentStore } from "@/features/student/store";
import ApplyRequest from "@/pages/apply/ApplyRequest";
import Dashboard from "@/pages/dashboard/Dashboard";

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
          <Route path="apply-request" element={<ApplyRequest />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;

const Auth = () => {
  const {getStudent} = useStudentStore((state) => state.actions);
  if (getStudent().student_id !== "") {
    return <Outlet />;
  }

  return (
    <ErrorBoundary FallbackComponent={AuthBoundary}>
      <Suspense fallback={<></>}>
        <AuthGuard />
      </Suspense>
    </ErrorBoundary>
  );
};

const AuthBoundary = ({ error }: FallbackProps) => {
  const navigate = useNavigate();

  const handleInvalidRefreshToken = () => {
    removeLocalStorageData("refresh-token");
    removeLocalStorageData("refresh-expires");
    navigate("sign-in");
  };
  useEffect(() => {
    handleInvalidRefreshToken();
  }, []);

  return <></>;
};

const AuthGuard = () => {
  useRefresh();
  return <Outlet />;
};

const Init = () => {
  //로그인이 완료된 사용자는 진입 할 수 없음.
  //TODO: 의도한대로 동작하지 않음
  const {getStudent} = useStudentStore((state) => state.actions);
  if (getStudent().student_id !== "") {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};
