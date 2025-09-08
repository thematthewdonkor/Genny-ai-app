import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

import {
  PenTool,
  ImageIcon,
  User,
  Code,
  Plus,
  Send,
  Paperclip,
  Mic,
  FolderOpen,
} from "lucide-react";

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

export const MainContent = () => {
  return (
    <div className="bg-white border rounded-tl-4xl px-8 h-screen">
      <div className="space-y-8 container mx-auto py-12 flex h-screen flex-col">
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

        <div className="mt-12">
          <Card
            className="rounded-2xl border bg-white 
  [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#009EFF,#9360FF)_border-box] 
  border-transparent"
          >
            <div className="flex items-center bg-white">
              <Input
                placeholder="Ask anything"
                className="flex-1 p-4 border-none rounded-full text-lg placeholder:text-gray-500 focus-visible:ring-0 shadow-none"
              />

              <Button variant="ghost" size="sm" className="rounded-full">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex p-4 items-center justify-between text-sm border-t bg-blue-50/30">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800 p-1 rounded-full"
                >
                  <Paperclip className="w-4 h-4 mr-1  rounded-full" />
                  Attach
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800 p-1 rounded-full"
                >
                  <Mic className="w-4 h-4 mr-1" />
                  Voice Message
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800 p-1 rounded-full"
                >
                  <FolderOpen className="w-4 h-4 mr-1 rounded-full" />
                  Browse Prompts
                </Button>
              </div>
              <span className="text-gray-500">20 / 3,000</span>
            </div>
          </Card>
          <p className="text-center text-sm text-gray-500 mt-4">
            Script may generate inaccurate information about people, places, or
            facts. Model: Script AI v1.3
          </p>
        </div>
      </div>
    </div>
  );
};
