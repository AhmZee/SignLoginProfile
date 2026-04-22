import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import herro from "../../assets/images/hero-man.png";
import Button from "@/components/button";
import Link from "next/link";

function LandingPage() {
  return (
    <main className={styles.hero}>
      <Image className={styles.img} src={herro} alt="Landing" />
      <h1 className={styles.h1}>Discover Your Dream Job here</h1>
      <h3 className={styles.h3}>
        Explore all the existing job roles based on your interest and study
        major
      </h3>
      <div className={styles.btns}>
        <Link href="/login">
          <Button variant="primary">Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant="secondary">Register</Button>
        </Link>
      </div>
    </main>
  );
}

export default LandingPage;
