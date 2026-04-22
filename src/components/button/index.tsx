"use client";

import React from "react";
import style from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "large";
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled,
  className = "",
  variant = "primary",
  size = "small",
  ...rest
}) => {
  const classes = [
    style.btn,
    style[`btn--${variant}`],
    style[`btn--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading ? <span className={style.btn__loader} /> : children}
    </button>
  );
};

export default Button;
