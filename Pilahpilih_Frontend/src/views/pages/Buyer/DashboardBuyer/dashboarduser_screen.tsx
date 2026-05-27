import React from "react";
import MainLayout from "@/views/layouts/MainLayout/main_layout"; // Sesuaikan path import kamu
import styles from "./dashboarduser_screen.module.css";

// --- Kumpulan Komponen Ikon ---
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0AAB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// --- Komponen Utama ---
export default function Home() {
  // Konten untuk sebelah kanan Header (Search Bar & Cart)
  const HeaderRightContent = (
    <div className={styles.headerActions}>
      <div className={styles.searchBar}>
        <SearchIcon />
        <input type="text" placeholder="Cari hasil panen..." />
      </div>
      <button className={styles.iconBtn} aria-label="Keranjang">
        <CartIcon />
      </button>
    </div>
  );

  return (
    <MainLayout
      title="PilahPilih"
      alignLeft={true}
      hideBackButton={true}
      noShadow={false}
      rightComponent={HeaderRightContent}
    >
      <div className={styles.container}>
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>MISI KAMI</div>
          <h2>Menyelamatkan Pangan,<br />Memberdayakan UMKM.</h2>
          <p>Dapatkan bahan baku premium dengan harga terjangkau sambil membantu mengurangi limbah makanan di Indonesia.</p>
        </section>

        {/* Categories Section */}
        <section>
          <div className={styles.sectionHeader}>
            <h3>Kategori Pilihan</h3>
            <p>Bahan segar langsung dari sumbernya</p>
          </div>
          <div className={styles.categoryGrid}>
            <div className={styles.categoryCard}>
              <img src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=300&q=80" alt="Sayuran" className={styles.categoryImg} />
              <span className={styles.categoryName}>Sayuran</span>
            </div>
            <div className={styles.categoryCard}>
              <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80" alt="Buah-buahan" className={styles.categoryImg} />
              <span className={styles.categoryName}>Buah-buahan</span>
            </div>
            <div className={styles.categoryCard}>
              <img src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80" alt="Daging" className={styles.categoryImg} />
              <span className={styles.categoryName}>Daging</span>
            </div>
            <div className={styles.categoryCard}>
              <img src="https://images.unsplash.com/photo-1587486913049-53fc88980dfc?auto=format&fit=crop&w=300&q=80" alt="Telur" className={styles.categoryImg} />
              <span className={styles.categoryName}>Telur</span>
            </div>
            <div className={styles.categoryCard}>
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80" alt="Rempah" className={styles.categoryImg} />
              <span className={styles.categoryName}>Rempah</span>
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section className={styles.aiSection}>
          <div className={styles.aiHeaderRow}>
            <div className={styles.iconBtn}>
              <SparklesIcon />
            </div>
            <div>
              <h3>Rekomendasi AI Untuk Usahamu</h3>
              <p>Berdasarkan profil usaha: Restoran Pasta & Italia</p>
            </div>
          </div>

          <div className={styles.productList}>
            {/* Produk 1 */}
            <div className={styles.productCard}>
              <span className={`${styles.productBadge} ${styles.badgeDark}`}>RESCUED VALUE</span>
              <img 
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80" 
                alt="Tomat Roma Grade B+" 
                className={styles.productImg} 
              />
              <div className={styles.productInfo}>
                <h4>Tomat Roma Grade B+</h4>
                <p>Sangat cocok untuk saus pasta artisan Anda. Kematangan sempurna.</p>
                <div className={styles.priceRow}>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>Rp 12.500</span>
                    <span className={styles.priceStrike}>Rp 18.000</span>
                  </div>
                  <button className={styles.addBtn} aria-label="Tambah">
                    <PlusIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Produk 2 */}
            <div className={styles.productCard}>
              <span className={`${styles.productBadge} ${styles.badgeLight}`}>FRESH HARVEST</span>
              <img 
                src="https://images.unsplash.com/photo-1615486171448-4aff1c11e389?auto=format&fit=crop&w=600&q=80" 
                alt="Basil Genovese Pack" 
                className={styles.productImg} 
              />
              <div className={styles.productInfo}>
                <h4>Basil Genovese Pack</h4>
                <p>Stok melimpah dari petani Bogor. Aroma kuat untuk pesto.</p>
                <div className={styles.priceRow}>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>Rp 8.200</span>
                  </div>
                  <button className={styles.addBtn} aria-label="Tambah">
                    <PlusIcon />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </MainLayout>
  );
}