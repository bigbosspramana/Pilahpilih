import React from "react";
import MainLayout from "@/views/layouts/MainLayout/main_layout"; // Sesuaikan path import proyek Anda
import styles from "./dashboardseller_screen.module.css"; // Buat file CSS module pendampingnya
import Button from "@/views/components/Button/button";

// --- Kumpulan Komponen Ikon Elegan ---
const BoxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// --- Interface Props untuk Kompilasi TypeScript ---
interface SellerDashboardProps {
  userName: string | null;
  orders: any[];
  onLogout: () => void;
}

export default function SellerDashboard({ userName, orders, onLogout }: SellerDashboardProps) {
  
  const handleAddProductClick = () => {
    // Aksi ketika tombol tambah produk ditekan (bisa diarahkan ke modal atau rute POST api/products)
    alert("Membuka formulir penambahan komoditas tani baru (POST api/products)");
  };

  // Sisi Kanan Header: Hanya disisipkan Tombol Logout agar Layout Bersih
  const HeaderRightContent = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button variant="outline" onClick={onLogout}>
        Keluar
      </Button>
    </div>
  );

  return (
    <MainLayout
      title="Panel Mitra Tani"
      alignLeft={true}
      hideBackButton={true}
      noShadow={false}
      rightComponent={HeaderRightContent}
    >
      <div className={styles.container} style={{ padding: "24px", fontFamily: "sans-serif" }}>
        
        {/* Welcome Section */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ margin: 0, fontSize: "28px", color: "#1b5e20" }}>Selamat Datang, {userName || "Mitra Tani"}! 🧑‍🌾</h2>
          <p style={{ margin: "4px 0 0 0", color: "#666" }}>Pantau sirkulasi stok pangan organik dan pesanan masuk Anda hari ini.</p>
        </div>

        {/* 1 & 2. Statistik Ringkasan Toko (Cards) */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "32px" }}>
          {/* Card 1: Jumlah Produk Terpesan */}
          <div style={{ flex: 1, padding: "24px", background: "#fff8e1", borderLeft: "6px solid #ffb300", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ color: "#ff8f00", background: "#fff3e0", padding: "12px", borderRadius: "50%" }}>
              <ClipboardIcon />
            </div>
            <div>
              <h5 style={{ margin: "0 0 4px 0", color: "#757575", fontSize: "12px", letterSpacing: "0.5px" }}>PRODUK TERPESAN</h5>
              <h2 style={{ margin: 0, color: "#ff8f00", fontSize: "24px" }}>{orders.length} Pesanan</h2>
            </div>
          </div>

          {/* Card 2: Jumlah Jenis Produk di Etalase */}
          <div style={{ flex: 1, padding: "24px", background: "#e3f2fd", borderLeft: "6px solid #1e88e5", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ color: "#1565c0", background: "#e1f5fe", padding: "12px", borderRadius: "50%" }}>
              <BoxIcon />
            </div>
            <div>
              <h5 style={{ margin: "0 0 4px 0", color: "#757575", fontSize: "12px", letterSpacing: "0.5px" }}>JENIS PRODUK DI ETALASE</h5>
              {/* Sementara di-hardcode 12 Jenis atau bisa diambil dari total array produk milik seller tersebut */}
              <h2 style={{ margin: 0, color: "#1565c0", fontSize: "24px" }}>12 Komoditas</h2>
            </div>
          </div>
        </div>

        {/* 4. Tombol Tambahkan Produk Baru */}
        <div style={{ marginBottom: "40px" }}>
          <Button 
            variant="primary" 
            onClick={handleAddProductClick}
            
          >
            <PlusIcon /> Tambah Produk Jualan
          </Button>
        </div>

        {/* 3. List Pesanan dari Buyer (Tabel Kontrol) */}
        <div>
          <h3 style={{ margin: "0 0 16px 0", color: "#333", fontSize: "20px" }}>Daftar Pesanan Masuk (Buyer)</h3>
          <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            {orders.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
                <p style={{ margin: 0, fontSize: "16px" }}>Belum ada pembeli yang memesan produk segar Anda saat ini.</p>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "#f5f5f5", borderBottom: "1px solid #e0e0e0", color: "#555" }}>
                    <th style={{ padding: "16px" }}>Order ID</th>
                    <th style={{ padding: "16px" }}>Metode Pembayaran</th>
                    <th style={{ padding: "16px" }}>Alamat Pengiriman</th>
                    <th style={{ padding: "16px" }}>Status Pesanan</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.id} style={{ borderBottom: "1px solid #f0f0f0", transition: "background 0.2s" }}>
                      <td style={{ padding: "16px", fontWeight: "600", color: "#1e88e5" }}>#{order.id}</td>
                      <td style={{ padding: "16px", color: "#424242" }}>{order.payment_method || "Transfer Bank"}</td>
                      <td style={{ padding: "16px", color: "#616161" }}>{order.delivery_address || "Alamat tidak dicantumkan"}</td>
                      <td style={{ padding: "16px" }}>
                        <span style={{ 
                          padding: "6px 12px", 
                          borderRadius: "20px", 
                          fontSize: "12px", 
                          fontWeight: "bold",
                          background: order.status === "completed" ? "#e8f5e9" : "#fff3e0",
                          color: order.status === "completed" ? "#2e7d32" : "#ef6c00"
                        }}>
                          {order.status ? order.status.toUpperCase() : "PENDING"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}