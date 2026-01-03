import { useState, useEffect } from 'react';
import { Users, Home, DollarSign, TrendingUp, Calendar, Package } from 'lucide-react';
import { dummyKostList } from '../../../data/dummyKost';
import { getUsers } from '../../../hooks/useAuth';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalKosts: 0,
    revenue: 0,
    occupancyRate: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [topKosts, setTopKosts] = useState([]);

  useEffect(() => {
    // Hitung statistik
    const users = getUsers();
    const kosts = dummyKostList;

    setStats({
      totalUsers: users.length, // +1 dengan dummy user
      totalKosts: kosts.length
    });

    // Top kosts
    setTopKosts(kosts.slice(0, 3));
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users />,
      color: '#61adad',
    },
    {
      title: 'Total Kost',
      value: stats.totalKosts,
      icon: <Home />,
      color: '#4a8a8a',
    }
  ];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <h3>{stat.title}</h3>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Grid */}
      <div className={styles.gridContainer}>

        {/* Top Kosts */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Top Kost</h3>
            <Package size={20} />
          </div>
          <div className={styles.kostList}>
            {topKosts.map((kost, index) => (
              <div key={kost.id} className={styles.kostItem}>
                <div className={styles.kostRank}>{index + 1}</div>
                <img src={kost.image} alt={kost.name} className={styles.kostImage} />
                <div className={styles.kostInfo}>
                  <h4>{kost.name}</h4>
                  <p className={styles.kostPrice}>{kost.price}</p>
                </div>
                <div className={`${styles.kostStatus} ${kost.isAvailable ? styles.available : styles.full}`}>
                  {kost.isAvailable ? 'Available' : 'Full'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Quick Actions</h3>
          </div>
          <div className={styles.quickActions}>
            <button className={styles.actionButton}>
              <Home size={20} />
              <span>Tambah Kost Baru</span>
            </button>
            <button className={styles.actionButton}>
              <Users size={20} />
              <span>Kelola User</span>
            </button>
            <button className={styles.actionButton}>
              <DollarSign size={20} />
              <span>Lihat Laporan</span>
            </button>
            <button className={styles.actionButton}>
              <Package size={20} />
              <span>Update Stok</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
