import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import ChatPage from "./chat/page";

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <ChatPage />
      </main>
    </div>
  );
};

export default HomePage;
