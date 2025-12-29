import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ChatSidebar from '../../components/admin/ChatSidebar';
import { logout } from '../../hooks/useAuth';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <AdminHeader onLogout={handleLogout} />
        <main className={styles.contentArea}>
          <Outlet />
        </main>
      </div>
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <button
        className={styles.chatToggleButton}
        onClick={() => setIsChatOpen(true)}
      >
        💬
      </button>
    </div>
  );
};

export default AdminLayout;
