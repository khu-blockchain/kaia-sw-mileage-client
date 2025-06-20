import { Header } from "@/widget/_frgment";
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <main className="flex flex-1 flex-col mx-auto w-7xl pt-28 pb-24 px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
