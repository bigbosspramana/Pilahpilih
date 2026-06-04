import React from "react";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import styles from "./profileseller_screen.module.css";

// Import Icons Lokal
import iconVerified from "@/assets/icons/icon-verified.svg"; // Sesuaikan nama file dengan milikmu
import iconEdit from "@/assets/icons/icon-edit-white.svg";
import BottomNav from "@/views/components/BottomNavbar/bottomnav";

export default function ProfileSeller() {
  return (
    <MainLayout
      title="Pilahpilih"
      hideBackButton={true}
      alignLeft={true}
      noShadow={true}
      // Menyisipkan class agar MainLayout tidak memberikan jarak/padding di kiri-kanan-atas
      contentClassName={styles.noPaddingContent}
    >
      {/* 1. Cover Image */}
      <div className={styles.coverContainer}>
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"
          alt="Market Cover"
          className={styles.coverImg}
        />
      </div>

      {/* Area Konten Utama (Berisi Padding) */}
      <div className={styles.content}>
        {/* 2. Avatar */}
        <div className={styles.avatarWrapper}>
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
            alt="Hartono Palimbungan"
            className={styles.avatar}
          />
        </div>

        {/* 3. Identitas & Badge */}
        <h1 className={styles.name}>Hartono Palimbungan</h1>
        <div className={styles.verifiedBadge}>
          <img
            src={iconVerified}
            alt="Verified Supplier"
            className={styles.badgeIcon}
          />
          <span className={styles.badgeText}>Verified Supplier</span>
        </div>

        {/* 4. Tombol Edit Profil */}
        <button className={styles.editBtn}>
          <img src={iconEdit} alt="Edit" className={styles.editIcon} />
          Edit Profile
        </button>

        {/* 5. Kartu Statistik */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h2 className={styles.statValue}>100+</h2>
            <span className={styles.statLabel}>TOTAL PENJUALAN</span>
          </div>

          <div className={styles.statCard}>
            <h2 className={styles.statValue}>35</h2>
            <span className={styles.statLabel}>ITEM PENJUALAN</span>
          </div>
        </div>

        {/* 6. Tombol Logout */}
        <button className={styles.logoutBtn}>Logout</button>
        <BottomNav activeTab="profile" role="seller" />
      </div>
    </MainLayout>
  );
}
