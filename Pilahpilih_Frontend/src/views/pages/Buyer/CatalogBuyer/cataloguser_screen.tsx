import React from "react";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
import styles from "./cataloguser_screen.module.css";
import IconFilter from "@/assets/icons/filter.svg";
import ProductCard from "@/views/components/ProductCard/productcard";

interface Product {
  id: string;
  name: string;
  image: string;
  badge: {
    text: string;
    type: "organic" | "grade";
  };
  rating: number;
  location: string;
  originalPrice?: number;
  currentPrice: number;
  unit: string;
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Tomat Roma Organik",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop", // Ganti dengan path gambarmu
    badge: { text: "ORGANIC", type: "organic" },
    rating: 4.8,
    location: "Lembang, Bandung",
    originalPrice: 24000,
    currentPrice: 18500,
    unit: "/kg",
  },
  {
    id: "2",
    name: "Wortel Manis",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1000&auto=format&fit=crop", // Ganti dengan path gambarmu
    badge: { text: "GRADE B", type: "grade" },
    rating: 4.5,
    location: "Lembang, Bandung",
    currentPrice: 12000,
    unit: "/kg",
  },
];

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

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

export default function CatalogUser() {
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
      title="Sayuran"
      alignLeft={true}
      hideBackButton={false}
      noShadow={false}
      contentClassName={styles.contentScreen}
      rightComponent={HeaderRightContent}
    >
      <div className={styles.container}>
        <div className={styles.topNav}>
          <img src={IconFilter} alt="" />
          <button className={styles.dropdownButton}>Harga Termurah</button>
        </div>

        {/* Header */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Hasil Panen Segar</h1>
          <p className={styles.subtitle}>
            Menampilkan 248 produk dari petani lokal terbaik
          </p>
        </div>

        {/* Product List */}
        <div className={styles.productList}>
          {DUMMY_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
