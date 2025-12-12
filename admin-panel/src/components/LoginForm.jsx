import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import styles from "./Auth.module.css";
import Mylogo from "./images/union.png"
const LoginForm = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);

      alert("ورود موفقیت‌آمیز بود!");

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "خطا در ورود به سیستم");
    }
  };

  return (
    <div className={styles.pageContainer} dir="rtl">
      <div className={styles.headerText}>بوت کمپ بوتواستارت</div>
      <form onSubmit={handleLogin} className={styles.card}>
       <img src={Mylogo} alt="لوگو" className={styles.logo} />
        <div className={styles.title}>فرم ورود</div>

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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={styles.submitButton}
        >
          ورود
        </Button>

        <div className={styles.centerText}>
          <Link
            component="button"
            type="button"
            onClick={onSwitchToRegister}
            className={styles.linkText}
          >
            حساب کاربری ندارید؟ ثبت نام
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
