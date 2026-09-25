import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ProcessedDocument, QuestionAnswer, ChecklistItem, ComparisonResult, LegalPrepSummary } from '../types/document';
import { DEMO_PROCESSED_DOCUMENT } from '../data/sampleDocument';
import { apiAnalyzeDocument, apiAskDocument, apiGenerateLegalPrep } from '../services/apiClient';
import { useNotification } from './NotificationContext';

interface DocumentContextType {
  documents: ProcessedDocument[];
  activeDocument: ProcessedDocument | null;
  setActiveDocument: (doc: ProcessedDocument | null) => void;
  uploadDocument: (file: File) => Promise<ProcessedDocument | null>;
  loadDemoDocument: () => void;
  qaHistory: QuestionAnswer[];
  askQuestion: (questionText: string) => Promise<QuestionAnswer | null>;
  checklist: ChecklistItem[];
  questionsForLawyer: string[];
  toggleChecklistItem: (id: string) => void;
  resetChecklist: () => void;
  comparisonDocA: ProcessedDocument | null;
  comparisonDocB: ProcessedDocument | null;
  setComparisonDocA: (doc: ProcessedDocument | null) => void;
  setComparisonDocB: (doc: ProcessedDocument | null) => void;
  comparisonResult: ComparisonResult | null;
  legalPrep: LegalPrepSummary | null;
  generateLegalPrepBrief: () => Promise<LegalPrepSummary | null>;
  isAnalyzing: boolean;
  isAsking: boolean;
  isGeneratingChecklist: boolean;
  isComparing: boolean;
  isGeneratingPrep: boolean;
  questionsCount: number;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useNotification();

  const [documents, setDocuments] = useState<ProcessedDocument[]>([DEMO_PROCESSED_DOCUMENT]);
  const [activeDocument, setActiveDocument] = useState<ProcessedDocument | null>(DEMO_PROCESSED_DOCUMENT);

  const [qaHistory, setQaHistory] = useState<QuestionAnswer[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [questionsForLawyer, setQuestionsForLawyer] = useState<string[]>([]);
  
  const [comparisonDocA, setComparisonDocA] = useState<ProcessedDocument | null>(DEMO_PROCESSED_DOCUMENT);
  const [comparisonDocB, setComparisonDocB] = useState<ProcessedDocument | null>(null);
  const [comparisonResult] = useState<ComparisonResult | null>(null);
  const [legalPrep, setLegalPrep] = useState<LegalPrepSummary | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [isGeneratingChecklist] = useState(false);
  const [isComparing] = useState(false);
  const [isGeneratingPrep, setIsGeneratingPrep] = useState(false);
  const [questionsCount, setQuestionsCount] = useState(0);

  // Initialize active doc overview & checklist if demo document is default
  useEffect(() => {
    if (activeDocument && activeDocument.overview && checklist.length === 0) {
      if (activeDocument.isDemo) {
        // Pre-populate checklist from demo doc clauses
        const initialItems: ChecklistItem[] = activeDocument.overview.importantClauses.map((c, i) => ({
          id: `demo-chk-${i}`,
          text: `Review ${c.title} (${c.locationHint || 'Section'})`,
          category: c.category,
          completed: false,
          sourceRef: c.locationHint
        }));
        setChecklist(initialItems);
        setQuestionsForLawyer(activeDocument.overview.importantClauses.flatMap(c => c.questionsToConsider || []));
      }
    }
  }, [activeDocument, checklist.length]);

  const loadDemoDocument = useCallback(() => {
    setActiveDocument(DEMO_PROCESSED_DOCUMENT);
    if (!documents.some(d => d.id === DEMO_PROCESSED_DOCUMENT.id)) {
      setDocuments(prev => [DEMO_PROCESSED_DOCUMENT, ...prev]);
    }
    showToast('Demo Mode Activated', 'Loaded fictional Master Services Agreement demo document.', 'info');
  }, [documents, showToast]);

  const uploadDocument = async (file: File): Promise<ProcessedDocument | null> => {
    setIsAnalyzing(true);
    showToast('Uploading & Processing', `Extracting text from ${file.name}...`, 'info', 3000);

    try {

      const { extractTextFromFile } = await import('../utils/textExtractor');
      const extractedText = await extractTextFromFile(file);

      const newDoc: ProcessedDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        sizeBytes: file.size,
        mimeType: file.type || 'text/plain',
        extractedText,
        uploadedAt: new Date().toISOString(),
        isAnalyzing: true
      };

      setDocuments(prev => [newDoc, ...prev]);
      setActiveDocument(newDoc);

      // Perform AI Analysis via secure API route
      showToast('Analyzing Document', 'Generating plain-language summary & identifying risk clauses...', 'info', 4000);
      const apiRes = await apiAnalyzeDocument({
        documentId: newDoc.id,
        documentName: newDoc.name,
        text: extractedText
      });

      if (apiRes.success && apiRes.overview) {
        const updatedDoc: ProcessedDocument = {
          ...newDoc,
          overview: apiRes.overview,
          isAnalyzing: false
        };

        setDocuments(prev => prev.map(d => d.id === newDoc.id ? updatedDoc : d));
        setActiveDocument(updatedDoc);

        // Auto-generate initial checklist
        if (apiRes.overview.importantClauses) {
          const autoChecklist: ChecklistItem[] = apiRes.overview.importantClauses.map((c, i) => ({
            id: `chk-${Date.now()}-${i}`,
            text: `Review ${c.title}`,
            category: c.category,
            completed: false,
            sourceRef: c.locationHint
          }));
          setChecklist(autoChecklist);
        }

        showToast('Analysis Complete', `Document "${file.name}" analyzed successfully.`, 'success');
        setIsAnalyzing(false);
        return updatedDoc;
      } else {
        throw new Error(apiRes.error || 'Failed to generate document analysis overview.');
      }
    } catch (err: any) {
      console.error('Upload & analysis error:', err);
      showToast('Analysis Warning', err.message || 'An error occurred during analysis.', 'error');
      setIsAnalyzing(false);
      return null;
    }
  };

  const askQuestion = async (questionText: string): Promise<QuestionAnswer | null> => {
    if (!activeDocument) {
      showToast('No Document Selected', 'Please upload or select a document to ask questions.', 'warning');
      return null;
    }

    setIsAsking(true);
    setQuestionsCount(prev => prev + 1);

    try {
      const res = await apiAskDocument({
        documentId: activeDocument.id,
        documentText: activeDocument.extractedText,
        question: questionText
      });

      if (res.success && res.qa) {
        setQaHistory(prev => [res.qa!, ...prev]);
        setIsAsking(false);
        return res.qa;
      } else {
        throw new Error(res.error || 'Could not fetch answer.');
      }
    } catch (err: any) {
      showToast('Q&A Error', err.message || 'Error processing question.', 'error');
      setIsAsking(false);
      return null;
    }
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const resetChecklist = () => {
    setChecklist(prev => prev.map(item => ({ ...item, completed: false })));
    showToast('Checklist Reset', 'All checklist items have been reset to uncompleted.', 'info');
  };

  const generateLegalPrepBrief = async (): Promise<LegalPrepSummary | null> => {
    if (!activeDocument) return null;
    setIsGeneratingPrep(true);
    showToast('Generating Brief', 'Preparing legal consultation briefing document...', 'info', 3000);

    try {
      const res = await apiGenerateLegalPrep({
        documentId: activeDocument.id,
        documentText: activeDocument.extractedText
      });

      if (res.success && res.prepSummary) {
        setLegalPrep(res.prepSummary);
        showToast('Brief Ready', 'Legal consultation brief generated successfully.', 'success');
        setIsGeneratingPrep(false);
        return res.prepSummary;
      }
      throw new Error(res.error || 'Failed to generate prep brief');
    } catch (err: any) {
      showToast('Prep Brief Error', err.message || 'Error generating preparation brief.', 'error');
      setIsGeneratingPrep(false);
      return null;
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        activeDocument,
        setActiveDocument,
        uploadDocument,
        loadDemoDocument,
        qaHistory,
        askQuestion,
        checklist,
        questionsForLawyer,
        toggleChecklistItem,
        resetChecklist,
        comparisonDocA,
        comparisonDocB,
        setComparisonDocA,
        setComparisonDocB,
        comparisonResult,
        legalPrep,
        generateLegalPrepBrief,
        isAnalyzing,
        isAsking,
        isGeneratingChecklist,
        isComparing,
        isGeneratingPrep,
        questionsCount
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = (): DocumentContextType => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
