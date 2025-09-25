import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="w-10 h-10 border">
      <AvatarImage src="/bot.png" />
    </Avatar>
  );
};
