import React, { useState } from 'react';
import { useDocument } from '../../context/DocumentContext';
import { 
  ShieldAlert, 
  Filter, 
  Info, 
  AlertTriangle, 
  FileText, 
  HelpCircle, 
  CheckCircle2,
  Search
} from 'lucide-react';

export const ClauseExplorerView: React.FC = () => {
  const { activeDocument } = useDocument();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const clauses = activeDocument?.overview?.importantClauses || [];

  const CATEGORIES = [
    'All',
    'Obligations',
    'Rights',
    'Payment',
    'Termination',
    'Liability',
    'Confidentiality',
    'Dispute Resolution',
    'Renewal'
  ];

  const filteredClauses = clauses.filter((clause) => {
    const matchesCategory = selectedCategory === 'All' || clause.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'All' || clause.severity === selectedSeverity;
    const matchesQuery = searchQuery === '' || 
      clause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.plainLanguageExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.originalEvidence.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSeverity && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-amber-400" />
          Clause & Risk Analyzer (Clause Explorer)
        </h1>
        <p className="text-xs text-slate-300">
          Categorized clause breakdown with plain-language explanations, evidence excerpts, and flagged potential concerns.
        </p>
      </div>

      {/* Controls & Filters Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clauses..."
              className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat} Category</option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="All">All Severity Levels</option>
              <option value="Review">Requires Review</option>
              <option value="Attention">Attention Needed</option>
              <option value="Informational">Informational</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clause Cards Feed */}
      <div className="space-y-4">
        {filteredClauses.length > 0 ? (
          filteredClauses.map((clause) => {
            let severityBadge = 'bg-slate-800 text-slate-300 border-slate-700';
            let SeverityIcon = Info;

            if (clause.severity === 'Review') {
              severityBadge = 'bg-rose-500/10 text-rose-300 border-rose-500/30';
              SeverityIcon = ShieldAlert;
            } else if (clause.severity === 'Attention') {
              severityBadge = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
              SeverityIcon = AlertTriangle;
            } else {
              severityBadge = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
              SeverityIcon = CheckCircle2;
            }

            return (
              <div
                key={clause.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md"
              >
                {/* Clause Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/30">
                      {clause.category}
                    </span>
                    <h3 className="font-bold text-sm text-white">{clause.title}</h3>
                    {clause.locationHint && (
                      <span className="text-[11px] text-slate-400">({clause.locationHint})</span>
                    )}
                  </div>

                  <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border font-medium ${severityBadge}`}>
                    <SeverityIcon className="w-3.5 h-3.5" />
                    {clause.severity === 'Review' ? 'May warrant professional review' : clause.severity}
                  </span>
                </div>

                {/* Plain-Language Explanation */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">Plain-Language Summary</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">{clause.plainLanguageExplanation}</p>
                </div>

                {/* Original Document Evidence */}
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-400" /> Original Text Evidence
                  </span>
                  <p className="text-xs text-slate-300 font-mono italic leading-relaxed">
                    "{clause.originalEvidence}"
                  </p>
                </div>

                {/* Potential Concern & Questions to Consider */}
                {(clause.potentialConcern || (clause.questionsToConsider && clause.questionsToConsider.length > 0)) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {clause.potentialConcern && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                        <span className="font-semibold text-amber-300 flex items-center gap-1 text-[11px]">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Potential Concern
                        </span>
                        <p className="text-amber-200/90 leading-relaxed">{clause.potentialConcern}</p>
                      </div>
                    )}

                    {clause.questionsToConsider && clause.questionsToConsider.length > 0 && (
                      <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-xs space-y-1">
                        <span className="font-semibold text-brand-300 flex items-center gap-1 text-[11px]">
                          <HelpCircle className="w-3.5 h-3.5 text-brand-400" /> Questions to Consider
                        </span>
                        <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
                          {clause.questionsToConsider.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
            No clauses found matching the selected filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};
