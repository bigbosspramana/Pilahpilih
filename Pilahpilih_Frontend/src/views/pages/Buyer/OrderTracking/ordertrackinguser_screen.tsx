import React, { useState } from "react";
import styles from "./ordertrackinguser_screen.module.css";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
// Import Icon Local (sesuai instruksi)
import iconChat from '@/assets/icons/icon-chat.svg';
import iconPhone from '@/assets/icons/icon-phone.svg';
import iconLocation from '@/assets/icons/icon-location.svg';
import iconTruck from '@/assets/icons/icon-truck-white.svg';
import iconCheck from '@/assets/icons/icon-check-circle-1.svg';
import iconBox from '@/assets/icons/icon-inventory-off.svg';
import iconLeaf from '@/assets/icons/icon-leaf-off.svg';

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'current' | 'completed' | 'pending';
  icon: string;
}

export default function OrderTrackingUser() {
  const mockTrackingSteps: TrackingStep[] = [
    {
      id: "step_1",
      title: "Dikirim",
      description:
        "Pesanan sedang dalam perjalanan ke lokasimu oleh Kurir Budi Santoso.",
      time: "12 Okt, 14:30",
      status: "current",
      icon: iconTruck,
    },
    {
      id: "step_2",
      title: "Diproses",
      description:
        "Produk telah diperiksa kualitasnya dan dikemas dengan aman.",
      time: "12 Okt, 12:15",
      status: "completed",
      icon: iconCheck,
    },
    {
      id: "step_3",
      title: "Pesanan Dibuat",
      description:
        "Pembayaran terverifikasi. Supplier sedang menyiapkan hasil panenmu.",
      time: "12 Okt, 11:45",
      status: "completed",
      icon: iconCheck,
    },
    {
      id: "step_4",
      title: "Tiba",
      description: "Pesanan sampai di tujuan dan diterima oleh pelanggan.",
      time: "Estimasi 14:45",
      status: "pending",
      icon: iconBox,
    },
  ];

  return (
    <MainLayout
      title="Order Tracking"
      alignLeft={true}
      hideBackButton={false}
      noShadow={false}
    >
      <div className={styles.container}>
        {/* CARD 1: Detail Pengiriman */}
        <div className={styles.card}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>
              Detail
              <br />
              Pengiriman
            </h1>
            <span className={styles.invoiceId}>INV/20231012/PP/912</span>
          </div>

          <div className={styles.courierBox}>
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
              alt="Kurir"
              className={styles.avatar}
            />
            <div className={styles.courierInfo}>
              <p className={styles.courierRole}>Kurir PilahPilih</p>
              <h2 className={styles.courierName}>Budi Santoso</h2>
            </div>
            <div className={styles.actionBtns}>
              <button
                className={`${styles.iconBtn} ${styles.btnChat}`}
                aria-label="Chat Kurir"
              >
                <img
                  src={iconChat}
                  alt="Chat"
                  className={`${styles.iconLocal} ${styles.iconWhite}`}
                />
              </button>
              <button
                className={`${styles.iconBtn} ${styles.btnCall}`}
                aria-label="Telepon Kurir"
              >
                <img src={iconPhone} alt="Call" className={styles.iconLocal} />
              </button>
            </div>
          </div>

          <div className={styles.addressSection}>
            <img
              src={iconLocation}
              alt="Location"
              className={styles.addressIcon}
            />
            <div className={styles.addressDetails}>
              <p className={styles.addressLabel}>Alamat Pengiriman</p>
              <p className={styles.addressText}>
                Apartemen Green Garden, Tower B<br />
                No. 12, Kebon Jeruk, Jakarta Barat
              </p>
            </div>
          </div>
        </div>

        {/* CARD 2: Status Pesanan */}
        <div className={styles.card}>
          <h2 className={styles.statusTitle}>Status Pesanan</h2>

          <div className={styles.timeline}>
            {mockTrackingSteps.map((step, index) => {
              // Menentukan warna background node
              let nodeClass = styles.nodeCompleted;
              let imgClass = styles.nodeImgDark;
              let lineClass = styles.lineActive;

              if (step.status === "current") {
                nodeClass = styles.nodeCurrent;
                imgClass = styles.iconWhite;
              } else if (step.status === "pending") {
                nodeClass = styles.nodePending;
                imgClass = styles.nodeImgGray;
                lineClass = styles.linePending;
              }

              // Jika step sebelumnya pending, garis di atas step ini harus abu-abu
              if (
                index > 0 &&
                mockTrackingSteps[index - 1].status === "pending"
              ) {
                lineClass = styles.linePending;
              }

              return (
                <div
                  key={step.id}
                  className={`${styles.timelineItem} ${lineClass}`}
                >
                  <div className={`${styles.nodeIcon} ${nodeClass}`}>
                    <img
                      src={step.icon}
                      alt="Status"
                      className={`${styles.nodeImg} ${imgClass}`}
                    />
                  </div>

                  <div className={styles.timelineContent}>
                    <h3
                      className={`${styles.stepTitle} ${step.status === "pending" ? styles.stepTitlePending : ""}`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`${styles.stepDesc} ${step.status === "pending" ? styles.stepDescPending : ""}`}
                    >
                      {step.description}
                    </p>
                    <p className={styles.stepTime}>{step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sustainability Banner */}
          <div className={styles.sustainBanner}>
            <div className={styles.bannerIconWrapper}>
              <img src={iconLeaf} alt="Leaf" className={styles.bannerIcon} />
            </div>
            <div className={styles.bannerContent}>
              <h3 className={styles.bannerTitle}>Pilihan Berkelanjutan</h3>
              <p className={styles.bannerDesc}>
                Kamu telah menyelamatkan 2.4kg produk pangan hari ini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
