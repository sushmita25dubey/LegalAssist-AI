export type FontSize = 'normal' | 'large' | 'xlarge';

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: FontSize;
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  autoDismissMs?: number;
}
