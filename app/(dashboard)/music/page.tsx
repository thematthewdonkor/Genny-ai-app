"use client";

import { Heading } from "@/components/heading";
import { useChatStore } from "@/store/useChatStore";
import { MusicItem } from "@/types";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useCallback, useState } from "react";

import axios from "axios";

const MusicPage = () => {
  const { musicItems, addMusicItem, setAssistantLoading } = useChatStore();
  const [prompt, setPrompt] = useState<string>("");
  const hasStartedChat = musicItems.length > 0;

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      const userMessage: MusicItem = {
        content: message.trim(),
        type: "prompt",
      };

      try {
        setAssistantLoading(true);
        addMusicItem(userMessage);

        const response = await axios.post("/api/music", { prompt: message });

        const assistantMessage: MusicItem = {
          content: response.data,
          type: "audio",
        };

        addMusicItem(assistantMessage);
      } catch (error) {
        console.error(error);
      } finally {
        setAssistantLoading(false);
      }
    },
    [addMusicItem, setAssistantLoading]
  );

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
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {hasStartedChat ? (
          musicItems.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 leading-relaxed break-words ${
                item.type === "prompt" ? "border" : "  bg-gray-100"
              }`}
            >
              {item.type === "audio" ? (
                <audio controls className="w-full">
                  <source src={item.content} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p>{item.content}</p>
              )}
            </div>
          ))
        ) : (
          <Heading
            title="🎵 Turn Your Ideas Into Music"
            subtitle="✨ Describe your vibe, and let Genny compose high-quality tracks tailored for your content."
          />
        )}
      </div>

      <div className="space-y-4 p-4">
        <div
          className="rounded-2xl border p-4 
          [background:linear-gradient(white)_padding-box,linear-gradient(to_right,#009EFF,#9360FF)_border-box] 
          border-transparent"
        >
          <div className="flex items-center">
            <Textarea
              placeholder="Generate music..."
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
          Genny may generate inaccurate information. Model: Genny AI v1.3
        </p>
      </div>
    </div>
  );
};

export default MusicPage;
