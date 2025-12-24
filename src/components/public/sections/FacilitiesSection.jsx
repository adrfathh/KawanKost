import { Wifi, Car, Bath } from 'lucide-react';
import styles from './FacilitiesSection.module.css';

const FacilitiesSection = () => {
  const facilities = [
    { name: 'Wi-Fi', icon: <Wifi size={20} /> },
    { name: 'Parkir', icon: <Car size={20} /> },
    { name: 'Kamar Mandi Dalam', icon: <Bath size={20} /> },
    { name: 'AC', icon: <span style={{ fontSize: '18px' }}>❄️</span> },
    { name: 'Laundry', icon: <span style={{ fontSize: '18px' }}>🧺</span> },
    { name: 'Dapur', icon: <span style={{ fontSize: '18px' }}>🍳</span> },
  ];

  return (
    <div className="py-12" style={{ backgroundColor: '#f8f8f8' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Fasilitas <span className={styles.textPrimary}>Unggulan</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facilities.map((facility, index) => (
            <div key={index} className={styles.facilityCard}>
              <div className={styles.facilityIcon}>{facility.icon}</div>
              <p className={styles.facilityName}>{facility.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;
