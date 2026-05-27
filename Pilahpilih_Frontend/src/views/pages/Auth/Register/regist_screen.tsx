import { useState } from "react";
import styles from "./regist_screen.module.css";
import { useNavigate } from "react-router-dom";
import Button from "@/views/components/Button/button";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import InputField from "@/views/components/Field/field"; //  Gunakan kembali komponen ini
import IconBuyer from "@/assets/icons/buyer.svg";
import IconSupplier from "@/assets/icons/supplier.svg";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "", 
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Silakan pilih peran Anda terlebih dahulu!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Kata sandi dan konfirmasi kata sandi tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      // Menembak sesuai domain lokal Laragon/IP lokal Anda
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", 
        },
        body: JSON.stringify({
          full_name: formData.fullName, 
          email: formData.email,        
          password: formData.password,  
          password_confirmation: formData.confirmPassword,
          phone: formData.phone,        
          role: formData.role,          
          address: "Alamat belum diatur", 
          account_type: "personal",     
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal melakukan registrasi");
      }

      console.log("Registrasi Berhasil:", result);
      alert("Akun Anda berhasil terdaftar!");

      navigate("/");

    } catch (error: any) {
      console.error("Error Registrasi:", error);
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
      contentClassName={styles.backgroundScreen}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Daftar Akun Baru</h1>
        <p className={styles.subtitle}>
          Bergabunglah dengan kami untuk mulai berkontribusi dalam ekosistem
          pangan yang lebih baik.
        </p>
      </div>

      <form onSubmit={handleRegister} className={styles.form}>
        <div className={styles.roleGroup}>
          <label className={styles.label}>DAFTAR SEBAGAI</label>
          <div className={styles.roleContainer}>
            <Button
              type="button"
              className={`${styles.roleCard} ${formData.role === "buyer" ? styles.roleActive : ""}`}
              onClick={() => handleChange("role", "buyer")}
              disabled={loading}
              variant={formData.role === "buyer" ? "primary" : "outline"}
            >
              <img src={IconBuyer} alt="" className={styles.iconButton} />
              Pembeli
            </Button>

            <Button
              type="button"
              className={`${styles.roleCard} ${formData.role === "seller" ? styles.roleActive : ""}`}
              onClick={() => handleChange("role", "seller")}
              disabled={loading}
              variant={formData.role === "seller" ? "primary" : "outline"}
            >
              <img src={IconSupplier} alt="" className={styles.iconButton} />
              Mitra (Petani)
            </Button>
          </div>
        </div>

        {/* 🌟 SEKARANG KODE KEMBALI BERSIH DAN MENGGUNAKAN INPUTFIELD KUSTOM 🌟 */}
        <InputField
          label="NAMA LENGKAP"
          placeholder="Masukkan nama lengkap Anda"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className="mb-4"
        />

        <InputField
          label="EMAIL"
          type="email"
          placeholder="Masukkan email Anda"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="mb-4"
        />

        <InputField
          label="NOMOR TELEPON"
          type="text"
          placeholder="Masukkan nomor telepon Anda"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="mb-4"
        />

        <InputField
          label="KATA SANDI"
          type="password"
          placeholder="Buat kata sandi Anda (Min. 8 karakter)"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="mb-4"
        />

        <InputField
          label="KONFIRMASI KATA SANDI"
          type="password"
          placeholder="Ulangi kata sandi Anda"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          className="mb-6"
        />

        <div className={styles.buttonWrapper}>
          <Button type="submit" variant="primary" className={styles.fullButton} disabled={loading}>
            {loading ? "Sedang Memproses..." : "Daftar Sekarang"}
          </Button>
        </div>
      </form>

      <p className={styles.footerText}>
        Sudah memiliki akun?{" "}
        <a href="/" className={styles.link}>
          Masuk
        </a>
      </p>
    </MainLayout>
  );
}