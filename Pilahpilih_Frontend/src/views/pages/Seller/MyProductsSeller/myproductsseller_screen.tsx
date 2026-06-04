import React, { useState } from "react";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import styles from "./myproductsseller_screen.module.css";

// Import Icons Lokal
import iconPlus from "@/assets/icons/icon-plus-white.svg";
import iconSearch from "@/assets/icons/icon-search.svg";
import iconEdit from "@/assets/icons/icon-edit-green.svg";
import BottomNav from "@/views/components/BottomNavbar/bottomnav";

// Tipe Data Produk
interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  status: "IN STOCK" | "RESCUED VALUE" | "OUT OF STOCK";
  priceType: "PRICE" | "DISCOUNTED";
  imageUrl: string;
}

export default function MyProductsSeller() {
  const [searchQuery, setSearchQuery] = useState("");

  // Data Dummy Produk
  const products: Product[] = [
    {
      id: "1",
      name: "Organik Bell Peppers",
      stock: 45,
      price: 22000,
      status: "IN STOCK",
      priceType: "PRICE",
      imageUrl:
        "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "Imperfect Carrots",
      stock: 120,
      price: 8500,
      status: "RESCUED VALUE",
      priceType: "DISCOUNTED",
      imageUrl:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "3",
      name: "Vine Tomatoes",
      stock: 0,
      price: 15000,
      status: "OUT OF STOCK",
      priceType: "PRICE",
      imageUrl:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <MainLayout
      title="PilahPilih" // Bisa disesuaikan atau dikosongkan jika tidak ingin ada teks di header bawaan
      alignLeft={true}
      hideBackButton={true}
      noShadow={false}
      rightProfile="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
    >
      <div className={styles.container}>
        {/* 1. Header & Deskripsi */}
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>My Products</h1>
          <p className={styles.pageDesc}>
            Manage your rescued harvests and surplus inventory. Ensure stock
            levels are accurate for local buyers.
          </p>
        </div>

        {/* 2. Tombol Tambah Produk */}
        <button className={styles.addBtn}>
          <img src={iconPlus} alt="Add" className={styles.plusIcon} />
          Tambah Produk
        </button>

        {/* 3. Search Box */}
        <div className={styles.searchBox}>
          <img src={iconSearch} alt="Search" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 4. Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>ACTIVE ITEMS</p>
            <p className={`${styles.statValue} ${styles.textGreen}`}>24</p>
          </div>
          <div className={`${styles.statCard} ${styles.statCardAlert}`}>
            <p className={styles.statLabel}>OUT OF STOCK</p>
            <p className={`${styles.statValue} ${styles.textRed}`}>3</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>TOTAL VALUE</p>
            <p className={`${styles.statValue} ${styles.textBlack}`}>Rp 2.4M</p>
          </div>
          <div className={`${styles.statCard} ${styles.statCardHighlight}`}>
            <p className={styles.statLabel}>EXPIRING SOON</p>
            <p className={`${styles.statValue} ${styles.textGreen}`}>5</p>
          </div>
        </div>

        {/* 5. Product List */}
        <div className={styles.productList}>
          {products.map((product) => {
            // Penentuan style badge berdasarkan status
            let badgeClass = styles.badgeInStock;
            if (product.status === "RESCUED VALUE")
              badgeClass = styles.badgeRescued;
            if (product.status === "OUT OF STOCK")
              badgeClass = styles.badgeOutStock;

            // Penentuan warna stok
            const stockColorClass =
              product.stock > 0 ? styles.textGreen : styles.textRed;

            return (
              <div key={product.id} className={styles.productCard}>
                {/* Gambar & Badge */}
                <div className={styles.imageWrapper}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.productImg}
                  />
                  <span className={`${styles.statusBadge} ${badgeClass}`}>
                    {product.status}
                  </span>
                </div>

                {/* Info & Aksi */}
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.productTitle}>{product.name}</h3>
                      <p className={styles.stockInfo}>
                        Stock:{" "}
                        <span className={stockColorClass}>
                          {product.stock} kg
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div>
                      <p className={styles.priceLabel}>{product.priceType}</p>
                      <p className={styles.priceValue}>
                        {formatRupiah(product.price)}
                        <span className={styles.unitLabel}>/kg</span>
                      </p>
                    </div>

                    <button className={styles.actionBtn} aria-label="Edit">
                      <img
                        src={iconEdit}
                        alt="Edit"
                        className={styles.actionIcon}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <BottomNav activeTab="product" role='seller'/>
      </div>
    </MainLayout>
  );
}
