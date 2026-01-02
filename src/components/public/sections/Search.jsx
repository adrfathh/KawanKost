import { useState } from 'react';
import { Search, Filter, MapPin, ChevronDown, Star } from 'lucide-react';
import styles from './Search.module.css';
import { dummyKostList } from '../../../data/dummyKost';
import KostCard from '../cards/KostCard';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    priceRange: 'all',
    facilities: [],
    university: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState(dummyKostList);

  const universities = ['UGM', 'UNY', 'UNPAD', 'UNAIR', 'UI', 'UNDIP', 'ITB'];
  const facilityOptions = [
    'Wi-Fi',
    'AC',
    'Kamar Mandi Dalam',
    'Parkir',
    'Laundry',
    'Dapur',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    const filtered = dummyKostList.filter(
      (kost) =>
        kost.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kost.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const toggleFilter = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? 'all' : value,
    }));
  };

  const toggleFacility = (facility) => {
    setSelectedFilters((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  return (
    <div className={styles.searchPage}>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className={styles.searchHeader}>
          <h1 className={styles.title}>Cari Kost Terbaik</h1>
          <p className={styles.subtitle}>
            Temukan kost impianmu di Yogyakarta dengan mudah
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className={styles.searchBar}>
            <div className={styles.searchInputWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Cari kost atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                Cari
              </button>
            </div>

            <button
              type="button"
              className={styles.filterButton}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              <span>Filter</span>
              <ChevronDown
                size={16}
                className={showFilters ? styles.rotate : ''}
              />
            </button>
          </form>

          {/* Quick Filters */}
          <div className={styles.quickFilters}>
            <span className={styles.quickFilterLabel}>Kampus terdekat:</span>
            <div className={styles.universityChips}>
              {universities.map((univ) => (
                <button
                  key={univ}
                  className={`${styles.universityChip} ${
                    selectedFilters.university === univ ? styles.active : ''
                  }`}
                  onClick={() => toggleFilter('university', univ)}
                >
                  {univ}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className={styles.filtersPanel}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Tipe Kost</h3>
              <div className={styles.filterOptions}>
                {['Semua', 'Putra', 'Putri', 'Campur'].map((type) => (
                  <button
                    key={type}
                    className={`${styles.filterOption} ${
                      selectedFilters.type === type.toLowerCase()
                        ? styles.selected
                        : ''
                    }`}
                    onClick={() => toggleFilter('type', type.toLowerCase())}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Harga per Bulan</h3>
              <div className={styles.filterOptions}>
                {['Semua', '≤ 500rb', '500rb - 1jt', '1jt - 2jt', '≥ 2jt'].map(
                  (range) => (
                    <button
                      key={range}
                      className={`${styles.filterOption} ${
                        selectedFilters.priceRange === range.toLowerCase()
                          ? styles.selected
                          : ''
                      }`}
                      onClick={() =>
                        toggleFilter('priceRange', range.toLowerCase())
                      }
                    >
                      {range}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Fasilitas</h3>
              <div className={styles.facilitiesGrid}>
                {facilityOptions.map((facility) => (
                  <label key={facility} className={styles.facilityCheckbox}>
                    <input
                      type="checkbox"
                      checked={selectedFilters.facilities.includes(facility)}
                      onChange={() => toggleFacility(facility)}
                    />
                    <span>{facility}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterActions}>
              <button
                className={styles.resetButton}
                onClick={() =>
                  setSelectedFilters({
                    type: 'all',
                    priceRange: 'all',
                    facilities: [],
                    university: '',
                  })
                }
              >
                Reset Filter
              </button>
              <button
                className={styles.applyButton}
                onClick={() => setShowFilters(false)}
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>
            Ditemukan{' '}
            <span className={styles.count}>{searchResults.length}</span>{' '}
            kos-kosan
            {selectedFilters.university &&
              ` di sekitar ${selectedFilters.university}`}
          </h2>
          <div className={styles.sortOptions}>
            <select className={styles.sortSelect}>
              <option>Urutkan: Relevansi</option>
              <option>Harga: Termurah</option>
              <option>Harga: Termahal</option>
              <option>Rating: Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {searchResults.length === 0 ? (
          <div className={styles.noResults}>
            <Search size={48} className={styles.noResultsIcon} />
            <h3>Kost tidak ditemukan</h3>
            <p>Coba ubah kata kunci pencarian atau filter yang digunakan</p>
          </div>
        ) : (
          <>
            {/* Promo Section */}
            <div className={styles.promoSection}>
              <div className={styles.promoBadge}>Promo Ngebut</div>
              <h3 className={styles.promoTitle}>Kos Andalan</h3>
              <p className={styles.promoSubtitle}>Paling direkomendasikan</p>
            </div>

            {/* Kost Listings */}
            <div className={styles.grid}>
              {searchResults.map((kost) => (
                <KostCard key={kost.id} kost={kost} />
              ))}
            </div>

            {/* Area Recommendations */}
            <div className={styles.areaRecommendations}>
              <h3 className={styles.areaTitle}>Area Rekomendasi</h3>
              <div className={styles.areaChips}>
                {[
                  'Kost Pogung',
                  'Kost Karanggayam',
                  'Kost Karangwuni',
                  'Kost Pandega',
                  'Kost Blimbingasri',
                  'Kost Karangmalang',
                  'Kost Klebengan',
                  'Kost Deresan',
                  'Kost Sagan',
                  'Kost Terban',
                ].map((area) => (
                  <button key={area} className={styles.areaChip}>
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
