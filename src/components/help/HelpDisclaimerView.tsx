import React from 'react';
import { 
  HelpCircle, 
  ShieldAlert, 
  Lock, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';

export const HelpDisclaimerView: React.FC = () => {
  return (
    <div className="space-y-6 pb-8">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <HelpCircle className="w-6 h-6 text-brand-400" />
          Help & Legal Disclaimer Policy
        </h1>
        <p className="text-xs text-slate-300">
          Exhaustive guide to legal boundaries, privacy security practices, and user guidance.
        </p>
      </div>

      {/* Primary Mandatory Legal Disclaimer */}
      <div className="bg-slate-900/90 border-2 border-amber-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-3 text-amber-300 border-b border-slate-800 pb-3">
          <ShieldAlert className="w-6 h-6 shrink-0 text-amber-400" />
          <h2 className="text-base font-bold uppercase tracking-wide">Legal Boundary & Mandatory Disclaimer Notice</h2>
        </div>

        <div className="space-y-3 text-xs text-slate-200 leading-relaxed">
          <p>
            <strong className="text-amber-300">LegalAssist AI is an informational technology application powered by Generative AI.</strong> It is designed to assist users in reading, organizing, and summarizing legal documents, comparing agreements, and framing questions for legal professionals.
          </p>

          <ul className="space-y-2 list-disc pl-5 text-slate-300">
            <li>
              <strong className="text-white">NOT A LAWYER:</strong> LegalAssist AI is not a law firm, does not provide legal representation, and does not claim to act as an attorney or legal counsel.
            </li>
            <li>
              <strong className="text-white">NO LEGAL ADVICE:</strong> Content produced by this application—including summaries, clause categorizations, and Q&A answers—does NOT constitute legal advice or formal legal opinions.
            </li>
            <li>
              <strong className="text-white">CONSULT QUALIFIED PROFESSIONALS:</strong> Always consult a licensed attorney or qualified legal professional for case-specific advice, formal legal opinions, contract negotiation strategy, or representation.
            </li>
            <li>
              <strong className="text-white">INFORMATIONAL ASSISTANCE ONLY:</strong> Use this tool to prepare for consultations, identify potential areas of interest, and organize document facts.
            </li>
          </ul>
        </div>
      </div>

      {/* Security, Privacy & Safety Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Privacy & Document Security */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <Lock className="w-4 h-4 text-emerald-400" />
            File Security & Privacy Protection
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Temporary Processing:</strong> Documents uploaded to LegalAssist AI are processed transiently in-memory for the current session.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>No Persistent Document Storage:</strong> Uploaded text is not saved to permanent databases or public cloud storage.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>No Secret Exposure:</strong> API credentials (<code className="text-brand-300">GEMINI_API_KEY</code>) are stored strictly server-side and never exposed in client code.</span>
            </li>
          </ul>
        </div>

        {/* Prompt Injection Defense */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <ShieldAlert className="w-4 h-4 text-purple-400" />
            Prompt Injection & Safety Controls
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Untrusted Content Isolation:</strong> Document text is encapsulated within structural XML blocks with strict instructions to ignore embedded commands.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Strict System Hierarchy:</strong> System security prompts take absolute priority over any text contained within user-uploaded files.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Cautious Language Policy:</strong> The AI is constrained from making definitive legality declarations.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* User Guide Workflow */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
        <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <BookOpen className="w-4 h-4 text-brand-400" />
          Recommended Evaluator & User Demo Workflow
        </h3>

        <ol className="space-y-3 text-xs text-slate-300 list-decimal pl-5">
          <li>
            <strong className="text-white">Step 1: Dashboard Overview</strong> — Start on the main dashboard to view statistics and quick action cards.
          </li>
          <li>
            <strong className="text-white">Step 2: Launch Demo Document</strong> — Click <em>"Try Demo Document"</em> to load the synthetic Master Services Agreement immediately.
          </li>
          <li>
            <strong className="text-white">Step 3: Document Analyzer Overview</strong> — Inspect the extracted plain-language summary, party obligations, and risk items.
          </li>
          <li>
            <strong className="text-white">Step 4: Ask Grounded Questions</strong> — Test the <em>Ask Your Document</em> section with questions like <em>"What are the termination conditions?"</em> to inspect evidence citations.
          </li>
          <li>
            <strong className="text-white">Step 5: Compare Agreements</strong> — Navigate to <em>Compare Documents</em> to view side-by-side material differences.
          </li>
          <li>
            <strong className="text-white">Step 6: Action Center & Legal Prep</strong> — Generate printable checklists and consultation briefing documents.
          </li>
        </ol>
      </div>
    </div>
  );
};
