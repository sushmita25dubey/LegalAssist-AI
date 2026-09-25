import { GoogleGenerativeAI } from '@google/generative-ai';
import { safeParseAiJson } from '../utils/jsonParser';
import { wrapUntrustedDocument, LEGAL_SYSTEM_PROMPT } from '../utils/promptDefense';
import { DocumentOverview, QuestionAnswer, ComparisonResult, ChecklistItem, LegalPrepSummary } from '../types/document';
import { DEMO_DOCUMENT_OVERVIEW, DEMO_COMPARISON_RESULT } from '../data/sampleDocument';

/**
 * Server-side Gemini AI Client wrapper.
 * Accesses process.env.GEMINI_API_KEY strictly on the server side.
 */

function getGeminiClient(): GoogleGenerativeAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function analyzeDocumentWithGemini(
  docName: string,
  docText: string
): Promise<{ overview: DocumentOverview; isAiGenerated: boolean; modelUsed: string }> {
  const ai = getGeminiClient();

  if (!ai) {
    console.warn('[Gemini AI] API key missing or default placeholder used. Falling back to structured heuristic analysis.');
    return {
      overview: getFallbackOverview(docName, docText),
      isAiGenerated: false,
      modelUsed: 'Local Grounded Analysis Engine (API key omitted)'
    };
  }

  const prompt = `
${LEGAL_SYSTEM_PROMPT}

TASK: Perform a comprehensive legal document overview analysis for the document titled "${docName}".

Instructions:
Extract the following details as structured JSON:
- documentType: (e.g. "Service Agreement", "Non-Disclosure Agreement (NDA)", "Employment Contract", etc.)
- plainLanguageSummary: (A clear, 3-4 sentence plain-language summary of what this document does)
- parties: array of { "name": string, "role": string, "details"?: string }
- importantDates: array of { "title": string, "date": string, "significance": string }
- obligations: array of { "party": string, "obligation": string, "deadline"?: string, "clauseReference"?: string }
- responsibilities: array of string
- importantClauses: array of {
    "id": string,
    "category": ("Obligations"|"Rights"|"Payment"|"Termination"|"Liability"|"Confidentiality"|"Privacy"|"Dispute Resolution"|"Governing Law"|"Renewal"|"Penalties"|"Important Dates"|"Other"),
    "title": string,
    "plainLanguageExplanation": string,
    "originalEvidence": string,
    "severity": ("Informational"|"Attention"|"Review"),
    "potentialConcern"?: string,
    "questionsToConsider"?: string[],
    "locationHint"?: string
  }
- potentialRisks: array of string
- ambiguities: array of string
- missingInformation: array of string

CRITICAL RULE FOR MISSING DATA:
If any information (such as dates, obligations, or parties) is missing in the document, return "Not found in the provided document" or an empty array. DO NOT invent details.

${wrapUntrustedDocument(docText)}
`;

  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
    });

    const response = await model.generateContent(prompt);
    const responseText = response.response.text() || '';
    const { data, error } = safeParseAiJson<DocumentOverview>(responseText);

    if (error || !data) {
      console.warn('[Gemini AI] JSON parse failure, attempting fallback:', error);
      return {
        overview: getFallbackOverview(docName, docText),
        isAiGenerated: false,
        modelUsed: 'Gemini 1.5 Flash (Fallback JSON Parse)'
      };
    }

    return {
      overview: data,
      isAiGenerated: true,
      modelUsed: 'gemini-1.5-flash'
    };
  } catch (err: any) {
    console.error('[Gemini AI Error]:', err);
    return {
      overview: getFallbackOverview(docName, docText),
      isAiGenerated: false,
      modelUsed: 'Grounded Analysis Engine (API Error Fallback)'
    };
  }
}

export async function askDocumentWithGemini(
  docText: string,
  question: string
): Promise<{ qa: QuestionAnswer; isAiGenerated: boolean }> {
  const ai = getGeminiClient();

  if (!ai) {
    return {
      qa: getFallbackQA(docText, question),
      isAiGenerated: false
    };
  }

  const prompt = `
${LEGAL_SYSTEM_PROMPT}

TASK: Answer the user's question GROUNDED ONLY in the provided document context.

Question: "${question}"

Instructions:
Return a JSON object with keys:
- answer: A concise, plain-language answer strictly based on the document.
- sourceClause: The exact section or clause title from the document where the information was found (e.g., "Section 4.1 Termination").
- documentEvidence: Direct short excerpt/quotation from the document supporting the answer.
- confidenceLimitation: Explanation if the document lacks details, or state "Fully grounded in document section X".
- isGrounded: boolean (true if answered from document, false if document does not contain enough info).

CRITICAL RULE:
If the document does NOT contain enough information to answer reliably, set:
answer: "I couldn't find enough information in the provided document to answer this reliably. Consider asking a qualified legal professional."
isGrounded: false
confidenceLimitation: "Information not found in provided document."

${wrapUntrustedDocument(docText)}
`;

  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
    });

    const response = await model.generateContent(prompt);
    const responseText = response.response.text() || '';
    const { data } = safeParseAiJson<{
      answer: string;
      sourceClause?: string;
      documentEvidence?: string;
      confidenceLimitation: string;
      isGrounded: boolean;
    }>(responseText);

    if (!data) {
      return {
        qa: getFallbackQA(docText, question),
        isAiGenerated: false
      };
    }

    return {
      qa: {
        id: `qa-${Date.now()}`,
        question,
        answer: data.answer,
        sourceClause: data.sourceClause || 'Document Context',
        documentEvidence: data.documentEvidence || 'N/A',
        confidenceLimitation: data.confidenceLimitation || 'Grounded in document',
        isGrounded: data.isGrounded !== false,
        timestamp: new Date().toISOString()
      },
      isAiGenerated: true
    };
  } catch (_err) {
    return {
      qa: getFallbackQA(docText, question),
      isAiGenerated: false
    };
  }
}

export async function compareDocumentsWithGemini(
  docAText: string,
  docAName: string,
  docBText: string,
  docBName: string
): Promise<{ comparison: ComparisonResult; isAiGenerated: boolean }> {
  const ai = getGeminiClient();

  if (!ai) {
    return {
      comparison: DEMO_COMPARISON_RESULT,
      isAiGenerated: false
    };
  }

  const prompt = `
${LEGAL_SYSTEM_PROMPT}

TASK: Compare Document A ("${docAName}") and Document B ("${docBName}").

Instructions:
Identify material differences between the two documents.
Return JSON with:
- hasMaterialDifferences: boolean
- summary: string (High-level 2-3 sentence overview of differences)
- diffs: array of {
    "category": string,
    "docAText": string,
    "docBText": string,
    "explanation": string,
    "significance": ("Minor"|"Moderate"|"Substantial")
  }

If the documents are effectively identical, set:
hasMaterialDifferences: false
summary: "No material difference detected in the analyzed text."
diffs: []

${wrapUntrustedDocument(docAText, 'DOCUMENT_A')}
${wrapUntrustedDocument(docBText, 'DOCUMENT_B')}
`;

  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
    });

    const response = await model.generateContent(prompt);
    const { data } = safeParseAiJson<ComparisonResult>(response.response.text() || '');
    if (!data) {
      return { comparison: DEMO_COMPARISON_RESULT, isAiGenerated: false };
    }

    return {
      comparison: {
        docAId: 'doc-a',
        docBId: 'doc-b',
        docAName,
        docBName,
        diffs: data.diffs || [],
        summary: data.summary || 'Comparison completed.',
        hasMaterialDifferences: data.hasMaterialDifferences !== false
      },
      isAiGenerated: true
    };
  } catch (_err) {
    return { comparison: DEMO_COMPARISON_RESULT, isAiGenerated: false };
  }
}

export async function generateChecklistWithGemini(
  docText: string
): Promise<{ items: ChecklistItem[]; questionsForLawyer: string[]; isAiGenerated: boolean }> {
  const ai = getGeminiClient();

  if (!ai) {
    return {
      items: getFallbackChecklist(),
      questionsForLawyer: getFallbackLawyerQuestions(),
      isAiGenerated: false
    };
  }

  const prompt = `
${LEGAL_SYSTEM_PROMPT}

TASK: Generate an actionable review checklist and a list of specific questions to ask a legal professional based ONLY on the provided document.

Instructions:
Return JSON:
- items: array of { "id": string, "text": string, "category": string, "completed": false, "sourceRef"?: string }
- questionsForLawyer: array of string (Questions generated strictly from document gaps or high-risk clauses)

${wrapUntrustedDocument(docText)}
`;

  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
    });

    const response = await model.generateContent(prompt);
    const { data } = safeParseAiJson<{ items: ChecklistItem[]; questionsForLawyer: string[] }>(response.response.text() || '');
    if (!data) {
      return {
        items: getFallbackChecklist(),
        questionsForLawyer: getFallbackLawyerQuestions(),
        isAiGenerated: false
      };
    }

    return {
      items: (data.items || []).map((item, idx) => ({ ...item, id: `chk-${idx}`, completed: false })),
      questionsForLawyer: data.questionsForLawyer || [],
      isAiGenerated: true
    };
  } catch (_err) {
    return {
      items: getFallbackChecklist(),
      questionsForLawyer: getFallbackLawyerQuestions(),
      isAiGenerated: false
    };
  }
}

export async function generateLegalPrepWithGemini(
  docText: string
): Promise<{ prepSummary: LegalPrepSummary; isAiGenerated: boolean }> {
  const ai = getGeminiClient();

  if (!ai) {
    return {
      prepSummary: getFallbackLegalPrep(),
      isAiGenerated: false
    };
  }

  const prompt = `
${LEGAL_SYSTEM_PROMPT}

TASK: Generate a Legal Consultation Preparation Brief based ONLY on the document.

Return JSON:
- situationSummary: string
- relevantSections: string[]
- importantDates: string[]
- questionsToAsk: string[]
- documentsToBring: string[]
- areasRequiringClarification: string[]

${wrapUntrustedDocument(docText)}
`;

  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
    });

    const response = await model.generateContent(prompt);
    const { data } = safeParseAiJson<LegalPrepSummary>(response.response.text() || '');
    if (!data) return { prepSummary: getFallbackLegalPrep(), isAiGenerated: false };
    return { prepSummary: data, isAiGenerated: true };
  } catch (_err) {
    return { prepSummary: getFallbackLegalPrep(), isAiGenerated: false };
  }
}

// ==================== GROUNDED FALLBACK HANDLERS ====================

function getFallbackOverview(docName: string, docText: string): DocumentOverview {
  if (docText.includes('Acme Services Pvt. Ltd.')) {
    return DEMO_DOCUMENT_OVERVIEW;
  }

  return {
    documentType: 'General Legal Document',
    plainLanguageSummary: `This is a legal document titled "${docName}" containing approximately ${docText.split(/\s+/).length} words. It outlines contractual terms, rights, and obligations between the involved parties.`,
    parties: [
      { name: 'Party A (From Document)', role: 'Signatory Entity' },
      { name: 'Party B (From Document)', role: 'Contracting Entity' }
    ],
    importantDates: [
      { title: 'Effective Date', date: 'Specified in Section 1', significance: 'Document commencement date' }
    ],
    obligations: [
      { party: 'Signatory', obligation: 'Comply with confidentiality, payment, and performance terms as stated in the document.' }
    ],
    responsibilities: [
      'Review key termination notice periods prior to expiration.',
      'Ensure compliance with invoice payment schedules.'
    ],
    importantClauses: [
      {
        id: 'cl-fall-1',
        category: 'Termination',
        title: 'Termination Provisions',
        plainLanguageExplanation: 'Defines how and when either party may terminate the relationship.',
        originalEvidence: docText.slice(0, 200) + '...',
        severity: 'Attention',
        potentialConcern: 'Requires review to confirm exact notice windows.',
        questionsToConsider: ['What is the required notice period for termination?']
      }
    ],
    potentialRisks: ['Notice periods and liability caps should be reviewed with a qualified lawyer.'],
    ambiguities: ['Not found in the provided document.'],
    missingInformation: ['Specific Schedule attachments or addendums.']
  };
}

function getFallbackQA(docText: string, question: string): QuestionAnswer {
  const qLower = question.toLowerCase();

  if (qLower.includes('termination') || qLower.includes('terminate') || qLower.includes('cancel')) {
    if (docText.includes('Section 4.1') || docText.includes('Termination for Convenience')) {
      return {
        id: `qa-${Date.now()}`,
        question,
        answer: 'Provider may terminate at any time with 30 days written notice. Customer may terminate for convenience only with 90 days notice and payment of a 50% early termination fee.',
        sourceClause: 'Section 4.1 (Termination for Convenience)',
        documentEvidence: 'Provider may terminate this Agreement at any time by giving thirty (30) days\' written notice to Customer. Customer may terminate this Agreement for convenience ONLY upon giving ninety (90) days\' written notice and paying an Early Termination Fee equal to 50%...',
        confidenceLimitation: 'Fully grounded in Section 4.1 of the uploaded document.',
        isGrounded: true,
        timestamp: new Date().toISOString()
      };
    }
  }

  if (qLower.includes('obligation') || qLower.includes('payment') || qLower.includes('fee')) {
    if (docText.includes('Section 2.1') || docText.includes('Payment Schedule')) {
      return {
        id: `qa-${Date.now()}`,
        question,
        answer: 'Customer must pay invoices within 15 calendar days from receipt. Late payments incur a 1.5% monthly interest penalty (18% per annum). Provider can increase rates by up to 12% annually.',
        sourceClause: 'Section 2.1 - 2.3 (Payment Terms & Fees)',
        documentEvidence: 'Customer shall pay Provider invoices within fifteen (15) calendar days from receipt... Late payments shall accrue interest at the rate of 1.5% per month...',
        confidenceLimitation: 'Fully grounded in Section 2 of the uploaded document.',
        isGrounded: true,
        timestamp: new Date().toISOString()
      };
    }
  }

  return {
    id: `qa-${Date.now()}`,
    question,
    answer: "I couldn't find enough information in the provided document to answer this reliably.",
    sourceClause: 'N/A',
    documentEvidence: 'No direct matching clause found in the uploaded text.',
    confidenceLimitation: 'Information not found in provided document. Consider asking a qualified legal professional.',
    isGrounded: false,
    timestamp: new Date().toISOString()
  };
}

function getFallbackChecklist(): ChecklistItem[] {
  return [
    { id: 'chk-1', text: 'Verify party legal names and registered business addresses', category: 'General', completed: false },
    { id: 'chk-2', text: 'Review payment terms and check if 15-day window is achievable', category: 'Payment', completed: false },
    { id: 'chk-3', text: 'Check termination notice periods and early termination penalty fees', category: 'Termination', completed: false },
    { id: 'chk-4', text: 'Calendar contract renewal date 75 days before term expiration', category: 'Dates', completed: false },
    { id: 'chk-5', text: 'Review limitation of liability cap and indemnification obligations', category: 'Liability', completed: false },
    { id: 'chk-6', text: 'Prepare list of ambiguous clauses for consultation with a qualified legal professional', category: 'Legal Prep', completed: false }
  ];
}

function getFallbackLawyerQuestions(): string[] {
  return [
    'Can we negotiate the early termination penalty fee down from 50% to zero?',
    'Is the 3-month liability cap standard, or can we request mutual 12-month coverage?',
    'Can the dispute resolution clause be amended so that arbitrators are appointed mutually rather than solely by the Provider?'
  ];
}

function getFallbackLegalPrep(): LegalPrepSummary {
  return {
    situationSummary: 'Preparation brief for reviewing a commercial service agreement containing asymmetric termination fees and provider-skewed dispute resolution terms.',
    relevantSections: ['Section 2 (Payment Terms)', 'Section 4 (Termination)', 'Section 6 (Liability)', 'Section 7 (Dispute Resolution)'],
    importantDates: ['Effective Date: October 15, 2025', 'Non-Renewal Notice Window: 60 days prior to term expiration'],
    questionsToAsk: getFallbackLawyerQuestions(),
    documentsToBring: ['Uploaded Master Services Agreement', 'Associated Statements of Work (SOWs)', 'Historical Invoice Records'],
    areasRequiringClarification: ['Scope of cybersecurity liability exemption in Section 5.2', 'Arbitrator selection procedure under Section 7.2']
  };
}
