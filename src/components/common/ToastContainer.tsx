import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <aside 
      aria-live="polite" 
      aria-atomic="true"
      aria-label="Notification alerts"
      className="fixed top-4 right-4 z-[60] flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        let bgBorder = 'bg-slate-900 border-slate-700 text-slate-100';
        let Icon = Info;
        let iconColor = 'text-brand-400';

        if (toast.type === 'success') {
          bgBorder = 'bg-slate-900 border-emerald-500/50 text-slate-100';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'error') {
          bgBorder = 'bg-slate-900 border-rose-500/50 text-slate-100';
          Icon = AlertCircle;
          iconColor = 'text-rose-400';
        } else if (toast.type === 'warning') {
          bgBorder = 'bg-slate-900 border-amber-500/50 text-slate-100';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        }

        return (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto border rounded-xl p-4 shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all transform translate-y-0 ${bgBorder}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              aria-label={`Dismiss notification: ${toast.title}`}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
