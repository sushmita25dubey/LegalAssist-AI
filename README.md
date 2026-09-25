# LegalAssist AI

> **Tagline:** *"Understand your documents. Ask better questions. Navigate legal information with confidence."*

LegalAssist AI is a polished, functional, evaluator-friendly GenAI prototype built for **Hack2Skill PromptWars — Virtual Exclusive Edition**. The platform empowers users to navigate complex legal documents, compare contracts, identify potential risks, ask grounded questions, and prepare actionable briefs for professional legal consultations.

---

## ⚖️ Legal Boundary Notice

> **LEGAL INFORMATION NOTICE:**  
> LegalAssist AI provides **legal information and document assistance ONLY**.  
> - It does **NOT** present itself as a lawyer.  
> - It does **NOT** claim to replace professional legal advice.  
> - Users should **always consult a qualified legal professional** for case-specific advice or formal representation.

---

## 🌟 Hack2Skill Project Description

### Problem Statement
Legal information can be complex, dense, and difficult to navigate without professional assistance. Non-lawyers often struggle to identify unbalanced clauses, ambiguous notice deadlines, asymmetric termination penalties, and high-risk liability provisions.

### Solution
LegalAssist AI uses Google Gemini (`gemini-1.5-flash`) to transform dense legal contracts into plain-language summaries, extract key obligations and dates, answer grounded document queries with direct evidence citations, perform side-by-side contract comparisons, and generate consultation preparation briefs for legal professionals.

---

## 🚀 Key Application Features

1. **Dashboard:** Key session metrics (clearly labeled "Sample Data" in demo mode), quick actions, recent AI activity, and instant Demo Document trigger.
2. **Document Analyzer:** Multi-format file uploader (PDF, TXT, DOCX) with size/MIME validation, text extraction, and structured document overview.
3. **Ask Your Document (Grounded Q&A):** Zero-hallucination Q&A system that answers questions strictly using document evidence with exact clause citations.
4. **Compare Documents:** Side-by-side comparison engine that highlights added, removed, or modified terms between contract versions.
5. **Clause & Risk Analyzer:** Filterable clause explorer categorizing obligations, termination penalties, payment terms, and liability caps with cautious severity flags.
6. **Action Center:** Interactive review checklist with progress tracking, reset/print support, and document-tailored questions for your lawyer.
7. **Legal Preparation Assistant:** Consultation brief builder generating situation summaries, key dates, relevant sections, and required documents to bring.
8. **AI Explanation / Insights:** Architectural transparency panel detailing prompt boundaries, zero-hallucination defenses, and execution telemetry.
9. **Settings:** Accessibility controls (High Contrast, Text Scaling 100%-130%, Reduced Motion), i18n language selector architecture, and API status.
10. **Help & Safety Policy:** Exhaustive legal safety disclosures, privacy policies, and evaluator demo instructions.

---

## 🧠 GenAI Architecture & Integration

```
User (React UI) -> Secure API Route (/api/*) -> Validation & Prompt Wrapping -> Gemini 1.5 Flash -> JSON Schema Parse -> Citation Mapping -> React UI
```

### Where Gemini GenAI is Used:
- **Summarization:** Executive plain-language summary generation.
- **Extraction:** Obligations, parties, dates, and clause risk classification.
- **Grounded Q&A:** Answering user queries strictly using text evidence within `<UNTRUSTED_DOCUMENT_CONTENT>` tags.
- **Contract Comparison:** Detecting material differences between Document A and Document B.
- **Brief Generation:** Structuring preparation briefs for legal consultations.

---

## 🛡️ Security & Privacy Architecture

- **Server-Side API Key Isolation:** `GEMINI_API_KEY` is accessed strictly in `process.env` on server-side endpoints (`/api/*`). Secrets are **never** exposed to client-side JS.
- **Prompt Injection Defense:** External file text is encapsulated inside XML structural tags with strict instructions to ignore embedded commands.
- **File Validation & In-Memory Processing:** Capped at 10 MB. Files are processed transiently in-memory without persistent disk logging.

---

## ♿ Accessibility (WCAG 2.2 AA)

- **Accessibility Center Modal:** Toggle High Contrast mode, adjust text scaling (Normal, Large, X-Large), and enable Reduced Motion.
- **Keyboard Navigation:** Full keyboard support (`Tab`, `Enter`, `Space`, `Escape` to close modals).
- **Z-Index Layer Hierarchy:** Base `z-0`, Header `z-30`, Sidebar `z-40`, Modals `z-50`, Toast Alerts `z-60`.

---

## 🧪 Testing

Run the Vitest suite:
```bash
npm test
```

### Test Coverage Highlights:
- File validation & 10 MB size limits ([`src/test/fileValidation.test.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/fileValidation.test.ts))
- Prompt injection defense wrapping ([`src/test/promptDefense.test.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/promptDefense.test.ts))
- AI response JSON schema recovery ([`src/test/aiParser.test.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/aiParser.test.ts))
- Grounded Q&A & unanswerable fallbacks ([`src/test/groundedQA.test.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/groundedQA.test.ts))
- API route security & method validation ([`src/test/apiSecurity.test.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/apiSecurity.test.ts))
- Accessibility modal controls & keyboard Escape listeners ([`src/test/components/AccessibilityModal.test.tsx`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/components/AccessibilityModal.test.tsx))
- Grounded Q&A suggested prompt pills ([`src/test/components/GroundedAskView.test.tsx`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/components/GroundedAskView.test.tsx))

---

## 💻 Local Setup Instructions

1. **Clone repository:**
   ```bash
   git clone https://github.com/your-repo/legalassist-ai.git
   cd legalassist-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🎬 Evaluator Demo Flow

1. Open the application dashboard at `http://localhost:3000`.
2. Click **"Try Demo Document"** to load the pre-populated fictional *Master Services Agreement*.
3. Inspect the **Document Analyzer** overview (summary, parties, dates, obligations, risk clauses).
4. Navigate to **Ask Your Document** and ask: *"What are the termination conditions?"* Observe the grounded evidence quotation and clause source.
5. Navigate to **Compare Documents** to view side-by-side material differences.
6. Click **Accessibility** in the top header to test High Contrast mode and Text Scaling.

---

## 📌 Remaining Known Limitations & Notes

### 1. Gemini API Fallback
If `GEMINI_API_KEY` is not configured in the `.env` file, LegalAssist AI automatically switches to a structured heuristic fallback engine.

This allows evaluators to explore and test the core application workflow without requiring an external API key.

> **Important:** The fallback engine is a development/demo fallback and should not be interpreted as equivalent to Gemini-powered analysis.

When the Gemini API is configured, AI-powered analysis, document Q&A, comparison, and other GenAI features use the configured Gemini integration.

### 2. DOCX Extraction
DOCX documents are processed using `mammoth` for text extraction.

Complex DOCX files containing embedded images, drawings, charts, or highly specialized formatting may not preserve all visual/layout information during extraction.

The current implementation primarily focuses on extracting textual content.

### 3. Scanned PDF Documents
Scanned PDFs containing images of text require OCR preprocessing before they can be reliably analyzed.

Text-based PDFs are supported directly, while image-only/scanned documents may require OCR before upload.

### 4. Legal Information Disclaimer
LegalAssist AI provides informational assistance and document-understanding features. It does not provide professional legal advice or replace a qualified legal professional.

AI-generated results may contain inaccuracies and should be independently verified, particularly for legally significant decisions.
