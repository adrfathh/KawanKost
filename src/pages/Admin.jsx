import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/layout/AdminSidebar';
import AdminHeader from '../components/admin/layout/AdminHeader';
import ChatSidebar from '../components/admin/layout/ChatSidebar';
import { logout } from '../hooks/useAuth';

const AdminLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30">
        <AdminSidebar onLogout={handleLogout} />
      </div>

      {/* Main Content Area */}
      <div className="pl-64 transition-all duration-300">
        {/* Header */}
        <div className="sticky top-0 z-20">
          <AdminHeader onLogout={handleLogout} onChatToggle={() => setIsChatOpen(!isChatOpen)}/>
        </div>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-64px)] p-6">
          <div className="max-w-10xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Chat Sidebar */}
        <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>

      {/* Responsive Overlay for Mobile */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 pointer-events-none opacity-0 transition-opacity duration-300"></div>
    </div>
  );
};

export default AdminLayout;