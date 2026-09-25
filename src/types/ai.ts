import { DocumentOverview, QuestionAnswer, ComparisonResult, LegalPrepSummary, ChecklistItem } from './document';

export interface AnalyzeDocumentRequest {
  documentId: string;
  documentName: string;
  text: string;
}

export interface AnalyzeDocumentResponse {
  success: boolean;
  overview?: DocumentOverview;
  error?: string;
  isAiGenerated: boolean;
  modelUsed?: string;
}

export interface AskDocumentRequest {
  documentId: string;
  documentText: string;
  question: string;
}

export interface AskDocumentResponse {
  success: boolean;
  qa?: QuestionAnswer;
  error?: string;
  isAiGenerated: boolean;
}

export interface CompareDocumentsRequest {
  docAText: string;
  docAName: string;
  docBText: string;
  docBName: string;
}

export interface CompareDocumentsResponse {
  success: boolean;
  comparison?: ComparisonResult;
  error?: string;
  isAiGenerated: boolean;
}

export interface GenerateChecklistRequest {
  documentId: string;
  documentText: string;
}

export interface GenerateChecklistResponse {
  success: boolean;
  items?: ChecklistItem[];
  questionsForLawyer?: string[];
  error?: string;
  isAiGenerated: boolean;
}

export interface GenerateLegalPrepRequest {
  documentId: string;
  documentText: string;
  userNotes?: string;
}

export interface GenerateLegalPrepResponse {
  success: boolean;
  prepSummary?: LegalPrepSummary;
  error?: string;
  isAiGenerated: boolean;
}
