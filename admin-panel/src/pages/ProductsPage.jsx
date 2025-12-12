import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

import styles from "./Dashboard.module.css";
import AddProductModal from "../components/AddProductModal";
import DeleteModal from "../components/DeleteModal";
import EditProductModal from "../components/EditProductModal";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("کاربر");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/products?limit=1000",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    const savedName = localStorage.getItem("username");
    if (savedName) setUsername(savedName);
  }, []);

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/products/${productToDelete.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsDeleteModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert("خطا در حذف محصول");
    }
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className={styles.pageContainer} dir="rtl">
      <div className={styles.topBar}>
        <div className={styles.profileSection}>
          <IconButton onClick={handleLogout} color="error" title="خروج">
            <LogoutIcon />
          </IconButton>
          <div className={styles.userInfo}>
            <Typography variant="subtitle1" fontWeight="bold">
              {username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              مدیر
            </Typography>
          </div>
          <Avatar src="/broken-image.jpg" className={styles.userAvatar} />
        </div>

        <TextField
          placeholder="جستجو کالا"
          variant="outlined"
          size="small"
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            className: styles.searchInput,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className={styles.headerSection}>
        <div className={styles.pageTitle}>
          <ManageAccountsIcon className={styles.titleIcon} />
          مدیریت کالا
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className={styles.btnAdd}
          onClick={() => setIsAddModalOpen(true)}
        >
          افزودن محصول
        </Button>
      </div>

      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell className={styles.tableHeaderCell}>نام کالا</TableCell>
              <TableCell className={styles.tableHeaderCell}>موجود</TableCell>
              <TableCell className={styles.tableHeaderCell}>قیمت</TableCell>
              <TableCell className={styles.tableHeaderCell}>
                شناسه کالا
              </TableCell>
              <TableCell className={styles.tableHeaderCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className={styles.tableRow}>
                <TableCell className={styles.tableCell}>
                  {product.name}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {product.quantity}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {Number(product.price).toLocaleString()} تومان
                </TableCell>
                <TableCell className={styles.tableCell}>{product.id}</TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.actionButtons}>
                    <IconButton
                      color="error"
                      onClick={() => openDeleteModal(product)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton
                      color="success"
                      onClick={() => openEditModal(product)}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className={styles.emptyRow}>
                  محصولی یافت نشد!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddProductModal
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleDelete={confirmDelete}
      />

      <EditProductModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default ProductsPage;
