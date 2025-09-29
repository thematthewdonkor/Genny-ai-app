import { create } from "zustand";
import { MessageItem, MusicItem, ImageItem, CodeItem } from "@/types";

interface ChatState {
  chatItems: MessageItem[];
  codeItems: CodeItem[];
  musicItems: MusicItem[];
  imageItems: ImageItem[];
  assistantLoading: boolean;

  addMusicItem: (message: MusicItem) => void;
  addImageItem: (message: ImageItem) => void;
  addChatItem: (message: MessageItem) => void;
  addCodeItem: (message: CodeItem) => void;
  setAssistantLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  chatItems: [],
  codeItems: [],
  musicItems: [],
  imageItems: [],
  assistantLoading: false,

  addMusicItem: (message) =>
    set((state) => ({ musicItems: [...state.musicItems, message] })),
  addImageItem: (message) =>
    set((state) => ({ imageItems: [...state.imageItems, message] })),
  addChatItem: (message) =>
    set((state) => ({ chatItems: [...state.chatItems, message] })),
  addCodeItem: (message) =>
    set((state) => ({ chatItems: [...state.chatItems, message] })),
  setAssistantLoading: (loading) => set({ assistantLoading: loading }),
}));
