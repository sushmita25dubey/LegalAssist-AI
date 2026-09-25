import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  MessageSquareText, 
  GitCompare, 
  ShieldAlert, 
  CheckSquare, 
  Briefcase, 
  Sparkles, 
  Settings, 
  HelpCircle,
  X,
  FileText
} from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analyzer', label: 'Document Analyzer', icon: FileSearch },
  { id: 'ask', label: 'Ask Your Document', icon: MessageSquareText },
  { id: 'compare', label: 'Compare Documents', icon: GitCompare },
  { id: 'clauses', label: 'Clause & Risk Analyzer', icon: ShieldAlert },
  { id: 'action', label: 'Action Center', icon: CheckSquare },
  { id: 'prep', label: 'Legal Preparation', icon: Briefcase },
  { id: 'insights', label: 'AI Explanation / Insights', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Safety Policy', icon: HelpCircle },
];

interface SidebarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  isMobileOpen,
  onCloseMobile
}) => {
  const { activeDocument } = useDocument();

  const handleNavClick = (id: string) => {
    onSelectSection(id);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full py-4 px-3 space-y-6">
      {/* Mobile close button */}
      <div className="flex items-center justify-between lg:hidden px-2 pb-2 border-b border-slate-800">
        <span className="font-bold text-sm text-slate-200">Navigation Menu</span>
        <button
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Active Document Status Widget */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          <span>Active Context</span>
          {activeDocument?.isDemo && (
            <span className="text-amber-400 text-[10px] font-bold">Sample Data</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-400 shrink-0" />
          <span className="text-xs font-medium text-slate-200 truncate">
            {activeDocument ? activeDocument.name : 'No Document Loaded'}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav aria-label="Main Application Navigation" className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-400 ${
                isActive
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] rounded-full bg-brand-500/20 text-brand-300">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Legal Boundary Reminder */}
      <div className="pt-4 border-t border-slate-800/80 px-2 text-[11px] text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">Legal Boundary Notice</p>
        <p className="leading-snug">AI information assistant. Not a substitute for a qualified lawyer.</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-slate-800 bg-slate-900/50 shrink-0">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" 
            onClick={onCloseMobile}
            aria-hidden="true" 
          />
          <div className="relative w-64 max-w-xs bg-slate-900 border-r border-slate-800 z-50 h-full">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
