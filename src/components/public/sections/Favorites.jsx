import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Star, X } from 'lucide-react';
import { getLoggedInUser, logout } from '../../../hooks/useAuth';
import styles from './Favorites.module.css';
import Navbar from '../layout/NavigationBar.jsx';
import ChatSidebarUser from '../layout/ChatSidebarUser';

const USER_API = "https://6957da9df7ea690182d34812.mockapi.io/users";
const KOST_API = "https://6957da9df7ea690182d34812.mockapi.io/KostList";

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteKosts, setFavoriteKosts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const user = getLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    fetch(`${USER_API}/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setFavoriteIds(data.favorite || []);
      });
  }, [user]);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setFavoriteKosts([]);
      return;
    }

    Promise.all(
      favoriteIds.map(id =>
        fetch(`${KOST_API}/${id}`).then(res => res.json())
      )
    ).then(setFavoriteKosts);
  }, [favoriteIds]);

  const toggleFavorite = async (kostId) => {
    let updated;

    if (favoriteIds.includes(kostId)) {
      updated = favoriteIds.filter(id => id !== kostId);
    } else {
      updated = [...favoriteIds, kostId];
    }

    setFavoriteIds(updated);

    await fetch(`${USER_API}/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite: updated }),
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.favoritesPage}>
      <Navbar
        user={user}
        onLogout={handleLogout}
        navigate={navigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChatOpen={() => setIsChatOpen(true)}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className={styles.title}>Favorit</h1>

        {favoriteKosts.length === 0 ? (
          <div className={styles.emptyState}>
            <Heart size={48} />
            <p>Belum ada kost yang difavoritkan</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {favoriteKosts.map((kost) => (
              <div key={kost.id} className={styles.favoriteCard}>
                <div className={styles.favoriteImage}>
                  <img src={kost.image} alt={kost.name} />
                  <button
                    className={styles.removeButton}
                    onClick={() => toggleFavorite(kost.id)}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className={styles.favoriteContent}>
                  <h3 className={styles.kostName}>{kost.name}</h3>

                  <div className={styles.location}>
                    <MapPin size={14} />
                    <span>{kost.address}</span>
                  </div>

                  <div className={styles.footer}>
                    <div className={styles.rating}>
                      <Star size={14} />
                      <span>{kost.rating}</span>
                    </div>
                    <span className={styles.price}>{kost.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ChatSidebarUser
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default Favorites;
