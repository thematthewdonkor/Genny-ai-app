import { SidebarRoutes } from "@/components/sidebar-routes";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MobileRoutes = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <SidebarRoutes />
      </SheetContent>
    </Sheet>
  );
};
