import React, { useState } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { DocumentProvider } from './context/DocumentContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LegalDisclaimerBanner } from './components/common/LegalDisclaimerBanner';
import { ToastContainer } from './components/common/ToastContainer';
import { AccessibilityModal } from './components/common/AccessibilityModal';

import { DashboardView } from './components/dashboard/DashboardView';
import { DocumentAnalyzerView } from './components/analyzer/DocumentAnalyzerView';
import { GroundedAskView } from './components/ask/GroundedAskView';
import { CompareView } from './components/compare/CompareView';
import { ClauseExplorerView } from './components/clauses/ClauseExplorerView';
import { ActionCenterView } from './components/action/ActionCenterView';
import { LegalPrepView } from './components/prep/LegalPrepView';
import { AIInsightsView } from './components/insights/AIInsightsView';
import { SettingsView } from './components/settings/SettingsView';
import { HelpDisclaimerView } from './components/help/HelpDisclaimerView';

export const MainAppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView onNavigate={(id) => setActiveSection(id)} />;
      case 'analyzer':
        return <DocumentAnalyzerView />;
      case 'ask':
        return <GroundedAskView />;
      case 'compare':
        return <CompareView />;
      case 'clauses':
        return <ClauseExplorerView />;
      case 'action':
        return <ActionCenterView />;
      case 'prep':
        return <LegalPrepView />;
      case 'insights':
        return <AIInsightsView />;
      case 'settings':
        return <SettingsView />;
      case 'help':
        return <HelpDisclaimerView />;
      default:
        return <DashboardView onNavigate={(id) => setActiveSection(id)} />;
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-900 text-slate-100 font-sans">
      {/* Top Legal Information Disclaimer Notice */}
      <LegalDisclaimerBanner />

      {/* Main Header */}
      <Header
        activeSection={activeSection}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(id) => setActiveSection(id)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Section Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden focus:outline-none" tabIndex={-1}>
          {renderActiveSection()}
        </main>
      </div>

      {/* Accessibility Settings Modal Overlay */}
      <AccessibilityModal />

      {/* Global Toast Notification Layer */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <NotificationProvider>
      <AccessibilityProvider>
        <DocumentProvider>
          <MainAppContent />
        </DocumentProvider>
      </AccessibilityProvider>
    </NotificationProvider>
  );
}
