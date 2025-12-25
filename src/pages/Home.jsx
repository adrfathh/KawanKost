import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from '../hooks/useAuth';

// Import komponen
import NavigationBar from '../components/public/layout/NavigationBar';
import HeroSection from '../components/public/sections/HeroSection';
import FeaturesSection from '../components/public/sections/FeaturesSection';
import FacilitiesSection from '../components/public/sections/FacilitiesSection';
import KostListings from '../components/public/sections/KostListings';
import CTASection from '../components/public/sections/CTASection';
import Footer from '../components/public/layout/Footer';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = getLoggedInUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <NavigationBar
        user={user}
        onLogout={handleLogout}
        navigate={navigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <HeroSection />
      <FeaturesSection />
      <FacilitiesSection />
      <KostListings />
      <CTASection />
      <Footer user={user} onLogout={handleLogout} />
    </div>
  );
}

export default Home;
