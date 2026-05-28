import React from 'react';
import styles from './productcard.module.css';
import IconCart1 from "@/assets/icons/cart2.svg";
import IconStar from "@/assets/icons/mini-star.svg";

// Pindahkan interface Product ke sini (atau import jika ada di file terpisah)
export interface Product {
  id: string;
  name: string;
  image: string;
  badge: {
    text: string;
    type: 'organic' | 'grade';
  };
  rating: number;
  location: string;
  originalPrice?: number;
  currentPrice: number;
  unit: string;
}

// Definisikan Props yang akan diterima oleh komponen ini
interface ProductCardProps {
  product: Product;
}

// Pindahkan helper function ke sini, atau import dari file utils
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      {/* Image & Badge */}
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
        <span
          className={`${styles.badge} ${
            product.badge.type === "organic"
              ? styles.badgeOrganic
              : styles.badgeGrade
          }`}
        >
          {product.badge.text}
        </span>
      </div>

      {/* Product Info */}
      <div className={styles.cardHeader}>
        <h2 className={styles.productName}>{product.name}</h2>
        <div className={styles.rating}>
          <img src={IconStar} alt="Rating" />
          <span>{product.rating}</span>
        </div>
      </div>

      <div className={styles.location}>
        {/* <MapPin size={14} /> */}
        <span>{product.location}</span>
      </div>

      {/* Pricing & Action */}
      <div className={styles.cardFooter}>
        <div className={styles.priceSection}>
          {product.originalPrice && (
            <span className={styles.originalPrice}>
              {formatRupiah(product.originalPrice)}
            </span>
          )}
          <div>
            <span className={styles.currentPrice}>
              {formatRupiah(product.currentPrice)}
            </span>
            <span className={styles.unit}>{product.unit}</span>
          </div>
        </div>

        <button
          className={styles.addToCartBtn}
          aria-label="Tambah ke keranjang"
        >
          <img src={IconCart1} alt="Cart" />
        </button>
      </div>
    </article>
  );
}