"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  iconLeft,
  iconRight,
  type = "text",
  loading = false,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={`${styles.wrapper} ${error ? styles.error : ""}`}>
      <div
        className={`${styles.inputContainer} ${
          isFocused ? styles.focused : ""
        }`}
      >
        {iconLeft && <span className={styles.leftIcon}>{iconLeft}</span>}

        <input
          {...props}
          type={isPassword && showPassword ? "text" : type}
          className={`${styles.input} ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {label && (
          <label
            className={`${styles.label} ${
              isFocused || props.value ? styles.floating : ""
            }`}
          >
            {label}
          </label>
        )}

        {isPassword ? (
          <button
            type="button"
            className={styles.rightIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        ) : (
          iconRight && <span className={styles.rightIcon}>{iconRight}</span>
        )}

        {loading && <span className={styles.loader}></span>}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
