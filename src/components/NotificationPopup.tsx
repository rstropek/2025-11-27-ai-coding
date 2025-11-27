'use client';

import { useNotifications } from '@/contexts/NotificationContext';
import * as Icons from 'lucide-react';
import styles from './NotificationPopup.module.css';

interface NotificationPopupProps {
  onClose: () => void;
}

export default function NotificationPopup({ onClose }: NotificationPopupProps) {
  const { notifications } = useNotifications();

  // Helper function to get the icon component from lucide-react
  const getIcon = (iconName: string) => {
    // Convert icon name to PascalCase (e.g., "check-circle" -> "CheckCircle")
    const pascalCase = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    // Get the icon component from lucide-react
    const IconComponent = (Icons as any)[pascalCase];
    
    // Return the icon or a default Bell icon
    return IconComponent || Icons.Bell;
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.popup}>
        <div className={styles.header}>
          <h3>Notifications</h3>
        </div>
        <div className={styles.content}>
          {notifications.length === 0 ? (
            <p className={styles.placeholder}>You have no notifications yet</p>
          ) : (
            <ul className={styles.notificationList}>
              {notifications.map((notification) => {
                const IconComponent = getIcon(notification.icon);
                return (
                  <li key={notification.id} className={styles.notificationItem}>
                    <div className={styles.iconWrapper}>
                      <IconComponent size={20} />
                    </div>
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationTitle}>{notification.title}</div>
                      <div className={styles.notificationText}>{notification.text}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
