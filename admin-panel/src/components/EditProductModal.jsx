import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import styles from "./EditProductModal.module.css";

const EditProductModal = ({ open, handleClose, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        price: productToEdit.price,
        quantity: productToEdit.quantity,
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/products/${productToEdit.id}`,
        {
          name: formData.name,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("محصول با موفقیت ویرایش شد!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("خطا در ویرایش محصول");
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
      <DialogTitle className={styles.dialogTitle}>ویرایش اطلاعات</DialogTitle>

      <DialogContent className={styles.contentContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>نام کالا</label>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            className={styles.customInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>تعداد موجودی</label>
          <TextField
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            className={styles.customInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>قیمت</label>
          <TextField
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            className={styles.customInput}
          />
        </div>
      </DialogContent>

      <DialogActions className={styles.actionButtons}>
        <Button onClick={handleUpdate} className={styles.updateBtn}>
          ثبت اطلاعات جدید
        </Button>
        <Button onClick={handleClose} className={styles.cancelBtn}>
          انصراف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
