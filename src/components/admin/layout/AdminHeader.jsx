import { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import styles from './AdminHeader.module.css';
import KawanKost from '../../../assets/icons/KawanKost.png';

const AdminHeader = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <img src={KawanKost} />

      <div className={styles.actions}>
        <button className={styles.iconButton}>
          <Bell size={20} />
          <span className={styles.notificationBadge}>3</span>
        </button>

        <button className={styles.userButton} onClick={() => setOpen(prev => !prev)}>
          <User size={20} />
          <span>Admin</span>
        </button>

        {open && (
          <div className={styles.dropdown}>
            <button className={styles.dropdownItem} onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
