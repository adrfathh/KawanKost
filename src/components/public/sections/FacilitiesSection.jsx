import { useState } from 'react';
import { dummyFacilities } from '../../../data/dummyFacilities';
import styles from './FacilitiesSection.module.css';

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState(dummyFacilities);

  return (
    <div className="py-12" style={{ backgroundColor: '#f8f8f8' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Fasilitas <span className={styles.textPrimary}>Unggulan</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;

            return (
              <div key={index} className={styles.facilityCard}>
                <div className={styles.facilityIcon}>
                  <Icon size={24}/>
                </div>
                <p className={styles.facilityName}>{facility.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;
