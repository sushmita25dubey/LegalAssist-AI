import React from 'react';
import { useDocument } from '../../context/DocumentContext';
import { 
  FileText, 
  MessageSquareText, 
  ShieldAlert, 
  CheckSquare, 
  Upload, 
  PlayCircle, 
  ArrowRight,
  Sparkles,
  FileCheck2,
  GitCompare,
  Clock
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (sectionId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { 
    documents, 
    activeDocument, 
    loadDemoDocument, 
    checklist, 
    questionsCount, 
    qaHistory 
  } = useDocument();

  // Calculate statistics derived from active context
  const risksCount = activeDocument?.overview?.importantClauses?.filter(c => c.severity === 'Review' || c.severity === 'Attention').length || 0;
  const pendingChecklistCount = checklist.filter(item => !item.completed).length;

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-brand-950 p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Legal Document Assistance Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Understand your documents. Ask better questions. Navigate legal information with confidence.
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            LegalAssist AI helps you analyze contracts, compare agreements, identify potential risks, and prepare actionable questions for your legal professional.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('analyzer')}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-brand-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
            <button
              onClick={loadDemoDocument}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <PlayCircle className="w-4 h-4" />
              Try Demo Document (Fictional Data)
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards - Explicitly labeled Sample Data when using demo context */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <h2 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">Session Activity Metrics</h2>
          {activeDocument?.isDemo && (
            <span className="text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
              Sample Data (Demo Session)
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Documents Analyzed</span>
              <FileText className="w-4 h-4 text-brand-400" />
            </div>
            <div className="text-2xl font-bold text-white">{documents.length}</div>
            <p className="text-[11px] text-slate-400">In current session</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Questions Asked</span>
              <MessageSquareText className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{questionsCount}</div>
            <p className="text-[11px] text-slate-400">Grounded Q&A queries</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium font-semibold text-amber-300">Risks / Concerns</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-300">{risksCount}</div>
            <p className="text-[11px] text-slate-400">Clauses flagged for review</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Pending Action Items</span>
              <CheckSquare className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">{pendingChecklistCount}</div>
            <p className="text-[11px] text-slate-400">Checklist items remaining</p>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="space-y-3">
        <h2 className="font-semibold text-slate-300 text-sm">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('analyzer')}
            className="group text-left bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-brand-500/50 rounded-2xl p-5 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <div className="p-2.5 w-fit rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-white flex items-center justify-between">
              Analyze Document
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Upload PDF, TXT, or DOCX for plain-language overview and obligations extraction.
            </p>
          </button>

          <button
            onClick={() => onNavigate('ask')}
            className="group text-left bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors mb-3">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-white flex items-center justify-between">
              Ask a Question
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Ask grounded questions about your document with exact source clause evidence.
            </p>
          </button>

          <button
            onClick={() => onNavigate('compare')}
            className="group text-left bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <div className="p-2.5 w-fit rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors mb-3">
              <GitCompare className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-white flex items-center justify-between">
              Compare Documents
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Compare two versions of an agreement side-by-side to highlight added or modified terms.
            </p>
          </button>

          <button
            onClick={() => onNavigate('action')}
            className="group text-left bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <div className="p-2.5 w-fit rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors mb-3">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-white flex items-center justify-between">
              Generate Checklist
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Generate actionable review checklists and tailored questions for your lawyer.
            </p>
          </button>
        </div>
      </div>

      {/* Main Content Split: Recent Documents & Recent AI Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Analyzed Documents */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-400" />
              Recently Analyzed Documents
            </h3>
            <button
              onClick={() => onNavigate('analyzer')}
              className="text-xs text-brand-400 hover:text-brand-300 font-medium hover:underline"
            >
              View All ({documents.length})
            </button>
          </div>

          <div className="space-y-2.5">
            {documents.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                onClick={() => onNavigate('analyzer')}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-700/50 text-slate-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-slate-200 truncate">{doc.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      {doc.overview?.documentType || 'Legal Document'} • {(doc.sizeBytes / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                {doc.isDemo ? (
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-semibold">
                    Sample Data
                  </span>
                ) : (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                    Analyzed
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent AI Activity Timeline */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Recent AI Activity
            </h3>
            <span className="text-[11px] text-slate-400">Grounded Telemetry</span>
          </div>

          <div className="space-y-3">
            {qaHistory.length > 0 ? (
              qaHistory.slice(0, 3).map((qa) => (
                <div key={qa.id} className="p-3 rounded-xl bg-slate-800/30 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-brand-400 font-semibold uppercase">Q&A Query</span>
                  <p className="text-xs font-medium text-slate-200 line-clamp-1">{qa.question}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{qa.answer}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-slate-400 text-xs space-y-2">
                <p>No Q&A queries executed in current session yet.</p>
                <button
                  onClick={() => onNavigate('ask')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-brand-400 rounded-lg text-xs font-medium transition-colors"
                >
                  Ask a question now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
