import React, { useState } from 'react';
import { useDocument } from '../../context/DocumentContext';
import { 
  MessageSquareText, 
  Send, 
  Loader2, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  BookmarkCheck,
  Quote
} from 'lucide-react';

export const GroundedAskView: React.FC = () => {
  const { activeDocument, askQuestion, qaHistory, isAsking } = useDocument();
  const [questionInput, setQuestionInput] = useState('');

  const SUGGESTED_QUESTIONS = [
    'What are my main obligations?',
    'What are the termination conditions?',
    'Which clauses should I review carefully?',
    'What deadlines are mentioned?',
    'What questions should I ask a lawyer?'
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!questionInput.trim() || isAsking) return;

    const q = questionInput.trim();
    setQuestionInput('');
    await askQuestion(q);
  };

  const handlePillClick = (q: string) => {
    setQuestionInput(q);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Section Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <MessageSquareText className="w-6 h-6 text-emerald-400" />
          Ask Your Document (Grounded Q&A)
        </h1>
        <p className="text-xs text-slate-300">
          Ask questions about your uploaded document. Answers are strictly grounded in document text with direct evidence citations.
        </p>
      </div>

      {/* Suggested Prompt Pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Suggested Questions</span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((sq, i) => (
            <button
              key={i}
              onClick={() => handlePillClick(sq)}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-slate-200 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder={
              activeDocument
                ? `Ask anything about "${activeDocument.name}"...`
                : 'Please upload a document to ask questions...'
            }
            disabled={!activeDocument || isAsking}
            className="w-full py-3.5 pl-4 pr-12 rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!activeDocument || !questionInput.trim() || isAsking}
            aria-label="Send question"
            className="absolute right-2 p-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:bg-slate-800 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            {isAsking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </form>

      {/* Active Document Grounding Badge */}
      {activeDocument && (
        <div className="flex items-center justify-between text-xs px-2 text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Answers strictly grounded in: <strong className="text-white">{activeDocument.name}</strong></span>
          </div>
          <span className="text-[11px] text-slate-500">Zero-hallucination policy enforced</span>
        </div>
      )}

      {/* Q&A Response Feed */}
      <div className="space-y-4">
        {qaHistory.length > 0 ? (
          qaHistory.map((qa) => (
            <div key={qa.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
              {/* Question Header */}
              <div className="flex items-start gap-3 border-b border-slate-800 pb-3">
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 shrink-0">
                  <MessageSquareText className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-white">{qa.question}</h3>
                  <span className="text-[10px] text-slate-400">Asked {new Date(qa.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Answer Content */}
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-[10px] uppercase text-brand-400 tracking-wider">Answer</span>
                  <p className="text-slate-200 leading-relaxed font-medium">{qa.answer}</p>
                </div>

                {/* Source & Document Evidence */}
                {qa.isGrounded ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {/* Source Clause */}
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                      <span className="font-semibold text-[10px] uppercase text-emerald-400 flex items-center gap-1">
                        <BookmarkCheck className="w-3.5 h-3.5" /> Source Clause
                      </span>
                      <p className="text-slate-200 font-medium">{qa.sourceClause || 'Document Section'}</p>
                    </div>

                    {/* Document Evidence */}
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                      <span className="font-semibold text-[10px] uppercase text-amber-400 flex items-center gap-1">
                        <Quote className="w-3.5 h-3.5" /> Document Evidence
                      </span>
                      <p className="text-slate-300 italic font-mono text-[11px] leading-relaxed">
                        "{qa.documentEvidence}"
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                    <div>
                      <strong className="block font-semibold">Grounded Limitation Notice</strong>
                      <span>{qa.confidenceLimitation}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="font-semibold text-sm text-slate-300">No questions asked yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Select one of the suggested prompts above or type a custom question to get grounded answers backed by document evidence.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
