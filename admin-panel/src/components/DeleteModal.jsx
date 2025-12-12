import React from 'react';
import { Dialog, Button, Typography, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="xs" 
      dir="rtl"
      className={styles.modalPaper}
    >
      <Box>
        <div className={styles.iconContainer}>
          <DeleteForeverIcon className={styles.deleteIcon} />
        </div>

        <Typography className={styles.text}>
          آیا از حذف این محصول مطمئن هستید؟
        </Typography>

        <div className={styles.actionButtons}>
          <Button onClick={handleClose} className={styles.cancelBtn}>
            لغو
          </Button>
          <Button onClick={handleDelete} className={styles.deleteBtn}>
            حذف
          </Button>
        </div>
      </Box>
    </Dialog>
  );
};

export default DeleteModal;