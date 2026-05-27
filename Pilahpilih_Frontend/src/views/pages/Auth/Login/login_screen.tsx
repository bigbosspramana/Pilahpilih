import { useState, useEffect } from "react";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import style from "./login_screen.module.css";
import Button from "@/views/components/Button/button";
import InputField from "@/views/components/Field/field";

// Impor komponen anak dashboard Anda (sesuaikan path foldernya)
import BuyerDashboard from "@/views/pages/Buyer/DashboardBuyer/dashboarduser_screen";
import SellerDashboard from "@/views/pages/Seller/DashboardSeller/dashboardseller_screen";

import logoLeaf from "@/assets/icons/logo-white.svg";
import iconEnvelope from "@/assets/icons/email-gray.svg";
import iconLock from "@/assets/icons/lock-gray.svg";

export default function LoginPage() {
  // State untuk Form Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // State Pelacak Autentikasi setelah Sukses Login
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Cek status login saat halaman pertama kali dimuat (Auto-login jika token masih ada)
  useEffect(() => {
    const savedRole = localStorage.getItem("user_role");
    const savedName = localStorage.getItem("user_name");
    const token = localStorage.getItem("user_token");

    if (token && savedRole) {
      setRole(savedRole);
      setUserName(savedName);
      loadDashboardData(savedRole, token);
    }
  }, []);

  // Fungsi Pusat untuk mengambil data dari API Laravel sesuai Peran Pengguna
  const loadDashboardData = (userRole: string, token: string) => {
    if (userRole === "buyer") {
      // Ambil semua produk untuk pembeli (GET api/products) [cite: 8, 146]
      fetch("http://127.0.0.1:8000/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data.products || []))
        .catch((err) => console.error("Gagal memuat produk:", err));
    } else if (userRole === "seller") {
      // Ambil daftar transaksi milik supplier (GET api/seller/orders) [cite: 22, 581]
      fetch("http://127.0.0.1:8000/api/seller/orders", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => setOrders(data.orders || []))
        .catch((err) => console.error("Gagal memuat pesanan supplier:", err));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Silakan isi email dan kata sandi Anda!");
      return;
    }

    setLoading(true);

    try {
      // Menembak endpoint login sesuai dokumentasi API PilahPilih [cite: 7, 121, 133]
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: email,       // [cite: 124, 140]
          password: password, // [cite: 125, 142]
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal melakukan login. Periksa kembali akun Anda.");
      }

      console.log("Login Berhasil, Token User:", result);
      alert("Selamat Datang Kembali!");

      // 1. Simpan tanda pengenal ke localStorage
      if (result.token) {
        localStorage.setItem("user_token", result.token);
        localStorage.setItem("user_role", result.user.role); // 'buyer' atau 'seller' 
        localStorage.setItem("user_name", result.user.full_name);
        
        // 2. Set state lokal agar UI langsung berubah secara real-time
        setRole(result.user.role);
        setUserName(result.user.full_name);

        // 3. Picu penarikan data API untuk dashboard tujuan
        loadDashboardData(result.user.role, result.token);
      }

    } catch (error: any) {
      console.error("Error Login:", error);
      alert(error.message || "Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Panggil API logout jika diperlukan (POST api/logout) [cite: 12, 266]
    localStorage.clear();
    setRole(null);
    setUserName(null);
    alert("Berhasil keluar akun.");
  };

  // ==========================================
  // LOGIKA SWITCHER TAMPILAN BERDASARKAN PERAN
  // ==========================================
  if (role === "buyer") {
    return <BuyerDashboard userName={userName} products={products} onLogout={handleLogout} />;
  }

  if (role === "seller") {
    return <SellerDashboard userName={userName} orders={orders} onLogout={handleLogout} />;
  }

  // Jika belum login (role null), tampilkan halaman form login standar
  return (
    <MainLayout
      title="PilahPilih"
      noShadow
      hideBackButton
      contentClassName={style.backgroundScreen}
    >
      <div style={{ paddingBottom: "20px" }}>
        <div className={style.logoWrapper}>
          <div className={style.logoBox}>
            <img src={logoLeaf} alt="PilahPilih Logo" className={style.logoIcon} />
          </div>
        </div>

        <div className={style.headerText}>
          <h1 className={style.title}>Selamat Datang Kembali</h1>
          <p style={{ margin: "4px 0 0 0" }} className={style.subtitle}>
            Lanjutkan perjalanan panen sehat Anda bersama kami.
          </p>
        </div>

        <form onSubmit={handleLogin} className={style.formContainer}>
        <InputField
          label="EMAIL"
          type="email"
          placeholder="Masukkan email Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={iconEnvelope}
          className="mb-4"
        />

        <InputField
          label="KATA SANDI"
          type="password"
          placeholder="Masukkan password Anda"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={iconLock}
          className="mb-4"
        />

          <div className={style.forgotPasswordWrapper}>
            <a href="/forgot-password" className={style.forgotPassword}>
              Lupa Kata Sandi?
            </a>
          </div>

          <Button type="submit" variant="primary" className={style.btn} disabled={loading}>
            {loading ? "Memverifikasi..." : "Masuk Sekarang"}
          </Button>
        </form>

        <p className={style.Text}>
          Belum punya akun?{" "}
          <a href="/register" className={style.registerLink}>
            Daftar
          </a>
        </p>

        <div className={style.infoCard}>
          <div className={style.infoIconWrapper}>
            <img src={logoLeaf} alt="Info" className={style.infoIcon} />
          </div>
          <div className={style.infoContent}>
            <h4 className={style.infoTitle}>Misi PilahPilih</h4>
            <p className={style.infoText}>
              Every purchase helps save local harvests and reduce food waste.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}