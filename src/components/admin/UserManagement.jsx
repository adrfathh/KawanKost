import { useState, useEffect } from 'react';
import { Search, UserPlus, Mail, Phone, Calendar } from 'lucide-react';
import styles from './UserManagement.module.css';
import { getUsers } from '../../hooks/useAuth';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedUsers = getUsers();
    setUsers([
      {
        id: 999,
        firstName: 'Admin',
        lastName: 'Gacor',
        email: 'admin@test.com',
        phone: '081234567890',
        role: 'admin',
        joinDate: '2024-01-01',
        status: 'active',
      },
      {
        id: 1,
        firstName: 'Adrian',
        lastName: 'Fathir',
        email: 'fathir@test.com',
        phone: '081234567891',
        role: 'user',
        joinDate: '2024-01-15',
        status: 'active',
      },
      ...storedUsers.map((user, index) => ({
        ...user,
        id: index + 2,
        phone: '0812' + Math.floor(1000000 + Math.random() * 9000000),
        joinDate:
          '2024-0' +
          (Math.floor(Math.random() * 9) + 1) +
          '-' +
          (Math.floor(Math.random() * 28) + 1),
        status: Math.random() > 0.3 ? 'active' : 'inactive',
      })),
    ]);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === 'active' ? 'inactive' : 'active',
            }
          : user
      )
    );
  };

  return (
    <div className={styles.userManagement}>
      <div className={styles.header}>
        <h1>Kelola User</h1>
        <div className={styles.headerActions}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Cari user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.addButton}>
            <UserPlus size={20} />
            <span>Tambah User</span>
          </button>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p className={styles.statValue}>{users.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Active Users</h3>
          <p className={styles.statValue}>
            {users.filter((u) => u.status === 'active').length}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Admin Users</h3>
          <p className={styles.statValue}>
            {users.filter((u) => u.role === 'admin').length}
          </p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Kontak</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>
                    <div>
                      <p className={styles.userName}>
                        {user.firstName} {user.lastName}
                      </p>
                      <p className={styles.userEmail}>{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                      <Mail size={14} />
                      <span>{user.email}</span>
                    </div>
                    <div className={styles.contactItem}>
                      <Phone size={14} />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.roleBadge} ${styles[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className={styles.dateInfo}>
                    <Calendar size={14} />
                    <span>{user.joinDate}</span>
                  </div>
                </td>
                <td>
                  <button
                    className={`${styles.statusToggle} ${styles[user.status]}`}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </button>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionButton}>Detail</button>
                    <button className={`${styles.actionButton} ${styles.edit}`}>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
