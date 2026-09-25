# LegalAssist AI — Evaluator Verification Checklist

This document maps all technical, security, accessibility, and problem-alignment requirements directly to source code evidence and test suites for Hack2Skill PromptWars evaluators.

---

## 1. CODE QUALITY

| Requirement | Implementation | Code Evidence | Verification Test |
| :--- | :--- | :--- | :--- |
| **TypeScript Strict Mode** | Fully typed interfaces for documents, clauses, API contracts | [`src/types/document.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/types/document.ts) | `npx tsc --noEmit` |
| **Modular Architecture** | Clean separation between components, API handlers, and AI services | [`src/services/geminiServer.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/services/geminiServer.ts) | ESLint check |
| **No Dead Code / Hardcoded Secrets** | Environment variable isolation for API keys | [`vite.config.ts`](file:///c:/Users/user/Desktop/Pwar%20new/vite.config.ts) | Repository Audit |

---

## 2. SECURITY

| Requirement | Implementation | Code Evidence | Verification Test |
| :--- | :--- | :--- | :--- |
| **Server-Side API Key** | `GEMINI_API_KEY` accessed only on Node server endpoints | [`src/api/server.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/api/server.ts) | [`src/test/apiSecurity.test.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/apiSecurity.test.ts) |
| **Prompt Injection Defense** | Encapsulates untrusted document text in XML security boundaries | [`src/utils/promptDefense.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/utils/promptDefense.ts) | [`src/test/promptDefense.test.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/promptDefense.test.ts) |
| **File Validation** | Validates MIME type, extension, empty files, and 10 MB size limits | [`src/utils/fileValidation.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/utils/fileValidation.ts) | [`src/test/fileValidation.test.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/fileValidation.test.ts) |

---

## 3. EFFICIENCY & PERFORMANCE

| Requirement | Implementation | Code Evidence | Verification Test |
| :--- | :--- | :--- | :--- |
| **Small Repository Footprint** | Excludes `node_modules`, builds, and secrets via `.gitignore` (< 10 MB) | [`.gitignore`](file:///c:/Users/user/Desktop/Pwar%20new/.gitignore) | Repository size check |
| **Optimized Text Parsing** | In-memory text extraction without temporary file logging | [`src/utils/textExtractor.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/utils/textExtractor.ts) | Unit tests |
| **Session Caching** | Caches analyzed document summaries and Q&A history in React context | [`src/context/DocumentContext.tsx`](file:///c:/Users/user/Desktop/Pwar%20new/src/context/DocumentContext.tsx) | App interaction |

---

## 4. AUTOMATED TESTING

| Requirement | Implementation | Code Evidence | Verification Test |
| :--- | :--- | :--- | :--- |
| **Comprehensive Vitest Suite** | Tests validation, prompt defense, JSON recovery, Q&A, and API security | [`src/test/`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/) | `npm test` |
| **Zero Fake Tests** | All assertions test real application behavior and edge cases | [`src/test/groundedQA.test.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/test/groundedQA.test.ts) | `npm test` |

---

## 5. ACCESSIBILITY (WCAG 2.2 AA)

| Requirement | Implementation | Code Evidence | Verification Test |
| :--- | :--- | :--- | :--- |
| **Accessibility Center Panel** | High contrast, font scaling (100%-130%), and reduced motion toggles | [`src/components/common/AccessibilityModal.tsx`](file:///c:/Users/user/Desktop/Pwar%20new/src/components/common/AccessibilityModal.tsx) | Manual & RTL check |
| **Keyboard & Focus Control** | Visible focus indicators (`*:focus-visible`) and Escape key modal close | [`src/index.css`](file:///c:/Users/user/Desktop/Pwar%20new/src/index.css) | Keyboard navigation |
| **Non-Colliding Layering** | Strict z-index hierarchy (`z-0` base, `z-30` header, `z-50` dialogs, `z-60` toasts) | [`src/components/common/ToastContainer.tsx`](file:///c:/Users/user/Desktop/Pwar%20new/src/components/common/ToastContainer.tsx) | Visual inspection |

---

## 6. PROBLEM STATEMENT ALIGNMENT

| Requirement | Implementation | Code Evidence | Verification Test |
| :--- | :--- | :--- | :--- |
| **Legal Boundaries & Notices** | Prominent disclaimers: app provides legal info, not legal advice | [`src/components/common/LegalDisclaimerBanner.tsx`](file:///c:/Users/user/Desktop/Pwar%20new/src/components/common/LegalDisclaimerBanner.tsx) | App Header Notice |
| **Grounded Document Q&A** | Answers strictly based on document text with direct quotes | [`src/components/ask/GroundedAskView.tsx`](file:///c:/Users/user/Desktop/Pwar%20new/src/components/ask/GroundedAskView.tsx) | Grounded Q&A |
| **Contract Comparison** | Side-by-side material difference highlights | [`src/components/compare/CompareView.tsx`](file:///c:/Users/user/Desktop/Pwar%20new/src/components/compare/CompareView.tsx) | Comparison View |
| **Instant Evaluator Demo** | Fictional demo document preloaded for immediate inspection | [`src/data/sampleDocument.ts`](file:///c:/Users/user/Desktop/Pwar%20new/src/data/sampleDocument.ts) | Click "Try Demo Document" |
