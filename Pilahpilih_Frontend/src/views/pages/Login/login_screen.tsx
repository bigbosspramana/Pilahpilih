// import { useNavigate } from "react-router-dom";

import MainLayout from "@/views/layouts/MainLayout/main_layout";
import style from "./login_screen.module.css";
import Button from "@/views/components/Button/button";

import logoLeaf from "@/assets/icons/logo-white.svg";
import iconEnvelope from "@/assets/icons/email-gray.svg";
import iconLock from "@/assets/icons/lock-gray.svg";
import InputField from "@/views/components/Field/field";

export default function LoginPage() {
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
        // onSubmit={handleLogin}
        className={style.formContainer}
      >
        {/* Input Email */}
        <InputField
          label="EMAIL / NO. TELEPON"
          placeholder="Masukkan email Anda"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          icon={iconEnvelope}
        />

        <InputField
          label="KATA SANDI"
          type="password"
          placeholder="Masukkan password Anda"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          icon={iconLock}
          className="mt-4"
        />

        {/* Lupa Kata Sandi */}
        <div className={style.forgotPasswordWrapper}>
          <a href="/forgot-password" className={style.forgotPassword}>
            Lupa Kata Sandi?
          </a>
        </div>

        {/* Tombol Masuk */}
        <Button variant="primary" className={style.btn}>
          Masuk Sekarang
        </Button>
      </form>

      {/* Bagian Daftar */}
      <p className={style.registerText}>
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
            Setiap pembelian Anda membantu menyelamatkan hasil panen lokal dan
            mengurangi pemborosan pangan.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
