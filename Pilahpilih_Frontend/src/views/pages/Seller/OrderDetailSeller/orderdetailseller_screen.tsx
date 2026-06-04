import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import styles from "./orderdetailseller_screen.module.css";

export default function OrderDetailSeller() {
  const navigate = useNavigate();

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  // Data Mock Detail Pesanan (Berdasarkan Gambar 2)
  const orderDetail = {
    orderId: "#OD1-121201",
    customerName: "Budi Santoso",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    status: "Dikirim", // Status saat ini sedang dikirim / diantar
    totalPayment: 72500,
    address:
      "Jl. Dirgantara No.100, Paropo, Kec. Panakkukang, Kota Makassar, Sulawesi Selatan 90231",
    items: [
      {
        id: "1",
        name: "Kentang Bandung",
        qty: "5 kg",
        pricePerUnit: 8500,
        totalPrice: 42500,
        imageUrl:
          "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: "2",
        name: "Tomat Cherry Matang",
        qty: "2 kg",
        pricePerUnit: 15000,
        totalPrice: 30000,
        imageUrl:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop",
      },
    ],
  };

  return (
    <MainLayout
      title="Detail Pesanan"
      alignLeft={true}
      hideBackButton={false} // Tombol kembali diaktifkan untuk halaman detail
      noShadow={false}
    >
      <div className={styles.container}>
        {/* CARD 1: Informasi Pesanan & Item */}
        <div className={styles.card}>
          <div className={styles.customerHeader}>
            <div className={styles.customerInfo}>
              <img
                src={orderDetail.avatarUrl}
                alt={orderDetail.customerName}
                className={styles.avatar}
              />
              <div>
                <h2 className={styles.name}>{orderDetail.customerName}</h2>
                <p className={styles.orderId}>
                  ID Pesanan: {orderDetail.orderId}
                </p>
              </div>
            </div>
            <span className={styles.statusBadge}>{orderDetail.status}</span>
          </div>

          <div className={styles.itemList}>
            {orderDetail.items.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.itemImg}
                />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemQty}>
                    {item.qty} x {formatRupiah(item.pricePerUnit)}
                  </p>
                </div>
                <p className={styles.itemPrice}>
                  {formatRupiah(item.totalPrice)}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.totalSection}>
            <p className={styles.totalLabel}>Total Pembayaran</p>
            <h3 className={styles.totalValue}>
              {formatRupiah(orderDetail.totalPayment)}
            </h3>
          </div>
        </div>

        {/* CARD 2: Lokasi Titik Temu */}
        <div className={styles.card}>
          <h2 className={styles.sectionLabel}>LOKASI MAP TITIK TEMU</h2>

          <div className={styles.mapWrapper}>
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop"
              alt="Map Lokasi"
              className={styles.mapImg}
            />
            {/* Tombol Overlay untuk membuka peta interaktif/full screen */}
            <button
              className={styles.clickMapOverlay}
              onClick={() => console.log("Membuka Maps Fullscreen...")}
            >
              Klik Map
            </button>
          </div>

          <div>
            <h3 className={styles.addressLabel}>Alamat:</h3>
            <p className={styles.addressText}>{orderDetail.address}</p>
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM ACTION */}
      <div className={styles.bottomAction}>
        {/* Kondisional Rendering berdasarkan Status */}

        {orderDetail.status === "Pesanan" ? (
          <button
            className={styles.btnSiapAntar}
            onClick={() => {
              console.log("Update status ke Diantar...");
              navigate(-1);
            }}
          >
            Pesanan Siap Diantar
          </button>
        ) : orderDetail.status === "Dikirim" ||
          orderDetail.status === "Diantar" ? (
          <button
            className={styles.btnSelesai}
            onClick={() => {
              console.log("Pesanan Diselesaikan!");
              navigate(-1);
            }}
          >
            Selesai
          </button>
        ) : null}
        {/* null berarti jika statusnya 'Selesai', tidak ada tombol yang muncul */}
      </div>
    </MainLayout>
  );
}
