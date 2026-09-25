import React, { useEffect } from 'react';
import { useDocument } from '../../context/DocumentContext';
import { 
  Briefcase, 
  ShieldAlert, 
  Calendar, 
  FileText, 
  HelpCircle, 
  FolderCheck, 
  AlertTriangle,
  Loader2,
  Printer
} from 'lucide-react';

export const LegalPrepView: React.FC = () => {
  const { activeDocument, legalPrep, generateLegalPrepBrief, isGeneratingPrep } = useDocument();

  useEffect(() => {
    if (activeDocument && !legalPrep) {
      generateLegalPrepBrief();
    }
  }, [activeDocument, legalPrep, generateLegalPrepBrief]);

  return (
    <div className="space-y-6 pb-8 print:p-6 print:bg-white print:text-black">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white print:text-black flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-brand-400" />
            Legal Consultation Preparation Assistant
          </h1>
          <p className="text-xs text-slate-300 print:text-gray-600">
            Generate a structured briefing document to maximize the efficiency of your professional legal consultation.
          </p>
        </div>

        <div className="flex items-center gap-2.5 print:hidden">
          <button
            onClick={() => generateLegalPrepBrief()}
            disabled={isGeneratingPrep}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            {isGeneratingPrep ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Briefcase className="w-3.5 h-3.5" />}
            {isGeneratingPrep ? 'Generating Brief...' : 'Regenerate Brief'}
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Brief
          </button>
        </div>
      </div>

      {/* Mandatory Non-Advice Disclaimer Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-amber-200 text-xs flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-amber-300">IMPORTANT NOTICE:</strong> This preparation summary is informational and is NOT legal advice. LegalAssist AI organizes document facts so you can ask structured questions during your consultation with a licensed legal professional.
        </p>
      </div>

      {/* Preparation Summary Brief Display */}
      {legalPrep ? (
        <div className="space-y-6">
          {/* Situation Summary */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md print:border-gray-300">
            <h3 className="font-bold text-sm text-white print:text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-400" />
              1. Situation Summary
            </h3>
            <p className="text-xs text-slate-200 print:text-black leading-relaxed">
              {legalPrep.situationSummary}
            </p>
          </div>

          {/* Relevant Document Sections & Important Dates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Relevant Sections */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md print:border-gray-300">
              <h3 className="font-bold text-sm text-white print:text-black flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                2. Key Document Sections to Review
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300 print:text-black list-disc pl-4">
                {legalPrep.relevantSections.map((sec, i) => (
                  <li key={i}>{sec}</li>
                ))}
              </ul>
            </div>

            {/* Important Dates */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md print:border-gray-300">
              <h3 className="font-bold text-sm text-white print:text-black flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                3. Critical Dates & Timelines
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300 print:text-black list-disc pl-4">
                {legalPrep.importantDates.map((date, i) => (
                  <li key={i}>{date}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Questions to Ask & Documents to Bring */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Questions to Ask */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md print:border-gray-300">
              <h3 className="font-bold text-sm text-white print:text-black flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                4. Primary Questions for Your Consultation
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300 print:text-black list-disc pl-4">
                {legalPrep.questionsToAsk.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Documents to Bring */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md print:border-gray-300">
              <h3 className="font-bold text-sm text-white print:text-black flex items-center gap-2">
                <FolderCheck className="w-4 h-4 text-brand-400" />
                5. Recommended Documents to Bring
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300 print:text-black list-disc pl-4">
                {legalPrep.documentsToBring.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Areas Requiring Clarification */}
          <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 space-y-3 shadow-md print:border-gray-300">
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              6. Areas Requiring Explicit Legal Clarification
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 print:text-black list-disc pl-4">
              {legalPrep.areasRequiringClarification.map((area, i) => (
                <li key={i}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
          {isGeneratingPrep ? 'Generating consultation brief...' : 'Click "Regenerate Brief" to create a consultation brief.'}
        </div>
      )}
    </div>
  );
};
