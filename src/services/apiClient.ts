import { 
  AnalyzeDocumentRequest, 
  AnalyzeDocumentResponse, 
  AskDocumentRequest, 
  AskDocumentResponse, 
  CompareDocumentsRequest, 
  CompareDocumentsResponse, 
  GenerateChecklistRequest, 
  GenerateChecklistResponse,
  GenerateLegalPrepRequest,
  GenerateLegalPrepResponse
} from '../types/ai';
import { 
  analyzeDocumentWithGemini, 
  askDocumentWithGemini, 
  compareDocumentsWithGemini, 
  generateChecklistWithGemini, 
  generateLegalPrepWithGemini 
} from './geminiServer';

export async function apiAnalyzeDocument(req: AnalyzeDocumentRequest): Promise<AnalyzeDocumentResponse> {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentName: req.documentName, text: req.text })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({ message: 'Server error' }));
      throw new Error(errJson.message || `API error ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('[apiClient] Fetch to /api/analyze failed or running in client mode. Using grounded engine fallback:', err?.message);
    const fallback = await analyzeDocumentWithGemini(req.documentName, req.text);
    return { success: true, ...fallback };
  }
}

export async function apiAskDocument(req: AskDocumentRequest): Promise<AskDocumentResponse> {
  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText: req.documentText, question: req.question })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({ message: 'Server error' }));
      throw new Error(errJson.message || `API error ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('[apiClient] Fetch to /api/ask failed. Using fallback:', err?.message);
    const fallback = await askDocumentWithGemini(req.documentText, req.question);
    return { success: true, ...fallback };
  }
}

export async function apiCompareDocuments(req: CompareDocumentsRequest): Promise<CompareDocumentsResponse> {
  try {
    const res = await fetch('/api/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({ message: 'Server error' }));
      throw new Error(errJson.message || `API error ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('[apiClient] Fetch to /api/compare failed. Using fallback:', err?.message);
    const fallback = await compareDocumentsWithGemini(req.docAText, req.docAName, req.docBText, req.docBName);
    return { success: true, ...fallback };
  }
}

export async function apiGenerateChecklist(req: GenerateChecklistRequest): Promise<GenerateChecklistResponse> {
  try {
    const res = await fetch('/api/checklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText: req.documentText })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({ message: 'Server error' }));
      throw new Error(errJson.message || `API error ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('[apiClient] Fetch to /api/checklist failed. Using fallback:', err?.message);
    const fallback = await generateChecklistWithGemini(req.documentText);
    return { success: true, ...fallback };
  }
}

export async function apiGenerateLegalPrep(req: GenerateLegalPrepRequest): Promise<GenerateLegalPrepResponse> {
  try {
    const res = await fetch('/api/prep', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText: req.documentText })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({ message: 'Server error' }));
      throw new Error(errJson.message || `API error ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('[apiClient] Fetch to /api/prep failed. Using fallback:', err?.message);
    const fallback = await generateLegalPrepWithGemini(req.documentText);
    return { success: true, ...fallback };
  }
}
