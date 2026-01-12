import { useAdmin } from '../../../hooks/useAdmin';
import { useState, useRef, useEffect } from 'react';
import { User, MessageSquare, LogOut, ChevronDown } from 'lucide-react';
import KawanKost from '../../../assets/icons/KawanKost.png';

const AdminHeader = ({ onLogout, onChatToggle }) => {
  const { admin, loading } = useAdmin();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadChats] = useState(3); // Chat belum dibaca
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200/80 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Left Section: Logo and Search */}
          <div className="flex items-center space-x-6">
            {/* Logo with 3D Effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3 bg-white rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={KawanKost} 
                  alt="KawanKost" 
                  className="h-7 w-auto filter"
                />
                <div className="hidden md:block">
                  <div className="text-xs font-medium text-gray-500">Admin Panel</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Actions and Profile */}
          <div className="flex items-center space-x-3">
            
            {/* Chat Button */}
            {onChatToggle && (
              <button
                onClick={onChatToggle}
                className="relative p-3 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 text-teal-600 transition-all duration-200 shadow-sm hover:shadow-md group"
                title="Buka Chat Support"
              >
                <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                {unreadChats > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow">
                    {unreadChats}
                  </span>
                )}
              </button>
            )}

            {/* Divider */}
            <div className="h-8 w-px bg-gradient-to-b from-gray-300 to-gray-200"></div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
              >
                {/* Avatar with 3D Effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-md">
                    <User size={20} className="text-white" />
                  </div>
                </div>

                {/* User Info */}
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-gray-800">Administrator</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    {admin?.role === "admin" ? "Administrator" : admin?.role}
                    <ChevronDown 
                      size={14} 
                      className={`ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </button>

              {/* Dropdown Menu with 3D Effect */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50 animate-fadeIn">
                  {/* Dropdown Header */}
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow">
                        <User size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{admin?.firstName} {admin?.lastName}</div>
                        <div className="text-sm text-gray-500">{admin?.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Items */}
                  <div className="p-2">
                    <button onClick={onLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 hover:text-red-700 font-semibold transition-all duration-200 group">
                      <LogOut size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                      <span>Keluar dari Sistem</span>
                    </button>
                  </div>

                  {/* Status Indicator */}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-600">Status: Online</span>
                      </div>
                      <span className="text-xs text-gray-400">Aktif 5m lalu</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;