# LegalAssist AI

> **Tagline:** *"Understand your documents. Ask better questions. Navigate legal information with confidence."*

LegalAssist AI is a polished, functional, evaluator-friendly GenAI prototype built for **Hack2Skill PromptWars — Virtual Exclusive Edition**. The platform empowers users to navigate complex legal documents, compare contracts, identify potential risks, ask grounded questions, and prepare actionable briefs for professional legal consultations.

---

live url : https://legal-assist-ai-yuzk-7zmmowxzn-sushmitadubey2502-2255s-projects.vercel.app/

## ⚖️ Legal Boundary Notice

> **LEGAL INFORMATION NOTICE:**  
> LegalAssist AI provides **legal information and document assistance ONLY**.  
> - It does **NOT** present itself as a lawyer.  
> - It does **NOT** claim to replace professional legal advice.  
> - Users should **always consult a qualified legal professional** for case-specific advice or formal representation.

---

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
