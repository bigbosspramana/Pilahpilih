import React from 'react';
import styles from './OrderConfirmation.module.css'; // Sesuaikan path css-mu
import iconLocation from './assets/icon-location.png'; // Sesuaikan path
import iconSearch from './assets/icon-search.png'; // Sesuaikan path

// Mendefinisikan props yang dibutuhkan komponen ini
interface MeetingPointCardProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; // Opsional
}

export default function MeetingPointCard({ 
  value, 
  onChange, 
  placeholder = "Tentukan tempat bertemu dengan supplier.." // Nilai default
}: MeetingPointCardProps) {
  
  return (
    <section className={styles.card}>
      <div className={styles.sectionHeader}>
        <img
          src={iconLocation}
          alt="Location"
          className={styles.iconLocal}
        />
        <h2 className={styles.sectionTitle}>Titik Bertemu</h2>
      </div>
      <div className={styles.inputWrapper}>
        <img
          src={iconSearch}
          alt="Search"
          className={styles.inputIcon}
        />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.locationInput}
        />
      </div>
    </section>
  );
}