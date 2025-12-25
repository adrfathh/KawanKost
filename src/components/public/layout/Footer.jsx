import { Phone, Mail, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';
import kawankostIcon from '../../../assets/icons/kawankost.png';

const Footer = ({ user, onLogout }) => {
  return (
    <footer className={styles.footer}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Company Info */}
          <div className="lg:w-1/3">
            <div className={styles.footerLogoContainer}>
              <div>
                <h3 className={styles.footerTitle}>KawanKost</h3>
                <p className={styles.footerSubtitle}>Temukan Kost Terbaik di Yogyakarta</p>
              </div>
            </div>
            <p className={styles.footerDescription}>Platform pencarian kost terpercaya untuk mahasiswa dan pekerja di Yogyakarta. Proses mudah, aman, dan transparan.</p>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white">
                <Phone size={20} />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Mail size={20} />
              </button>
              <button className="text-gray-400 hover:text-white">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className={styles.userInfoCard}>
            <h4 className={styles.userInfoTitle}>Akun Anda</h4>
            {user ?(
              <div className="space-y-3">
                <div className={styles.userInfoRow}>
                  <span className={styles.userInfoLabel}>Nama:</span>
                  <span className={styles.userInfoValue}>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className={styles.userInfoRow}>
                  <span className={styles.userInfoLabel}>Email:</span>
                  <span className={styles.userInfoValue}>
                    {user.email || 'user@example.com'}
                  </span>
                </div>
                <div className={styles.userInfoRow}>
                  <span className={styles.userInfoLabel}>Role:</span>
                  <span className={styles.userInfoValue}>
                    {user.role || 'Pengguna'}
                  </span>
                </div>
                <button onClick={onLogout} className={`${styles.button} w-full mt-4`}>
                  Keluar Akun
                </button>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">Silakan login untuk melihat informasi akun.</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 py-3 text-center text-gray-400">
          <p>© 2025 KawanKost. Semua hak dilindungi.</p>
          <p className="text-sm mt-2">Platform pencarian kost terbaik di Yogyakarta</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
