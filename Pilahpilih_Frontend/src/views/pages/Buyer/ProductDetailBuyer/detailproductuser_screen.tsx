import React, { useState } from "react";
import styles from "./detailproductuser_screen.module.css";

import sellerAvatar from "@/assets/images/seller-avatar.svg";

// Import Icon Local (sesuai instruksi)
import iconInfo from "@/assets/icons/icon-info.svg";
import iconBox from "@/assets/icons/icon-box.svg";
import iconSparkle from "@/assets/icons/icon-sparkle.svg";
import iconVerified from "@/assets/icons/icon-verified.svg";
import iconLocation from "@/assets/icons/icon-location.svg";
import iconChat from "@/assets/icons/icon-chat.svg";
import MainLayout from "@/views/layouts/MainLayout/main_layout";

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#A0AAB0"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function ProductDetailUser() {
  const productImages = [
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=1000&auto=format&fit=crop",
  ];

  const [activeImg, setActiveImg] = useState(productImages[0]);
  const [showTooltip, setShowTooltip] = useState(false);

  // Fungsi toggle tooltip
  const handleInfoClick = () => {
    setShowTooltip(!showTooltip);
  };
  const HeaderRightContent = (
    <div className={styles.headerActions}>
      <button className={styles.iconBtn} aria-label="Keranjang">
        <CartIcon />
      </button>
    </div>
  );

  return (
    <MainLayout
      title="PilahPilih"
      alignLeft={true}
      hideBackButton={false}
      noShadow={false}
      contentClassName={styles.contentScreen}
      rightComponent={HeaderRightContent}
    >
      <div className={styles.container}>
        <div className={styles.mainImageContainer}>
          <img src={activeImg} alt="Tomat Organik" className={styles.mainImage} />
        </div>
        <div className={styles.thumbnailContainer}>
          {productImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              className={`${styles.thumbnail} ${activeImg === imageUrl ? styles.thumbnailActive : ""}`}
              onClick={() => setActiveImg(imageUrl)}
            />
          ))}
        </div>

        {/* Product Title & Condition */}
        <h1 className={styles.title}>Tomat Organik</h1>

        <div className={styles.conditionWrapper}>
          <button className={styles.infoButton} onClick={handleInfoClick}>
            <img src={iconInfo} alt="Info" className={styles.iconLocal} />
          </button>
          <h2 className={styles.conditionText}>Slightly Imperfect</h2>

          {/* Tooltip Bubble yang muncul jika state true */}
          {showTooltip && (
            <div className={styles.tooltipBubble}>
              <strong>Slightly Imperfect:</strong> Produk ini mungkin memiliki
              sedikit goresan alami atau bentuk yang tidak simetris secara
              visual, namun kualitas rasa, nutrisi, dan kesegarannya tetap 100%
              sempurna.
            </div>
          )}
        </div>

        {/* Pricing & Stock */}
        <div className={styles.priceContainer}>
          <h2 className={styles.currentPrice}>Rp 12.500</h2>
          <span className={styles.originalPrice}>Rp 28.000</span>
          <span className={styles.discountBadge}>Save 55%</span>
        </div>

        <div className={styles.stockInfo}>
          <img
            src={iconBox}
            alt="Stock"
            className={styles.iconLocal}
            style={{ width: "14px", height: "14px" }}
          />
          <span>
            Stok Tersedia: <span className={styles.stockBold}>14 kg lagi</span>
          </span>
        </div>

        {/* Description Box */}
        <div className={styles.descBox}>
          <div className={styles.descHeader}>
            <div className={styles.descTitle}>
              <img
                src={iconSparkle}
                alt="Desc"
                className={styles.iconLocal}
                style={{ width: "16px", height: "16px" }}
              />
              <span>DESKRIPSI PRODUK</span>
            </div>
            <img
              src={iconSparkle}
              alt="Sparkles"
              className={styles.iconLocal}
              style={{ width: "24px", height: "24px", opacity: 0.5 }}
            />
          </div>
          <p className={styles.descText}>
            Meskipun memiliki sedikit goresan alami pada kulitnya, tomat-tomat
            ini mencapai tingkat kematangan puncak yang sempurna untuk saus
            artisan atau sup rumahan yang kaya rasa. Dengan memilih produk ini,
            Anda tidak hanya mendapatkan nutrisi organik terbaik, tetapi juga
            membantu mengurangi 2.5kg potensi limbah pangan di lokalitas Anda.
          </p>
        </div>

        {/* Seller Card */}
        <div className={styles.sellerCard}>
          <div className={styles.sellerInfo}>
            <img
              src={sellerAvatar}
              alt="Kebun Hijau Mandiri"
              className={styles.sellerAvatar}
            />
            <div className={styles.sellerDetails}>
              <h3 className={styles.sellerName}>Kebun Hijau Mandiri</h3>
              <div className={styles.verifiedBadge}>
                <img
                  src={iconVerified}
                  alt="Verified"
                  className={styles.iconLocal}
                  style={{ width: "12px", height: "12px" }}
                />
                Verified Supplier
              </div>
              <div className={styles.sellerLocation}>
                <img
                  src={iconLocation}
                  alt="Location"
                  className={styles.iconLocal}
                  style={{ width: "12px", height: "12px" }}
                />
                Bandung Barat
              </div>
            </div>
          </div>

          <button className={styles.chatButton}>
            <img src={iconChat} alt="Chat" className={styles.iconLocal} />
            Chat Penjual
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
