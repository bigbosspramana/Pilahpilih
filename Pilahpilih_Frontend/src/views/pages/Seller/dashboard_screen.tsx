import Button from "@/views/components/Button/button";

interface SellerProps {
  userName: string | null;
  orders: any[];
  onLogout: () => void;
}

export default function SellerDashboard({ userName, orders, onLogout }: SellerProps) {
  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h2>Panel Supplier: {userName} 🧑‍🌾</h2>
          <p style={{ color: "#666" }}>Pantau penjualan dan kelola hasil tani Anda secara real-time.</p>
        </div>
        <Button variant="ghost" onClick={onLogout}>Keluar</Button>
      </div>

      {/* Statistik Ringkasan Toko */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <div style={{ flex: 1, padding: "20px", background: "#fff8e1", borderLeft: "5px solid #ffb300", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <h5 style={{ margin: "0 0 8px 0", color: "#555" }}>PRODUK TERPESAN</h5>
          <h2 style={{ margin: 0, color: "#ff8f00" }}>{orders.length} Pesanan</h2>
        </div>
        <div style={{ flex: 1, padding: "20px", background: "#e3f2fd", borderLeft: "5px solid #1e88e5", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <h5 style={{ margin: "0 0 8px 0", color: "#555" }}>JENIS PRODUK DI ETALASE</h5>
          <h2 style={{ margin: 0, color: "#1565c0" }}>12 Jenis</h2>
        </div>
      </div>

      {/* Tombol Aksi Tambah Produk */}
      <div style={{ marginBottom: "32px" }}>
        <Button variant="primary" onClick={() => alert("Membuka form POST api/products...")}>
          + Tambahkan Produk Baru
        </Button>
      </div>

      {/* Tabel List Pesanan Masuk dari Buyer */}
      <h3>Daftar Pesanan Masuk</h3>
      <div style={{ marginTop: "16px", background: "#fff", border: "1px solid #eee", borderRadius: "8px" }}>
        {orders.length === 0 ? (
          <p style={{ padding: "20px", color: "#999", margin: 0 }}>Belum ada pembeli yang memesan produk Anda.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f9f9f9", borderBottom: "1px solid #eee" }}>
                <th style={{ padding: "12px" }}>Order ID</th>
                <th style={{ padding: "12px" }}>Metode Bayar</th>
                <th style={{ padding: "12px" }}>Alamat Kirim</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord: any) => (
                <tr key={ord.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>#{ord.id}</td>
                  <td style={{ padding: "12px" }}>{ord.payment_method}</td>
                  <td style={{ padding: "12px" }}>{ord.delivery_address}</td>
                  <td style={{ padding: "12px", color: "#2e7d32", fontWeight: "bold" }}>{ord.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}