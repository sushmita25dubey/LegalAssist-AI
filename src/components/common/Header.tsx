import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useDocument } from '../../context/DocumentContext';
import { Scale, Accessibility, PlayCircle, Menu, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
  const { openAccessibilityModal } = useAccessibility();
  const { activeDocument, loadDemoDocument } = useDocument();

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Mobile menu trigger & App branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white shadow-md shadow-brand-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                LegalAssist AI
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  GenAI Prototype
                </span>
              </span>
              <p className="hidden sm:block text-[11px] text-slate-400">Grounded Legal Information & Document Intelligence</p>
            </div>
          </div>
        </div>

        {/* Action Controls & Active Doc Pill */}
        <div className="flex items-center gap-2.5">
          {/* Active document indicator */}
          {activeDocument && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200">
              <FileText className="w-3.5 h-3.5 text-brand-400" />
              <span className="truncate max-w-[160px] font-medium">{activeDocument.name}</span>
              {activeDocument.isDemo ? (
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">Demo</span>
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </div>
          )}

          {/* Quick Demo Document Button */}
          <button
            onClick={loadDemoDocument}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            title="Load synthetic fictional demo document for evaluator inspection"
          >
            <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Try Demo Document</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Accessibility Settings Trigger */}
          <button
            onClick={openAccessibilityModal}
            aria-label="Open Accessibility Center"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <Accessibility className="w-4 h-4 text-brand-400" />
            <span className="hidden md:inline">Accessibility</span>
          </button>
        </div>
      </div>
    </header>
  );
};
