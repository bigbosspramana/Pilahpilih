import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./bottomnav.module.css";

// Import Icon Aktif (Hijau) dan Inaktif (Abu-abu)
import iconHomeActive from "@/assets/icons/icon-home-active.svg";
import iconHomeInactive from "@/assets/icons/icon-home-inactive.svg";
import iconChatActive from "@/assets/icons/icon-chat-active.svg";
import iconChatInactive from "@/assets/icons/icon-chat-inactive.svg";
import iconHistoryActive from "@/assets/icons/icon-history-active.svg";
import iconHistoryInactive from "@/assets/icons/icon-history-inactive.svg";
import iconProfileActive from "@/assets/icons/icon-profile-active.svg";
import iconProfileInactive from "@/assets/icons/icon-profile-inactive.svg";
import iconProductActive from "@/assets/icons/icon-product-active.svg";
import iconProductInactive from "@/assets/icons/icon-product-inactive.svg";
import iconOrderActive from "@/assets/icons/icon-order-active.svg";
import iconOrderInactive from "@/assets/icons/icon-order-inactive.svg";

interface BottomNavProps {
  activeTab: "home" | "chat" | "history" | "profile" | "product" | "order"; // Tambahkan opsi 'product' dan 'order' untuk seller
  role?: "buyer" | "seller"; // Tambahkan prop role (opsional, default: buyer)
}

export default function BottomNav({
  activeTab,
  role = "buyer",
}: BottomNavProps) {
  const navigate = useNavigate();

  // 1. Data menu navbar untuk BUYER (Pembeli)
  const buyerNavItems = [
    {
      id: "home",
      label: "Home",
      path: "/dashboard-user",
      iconActive: iconHomeActive,
      iconInactive: iconHomeInactive,
    },
    {
      id: "chat",
      label: "Chat",
      path: "/chat-list-user",
      iconActive: iconChatActive,
      iconInactive: iconChatInactive,
    },
    {
      id: "history",
      label: "History",
      path: "/order-history-user",
      iconActive: iconHistoryActive,
      iconInactive: iconHistoryInactive,
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile-user",
      iconActive: iconProfileActive,
      iconInactive: iconProfileInactive,
    },
  ];

  // 2. Data menu navbar untuk SELLER (Supplier)
  // Kamu bisa sesuaikan path-nya dengan route yang kamu buat untuk supplier
  const sellerNavItems = [
    {
      id: "home",
      label: "Home",
      path: "/dashboard-seller",
      iconActive: iconHomeActive,
      iconInactive: iconHomeInactive,
    },
    {
      id: "product",
      label: "Product",
      path: "/myproducts-seller",
      iconActive: iconProductActive,
      iconInactive: iconProductInactive,
    },
    {
      id: "order",
      label: "Order",
      path: "/order-management-seller",
      iconActive: iconOrderActive,
      iconInactive: iconOrderInactive,
    }, // Label diganti 'Pesanan' agar pas
    {
      id: "chat",
      label: "Chat",
      path: "/list-chat-seller",
      iconActive: iconChatActive,
      iconInactive: iconChatInactive,
    },

    {
      id: "profile",
      label: "Profile",
      path: "/profile-seller",
      iconActive: iconProfileActive,
      iconInactive: iconProfileInactive,
    },
  ];

  // 3. Tentukan item mana yang di-render berdasarkan prop 'role'
  const navItems = role === "seller" ? sellerNavItems : buyerNavItems;

  return (
    <div className={styles.navContainer}>
      {navItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
          >
            <img
              src={isActive ? item.iconActive : item.iconInactive}
              alt={item.label}
              className={styles.navIcon}
            />
            <span
              className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ""}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
