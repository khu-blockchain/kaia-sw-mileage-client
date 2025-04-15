import { SIDEBAR_MENU } from "@/shared/constants";
import type { SidebarMenu, SubMenu } from "@/shared/constants";
import { cn } from "@/shared/utils";
import { Link, useLocation } from "react-router";

const Sidebar = () => {
  return (
    <div className="sticky top-[73px] z-40 w-60 h-[calc(100vh-73px)] px-6 pt-16 overflow-x-hidden overflow-y-auto border-r border-slate-200 bg-white">
      <div className="flex flex-col gap-8">
        {SIDEBAR_MENU.map((menu) => (
          <Menu menu={menu} />
        ))}
      </div>
    </div>
  );
};

const Menu = ({ menu }: { menu: SidebarMenu }) => {
  return (
    <div className="flex flex-col">
      {menu.path ? (
        <Link className="text-sm font-semibold" to={menu.path}>
          {menu.name}
        </Link>
      ) : (
        <span className="text-sm font-semibold">{menu.name}</span>
      )}
      {menu.subMenu && <SubMenu subMenu={menu.subMenu} />}
    </div>
  );
};

const SubMenu = ({ subMenu }: { subMenu: SubMenu[] }) => {
  const pathname = useLocation().pathname;

  return (
    <ul className="flex flex-col gap-2 mt-2 border-l-2 border-slate-200">
      {subMenu.map((subMenu, index) => (
        <li key={index} className="relative flex items-center pl-4">
          <Link
            className={cn(
              "text-sm font-medium text-slate-500 before:absolute before:top-1/2 before:-left-[1.8px] before:h-5 before:w-[2px] before:-translate-y-1/2 before:bg-index hover:text-index",
              subMenu.path === pathname
                ? "text-index font-bold"
                : "before:hidden"
            )}
            to={subMenu.path}
          >
            {subMenu.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default Sidebar;
