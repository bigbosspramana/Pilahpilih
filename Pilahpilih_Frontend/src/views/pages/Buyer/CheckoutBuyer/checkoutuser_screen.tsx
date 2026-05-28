import React, { useState } from "react";
import styles from "./checkoutuser_screen.module.css";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
// Import Icon Local (sesuai instruksi)
import iconLocation from "@/assets/icons/icon-location-green.svg";
import iconSearch from "@/assets/icons/icon-search.svg";
import iconLock from "@/assets/icons/icon-lock.svg";

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#A0AAB0"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

interface OrderItem {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
}

export default function CheckoutUser() {
  const [orderItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "Wortel Organik Grade B (Rescued)",
      imageUrl:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=200&auto=format&fit=crop",
      quantity: 2,
      unit: "kg",
      pricePerUnit: 12000,
    },
    {
      id: "2",
      name: "Bayam Hijau Hidroponik",
      imageUrl:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=200&auto=format&fit=crop",
      quantity: 3,
      unit: "ikat",
      pricePerUnit: 5000,
    },
  ]);

  const serviceFee = 1500;
  const subtotal = orderItems.reduce(
    (total, item) => total + item.quantity * item.pricePerUnit,
    0,
  );
  const totalPayment = subtotal + serviceFee;
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
      hideBackButton={false}
      noShadow={false}
      contentClassName={styles.contentScreen}
    >
      <div className={styles.container}>
        <div className={styles.mobileWrapper}>
          {/* Area yang bisa di-scroll */}
          <div className={styles.scrollableContent}>
            <h1 className={styles.headerTitle}>Konfirmasi Pesanan</h1>
            <p className={styles.headerSubtitle}>
              Satu langkah lagi untuk menyelamatkan hasil panen berkualitas.
            </p>

            {/* Card: Titik Bertemu */}
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <img
                  src={iconLocation}
                  alt="Location"
                  className={styles.iconLocal}
                />
                <h2 className={styles.sectionTitle}>Titik Bertemu</h2>
              </div>
              <div className={styles.inputWrapper}>
                <img
                  src={iconSearch}
                  alt="Search"
                  className={styles.inputIcon}
                />
                <input
                  type="text"
                  placeholder="Tentukan tempat bertemu dengan supplier.."
                  className={styles.locationInput}
                />
              </div>
            </section>

            {/* Card: Ringkasan Produk */}
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Ringkasan Produk</h2>
              </div>
              <div className={styles.productList}>
                {orderItems.map((item) => (
                  <div key={item.id} className={styles.productItem}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className={styles.productImg}
                    />
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{item.name}</h3>
                      <p className={styles.productDetail}>
                        {item.quantity} {item.unit} x{" "}
                        {formatRupiah(item.pricePerUnit)}
                      </p>
                    </div>
                    <p className={styles.productPrice}>
                      {formatRupiah(item.quantity * item.pricePerUnit)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className={styles.paymentContainer}>
              <div className={styles.calculationRow}>
                <span>Subtotal Pesanan</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className={styles.calculationRow}>
                <span>Service Fee</span>
                <span>{formatRupiah(serviceFee)}</span>
              </div>

              <div className={styles.divider}></div>

              <h3 className={styles.totalLabel}>TOTAL PEMBAYARAN</h3>
              <h2 className={styles.totalPrice}>
                {formatRupiah(totalPayment)}
              </h2>

              <button className={styles.submitBtn}>Buat Pesanan</button>

              <div className={styles.securePayment}>
                <img src={iconLock} alt="Lock" className={styles.lockIcon} />
                <span>PEMBAYARAN TERENKRIPSI & AMAN</span>
              </div>
            </div>

            {/* Footer PilahPilih */}
            <footer className={styles.appFooter}>
              <h2 className={styles.brandName}>PILAHPILIH</h2>
              <p className={styles.brandDesc}>
                Membangun ekosistem pangan berkelanjutan dengan menghubungkan
                UMKM dan petani lokal secara transparan.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
