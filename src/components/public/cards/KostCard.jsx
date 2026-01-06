import { Link } from 'react-router-dom';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { useState } from 'react';
import styles from './KostCard.module.css';

const KostCard = ({ kost, viewMode = 'full' }) => {
  const [showMore, setShowMore] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mode compact untuk tampilan terbatas
  const isCompact = viewMode === 'compact';
  
  return (
    <Card 
      className={`${styles.kostCard} ${isCompact ? styles.compact : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className={styles.kostImageContainer}>
        <img 
          src={kost.image} 
          alt={kost.name} 
          className={styles.kostImage}
          loading="lazy"
        />
        
        {!kost.isAvailable && (
          <div className={styles.kostStatus}>Penuh</div>
        )}
        
        <div className={styles.kostRating}>
          <Badge variant="secondary" className={styles.ratingBadge}>
            <Star size={14} className={styles.starIcon} />
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
      <div className={`${styles.kostContent} ${isCompact ? styles.compactContent : ''}`}>
        {/* Scrollable Container untuk compact mode */}
        {isCompact ? (
          <div className={styles.scrollableContent}>
            <div className={styles.contentWrapper}>
              {/* Title and Price */}
              <div className={styles.titleContainer}>
                <CardTitle className={styles.kostName} title={kost.name}>
                  {kost.name}
                </CardTitle>
                <span className={styles.kostPrice}>
                  Rp {Number(kost.price).toLocaleString("id-ID")}/bulan
                </span>
              </div>

              {/* Address */}
              <div className={styles.kostAddress}>
                <CardDescription className={styles.addressText}>
                  {kost.address}
                </CardDescription>
              </div>

              {/* Description - truncated */}
              {kost.description && (
                <CardDescription className={styles.kostDescription}>
                  {showMore 
                    ? kost.description 
                    : `${kost.description.substring(0, 80)}...`}
                  <button 
                    className={styles.showMoreButton}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? (
                      <>
                        <ChevronUp size={12} />
                        Tampilkan lebih sedikit
                      </>
                    ) : (
                      <>
                        <ChevronDown size={12} />
                        Tampilkan lebih banyak
                      </>
                    )}
                  </button>
                </CardDescription>
              )}

              {/* Facilities - scrollable untuk compact mode */}
              {kost.facilities && kost.facilities.length > 0 && (
                <div className={styles.facilitiesScrollContainer}>
                  <div className={styles.facilitiesScrollContent}>
                    {kost.facilities.map((facility, index) => (
                      <span key={index} className={styles.facilityTag}>
                        {facility}
                      </span>
                    ))}
                  </div>
                  {isHovered && (
                    <div className={styles.scrollHint}>
                      <ChevronRight size={14} />
                    </div>
                  )}
                </div>
              )}

              {/* Quick Info */}
              <div className={styles.quickInfo}>
                <span className={styles.infoItem}>
                  <strong>Luas:</strong> {kost.size || '20m²'}
                </span>
                <span className={styles.infoItem}>
                  <strong>Lokasi:</strong> {kost.distance || 'Pusat Kota'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Full Content untuk normal mode */
          <div className={styles.contentWrapper}>
            {/* Title and Price */}
            <div className={styles.titleContainer}>
              <CardTitle className={styles.kostName} title={kost.name}>
                {kost.name}
              </CardTitle>
              <span className={styles.kostPrice}>
                Rp {Number(kost.price).toLocaleString("id-ID")}/bulan
              </span>
            </div>

            {/* Address */}
            <div className={styles.kostAddress}>
              <CardDescription className={styles.addressText}>
                {kost.address}
              </CardDescription>
            </div>

            {/* Description */}
            {kost.description && (
              <CardDescription className={styles.kostDescription}>
                {kost.description.length > 120 
                  ? `${kost.description.substring(0, 120)}...` 
                  : kost.description}
              </CardDescription>
            )}

            {/* Facilities */}
            {kost.facilities && kost.facilities.length > 0 && (
              <div className={styles.facilitiesContainer}>
                {kost.facilities.slice(0, 4).map((facility, index) => (
                  <span key={index} className={styles.facilityTag}>
                    {facility}
                  </span>
                ))}
                {kost.facilities.length > 4 && (
                  <span className={styles.moreFacilities}>
                    + {kost.facilities.length - 4} lagi
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className={styles.buttonContainer}>
          <Link 
            to={`/detail-produk/${kost.id}`} 
            className={styles.buttonLink}
          >
            <Button 
              className={`${styles.button} ${!kost.isAvailable && styles.buttonDisabled}`} 
              disabled={!kost.isAvailable}
              aria-label={kost.isAvailable ? `Lihat detail ${kost.name}` : 'Kost tidak tersedia'}
              size={isCompact ? "sm" : "default"}
            >
              {kost.isAvailable ? 'Lihat Detail' : 'Tidak Tersedia'}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

// Pastikan ChevronRight di-import
import { ChevronRight } from 'lucide-react';

export default KostCard;