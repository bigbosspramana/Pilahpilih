import React from "react";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import styles from "./dashboardseller_screen.module.css";

// Import Icons Lokal
import iconBox from "@/assets/icons/icon-box-green.svg"; // Sesuaikan path icon
import iconBag from "@/assets/icons/icon-bag-green.svg";
import iconTrendUp from "@/assets/icons/icon-trend-green.svg";
import iconChevronRight from "@/assets/icons/icon-arrow-right-grey.svg";
import BottomNav from "@/views/components/BottomNavbar/bottomnav";

// Interface Data Aktivitas
interface Activity {
  id: string;
  statusText: string;
  statusCode: "Pesanan" | "Dikirim" | "Diproses";
  customerName: string;
  orderId: string;
  avatarUrl: string;
}

export default function DashboardScreen() {
  // Mock Data untuk Aktivitas
  const recentActivities: Activity[] = [
    {
      id: "1",
      statusText: "Pesanan",
      statusCode: "Pesanan",
      customerName: "Budi Santoso",
      orderId: "ID Pesanan: #OD1-121201",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: "2",
      statusText: "Dikirim",
      statusCode: "Dikirim",
      customerName: "Budi Santoso",
      orderId: "ID Pesanan: #OD1-121201",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: "3",
      statusText: "Diproses",
      statusCode: "Diproses",
      customerName: "Michelle Santoso",
      orderId: "ID Pesanan: #OD1-121201",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    },
  ];

  return (
    <MainLayout
      title="Pilahpilih"
      alignLeft={true}
      hideBackButton={true}
      noShadow={false}
      rightProfile="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" // Bisa diisi dengan URL gambar profil jika ada
    >
      <div className={styles.container}>
        {/* 1. Header Greeting */}
        <div className={styles.greetingSection}>
          <p className={styles.dashboardLabel}>DASHBOARD</p>
          <h1 className={styles.greetingTitle}>Pagi, Hartono</h1>
        </div>

        {/* 2. Statistik Cards */}
        <div className={styles.statsContainer}>
          {/* Card 1: Produk Terpesan */}
          <div className={styles.statsCard}>
            <div className={styles.iconBox}>
              <img src={iconBox} alt="Box" className={styles.iconLocal} />
            </div>
            <h2 className={styles.statsTitle}>PRODUK TERPESAN</h2>
            <p className={styles.statsValue}>12</p>
            <p className={`${styles.statsDesc} ${styles.textGreen}`}>
              <img
                src={iconTrendUp}
                alt="Trend Up"
                style={{ width: "12px", height: "12px" }}
              />
              Penjualan meningkat 10%
            </p>
          </div>

          {/* Card 2: Produk di Etalase */}
          <div className={styles.statsCard}>
            <div className={styles.iconBox}>
              <img src={iconBag} alt="Bag" className={styles.iconLocal} />
            </div>
            <h2 className={styles.statsTitle}>PRODUK DI ETALASE</h2>
            <p className={styles.statsValue}>35</p>
            <p className={`${styles.statsDesc} ${styles.textGray}`}>
              12 item produk telah terjual
            </p>
          </div>
        </div>

        {/* 3. Aktivitas yang Sedang Berlangsung */}
        <div className={styles.activitySection}>
          <div className={styles.activityHeader}>
            <h2 className={styles.activityTitle}>
              Aktivitas yang sedang berlangsung
            </h2>
          </div>

          <div className={styles.activityList}>
            {recentActivities.map((activity) => (
              <div key={activity.id} className={styles.activityCard}>
                <div className={styles.activityRow}>
                  {/* Badge Status */}
                  <span
                    className={`${styles.badge} ${styles[`badge${activity.statusCode}`]}`}
                  >
                    {activity.statusText}
                  </span>

                  {/* Info Customer */}
                  <div className={styles.activityRow}>
                    <img
                      src={activity.avatarUrl}
                      alt={activity.customerName}
                      className={styles.avatar}
                    />
                    <div className={styles.activityInfo}>
                      <h3 className={styles.customerName}>
                        {activity.customerName}
                      </h3>
                      <p className={styles.orderId}>{activity.orderId}</p>
                    </div>
                  </div>
                </div>
                <img
                  src={iconChevronRight}
                  alt="Detail"
                  className={styles.chevronIcon}
                />
              </div>
            ))}
          </div>
        </div>
        <BottomNav activeTab="home" role='seller'/>
      </div>
    </MainLayout>
  );
}
