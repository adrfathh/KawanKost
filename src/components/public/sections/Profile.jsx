import { useState } from 'react';
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Shield,
  Clock,
  CreditCard,
  History,
  Settings,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import styles from './Profile.module.css';

const ProfilePage = ({ user }) => {
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || 'Zaky Hafizhan',
    gender: 'Laki-laki',
    birthDate: '2000-01-01',
    occupation: 'Mahasiswa',
    institution: 'UGM',
    city: 'Yogyakarta',
    phone: '+62 812-3456-7890',
    status: 'Belum Menikah',
    education: 'S1',
    emergencyContact: '+62 878-9012-3456',
  });

  const [isEditing, setIsEditing] = useState(false);
  const profileComplete = 75;

  const menuItems = [
    { icon: History, label: 'Riwayat Sewa', path: '/history' },
    { icon: CreditCard, label: 'Riwayat Transaksi', path: '/transactions' },
    { icon: History, label: 'Riwayat Kos', path: '/kost-history' },
    {
      icon: Shield,
      label: 'Verifikasi Akun',
      path: '/verification',
      verified: true,
    },
    { icon: Settings, label: 'Pengaturan', path: '/settings' },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here
    setIsEditing(false);
  };

  return (
    <div className={styles.profilePage}>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <User size={48} />
            </div>
            <div>
              <h1 className={styles.userName}>{profileData.fullName}</h1>
              <div className={styles.profileCompletion}>
                <div className={styles.completionBar}>
                  <div
                    className={styles.completionFill}
                    style={{ width: `${profileComplete}%` }}
                  />
                </div>
                <span className={styles.completionText}>
                  {profileComplete}% data profil lengkap
                </span>
              </div>
              <p className={styles.completionHint}>
                Profil yang lengkap bisa memberikan rekomendasi yang lebih
                akurat
              </p>
            </div>
          </div>

          {/* Profile Stats */}
          <div className={styles.profileStats}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>3</div>
              <div className={styles.statLabel}>Kos Disewa</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>12</div>
              <div className={styles.statLabel}>Transaksi</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>4.8</div>
              <div className={styles.statLabel}>Rating</div>
            </div>
          </div>
        </div>

        <div className={styles.profileContent}>
          {/* Left Sidebar Menu */}
          <div className={styles.sidebar}>
            <nav className={styles.menu}>
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className={styles.menuItem}
                >
                  <div className={styles.menuIcon}>
                    <item.icon size={20} />
                  </div>
                  <span>{item.label}</span>
                  {item.verified && (
                    <CheckCircle size={16} className={styles.verifiedIcon} />
                  )}
                  <ChevronRight size={16} className={styles.chevron} />
                </a>
              ))}
            </nav>

            {/* Kos Saya Section */}
            <div className={styles.myKost}>
              <h3 className={styles.myKostTitle}>Kos Saya</h3>
              <div className={styles.kostEmptyState}>
                <p className={styles.kostEmptyText}>Kamu belum menyewa kos</p>
                <p className={styles.kostEmptySubtext}>
                  Yuk, sewa di KawanKost atau masukkan kode dari pemilik kos
                  untuk mengaktifkan halaman ini!
                </p>
                <button className={styles.findKostButton}>
                  Cari dan Sewa Kost
                </button>
              </div>

              <div className={styles.kostTips}>
                <h4>Tips dan komitmen untuk transaksi terbaik!</h4>
                <ul className={styles.tipsList}>
                  <li>KawanKost menjadi perantara transaksi</li>
                  <li>Cashless dengan berbagai metode pembayaran</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Form */}
          <div className={styles.mainContent}>
            <div className={styles.contentHeader}>
              <h2 className={styles.contentTitle}>Informasi Pribadi</h2>
              <p className={styles.contentSubtitle}>
                Lengkapi data diri Anda untuk mendapatkan pengalaman terbaik
              </p>
              {!isEditing && (
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profil
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className={styles.profileForm}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName">Nama Lengkap</label>
                    <input
                      type="text"
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          fullName: e.target.value,
                        })
                      }
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Jenis Kelamin</label>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="gender"
                          value="Laki-laki"
                          checked={profileData.gender === 'Laki-laki'}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              gender: e.target.value,
                            })
                          }
                        />
                        <span>Laki-laki</span>
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="gender"
                          value="Perempuan"
                          checked={profileData.gender === 'Perempuan'}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              gender: e.target.value,
                            })
                          }
                        />
                        <span>Perempuan</span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="birthDate">Tanggal Lahir</label>
                    <input
                      type="date"
                      id="birthDate"
                      value={profileData.birthDate}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          birthDate: e.target.value,
                        })
                      }
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="occupation">Pekerjaan</label>
                    <select
                      id="occupation"
                      value={profileData.occupation}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          occupation: e.target.value,
                        })
                      }
                      className={styles.formSelect}
                    >
                      <option>Mahasiswa</option>
                      <option>Pekerja</option>
                      <option>Wirausaha</option>
                      <option>Lainnya</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="institution">
                      Nama Institusi/Kampus/Sekolah
                    </label>
                    <input
                      type="text"
                      id="institution"
                      value={profileData.institution}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          institution: e.target.value,
                        })
                      }
                      className={styles.formInput}
                      placeholder="Contoh: UGM"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="city">Kota Asal</label>
                    <input
                      type="text"
                      id="city"
                      value={profileData.city}
                      onChange={(e) =>
                        setProfileData({ ...profileData, city: e.target.value })
                      }
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      value={profileData.status}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          status: e.target.value,
                        })
                      }
                      className={styles.formSelect}
                    >
                      <option>Belum Menikah</option>
                      <option>Menikah</option>
                      <option>Lainnya</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="education">Pendidikan Terakhir</label>
                    <select
                      id="education"
                      value={profileData.education}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          education: e.target.value,
                        })
                      }
                      className={styles.formSelect}
                    >
                      <option>SMA/SMK</option>
                      <option>D3</option>
                      <option>S1</option>
                      <option>S2</option>
                      <option>S3</option>
                    </select>
                  </div>
                </div>

                {/* Contact Info */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Kontak Darurat</h3>
                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContact">
                      Nomor Kontak Darurat
                    </label>
                    <input
                      type="tel"
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          emergencyContact: e.target.value,
                        })
                      }
                      className={styles.formInput}
                      placeholder="+62 xxx xxxx xxxx"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setIsEditing(false)}
                  >
                    Batal
                  </button>
                  <button type="submit" className={styles.saveButton}>
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.profileInfo}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <User size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Nama Lengkap</div>
                      <div className={styles.infoValue}>
                        {profileData.fullName}
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <User size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Jenis Kelamin</div>
                      <div className={styles.infoValue}>
                        {profileData.gender}
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Calendar size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Tanggal Lahir</div>
                      <div className={styles.infoValue}>
                        {profileData.birthDate}
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <User size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Pekerjaan</div>
                      <div className={styles.infoValue}>
                        {profileData.occupation}
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Institusi/Kampus</div>
                      <div className={styles.infoValue}>
                        {profileData.institution}
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Kota Asal</div>
                      <div className={styles.infoValue}>{profileData.city}</div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Nomor Telepon</div>
                      <div className={styles.infoValue}>
                        {profileData.phone}
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Shield size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Status</div>
                      <div className={styles.infoValue}>
                        {profileData.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Info */}
                <div className={styles.privacySection}>
                  <h3 className={styles.privacyTitle}>Pengaturan Privasi</h3>
                  <p className={styles.privacyText}>
                    Dengan menampilkan data, pemilik properti dapat memberimu
                    respons yang lebih lancar. Data hanya digunakan di platform
                    KawanKost.
                  </p>

                  <div className={styles.privacyInfo}>
                    <div className={styles.privacyItem}>
                      <h4>Informasi Umum (Data wajib)</h4>
                      <p>
                        Nama, status perkawinan, jenis kelamin, pekerjaan, lama
                        bergabung, keaktifan akun.
                      </p>
                    </div>

                    <div className={styles.privacyItem}>
                      <h4>Informasi Data Diri</h4>
                      <p>
                        Berisi informasi tambahan seperti asal daerah dan nomor
                        HP yang dienkripsi.
                      </p>
                    </div>

                    <div className={styles.privacyItem}>
                      <h4>Riwayat Aktivitas</h4>
                      <p>
                        Riwayat jumlah chat, jumlah pembayaran, rentang tanggal
                        kos, serta lama sewa.
                      </p>
                    </div>

                    <div className={styles.privacyItem}>
                      <h4>Riwayat Pencarian Kos</h4>
                      <p>
                        Riwayat jenis kos, rentang harga dan fasilitas yang
                        dicari dan kata kunci.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className={styles.helpSection}>
                  <h3 className={styles.helpTitle}>Butuh Bantuan?</h3>
                  <p className={styles.helpText}>cs@kawankost.com</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
