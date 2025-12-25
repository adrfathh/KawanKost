import { Star, MapPin } from 'lucide-react';
import styles from './KostCard.module.css';

const KostCard = ({ kost }) => {
  return (
    <div className={styles.kostCard}>
      {/* Image */}
      <div className={styles.kostImageContainer}>
        <img src={kost.image} alt={kost.name} className={styles.kostImage} />
        {!kost.isAvailable && <div className={styles.kostStatus}>Penuh</div>}
        <div className={styles.kostRating}>
          <Star size={14} className="mr-1 fill-white" />
          {kost.rating}
        </div>
        <div className={`${styles.kostType} ${
          kost.type === 'Putri'
          ? styles.typePutri
          : kost.type === 'Putra'
          ? styles.typePutra
          : styles.typeCampur
          }`}>
          {kost.type}
        </div>
      </div>

      {/* Content */}
      <div className={styles.kostContent}>
        <div className={styles.contentWrapper}>
          <div className="flex justify-between items-center">
            <h3 className={styles.kostName}>{kost.name}</h3>
            <span className={styles.kostPrice}>{kost.price}</span>
          </div>

          <div className={`${styles.kostAddress}`}>
            <p className="text-sm">{kost.address}</p>
          </div>

          <p className={styles.kostDescription}>{kost.description}</p>

          {/* Facilities */}
          <div className={styles.facilitiesContainer}>
            {kost.facilities.slice(0, 3).map((facility, index) => (
              <span key={index} className={styles.facilityTag}>{facility}</span>
            ))}
            {kost.facilities.length > 3 && (
              <span className="text-gray-500 text-xs">+ {kost.facilities.length - 3}lagi</span>
            )}
          </div>
        </div>

        <button className={`w-full ${styles.button} ${ !kost.isAvailable && styles.buttonDisabled }`} disabled={!kost.isAvailable}>
          {kost.isAvailable ? 'Lihat Detail' : 'Tidak Tersedia'}
        </button>
      </div>
    </div>
  );
};

export default KostCard;
