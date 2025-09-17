import { Assistant } from "@/components/assistant";
import { Input } from "@/components/input";
import { Welcome } from "@/components/welcome";
import { useChatStore } from "@/store/useChatStore";
import { ChatItem } from "@/types";
import axios from "axios";
useChatStore
const ChatPage = () => {
  const { addChatItem, setAssistantLoading, chatItems } = ();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatItem = {
      role: "user",
      content: message.trim(),
    };

    try {
      setAssistantLoading(true);
      addChatItem(userMessage);

      const response = await axios.post(
        "api/chat",
        {
          messages: [...chatItems, userMessage],
        },
        { headers: { "Content-type": "application/json" } }
      );

      const assistantMessage: ChatItem = {
        role: "assistant",
        content: response.data.assistantText,
      };

      addChatItem(assistantMessage);
      setAssistantLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setAssistantLoading(false);
    }
  };

  return (
    <div>
      <Welcome />
      <Assistant />
      <Input onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
