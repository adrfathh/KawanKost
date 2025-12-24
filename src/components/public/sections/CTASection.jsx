import { Phone } from 'lucide-react';
import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <div className={styles.cta}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={styles.ctaTitle}>Siap Mencari Kost Impian?</h2>
        <p className={styles.ctaSubtitle}>
          Bergabung dengan ribuan mahasiswa yang telah menemukan tempat tinggal
          nyaman melalui KawanKost
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className={`${styles.button} ${styles.buttonWhite}`}>
            Mulai Pencarian
          </button>
          <button className={`${styles.button} ${styles.buttonOutlineWhite}`}>
            <Phone className="inline mr-2" size={20} />
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
