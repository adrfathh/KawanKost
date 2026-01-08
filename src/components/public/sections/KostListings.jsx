import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './KostListings.module.css';
import KostCard from '../cards/KostCard';
import { Skeleton } from "@/components/ui/skeleton";

const KostListings = () => {
  const [kostList, setKost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://6957da9df7ea690182d34812.mockapi.io/KostList")
      .then((res) => res.json())
      .then((data) => {
        setKost(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // Skeleton Component

  const SkeletonCard = () => (
    <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-10 bg-white">
      <div className="container flex flex-col gap-8 mx-auto px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Kost <span className={styles.textPrimary}>Rekomendasi</span></h2>
          <Link to="/kostCollection" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            Lihat Semua <ChevronRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            // Show actual kost cards when data is loaded
            kostList.map((kost) => (
              <KostCard key={kost.id} kost={kost} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KostListings;