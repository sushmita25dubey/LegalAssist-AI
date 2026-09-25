import React, { useEffect, useRef } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { X, Eye, Type, Zap, Keyboard, Check } from 'lucide-react';

export const AccessibilityModal: React.FC = () => {
  const {
    settings,
    setHighContrast,
    setFontSize,
    setReducedMotion,
    isAccessibilityModalOpen,
    closeAccessibilityModal
  } = useAccessibility();

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard accessibility: Escape to close and focus trap inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAccessibilityModalOpen) return;

      if (e.key === 'Escape') {
        closeAccessibilityModal();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAccessibilityModalOpen, closeAccessibilityModal]);

  useEffect(() => {
    if (isAccessibilityModalOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isAccessibilityModalOpen]);

  if (!isAccessibilityModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto focus:outline-none"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 id="a11y-modal-title" className="text-lg font-bold">Accessibility Center</h2>
              <p className="text-xs text-slate-400">Customize display and navigation to your preference (WCAG 2.2 AA)</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={closeAccessibilityModal}
            aria-label="Close Accessibility Settings"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-sm">
          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <label htmlFor="high-contrast-toggle" className="font-semibold block cursor-pointer">High Contrast Mode</label>
                <span className="text-xs text-slate-400">Enhance borders and background contrast</span>
              </div>
            </div>
            <input
              id="high-contrast-toggle"
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-5 h-5 rounded accent-brand-500 cursor-pointer focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* Text Size Selector */}
          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-2.5">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-brand-400 shrink-0" />
              <div>
                <span className="font-semibold block">Text Scaling</span>
                <span className="text-xs text-slate-400">Adjust text size across the application</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(['normal', 'large', 'xlarge'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                    settings.fontSize === size
                      ? 'bg-brand-600 border-brand-400 text-white shadow-md'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  {settings.fontSize === size && <Check className="w-3.5 h-3.5" />}
                  {size === 'normal' ? 'Normal (100%)' : size === 'large' ? 'Large (115%)' : 'X-Large (130%)'}
                </button>
              ))}
            </div>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <label htmlFor="reduced-motion-toggle" className="font-semibold block cursor-pointer">Reduced Motion</label>
                <span className="text-xs text-slate-400">Disable smooth transitions & animations</span>
              </div>
            </div>
            <input
              id="reduced-motion-toggle"
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-5 h-5 rounded accent-brand-500 cursor-pointer focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* Keyboard Navigation Shortcuts */}
          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-2">
            <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-xs">
              <Keyboard className="w-4 h-4" />
              <span>Keyboard Navigation Shortcuts</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 pl-6 list-disc">
              <li><kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-200">Tab</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-200">Shift + Tab</kbd> - Navigate interactive elements</li>
              <li><kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-200">Escape</kbd> - Close modal dialogs & popups</li>
              <li><kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-200">Enter</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-200">Space</kbd> - Select buttons & toggle switches</li>
            </ul>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={closeAccessibilityModal}
            className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
