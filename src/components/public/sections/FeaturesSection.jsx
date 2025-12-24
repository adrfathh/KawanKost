import { Shield, Check, MapPin, Clock } from 'lucide-react';
import styles from './FeaturesSection.module.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield size={24} />,
      title: 'Terpercaya',
      description: 'Semua kost telah diverifikasi langsung oleh tim kami',
    },
    {
      icon: <Check size={24} />,
      title: 'Terjamin',
      description: 'Kualitas dan kenyamanan kost dijamin sesuai deskripsi',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Strategis',
      description: 'Lokasi dekat kampus, pusat kota, dan fasilitas umum',
    },
    {
      icon: <Clock size={24} />,
      title: 'Cepat',
      description: 'Proses sewa mudah dan cepat dengan sistem online',
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Mengapa Memilih <span className={styles.textPrimary}>KawanKost</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
