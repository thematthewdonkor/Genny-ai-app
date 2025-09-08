"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

import {
  Search,
  MessageSquarePlus,
  Folder,
  FileText,
  FileStack,
  Users,
  History,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  Plus,
  PanelRight,
} from "lucide-react";

const routes = [
  { name: "AI Chat", href: "/chat", icon: MessageSquarePlus },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Templates", href: "/templates", icon: FileText },
  { name: "Documents", href: "/documents", icon: FileStack, hasAction: true },
  { name: "Community", href: "/community", icon: Users, badge: "NEW" },
  { name: "History", href: "/history", icon: History },
];

import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

const bottomRoutes = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export const SidebarRoutes = () => {
  const [activeRoute, setActiveRoute] = useState("AI Chat");
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div
      className={cn(
        "flex flex-col  px-4 py-4 space-y-4 h-full transition-all",
        collapsed ? "w-20 bg-transparent" : "w-80"
      )}
    >
      {/* Logo and panel left icon */}
      <div className="flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-1">
            <Image
              src="/logo.svg"
              width={100}
              height={100}
              alt="Script logo"
              className="object-cover"
            />
          </div>
        )}

        <Button
          variant="ghost"
          className="hover:bg-transparent cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <PanelRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Search bar */}
      {!collapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search"
              className="pl-10 pr-16 rounded-full border-gray-200 focus-visible:ring-[0px]
            
            "
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <kbd className="text-xs bg-white rounded-full p-1.5">⌘K</kbd>
            </div>
          </div>
        </div>
      )}

      {/* Top routes */}
      <div className="flex-1">
        {routes.map((route) => (
          <Link key={route.name} href={route.href} className="relative">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start mb-2 text-sm gap-3 h-12 px-3 text-gray-600 hover:bg-white rounded-full",
                route.name == activeRoute && "bg-white text-gray-900",
                collapsed &&
                  "justify-center px-0 bg-transparent hover:bg-transparent"
              )}
              onClick={() => setActiveRoute(route.name)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <route.icon
                      className={cn(
                        "w-5 h-5",
                        route.name === activeRoute && "fill-blue-600 stroke-1"
                      )}
                    />
                  </span>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <span className="">{route.name}</span>
                  </TooltipContent>
                )}
              </Tooltip>
              {!collapsed && route.name}
            </Button>

            {!collapsed && route.badge && (
              <Badge className="absolute right-2  bg-gradient-to-r from-[#009EFF] to-[#9360FF] top-1/2 transform -translate-y-1/2  text-gray-100">
                {route.badge}
              </Badge>
            )}

            {!collapsed && route.hasAction && (
              <Button
                size="icon"
                variant="outline"
                className="absolute right-2 bg-white hover:bg-white rounded-full top-1/2 transform -translate-y-1/2 w-8 h-8 text-gray-900"
              >
                <Plus className="w-5 h-5" />
              </Button>
            )}
          </Link>
        ))}
      </div>

      {/* Bottom routes */}
      <div className="py-2">
        {!collapsed && (
          <div className="text-sm text-gray-500 mb-2 font-medium">
            Settings & Help
          </div>
        )}

        {bottomRoutes.map((route) => (
          <Link href={route.href} key={route.name}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm gap-3 h-12 px-3 mb-2 rounded-full text-gray-600 hover:bg-white",
                route.name == activeRoute && "bg-white  text-gray-900",
                collapsed && "justify-center px-0"
              )}
              onClick={() => setActiveRoute(route.name)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <route.icon
                      className={cn(
                        "w-5 h-5",
                        route.name === activeRoute && "fill-blue-600 stroke-1"
                      )}
                    />
                  </span>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">{route.name}</TooltipContent>
                )}
              </Tooltip>
              {!collapsed && route.name}
            </Button>
          </Link>
        ))}
      </div>

      {/* Toggle theme */}
      {!collapsed && (
        <div className="flex rounded-full border p-1 bg-gray-100">
          <Button
            className={cn(
              "flex-1 gap-2 rounded-full text-black hover:bg-white",
              theme == "light" ? "bg-white" : "bg-transparent"
            )}
            onClick={() => setTheme("light")}
          >
            <Sun className="w-4 h-4" />
            Light
          </Button>

          <Button
            className={cn(
              "flex-1 gap-2 rounded-full text-black hover:bg-white",
              theme == "dark" ? "bg-white" : "bg-transparent"
            )}
            onClick={() => setTheme("dark")}
          >
            <Moon className="w-4 h-4" />
            Dark
          </Button>
        </div>
      )}
    </div>
  );
};
