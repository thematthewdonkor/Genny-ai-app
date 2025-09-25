import { create } from "zustand";
import { MessageItem, MusicItem } from "@/types";

interface ChatState {
  chatItems: MessageItem[];
  musicItems: MusicItem[];
  assistantLoading: boolean;

  addMusicItem: (message: MusicItem) => void;
  addChatItem: (message: MessageItem) => void;
  setAssistantLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  chatItems: [],
  musicItems: [],
  assistantLoading: false,

  addMusicItem: (message) =>
    set((state) => ({ musicItems: [...state.musicItems, message] })),
  addChatItem: (message) =>
    set((state) => ({ chatItems: [...state.chatItems, message] })),
  setAssistantLoading: (loading) => set({ assistantLoading: loading }),
}));
