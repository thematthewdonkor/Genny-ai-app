import { ChatItem } from "@/types";
import { Markdown } from "./markdown";
import { cn } from "@/lib/utils";

interface AssistantProps {
  items: ChatItem[];
}

export const Assistant = ({ items }: AssistantProps) => {
  return (
    <div className="w-full flex flex-col  mx-auto p-2 space-y-4">
      {items.map((item, index) => (
        <div key={index}>
          <div
            className={cn(
              "rounded-2xl p-4 leading-relaxed break-words",
              item.role === "user" ? "border" : "bg-gray-100"
            )}
          >
            <Markdown content={item.content} />
          </div>
        </div>
      ))}
    </div>
  );
};
