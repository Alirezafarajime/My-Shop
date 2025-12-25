'use client';
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import styles from "./AddProductModal.module.css";

const AddProductModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.quantity) {
      alert("لطفاً همه فیلدها را پر کنید");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3001/products",
        {
          name: formData.name,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("محصول با موفقیت ایجاد شد!");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("خطا در ایجاد محصول");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      dir="rtl"
      className={styles.modalPaper}
    >
      <DialogTitle className={styles.dialogTitle}>ایجاد محصول جدید</DialogTitle>

      <DialogContent className={styles.contentContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>نام کالا</label>
          <TextField
            placeholder="نام کالا"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className={styles.customInput}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>تعداد موجودی</label>
          <TextField
            placeholder="تعداد"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className={styles.customInput}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>قیمت</label>
          <TextField
            placeholder="قیمت"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className={styles.customInput}
          />
        </div>
      </DialogContent>

      <DialogActions className={styles.actionButtons}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          className={styles.createBtn}
        >
          ایجاد
        </Button>
        <Button onClick={handleClose} className={styles.cancelBtn}>
          انصراف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
