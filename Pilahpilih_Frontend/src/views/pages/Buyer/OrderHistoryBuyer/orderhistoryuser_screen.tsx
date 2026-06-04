import React, { useState } from "react";
import styles from "./orderhistoryuser_screen.module.css";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
// Import Icon Local (sesuai instruksi)
import iconLocation from "@/assets/icons/icon-location-white.svg";
import OrderItemCard from "@/views/components/HistoryItem/historyitem";
import BottomNav from "@/views/components/BottomNavbar/bottomnav";

// --- Type Definitions ---
interface OrderButton {
  label: string;
  variant: "primary" | "secondary";
  icon?: string;
}

interface OrderData {
  id: string;
  orderId: string;
  title: string;
  itemsCount: number;
  dateText: string;
  image: string;
  status: "DIKIRIM" | "DISIAPKAN";
  price: number;
  showProgressBar: boolean;
  currentStepIndex: number; // 0: DIPESAN, 1: DISIAPKAN, 2: DIKIRIM, 3: TIBA
  buttons: OrderButton[];
}

export default function OrderHistoryUser() {
  const [activeTab, setActiveTab] = useState<"Pesanan" | "Selesai">("Pesanan");

  // Urutan Status untuk Progress Bar
  const progressSteps = ["DIPESAN", "DISIAPKAN", "DIKIRIM", "TIBA"];

  // Mock Data
  const mockOrders: OrderData[] = [
    {
      id: "1",
      orderId: "PP-9428102",
      title: "Paket Sayur Organik A",
      itemsCount: 12,
      dateText: "Pesanan Dibuat 12 Okt 2023",
      image:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=200&auto=format&fit=crop",
      status: "DIKIRIM",
      price: 154000,
      showProgressBar: true,
      currentStepIndex: 1,
      buttons: [
        { label: "Lacak Pesanan", variant: "primary", icon: iconLocation },
        { label: "Hubungi Penjual", variant: "secondary" },
      ],
    },
    {
      id: "2",
      orderId: "PP-9428551",
      title: "Paket Buah Tropis Rescued",
      itemsCount: 5,
      dateText: "Pesanan Dibuat Hari Ini, 09:12",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=200&auto=format&fit=crop",
      status: "DISIAPKAN",
      price: 89500,
      showProgressBar: false, // Disembunyikan sesuai gambar kedua
      currentStepIndex: 1,
      buttons: [
        { label: "Rincian Pesanan", variant: "secondary" },
        { label: "Lacak Pesanan", variant: "secondary", icon: iconLocation }, // Iconnya hijau krn di tombol sekunder
      ],
    },
  ];

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <MainLayout
      title="PilahPilih"
      alignLeft={true}
      hideBackButton={true}
      noShadow={false}
      contentClassName={styles.contentScreen}
    >
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Riwayat Pesanan</h1>
          <p className={styles.pageSubtitle}>
            Pantau status pengiriman dan kelola belanjaan segar Anda.
          </p>
        </header>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === "Pesanan" ? styles.tabActive : styles.tabInactive}`}
            onClick={() => setActiveTab("Pesanan")}
          >
            Pesanan
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "Selesai" ? styles.tabActive : styles.tabInactive}`}
            onClick={() => setActiveTab("Selesai")}
          >
            Selesai
          </button>
        </div>

        {/* Order List */}
        <div>
          {mockOrders.map((order) => (
            <OrderItemCard key={order.id} order={order} />
          ))}
        </div>

        <BottomNav activeTab="history" role="buyer"/>

      </div>
    </MainLayout>
  );
}
