import React from "react";
import GoogleIcon from "../../assets/icons/google-logo.png";
import FacebookIcon from "../../assets/icons/facebook-logo.png";
import AppleIcon from "../..//assets/icons/apple-logo.png";
import styles from "./styles.module.scss";
import Image from "next/image";

const SocialMedia = () => {
  const socialMediaLinks = [
    {
      name: "Google",
      url: "https://www.google.com/yourprofile",
      icon: GoogleIcon,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/yourprofile",
      icon: FacebookIcon,
    },
    {
      name: "Apple",
      url: "https://www.apple.com/yourprofile",
      icon: AppleIcon,
    },
  ];
  return (
    <div className={styles.social}>
      {socialMediaLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image className={styles.img} src={social.icon} alt="social" />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
