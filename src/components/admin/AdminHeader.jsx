import { Bell, Search, User } from 'lucide-react';
import styles from './AdminHeader.module.css';

const AdminHeader = ({ onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconButton}>
          <Bell size={20} />
          <span className={styles.notificationBadge}>3</span>
        </button>

        <div className={styles.userMenu}>
          <button className={styles.userButton}>
            <div className={styles.userAvatar}>
              <User size={20} />
            </div>
            <span>Admin</span>
          </button>
          <div className={styles.dropdown}>
            <button className={styles.dropdownItem} onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
