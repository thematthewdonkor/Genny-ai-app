"use client";

import { Assistant } from "@/components/assistant";
import { Input } from "@/components/input";
import { Heading } from "@/components/heading";
import { useChatStore } from "@/store/useChatStore";
import { ChatItem } from "@/types";
import axios from "axios";

const MusicPage = () => {
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
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {hasStartedChat ? (
          <Assistant items={chatItems} />
        ) : (
          <Heading
            title="Generate Music "
            subtitle="Start generating music with genny "
          />
        )}
      </div>

      <Input onSendMessage={handleSendMessage} label="Ask anything" />
    </div>
  );
};

export default MusicPage;
