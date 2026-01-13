import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Jika menggunakan React Router

const ErrorPage404 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Efek untuk animasi angka 404
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter < 100) {
        setCounter(prev => prev + 1);
      }
    }, 10);
    
    return () => clearTimeout(timer);
  }, [counter]);

  
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-teal-800 flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        backgroundPosition: `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`
      }}
    >
      {/* Latar belakang dekoratif */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl">
        {/* Header dengan animasi */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-white mb-4 tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-300">
              {counter < 100 ? counter : 404}
            </span>
          </h1>
          
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Halaman Tidak Ditemukan
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
          </div>
          
          <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Sepertinya Anda telah mengikuti tautan yang salah atau halaman telah dipindahkan
          </p>
        </div>
        
        {/* Pesan error */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-white/20 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-2 border-teal-400/30 flex items-center justify-center">
                <svg className="w-24 h-24 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Apa yang mungkin terjadi?</h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span>URL mungkin salah ketik atau tidak lengkap</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span>Halaman mungkin telah dipindahkan atau dihapus</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span>Link yang Anda ikuti mungkin sudah kedaluwarsa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Tombol aksi */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Halaman Sebelumnya
          </button>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} KawanKost. Semua hak dilindungi.
          </p>
        </div>
      </div>
      
      {/* Animasi CSS untuk blob */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* Animasi untuk teks 404 */
        @keyframes countUp {
          from { opacity: 0.5; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .count-animation {
          animation: countUp 0.5s ease-out;
        }
        
        /* Warna kustom berdasarkan #61adad */
        .bg-custom-teal { background-color: #61adad; }
        .text-custom-teal { color: #61adad; }
        .border-custom-teal { border-color: #61adad; }
      `}</style>
    </div>
  );
};

export default ErrorPage404;