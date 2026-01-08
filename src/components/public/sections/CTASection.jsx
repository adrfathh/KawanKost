import { Phone } from 'lucide-react';
import styles from './CTASection.module.css';
import { Link } from "react-router-dom";
import { Button } from '../../ui/button';

const CTASection = () => {
  const handleCheckout = () => {
      const message = `Halo, saya ingin bertanya mengenai hal berikut:

      ...?`;

      window.open(
          `https://wa.me/6281617814578?text=${encodeURIComponent(message)}`,
          "_blank"
      );
  };

  return (
    <div className={styles.cta}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={styles.ctaTitle}>Siap Mencari Kost Impian?</h2>
        <p className={styles.ctaSubtitle}>Bergabung dengan ribuan mahasiswa yang telah menemukan tempat tinggal nyaman melalui KawanKost
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kostCollection" className={`${styles.button} ${styles.buttonWhite}`}>Mulai Pencarian</Link>
          <Button onClick={handleCheckout} className={`${styles.button} ${styles.buttonOutlineWhite}`}><Phone className="inline mr-2" size={20} />Hubungi Kami</Button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
