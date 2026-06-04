import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/views/layouts/MainLayout/main_layout';
import styles from './listchatuser_screen.module.css';

// Import local icon (Sesuaikan path)
import iconSearch from '@/assets/icons/icon-search.svg'; 
import BottomNav from '@/views/components/BottomNavbar/bottomnav';

// Tipe Data Chat
interface ChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  unreadCount: number;
  avatarUrl: string;
}

export default function ChatListScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Data Dummy Obrolan
  const chatData: ChatItem[] = [
    {
      id: '1',
      name: 'Tani Makmur Group',
      message: 'Haloo, bagaimana udah diproses?',
      time: '1M yang lalu',
      unreadCount: 1,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '2',
      name: 'Budi Santoso',
      message: 'Hai, bagaimana dengan titik temu kita...',
      time: '1J yang lalu',
      unreadCount: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '3',
      name: 'Joko Anwar',
      message: 'Bang punya nomer WA ga spy gampan...',
      time: '3M yang lalu',
      unreadCount: 1,
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '4',
      name: 'Budi Hartono',
      message: 'Kalau misalkan saya pesan disini mau ga',
      time: '1H yang lalu',
      unreadCount: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '5',
      name: 'Hardi Hartanto',
      message: 'Ini masih bagus kah bahannya?',
      time: '2J yang lalu',
      unreadCount: 1,
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop'
    }
  ];

  const filteredChats = chatData.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout
      title="PilahPilih" // Judul header diganti menjadi nama brand
      alignLeft={true}
      hideBackButton={true}
      noShadow={false} // Diberi false agar ada sedikit batas garis/shadow ke konten bawah
      rightProfile="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" // Dummy avatar profil user
    >
      <div className={styles.container}>
        
        {/* Judul Halaman di dalam konten */}
        <h1 className={styles.pageTitle}>Obrolan</h1>

        {/* Search Input */}
        <div className={styles.searchBox}>
          <img src={iconSearch} alt="Cari" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Cari obrolan..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Chat List */}
        <div className={styles.chatList}>
          {filteredChats.map((chat) => (
            <div 
              key={chat.id} 
              className={styles.chatCard}
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <img src={chat.avatarUrl} alt={chat.name} className={styles.avatar} />
              
              <div className={styles.chatContent}>
                <div className={styles.chatTop}>
                  <h3 className={styles.chatName}>{chat.name}</h3>
                  <span className={styles.chatTime}>{chat.time}</span>
                </div>
                
                <div className={styles.chatBottom}>
                  <p className={styles.chatMessage}>{chat.message}</p>
                  
                  {chat.unreadCount > 0 && (
                    <div className={styles.unreadBadge}>
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <BottomNav activeTab="chat" />
        
      </div>
    </MainLayout>
  );
}