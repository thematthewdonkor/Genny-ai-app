"use client";

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
    <div className="space-y-4">
      <div
        className="rounded-2xl border p-4 [background:linear-gradient(white)_padding-box,linear-gradient(to_right,#009EFF,#9360FF)_border-box] 
  border-transparent
  "
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
              onSendMessage(prompt);
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
  );
};
