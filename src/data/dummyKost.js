import kostLvAyu from '../assets/images/kost-lv-ayu.png';
import kostSamara from '../assets/images/kost-samara.png';
import kostPutraKhalifa from '../assets/images/kost-putra-khalifa.png';
import kostMrh from '../assets/images/kost-mrh.png';

export const dummyKostList = [
    {
        id: 1,
        name: 'Kost Eksklusif Ayu',
        type: 'Campur',
        price: 'Rp 1.800.000/bulan',
        facilities: ['Wi-Fi', 'Kamar Mandi Dalam', 'Parkir Luas', 'AC'],
        address: 'Jl. Dewa Ruci, Bakung, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55196',
        description: 'Kost nyaman dekat kampus dengan lingkungan yang asri dan aman untuk mahasiswi.',
        image: kostLvAyu,
        rating: 4.8,
        isAvailable: true,
    },
    {
        id: 2,
        name: 'Kost Samara',
        type: 'Putra',
        price: 'Rp 750.000/bulan',
        facilities: ['Wi-Fi', 'Kamar Mandi Luar', 'Parkir', 'Laundry'],
        address: 'Jl. Monumen Perjuangan, Krobokan, Tamanan, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta',
        description: 'Kost eksklusif untuk mahasiswa dengan fasilitas lengkap dan akses mudah ke kampus.',
        image: kostSamara,
        rating: 4.5,
        isAvailable: true,
    },
    {
        id: 3,
        name: 'Kost Putra Khalifa',
        type: 'Putra',
        price: 'Rp 900.000/bulan',
        facilities: ['Wi-Fi Premium', 'Kamar Mandi Dalam', 'Parkir Motor & Mobil', 'AC', 'TV',],
        address: 'Gg. Teratai No.20, Glagah Lor, Tamanan, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55191',
        description: 'Kost premium dengan fasilitas terbaik untuk mahasiswa dan profesional muda.',
        image: kostPutraKhalifa,
        rating: 4.9,
        isAvailable: true,
    },
    {
        id: 4,
        name: 'Kost Eksklusif MRH',
        type: 'Putra',
        price: 'Rp 1.400.000/bulan',
        facilities: ['Wi-Fi', 'Kamar Mandi Dalam', 'Parkir', 'Dapur Bersama', 'Ruang Tamu',],
        address: 'Jl. Nitikan Baru Gg. Kunti No.3, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55162',
        description: 'Kost campur dengan area terpisah, cocok untuk mahasiswa dan pekerja.',
        image: kostMrh,
        rating: 4.6,
        isAvailable: false,
    },
];