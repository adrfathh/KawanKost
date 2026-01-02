import { useState } from 'react';
import { Heart, MapPin, Star, X } from 'lucide-react';
import styles from './Favorites.module.css';
import { dummyKostList } from '../../../data/dummyKost';
import KostCard from '../cards/KostCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState(dummyKostList.slice(0, 2));
  const [recentViewed, setRecentViewed] = useState(dummyKostList.slice(2));

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((kost) => kost.id !== id));
  };

  const addToFavorites = (kost) => {
    if (!favorites.find((f) => f.id === kost.id)) {
      setFavorites([...favorites, kost]);
    }
  };

  const removeRecent = (id) => {
    setRecentViewed(recentViewed.filter((kost) => kost.id !== id));
  };

  return (
    <div className={styles.favoritesPage}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={styles.title}>Favorit & Riwayat</h1>

        {/* Difavoritkan Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Heart size={20} className="mr-2" />
            Difavoritkan
          </h2>

          {favorites.length === 0 ? (
            <div className={styles.emptyState}>
              <Heart size={48} className={styles.emptyIcon} />
              <p>Belum ada kost yang difavoritkan</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {favorites.map((kost) => (
                <div key={kost.id} className={styles.favoriteCard}>
                  <div className={styles.favoriteImage}>
                    <img src={kost.image} alt={kost.name} />
                    <button
                      className={styles.removeButton}
                      onClick={() => removeFavorite(kost.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className={styles.favoriteContent}>
                    <div className={styles.favoriteHeader}>
                      <h3 className={styles.kostName}>{kost.name}</h3>
                      <span className={styles.typeBadge}>{kost.type}</span>
                    </div>

                    <div className={styles.location}>
                      <MapPin size={14} />
                      <span>{kost.address.substring(0, 40)}...</span>
                    </div>

                    <div className={styles.facilities}>
                      {kost.facilities.slice(0, 3).map((facility, index) => (
                        <span key={index} className={styles.facility}>
                          {facility}
                        </span>
                      ))}
                    </div>

                    <div className={styles.footer}>
                      <div className={styles.rating}>
                        <Star size={14} className={styles.starIcon} />
                        <span>{kost.rating}</span>
                      </div>
                      <span className={styles.price}>{kost.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Permah Dilihat Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Permah Dilibat</h2>

          {recentViewed.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Belum ada riwayat penelusuran</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {recentViewed.map((kost) => (
                <div key={kost.id} className={styles.recentCard}>
                  <div className={styles.recentImage}>
                    <img src={kost.image} alt={kost.name} />
                    <button
                      className={styles.favoriteButton}
                      onClick={() => addToFavorites(kost)}
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      className={styles.removeRecentButton}
                      onClick={() => removeRecent(kost.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className={styles.recentContent}>
                    <div className={styles.recentHeader}>
                      <h3 className={styles.kostName}>{kost.name}</h3>
                      <span className={styles.typeBadge}>{kost.type}</span>
                    </div>

                    <div className={styles.location}>
                      <MapPin size={14} />
                      <span>{kost.address.substring(0, 35)}...</span>
                    </div>

                    <div className={styles.footer}>
                      <div className={styles.meta}>
                        <span className={styles.viewCount}>
                          Dilihat 112 kali
                        </span>
                        <span className={styles.availability}>
                          {kost.isAvailable ? 'Tersedia' : 'Penuh'}
                        </span>
                      </div>
                      <span className={styles.price}>{kost.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Chat Floating Button */}
        <button className={styles.chatFloatButton}>💬 Chat</button>
      </div>
    </div>
  );
};

export default Favorites;
