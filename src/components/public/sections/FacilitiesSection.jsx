import { useState } from 'react';
import { dummyFacilities } from '../../../data/dummyFacilities';

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState(dummyFacilities);
  const baseColor = '#61adad';

  return (
    <div className="py-16 relative overflow-hidden" style={{ backgroundColor: baseColor }}>
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Fasilitas <span className="text-cyan-100">Premium</span>
          </h2>
          
          <p className="text-xl text-cyan-50 opacity-90">
            Setiap fasilitas dirancang untuk memberikan pengalaman terbaik bagi Anda
          </p>
        </div>

        {/* Facilities Grid with Enhanced Design */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            const delay = index * 100;

            return (
              <div 
                key={index}
                className="relative group"
                style={{ animationDelay: `${delay}ms` }}
              >
                {/* Card Container */}
                <div className="relative bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/30 overflow-hidden">
                  
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  

                  
                  {/* Icon Container */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-5 p-5 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 group-hover:from-white/30 group-hover:to-white/20 transition-all duration-500">
                      <div className="p-4 rounded-xl bg-white shadow-lg">
                        <Icon 
                          size={32} 
                          className="text-gray-800 group-hover:text-cyan-700 transition-colors duration-500" 
                        />
                      </div>
                    </div>
                    
                    {/* Facility Name */}
                    <p className="text-center font-bold text-white text-lg group-hover:text-cyan-50 transition-colors duration-300">
                      {facility.name}
                    </p>
                    
                    {/* Description (optional) */}
                    <p className="text-center text-cyan-100/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Tersedia 24 jam
                    </p>
                  </div>
                  
                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;