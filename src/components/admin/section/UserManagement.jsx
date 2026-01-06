import { useState, useEffect } from 'react';
import { Search, UserPlus, Trash2, Edit } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import styles from './UserManagement.module.css';

const USER_API = "https://6957da9df7ea690182d34812.mockapi.io/users";

const UserManagement = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
    gender: "",
    birthDate: "",
    city: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.password) {
      alert("Nama, email, dan password wajib diisi");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(USER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          favorite: [],
        }),
      });

      if (!res.ok) throw new Error("Gagal menambahkan user");

      const newUser = await res.json();

      setUsers((prev) => [
        ...prev,
        {
          ...newUser,
          joinDate: "2024-01-01",
          status: "active",
        },
      ]);

      setIsOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
        phone: "",
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      password: user.password || "",
      role: user.role || "user",
      phone: user.phone || "",
      gender: user.gender || "",
      birthDate: user.birthDate || "",
      city: user.city || "",
    });
    setIsEditOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await fetch(`${USER_API}/${editingUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal update user");

      const updatedUser = await res.json();

      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );

      setIsEditOpen(false);
      setEditingUserId(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };


  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus user ini?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${USER_API}/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus user");
      }

      // hapus dari state agar UI langsung update
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetch(USER_API)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data user");
        }
        return res.json();
      })
      .then((data) => {
        // normalisasi data agar cocok dengan UI kamu
        const formatted = data.map((user) => ({
          ...user,
          phone: user.phone || "-",
        }));

        setUsers(formatted);
      })
      .catch((err) => {
        console.error(err);
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p style={{ padding: 20 }}>Loading users...</p>;
  }

  return (
    <div className={styles.userManagement}>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Tambah User</h2>

            <form onSubmit={handleAddUser} className={styles.form}>
              <input name="firstName" placeholder="Nama Depan" value={formData.firstName} onChange={handleChange} />
              <input name="lastName" placeholder="Nama Belakang" value={formData.lastName} onChange={handleChange} />
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              <input name="phone" placeholder="No HP" value={formData.phone} onChange={handleChange} />
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <input type='date' name="birthDate" placeholder="Tanggal Bulan Lahir" value={formData.birthDate} onChange={handleChange} />
              <input name="city" placeholder="Kota" value={formData.city} onChange={handleChange} />
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setIsOpen(false)}>Batal</button>
                <button type="submit" disabled={submitting}>
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isEditOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit User</h2>

            <form onSubmit={handleUpdateUser} className={styles.form}>
              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nama Depan" />
              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Nama Belakang" />
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="No HP" />

              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Pilih Gender</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>

              <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
              <input name="city" value={formData.city} onChange={handleChange} placeholder="Kota" />

              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setIsEditOpen(false)}>Batal</button>
                <button type="submit" disabled={submitting}>
                  {submitting ? "Menyimpan..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.header}>
        <h1>Kelola User</h1>

        <div className={styles.headerActions}>
          <div className={styles.searchBar}>
            <Search size={20} />
            <input type="text" placeholder="Cari user..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <button className={styles.addButton} onClick={() => setIsOpen(true)}>
            <UserPlus size={20} />
            Tambah User
          </button>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Users</h3>
          <p>{users.filter((u) => u.role === 'user').length}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Admin</h3>
          <p>{users.filter((u) => u.role === 'admin').length}</p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableCaption>Data Seluruh Pengguna</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Birth Date</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell># {user.id}</TableCell>

                <TableCell>
                  <strong>{user.firstName} {user.lastName}</strong>
                  <br />
                  <small>{user.email}</small>
                </TableCell>

                <TableCell>
                  <div>{user.phone}</div>
                </TableCell>

                <TableCell>
                  <span className={`${styles.roleBadge} ${styles[user.role]}`}>
                    {user.role}
                  </span>
                </TableCell>

                <TableCell>{user.birthDate}</TableCell>

                <TableCell className={styles.actionsCell}>
                  <button className={`${styles.actionButton} ${styles.edit}`} disabled={submitting} onClick={() => handleOpenEdit(user)}><Edit size={16} /></button>
                  <button className={`${styles.actionButton} ${styles.delete}`} disabled={submitting} onClick={() => handleDeleteUser(user.id)} title="Hapus"><Trash2 size={16} /></button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
