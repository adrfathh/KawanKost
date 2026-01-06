import { Link } from "react-router-dom";
import { Search } from 'lucide-react';
import styles from './HeroSection.module.css';
import kostVector from '../../../assets/images/kost-vector.png';

const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Temukan Kost<span className={styles.heroHighlight}> Impianmu</span><br />di Yogyakarta</h1>
            <p className={styles.heroSubtitle}>Ribuan mahasiswa dan pekerja telah menemukan tempat tinggal ideal melalui KawanKost. Proses mudah, aman, dan terpercaya.</p>
            <div className="flex flex-col sm:flex-row">
              <Link to="/kostCollection" className={`${styles.button} flex items-center justify-center`}><Search className="mr-2" size={20} />Cari Kost Sekarang</Link>
            </div>
          </div>
          <img src={kostVector} className="w-full max-w-xl" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
