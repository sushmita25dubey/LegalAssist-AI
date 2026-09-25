import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const LegalDisclaimerBanner: React.FC = () => {
  return (
    <div 
      role="region" 
      aria-label="Legal Disclaimer Notice"
      className="bg-slate-950 border-b border-amber-500/30 text-amber-200 text-xs py-2 px-4 flex items-center justify-between shadow-inner"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center sm:justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
          <p className="leading-tight">
            <strong className="font-semibold text-amber-300">LEGAL INFORMATION NOTICE:</strong> LegalAssist AI provides informational document assistance and document-grounded analysis. <span className="underline decoration-amber-500/40">It does NOT provide legal advice and does NOT replace a qualified legal professional.</span>
          </p>
        </div>
        <a 
          href="#help" 
          className="hidden md:inline-flex items-center gap-1 text-amber-300 hover:text-white transition-colors underline text-xs shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1"
        >
          <Info className="w-3.5 h-3.5" />
          Read Safety Policy
        </a>
      </div>
    </div>
  );
};
