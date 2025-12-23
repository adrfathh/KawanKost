import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from '../hooks/useAuth';
import {
  Search,
  Heart,
  MessageCircle,
  User,
  Home as HomeIcon,
  Star,
  Check,
  MapPin,
  Shield,
  Wifi,
  Car,
  Bath,
  Menu,
  X,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  Users,
} from 'lucide-react';
import styles from './home.module.css';

// Import gambar dari folder assets
import kostLvAyu from '../assets/images/kost-lv-ayu.png';
import kostSamara from '../assets/images/kost-samara.png';
import kostPutraKhalifa from '../assets/images/kost-putra-khalifa.png';
import kostMrh from '../assets/images/kost-mrh.png';
import kostVector from '../assets/images/kost-vector.png';
import kawankostIcon from '../assets/icons/kawankost.png';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = getLoggedInUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Beranda', icon: <HomeIcon size={20} />, active: true },
    { name: 'Favorit', icon: <Heart size={20} /> },
    { name: 'Pencarian', icon: <Search size={20} /> },
    { name: 'Chat', icon: <MessageCircle size={20} /> },
    { name: 'Profile', icon: <User size={20} /> },
  ];

  const kostList = [
    {
      id: 1,
      name: 'Kost Eksklusif Ayu',
      type: 'Campur',
      price: 'Rp 1.800.000/bulan',
      facilities: ['Wi-Fi', 'Kamar Mandi Dalam', 'Parkir Luas', 'AC'],
      address:
        'Jl. Dewa Ruci, Bakung, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55196',
      description:
        'Kost nyaman dekat kampus dengan lingkungan yang asri dan aman untuk mahasiswi.',
      image: kostLvAyu,
      rating: 4.8,
      isAvailable: true,
    },
    {
      id: 2,
      name: 'Kost Samara',
      type: 'Putra',
      price: 'Rp 750.000/bulan',
      facilities: ['Wi-Fi', 'Kamar Mandi Luar', 'Parkir', 'Laundry'],
      address:
        'Jl. Monumen Perjuangan, Krobokan, Tamanan, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta',
      description:
        'Kost eksklusif untuk mahasiswa dengan fasilitas lengkap dan akses mudah ke kampus.',
      image: kostSamara,
      rating: 4.5,
      isAvailable: true,
    },
    {
      id: 3,
      name: 'Kost Putra Khalifa',
      type: 'Putra',
      price: 'Rp 900.000/bulan',
      facilities: [
        'Wi-Fi Premium',
        'Kamar Mandi Dalam',
        'Parkir Motor & Mobil',
        'AC',
        'TV',
      ],
      address:
        'Gg. Teratai No.20, Glagah Lor, Tamanan, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55191',
      description:
        'Kost premium dengan fasilitas terbaik untuk mahasiswa dan profesional muda.',
      image: kostPutraKhalifa,
      rating: 4.9,
      isAvailable: true,
    },
    {
      id: 4,
      name: 'Kost Eksklusif MRH',
      type: 'Putra',
      price: 'Rp 1.400.000/bulan',
      facilities: [
        'Wi-Fi',
        'Kamar Mandi Dalam',
        'Parkir',
        'Dapur Bersama',
        'Ruang Tamu',
      ],
      address:
        'Jl. Nitikan Baru Gg. Kunti No.3, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55162',
      description:
        'Kost campur dengan area terpisah, cocok untuk mahasiswa dan pekerja.',
      image: kostMrh,
      rating: 4.6,
      isAvailable: false,
    },
  ];

  const features = [
    {
      icon: <Shield size={24} />,
      title: 'Terpercaya',
      description: 'Semua kost telah diverifikasi langsung oleh tim kami',
    },
    {
      icon: <Check size={24} />,
      title: 'Terjamin',
      description: 'Kualitas dan kenyamanan kost dijamin sesuai deskripsi',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Strategis',
      description: 'Lokasi dekat kampus, pusat kota, dan fasilitas umum',
    },
    {
      icon: <Clock size={24} />,
      title: 'Cepat',
      description: 'Proses sewa mudah dan cepat dengan sistem online',
    },
  ];

  const facilities = [
    { name: 'Wi-Fi', icon: <Wifi size={20} /> },
    { name: 'Parkir', icon: <Car size={20} /> },
    { name: 'Kamar Mandi Dalam', icon: <Bath size={20} /> },
    { name: 'AC', icon: <span style={{ fontSize: '18px' }}>❄️</span> },
    { name: 'Laundry', icon: <span style={{ fontSize: '18px' }}>🧺</span> },
    { name: 'Dapur', icon: <span style={{ fontSize: '18px' }}>🍳</span> },
  ];

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            {/* Logo - Menggunakan kawankost.png */}
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
                  onClick={handleLogout}
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
                  onClick={handleLogout}
                  className={`${styles.button} ${styles.buttonWhite} w-full mt-2`}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className={styles.heroTitle}>
                Temukan Kost
                <span className={styles.heroHighlight}> Impianmu</span>
                <br />
                di Yogyakarta
              </h1>
              <p className={styles.heroSubtitle}>
                Ribuan mahasiswa dan pekerja telah menemukan tempat tinggal
                ideal melalui KawanKost. Proses mudah, aman, dan terpercaya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`${styles.button} flex items-center justify-center`}
                >
                  <Search className="mr-2" size={20} />
                  Cari Kost Sekarang
                </button>
                <button
                  className={`${styles.button} ${styles.buttonOutline} flex items-center justify-center`}
                >
                  <Users className="mr-2" size={20} />
                  Konsultasi Gratis
                </button>
              </div>
            </div>
            <div className="lg:w-1/2">
              {/* Menggunakan kost-vector.png sebagai gambar hero */}
              <img
                src={kostVector}
                alt="Ilustrasi Kost"
                className="w-full max-w-xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Mengapa Memilih{' '}
            <span className={styles.textPrimary}>KawanKost</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="py-12" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Fasilitas <span className={styles.textPrimary}>Unggulan</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {facilities.map((facility, index) => (
              <div key={index} className={styles.facilityCard}>
                <div className={styles.facilityIcon}>{facility.icon}</div>
                <p className={styles.facilityName}>{facility.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kost Listings */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Kost <span className={styles.textPrimary}>Rekomendasi</span>
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              Lihat Semua <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kostList.map((kost) => (
              <div key={kost.id} className={styles.kostCard}>
                {/* Image */}
                <div className={styles.kostImageContainer}>
                  <img
                    src={kost.image}
                    alt={kost.name}
                    className={styles.kostImage}
                  />
                  {!kost.isAvailable && (
                    <div className={styles.kostStatus}>Penuh</div>
                  )}
                  <div className={styles.kostRating}>
                    <Star size={14} className="mr-1 fill-white" />
                    {kost.rating}
                  </div>
                  <div
                    className={`${styles.kostType} ${
                      kost.type === 'Putri'
                        ? styles.typePutri
                        : kost.type === 'Putra'
                        ? styles.typePutra
                        : styles.typeCampur
                    }`}
                  >
                    {kost.type}
                  </div>
                </div>

                {/* Content */}
                <div className={styles.kostContent}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={styles.kostName}>{kost.name}</h3>
                    <span className={styles.kostPrice}>{kost.price}</span>
                  </div>

                  <div className={`${styles.kostAddress} mb-3`}>
                    <MapPin size={16} className="mr-1" />
                    <p className="text-sm">{kost.address}</p>
                  </div>

                  <p className={styles.kostDescription}>{kost.description}</p>

                  {/* Facilities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {kost.facilities.slice(0, 3).map((facility, index) => (
                      <span key={index} className={styles.facilityTag}>
                        {facility}
                      </span>
                    ))}
                    {kost.facilities.length > 3 && (
                      <span className="text-gray-500 text-xs">
                        +{kost.facilities.length - 3} lagi
                      </span>
                    )}
                  </div>

                  <button
                    className={`w-full ${styles.button} ${
                      !kost.isAvailable && styles.buttonDisabled
                    }`}
                    disabled={!kost.isAvailable}
                  >
                    {kost.isAvailable ? 'Lihat Detail' : 'Tidak Tersedia'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.cta}>
        <div className="container mx-auto px-4 text-center">
          <h2 className={styles.ctaTitle}>Siap Mencari Kost Impian?</h2>
          <p className={styles.ctaSubtitle}>
            Bergabung dengan ribuan mahasiswa yang telah menemukan tempat
            tinggal nyaman melalui KawanKost
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`${styles.button} ${styles.buttonWhite}`}>
              Mulai Pencarian
            </button>
            <button className={`${styles.button} ${styles.buttonOutlineWhite}`}>
              <Phone className="inline mr-2" size={20} />
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            {/* Company Info */}
            <div className="lg:w-1/3">
              <div className={styles.footerLogoContainer}>
                <img
                  src={kawankostIcon}
                  alt="KawanKost"
                  className={styles.footerLogo}
                />
                <div>
                  <h3 className={styles.footerTitle}>KawanKost</h3>
                  <p className={styles.footerSubtitle}>
                    Temukan Kost Terbaik di Yogyakarta
                  </p>
                </div>
              </div>
              <p className={styles.footerDescription}>
                Platform pencarian kost terpercaya untuk mahasiswa dan pekerja
                di Yogyakarta. Proses mudah, aman, dan transparan.
              </p>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white">
                  <Phone size={20} />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Mail size={20} />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className={styles.userInfoCard}>
              <h4 className={styles.userInfoTitle}>Akun Anda</h4>
              <div className="space-y-3">
                <div className={styles.userInfoRow}>
                  <span className={styles.userInfoLabel}>Nama:</span>
                  <span className={styles.userInfoValue}>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className={styles.userInfoRow}>
                  <span className={styles.userInfoLabel}>Email:</span>
                  <span className={styles.userInfoValue}>
                    {user.email || 'user@example.com'}
                  </span>
                </div>
                <div className={styles.userInfoRow}>
                  <span className={styles.userInfoLabel}>Role:</span>
                  <span className={styles.userInfoValue}>
                    {user.role || 'Pengguna'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`${styles.button} w-full mt-4`}
                >
                  Keluar Akun
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 KawanKost. Semua hak dilindungi.</p>
            <p className="text-sm mt-2">
              Platform pencarian kost terbaik di Yogyakarta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
