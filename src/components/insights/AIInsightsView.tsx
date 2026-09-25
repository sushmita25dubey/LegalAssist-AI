import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Database,
  Terminal
} from 'lucide-react';

export const AIInsightsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-8">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-brand-400" />
          AI Explanation & Architecture Insights
        </h1>
        <p className="text-xs text-slate-300">
          Evaluator transparency breakdown explaining GenAI integration, grounded prompt design, and zero-hallucination safety.
        </p>
      </div>

      {/* High-Level Architecture Flow Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-400" />
            GenAI Execution Architecture Pipeline
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            Strict Grounding Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center text-xs">
          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1">
            <span className="font-bold text-brand-400 block text-[11px]">1. File Input</span>
            <p className="text-slate-300 text-[11px]">PDF / TXT / DOCX File & Size Validation</p>
          </div>
          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1">
            <span className="font-bold text-purple-400 block text-[11px]">2. Text Extraction</span>
            <p className="text-slate-300 text-[11px]">In-Memory Text Stream Parsing</p>
          </div>
          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1">
            <span className="font-bold text-amber-400 block text-[11px]">3. Injection Wrapping</span>
            <p className="text-slate-300 text-[11px]">Prompt Framing & Security Tagging</p>
          </div>
          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1">
            <span className="font-bold text-emerald-400 block text-[11px]">4. Gemini API Call</span>
            <p className="text-slate-300 text-[11px]">Structured JSON Schema Output</p>
          </div>
          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1">
            <span className="font-bold text-cyan-400 block text-[11px]">5. Citation Mapping</span>
            <p className="text-slate-300 text-[11px]">Evidence Check & UI Rendering</p>
          </div>
        </div>
      </div>

      {/* Grid Split: Application vs Gemini Responsibilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Responsibilities */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
          <h3 className="font-bold text-sm text-brand-300 flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <Database className="w-4 h-4 text-brand-400" />
            Application Layer Responsibilities
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span><strong>File Security & MIME Validation:</strong> Rejects unsupported formats, malformed binaries, and files over 10 MB.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span><strong>Prompt Injection Defense:</strong> Frames uploaded text as untrusted raw document data inside XML delimiters to prevent instructions like "ignore system prompt".</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span><strong>Server Secret Isolation:</strong> Keeps <code className="text-brand-300 bg-slate-800 px-1 py-0.5 rounded">GEMINI_API_KEY</code> on Node/Vite server backend endpoints only.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span><strong>JSON Parser Error Recovery:</strong> Validates structured JSON schemas returned by Gemini and recovers gracefully.</span>
            </li>
          </ul>
        </div>

        {/* Gemini AI Responsibilities */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
          <h3 className="font-bold text-sm text-purple-300 flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <Cpu className="w-4 h-4 text-purple-400" />
            Gemini GenAI Responsibilities
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Structured Summarization:</strong> Distills complex legalese into plain-language executive summaries.</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Clause & Obligation Extraction:</strong> Identifies party obligations, notice deadlines, payment terms, and liability caps.</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Grounded Q&A:</strong> Answers user queries strictly based on supplied document text with quotation evidence.</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Side-by-Side Comparison:</strong> Analyzes material differences between Document A and Document B.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Hallucination Prevention Guarantees */}
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 space-y-3 shadow-md">
        <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Zero-Hallucination & Legal Boundary Protections
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 space-y-1">
            <strong className="text-white block font-semibold">Strict Fallback Response</strong>
            <p className="text-slate-300 leading-relaxed">
              If an answer cannot be established from the document text, the system explicitly states: <em>"I couldn't find enough information in the provided document to answer this reliably."</em>
            </p>
          </div>

          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 space-y-1">
            <strong className="text-white block font-semibold">Cautious Language Control</strong>
            <p className="text-slate-300 leading-relaxed">
              The AI is forbidden from labeling clauses as "illegal". Instead, it uses cautious phrasing such as <em>"Requires review"</em> or <em>"May warrant professional review"</em>.
            </p>
          </div>

          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 space-y-1">
            <strong className="text-white block font-semibold">Source Citation Enforcement</strong>
            <p className="text-slate-300 leading-relaxed">
              Every answer is accompanied by direct excerpt quotes from the uploaded document, preventing invented section numbers or quotations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
