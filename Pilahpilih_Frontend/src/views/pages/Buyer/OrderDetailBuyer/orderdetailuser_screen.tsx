import React, { useState } from "react";
import styles from "./orderdetailuser_screen.module.css";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
// Import Icon Local (sesuai instruksi)
import iconTruck from "@/assets/icons/icon-truck-green.svg";
import iconLocation from "@/assets/icons/icon-location.svg";
import iconWallet from "@/assets/icons/icon-wallet.svg";
import iconChat from "@/assets/icons/icon-chat-green.svg";
import iconCheckCircle from "@/assets/icons/icon-check-circle.svg";
import OrderDetailItem from "@/views/components/OrderDetailItem/orderdetailitem";

export default function OrderDetailUser() {
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <MainLayout
      title="Order Detail"
      alignLeft={true}
      hideBackButton={false}
      noShadow={false}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.headerTop}>
            <span className={styles.orderLabel}>ORDER ID</span>
            <span className={styles.statusBadge}>Diproses</span>
          </div>
          <h1 className={styles.orderIdTitle}>#INV-20231024-8821</h1>
          <p className={styles.orderDate}>Dipesan pada 24 Okt 2023, 09:42</p>
        </div>

        {/* 2. Estimasi Tiba / Pertemuan */}
        <div className={`${styles.card} ${styles.estimasiCard}`}>
          <div className={styles.estimasiInfo}>
            <div className={styles.iconBox}>
              <img src={iconTruck} alt="Truck" className={styles.iconLocal} />
            </div>
            <div>
              <p className={styles.estimasiLabel}>Estimasi Tiba / Temu</p>
              <p className={styles.estimasiValue}>Besok, 25 Okt</p>
            </div>
          </div>
          <button className={styles.trackBtn}>Lacak Pesanan</button>
        </div>

        {/* 3. Daftar Produk */}
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Daftar Produk</h2>
            <span className={styles.itemCount}>2 item</span>
          </div>

          {/* Item 1 */}
          <OrderDetailItem
            image="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=200&auto=format&fit=crop"
            name="Wortel Organik Brastagi"
            variant="500g • Grade A"
            price={12500}
            qty={1}
          />

          {/* Panggil Komponen untuk Produk Kedua (Dengan Badge Rescued) */}
          <OrderDetailItem
            image="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop"
            name="Tomat Cherry Matang"
            variant="250g • Kualitas Matang Sempurna"
            price={18000}
            qty={2}
            isRescued={true}
          />
        </div>

        {/* 4. Alamat Pengiriman / Titik Temu */}
        <div className={styles.card}>
          <div className={styles.addressHeader}>
            <img
              src={iconLocation}
              alt="Location"
              className={styles.iconLocal}
            />
            <h2 className={styles.addressHeaderTitle}>
              Titik Temu / Pengiriman
            </h2>
          </div>
          <div className={styles.addressDetails}>
            <p className={styles.addressName}>Budi Sudarsono</p>
            <p>+62 812-3456-7890</p>
            <p>
              Apartemen Green View, Tower B<br />
              Lantai 12 No. 8A
              <br />
              Jl. Merdeka Barat No. 12, Kebayoran Baru
              <br />
              Jakarta Selatan, 12110
            </p>
          </div>
        </div>

        {/* 5. Metode Pembayaran */}
        <div className={styles.card}>
          <div className={styles.addressHeader}>
            <img src={iconWallet} alt="Wallet" className={styles.iconLocal} />
            <h2 className={styles.addressHeaderTitle}>Pembayaran</h2>
          </div>
          <div className={styles.paymentRow}>
            <div>
              <p className={styles.paymentMethodLabel}>Metode</p>
              <p className={styles.paymentMethodName}>GoPay</p>
            </div>
            <img
              src={iconCheckCircle}
              alt="Success"
              className={styles.iconLocal}
            />
          </div>
        </div>

        {/* 6. Rincian Pembayaran & Footer Actions */}
        <div className={`${styles.card} ${styles.cardFooter}`}>
          <h2
            className={styles.addressHeaderTitle}
            style={{ marginBottom: "1rem" }}
          >
            Rincian Pembayaran
          </h2>

          <div className={styles.summaryRow}>
            <span>Subtotal Produk</span>
            <span className={styles.summaryVal}>{formatRupiah(48500)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Ongkos Kirim / Titik Temu</span>
            <span className={styles.summaryVal}>{formatRupiah(10000)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Biaya Layanan & Penanganan</span>
            <span className={styles.summaryVal}>{formatRupiah(2000)}</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>
              Total
              <br />
              Pembayaran
            </span>
            <h2 className={styles.totalPrice}>{formatRupiah(60500)}</h2>
          </div>

          <button className={styles.btnSecondary}>
            <img
              src={iconChat}
              alt="Chat"
              className={styles.iconLocal}
              style={{ width: "16px", height: "16px" }}
            />
            Hubungi Penjual
          </button>
          <button className={styles.btnPrimary}>Bantuan Pesanan</button>
        </div>
      </div>
    </MainLayout>
  );
}
