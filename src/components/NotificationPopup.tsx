'use client';

import { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import * as Icons from 'lucide-react';
import styles from './NotificationPopup.module.css';

interface NotificationPopupProps {
  onClose: () => void;
}

export default function NotificationPopup({ onClose }: NotificationPopupProps) {
  const { notifications, removeNotification } = useNotifications();
  const [dismissingIds, setDismissingIds] = useState<Set<string>>(new Set());

  // Helper function to get the icon component from lucide-react
  const getIcon = (iconName: string) => {
    // Convert icon name to PascalCase (e.g., "check-circle" -> "CheckCircle")
    const pascalCase = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    // Get the icon component from lucide-react
    const IconComponent = (Icons as Record<string, React.ComponentType<{ size?: number }>>)[pascalCase];
    
    // Return the icon or a default Bell icon
    return IconComponent || Icons.Bell;
  };

  const handleDismiss = (id: string) => {
    // Add to dismissing set to trigger fade-out animation
    setDismissingIds((prev) => new Set(prev).add(id));
    
    // Remove notification after animation completes
    setTimeout(() => {
      removeNotification(id);
      setDismissingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300); // Match the CSS animation duration
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
            <p className={styles.placeholder}>No notifications.</p>
          ) : (
            <ul className={styles.notificationList}>
              {notifications.map((notification) => {
                const IconComponent = getIcon(notification.icon);
                const isDismissing = dismissingIds.has(notification.id);
                return (
                  <li 
                    key={notification.id} 
                    className={`${styles.notificationItem} ${isDismissing ? styles.dismissing : ''}`}
                  >
                    <div className={styles.iconWrapper}>
                      <IconComponent size={20} />
                    </div>
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationTitle}>{notification.title}</div>
                      <div className={styles.notificationText}>{notification.text}</div>
                    </div>
                    <button 
                      className={styles.dismissButton}
                      onClick={() => handleDismiss(notification.id)}
                      aria-label="Dismiss notification"
                    >
                      <Icons.Trash2 size={16} />
                    </button>
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
