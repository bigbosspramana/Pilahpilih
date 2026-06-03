import React, { useState } from "react";
import styles from "./chatuser_screen.module.css";
// Import Icon Local (sesuai instruksi)
import iconBack from "@/assets/icons/back.svg";
import iconPhone from "@/assets/icons/icon-phone-grey.svg";
import iconImage from "@/assets/icons/icon-img-grey.svg"; // Ikon gallery
import iconSend from "@/assets/icons/icon-send-white.svg";
import iconLocation from "@/assets/icons/icon-location-white.svg";
import ChatLayout from "@/views/layouts/ChatLayout/chat_layout";

export default function ChatUser() {
  return (
    <ChatLayout
      title="Tani Makmur Group"
      avatarSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
      statusText="Online"
      onPhoneClick={() => console.log("Phone clicked")}
      onMenuClick={() => console.log("Menu clicked")}
    >
      <div className={styles.chatArea}>
        {/* Date Separator */}
        <div className={styles.dateWrapper}>
          <span className={styles.dateBadge}>TODAY</span>
        </div>

        {/* Incoming Message (Pesan Masuk) */}
        <div className={`${styles.msgRow} ${styles.msgIncoming}`}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
            alt="User Avatar"
            className={styles.msgAvatar}
          />
          <div className={styles.msgContent}>
            <div className={`${styles.msgBubble} ${styles.bubbleIncoming}`}>
              Halo! Selamat siang Kak. Stok Tomat Organik Gred B kami masih ada
              sekitar 200kg untuk pengiriman besok pagi. Ada yang bisa kami
              bantu terkait pesanannya?
            </div>
            <span className={`${styles.msgTime} ${styles.timeIncoming}`}>
              11:20 AM
            </span>
          </div>
        </div>

        {/* Outgoing Message (Pesan Keluar) */}
        <div className={`${styles.msgRow} ${styles.msgOutgoing}`}>
          <div className={styles.msgContent}>
            <div className={`${styles.msgBubble} ${styles.bubbleOutgoing}`}>
              Terima kasih atas tawarannya. Saya baru saja mengirimkan revisi
              harga untuk 50kg tomatnya. Apakah harga Rp 9.500 bisa disetujui
              untuk pengambilan rutin setiap minggu?
            </div>
            <span className={`${styles.msgTime} ${styles.timeOutgoing}`}>
              11:25 AM • Read
            </span>
          </div>
        </div>

        {/* Outgoing Image Message */}
        <div className={`${styles.msgRow} ${styles.msgOutgoing}`}>
          <div className={styles.msgContent}>
            <img
              src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=400&auto=format&fit=crop"
              alt="Gudang Sayur"
              className={styles.msgImage}
            />
            <span className={`${styles.msgTime} ${styles.timeOutgoing}`}>
              11:26 AM • Read
            </span>
          </div>
        </div>
      </div>      
    </ChatLayout>
  );
}
