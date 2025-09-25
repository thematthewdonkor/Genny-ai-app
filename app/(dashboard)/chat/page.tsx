"use client";

import { Heading } from "@/components/heading";
import { useChatStore } from "@/store/useChatStore";
import { MessageItem } from "@/types";
import { Markdown } from "@/components/markdown";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useCallback, useState } from "react";

import axios from "axios";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const ChatPage = () => {
  const { addChatItem, setAssistantLoading, chatItems } = useChatStore();
  const [prompt, setPrompt] = useState<string>("");
  const hasStartedChat = chatItems.length > 0;

  // Handle send message function
  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      const userMessage: MessageItem = {
        role: "user",
        content: message.trim(),
      };

      try {
        setAssistantLoading(true);
        addChatItem(userMessage);

        const response = await axios.post("api/chat", {
          messages: [...chatItems, userMessage],
        });

        console.log(response);

        const assistantMessage: MessageItem = {
          role: "assistant",
          content: response.data,
        };

        addChatItem(assistantMessage);
      } catch (error) {
        console.log(error);
      } finally {
        setAssistantLoading(false);
      }
    },
    [addChatItem, chatItems, setAssistantLoading]
  );

  // Hanlde keydown event function
  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        handleSendMessage(prompt);
        setPrompt("");
      }
    },
    [handleSendMessage, prompt]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {hasStartedChat ? (
          <div className="space-y-4">
            {chatItems.map((item, index) => (
              <div key={index} className="flex items-end gap-4">
                {item.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <div
                  className={`rounded-2xl p-4 leading-relaxed break-words ${
                    item.role === "user" ? "border" : "  bg-gray-100"
                  }`}
                >
                  <Markdown content={item.content} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Heading
            title="💬 Chat with Genny"
            subtitle="✨ Start a conversation, brainstorm scripts, craft catchy posts, and more! "
          />
        )}
      </div>

      <div className="space-y-4">
        <div
          className="rounded-2xl border p-4 [background:linear-gradient(white)_padding-box,linear-gradient(to_right,#009EFF,#9360FF)_border-box] 
                      border-transparent"
        >
          <div className="flex items-center">
            <Textarea
              placeholder="Ask anything"
              className="border-none rounded-full text-lg placeholder:text-gray-500 placeholder:text-lg focus-visible:ring-0 shadow-none resize-none"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={handleKeyDown}
            />

            <Button
              onClick={() => {
                handleSendMessage(prompt);
                setPrompt("");
              }}
              variant="ghost"
              size="lg"
              className="rounded-full cursor-pointer"
            >
              <Send />
            </Button>
          </div>
        </div>
        <p className="text-center text-xs md:text-sm text-gray-500">
          Genny may generate inaccurate information about people, places, or
          facts. Model: Genny AI v1.3
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
