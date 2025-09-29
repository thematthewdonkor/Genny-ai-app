export type MessageItem = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type CodeItem = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type MusicItem = {
  type: "prompt" | "audio";
  content: string;
};

export type ImageItem = {
  type: "prompt" | "image";
  url: string;
};
