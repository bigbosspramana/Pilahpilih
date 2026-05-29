import React from "react";
import styles from "./cartitemcard.module.css";
import iconTrash from "@/assets/icons/icon-trash.svg";

// Definisikan tipe data sesuai yang ada di file utama
interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  pricePerItem: number;
  originalPricePerItem: number;
  variant: string;
  checked: boolean;
}

interface CartItemCardProps {
  shopId: string;
  item: CartItem;
  onItemCheck: (shopId: string, itemId: string) => void;
  onQtyChange: (shopId: string, itemId: string, action: "inc" | "dec") => void;
}

export default function CartItemCard({ 
  shopId, 
  item, 
  onItemCheck, 
  onQtyChange 
}: CartItemCardProps) {
  
  // Helper format rupiah lokal untuk komponen ini
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className={styles.cartItemCard}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onItemCheck(shopId, item.id)}
        className={styles.mainCheckbox}
      />

      <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />

      <div className={styles.itemDetails}>
        <div className={styles.itemHeader}>
          <div>
            <h3 className={styles.itemTitle}>
              {item.name.split(" ").slice(0, 2).join(" ")}
              <br />
              {item.name.split(" ").slice(2).join(" ")}
            </h3>
            <p className={styles.itemVariant}>{item.variant}</p>
          </div>
          <button className={styles.deleteBtn} aria-label="Hapus produk">
            <img src={iconTrash} alt="Trash" className={styles.trashIcon} />
          </button>
        </div>

        <div className={styles.itemFooter}>
          <div className={styles.priceCol}>
            <span className={styles.currentPrice}>
              {formatRupiah(item.pricePerItem)}
            </span>
            <span className={styles.originalPrice}>
              {formatRupiah(item.originalPricePerItem)}
            </span>
          </div>

          <div className={styles.qtyControl}>
            <button
              onClick={() => onQtyChange(shopId, item.id, "dec")}
              className={styles.qtyBtn}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className={styles.qtyValue}>{item.quantity}</span>
            <button
              onClick={() => onQtyChange(shopId, item.id, "inc")}
              className={styles.qtyBtn}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}