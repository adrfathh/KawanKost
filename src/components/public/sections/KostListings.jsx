import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { dummyKostList } from '../../../data/dummyKost';
import styles from './KostListings.module.css';
import KostCard from '../cards/KostCard';

const KostListings = () => {
  useEffect(() => {
    fetch("https://6957da9df7ea690182d34812.mockapi.io/KostList")
    .then((res) => res.json())
    .then((data) => setKost(data));
  }, []);
  const [kostList, setKost] = useState([]);
  
  return (
    <div className="py-10 bg-white">
      <div className="container flex flex-col gap-8 mx-auto px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Kost <span className={styles.textPrimary}>Rekomendasi</span></h2>
          <Link to="/kostCollection" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">Lihat Semua <ChevronRight size={20} /></Link>
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
