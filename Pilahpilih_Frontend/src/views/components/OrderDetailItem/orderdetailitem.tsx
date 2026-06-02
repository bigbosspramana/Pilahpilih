import React from 'react';
import styles from './orderdetailitem.module.css'; // Sesuaikan path CSS-nya

// Mendefinisikan tipe data yang akan diterima komponen ini
export interface OrderDetailItemProps {
  image: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  isRescued?: boolean; // Opsional: true jika ingin menampilkan badge RESCUED
}

export default function OrderDetailItem({ 
  image, 
  name, 
  variant, 
  price, 
  qty, 
  isRescued 
}: OrderDetailItemProps) {
  
  // Helper fungsi format diletakkan di dalam komponen agar mandiri
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className={styles.productItem}>
      <div className={styles.productMain}>
        <img
          src={image}
          alt={name}
          className={styles.productImg}
        />
        <div className={styles.productDetails}>
          <div className={styles.productTitleRow}>
            <div>
              <h3 className={styles.productName}>{name}</h3>
              <p className={styles.productVariant}>{variant}</p>
              {/* Akan muncul jika prop isRescued bernilai true */}
              {isRescued && <span className={styles.rescuedBadge}>RESCUED</span>}
            </div>
            <span className={styles.productPrice}>
              {formatRupiah(price)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.qtyBox}>Qty: {qty}</div>
    </div>
  );
}