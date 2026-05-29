import React from "react";
import styles from "./historyitem.module.css"; // Sesuaikan path file CSS-mu

// Import ikon yang dibutuhkan oleh card ini
import iconTruck from "@/assets/icons/icon-truck.svg";
import iconBox from "@/assets/icons/icon-box-white.svg";

// Definisikan tipe data untuk props (bisa kamu pisah ke file types.ts jika mau)
export interface OrderButton {
  label: string;
  variant: "primary" | "secondary";
  icon?: string;
}

export interface OrderData {
  id: string;
  orderId: string;
  title: string;
  itemsCount: number;
  dateText: string;
  image: string;
  status: "DIKIRIM" | "DISIAPKAN";
  price: number;
  showProgressBar: boolean;
  currentStepIndex: number;
  buttons: OrderButton[];
}

interface OrderItemCardProps {
  order: OrderData;
}

export default function OrderItemCard({ order }: OrderItemCardProps) {
  // Pindahkan urutan progress ke dalam komponen
  const progressSteps = ["DIPESAN", "DISIAPKAN", "DIKIRIM", "TIBA"];

  // Pindahkan helper format rupiah ke dalam komponen
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    // Hapus atribut key={order.id} dari sini, key hanya ditaruh saat pemanggilan komponen (di file mapping)
    <div className={styles.orderCard}>
      {/* Header Pesanan */}
      <div className={styles.cardHeader}>
        <img
          src={order.image}
          alt={order.title}
          className={styles.productImg}
        />
        <div className={styles.orderInfo}>
          <p className={styles.orderId}>ID: {order.orderId}</p>
          <h2 className={styles.orderTitle}>{order.title}</h2>
          <p className={styles.orderMeta}>
            {order.itemsCount} items • {order.dateText}
          </p>
        </div>
      </div>

      {/* Badge Status */}
      <div
        className={`${styles.statusBadge} ${
          order.status === "DIKIRIM"
            ? styles.badgeDikirIM
            : styles.badgeDisiapkan
        }`}
      >
        <img
          src={order.status === "DIKIRIM" ? iconTruck : iconBox}
          alt="Status"
          className={
            order.status === "DISIAPKAN"
              ? styles.statusIconWhite
              : styles.statusIcon
          }
        />
        {order.status}
      </div>

      <h3 className={styles.priceText}>{formatRupiah(order.price)}</h3>

      {/* Progress Bar (Kondisional) */}
      {order.showProgressBar && (
        <div className={styles.progressTracker}>
          {/* WRAPPER GARIS BARU DITAMBAHKAN DI SINI */}
          <div className={styles.lineWrapper}>
            <div className={styles.progressBackgroundLine}></div>
            <div
              className={styles.progressActiveLine}
              style={{
                width: `${(order.currentStepIndex / (progressSteps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
          {/* ======================================= */}

          {progressSteps.map((step, index) => {
            let dotClass = styles.stepDot;
            if (index < order.currentStepIndex)
              dotClass = styles.stepDotCompleted;
            if (index === order.currentStepIndex)
              dotClass = styles.stepDotCurrent;

            return (
              <div key={index} className={styles.stepContainer}>
                <div className={dotClass}></div>
                <span
                  className={`${styles.stepLabel} ${index > order.currentStepIndex ? styles.stepLabelInactive : ""}`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.buttonGroup}>
        {order.buttons.map((btn, idx) => (
          <button
            key={idx}
            className={`${styles.actionBtn} ${
              btn.variant === "primary"
                ? styles.btnPrimary
                : styles.btnSecondary
            }`}
          >
            {btn.icon && (
              <img
                src={btn.icon}
                alt="Icon"
                className={
                  btn.variant === "primary"
                    ? styles.btnIconWhite
                    : styles.btnIcon
                }
              />
            )}
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
