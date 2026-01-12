import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Users, Home } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const KOST_API = "https://6957da9df7ea690182d34812.mockapi.io/KostList";

const KostManagement = () => {
  const [kosts, setKosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedKost, setSelectedKost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    facilities: [],
    address: '',
    description: '',
    image: '',
    isAvailable: false,
    rooms: {
      total: 0,
      available: 0,
      occupied: 0
    }
  });

  useEffect(() => {
    fetchKosts();
  }, []);

  const fetchKosts = async () => {
    try {
      const res = await fetch(KOST_API);
      const data = await res.json();
      
      // Add rooms data if not exists in API
      const kostsWithRooms = data.map(kost => ({
        ...kost,
        rooms: kost.rooms || {
          total: 10,
          available: kost.isAvailable ? Math.floor(Math.random() * 5) + 1 : 0,
          occupied: kost.isAvailable ? 10 - (Math.floor(Math.random() * 5) + 1) : 10
        }
      }));
      
      setKosts(kostsWithRooms);
    } catch (error) {
      console.error("Error fetching kosts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate rooms data
    const rooms = {
      total: parseInt(formData.rooms.total) || 0,
      available: parseInt(formData.rooms.available) || 0,
      occupied: (parseInt(formData.rooms.total) || 0) - (parseInt(formData.rooms.available) || 0)
    };

    // Ensure available doesn't exceed total
    if (rooms.available > rooms.total) {
      alert("Jumlah kamar tersedia tidak boleh lebih dari total kamar");
      return;
    }

    // Update isAvailable based on available rooms
    const isAvailable = rooms.available > 0;

    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `${KOST_API}/${editingId}` : KOST_API;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rooms,
          isAvailable,
          rating: isEditMode ? undefined : 0,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      const result = await res.json();
      
      // Add rooms to result if not returned by API
      const resultWithRooms = { ...result, rooms };

      if (isEditMode) {
        setKosts((prev) =>
          prev.map((k) => (k.id === editingId ? resultWithRooms : k))
        );
      } else {
        setKosts((prev) => [...prev, resultWithRooms]);
      }

      // Reset form and close modal
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingId(null);
      setFormData({
        name: '',
        type: '',
        price: '',
        facilities: [],
        address: '',
        description: '',
        image: '',
        isAvailable: false,
        rooms: {
          total: 0,
          available: 0,
          occupied: 0
        }
      });

    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (kost) => {
    setIsEditMode(true);
    setEditingId(kost.id);

    setFormData({
      name: kost.name || '',
      type: kost.type || '',
      price: kost.price || '',
      facilities: kost.facilities || [],
      address: kost.address || '',
      description: kost.description || '',
      image: kost.image || '',
      isAvailable: kost.isAvailable || false,
      rooms: kost.rooms || {
        total: 0,
        available: 0,
        occupied: 0
      }
    });

    setIsModalOpen(true);
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${KOST_API}/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus kost");

      setKosts((prev) => prev.filter((k) => k.id !== deleteId));
      setIsDeleteOpen(false);
      setDeleteId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRoomChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [field]: numValue,
        ...(field === 'total' && { 
          available: Math.min(prev.rooms.available, numValue),
          occupied: numValue - prev.rooms.available
        }),
        ...(field === 'available' && { 
          occupied: prev.rooms.total - numValue
        })
      }
    }));
  };

  const filteredKosts = kosts.filter(
    (kost) =>
      kost.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kost.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Kost</h1>
          <p className="text-gray-600">Kelola semua data kost yang terdaftar</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-[#61ADAD] px-4 py-2.5 text-white hover:bg-[#4a8a8a] transition-colors"
        >
          <Plus size={20} />
          <span>Tambah Kost</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari kost berdasarkan nama atau alamat..." 
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Nama Kost</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Tipe</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Deskripsi & Fasilitas</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Kamar</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredKosts.map((kost) => (
                <tr key={kost.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">#{kost.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={kost.image} 
                        alt={kost.name} 
                        className="h-12 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{kost.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{kost.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      kost.type === 'Putri' 
                        ? 'bg-pink-100 text-pink-800' 
                        : kost.type === 'Putra'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {kost.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      Rp {Number(kost.price).toLocaleString("id-ID")}/bulan
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => {setSelectedKost(kost); setIsViewOpen(true)}}
                      className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <Eye size={14} />
                      Lihat Detail
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">⭐</span>
                      <span className="font-medium">{kost.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {/* Total Kamar */}
                      <div className="flex items-center gap-2">
                        <Home size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">Total: </span>
                        <span className="font-medium text-gray-900">{kost.rooms?.total || 0}</span>
                      </div>
                      
                      {/* Ketersediaan Kamar */}
                      <div className="flex items-center gap-2">
                        <Users size={14} className={
                          kost.rooms?.available > 0 ? "text-green-500" : "text-red-500"
                        } />
                        <span className={
                          kost.rooms?.available > 0 ? "text-green-600" : "text-red-500"
                        }>
                          {kost.rooms?.available > 0 ? (
                            <span className="font-medium">Tersisa {kost.rooms.available} kamar</span>
                          ) : (
                            <span className="font-medium">Penuh</span>
                          )}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      {kost.rooms?.total > 0 && (
                        <div className="pt-1">
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                kost.rooms?.available > 0 ? "bg-[#61ADAD]" : "bg-red-500"
                              }`}
                              style={{ 
                                width: `${((kost.rooms?.total - kost.rooms?.available) / kost.rooms?.total * 100)}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(kost)}
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => openDeleteDialog(kost.id)}
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
      {filteredKosts.length === 0 && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Home className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">Tidak ada data kost</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Tidak ada kost yang sesuai dengan pencarian' : 'Mulai dengan menambahkan kost pertama Anda'}
          </p>
        </div>
      )}

      {/* View Modal */}
      {isViewOpen && selectedKost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Detail Kost</h2>
              <button
                onClick={() => setIsViewOpen(false)}
                className="text-xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 px-6 py-5 text-sm text-gray-700">
              {/* Room Information - TAMBAHAN BARU */}
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-3 font-semibold text-gray-800">Informasi Kamar</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedKost.rooms?.total || 0}</div>
                    <div className="text-xs text-gray-600">Total Kamar</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      selectedKost.rooms?.available > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {selectedKost.rooms?.available || 0}
                    </div>
                    <div className="text-xs text-gray-600">Kamar Tersedia</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedKost.rooms?.available > 0 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {selectedKost.rooms?.available > 0 
                      ? `Tersisa ${selectedKost.rooms.available} kamar` 
                      : 'Penuh'}
                  </span>
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">Deskripsi</h3>
                <p className="leading-relaxed">
                  {selectedKost.description || "-"}
                </p>
              </div>

              {/* Fasilitas */}
              <div>
                <h3 className="mb-2 font-semibold text-gray-800">Fasilitas</h3>
                {selectedKost.facilities?.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-5">
                    {selectedKost.facilities.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                ) : (
                  <p>-</p>
                )}
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
                {isEditMode ? "Edit Kost" : "Tambah Kost Baru"}
              </h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setEditingId(null);
                  setFormData({
                    name: '',
                    type: '',
                    price: '',
                    facilities: [],
                    address: '',
                    description: '',
                    image: '',
                    isAvailable: false,
                    rooms: { total: 0, available: 0, occupied: 0 }
                  });
                }} 
                className="text-xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Nama Kost *</label>
                  <input 
                    placeholder="Nama Kost" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Tipe *</label>
                  <select 
                    value={formData.type} 
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                    required
                  >
                    <option value="" hidden>Tipe Kost</option>
                    <option value="Putra">Putra</option>
                    <option value="Putri">Putri</option>
                    <option value="Campur">Campur</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Harga per Bulan *</label>
                  <input 
                    type="number"
                    placeholder="Harga (bulanan)" 
                    value={formData.price} 
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Link Gambar</label>
                  <input 
                    placeholder="Image Link" 
                    value={formData.image} 
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                  />
                </div>
              </div>

              {/* Room Information - TAMBAHAN BARU */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-800">Informasi Kamar</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Total Kamar *</label>
                    <input 
                      type="number"
                      placeholder="Jumlah total kamar" 
                      value={formData.rooms.total} 
                      onChange={(e) => handleRoomChange('total', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Kamar Tersedia *</label>
                    <input 
                      type="number"
                      placeholder="Jumlah kamar tersedia" 
                      value={formData.rooms.available} 
                      onChange={(e) => handleRoomChange('available', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                      min="0"
                      max={formData.rooms.total}
                      required
                    />
                    {formData.rooms.total > 0 && (
                      <div className="mt-1 text-xs text-gray-500">
                        Terisi: {formData.rooms.total - formData.rooms.available} kamar
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Room Status Summary */}
                {formData.rooms.total > 0 && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-white p-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{formData.rooms.total}</div>
                      <div className="text-xs text-gray-600">Total</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        formData.rooms.available > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {formData.rooms.available}
                      </div>
                      <div className="text-xs text-gray-600">Tersedia</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {formData.rooms.total - formData.rooms.available}
                      </div>
                      <div className="text-xs text-gray-600">Terisi</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Fasilitas</label>
                <select 
                  multiple
                  value={formData.facilities} 
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    facilities: Array.from(e.target.selectedOptions, (option) => option.value) 
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                  size="4"
                >
                  <option value="" hidden>Pilih fasilitas (Ctrl+klik untuk pilih banyak)</option>
                  <option value="Wi-Fi">Wi-Fi</option>
                  <option value="Kamar Mandi Dalam">Kamar Mandi Dalam</option>
                  <option value="Parkiran">Parkiran</option>
                  <option value="AC">AC</option>
                  <option value="Laundry">Laundry</option>
                  <option value="TV">TV</option>
                  <option value="Dapur Bersama">Dapur Bersama</option>
                  <option value="Ruang Tamu">Ruang Tamu</option>
                </select>
                <div className="mt-1 text-xs text-gray-500">
                  Fasilitas terpilih: {formData.facilities.length} item
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Alamat *</label>
                <textarea 
                  placeholder="Alamat lengkap" 
                  rows={2}
                  value={formData.address} 
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea 
                  placeholder="Deskripsi kost" 
                  rows={3}
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#61ADAD] focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isAvailable"
                  checked={formData.isAvailable} 
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-[#61ADAD] focus:ring-[#61ADAD]"
                />
                <label htmlFor="isAvailable" className="text-sm text-gray-700">
                  Tandai sebagai tersedia (otomatis berdasarkan kamar tersedia)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setEditingId(null);
                    setFormData({
                      name: '',
                      type: '',
                      price: '',
                      facilities: [],
                      address: '',
                      description: '',
                      image: '',
                      isAvailable: false,
                      rooms: { total: 0, available: 0, occupied: 0 }
                    });
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="rounded-lg bg-[#61ADAD] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4a8a8a] transition-colors"
                >
                  {isEditMode ? "Update Kost" : "Simpan Kost"}
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
            <DialogTitle>Hapus Kost</DialogTitle>
            <DialogDescription>
              Apakah kamu yakin ingin menghapus kost ini?  
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

export default KostManagement;