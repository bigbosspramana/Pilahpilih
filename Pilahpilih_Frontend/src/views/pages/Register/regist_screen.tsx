import { useState } from "react";
import styles from "./regist_screen.module.css";
import Button from "@/views/components/Button/button";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import IconBuyer from "@/assets/icons/buyer.svg";
import IconSupplier from "@/assets/icons/supplier.svg";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    role: "", // diisi 'buyer' atau 'seller' berdasarkan API
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

    // Validasi Sederhana di Frontend
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
      // Menembak sesuai domain lokal Laragon Anda
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", // Wajib berdasarkan dokumentasi API [cite: 58]
        },
        // BODY PARAMETERS disesuaikan 100% dengan dokumen API PilahPilih [cite: 60, 61, 62, 63, 64, 66, 67]
        body: JSON.stringify({
          full_name: formData.fullName, // Menggunakan full_name 
          email: formData.email,        // [cite: 82]
          password: formData.password,  // [cite: 84]
          password_confirmation: formData.confirmPassword,
          phone: formData.phone,        // [cite: 86]
          role: formData.role,          // 'buyer' atau 'seller' [cite: 97]
          address: "Alamat belum diatur", // Wajib diisi string berdasarkan API 
          account_type: "personal",     // 'personal' atau 'business' [cite: 103, 104]
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal melakukan registrasi");
      }

      console.log("Registrasi Berhasil:", result);
      alert("Akun Anda berhasil didaftarkan!");

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
            {/* Opsi Pembeli disesuaikan nilainya ke 'buyer' sesuai API [cite: 98] */}
            <button
              type="button"
              className={`${styles.roleCard} ${formData.role === "buyer" ? styles.roleActive : ""}`}
              onClick={() => handleChange("role", "buyer")}
            >
              <img src={IconBuyer} alt="" className={styles.iconButton} />
              Pembeli
            </button>

            {/* Opsi Mitra disesuaikan nilainya ke 'seller' sesuai API [cite: 99] */}
            <button
              type="button"
              className={`${styles.roleCard} ${formData.role === "seller" ? styles.roleActive : ""}`}
              onClick={() => handleChange("role", "seller")}
            >
              <img src={IconSupplier} alt="" className={styles.iconButton} />
              Mitra (Petani)
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          <label className={styles.label}>NAMA LENGKAP</label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          <label className={styles.label}>EMAIL</label>
          <input
            type="email"
            placeholder="Masukkan email Anda"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          <label className={styles.label}>NOMOR TELEPON</label>
          <input
            type="text"
            placeholder="Masukkan nomor telepon Anda"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          <label className={styles.label}>KATA SANDI</label>
          <input
            type="password"
            placeholder="Buat kata sandi Anda (Min. 8 karakter)"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
          <label className={styles.label}>KONFIRMASI KATA SANDI</label>
          <input
            type="password"
            placeholder="Ulangi kata sandi Anda"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button type="submit" variant="primary" className={styles.fullButton} disabled={loading}>
            {loading ? "Sedang Memproses..." : "Daftar Sekarang"}
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