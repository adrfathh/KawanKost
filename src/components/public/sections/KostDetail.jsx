import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLoggedInUser } from '../../../hooks/useAuth';
import { MapPin, Star, CheckCircle, Wifi, Droplets, Shield, Calendar, Users, Clock, Heart, Home, Bath, Car, Tv, Utensils, Wind } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const KostDetail = () => {
    const { id } = useParams();
    const [kost, setKost] = useState(null);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [user, setUser] = useState(getLoggedInUser());

    useEffect(() => {
        if (!user || !kost) return;
        setIsFavorite(user.favorite?.includes(kost.id));
    }, [user, kost]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://6957da9df7ea690182d34812.mockapi.io/KostList/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Gagal mengambil data");
                return res.json();
            })
            .then((data) => {
                // Mock data rooms jika tidak ada di API
                const kostWithRooms = {
                    ...data,
                    rooms: data.rooms || {
                        total: 10,
                        available: data.isAvailable ? 4 : 0,
                        occupied: data.isAvailable ? 6 : 10
                    }
                };
                setKost(kostWithRooms);
            })
            .catch(() => {
                setError("Gagal memuat data kost");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleCheckout = () => {
        // Kurangi jumlah kamar tersedia jika masih ada
        if (kost.rooms?.available > 0) {
            const updatedRooms = {
                ...kost.rooms,
                available: kost.rooms.available - 1
            };

            // Update data kost lokal untuk immediate feedback
            const updatedKost = {
                ...kost,
                rooms: updatedRooms,
                isAvailable: updatedRooms.available > 0
            };
            setKost(updatedKost);

            // Kirim update ke API
            fetch(`https://6957da9df7ea690182d34812.mockapi.io/KostList/${kost.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...kost,
                    rooms: updatedRooms,
                    isAvailable: updatedRooms.available > 0
                })
            })
            .then(res => {
                if (!res.ok) throw new Error("Gagal mengupdate ketersediaan kamar");
                return res.json();
            })
            .then(data => {
                console.log("Ketersediaan kamar berhasil diperbarui:", data);
            })
            .catch(err => {
                console.error("Error:", err);
                // Jika gagal, kembalikan ke state sebelumnya
                setKost(kost);
                alert("Gagal memproses pemesanan. Silakan coba lagi.");
                return; // Jangan lanjut ke WhatsApp
            });
        }

        // Pesan WhatsApp dengan data terbaru
        const currentAvailable = kost.rooms?.available > 0 ? kost.rooms.available - 1 : 0;
        const message = `Halo, saya ingin memesan/booking kost berikut:

    Nama Kost: ${kost.name}
    Alamat: ${kost.address}
    Harga: Rp ${Number(kost.price).toLocaleString("id-ID")}/bulan
    Kamar Tersedia: ${currentAvailable} dari ${kost.rooms?.total || 0} kamar

    Apakah masih tersedia? Saya ingin booking kamar ini.`;

        window.open(
            `https://wa.me/6281617814578?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    };

    if (loading) {
        return (
            <div className="container mx-auto max-w-6xl px-6 py-10 space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-[300px] w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center text-gray-600">{error}</div>
        );
    }

    const toggleFavorite = async () => {
        if (!user) {
            alert("Silakan login terlebih dahulu");
            return;
        }

        if (saving) return;
        setSaving(true);

        const safeFavorites = Array.isArray(user?.favorite) ? user.favorite : [];
        const updatedFavorites = isFavorite
            ? safeFavorites.filter(fid => fid !== kost.id)
            : [...new Set([...safeFavorites, kost.id])];

        try {
            const res = await fetch(
                `https://6957da9df7ea690182d34812.mockapi.io/users/${user.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ favorite: updatedFavorites }),
                }
            );

            const updatedUser = await res.json();
            localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsFavorite(updatedFavorites.includes(kost.id));

        } catch (err) {
            console.error(err);
            alert("Gagal menyimpan favorit");
        } finally {
            setSaving(false);
        }
    };

    // Mock multiple images for gallery
    const galleryImages = [kost.image, kost.image, kost.image];

    // Facility icons mapping
    const facilityIcons = {
        "WiFi": <Wifi className="h-5 w-5" />,
        "Wi-Fi": <Wifi className="h-5 w-5" />,
        "AC": <Wind className="h-5 w-5" />,
        "Kamar Mandi Dalam": <Bath className="h-5 w-5" />,
        "Kamar Mandi Luar": <Bath className="h-5 w-5" />,
        "Parkir": <Car className="h-5 w-5" />,
        "Parkir Luas": <Car className="h-5 w-5" />,
        "Laundry": <Droplets className="h-5 w-5" />,
        "Security": <Shield className="h-5 w-5" />,
        "TV": <Tv className="h-5 w-5" />,
        "Dapur Bersama": <Utensils className="h-5 w-5" />,
        "Ruang Tamu": <Home className="h-5 w-5" />,
    };

    const getFacilityIcon = (facility) => {
        return facilityIcons[facility] || <CheckCircle className="h-5 w-5" />;
    };

    const occupancyRate = kost.rooms?.total 
        ? Math.round((kost.rooms.total - kost.rooms.available) / kost.rooms.total * 100) 
        : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <button 
                onClick={() => window.history.back()} 
                className="group fixed left-6 top-10 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
            >
                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
            </button>
            
            <div className="border-b bg-white">
                <div className="container mx-auto max-w-6xl px-6 py-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <h1 className="text-3xl font-light tracking-tight text-gray-900">
                                    {kost.name}
                                </h1>
                                
                                <button 
                                    disabled={saving} 
                                    onClick={toggleFavorite} 
                                    className={`rounded-full p-3 transition-all duration-300 hover:scale-105 ${
                                        isFavorite 
                                            ? "bg-red-50 text-red-500 hover:bg-red-100" 
                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                                    title={isFavorite ? "Hapus dari favorit" : "Tambahkan ke favorit"}
                                >
                                    <Heart size={22} className={isFavorite ? "fill-red-500" : ""}/>
                                </button>
                            </div>
                            
                            <div className="mt-2 flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{kost.address}</span>
                                </div>
                                <div className="h-4 w-px bg-gray-300"></div>à
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    <span className="text-sm font-medium">{kost.rating}</span>
                                    <span className="text-sm text-gray-500">/5.0</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-2xl font-semibold text-[#61ADAD]">Rp {Number(kost.price).toLocaleString("id-ID")}</div>
                                <div className="text-sm text-gray-500">per bulan</div>
                            </div>
                            <div className={`h-3 w-3 rounded-full animate-pulse ${
                                kost.rooms?.available > 0 ? "bg-[#61ADAD]" : "bg-red-500"
                            }`}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-6 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="relative aspect-[16/10]">
                                <img src={galleryImages[activeImage]} alt={kost.name} className="h-full w-full object-cover" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                                        {activeImage + 1} / {galleryImages.length}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 p-4">
                                {galleryImages.map((img, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => setActiveImage(index)} 
                                        className={`relative h-20 w-20 overflow-hidden rounded-lg transition-all ${
                                            activeImage === index 
                                                ? "ring-2 ring-[#61ADAD]" 
                                                : "opacity-60 hover:opacity-100 hover:ring-1 hover:ring-gray-300"
                                        }`}
                                    >
                                        <img src={img} alt={`View ${index + 1}`} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Status Ketersediaan Kamar</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`rounded-lg p-3 ${
                                                    kost.rooms?.available > 0 
                                                        ? "bg-green-50 text-green-700" 
                                                        : "bg-red-50 text-red-700"
                                                }`}>
                                                    <Users className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-600">Ketersediaan Kamar</div>
                                                    <div className={`text-xl font-bold ${
                                                        kost.rooms?.available > 0 ? "text-green-600" : "text-red-600"
                                                    }`}>
                                                        {kost.rooms?.available > 0 ? (
                                                            <span>
                                                                Tersisa <span className="text-2xl">{kost.rooms.available}</span> kamar
                                                            </span>
                                                        ) : (
                                                            <span>Penuh</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Tingkat Okupansi</span>
                                                <span className="font-medium text-[#61ADAD]">{occupancyRate}%</span>
                                            </div>
                                            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-[#61ADAD] to-[#89c2c2] transition-all duration-1000"
                                                    style={{ width: `${occupancyRate}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>Terisi: {kost.rooms?.total - kost.rooms?.available || 0}</span>
                                                <span>Total: {kost.rooms?.total || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="space-y-3">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#61ADAD]">{kost.rooms?.available || 0}</div>
                                            <div className="text-xs text-gray-600">Kamar Kosong</div>
                                        </div>
                                        <div className="h-px bg-gray-200"></div>
                                        <div className="text-center">
                                            <div className="text-xl font-bold text-gray-700">{kost.rooms?.total - kost.rooms?.available || 0}</div>
                                            <div className="text-xs text-gray-600">Kamar Terisi</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Deskripsi</h2>
                            <p className="leading-relaxed text-gray-700 whitespace-pre-line">{kost.description}</p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-lg font-semibold text-gray-900">Informasi Kost</h2>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                    <div className="rounded-lg bg-[#F0F8F8] p-2">
                                        <Users className="h-5 w-5 text-[#61ADAD]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600">Tipe Kost</div>
                                        <div className="font-medium">{kost.type}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                    <div className="rounded-lg bg-blue-50 p-2">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600">Kontrak Minimum</div>
                                        <div className="font-medium">3 Bulan</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                    <div className="rounded-lg bg-amber-50 p-2">
                                        <Clock className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600">Check-in</div>
                                        <div className="font-medium">14:00 WIB</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Booking Kamar</h3>
                            
                            <div className="mb-6">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                                    kost.rooms?.available > 0 
                                        ? "bg-green-50 text-green-700" 
                                        : "bg-red-50 text-red-700"
                                }`}>
                                    <div className={`h-2 w-2 rounded-full animate-pulse ${
                                        kost.rooms?.available > 0 ? "bg-green-500" : "bg-red-500"
                                    }`}></div>
                                    <span className="font-medium">
                                        {kost.rooms?.available > 0 
                                            ? `Masih ada ${kost.rooms.available} kamar tersedia` 
                                            : 'Semua kamar sudah terisi'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <div className="text-sm text-gray-600">Kamar Tersedia</div>
                                        <div className={`text-2xl font-bold ${
                                            kost.rooms?.available > 0 ? "text-green-600" : "text-red-600"
                                        }`}>
                                            {kost.rooms?.available || 0}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">Total Kamar</div>
                                        <div className="text-xl font-bold text-gray-700">{kost.rooms?.total || 0}</div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                disabled={!(kost.rooms?.available > 0)} 
                                onClick={handleCheckout}
                                className={`w-full rounded-xl py-4 font-medium transition-all text-lg ${
                                    kost.rooms?.available > 0
                                        ? "bg-gradient-to-r from-[#61ADAD] to-[#4a8a8a] text-white hover:from-[#4a8a8a] hover:to-[#61ADAD] hover:shadow-lg active:scale-[0.98]"
                                        : "cursor-not-allowed bg-gray-100 text-gray-400"
                                }`}
                            >
                                {kost.rooms?.available > 0 ? (
                                    <span className="flex items-center justify-center gap-2">
                                        Ajukan Sewa Sekarang
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                ) : (
                                    "Tidak Tersedia"
                                )}
                            </button>
                            
                            <div className="mt-4 text-center text-sm text-gray-500">
                                Proses sewa hanya membutuhkan 3 hari kerja
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Fasilitas Lengkap</h3>
                            <div className="space-y-3">
                                {kost.facilities?.map((facility, index) => (
                                    <div key={index} className="flex items-center gap-3 py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="text-[#61ADAD]">
                                            {getFacilityIcon(facility)}
                                        </div>
                                        <span className="text-gray-700 flex-1">{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#E8F4F4] bg-[#F0F8F8] p-6">
                            <h3 className="mb-3 font-medium text-[#2C6E6E]">Informasi Penting</h3>
                            <ul className="space-y-3 text-sm text-[#2C6E6E]">
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 flex-shrink-0">•</div>
                                    <span>Biaya listrik dan air sudah termasuk dalam sewa bulanan</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 flex-shrink-0">•</div>
                                    <span>DP minimal 1 bulan sewa + biaya administrasi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 flex-shrink-0">•</div>
                                    <span>Tamu maksimal 2 orang per kamar dengan registrasi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 flex-shrink-0">•</div>
                                    <span>Kontrak minimum 6 bulan, bisa diperpanjang</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KostDetail;