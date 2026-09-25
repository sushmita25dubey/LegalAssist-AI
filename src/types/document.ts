export type DocumentType = 
  | 'Service Agreement'
  | 'Non-Disclosure Agreement (NDA)'
  | 'Employment Contract'
  | 'Software License'
  | 'Terms of Service'
  | 'Privacy Policy'
  | 'Lease Agreement'
  | 'Consulting Contract'
  | 'General Legal Document';

export type RiskSeverity = 'Informational' | 'Attention' | 'Review';

export type ClauseCategory =
  | 'Obligations'
  | 'Rights'
  | 'Payment'
  | 'Termination'
  | 'Liability'
  | 'Confidentiality'
  | 'Privacy'
  | 'Dispute Resolution'
  | 'Governing Law'
  | 'Renewal'
  | 'Penalties'
  | 'Important Dates'
  | 'Other';

export interface Clause {
  id: string;
  category: ClauseCategory;
  title: string;
  plainLanguageExplanation: string;
  originalEvidence: string;
  severity: RiskSeverity;
  potentialConcern?: string;
  questionsToConsider?: string[];
  locationHint?: string; // Section or paragraph reference
}

export interface DocumentParty {
  name: string;
  role: string;
  details?: string;
}

export interface DocumentDate {
  title: string;
  date: string;
  significance: string;
}

export interface DocumentObligation {
  party: string;
  obligation: string;
  deadline?: string;
  clauseReference?: string;
}

export interface DocumentOverview {
  documentType: DocumentType;
  plainLanguageSummary: string;
  parties: DocumentParty[];
  importantDates: DocumentDate[];
  obligations: DocumentObligation[];
  responsibilities: string[];
  importantClauses: Clause[];
  potentialRisks: string[];
  ambiguities: string[];
  missingInformation: string[];
}

export interface ProcessedDocument {
  id: string;
  name: string;
  sizeBytes: number;
  mimeType: string;
  extractedText: string;
  uploadedAt: string;
  isDemo?: boolean;
  overview?: DocumentOverview;
  isAnalyzing?: boolean;
  analysisError?: string;
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  sourceClause?: string;
  documentEvidence?: string;
  confidenceLimitation: string;
  isGrounded: boolean;
  timestamp: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  sourceRef?: string;
}

export interface ComparisonDiff {
  category: string;
  docAText: string;
  docBText: string;
  explanation: string;
  significance: 'Minor' | 'Moderate' | 'Substantial';
}

export interface ComparisonResult {
  docAId: string;
  docBId: string;
  docAName: string;
  docBName: string;
  diffs: ComparisonDiff[];
  summary: string;
  hasMaterialDifferences: boolean;
}

export interface LegalPrepSummary {
  situationSummary: string;
  relevantSections: string[];
  importantDates: string[];
  questionsToAsk: string[];
  documentsToBring: string[];
  areasRequiringClarification: string[];
}
