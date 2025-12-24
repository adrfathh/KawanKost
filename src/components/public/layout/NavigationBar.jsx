import {
  HomeIcon,
  Heart,
  Search,
  MessageCircle,
  User,
  Menu,
  X,
} from 'lucide-react';
import styles from './NavigationBar.module.css';
import kawankostIcon from '../../../assets/icons/kawankost.png';

const NavigationBar = ({ user, onLogout, isMenuOpen, setIsMenuOpen }) => {
  const menuItems = [
    { name: 'Beranda', icon: <HomeIcon size={20} />, active: true },
    { name: 'Favorit', icon: <Heart size={20} /> },
    { name: 'Pencarian', icon: <Search size={20} /> },
    { name: 'Chat', icon: <MessageCircle size={20} /> },
    { name: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img
              src={kawankostIcon}
              alt="KawanKost"
              className={styles.logoImage}
            />
            <div>
              <h1 className={styles.logoText}>KawanKost</h1>
              <p className={styles.logoSubtext}>
                Temukan Kost Terbaik di Yogyakarta
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`${styles.menuItem} ${
                  item.active ? styles.menuItemActive : ''
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
            <div className="flex items-center space-x-3">
              <span className="text-sm">Halo, {user.firstName}!</span>
              <button
                onClick={onLogout}
                className={`${styles.button} ${styles.buttonWhite}`}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.mobileMenuButton} md:hidden`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`${styles.mobileMenu} md:hidden space-y-2`}>
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`${styles.mobileMenuItem} ${
                  item.active ? styles.menuItemActive : ''
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
            <div className={`${styles.mobileMenuDivider} pt-4`}>
              <p className="px-4 py-2 text-sm">
                Login sebagai: {user.firstName} {user.lastName}
              </p>
              <button
                onClick={onLogout}
                className={`${styles.button} ${styles.buttonWhite} w-full mt-2`}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
