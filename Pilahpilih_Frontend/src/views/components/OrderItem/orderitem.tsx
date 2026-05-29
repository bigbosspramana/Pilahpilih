import React from 'react';
import styles from './orderitem.module.css'; // Sesuaikan path css-mu

// Definisikan struktur data (bisa juga di-import jika sudah ada di file tipe khusus)
export interface OrderItem {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
}

// Props hanya menerima satu buah item
interface OrderItemRowProps {
  item: OrderItem;
}

// Helper function format Rupiah
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
};

export default function OrderItemRow({ item }: OrderItemRowProps) {
  return (
    // HAPUS atribut key={item.id} dari sini
    <div className={styles.productItem}>
      <img
        src={item.imageUrl}
        alt={item.name}
        className={styles.productImg}
      />
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{item.name}</h3>
        <p className={styles.productDetail}>
          {item.quantity} {item.unit} x {formatRupiah(item.pricePerUnit)}
        </p>
      </div>
      <p className={styles.productPrice}>
        {formatRupiah(item.quantity * item.pricePerUnit)}
      </p>
    </div>
  );
}