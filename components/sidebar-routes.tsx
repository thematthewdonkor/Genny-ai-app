"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import {
  Search,
  MessageSquarePlus,
  PanelRight,
  Music,
  Video,
  Code,
  Image as Images,
} from "lucide-react";

const routes = [
  { name: "AI Chat", href: "/", icon: MessageSquarePlus },
  { name: "Image", href: "/image", icon: Images },
  { name: "Music", href: "/", icon: Music },
  { name: "Video", href: "/", icon: Video },
  { name: "Code", href: "", icon: Code, badge: "NEW" },
];

export const SidebarRoutes = () => {
  const [activeRoute, setActiveRoute] = useState("AI Chat");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col p-4 space-y-4 transition-all",
        collapsed ? "w-20" : "w-80"
      )}
    >
      {/* Logo and panel right icon */}
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
          className="hover:bg-transparent cursor-pointer hidden md:block"
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
                "w-full justify-start mb-2 gap-3 h-12 text-gray-600 hover:bg-white rounded-full",
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
          </Link>
        ))}
      </div>
    </div>
  );
};
