import { useEffect, useState } from "react";
import BuyerDashboard from "./pages/Buyer/dashboard_screen";
import SellerDashboard from "./pages/Seller/dashboard_screen";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedRole = localStorage.getItem("user_role");
    const savedName = localStorage.getItem("user_name");
    const token = localStorage.getItem("user_token");
    
    setRole(savedRole);
    setUserName(savedName);

    // Ambil data dari API Laravel sesuai Role pengguna
    if (savedRole === "buyer") {
      // Ambil semua produk untuk pembeli (GET api/products)
      fetch("http://127.0.0.1:8000/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data.products || []))
        .catch((err) => console.error("Gagal memuat produk:", err));
    } else if (savedRole === "seller") {
      // Ambil daftar transaksi milik supplier (GET api/seller/orders)
      fetch("http://127.0.0.1:8000/api/seller/orders", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => setOrders(data.orders || []))
        .catch((err) => console.error("Gagal memuat pesanan supplier:", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("Berhasil keluar akun.");
    window.location.href = "/login";
  };

  // Switcher Tampilan Berdasarkan Nilai Role dari Database
  if (role === "buyer") {
    return <BuyerDashboard userName={userName} products={products} onLogout={handleLogout} />;
  }

  if (role === "seller") {
    return <SellerDashboard userName={userName} orders={orders} onLogout={handleLogout} />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h3>Memuat otorisasi panel dashboard...</h3>
    </div>
  );
}