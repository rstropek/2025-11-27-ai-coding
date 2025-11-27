'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import NotificationPopup from './NotificationPopup';
import styles from './NotificationBell.module.css';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button className={styles.bellButton} onClick={togglePopup} aria-label="Notifications">
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </button>
      {isOpen && <NotificationPopup onClose={closePopup} />}
    </div>
  );
}
