import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings, FontSize } from '../types/accessibility';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setHighContrast: (enabled: boolean) => void;
  setFontSize: (size: FontSize) => void;
  setReducedMotion: (enabled: boolean) => void;
  isAccessibilityModalOpen: boolean;
  openAccessibilityModal: () => void;
  closeAccessibilityModal: () => void;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  fontSize: 'normal',
  reducedMotion: false,
  screenReaderOptimized: true,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.getItem === 'function') {
      const saved = window.localStorage.getItem('legalassist_a11y_settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (_e) {
          // Fallback
        }
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.setItem === 'function') {
      window.localStorage.setItem('legalassist_a11y_settings', JSON.stringify(settings));
    }

    // Apply high contrast class to html element
    const root = document.documentElement;
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply font size class
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${settings.fontSize}`);

    // Apply reduced motion class
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [settings]);

  const setHighContrast = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, highContrast: enabled }));
  };

  const setFontSize = (size: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  };

  const setReducedMotion = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, reducedMotion: enabled }));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        setHighContrast,
        setFontSize,
        setReducedMotion,
        isAccessibilityModalOpen,
        openAccessibilityModal: () => setIsAccessibilityModalOpen(true),
        closeAccessibilityModal: () => setIsAccessibilityModalOpen(false),
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
