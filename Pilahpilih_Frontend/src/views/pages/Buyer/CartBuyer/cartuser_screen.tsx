import React, { useState } from "react";
import styles from "./cartuser_screen.module.css";
import MainLayout from "@/views/layouts/MainLayout/main_layout";
// Import Icon Local (sesuai instruksi)
import iconLeaf from "@/assets/icons/icon-leaf2.svg";
import iconShop from "@/assets/icons/icon-shop.svg";
import iconTrash from "@/assets/icons/icon-trash.svg";
import iconArrowRight from "@/assets/icons/icon-arrow-right.svg";
import CartShopSection from "@/views/components/CartShopSection/cartshop";

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

export default function CartUser() {
  // State data keranjang (Struktur Multi-Toko & Multi-Item)
  const [shops, setShops] = useState<ShopGroup[]>([
    {
      id: "shop_1",
      name: "Kebun Hijau Lestari",
      status: "VERIFIED ORGANIC SUPPLIER",
      rescuedValue: "2.5kg",
      items: [
        {
          id: "item_1", // ID unik pertama
          name: "Wortel Organik Grade B",
          imageUrl:
            "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=200&auto=format&fit=crop",
          quantity: 2,
          pricePerItem: 12500,
          originalPricePerItem: 18000,
          variant: "1kg • Sedikit Bengkok",
          checked: true,
        },
        {
          id: "item_2", // Ubah jadi item_2
          name: "Tomat Roma Imperfect",
          imageUrl:
            "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=200&auto=format&fit=crop", // Ganti gambar kalau perlu
          quantity: 1,
          pricePerItem: 15000,
          originalPricePerItem: 22000,
          variant: "500g • Ukuran Beragam",
          checked: true,
        },
        {
          id: "item_3", // Ubah jadi item_3
          name: "Bayam Hidroponik",
          imageUrl:
            "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=200&auto=format&fit=crop",
          quantity: 3,
          pricePerItem: 5000,
          originalPricePerItem: 7000,
          variant: "1 Ikat",
          checked: false, // Coba set false untuk testing
        },
      ],
    },
  ]);

  // --- LOGIKA CHECKBOX & QUANTITY ---

  const handleItemCheck = (shopId: string, itemId: string) => {
    setShops((prevShops) =>
      prevShops.map((shop) => {
        if (shop.id === shopId) {
          return {
            ...shop,
            items: shop.items.map((item) =>
              item.id === itemId ? { ...item, checked: !item.checked } : item,
            ),
          };
        }
        return shop;
      }),
    );
  };

  const handleShopCheck = (shopId: string, isCurrentlyAllChecked: boolean) => {
    setShops((prevShops) =>
      prevShops.map((shop) => {
        if (shop.id === shopId) {
          return {
            ...shop,
            items: shop.items.map((item) => ({
              ...item,
              checked: !isCurrentlyAllChecked,
            })),
          };
        }
        return shop;
      }),
    );
  };

  const handleQtyChange = (
    shopId: string,
    itemId: string,
    action: "inc" | "dec",
  ) => {
    setShops((prevShops) =>
      prevShops.map((shop) => {
        if (shop.id === shopId) {
          return {
            ...shop,
            items: shop.items.map((item) => {
              if (item.id === itemId) {
                const newQty =
                  action === "inc" ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: newQty >= 1 ? newQty : 1 };
              }
              return item;
            }),
          };
        }
        return shop;
      }),
    );
  };

  // --- LOGIKA HITUNG TOTAL OTOMATIS ---
  const totalPayment = shops.reduce((total, shop) => {
    const shopTotal = shop.items.reduce((sum, item) => {
      return item.checked ? sum + item.quantity * item.pricePerItem : sum;
    }, 0);
    return total + shopTotal;
  }, 0);

  const totalRescued = shops.reduce((total, shop) => {
    const hasCheckedItem = shop.items.some((item) => item.checked);
    return hasCheckedItem ? total + 2.5 : total;
  }, 0);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <MainLayout
      title="PilahPilih"
      alignLeft={true}
      hideBackButton={false}
      noShadow={false}
      contentClassName={styles.contentScreen}
    >
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Keranjang Belanja</h1>
          <p className={styles.pageSubtitle}>
            Pilih produk segar yang ingin Anda selamatkan hari ini.
          </p>
        </header>

        {/* Banner Dampak Lingkungan (Hanya muncul jika ada yg diceklis) */}
        <div className={styles.impactBanner}>
          <img src={iconLeaf} alt="Leaf" className={styles.iconLocal} />
          <p className={styles.impactText}>
            <span className={styles.impactBold}>Dampak Anda:</span> Dengan
            pembelian ini, Anda telah menyelamatkan {totalRescued}kg potensi
            limbah pangan.
          </p>
        </div>

        {/* Render Daftar Toko secara Dinamis */}

        {shops.map((shop) => (
          <CartShopSection
            key={shop.id}
            shop={shop}
            onShopCheck={handleShopCheck}
            onItemCheck={handleItemCheck}
            onQtyChange={handleQtyChange}
          />
        ))}

        {/* Container Total & Tombol */}
        <div className={styles.fixedBottom}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>TOTAL BAYAR</span>
            <h2 className={styles.totalAmount}>{formatRupiah(totalPayment)}</h2>
          </div>

          <button className={styles.checkoutBtn} disabled={totalPayment === 0}>
            Checkout Sekarang
            <img
              src={iconArrowRight}
              alt="Arrow Right"
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
