import React, { useState, useRef } from 'react';
import { useDocument } from '../../context/DocumentContext';
import { validateFile } from '../../utils/fileValidation';
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  ShieldAlert, 
  Calendar, 
  Users, 
  FileCheck2,
  HelpCircle,
  PlayCircle
} from 'lucide-react';

export const DocumentAnalyzerView: React.FC = () => {
  const { activeDocument, uploadDocument, loadDemoDocument, isAnalyzing } = useDocument();
  const [dragOver, setDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setValidationError(null);
    const val = validateFile(file);

    if (!val.isValid) {
      setValidationError(val.error || 'Invalid file format.');
      return;
    }

    await uploadDocument(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };

  const overview = activeDocument?.overview;

  return (
    <div className="space-y-8 pb-8">
      {/* Section Title & Description */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <FileCheck2 className="w-6 h-6 text-brand-400" />
          Document Analyzer
        </h1>
        <p className="text-xs text-slate-300">
          Upload contracts, NDAs, or agreements for automated structured extraction and plain-language summary.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          dragOver
            ? 'border-brand-400 bg-brand-500/10'
            : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.docx,.doc"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
          id="doc-upload-input"
        />

        <div className="max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mx-auto">
            {isAnalyzing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-white">
              {isAnalyzing ? 'Extracting & Analyzing Document...' : 'Drag and drop your document here'}
            </h3>
            <p className="text-xs text-slate-400">
              Supports <strong className="text-slate-300">PDF (.pdf)</strong>, <strong className="text-slate-300">Text (.txt)</strong>, or <strong className="text-slate-300">Word (.docx)</strong> up to 10 MB.
            </p>
          </div>

          {!isAnalyzing && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                Browse Files
              </button>
              <button
                onClick={loadDemoDocument}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                Load Demo Document
              </button>
            </div>
          )}

          {/* Validation Error Banner */}
          {validationError && (
            <div role="alert" className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{validationError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Processing Status / Metadata Card */}
      {activeDocument && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-800 text-brand-400 border border-slate-700">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                  {activeDocument.name}
                  {activeDocument.isDemo && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                      Fictional Demo Document
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400">
                  Size: {(activeDocument.sizeBytes / 1024).toFixed(1)} KB • Type: {activeDocument.mimeType}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {isAnalyzing ? (
                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" /> Analyzing with Gemini...
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" /> Ready for Review
                </span>
              )}
            </div>
          </div>

          {/* DOCUMENT OVERVIEW DISPLAY */}
          {overview && (
            <div className="space-y-6">
              {/* Document Type & Plain Language Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-brand-400">Document Type</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/30">
                    {overview.documentType}
                  </span>
                </div>
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-1.5">
                  <h4 className="font-semibold text-xs text-slate-200">Plain-Language Executive Summary</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{overview.plainLanguageSummary}</p>
                </div>
              </div>

              {/* Key Parties & Important Dates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Parties */}
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-xs text-slate-200 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-400" />
                    Key Contracting Parties
                  </h4>
                  {overview.parties && overview.parties.length > 0 ? (
                    <ul className="space-y-2 text-xs">
                      {overview.parties.map((party, i) => (
                        <li key={i} className="p-2 rounded bg-slate-900/60 border border-slate-800">
                          <span className="font-semibold text-white">{party.name}</span>
                          <span className="text-slate-400 ml-1">({party.role})</span>
                          {party.details && <p className="text-[11px] text-slate-400 mt-0.5">{party.details}</p>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Not found in the provided document.</p>
                  )}
                </div>

                {/* Important Dates */}
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-xs text-slate-200 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    Important Dates & Deadlines
                  </h4>
                  {overview.importantDates && overview.importantDates.length > 0 ? (
                    <ul className="space-y-2 text-xs">
                      {overview.importantDates.map((dateObj, i) => (
                        <li key={i} className="p-2 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-start gap-2">
                          <div>
                            <span className="font-semibold text-white block">{dateObj.title}</span>
                            <span className="text-[11px] text-slate-400">{dateObj.significance}</span>
                          </div>
                          <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                            {dateObj.date}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Not found in the provided document.</p>
                  )}
                </div>
              </div>

              {/* Obligations & Responsibilities */}
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-xs text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Obligations & Responsibilities
                </h4>
                {overview.obligations && overview.obligations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {overview.obligations.map((ob, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-brand-300">{ob.party}</span>
                          {ob.clauseReference && <span className="text-slate-400">{ob.clauseReference}</span>}
                        </div>
                        <p className="text-slate-200">{ob.obligation}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">Not found in the provided document.</p>
                )}
              </div>

              {/* Potential Risks & Ambiguities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Potential Risks */}
                <div className="bg-slate-800/40 border border-amber-500/30 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-xs text-amber-300 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Potential Risks & Flagged Items
                  </h4>
                  {overview.potentialRisks && overview.potentialRisks.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
                      {overview.potentialRisks.map((risk, i) => (
                        <li key={i}>{risk}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Not found in the provided document.</p>
                  )}
                </div>

                {/* Ambiguities & Missing Information */}
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-xs text-slate-200 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-400" />
                    Ambiguities & Missing Information
                  </h4>
                  {overview.missingInformation && overview.missingInformation.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
                      {overview.missingInformation.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Not found in the provided document.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
