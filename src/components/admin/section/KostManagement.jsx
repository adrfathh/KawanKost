import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import styles from './KostManagement.module.css';

const KOST_API = "https://6957da9df7ea690182d34812.mockapi.io/KostList";

const KostManagement = () => {
  const [kosts, setKosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedKost, setSelectedKost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    facilities: [],
    address: '',
    description: '',
    image: '',
    isAvailable: false,
  });

  useEffect(() => {
    fetch(KOST_API)
      .then((res) => res.json())
      .then((data) => setKosts(data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `${KOST_API}/${editingId}` : KOST_API;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: isEditMode ? undefined : 0,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      const result = await res.json();

      if (isEditMode) {
        setKosts((prev) =>
          prev.map((k) => (k.id === editingId ? result : k))
        );
      } else {
        setKosts((prev) => [...prev, result]);
      }

      // reset
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
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus kost ini?");
    if (!confirm) return;

    try {
      const res = await fetch(`${KOST_API}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus kost");

      setKosts((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredKosts = kosts.filter(
    (kost) =>
      kost.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kost.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.kostManagement}>
      <div className={styles.header}>
        <h1>Kelola Kost</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>Tambah Kost</span>
        </button>
      </div>

      <div className={styles.searchBar}>
        <Search className={styles.searchIcon} size={20} />
        <input type="text" placeholder="Cari kost..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput}/>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Kost</th>
              <th>Tipe</th>
              <th>Harga</th>
              <th>Deskripsi & Fasilitas</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredKosts.map((kost) => (
              <tr key={kost.id}>
                <td># {kost.id}</td>
                <td>
                  <div className={styles.kostInfo}>
                    <img src={kost.image} alt={kost.name} className={styles.kostThumb} />
                    <div>
                      <p className={styles.kostName}>{kost.name}</p>
                      <p className={styles.kostAddress}>{kost.address}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.typeBadge} ${styles[String(kost.type || "").toLowerCase()]}`}>{kost.type}</span>
                </td>
                <td className={styles.price}>Rp {Number(kost.price).toLocaleString("id-ID")}/bulan</td>
                <td><button className={`${styles.actionButton} ${styles.see}`} onClick={() => {setSelectedKost(kost); setIsViewOpen(true)}}><Eye size={16} /></button></td>
                {isViewOpen && selectedKost && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

                      {/* Header */}
                      <div className="flex items-center justify-between border-b px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Detail Kost
                        </h2>
                        <button
                          onClick={() => setIsViewOpen(false)}
                          className="text-xl text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </div>

                      {/* Content */}
                      <div className="space-y-4 px-6 py-5 text-sm text-gray-700">

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
                <td>⭐ {kost.rating}</td>
                <td>
                  <span className={`${styles.statusBadge} ${kost.isAvailable ? styles.available : styles.full}`}>
                    {kost.isAvailable ? 'Tersedia' : 'Penuh'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionButton} onClick={() => handleEdit(kost)}><Edit size={16} /></button>
                    <button className={`${styles.actionButton} ${styles.delete}`} onClick={() => handleDelete(kost.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">{isEditMode ? "Edit Kost" : "Tambah Kost Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-xl text-gray-400 hover:text-gray-600">×</button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              <input placeholder="Nama Kost" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"/>
              <input placeholder="Image Link" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"/>
              {/* <input placeholder="Tipe (Putra / Putri / Campur)" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"/> */}
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30">
                <option value="" hidden>Tipe</option>
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
                <option value="Campur">Campur</option>
              </select>
              <select multiple value={formData.facilities} onChange={(e) => setFormData({ ...formData, facilities: Array.from(e.target.selectedOptions, (option) => option.value) })} className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30">
                <option value="" hidden>Fasilitas</option>
                <option value="Wi-Fi">Wi-Fi</option>
                <option value="Kamar Mandi Dalam">Kamar Mandi Dalam</option>
                <option value="Parkiran">Parkiran</option>
                <option value="Air Conditioner">Air Conditioner</option>
                <option value="Laundry">Laundry</option>
                <option value="TV">TV</option>
                <option value="Dapur Bersama">Dapur Bersama</option>
                <option value="Ruang Tamu">Ruang Tamu</option>
              </select>
              <input type='number' placeholder="Harga (bulanan)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"/>
              <textarea placeholder="Alamat" rows={3} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"/>
              <textarea placeholder="Deskripsi" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full resize-none rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61ADAD]/30"/>
              <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={formData.isAvailable} onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })} className="h-4 w-4 ml-2 rounded border-gray-300 text-[#61ADAD] focus:ring-[#61ADAD]"/>Tersedia</label>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Batal</button>
                <button type="submit" className="rounded-lg bg-[#61ADAD] px-5 py-2 text-sm font-medium text-white hover:bg-[#4f9b9b]">{isEditMode ? "Update" : "Simpan"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KostManagement;
