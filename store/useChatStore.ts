import { create } from "zustand";
import { ChatItem } from "@/types";

//Typescript
interface ChatState {
  chatItems: ChatItem[];
  assistantLoading: boolean;

  addChatItem: (message: ChatItem) => void;
  setAssistantLoading: (loading: boolean) => void;
}

//Function
export const useChatStore = create<ChatState>((set) => ({
  chatItems: [], //Initial state
  assistantLoading: false,

  addChatItem: (message) =>
    set((state) => ({ chatItems: [...state.chatItems, message] })), //State update function

  setAssistantLoading: (loading) => set({ assistantLoading: loading }),
}));
