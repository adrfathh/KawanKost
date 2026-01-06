import { useState, useEffect } from 'react';
import KostCard from '../cards/KostCard';
import { Search, Filter, MapPin, Grid, List, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import styles from './KostCollection.module.css';

const KostCollection = () => {
  const [kostData, setKostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [displayMode, setDisplayMode] = useState('grid'); // 'grid' atau 'list'
  const [filteredKost, setFilteredKost] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data dari MockAPI
  useEffect(() => {
    const fetchKostData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://6957da9df7ea690182d34812.mockapi.io/KostList');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Pastikan data memiliki struktur yang sesuai
        const formattedData = data.map(item => ({
          id: item.id || item.ID,
          name: item.nama || item.name || 'Nama Kost',
          image: item.image || item.gambar || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
          rating: item.rating ? parseFloat(item.rating) : 4.5,
          type: item.tipe || item.type || 'Campur',
          price: item.harga ? parseInt(item.harga) : 1500000,
          address: item.alamat || item.address || 'Jl. Contoh No. 123',
          description: item.deskripsi || item.description || 'Kost nyaman dengan fasilitas lengkap',
          isAvailable: item.status === 'tersedia' || item.isAvailable !== false,
          facilities: item.fasilitas || item.facilities || ['WiFi', 'AC', 'Kamar Mandi Dalam'],
          size: item.luas || item.size || '20m²',
          distance: item.jarak || item.distance || 'Pusat Kota'
        }));
        
        setKostData(formattedData);
      } catch (err) {
        console.error('Error fetching kost data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKostData();
  }, []);

  // Filter options
  const typeOptions = [
    { value: 'all', label: 'Semua Tipe' },
    { value: 'Putra', label: 'Putra' },
    { value: 'Putri', label: 'Putri' },
    { value: 'Campur', label: 'Campur' }
  ];

  const priceOptions = [
    { value: 'all', label: 'Semua Harga' },
    { value: 'low', label: '≤ Rp 1.000.000' },
    { value: 'medium', label: 'Rp 1-3 Juta' },
    { value: 'high', label: '≥ Rp 3.000.000' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'available', label: 'Tersedia' },
    { value: 'full', label: 'Penuh' }
  ];

  // Apply filters
  useEffect(() => {
    if (!kostData.length) return;

    let result = [...kostData];

    // Search filter
    if (searchTerm) {
      result = result.filter(kost =>
        kost.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kost.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kost.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kost.facilities?.some(facility => 
          facility.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      result = result.filter(kost => kost.type === selectedType);
    }

    // Price filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'low':
          result = result.filter(kost => kost.price <= 1000000);
          break;
        case 'medium':
          result = result.filter(kost => kost.price > 1000000 && kost.price <= 3000000);
          break;
        case 'high':
          result = result.filter(kost => kost.price > 3000000);
          break;
      }
    }

    // Availability filter
    if (availability !== 'all') {
      result = result.filter(kost => 
        availability === 'available' ? kost.isAvailable : !kost.isAvailable
      );
    }

    setFilteredKost(result);
  }, [searchTerm, selectedType, priceRange, availability, kostData]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setPriceRange('all');
    setAvailability('all');
  };

  // Get active filter count
  const activeFilterCount = [
    selectedType !== 'all',
    priceRange !== 'all',
    availability !== 'all',
    searchTerm !== ''
  ].filter(Boolean).length;

  // Loading state
  if (loading) {
    return (
      <div className={styles.collectionContainer}>
        <div className={styles.loadingContainer}>
          <Loader2 className={styles.loadingSpinner} size={48} />
          <p className={styles.loadingText}>Memuat data kost...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.collectionContainer}>
        <Alert variant="destructive" className={styles.errorAlert}>
          <AlertDescription className={styles.errorText}>
            Gagal memuat data: {error}
          </AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Coba Lagi
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.collectionContainer}>
        <button onClick={() => window.history.back()} className="group absolute left-6 top-10 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md">
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali
        </button>
      {/* Header */}
      <div className={styles.collectionHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.collectionTitle}>
            Temukan Kost Impian Anda
          </h1>
          <p className={styles.collectionSubtitle}>
            {kostData.length} properti kost tersedia di berbagai lokasi
          </p>
        </div>
        
        <div className={styles.headerRight}>
          <Badge variant="outline" className={styles.resultBadge}>
            {filteredKost.length} Hasil
          </Badge>
          <div className={styles.displayToggle}>
            <Button
              variant={displayMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDisplayMode('grid')}
              className={styles.toggleButton}
              disabled={loading}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={displayMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDisplayMode('list')}
              className={styles.toggleButton}
              disabled={loading}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <Input
            type="text"
            placeholder="Cari nama kost, lokasi, atau fasilitas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            disabled={loading}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={styles.filterToggle}
            disabled={loading}
          >
            <Filter size={16} />
            Filter
            {activeFilterCount > 0 && (
              <span className={styles.filterCount}>
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className={styles.filterContainer}>
          <div className={styles.filterGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Tipe Kost</label>
              <Select 
                value={selectedType} 
                onValueChange={setSelectedType}
                disabled={loading}
              >
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Rentang Harga</label>
              <Select 
                value={priceRange} 
                onValueChange={setPriceRange}
                disabled={loading}
              >
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue placeholder="Pilih rentang" />
                </SelectTrigger>
                <SelectContent>
                  {priceOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Ketersediaan</label>
              <Select 
                value={availability} 
                onValueChange={setAvailability}
                disabled={loading}
              >
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.filterActions}>
              <Button
                variant="ghost"
                onClick={clearFilters}
                className={styles.clearButton}
                disabled={loading}
              >
                Hapus Filter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {filteredKost.length > 0 ? (
        <div className={`${styles.resultsGrid} ${displayMode === 'list' ? styles.listView : ''}`}>
          {filteredKost.map((kost) => (
            <div key={kost.id} className={styles.kostItem}>
              <KostCard 
                kost={kost} 
                viewMode={displayMode === 'list' ? 'compact' : 'full'}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIllustration}>
            <MapPin size={48} className={styles.emptyIcon} />
          </div>
          <h3 className={styles.emptyTitle}>
            {kostData.length === 0 ? 'Belum ada data kost' : 'Tidak ada kost ditemukan'}
          </h3>
          <p className={styles.emptyDescription}>
            {kostData.length === 0 
              ? 'Data kost sedang tidak tersedia' 
              : 'Coba gunakan kata kunci lain atau ubah filter pencarian'}
          </p>
          <Button
            variant="outline"
            onClick={clearFilters}
            className={styles.resetButton}
            disabled={loading}
          >
            Reset Semua Filter
          </Button>
        </div>
      )}

      {/* Stats */}
      {filteredKost.length > 0 && (
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Putra</span>
              <span className={styles.statValue}>
                {filteredKost.filter(k => k.type === 'Putra').length}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Putri</span>
              <span className={styles.statValue}>
                {filteredKost.filter(k => k.type === 'Putri').length}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Campur</span>
              <span className={styles.statValue}>
                {filteredKost.filter(k => k.type === 'Campur').length}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Tersedia</span>
              <span className={styles.statValue}>
                {filteredKost.filter(k => k.isAvailable).length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KostCollection;