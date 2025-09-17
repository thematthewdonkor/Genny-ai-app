"use client";

import { Assistant } from "@/components/assistant";
import { Input } from "@/components/input";
import { Welcome } from "@/components/welcome";
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
    <div>
      <div className="bg-white border rounded-tl-4xl px-8 h-screen">
        <div className="space-y-8 container mx-auto py-12 flex h-screen flex-col">
          {hasStartedChat ? <Assistant items={chatItems} /> : <Welcome />}

          <Input onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
