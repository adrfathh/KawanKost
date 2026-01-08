import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLoggedInUser } from '../../../hooks/useAuth';
import { MapPin, Star, CheckCircle, Wifi, Droplets, Shield, Calendar, Users, Clock, Heart } from "lucide-react";
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
            setKost(data);
        })
        .catch(() => {
            setError("Gagal memuat data kost");
        })
        .finally(() => {
            setLoading(false);
        });
    }, [id]);

    const handleCheckout = () => {
        const message = `Halo, saya ingin memesan/booking kost berikut:

        Nama Kost: ${kost.name}
        Alamat: ${kost.address}
        Harga: Rp ${Number(kost.price).toLocaleString("id-ID")}/bulan

        Apakah masih tersedia?`;

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

        // ✅ AMAN DARI DATA STALE
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

            // ✅ SINKRON SEMUA TEMPAT
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

    const facilityIcons = {
    "WiFi": <Wifi className="h-5 w-5" />,
    "AC": <Droplets className="h-5 w-5" />,
    "Security": <Shield className="h-5 w-5" />,
    "Laundry": <Droplets className="h-5 w-5" />,
    };

    return (
    <div className="min-h-screen bg-gray-50">
        <button onClick={() => window.history.back()} className="group absolute left-6 top-10 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md">
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali
        </button>
        
        {/* HEADER */}
        <div className="border-b bg-white">
            <button disabled={saving} onClick={toggleFavorite} className={`rounded-full p-3 transition absolute right-105 top-45 cursor-pointer ${isFavorite ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"}`}>
                <Heart size={22} className={isFavorite ? "fill-red-500" : ""}/>
            </button>
            <div className="container mx-auto max-w-6xl px-6 py-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-3xl font-light tracking-tight text-gray-900">
                    {kost.name}
                    </h1>
                    <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{kost.address}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300"></div>
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
                    <div className={`h-3 w-3 rounded-full ${
                    kost.isAvailable ? "bg-[#61ADAD]" : "bg-red-500"
                    }`}></div>
                </div>
                </div>
            </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="container mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* LEFT COLUMN - Gallery & Details */}
            <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative aspect-[16/10]">
                <img src={galleryImages[activeImage]} alt={kost.name} className="h-full w-full object-cover" />
                <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    {activeImage + 1} / {galleryImages.length}
                    </span>
                </div>
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-2 p-4">
                {galleryImages.map((img, index) => (
                    <button key={index} onClick={() => setActiveImage(index)} className={`relative h-20 w-20 overflow-hidden rounded-lg transition-all ${activeImage === index ? "ring-2 ring-[#61ADAD]" : "opacity-60 hover:opacity-100"}`}>
                        <img src={img} alt={`View ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                ))}
                </div>
            </div>

            {/* Description Card */}
            <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Deskripsi</h2>
                <p className="leading-relaxed text-gray-700">{kost.description}</p>
            </div>

            {/* Features Grid */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">Fasilitas Utama</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#F0F8F8] p-2">
                        <Users className="h-5 w-5 text-[#61ADAD]" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-600">Tipe</div>
                        <div className="font-medium">{kost.type}</div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-600">Kontrak Minimum</div>
                        <div className="font-medium">6 Bulan</div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
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
                {/* RIGHT COLUMN - Booking & Details */}
                <div className="space-y-6">

                {/* Booking Card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-lg font-semibold text-gray-900">Status Kamar</h3>
                    
                    <div className="mb-6">
                        <div className="mb-2 flex justify-between text-sm">
                            <span className="text-gray-600">Ketersediaan</span>
                            <span className={`font-medium ${kost.isAvailable ? "text-[#61ADAD]" : "text-red-600"}`}>
                                {kost.isAvailable ? "Tersedia" : "Penuh"}
                            </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                            <div className={`h-full ${kost.isAvailable ? "w-3/4 bg-[#61ADAD]" : "w-0"}`}></div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                            {kost.isAvailable ? "4 kamar tersisa" : "Tidak ada kamar kosong"}
                        </div>
                    </div>

                    <button disabled={!kost.isAvailable} onClick={handleCheckout} className={`w-full rounded-xl py-3 font-medium transition-all ${
                        kost.isAvailable
                        ? "bg-[#61ADAD] text-white hover:bg-[#539c9c]"
                        : "cursor-not-allowed bg-gray-100 text-gray-400"
                    }`}>
                    {kost.isAvailable ? "Ajukan Sewa Sekarang" : "Tidak Tersedia"}
                    </button>
                    
                    <div className="mt-4 text-center text-sm text-gray-500">Proses sewa hanya membutuhkan 3 hari kerja</div>
                </div>

                {/* Facilities List */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Fasilitas Lengkap</h3>
                    <div className="space-y-3">
                    {kost.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-3 py-2">
                            <CheckCircle className="h-5 w-5 text-[#61ADAD]" />
                            <span className="text-gray-700">{facility}</span>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Contact & Info */}
                <div className="rounded-2xl border border-[#E8F4F4] bg-[#F0F8F8] p-6">
                    <h3 className="mb-3 font-medium text-[#2C6E6E]">Informasi Penting</h3>
                    <ul className="space-y-2 text-sm text-[#2C6E6E]">
                    <li className="flex items-start gap-2">
                        <div className="mt-0.5">•</div>
                        <span>Biaya listrik dan air sudah termasuk</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="mt-0.5">•</div>
                        <span>DP minimal 1 bulan sewa</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="mt-0.5">•</div>
                        <span>Tamu maksimal 2 orang per kamar</span>
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