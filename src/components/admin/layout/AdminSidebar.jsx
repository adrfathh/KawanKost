import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../../../hooks/useAdmin';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Home, Users, LogOut, ChevronRight, Building2 } from 'lucide-react';

const AdminSidebar = ({ onLogout }) => {
  const { admin, loading } = useAdmin();
  const [userCount, setUserCount] = useState(0);
  const [kostCount, setKostCount] = useState(0);

  useEffect(() => {
    fetch('https://6957da9df7ea690182d34812.mockapi.io/KostList')
      .then(res => res.json())
      .then(data => {setKostCount(Array.isArray(data) ? data.length : 0);
      })
      .catch(() => setKostCount(0));
  }, []);

  useEffect(() => {
    fetch("https://6957da9df7ea690182d34812.mockapi.io/users")
      .then(res => res.json())
      .then(data => setUserCount(data.length));
  }, []);

  const menuItems = [
    { 
      path: '/admin', 
      icon: <LayoutDashboard size={22} />, 
      label: 'Dashboard',
      badge: null
    },
    { 
      path: '/admin/kosts', 
      icon: <Home size={22} />, 
      label: 'Kelola Kost',
      badge: kostCount
    },
    { 
      path: '/admin/users', 
      icon: <Users size={22} />, 
      label: 'Kelola User',
      badge: userCount
    }
  ];

  return (
    <aside className="relative">
      {/* Shadow 3D Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 transform -skew-x-3 -translate-x-4 opacity-30 blur-xl"></div>
      
      {/* Main Sidebar */}
      <div className="relative w-64 min-h-screen bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-2xl flex flex-col z-10">
        
        {/* Logo Section with 3D Effect */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            {/* Logo Shadow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl blur opacity-30"></div>
            
            <div className="relative flex items-center space-x-3 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-md">
                <Building2 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  KawanKost
                </h1>
                <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
            >
              {({ isActive }) => (
                <div
                  className={`
                    group relative flex items-center justify-between px-4 py-3 rounded-xl
                    transition-all duration-300 ease-out
                    ${isActive 
                      ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                    hover:shadow-md hover:-translate-y-0.5
                  `}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-r-full"></div>
                  )}

                  <div className="flex items-center space-x-3">
                    <div
                      className={`
                        p-2 rounded-lg transition-all duration-300
                        ${isActive
                          ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-teal-50 group-hover:text-teal-600'
                        }
                      `}
                    >
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span
                        className={`
                          px-2 py-1 text-xs font-bold rounded-full min-w-[24px] text-center
                          ${isActive
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-200 text-gray-700 group-hover:bg-teal-100 group-hover:text-teal-700'
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}

                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-300 ${
                        isActive ? 'text-teal-500' : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 rounded-xl blur-sm"></div>
                  </div>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Admin Profile Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="relative group">
            {/* Profile Card Shadow */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative flex items-center justify-between p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-3">
                {/* Avatar with 3D Effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur opacity-30"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-800">{loading ? "Loading..." : `${admin?.firstName} ${admin?.lastName}`}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[120px]">{admin?.email}</p>
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group/logout"
                title="Keluar"
              >
                <LogOut size={18} className="group-hover/logout:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="mt-2 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;