import React from 'react';
// Sesuaikan dengan router yang kamu gunakan (misal: useNavigate dari react-router-dom atau useRouter dari Next.js)
import { useNavigate } from 'react-router-dom'; 
import styles from './bottomnav.module.css';

// Import Icon Aktif (Hijau) dan Inaktif (Abu-abu)
import iconHomeActive from '@/assets/icons/icon-home-active.svg';
import iconHomeInactive from '@/assets/icons/icon-home-inactive.svg';
import iconChatActive from '@/assets/icons/icon-chat-active.svg';
import iconChatInactive from '@/assets/icons/icon-chat-inactive.svg';
import iconHistoryActive from '@/assets/icons/icon-history-active.svg';
import iconHistoryInactive from '@/assets/icons/icon-history-inactive.svg';
import iconProfileActive from '@/assets/icons/icon-profile-active.svg';
import iconProfileInactive from '@/assets/icons/icon-profile-inactive.svg';

interface BottomNavProps {
  activeTab: 'home' | 'chat' | 'history' | 'profile';
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  const navigate = useNavigate();

  // Data menu navbar
  const navItems = [
    { id: 'home', label: 'Home', path: '/dashboard-user', iconActive: iconHomeActive, iconInactive: iconHomeInactive },
    { id: 'chat', label: 'Chat', path: '/chat-list-user', iconActive: iconChatActive, iconInactive: iconChatInactive },
    { id: 'history', label: 'History', path: '/order-history-user', iconActive: iconHistoryActive, iconInactive: iconHistoryInactive },
    { id: 'profile', label: 'Profile', path: '/profile-user', iconActive: iconProfileActive, iconInactive: iconProfileInactive },
  ];

  return (
    <div className={styles.navContainer}>
      {navItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button 
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
          >
            <img 
              // Logika ternary yang sama seperti sebelumnya untuk mengubah icon
              src={isActive ? item.iconActive : item.iconInactive} 
              alt={item.label} 
              className={styles.navIcon}
            />
            <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ''}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}