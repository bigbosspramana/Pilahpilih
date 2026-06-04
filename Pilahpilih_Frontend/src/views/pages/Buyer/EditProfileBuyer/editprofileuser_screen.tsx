import React, { useState } from "react";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import styles from "./editprofileuser_screen.module.css";

// Import Icons Lokal
import iconCheckHeader from "@/assets/icons/icon-check.svg";
import iconCamera from "@/assets/icons/icon-camera.svg";
import iconLocation from "@/assets/icons/icon-location-green.svg";
import iconChevronDown from "@/assets/icons/icon-dropdown.svg";
import iconBakeryWhite from "@/assets/icons/icon-bakery-white.svg";
import iconBakeryBlack from "@/assets/icons/icon-bakery-black.svg";
import iconDrinkWhite from "@/assets/icons/icon-juice-white.svg";
import iconDrinkBlack from "@/assets/icons/icon-juice-black.svg";
import iconSauceWhite from "@/assets/icons/icon-food-white.svg";
import iconSauceBlack from "@/assets/icons/icon-food-black.svg";
import iconFishWhite from "@/assets/icons/icon-fish-white.svg";
import iconFishBlack from "@/assets/icons/icon-fish-black.svg";

export default function EditProfileUser() {
  // State untuk form
  const [formData, setFormData] = useState({
    fullName: "Andhika Pratama",
    phone: "812 3456 7890",
    businessType: "UMKM Food & Beverage",
    address: "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan, 12190",
  });

  // State array untuk preferensi karena user bisa memilih lebih dari satu
  const [preferences, setPreferences] = useState<string[]>(["Organic Only"]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePreference = (prefId: string) => {
    setPreferences((prev) =>
      prev.includes(prefId)
        ? prev.filter((p) => p !== prefId)
        : [...prev, prefId],
    );
  };

  const handleSave = () => {
    console.log("Data disimpan:", { ...formData, preferences });
    // Logika simpan ke API di sini
  };

  return (
    <MainLayout
      title="Edit Profile"
      alignLeft={true}
      hideBackButton={false}
      noShadow={true}
    >
      <div className={styles.container}>
        {/* 1. Avatar Section */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
              alt="Profile"
              className={styles.avatar}
            />
            <button className={styles.cameraBtn} aria-label="Ubah Foto">
              <img
                src={iconCamera}
                alt="Camera"
                className={styles.cameraIcon}
              />
            </button>
          </div>
          <p className={styles.accountType}>BUYER ACCOUNT</p>
        </div>

        {/* 2. Full Name */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>FULL NAME</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>
        </div>

        {/* 3. Phone Number */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>PHONE NUMBER</label>
            <div className={styles.inputWrapper}>
              <span className={styles.phonePrefix}>+62</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>
        </div>

        {/* 4. Business Type */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>BUSINESS TYPE</label>
            <div className={styles.inputWrapper}>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className={`${styles.inputField} ${styles.selectField}`}
              >
                <option value="UMKM Food & Beverage">
                  UMKM Food & Beverage
                </option>
                <option value="Restaurant">Restaurant</option>
                <option value="Catering">Catering</option>
                <option value="Retail">Retail</option>
              </select>
              <img
                src={iconChevronDown}
                alt="Select"
                className={styles.chevronIcon}
              />
            </div>
          </div>
        </div>

        {/* 5. Delivery Address */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label}>DELIVERY ADDRESS</label>
              <button type="button" className={styles.pinPointBtn}>
                <img src={iconLocation} alt="Pin" className={styles.pinIcon} />
                Pin Point
              </button>
            </div>
            <div className={styles.inputWrapper}>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`${styles.inputField} ${styles.textareaField}`}
              />
            </div>
          </div>
        </div>

        {/* 6. Sourcing Preferences */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>SOURCING PREFERENCES</label>
            <div className={styles.prefContainer}>
              <button
                type="button"
                onClick={() => togglePreference("Bakery")}
                className={`${styles.prefPill} ${preferences.includes("Bakery") ? styles.prefPillActive : styles.prefPillInactive}`}
              >
                <img
                  // Logika perubahan warna icon
                  src={
                    preferences.includes("Bakery")
                      ? iconBakeryWhite
                      : iconBakeryBlack
                  }
                  alt="Bakery"
                  className={styles.prefIcon}
                />
                Bakery
              </button>

              {/* Tombol Rescued Value (Drink/Juice) */}
              <button
                type="button"
                onClick={() => togglePreference("Minuman & Jus")}
                className={`${styles.prefPill} ${preferences.includes("Minuman & Jus") ? styles.prefPillActive : styles.prefPillInactive}`}
              >
                <img
                  // Logika perubahan warna icon
                  src={
                    preferences.includes("Minuman & Jus")
                      ? iconDrinkWhite
                      : iconDrinkBlack
                  }
                  alt="Minuman & Jus"
                  className={styles.prefIcon}
                />
                Minuman & Jus
              </button>

              {/* Tombol Same Day (Fish) */}
              <button
                type="button"
                onClick={() => togglePreference("Catering & Seafood")}
                className={`${styles.prefPill} ${preferences.includes("Catering & Seafood") ? styles.prefPillActive : styles.prefPillInactive}`}
              >
                <img
                  // Logika perubahan warna icon
                  src={
                    preferences.includes("Catering & Seafood")
                      ? iconFishWhite
                      : iconFishBlack
                  }
                  alt="Catering & Seafood"
                  className={styles.prefIcon}
                />
                Catering & Seafood
              </button>

              <button
                type="button"
                onClick={() => togglePreference("Seasoning & Sauce")}
                className={`${styles.prefPill} ${preferences.includes("Seasoning & Sauce") ? styles.prefPillActive : styles.prefPillInactive}`}
              >
                <img
                  // Logika perubahan warna icon
                  src={
                    preferences.includes("Seasoning & Sauce")
                      ? iconSauceWhite
                      : iconSauceBlack
                  }
                  alt="Seasoning & Sauce"
                  className={styles.prefIcon}
                />
                Seasoning & Sauce
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className={styles.bottomAction}>
        <button onClick={handleSave} className={styles.saveBtn}>
          Simpan Perubahan
        </button>
      </div>
    </MainLayout>
  );
}
