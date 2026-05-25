import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Aktifkan jika routing sudah siap

import MainLayout from "@/views/layouts/MainLayout/main_layout";
import style from "./login_screen.module.css";
import Button from "@/views/components/Button/button";

import logoLeaf from "@/assets/icons/logo-white.svg";
import iconEnvelope from "@/assets/icons/email-gray.svg";
import iconLock from "@/assets/icons/lock-gray.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate(); // Jalankan router untuk redirect setelah login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Silakan isi email dan kata sandi Anda!");
      return;
    }

    setLoading(true);

    try {
      // Menembak endpoint login sesuai dokumentasi API PilahPilih
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          // "Authorization": `Bearer ${localStorage.getItem("user_token")}`,
          "Content-Type": "application/json",
          "Accept": "application/json", // Wajib berdasarkan dokumentasi API
        },
        body: JSON.stringify({
          email: email,       // Sesuai dokumentasi body parameter
          password: password, // Sesuai dokumentasi body parameter
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal melakukan login. Periksa kembali akun Anda.");
      }

      console.log("Login Berhasil, Token User:", result);

      // 💡 REKOMENDASI: Simpan token autentikasi ke localStorage/sessionStorage untuk fetching endpoint yang terkunci (Auth)
      if (result.token) {
      localStorage.setItem("user_token", result.token);
      localStorage.setItem("user_role", result.user.role); // 'buyer' atau 'seller' sesuai API
      localStorage.setItem("user_name", result.user.full_name);
      }

      alert("Selamat Datang Kembali!");

      // Alihkan langsung ke halaman dashboard utama
      window.location.href = "/dashboard"; // Ganti dengan path dashboard yang sesuai


    } catch (error: any) {
      console.error("Error Login:", error);
      alert(error.message || "Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout
      title="PilahPilih"
      noShadow
      hideBackButton
      contentClassName={style.backgroundScreen}
    >
      <div className={style.logoWrapper}>
        <div className={style.logoBox}>
          <img
            src={logoLeaf}
            alt="PilahPilih Logo"
            className={style.logoIcon}
          />
        </div>
      </div>

      <div className={style.headerText}>
        <h1 className={style.title}>Selamat Datang Kembali</h1>
        <p className={style.subtitle}>
          Lanjutkan perjalanan panen sehat Anda bersama kami.
        </p>
      </div>

      {/* Bagian Form */}
      <form
        onSubmit={handleLogin}
        className={style.formContainer}
      >
        {/* Input Email Standar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px", position: "relative" }}>
          <label className={style.label}>EMAIL</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <img src={iconEnvelope} alt="" style={{ position: "absolute", left: "12px", width: "20px", height: "20px" }} />
            <input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
            />
          </div>
        </div>

        {/* Input Password Standar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          <label className={style.label}>KATA SANDI</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <img src={iconLock} alt="" style={{ position: "absolute", left: "12px", width: "20px", height: "20px" }} />
            <input
              type="password"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
            />
          </div>
        </div>

        {/* Lupa Kata Sandi */}
        <div className={style.forgotPasswordWrapper}>
          <a href="/forgot-password" className={style.forgotPassword}>
            Lupa Kata Sandi?
          </a>
        </div>

        {/* Tombol Masuk */}
        <Button type="submit" variant="primary" className={style.btn} disabled={loading}>
          {loading ? "Memverifikasi..." : "Masuk Sekarang"}
        </Button>
      </form>

      {/* Bagian Daftar */}
      <p className={style.Text}>
        Belum punya akun?{" "}
        <a href="/regist" className={style.registerLink}>
          Daftar
        </a>
      </p>

      {/* Info Card / Misi PilahPilih */}
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
    </MainLayout>
  );
}