"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/components/button";
import styles from "./styles.module.scss";
import Input from "@/components/input-field";
import SocialMedia from "@/components/social-media";
import { error } from "console";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  return (
    <div className={styles.container}>
      <h1>{loading ? "Processing" : "Create account"}</h1>
      <h2>Create an account so you can explore all the existing jobs</h2>

      <Input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <Input
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <Input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <Button className={styles.signup_btn} onClick={onSignup} size="large">
        Signup
      </Button>
      <Link href="/login" className={styles.have_account}>
        Already have an account
      </Link>
      <h3 className={styles.continue_with}>Or continue with</h3>
      <SocialMedia />
    </div>
  );
};

export default SignupPage;
