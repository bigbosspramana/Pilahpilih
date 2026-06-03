import { ReactNode } from "react";
import styles from "./chat_layout.module.css";
import back from "@/assets/icons/back.svg";
import iconPhone from "@/assets/icons/icon-phone.svg";
// import iconMenu from "@/assets/icons/icon-menu-vertical.svg";
import iconLocation from "@/assets/icons/icon-location-white.svg"; // Tambahan
import iconImage from "@/assets/icons/icon-img-grey.svg";       // Tambahan
import iconSend from "@/assets/icons/icon-send-white.svg";         // Tambahan
import { useNavigate } from "react-router-dom";

interface ChatLayoutProps {
  children: ReactNode;
  title: string;
  avatarSrc: string;
  statusText?: string;
  contentClassName?: string;
  screenDisplay?: string;
  onPhoneClick?: () => void;
  onMenuClick?: () => void;
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendClick?: () => void;
  onLocationClick?: () => void;
  onImageClick?: () => void;
}

export default function ChatLayout({
  children,
  title,
  avatarSrc,
  statusText = "Online",
  contentClassName = "",
  screenDisplay = "",
  onPhoneClick,
  onMenuClick,
  inputValue,
  onInputChange,
  onSendClick,
  onLocationClick,
  onImageClick,
}: ChatLayoutProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.screen} ${screenDisplay} ${styles.chatScreenWrapper}`}>
      {/* Header Chat */}
      <header className={`${styles.header} ${styles.headerLeft} ${styles.noShadow}`}>
        <div className={styles.chatHeaderContainer}>
          <img
            src={back}
            alt="Back"
            className={styles.backButton}
            onClick={handleBack}
            style={{ cursor: "pointer" }}
          />
          <img src={avatarSrc} alt="Avatar" className={styles.chatAvatar} />
          <div className={styles.chatHeaderInfo}>
            <h1 className={styles.chatName}>{title}</h1>
            <p className={styles.chatStatus}>
              <span className={styles.statusDot}></span> {statusText}
            </p>
          </div>
          <div className={styles.chatHeaderActions}>
            <button onClick={onPhoneClick} className={styles.iconBtn}>
              <img src={iconPhone} alt="Telepon" />
            </button>
          </div>
        </div>
      </header>

      {/* Area Pesan (Scrollable) */}
      <div className={`${styles.contentScreen} ${styles.chatScrollArea} ${contentClassName}`}>
        {children}
      </div>

      {/* --- Footer Chat (Quick Actions & Input) ditambahkan di sini --- */}
      <div className={styles.chatFooter}>
        <div className={styles.quickActions}>
          <button className={styles.actionBtn} onClick={onLocationClick}>
            <img
              src={iconLocation}
              alt="Location"
              style={{ width: "14px", height: "14px" }}
            />
            Tentukan Titik Temu
          </button>
        </div>

        <div className={styles.inputArea}>
          <button className={styles.iconBtn} onClick={onImageClick}>
            <img src={iconImage} alt="Kirim Gambar" className={styles.chatIcon} />
          </button>

          <input
            type="text"
            placeholder="Tulis pesan..."
            className={styles.inputField}
            value={inputValue}
            onChange={onInputChange}
          />

          <button className={styles.sendBtn} aria-label="Kirim Pesan" onClick={onSendClick}>
            <img src={iconSend} alt="Send" className={styles.sendIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}