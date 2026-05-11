import { ChangeEvent } from "react";
import styles from "./field.module.css";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
  //   value: string;
  //   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: string; // Path ke file SVG/PNG lokal
  className?: string;
  hideIcon?: boolean;
}

export default function InputField({
  label,
  placeholder = "",
  type = "text",
  //   value,
  //   onChange,
  icon,
  className = "",
  hideIcon = false,
}: InputFieldProps) {
  const showIcon = icon && !hideIcon;

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          className={`${styles.inputField} ${!showIcon ? styles.noIconPadding : ""}`}
          placeholder={placeholder}
          //   value={value}
          //   onChange={onChange}
        />
        {icon && (
          <img src={icon} alt={`${label} icon`} className={styles.inputIcon} />
        )}
      </div>
    </div>
  );
}
