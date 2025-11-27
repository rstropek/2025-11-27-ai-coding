'use client';

import styles from './NotificationPopup.module.css';

interface NotificationPopupProps {
  onClose: () => void;
}

export default function NotificationPopup({ onClose }: NotificationPopupProps) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.popup}>
        <div className={styles.header}>
          <h3>Notifications</h3>
        </div>
        <div className={styles.content}>
          <p className={styles.placeholder}>You have no notifications yet</p>
        </div>
      </div>
    </>
  );
}
