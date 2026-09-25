import React, { useState } from 'react';
import { useDocument } from '../../context/DocumentContext';
import { DEMO_COMPARISON_RESULT, DEMO_COMPARISON_DOCUMENT_TEXT } from '../../data/sampleDocument';
import { apiCompareDocuments } from '../../services/apiClient';
import { 
  GitCompare, 
  FileText, 
  Loader2, 
  Sparkles, 
  Layers
} from 'lucide-react';

export const CompareView: React.FC = () => {
  const { documents, activeDocument } = useDocument();
  const [docAId, setDocAId] = useState<string>(activeDocument?.id || 'demo-doc-001');
  const [docBId, setDocBId] = useState<string>('demo-revised-sample');
  const [comparisonResult, setComparisonResult] = useState(DEMO_COMPARISON_RESULT);
  const [isComparing, setIsComparing] = useState(false);

  const docA = documents.find(d => d.id === docAId) || activeDocument;

  const handleRunComparison = async () => {
    setIsComparing(true);
    let docBName = 'Acme_MSA_Revised_Amendment_v2.txt (Revised)';
    let docBText = DEMO_COMPARISON_DOCUMENT_TEXT;

    if (docBId !== 'demo-revised-sample') {
      const selectedDocB = documents.find(d => d.id === docBId);
      if (selectedDocB) {
        docBName = selectedDocB.name;
        docBText = selectedDocB.extractedText;
      }
    }

    try {
      const res = await apiCompareDocuments({
        docAText: docA?.extractedText || '',
        docAName: docA?.name || 'Document A',
        docBText,
        docBName
      });

      if (res.success && res.comparison) {
        setComparisonResult(res.comparison);
      }
    } catch (err) {
      console.error('Comparison error:', err);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <GitCompare className="w-6 h-6 text-purple-400" />
          Compare Documents
        </h1>
        <p className="text-xs text-slate-300">
          Compare two agreement versions side-by-side to highlight added, removed, or modified terms and obligations.
        </p>
      </div>

      {/* Document Selector Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Document A Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-400" /> Document A (Original Base Version)
            </label>
            <select
              value={docAId}
              onChange={(e) => setDocAId(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} {d.isDemo ? '(Fictional Demo)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Document B Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" /> Document B (Revised Version)
            </label>
            <select
              value={docBId}
              onChange={(e) => setDocBId(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="demo-revised-sample">Acme_MSA_Revised_Amendment_v2.txt (Sample Revised Version)</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} {d.isDemo ? '(Fictional Demo)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleRunComparison}
            disabled={isComparing}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
          >
            {isComparing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Comparing Documents...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run Side-by-Side Comparison
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comparison Results Card */}
      {comparisonResult && (
        <div className="space-y-6">
          {/* Executive Overview Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Comparison Summary
              </h3>
              {comparisonResult.hasMaterialDifferences ? (
                <span className="text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-lg">
                  Material Differences Detected
                </span>
              ) : (
                <span className="text-[11px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                  No Material Difference
                </span>
              )}
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{comparisonResult.summary}</p>
          </div>

          {/* Diff Grid Table */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
              Categorized Differences ({comparisonResult.diffs.length})
            </h3>

            {comparisonResult.diffs.length > 0 ? (
              comparisonResult.diffs.map((diff, index) => (
                <div
                  key={index}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <span className="text-xs font-bold text-brand-300 px-2.5 py-0.5 rounded bg-brand-500/10 border border-brand-500/30">
                      {diff.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      diff.significance === 'Substantial' 
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}>
                      {diff.significance} Impact
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Doc A Text */}
                    <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/60 space-y-1">
                      <span className="text-[10px] font-semibold text-brand-400 uppercase block">
                        Document A ({comparisonResult.docAName})
                      </span>
                      <p className="text-slate-300 font-mono text-[11px] leading-relaxed">{diff.docAText}</p>
                    </div>

                    {/* Doc B Text */}
                    <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/60 space-y-1">
                      <span className="text-[10px] font-semibold text-purple-400 uppercase block">
                        Document B ({comparisonResult.docBName})
                      </span>
                      <p className="text-slate-300 font-mono text-[11px] leading-relaxed">{diff.docBText}</p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs space-y-1">
                    <span className="font-semibold text-slate-300 block text-[11px]">Analysis & Significance</span>
                    <p className="text-slate-300 leading-relaxed">{diff.explanation}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 text-center text-xs text-slate-400">
                No material difference detected in the analyzed text.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
