import Sidebar from '@/components/admin/AdminSidebar';
import Header from '@/components/admin/AdminHeader';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
            
          {children}
         
        </main>
      </div>
    </div>
  );
}
