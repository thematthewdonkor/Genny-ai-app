import { SidebarRoutes } from "./sidebar-routes";
import { MobileRoutes } from "./mobile-routes";

const Sidebar = () => {
  return (
    <div className="md:border-r h-screen flex-col">
      <div className="hidden md:block">
        <SidebarRoutes />
      </div>

      <div className="p-4 md:hidden">
        <MobileRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
