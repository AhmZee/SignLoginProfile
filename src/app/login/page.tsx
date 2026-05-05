"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/input-field";
import Button from "@/components/button";
import styles from "./styles.module.scss";
import SocialMedia from "@/components/social-media";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <h1>{loading ? "Processing" : "Login here"}</h1>
      <h2>Welcome back you’ve been missed!</h2>

      <Input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <hr />

      <Input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <Link href="/forgot-password" className={styles.forgot}>
        Forgot your password?
      </Link>

      <Button onClick={onLogin} size="large">
        Sign in
      </Button>

      <Link href="/signup" className={styles.create_new}>
        Create new account
      </Link>

      <h3 className={styles.continue_with}>Or continue with</h3>
      <SocialMedia />
    </div>
  );
};

export default LoginPage;
