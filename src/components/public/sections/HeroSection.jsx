import { Search, Users } from 'lucide-react';
import styles from './HeroSection.module.css';
import kostVector from '../../../assets/images/kost-vector.png';

const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className={styles.heroTitle}>
              Temukan Kost
              <span className={styles.heroHighlight}> Impianmu</span>
              <br />
              di Yogyakarta
            </h1>
            <p className={styles.heroSubtitle}>
              Ribuan mahasiswa dan pekerja telah menemukan tempat tinggal ideal
              melalui KawanKost. Proses mudah, aman, dan terpercaya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className={`${styles.button} flex items-center justify-center`}
              >
                <Search className="mr-2" size={20} />
                Cari Kost Sekarang
              </button>
              <button
                className={`${styles.button} ${styles.buttonOutline} flex items-center justify-center`}
              >
                <Users className="mr-2" size={20} />
                Konsultasi Gratis
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src={kostVector}
              alt="Ilustrasi Kost"
              className="w-full max-w-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
