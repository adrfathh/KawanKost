import { Link } from 'react-router-dom';
import { Star, ChevronDown, ChevronUp, ChevronRight, MapPin, Maximize2, Users, Home, Bath, Wifi } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { useState } from 'react';

const KostCard = ({ kost, viewMode = 'full' }) => {
  const [showMore, setShowMore] = useState(false);
  
  // Mode compact untuk tampilan terbatas
  const isCompact = viewMode === 'compact';
  
  // Format harga
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(kost.price);
  
  return (
    <Card 
      className={`
        group relative border border-gray-100 rounded-xl overflow-hidden
        bg-white transition-all duration-300 flex flex-col h-full
        hover:shadow-xl hover:-translate-y-0.5 hover:border-[#89c2c2]
        ${isCompact ? 'max-h-[300px]' : ''}
      `}
    >
      {/* Image Container dengan Overlay */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <img 
          src={kost.image} 
          alt={kost.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Gradient Overlay yang lebih subtle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
        
        {/* Status & Badge Container */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          
          {/* Left: Availability & Type */}
          <div className="flex flex-col gap-2">
            {/* Ketersediaan Kamar - POSISI UTAMA */}
            {kost.rooms && kost.rooms.available !== undefined && (
              <div className={`
                px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm backdrop-blur-sm
                ${kost.rooms.available > 0 
                  ? 'bg-[#61adad] text-white' 
                  : 'bg-[#e74c3c] text-white'
                }
              `}>
                {kost.rooms.available > 0 ? (
                  <span className="flex items-center gap-1.5">
                    <Users size={12} className="stroke-[2]" />
                    Tersisa {kost.rooms.available} kamar
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Users size={12} className="stroke-[2]" />
                    Penuh
                  </span>
                )}
              </div>
            )}
            
            {/* Tipe Kost - dengan variasi warna yang lebih soft */}
            <div className={`
              px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm backdrop-blur-sm
              ${kost.type === 'Putri' 
                ? 'bg-[#f8b4d9] text-[#8a1c62]' 
                : kost.type === 'Putra'
                ? 'bg-[#b4d9f8] text-[#0e7c7c]'
                : 'bg-[#f8e4b4] text-[#8a6d1c]'
              }
            `}>
              {kost.type}
            </div>
            
            {/* Status Tersedia/Penuh - hanya tampil jika rooms tidak ada */}
            {!kost.rooms && !kost.isAvailable && (
              <div className="px-3 py-1.5 bg-[#e74c3c] text-white text-xs font-semibold rounded-lg shadow-sm">
                Penuh
              </div>
            )}
          </div>
          
          {/* Right: Rating */}
          <div className="px-3 py-1.5 bg-[#61adad] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5">
            <Star size={12} className="fill-white stroke-[#61adad]" />
            {kost.rating || '4.0'}
          </div>
        </div>
        
        {/* Overlay Hover - lebih subtle */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-[#61adad]/10 via-transparent to-transparent
          flex items-center justify-center opacity-0 transition-opacity duration-300
          group-hover:opacity-100 z-5 pointer-events-none
        `}></div>
      </div>

      {/* Content Section */}
      <div className={`
        flex-1 p-4 flex flex-col ${isCompact ? 'gap-2' : 'gap-3'}
        relative z-10 bg-white
      `}>
        
        {/* Title and Price Row */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className={`
              font-bold text-gray-900 line-clamp-2 leading-tight
              ${isCompact ? 'text-sm' : 'text-lg'}
              group-hover:text-[#4a8a8a] transition-colors duration-200
            `}>
              {kost.name}
            </CardTitle>
          </div>
          <div className="flex-shrink-0">
            <span className={`
              font-bold text-[#61adad]
              ${isCompact ? 'text-sm' : 'text-lg'}
            `}>
              {formattedPrice}/bln
            </span>
          </div>
        </div>

        {/* Address with Icon */}
        <div className="flex items-start gap-2 mt-1">
          <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <CardDescription className={`
            text-gray-600 line-clamp-2 ${isCompact ? 'text-xs' : 'text-sm'}
          `}>
            {kost.address}
          </CardDescription>
        </div>

        {/* Description */}
        {kost.description && !isCompact && (
          <div className="flex-1 mt-1">
            <CardDescription className={`
              text-gray-700 ${showMore ? '' : 'line-clamp-2'} text-sm
            `}>
              {showMore ? kost.description : `${kost.description.substring(0, 100)}...`}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowMore(!showMore);
                }}
                className="ml-2 text-[#61adad] hover:text-[#4a8a8a] font-medium text-xs inline-flex items-center gap-1 transition-colors"
              >
                {showMore ? (
                  <>
                    <ChevronUp size={12} />
                    Lebih sedikit
                  </>
                ) : (
                  <>
                    <ChevronDown size={12} />
                    Selengkapnya
                  </>
                )}
              </button>
            </CardDescription>
          </div>
        )}

        {/* Facilities - Ikon-based untuk hemat space */}
        {kost.facilities && kost.facilities.length > 0 && !isCompact && (
          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4">
              {/* Fasilitas utama dengan ikon */}
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#f0f8f8] rounded-lg">
                  <Wifi size={14} className="text-[#61adad]" />
                </div>
                <span className="text-xs text-gray-600">WiFi</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#f0f8f8] rounded-lg">
                  <Bath size={14} className="text-[#61adad]" />
                </div>
                <span className="text-xs text-gray-600">K. Mandi</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#f0f8f8] rounded-lg">
                  <Home size={14} className="text-[#61adad]" />
                </div>
                <span className="text-xs text-gray-600">AC</span>
              </div>
              
              {kost.facilities.length > 3 && (
                <span className="text-gray-400 text-xs font-medium ml-auto">
                  +{kost.facilities.length - 3} lainnya
                </span>
              )}
            </div>
          </div>
        )}

        {/* Quick Info untuk compact mode */}
        {isCompact && (
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
            <span className="flex items-center gap-2">
              <div className="p-1 bg-[#f0f8f8] rounded">
                <Maximize2 size={12} className="text-[#61adad]" />
              </div>
              <span>{kost.size || '20m²'}</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="p-1 bg-[#f0f8f8] rounded">
                <Users size={12} className="text-[#61adad]" />
              </div>
              <span>{kost.capacity || '1-2 orang'}</span>
            </span>
          </div>
        )}

        {/* Action Button - TAMBAHKAN relative dan z-index tinggi */}
        <div className="mt-3 pt-3 border-t border-gray-100 relative z-30">
          <Link 
            to={`/detail-produk/${kost.id}`} 
            className="block"
          >
            <Button 
              className={`
                w-full font-semibold transition-all duration-300
                ${kost.isAvailable 
                  ? 'bg-[#61adad] hover:bg-[#4a8a8a] text-white' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
                ${isCompact ? 'h-9 text-sm' : 'h-11'}
                hover:shadow-md
                border border-transparent hover:border-[#61adad]/20
                relative z-40
              `}
              disabled={!kost.isAvailable}
              size={isCompact ? "sm" : "default"}
            >
              <span className="flex items-center justify-center gap-2">
                {kost.isAvailable ? 'Lihat Detail' : 'Tidak Tersedia'}
                <ChevronRight size={16} className={`
                  transition-transform duration-300 
                  ${kost.isAvailable ? 'group-hover:translate-x-1' : ''}
                `} />
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Floating Quick Info - PERBAIKAN POSISI dan Z-INDEX */}
      <div className={`
        absolute bottom-16 left-3 right-3 bg-white rounded-lg shadow-lg p-3
        opacity-0 translate-y-3 transition-all duration-300 pointer-events-none
        border border-gray-100 z-20
        group-hover:opacity-100 group-hover:translate-y-0
        backdrop-blur-sm bg-white/95
      `}>
        <div className="space-y-3">
          {/* Progress Bar Okupansi */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs font-medium">Okupansi Kamar</span>
              <span className="text-[#61adad] font-bold text-xs">
                {kost.rooms?.total && kost.rooms?.available 
                  ? `${Math.round((kost.rooms.total - kost.rooms.available) / kost.rooms.total * 100)}%` 
                  : '80%'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-[#61adad] to-[#89c2c2] h-1.5 rounded-full transition-all duration-700"
                style={{ 
                  width: kost.rooms?.total && kost.rooms?.available 
                    ? `${(kost.rooms.total - kost.rooms.available) / kost.rooms.total * 100}%` 
                    : '80%'
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Terisi: {kost.rooms?.total && kost.rooms?.available 
                ? kost.rooms.total - kost.rooms.available 
                : '8'}</span>
              <span>Total: {kost.rooms?.total || '10'}</span>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-100"></div>
          
          {/* Fasilitas utama */}
          <div className="grid grid-cols-2 gap-2">
            {kost.facilities?.slice(0, 4).map((facility, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#61adad]"></div>
                <span className="text-xs text-gray-700 truncate">{facility}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Arrow pointer ke bawah */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
        </div>
      </div>
    </Card>
  );
};

export default KostCard;