import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 ">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
