import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Users,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/kosts', icon: <Home size={20} />, label: 'Kelola Kost' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Kelola User' },
    {
      path: '/admin/chat',
      icon: <MessageSquare size={20} />,
      label: 'Chat Support',
    },
    {
      path: '/admin/settings',
      icon: <Settings size={20} />,
      label: 'Settings',
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <h2>KawanKost</h2>
          <span className={styles.logoSubtitle}>Admin Panel</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.menuItem} ${isActive ? styles.active : ''}`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.adminInfo}>
          <div className={styles.avatar}>A</div>
          <div>
            <p className={styles.adminName}>Admin</p>
            <p className={styles.adminEmail}>admin@kawankost.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
