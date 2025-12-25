'use client';
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.css";
<img src="/images/union.png" alt="لوگو" className={styles.logo} />

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("رمز عبور و تکرار آن مطابقت ندارند");
    }

    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });

      alert("ثبت‌نام با موفقیت انجام شد! حالا وارد شوید.");
      router.push("/login");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "خطا در ثبت‌نام");
    }
  };

  return (
    <div className={styles.pageContainer} dir="rtl">
      <div className={styles.headerText}>بوت کمپ بوتواستارت</div>
      <form onSubmit={handleRegister} className={styles.card}>
   <img src="/images/union.png" alt="لوگو" className={styles.logo} />
        <div className={styles.title}>فرم ثبت نام</div>

        <TextField
          placeholder="نام کاربری"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.customInput}
        />

        <TextField
          placeholder="رمز عبور"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.customInput}
        />

        <TextField
          placeholder="تکرار رمز عبور"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.customInput}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={styles.submitButton}
        >
          ثبت نام
        </Button>

        <div className={styles.centerText}>
          <Link
            component="button"
            type="button"
            onClick={() => router.push("/login")}
            className={styles.linkText}
          >
            حساب کاربری دارید؟ ورود
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;