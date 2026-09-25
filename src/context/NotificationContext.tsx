import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '../types/accessibility';

interface NotificationContextType {
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastType, autoDismissMs?: number) => void;
  dismissToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message: string, type: ToastType = 'info', autoDismissMs: number = 4000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const newToast: ToastMessage = { id, title, message, type, autoDismissMs };

      setToasts((prev) => [...prev, newToast]);

      if (autoDismissMs > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, autoDismissMs);
      }
    },
    [dismissToast]
  );

  return (
    <NotificationContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
