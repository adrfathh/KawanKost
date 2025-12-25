import { ChevronRight } from 'lucide-react';
import { kostList } from '../../../data/dummyKost';
import styles from './KostListings.module.css';
import KostCard from '../cards/KostCard';

const KostListings = () => {
  return (
    <div className="py-10 bg-white">
      <div className="container flex flex-col gap-8 mx-auto px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Kost <span className={styles.textPrimary}>Rekomendasi</span></h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">Lihat Semua <ChevronRight size={20} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kostList.map((kost) => (
            <KostCard key={kost.id} kost={kost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KostListings;
