import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import ChatPage from "./chat/page";

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 space-y-4 overflow-auto">
        <Navbar />
        <ChatPage />
      </main>
    </div>
  );
};

export default HomePage;
