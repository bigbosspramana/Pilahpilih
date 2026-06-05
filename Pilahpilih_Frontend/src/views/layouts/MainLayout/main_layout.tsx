import { ReactNode } from "react";
import styles from "./main_layout.module.css";
import back from "@/assets/icons/back.svg";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  noShadow?: boolean;
  alignLeft?: boolean;
  rightProfile?: string;
  tabsComponent?: ReactNode;
  contentClassName?: string;
  screenDisplay?: string;
  hideBackButton?: boolean;
  role?: "buyer" | "seller";
  rightComponent?: ReactNode; // Tambahkan ini
}

export default function MainLayout({
  children,
  title,
  noShadow = false,
  alignLeft = false,
  rightProfile,
  tabsComponent,
  contentClassName = "",
  screenDisplay = "",
  hideBackButton = true,
  role = "buyer",
  rightComponent,
}: MainLayoutProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleProfileClick = () => {
    if (role === "seller") {
      navigate("/profile-seller"); // Sesuaikan dengan route profile seller kamu
    } else {
      navigate("/profile-user"); // Sesuaikan dengan route profile buyer kamu
    }
  };
  return (
    <div className={`${styles.screen} ${screenDisplay}`}>
      <header
        className={`
        ${styles.header}
        ${noShadow ? styles.noShadow : ""} 
        ${alignLeft ? styles.headerLeft : ""}
      `}
      >
        <div className={styles.secondHeader}>
          {!hideBackButton && (
            <img
              src={back}
              alt="Back"
              className={styles.backButton}
              onClick={handleBack}
            />
          )}
          <div className={styles.contentHeader}>
            <h1 className={styles.title}>{title}</h1>

            {rightComponent}
            {rightProfile && (
              <button
                onClick={handleProfileClick}
                className={styles.profileIcon}
                aria-label="Ke Halaman Profil"
              >
                <img
                  src={rightProfile}
                  alt="Profile"
                  className={styles.profileIcon1}
                />
              </button>
            )}
          </div>
        </div>

        {tabsComponent && (
          <div className={styles.tabsWrapper}>{tabsComponent}</div>
        )}
      </header>

      <div className={`${styles.contentScreen} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
