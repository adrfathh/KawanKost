import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Users, Home, DollarSign, TrendingUp, Calendar, Package, Star, MapPin } from 'lucide-react';
import { getUsers } from '../../../hooks/useAuth';

const Dashboard = () => {
  const navigate = useNavigate();
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalKosts: 0,
    revenue: 0,
    occupancyRate: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [topKosts, setTopKosts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const users = await getUsers();

        const res = await fetch(
          "https://6957da9df7ea690182d34812.mockapi.io/KostList"
        );
        const kostData = await res.json();

        setKosts(kostData);

        // Sort berdasarkan rating
        const sortedKosts = [...kostData].sort(
          (a, b) => b.rating - a.rating
        );

        // Hitung revenue
        const revenue = kostData.reduce((total, kost) => {
          const price = parseInt(
            String(kost.price).replace(/\D/g, "")
          );
          return total + (price || 0);
        }, 0);

        setStats({
          totalUsers: users.length,
          totalKosts: kostData.length,
          revenue,
          occupancyRate:
            kostData.length > 0
              ? (kostData.filter(k => k.isAvailable).length /
                  kostData.length) *
                100
              : 0,
        });

        setTopKosts(sortedKosts.slice(0, 3));
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-[#61adad]',
      textColor: 'text-[#61adad]',
    },
    {
      title: 'Total Kost',
      value: stats.totalKosts,
      icon: <Home className="w-6 h-6" />,
      color: 'bg-[#4a8a8a]',
      textColor: 'text-[#4a8a8a]',
    },
    {
      title: 'Pendapatan Bulanan',
      value: `Rp ${stats.revenue.toLocaleString('id-ID')}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
    },
    {
      title: 'Tingkat Okupansi',
      value: `${stats.occupancyRate.toFixed(1)}%`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
    }
  ];

  // Format harga ke Rupiah
  const formatPrice = (price) => {
    const num = parseInt(String(price).replace(/\D/g, "")) || 0;
    return `Rp ${num.toLocaleString("id-ID")}/bulan`;
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <p className={`text-xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Kosts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Top Kost Terpopuler</h3>
            <div className="p-2 bg-teal-50 rounded-lg">
              <Package className="w-5 h-5 text-teal-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            {topKosts.map((kost, index) => (
              <div key={kost.id} className="flex items-center p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                {/* Ranking */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  index === 0 ? 'bg-amber-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  'bg-amber-700'
                }`}>
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                
                {/* Kost Image */}
                <div className="flex-shrink-0 mr-4">
                  <img src={kost.image} alt={kost.name}className="w-14 h-14 rounded-lg object-cover"/>
                </div>
                
                {/* Kost Info */}
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-800 text-sm truncate">{kost.name}</h4>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-teal-50 text-teal-600">
                      {kost.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-1">
                    <div className="flex items-center mr-3">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" />
                      <span className="text-xs font-semibold text-gray-700">{kost.rating}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="truncate max-w-[120px]">{kost.address.split(',')[0]}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-teal-600">
                      {formatPrice(kost.price)}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      kost.isAvailable 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {kost.isAvailable ? 'Tersedia' : 'Penuh'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Info tambahan jika tidak ada kost */}
            {topKosts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Belum ada data kost</p>
              </div>
            )}
            
            {/* Button lihat semua */}
            {topKosts.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <Link to="/admin/kosts" className="w-full py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  Lihat Semua Data Kost →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Aksi Cepat</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Home className="w-5 h-5" />, label: 'Tambah Kost Baru', color: 'bg-teal-50 text-teal-600 hover:bg-teal-100', path: '/admin/kosts' },
              { icon: <Users className="w-5 h-5" />, label: 'Kelola User', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100', path: '/admin/users' },
              // { icon: <DollarSign className="w-5 h-5" />, label: 'Lihat Laporan', color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' },
              // { icon: <Package className="w-5 h-5" />, label: 'Update Stok', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
              // { icon: <Star className="w-5 h-5" />, label: 'Ulasan Baru', color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
              // { icon: <MapPin className="w-5 h-5" />, label: 'Atur Lokasi', color: 'bg-rose-50 text-rose-600 hover:bg-rose-100' },
            ].map((action, index) => (
              <button onClick={() => navigate(action.path)} key={index} className={`flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 ${action.color} transition-colors duration-200`}>
                <div className="mb-2">{action.icon}</div>
                <span className="text-xs font-medium text-center">{action.label}</span>
              </button>
            ))}
          </div>
          
          {/* Tips atau info cepat */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips Hari Ini</h4>
            <p className="text-xs text-gray-600">
              {topKosts.length > 0 
                ? `Kost "${topKosts[0]?.name}" memiliki rating tertinggi (${topKosts[0]?.rating}). Pertahankan kualitas layanan!`
                : 'Tambahkan kost pertama Anda untuk mulai mendapatkan pendapatan.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;