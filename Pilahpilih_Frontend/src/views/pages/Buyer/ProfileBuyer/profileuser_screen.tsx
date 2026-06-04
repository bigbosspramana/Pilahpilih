import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import styles from "./profileuser_screen.module.css";

// Import Ikon Pendukung
import iconCheck from '@/assets/icons/icon-check-white.svg';
import iconSparkles from '@/assets/icons/icon-star-green.svg';
import iconUserEdit from '@/assets/icons/icon-user-edit.svg';
import iconArrowRight from '@/assets/icons/icon-arrow-right.svg';
import iconLogout from '@/assets/icons/icon-logout.svg';

// Import Ikon Preferensi Usaha (Hitam & Putih) - Pastikan path ini sesuai dengan foldermu
import iconBakeryWhite from '@/assets/icons/icon-bakery-white.svg';
import iconBakeryBlack from '@/assets/icons/icon-bakery-black.svg';
import iconDrinkWhite from '@/assets/icons/icon-juice-white.svg';
import iconDrinkBlack from '@/assets/icons/icon-juice-black.svg';
import iconSauceWhite from '@/assets/icons/icon-food-white.svg';
import iconSauceBlack from '@/assets/icons/icon-food-black.svg';
import iconFishWhite from '@/assets/icons/icon-fish-white.svg';
import iconFishBlack from '@/assets/icons/icon-fish-black.svg';

export default function ProfileUser() {
  // State untuk menyimpan preferensi yang sedang aktif
  const [activePreference, setActivePreference] = useState("Bakery");

  // Data opsi preferensi usaha sekarang menyimpan 2 versi ikon
  const preferencesData = [
    { 
      id: "Bakery", 
      label: "Bakery", 
      iconBlack: iconBakeryBlack, 
      iconWhite: iconBakeryWhite 
    },
    { 
      id: "Minuman & Jus", 
      label: "Minuman & Jus", 
      iconBlack: iconDrinkBlack, 
      iconWhite: iconDrinkWhite 
    },
    { 
      id: "Seasoning & Sauce", 
      label: "Seasoning & Sauce", 
      iconBlack: iconSauceBlack, 
      iconWhite: iconSauceWhite 
    },
    { 
      id: "Catering & Seafood", 
      label: "Catering & Seafood", 
      iconBlack: iconFishBlack, 
      iconWhite: iconFishWhite 
    },
  ];

  return (
    <MainLayout
      title="PilahPilih"
      alignLeft={true}
      hideBackButton={true}
      noShadow={false}
      rightProfile="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
    >
      <div className={styles.container}>
        {/* 1. Profil Pengguna */}
        <div className={styles.profileCard}>
          <div className={styles.avatarWrapper}>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
              alt="Budi Sudarsono"
              className={styles.avatar}
            />
            <div className={styles.verifiedBadge}>
              <img src={iconCheck} alt="Verified" className={styles.badgeIcon} />
            </div>
          </div>
          <h1 className={styles.userName}>Budi Sudarsono</h1>
        </div>

        {/* 2. Kartu Dampak Lingkungan */}
        <div className={styles.impactCard}>
          <p className={styles.impactTitle}>TOTAL RESCUED</p>
          <h2 className={styles.impactValue}>
            1.2 <span className={styles.impactUnit}>ton</span>
          </h2>
          <p className={styles.impactSubtitle}>Produce saved this year</p>
        </div>

        {/* 3. Preferensi Usaha (AI Smart Matching) */}
        <div className={styles.prefsSection}>
          <div className={styles.prefsHeader}>
            <img src={iconSparkles} alt="AI" className={styles.prefsIcon} />
            <h2 className={styles.prefsTitle}>Preferensi Usaha</h2>
          </div>
          <p className={styles.prefsDesc}>
            Bantu AI Smart Matching kami menemukan bahan baku terbaik sesuai
            dengan tipe bisnis kuliner Anda.
          </p>

          <div className={styles.prefsGrid}>
            {preferencesData.map((pref) => {
              const isActive = activePreference === pref.id;

              return (
                <button
                  key={pref.id}
                  type="button" // Pastikan tipe button agar tidak memicu form submit jika ada
                  className={`${styles.prefCard} ${isActive ? styles.prefCardActive : ""}`}
                  onClick={() => setActivePreference(pref.id)}
                >
                  <img
                    // Logika penukaran ikon berdasarkan status aktif
                    src={isActive ? pref.iconWhite : pref.iconBlack}
                    alt={pref.label}
                    className={styles.prefIcon}
                  />
                  <span
                    className={`${styles.prefLabel} ${isActive ? styles.prefLabelActive : ""}`}
                  >
                    {pref.label}
                  </span>
                  {isActive && <div className={styles.activeIndicator}></div>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Edit Profile Menu */}
        <div className={styles.menuCard}>
          <div className={styles.menuLeft}>
            <div className={styles.menuIconBox}>
              <img src={iconUserEdit} alt="Edit" className={styles.menuIcon} />
            </div>
            <div>
              <h3 className={styles.menuTitle}>Edit Profil</h3>
              <p className={styles.menuSubtitle}>Isi data profil</p>
            </div>
          </div>
          <img src={iconArrowRight} alt="Arrow" className={styles.arrowIcon} />
        </div>

        {/* 5. Tombol Keluar */}
        <button className={styles.logoutBtn}>
          <img src={iconLogout} alt="Logout" className={styles.logoutIcon} />
          Keluar dari Akun
        </button>
      </div>
    </MainLayout>
  );
}