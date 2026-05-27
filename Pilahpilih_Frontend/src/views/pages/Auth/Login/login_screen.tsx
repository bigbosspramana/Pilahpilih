import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Aktifkan kembali useNavigate

import MainLayout from "@/views/layouts/MainLayout/main_layout";
import style from "./login_screen.module.css";
import Button from "@/views/components/Button/button";
import InputField from "@/views/components/Field/field"; // ✅ Impor kembali komponen kustom

import logoLeaf from "@/assets/icons/logo-white.svg";
import iconEnvelope from "@/assets/icons/email-gray.svg";
import iconLock from "@/assets/icons/lock-gray.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Inisialisasi fungsi navigasi rute

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
          "Content-Type": "application/json",
          "Accept": "application/json", // Wajib berdasarkan dokumentasi API [cite: 136, 137, 138]
        },
        body: JSON.stringify({
          email: email,       // Sesuai dokumentasi body parameter [cite: 140]
          password: password, // Sesuai dokumentasi body parameter [cite: 142]
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal melakukan login. Periksa kembali akun Anda.");
      }

      console.log("Login Berhasil, Token User:", result);

      // Simpan token autentikasi ke localStorage untuk fetching endpoint yang terkunci (Auth)
      if (result.token) {
        localStorage.setItem("user_token", result.token);
        localStorage.setItem("user_role", result.user.role); // 'buyer' atau 'seller' sesuai API [cite: 96, 99]
        localStorage.setItem("user_name", result.user.full_name);
      }

      alert("Selamat Datang Kembali!");

      // ✅ Mengalihkan halaman menggunakan router virtual React, bukan file fisik
      navigate("/dashboard");


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
        {/* ✅ Menggunakan kembali InputField kustom yang bersih dan mendukung ikon */}
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
        <a href="/register" className={style.registerLink}>
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