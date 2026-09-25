import { describe, it, expect } from 'vitest';
import { askDocumentWithGemini } from '../services/geminiServer';
import { DEMO_DOCUMENT_TEXT } from '../data/sampleDocument';

describe('Document Grounded Q&A Tests', () => {
  it('should return grounded answer with clause citation for valid question', async () => {
    const question = 'What are the termination conditions?';
    const { qa } = await askDocumentWithGemini(DEMO_DOCUMENT_TEXT, question);

    expect(qa).toBeDefined();
    expect(qa.question).toBe(question);
    expect(qa.isGrounded).toBe(true);
    expect(qa.answer).toContain('Provider may terminate');
    expect(qa.sourceClause).toContain('Section 4.1');
    expect(qa.documentEvidence).toBeTruthy();
  });

  it('should handle unanswerable questions gracefully with explicit limitation message', async () => {
    const unanswerableQuestion = 'What is the CEO personal home phone number?';
    const { qa } = await askDocumentWithGemini(DEMO_DOCUMENT_TEXT, unanswerableQuestion);

    expect(qa).toBeDefined();
    expect(qa.isGrounded).toBe(false);
    expect(qa.answer).toContain("I couldn't find enough information in the provided document to answer this reliably.");
    expect(qa.confidenceLimitation).toContain('Information not found in provided document');
  });
});
