import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AboutModal.module.scss';
import dino from "../../pics/dino.png";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{ className: styles.modalPaper }}
      BackdropProps={{ className: styles.backdrop }}
    >
      <DialogTitle className={styles.modalTitle}>
        О нас и нашем проекте
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.modalContent}>
        <p className={styles.projectInfo}>Проект создан в 2025 году</p>
        <div className={styles.socialLinks}>
            <p className={styles.projectInfo}> ссылка на тгк: </p>
            <a href="https://t.me/aribrown07" target="_blank" rel="noopener noreferrer">
            <img src={dino} alt="тгк" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;