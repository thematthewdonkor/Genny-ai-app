"use client";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";

import { useCallback, useState } from "react";

interface InputProps {
  onSendMessage: (message: string) => void;
}

export const Input = ({ onSendMessage }: InputProps) => {
  const [prompt, setPrompt] = useState<string>("");

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
    <div className="mt-12">
      <Card
        className="rounded-2xl
  [background:linear-gradient(white)_padding-box,linear-gradient(to_right,#009EFF,#9360FF)_border-box] 
  border-transparent"
      >
        <div className="flex items-center">
          <Textarea
            placeholder="Ask anything"
            className="flex-1 border-none rounded-full text-lg placeholder:text-gray-500 placeholder:text-lg focus-visible:ring-0 shadow-none"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Button
            onClick={() => {
              onSendMessage(prompt);
              setPrompt("");
            }}
            variant="ghost"
            size="lg"
            className="rounded-full cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </Card>
      <p className="text-center text-sm text-gray-500 mt-4">
        Genny may generate inaccurate information about people, places, or
        facts. Model: Genny AI v1.3
      </p>
    </div>
  );
};
