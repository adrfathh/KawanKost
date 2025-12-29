import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import styles from './KostManagement.module.css';
import { dummyKostList } from '../../data/dummyKost';

const KostManagement = () => {
  const [kosts, setKosts] = useState(dummyKostList);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingKost, setEditingKost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredKosts = kosts.filter(
    (kost) =>
      kost.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kost.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kost ini?')) {
      setKosts(kosts.filter((kost) => kost.id !== id));
    }
  };

  const handleEdit = (kost) => {
    setEditingKost(kost);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setIsModalOpen(false);
    setEditingKost(null);
  };

  const formFields = [
    { name: 'name', label: 'Nama Kost', type: 'text' },
    {
      name: 'type',
      label: 'Tipe',
      type: 'select',
      options: ['Putra', 'Putri', 'Campur'],
    },
    { name: 'price', label: 'Harga', type: 'text' },
    { name: 'address', label: 'Alamat', type: 'text' },
    { name: 'description', label: 'Deskripsi', type: 'textarea' },
    { name: 'isAvailable', label: 'Status', type: 'checkbox' },
  ];

  return (
    <div className={styles.kostManagement}>
      <div className={styles.header}>
        <h1>Kelola Kost</h1>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          <span>Tambah Kost</span>
        </button>
      </div>

      <div className={styles.searchBar}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Cari kost..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Kost</th>
              <th>Tipe</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredKosts.map((kost) => (
              <tr key={kost.id}>
                <td>{kost.id}</td>
                <td>
                  <div className={styles.kostInfo}>
                    <img
                      src={kost.image}
                      alt={kost.name}
                      className={styles.kostThumb}
                    />
                    <div>
                      <p className={styles.kostName}>{kost.name}</p>
                      <p className={styles.kostAddress}>
                        {kost.address.substring(0, 30)}...
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.typeBadge} ${
                      styles[kost.type.toLowerCase()]
                    }`}
                  >
                    {kost.type}
                  </span>
                </td>
                <td className={styles.price}>{kost.price}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      kost.isAvailable ? styles.available : styles.full
                    }`}
                  >
                    {kost.isAvailable ? 'Tersedia' : 'Penuh'}
                  </span>
                </td>
                <td>
                  <div className={styles.rating}>⭐ {kost.rating}</div>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionButton} title="Lihat">
                      <Eye size={16} />
                    </button>
                    <button
                      className={styles.actionButton}
                      title="Edit"
                      onClick={() => handleEdit(kost)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.delete}`}
                      title="Hapus"
                      onClick={() => handleDelete(kost.id)}
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

      {/* Modal untuk Add/Edit */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editingKost ? 'Edit Kost' : 'Tambah Kost Baru'}</h2>
              <button
                className={styles.closeButton}
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingKost(null);
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              {formFields.map((field) => (
                <div key={field.name} className={styles.formGroup}>
                  <label>{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      defaultValue={editingKost?.[field.name] || ''}
                      className={styles.input}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      defaultValue={editingKost?.[field.name] || ''}
                      className={styles.textarea}
                      rows={3}
                    />
                  ) : field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      defaultChecked={editingKost?.[field.name] || false}
                      className={styles.checkbox}
                    />
                  ) : (
                    <input
                      type={field.type}
                      defaultValue={editingKost?.[field.name] || ''}
                      className={styles.input}
                    />
                  )}
                </div>
              ))}
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingKost(null);
                  }}
                >
                  Batal
                </button>
                <button type="submit" className={styles.submitButton}>
                  {editingKost ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KostManagement;
