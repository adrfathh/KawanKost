import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import styles from './KostCard.module.css';

const KostCard = ({ kost }) => {
  return (
    <Card className={styles.kostCard}>
      {/* <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div> */}
      {/* Image */}
      <div className={styles.kostImageContainer}>
        <img src={kost.image} alt={kost.name} className={styles.kostImage} />
        {!kost.isAvailable && <div className={styles.kostStatus}>Penuh</div>}
        <div className={styles.kostRating}>
          <Badge variant="secondary" className="bg-[#61ADAD] text-white">
            <Star size={14} className="mr-1 fill-white" />
            {kost.rating}
          </Badge>
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
            <CardTitle className={styles.kostName}>{kost.name}</CardTitle>
            <span className={styles.kostPrice}>{kost.price}</span>
          </div>

          <div className={`${styles.kostAddress}`}>
            <CardDescription className="text-sm">{kost.address}</CardDescription>
          </div>

          <CardDescription className={styles.kostDescription}>{kost.description}</CardDescription>

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

        <Link to={`/detail-produk/${kost.id}`}>
          <Button className={`w-full ${styles.button} ${!kost.isAvailable && styles.buttonDisabled}`} disabled={!kost.isAvailable}>
            {kost.isAvailable ? 'Lihat Detail' : 'Tidak Tersedia'}
          </Button>
        </Link>

        {/* <Button className={`w-full ${styles.button} ${ !kost.isAvailable && styles.buttonDisabled }`} disabled={!kost.isAvailable}>
          {kost.isAvailable ? 'Lihat Detail' : 'Tidak Tersedia'}
        </Button> */}
      </div>
    </Card>
  );
};

export default KostCard;
