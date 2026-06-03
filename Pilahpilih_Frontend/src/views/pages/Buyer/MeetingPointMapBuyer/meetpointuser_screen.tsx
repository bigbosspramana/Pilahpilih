import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Wajib di-import agar peta tidak berantakan
import styles from './meetpointuser_screen.module.css';

// Import Icons Lokal
import iconBack from '@/assets/icons/back.svg';
import iconSearch from '@/assets/icons/icon-search.svg';
import iconLocation from '@/assets/icons/icon-location.svg';
import iconGps from '@/assets/icons/icon-location.svg';

export default function MeetingPointMap() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentCoords, setCurrentCoords] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationName, setLocationName] = useState("Geser peta untuk memilih lokasi"); 
  const [locationDetail, setLocationDetail] = useState("Atau gunakan tombol GPS untuk lokasi saat ini.");

  // Ref untuk mengontrol objek Peta Leaflet
  const [map, setMap] = useState<any>(null);

  // Default Center (Misal: Pusat Indonesia atau sesuaikan dengan kampusmu)
  const defaultCenter = { lat: -7.2848, lng: 112.6318 };

  // --- FUNGSI MENGAMBIL GEO-LOCATION ASLI ---
  const handleGetMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung fitur lokasi.");
      return;
    }

    setIsLocating(true);
    setLocationName("Mencari lokasi...");
    setLocationDetail("Mohon tunggu sebentar...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setCurrentCoords({ lat, lng });
        setIsLocating(false);
        
        // Pindahkan animasi peta Leaflet ke koordinat baru
        if (map) {
          map.flyTo([lat, lng], 16, { animate: true, duration: 1.5 });
        }

        setLocationName("Lokasi Anda Saat Ini");
        setLocationDetail(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
      },
      (error) => {
        setIsLocating(false);
        setLocationName("Gagal mendapat lokasi");
        setLocationDetail("Periksa izin akses lokasi pada browser Anda.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleConfirmLocation = () => {
    // Kalau user menggeser peta, ambil titik tengah peta saat ini
    const finalLocation = map ? map.getCenter() : currentCoords;
    console.log("Konfirmasi Titik Temu:", finalLocation);
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      
      {/* --- OPENSTREETMAP DENGAN LEAFLET (GRATIS) --- */}
      <div className={styles.mapArea}>
        <MapContainer 
          center={[defaultCenter.lat, defaultCenter.lng]} 
          zoom={5} 
          zoomControl={false} // Sembunyikan tombol +/- bawaan
          style={{ width: '100%', height: '100%', zIndex: 1 }}
          ref={setMap}
        >
          {/* Ini adalah sumber peta gratis dari OpenStreetMap */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>

      {/* Top Bar (Tetap sama) */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <img src={iconBack} alt="Back" style={{ width: '20px', height: '20px' }} />
        </button>
        <div className={styles.searchWrapper}>
          <img src={iconSearch} alt="Search" className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Cari lokasi titik temu..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Marker Animasi di Tengah Peta */}
      {/* Karena peta berada di z-index: 1, marker ini dengan z-index: 5 akan melayang di atas peta */}
      <div className={styles.centerMarker}>
        <img src={iconLocation} alt="Pin" className={styles.markerPin} />
      </div>

      {/* TOMBOL LOKASI SAYA (GPS) */}
      <button 
        className={styles.myLocationBtn} 
        onClick={handleGetMyLocation}
        disabled={isLocating}
      >
        <img src={iconGps} alt="GPS" className={`${styles.gpsIcon} ${isLocating ? styles.spinning : ''}`} />
      </button>

      {/* Bottom Card */}
      <div className={styles.bottomCard}>
        <div className={styles.locationHeader}>
          <div className={styles.locationIconBox}>
            <img src={iconLocation} alt="Location" className={styles.locationIcon} />
          </div>
          <div className={styles.locationInfo}>
            <h2 className={styles.locationTitle}>{locationName}</h2>
            <p className={styles.locationAddress}>{locationDetail}</p>
          </div>
        </div>
        
        <button 
          className={styles.confirmBtn} 
          onClick={handleConfirmLocation}
          disabled={isLocating}
        >
          {isLocating ? 'Mendeteksi...' : 'Konfirmasi Titik Temu'}
        </button>
      </div>

    </div>
  );
}