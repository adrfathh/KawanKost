import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, User, Mail, Phone, Calendar, MapPin, Shield, ShieldAlert } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const USER_API = "https://6957da9df7ea690182d34812.mockapi.io/users";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    gender: '',
    birthDate: '',
    phone: '',
    city: '',
    favorite: []
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(USER_API);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.password) {
      alert("Nama, email, dan password wajib diisi");
      return;
    }

    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `${USER_API}/${editingId}` : USER_API;

    try {
      setSubmitting(true);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          favorite: formData.favorite || []
        }),
      });

      if (!res.ok) throw new Error(`Gagal ${isEditMode ? 'mengupdate' : 'menyimpan'} data`);

      const result = await res.json();

      if (isEditMode) {
        setUsers((prev) => prev.map((u) => (u.id === editingId ? result : u)));
      } else {
        setUsers((prev) => [...prev, result]);
      }

      // Reset form and close modal
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingId(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user',
        gender: '',
        birthDate: '',
        phone: '',
        city: '',
        favorite: []
      });

    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setIsEditMode(true);
    setEditingId(user.id);

    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      password: user.password || '',
      role: user.role || 'user',
      gender: user.gender || '',
      birthDate: user.birthDate || '',
      phone: user.phone || '',
      city: user.city || '',
      favorite: user.favorite || []
    });

    setIsModalOpen(true);
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${USER_API}/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus user");

      setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      setIsDeleteOpen(false);
      setDeleteId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.phone?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // Stats calculation
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role === 'user').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola User</h1>
          <p className="text-gray-600">Kelola semua data user yang terdaftar</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-[#61ADAD] px-4 py-2.5 text-white hover:bg-[#4a8a8a] transition-colors"
        >
          <Plus size={20} />
          <span>Tambah User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
            </div>
            <div className="rounded-lg bg-[#f0f8f8] p-3">
              <User className="h-6 w-6 text-[#61ADAD]" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admin</p>
              <p className="text-2xl font-bold text-gray-800">{adminCount}</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Users Biasa</p>
              <p className="text-2xl font-bold text-gray-800">{userCount}</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3">
              <User className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari user berdasarkan nama, email, atau nomor telepon..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Kontak</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">#{user.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#61ADAD] to-[#89c2c2] flex items-center justify-center text-white font-bold">
                        {user.firstName?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{user.phone || '-'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600 truncate max-w-xs">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role === 'admin' ? (
                        <>
                          <Shield size={12} />
                          Admin
                        </>
                      ) : (
                        <>
                          <User size={12} />
                          User
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {user.birthDate || '-'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {user.city || '-'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {setSelectedUser(user); setIsViewOpen(true)}}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                        title="Lihat Detail"
                      >
                        <User size={16} />
                      </button>
                      <button 
                        onClick={() => handleEdit(user)}
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => openDeleteDialog(user.id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">Tidak ada data user</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Tidak ada user yang sesuai dengan pencarian' : 'Mulai dengan menambahkan user pertama'}
          </p>
        </div>
      )}

      {/* View Modal */}
      {isViewOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Detail User</h2>
              <button
                onClick={() => setIsViewOpen(false)}
                className="text-xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              {/* User Info Header */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#61ADAD] to-[#89c2c2] flex items-center justify-center text-white text-xl font-bold">
                  {selectedUser.firstName?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    selectedUser.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedUser.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3 text-sm text-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">No. Telepon</div>
                    <div className="font-medium">{selectedUser.phone || '-'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Gender</div>
                    <div className="font-medium">{selectedUser.gender || '-'}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Tanggal Lahir</div>
                    <div className="font-medium">{selectedUser.birthDate || '-'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Kota</div>
                    <div className="font-medium">{selectedUser.city || '-'}</div>
                  </div>
                </div>

                {/* Favorite Kost Count */}
                <div>
                  <div className="text-xs text-gray-500">Kost Favorit</div>
                  <div className="font-medium">
                    {selectedUser.favorite?.length || 0} kost
                  </div>
                </div>

                {/* Account Created */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">ID User</div>
                  <div className="font-mono text-sm">#{selectedUser.id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {isEditMode ? "Edit User" : "Tambah User Baru"}
              </h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setEditingId(null);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    role: 'user',
                    gender: '',
                    birthDate: '',
                    phone: '',
                    city: '',
                    favorite: []
                  });
                }} 
                className="text-xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              {/* Personal Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Nama Depan *</label>
                  <input 
                    name="firstName"
                    placeholder="Nama Depan" 
                    value={formData.firstName} 
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Nama Belakang</label>
                  <input 
                    name="lastName"
                    placeholder="Nama Belakang" 
                    value={formData.lastName} 
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                  <input 
                    name="email"
                    type="email"
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Password {isEditMode ? '(biarkan kosong untuk tidak mengubah)' : '*'}</label>
                  <input 
                    name="password"
                    type="password"
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                    required={!isEditMode}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">No. Telepon</label>
                  <input 
                    name="phone"
                    placeholder="No. Telepon" 
                    value={formData.phone} 
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Gender</label>
                  <select 
                    name="gender"
                    value={formData.gender} 
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                  >
                    <option value="">Pilih Gender</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                  <input 
                    name="birthDate"
                    type="date"
                    value={formData.birthDate} 
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Kota</label>
                  <input 
                    name="city"
                    placeholder="Kota" 
                    value={formData.city} 
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Role *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === 'user'}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#61ADAD] focus:ring-[#61ADAD]"
                    />
                    <span className="text-sm text-gray-700">User</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === 'admin'}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#61ADAD] focus:ring-[#61ADAD]"
                    />
                    <span className="text-sm text-gray-700">Admin</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setEditingId(null);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      password: '',
                      role: 'user',
                      gender: '',
                      birthDate: '',
                      phone: '',
                      city: '',
                      favorite: []
                    });
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="rounded-lg bg-[#61ADAD] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4a8a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Menyimpan..." : isEditMode ? "Update User" : "Simpan User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus User</DialogTitle>
            <DialogDescription>
              Apakah kamu yakin ingin menghapus user ini?  
              Tindakan ini <strong>tidak bisa dibatalkan</strong>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;