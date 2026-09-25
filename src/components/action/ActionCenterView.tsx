import React, { useState } from 'react';
import { useDocument } from '../../context/DocumentContext';
import { 
  CheckSquare, 
  Printer, 
  RotateCcw, 
  HelpCircle, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const ActionCenterView: React.FC = () => {
  const { checklist, questionsForLawyer, toggleChecklistItem, resetChecklist, activeDocument } = useDocument();
  const { showToast } = useNotification();
  const [copiedQuestions, setCopiedQuestions] = useState(false);

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPercent = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyQuestions = () => {
    const textToCopy = questionsForLawyer.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedQuestions(true);
    showToast('Copied to Clipboard', 'Questions for your lawyer copied successfully.', 'success');
    setTimeout(() => setCopiedQuestions(false), 3000);
  };

  return (
    <div className="space-y-6 pb-8 print:p-6 print:bg-white print:text-black">
      {/* Title & Printable Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white print:text-black flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-brand-400" />
            Action Center & Review Checklist
          </h1>
          <p className="text-xs text-slate-300 print:text-gray-600">
            Actionable post-analysis checklist and document-tailored questions to review with your legal professional.
          </p>
        </div>

        <div className="flex items-center gap-2.5 print:hidden">
          <button
            onClick={resetChecklist}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-slate-300 text-xs font-medium flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Checklist
          </button>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md print:border-gray-300">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 print:text-black">Checklist Completion Progress</span>
          <span className="font-bold text-brand-400">{completedCount} of {checklist.length} items ({progressPercent}%)</span>
        </div>
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-600 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Checklist Feed */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md print:border-gray-300">
        <h3 className="font-bold text-sm text-white print:text-black flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-400" />
          Document Review Checklist ({activeDocument?.name || 'Active Document'})
        </h3>

        <div className="space-y-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                item.completed
                  ? 'bg-slate-900/40 border-slate-800/80 opacity-70'
                  : 'bg-slate-850 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {}} // Handled by parent div
                className="mt-0.5 w-4 h-4 rounded accent-brand-500 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-medium block ${item.completed ? 'line-through text-slate-400' : 'text-slate-100 print:text-black'}`}>
                  {item.text}
                </span>
                {item.sourceRef && (
                  <span className="text-[10px] text-slate-400">{item.sourceRef}</span>
                )}
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Questions to Ask a Legal Professional */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md print:border-gray-300">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-white print:text-black flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Questions to Ask a Legal Professional
          </h3>
          <button
            onClick={handleCopyQuestions}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs text-amber-300 font-semibold flex items-center gap-1.5 transition-colors print:hidden"
          >
            {copiedQuestions ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedQuestions ? 'Copied' : 'Copy All Questions'}
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {questionsForLawyer.length > 0 ? (
            questionsForLawyer.map((q, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-slate-200 print:text-black leading-relaxed">{q}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-400 italic">No tailored lawyer questions generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
