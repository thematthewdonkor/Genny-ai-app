"use client";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Paperclip, Mic, FolderOpen } from "lucide-react";

import { useChatStore } from "@/store/useChatStore";

import { useCallback, useState } from "react";

interface InputProps {
  onSendMessage: (message: string) => void;
}

export const Input = ({ onSendMessage }: InputProps) => {
  const { chatItems } = useChatStore();
  const [prompt, setPrompt] = useState<string>("");
  const hasStartedChat = chatItems.length > 0;

  //Function to send message to the llm

  //Press "Enter" key to send message and "Shift + Enter" key for a new line
  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        onSendMessage(prompt);
        setPrompt("");
      }
    },
    [onSendMessage, prompt]
  );

  return (
    <div className="bg-white border rounded-tl-4xl px-8 h-screen">
      <div className="space-y-8 container mx-auto py-12 flex h-screen flex-col">
        {/* Input field */}
        <div className="mt-12">
          <Card
            className="rounded-2xl border bg-white 
  [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#009EFF,#9360FF)_border-box] 
  border-transparent"
          >
            <div className="flex items-center bg-white">
              <Textarea
                placeholder="Ask anything"
                className="flex-1 p-4 border-none rounded-full text-lg placeholder:text-gray-500 focus-visible:ring-0 shadow-none"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={handleKeyDown}
              />

              <Button
                onClick={() => onSendMessage(prompt)}
                variant="ghost"
                size="sm"
                className="rounded-full"
              >
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
