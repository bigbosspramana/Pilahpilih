import React from "react";
import MainLayout from "@/views/layouts/MainLayout/main_layout"; 
import styles from "./dashboarduser_screen.module.css";
import Button from "@/views/components/Button/button"; // Impor komponen Button untuk logout

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

// ✅ 1. DEFINISIKAN INTERFACE PROPS AGAR TERHUBUNG DENGAN LOGIN SCREEN
interface BuyerDashboardProps {
  userName: string | null;
  products: any[];
  onLogout: () => void;
}

// --- Komponen Utama ---
export default function BuyerDashboard({ userName, products, onLogout }: BuyerDashboardProps) {
  
  // Aksi penambahan keranjang belanja (POST api/cart)
  const addToCart = (productId: number) => {
    alert(`Produk dengan ID ${productId} berhasil ditambahkan ke keranjang!`);
  };

  // Konten untuk sebelah kanan Header (Search Bar, Cart, & Tombol Keluar)
  const HeaderRightContent = (
    <div className={styles.headerActions}>
      <div className={styles.searchBar}>
        <SearchIcon />
        <input type="text" placeholder="Cari hasil panen..." />
      </div>
      <button className={styles.iconBtn} aria-label="Keranjang">
        <CartIcon />
      </button>
      {/* ✅ 2. SISIPKAN TOMBOL LOGOUT DI HEADER
      <Button variant="outline" onClick={onLogout}>
        Keluar
      </Button> */}
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
          {/* ✅ 3. DUKUNG SAPAAN DINAMIS NAMA USER */}
          <h2>Halo {userName || "Pelanggan"},<br />Menyelamatkan Pangan, Memberdayakan UMKM.</h2>
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
              <h3>Katalog Produk Pilihan</h3>
              <p>Menampilkan komoditas segar langsung dari mitra tani kami</p>
            </div>
          </div>

          <div className={styles.productList}>
            {/* ✅ 4. LAKUKAN MAPPING DATA DARI API BACKEND LARAVEL */}
            {products.length === 0 ? (
              <p style={{ color: "#999", padding: "16px" }}>Sedang memuat etalase produk pangan segar...</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <span className={`${styles.productBadge} ${styles.badgeDark}`}>
                    {product.imperfect_label === "slightly_imperfect" ? "RESCUED VALUE" : "FRESH HARVEST"}
                  </span>
                  <img 
                    src={product.photo || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"} 
                    alt={product.name} 
                    className={styles.productImg} 
                  />
                  <div className={styles.productInfo}>
                    <h4>{product.name}</h4>
                    <p>{product.description || "Bahan pangan segar berkualitas tinggi pilihan UMKM."}</p>
                    <div className={styles.priceRow}>
                      <div className={styles.priceContainer}>
                        <span className={styles.price}>Rp {parseFloat(product.price_per_kg).toLocaleString("id-ID")}</span>
                      </div>
                      {/* ✅ 5. HUBUNGKAN TOMBOL ADD TO CART KE LOGIKA KENDALI */}
                      <button 
                        className={styles.addBtn} 
                        aria-label="Tambah ke keranjang"
                        onClick={() => addToCart(product.id)}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </MainLayout>
  );
}