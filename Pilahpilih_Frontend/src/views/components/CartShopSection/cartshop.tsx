import React from "react";
import styles from "./cartshop.module.css";
import iconShop from "@/assets/icons/icon-shop.svg";
import CartItemCard from "@/views/components/CartItemCard/cartitemcard";

// Sesuaikan interface dengan struktur datamu
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

interface ShopGroup {
  id: string;
  name: string;
  status: string;
  rescuedValue: string;
  items: CartItem[];
}

interface CartShopSectionProps {
  shop: ShopGroup;
  onShopCheck: (shopId: string, isCurrentlyAllChecked: boolean) => void;
  onItemCheck: (shopId: string, itemId: string) => void;
  onQtyChange: (shopId: string, itemId: string, action: "inc" | "dec") => void;
}

export default function CartShopSection({
  shop,
  onShopCheck,
  onItemCheck,
  onQtyChange,
}: CartShopSectionProps) {
  
  // Cek apakah semua item di toko ini dicentang
  const isShopChecked = shop.items.every((item) => item.checked);

  return (
    <section className={styles.sellerSection}>
      {/* Header Profil Toko */}
      <div className={styles.sellerHeader}>
        <input
          type="checkbox"
          checked={isShopChecked}
          onChange={() => onShopCheck(shop.id, isShopChecked)}
          className={styles.mainCheckbox}
        />
        <div className={styles.shopIconContainer}>
          <img src={iconShop} alt="Shop" className={styles.shopIcon} />
        </div>
        <div className={styles.sellerInfo}>
          <h2 className={styles.sellerName}>{shop.name}</h2>
          <p className={styles.sellerStatus}>{shop.status}</p>
        </div>
        <div className={styles.rescuedBadge}>
          Rescued
          <br />
          Value
        </div>
      </div>

      {/* Render Daftar Item menggunakan Komponen CartItemCard */}
      <div className={styles.itemsContainer}>
        {shop.items.map((item) => (
          <CartItemCard
            key={item.id} // Key wajib diletakkan di sini saat mapping
            shopId={shop.id}
            item={item}
            onItemCheck={onItemCheck}
            onQtyChange={onQtyChange}
          />
        ))}
      </div>
    </section>
  );
}