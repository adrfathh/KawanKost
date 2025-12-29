import { HomeIcon, Heart, Search, MessageCircle, User, Menu, X, MessageCircleMore } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './NavigationBar.module.css';
import kawankostIcon from '../../../assets/icons/kawankost.png';

const NavigationBar = ({ user, onLogout, navigate, isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Beranda', path: "/", icon: <HomeIcon size={20} />, active: true },
    { name: 'Favorit', path: "/favorites", icon: <Heart size={20} /> },
    { name: 'Pencarian', path: "/search", icon: <Search size={20} /> },
    { name: 'Chat', path: "/chat", icon: <MessageCircle size={20} /> },
    { name: 'Profile', path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <div>
              <h1 className={styles.logoText}>KawanKost</h1>
              <p className={styles.logoSubtext}>Temukan Kost Terbaik di Yogyakarta</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button key={item.name} onClick={() => navigate(item.path)} className={styles.menuItem}>
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm">Halo, {user.firstName}!</span>
                <button onClick={onLogout} className={`${styles.button} ${styles.buttonWhite}`}>
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => navigate("/login")} className={styles.button}>
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className={`${styles.mobileMenuButton} md:hidden`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`${styles.mobileMenu} md:hidden space-y-2`}>
            {menuItems.map((item) => (
              <button key={item.name} onClick={() => navigate(item.path)} className={`${styles.mobileMenuItem} ${location.pathname === item.path ? styles.menuItemActive : ""}`}>
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}

            {/* LOGIN / LOGOUT SECTION */}
            <div className={`${styles.mobileMenuDivider} pt-4`}>
              {user ? (
                <>
                  <p className="px-4 py-2 text-sm">
                    Login sebagai: {user.firstName} {user.lastName}
                  </p>
                  <button onClick={onLogout} className={`${styles.button} ${styles.buttonWhite} w-full mt-2`}>
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={() => navigate("/login")} className={`${styles.button} w-full`}>Login</button>
              )}
            </div>
          </div>
        )}

      </div>
      <div className={styles.messageWrapper}>
        <MessageCircleMore size={30} className={styles.messageCircle} />
      </div>
    </nav>
  );
};

export default NavigationBar;
