import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from '../../../hooks/useAuth';
import { User, Calendar, Phone, Mail, MapPin, Shield, Clock, CreditCard, History, Settings, ChevronRight, CheckCircle } from 'lucide-react';
import styles from './Profile.module.css';
import Navbar from '../layout/NavigationBar.jsx';

const ProfilePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const user = getLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `https://6957da9df7ea690182d34812.mockapi.io/users/${user.id}`
      );
      const data = await res.json();

      setProfileData({
        fullName: `${data.firstName} ${data.lastName}`.trim(),
        gender: data.gender,
        birthDate: data.birthDate,
        phone: data.phone,
        city: data.city,
      });

      localStorage.setItem('loggedInUser', JSON.stringify(data));
    };

    fetchUser();
  }, []);


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const requiredFields = [
    'fullName',
    'gender',
    'birthDate',
    'phone',
    'city'
  ];

  const isProfileComplete = (profile) => {
    return requiredFields.every(
      (key) => profile[key] && profile[key].toString().trim() !== ''
    );
  };

  const [profileData, setProfileData] = useState({
    fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    gender: user?.gender || '',
    birthDate: user?.birthDate || '',
    phone: user?.phone || '',
    city: user?.city || ''
  });

  const filledCount = requiredFields.filter(
    (key) => profileData[key]
  ).length;

  const profileCompletePercent = Math.round(
    (filledCount / requiredFields.length) * 100
  );


  const profileCompleted = isProfileComplete(profileData);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = {
        ...user,
        firstName: profileData.fullName.split(' ')[0] || '',
        lastName: profileData.fullName.split(' ').slice(1).join(' ') || '',
        gender: profileData.gender,
        birthDate: profileData.birthDate,
        phone: profileData.phone,
        city: profileData.city,
      };

      const response = await fetch(
        `https://6957da9df7ea690182d34812.mockapi.io/users/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error('Gagal update profil');
      }

      const result = await response.json();

      // update state lokal
      setProfileData({
        fullName: `${result.firstName} ${result.lastName}`.trim(),
        gender: result.gender,
        birthDate: result.birthDate,
        phone: result.phone,
        city: result.city,
      });

      // update localStorage user login
      localStorage.setItem('loggedInUser', JSON.stringify(result));

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan perubahan profil');
    }
  };


  return (
    <div className={styles.profilePage}>
      <Navbar user={user} onLogout={handleLogout} navigate={navigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onChatOpen={handleChatOpen} />
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
                  <div className={styles.completionFill} style={{ width: `${profileCompletePercent}%` }} />
                  <span>{profileCompletePercent}% data profil lengkap</span>
                </div>
                <span className={styles.completionText}>
                  {profileCompleted}% data profil lengkap
                </span>
              </div>
              <p className={styles.completionHint}>Profil yang lengkap bisa memberikan rekomendasi yang lebih akurat</p>
            </div>
          </div>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.sidebar}>
            {/* Kos Saya Section */}
            <div className={styles.myKost}>
              <h3 className={styles.myKostTitle}>Kos Saya</h3>
              <div className={styles.kostEmptyState}>
                <p className={styles.kostEmptyText}>Kamu belum menyewa kos</p>
                <p className={styles.kostEmptySubtext}>Yuk, sewa di KawanKost atau masukkan kode dari pemilik kos untuk mengaktifkan halaman ini!</p>
                <Link to="/search" className={styles.findKostButton}>Cari dan Sewa Kost</Link>
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
              <p className={styles.contentSubtitle}>Lengkapi data diri Anda untuk mendapatkan pengalaman terbaik</p>
              {!isEditing && (
                <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                  {profileCompleted ? 'Edit Profil' : 'Lengkapi Data Diri'}
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className={styles.profileForm}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName">Nama Lengkap</label>
                    <input type="text" id="fullName" value={profileData.fullName} onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value, })} className={styles.formInput}/>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Jenis Kelamin</label>
                    <div className={styles.radioGroup}>
                      <div className={styles.radioLabel}>
                        <input type="radio" name="gender" value="Laki-laki" checked={profileData.gender === 'Laki-laki'} onChange={(e) => setProfileData({...profileData, gender: e.target.value, })} />
                        <span>Laki-laki</span>
                      </div>
                      <div className={styles.radioLabel}>
                        <input type="radio" name="gender" value="Perempuan" checked={profileData.gender === 'Perempuan'} onChange={(e) => setProfileData({ ...profileData, gender: e.target.value, })}/>
                        <span>Perempuan</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="birthDate">Tanggal Lahir</label>
                    <input type="date" id="birthDate" value={profileData.birthDate} onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value, })} className={styles.formInput}/>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="city">Kota Asal</label>
                    <input type="text" id="city" value={profileData.city} onChange={(e) => setProfileData({ ...profileData, city: e.target.value })} className={styles.formInput} />
                  </div>
                </div>

                {/* Contact Info */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Kontak Darurat</h3>
                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContact">Nomor Kontak Darurat</label>
                    <input type="tel" id="phone" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value,})} className={styles.formInput} placeholder="+62 xxx xxxx xxxx" />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelButton} onClick={() => setIsEditing(false)}>Batal</button>
                  <button type="submit" className={styles.saveButton}>Simpan Perubahan</button>
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
                          {profileData.fullName || (
                            <span className={styles.incomplete}>Belum diisi</span>
                          )}
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
                          {profileData.gender || (
                            <span className={styles.incomplete}>Belum diisi</span>
                          )}
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
                          {profileData.birthDate || (
                            <span className={styles.incomplete}>Belum diisi</span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Kota Asal</div>
                      <div className={styles.infoValue}>
                          {profileData.city || (
                            <span className={styles.incomplete}>Belum diisi</span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Nomor Telepon</div>
                      <div className={styles.infoValue}>
                          {profileData.phone || (
                            <span className={styles.incomplete}>Belum diisi</span>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Info */}
                <div className={styles.privacySection}>
                  <h3 className={styles.privacyTitle}>Pengaturan Privasi</h3>
                  <p className={styles.privacyText}>Dengan menampilkan data, pemilik properti dapat memberimu respons yang lebih lancar. Data hanya digunakan di platform KawanKost.</p>

                  <div className={styles.privacyInfo}>
                    <div className={styles.privacyItem}>
                      <h4>Informasi Umum (Data wajib)</h4>
                      <p>Nama, status perkawinan, jenis kelamin, pekerjaan, lama bergabung, keaktifan akun.</p>
                    </div>

                    <div className={styles.privacyItem}>
                      <h4>Informasi Data Diri</h4>
                      <p>Berisi informasi tambahan seperti asal daerah dan nomor HP yang dienkripsi.</p>
                    </div>

                    <div className={styles.privacyItem}>
                      <h4>Riwayat Aktivitas</h4>
                      <p>Riwayat jumlah chat, jumlah pembayaran, rentang tanggal kos, serta lama sewa.</p>
                    </div>

                    <div className={styles.privacyItem}>
                      <h4>Riwayat Pencarian Kos</h4>
                      <p>Riwayat jenis kos, rentang harga dan fasilitas yang dicari dan kata kunci.</p>
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
