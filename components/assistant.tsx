import { ChatItem } from "@/types";

interface AssistantProps {
  items: ChatItem[];
}

export const Assistant = ({ items }: AssistantProps) => {
  return <div>{items.map(() => <Markdown></Markdown>)}</div>;
};
