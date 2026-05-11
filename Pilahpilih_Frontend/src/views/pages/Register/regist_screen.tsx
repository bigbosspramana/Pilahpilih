import { useState } from "react";
import styles from "./regist_screen.module.css";
import InputField from "@/views/components/Field/field";
import Button from "@/views/components/Button/button";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import IconBuyer from "@/assets/icons/buyer.svg";
import IconSupplier from "@/assets/icons/supplier.svg";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.role) {
      alert("Silakan pilih peran Anda terlebih dahulu!");
      return;
    }

    console.log("Register Data:", formData);
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
            {/* Opsi 1: Pembeli / Konsumen */}
            <button
              type="button"
              className={`${styles.roleCard} ${formData.role === "pembeli" ? styles.roleActive : ""}`}
              onClick={() => handleChange("role", "pembeli")}
            >
              <img src={IconBuyer} alt="" className={styles.iconButton} />
              Pembeli
            </button>

            <button
              type="button"
              className={`${styles.roleCard} ${formData.role === "mitra" ? styles.roleActive : ""}`}
              onClick={() => handleChange("role", "mitra")}
            >
              <img src={IconSupplier} alt="" className={styles.iconButton} />
              Mitra (Petani)
            </button>
          </div>
        </div>

        <InputField
          label="NAMA LENGKAP"
          placeholder="Masukkan nama lengkap Anda"
          //   value={formData.fullName}
          //   onChange={(e) => handleChange('fullName', e.target.value)}
        />

        <InputField
          label="EMAIL"
          type="email"
          placeholder="Masukkan email Anda"
          //   value={formData.email}
          //   onChange={(e) => handleChange('email', e.target.value)}
        />

        <InputField
          label="NOMOR TELEPON"
          type="number"
          placeholder="Masukkan nomor telepon Anda"
          //   value={formData.phone}
          //   onChange={(e) => handleChange('phone', e.target.value)}
        />

        <InputField
          label="KATA SANDI"
          type="password"
          placeholder="Buat kata sandi Anda"
          //   value={formData.password}
          //   onChange={(e) => handleChange('password', e.target.value)}
        />

        <InputField
          label="KONFIRMASI KATA SANDI"
          type="password"
          placeholder="Ulangi kata sandi Anda"
          //   value={formData.confirmPassword}
          //   onChange={(e) => handleChange('confirmPassword', e.target.value)}
        />

        <div className={styles.buttonWrapper}>
          <Button type="submit" variant="primary" className={styles.fullButton}>
            Daftar Sekarang
          </Button>
        </div>
      </form>

      <p className={styles.footerText}>
        Sudah memiliki akun?{" "}
        <a href="/login" className={styles.link}>
          Masuk
        </a>
      </p>
    </MainLayout>
  );
}
