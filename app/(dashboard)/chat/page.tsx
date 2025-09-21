"use client";

import { Assistant } from "@/components/assistant";
import { Input } from "@/components/input";
import { Heading } from "@/components/heading";
import { useChatStore } from "@/store/useChatStore";
import { ChatItem } from "@/types";
import axios from "axios";

const ChatPage = () => {
  const { addChatItem, setAssistantLoading, chatItems } = useChatStore();
  const hasStartedChat = chatItems.length > 0;

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatItem = {
      role: "user",
      content: message.trim(),
    };

    try {
      setAssistantLoading(true);
      addChatItem(userMessage);

      const response = await axios.post(
        "api/chat",
        {
          messages: [...chatItems, userMessage],
        },
        { headers: { "Content-type": "application/json" } }
      );

      const assistantMessage: ChatItem = {
        role: "assistant",
        content: response.data.assistantText,
      };

      addChatItem(assistantMessage);
      setAssistantLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setAssistantLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <div className="flex-1">
        {hasStartedChat ? <Assistant items={chatItems} /> : <Heading />}
      </div>
      <Input onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
