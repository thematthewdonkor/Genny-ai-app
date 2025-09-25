export type MessageItem = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type MusicItem = {
  type: "prompt" | "audio";
  content: string;
};
