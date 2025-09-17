import React from "react";
import { cn } from "@/lib/utils";
import { PenTool, ImageIcon, User, Code, Plus } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const actionCards = [
  {
    title: "Write copy",
    icon: PenTool,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Image generation",
    icon: ImageIcon,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Create avatar",
    icon: User,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Write code",
    icon: Code,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];

export const Welcome = () => {
  return (
    <div>
      {!hasStartedChat && (
        <div className="flex-1 mt-20">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 text-balance">
              Welcome to Script
            </h1>
            <p className="text-xl text-gray-600 text-balance">
              Get started by Script a task and Chat can do the rest. Not sure
              where to start?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
            {actionCards.map((item) => (
              <Card
                key={item.title}
                className="p-6 transition-shadow cursor-pointer border border-gray-200 "
              >
                <div className="flex justify-between items-center">
                  <div
                    className={cn(
                      "w-12 h-12 flex items-center justify-center rounded-full",
                      item.bgColor
                    )}
                  >
                    <item.icon className="w-6 h-6 rounded-full" />
                  </div>

                  <span className="text-lg font-medium">{item.title}</span>

                  <Button
                    size="sm"
                    variant="outline"
                    className={cn(
                      "bg-white hover:bg-white rounded-full  w-6 h-6 text-gray-900"
                    )}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
