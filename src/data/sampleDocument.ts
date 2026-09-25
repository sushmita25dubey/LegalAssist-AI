import { ProcessedDocument, DocumentOverview, ComparisonResult } from '../types/document';

export const DEMO_DOCUMENT_TEXT = `MASTER SERVICES AGREEMENT

This Master Services Agreement ("Agreement") is entered into as of October 15, 2025 ("Effective Date"), by and between Acme Services Pvt. Ltd., a company organized under the laws of India with its principal place of business at 100 Tech Park, Bengaluru ("Provider"), and Nexus Global Enterprises LLC ("Customer").

1. SCOPE OF SERVICES
Provider agrees to perform professional IT consulting and cloud software management services as described in mutually executed Statements of Work ("SOW").

2. PAYMENT TERMS & FEES
2.1 Payment Schedule: Customer shall pay Provider invoices within fifteen (15) calendar days from receipt of invoice ("Payment Due Date").
2.2 Late Payment Penalty: Late payments shall accrue interest at the rate of 1.5% per month (18% per annum) or the maximum legal rate, whichever is higher.
2.3 Price Adjustments: Provider reserves the right to increase service rates by up to 12% annually upon thirty (30) days' written notice prior to contract renewal.

3. TERM & AUTOMATIC RENEWAL
3.1 Term: This Agreement commences on the Effective Date and continues for an initial period of twelve (12) months ("Initial Term").
3.2 Automatic Renewal: Upon expiration of the Initial Term, this Agreement shall automatically renew for successive twelve (12) month terms unless either party provides written notice of non-renewal at least sixty (60) days prior to the end of the then-current term.

4. TERMINATION
4.1 Termination for Convenience: Provider may terminate this Agreement at any time by giving thirty (30) days' written notice to Customer. Customer may terminate this Agreement for convenience ONLY upon giving ninety (90) days' written notice and paying an Early Termination Fee equal to 50% of the remaining SOW contract value.
4.2 Termination for Cause: Either party may terminate immediately if the other party breaches a material obligation and fails to cure such breach within fourteen (14) days of receiving written notice.

5. CONFIDENTIALITY & DATA PRIVACY
5.1 Definition: Each party agrees to hold in strict confidence all proprietary technical, business, and legal information disclosed by the other party.
5.2 Customer Data: Provider shall maintain reasonable security safeguards for Customer data but does not guarantee immunity from zero-day cyber attacks.

6. LIMITATION OF LIABILITY & INDEMNIFICATION
6.1 Liability Cap: Provider's total aggregate liability under this Agreement shall not exceed the fees actually paid by Customer in the three (3) months preceding the claim event.
6.2 Consequential Damages: Provider shall NOT be liable for any indirect, punitive, incidental, or consequential damages, including lost profits or business interruption.
6.3 Unilateral Indemnity: Customer agrees to indemnify, defend, and hold harmless Provider from any third-party claims, lawsuits, or regulatory fines arising out of Customer's use of the services.

7. GOVERNING LAW & DISPUTE RESOLUTION
7.1 Governing Law: This Agreement shall be governed by and construed in accordance with the laws of India.
7.2 Dispute Resolution: Any dispute, controversy, or claim shall first be submitted to binding arbitration in Bengaluru under the Rules of Arbitration of the International Chamber of Commerce. The arbitration panel shall consist of a single arbitrator appointed by Provider.
`;

export const DEMO_DOCUMENT_OVERVIEW: DocumentOverview = {
  documentType: 'Service Agreement',
  plainLanguageSummary: 'This is a Master Services Agreement between Acme Services Pvt. Ltd. (Provider) and Nexus Global Enterprises LLC (Customer) for IT consulting services. It features strict 15-day payment terms, automatic 12-month renewals with a 60-day notice period, asymmetric termination conditions (Provider requires 30 days notice; Customer requires 90 days plus a 50% early termination fee), and a low liability cap for the Provider (capped at 3 months of fees).',
  parties: [
    { name: 'Acme Services Pvt. Ltd.', role: 'Provider', details: 'Registered company in Bengaluru, India' },
    { name: 'Nexus Global Enterprises LLC', role: 'Customer', details: 'Client entity receiving IT services' }
  ],
  importantDates: [
    { title: 'Effective Date', date: 'October 15, 2025', significance: 'Agreement commencement date' },
    { title: 'Payment Due Date', date: 'Within 15 days of invoice', significance: 'Due date for invoice payments' },
    { title: 'Non-Renewal Notice Deadline', date: '60 days before term end', significance: 'Deadline to prevent automatic 12-month renewal' },
    { title: 'Cure Period for Breach', date: '14 days from notice', significance: 'Time allowed to cure material breach before termination' }
  ],
  obligations: [
    { party: 'Customer', obligation: 'Pay invoices within 15 calendar days from receipt.', deadline: '15 days from invoice', clauseReference: 'Section 2.1' },
    { party: 'Customer', obligation: 'Provide 90 days written notice and pay 50% early termination fee for convenience termination.', deadline: '90 days prior', clauseReference: 'Section 4.1' },
    { party: 'Customer', obligation: 'Indemnify and defend Provider against third-party claims.', clauseReference: 'Section 6.3' },
    { party: 'Provider', obligation: 'Perform professional IT consulting and cloud software management services.', clauseReference: 'Section 1' },
    { party: 'Provider', obligation: 'Provide 30 days written notice for rate increases or convenience termination.', clauseReference: 'Section 2.3 & 4.1' }
  ],
  responsibilities: [
    'Customer must maintain prompt invoice payments and adhere to notice windows.',
    'Provider is responsible for IT consulting delivery according to SOWs.',
    'Both parties are obligated to preserve strict confidentiality of technical and business information.'
  ],
  importantClauses: [
    {
      id: 'clause-1',
      category: 'Termination',
      title: 'Asymmetric Termination for Convenience',
      plainLanguageExplanation: 'Provider can cancel with 30 days notice at any time without penalty, whereas Customer must give 90 days notice and pay a heavy penalty of 50% of the remaining contract value.',
      originalEvidence: 'Provider may terminate this Agreement at any time by giving thirty (30) days\' written notice to Customer. Customer may terminate this Agreement for convenience ONLY upon giving ninety (90) days\' written notice and paying an Early Termination Fee equal to 50% of the remaining SOW contract value.',
      severity: 'Review',
      potentialConcern: 'Unbalanced termination rights and severe financial penalty for Customer cancellation.',
      questionsToConsider: [
        'Can we negotiate equal 30-day notice periods for both parties?',
        'Can the 50% early termination penalty fee be removed or capped?'
      ],
      locationHint: 'Section 4.1'
    },
    {
      id: 'clause-2',
      category: 'Liability',
      title: 'Low Provider Liability Cap & Unilateral Customer Indemnity',
      plainLanguageExplanation: 'Provider limits maximum damages to fees paid in the last 3 months, while Customer is required to pay for Provider\'s legal defense against third-party claims.',
      originalEvidence: 'Provider\'s total aggregate liability under this Agreement shall not exceed the fees actually paid by Customer in the three (3) months preceding the claim event. Customer agrees to indemnify, defend, and hold harmless Provider...',
      severity: 'Review',
      potentialConcern: '3-month liability cap is unusually restrictive for IT infrastructure services, and customer indemnity is non-mutual.',
      questionsToConsider: [
        'Is 3 months of fees adequate to cover potential data breach or outage damages?',
        'Should indemnification be mutual rather than one-sided?'
      ],
      locationHint: 'Section 6.1 & 6.3'
    },
    {
      id: 'clause-3',
      category: 'Renewal',
      title: 'Automatic 12-Month Renewal',
      plainLanguageExplanation: 'The contract automatically extends for another full year unless non-renewal notice is sent at least 60 days before the contract end date.',
      originalEvidence: 'Agreement shall automatically renew for successive twelve (12) month terms unless either party provides written notice of non-renewal at least sixty (60) days prior to the end of the then-current term.',
      severity: 'Attention',
      potentialConcern: 'Missing the 60-day notice window locks the customer into another full 12 months.',
      questionsToConsider: [
        'Is there a calendar reminder set 75 days before October 15, 2026?',
        'Can we request a 30-day non-renewal notice period instead?'
      ],
      locationHint: 'Section 3.2'
    },
    {
      id: 'clause-4',
      category: 'Payment',
      title: 'Short 15-Day Payment Window & High Late Fee',
      plainLanguageExplanation: 'Invoices must be paid within 15 days, and late fees accrue at 18% per year (1.5% monthly). Rates can also be raised 12% annually.',
      originalEvidence: 'Customer shall pay Provider invoices within fifteen (15) calendar days... Late payments shall accrue interest at the rate of 1.5% per month (18% per annum)... Provider reserves the right to increase service rates by up to 12% annually.',
      severity: 'Attention',
      potentialConcern: '15 days is shorter than standard net-30 payment cycles, and 12% annual rate increases compound quickly.',
      questionsToConsider: [
        'Can we request standard Net-30 payment terms?',
        'Can annual rate increases be tied to inflation or capped at 5%?'
      ],
      locationHint: 'Section 2.1 - 2.3'
    },
    {
      id: 'clause-5',
      category: 'Dispute Resolution',
      title: 'Provider-Appointed Single Arbitrator in Bengaluru',
      plainLanguageExplanation: 'Disputes are resolved through ICC arbitration in Bengaluru, with the sole arbitrator selected exclusively by the Provider.',
      originalEvidence: 'Arbitration panel shall consist of a single arbitrator appointed by Provider.',
      severity: 'Review',
      potentialConcern: 'Provider retaining sole authority to select the arbitrator creates potential bias in dispute proceedings.',
      questionsToConsider: [
        'Should arbitrators be mutually agreed upon or appointed by an independent ICC panel?'
      ],
      locationHint: 'Section 7.2'
    }
  ],
  potentialRisks: [
    'Unilateral 50% termination penalty for Customer convenience cancellation.',
    'Provider liability capped at only 3 months of fees.',
    'One-sided indemnification obligation placed on Customer.',
    'Provider has exclusive right to choose the sole arbitrator in disputes.',
    '15-day invoice payment window with 18% annual interest penalty.'
  ],
  ambiguities: [
    'Section 5.2 mentions Provider does not guarantee immunity from zero-day cyber attacks, but does not specify clear security standard compliance (e.g. ISO 27001 or SOC 2).',
    'Specific service levels (SLAs) or resolution response times are not detailed in this Master Agreement.'
  ],
  missingInformation: [
    'Service Level Agreement (SLA) specifications for cloud downtime and support response times.',
    'Data export, transition assistance, and data deletion procedures upon contract termination.',
    'Mutual indemnification provisions for intellectual property infringement.'
  ]
};

export const DEMO_PROCESSED_DOCUMENT: ProcessedDocument = {
  id: 'demo-doc-001',
  name: 'Acme_Master_Services_Agreement_2025.txt',
  sizeBytes: 3450,
  mimeType: 'text/plain',
  extractedText: DEMO_DOCUMENT_TEXT,
  uploadedAt: new Date().toISOString(),
  isDemo: true,
  overview: DEMO_DOCUMENT_OVERVIEW,
  isAnalyzing: false
};

export const DEMO_COMPARISON_DOCUMENT_TEXT = `MASTER SERVICES AGREEMENT (REVISED AMENDMENT v2)

This Master Services Agreement ("Agreement") is entered into as of October 15, 2025 ("Effective Date"), by and between Acme Services Pvt. Ltd. ("Provider") and Nexus Global Enterprises LLC ("Customer").

1. SCOPE OF SERVICES
Provider agrees to perform professional IT consulting and cloud software management services as described in mutually executed Statements of Work ("SOW").

2. PAYMENT TERMS & FEES
2.1 Payment Schedule: Customer shall pay Provider invoices within thirty (30) calendar days from receipt of invoice ("Payment Due Date").
2.2 Late Payment Penalty: Late payments shall accrue interest at the rate of 1.0% per month (12% per annum).
2.3 Price Adjustments: Provider reserves the right to increase service rates by up to 5% annually upon sixty (60) days' written notice prior to contract renewal.

3. TERM & AUTOMATIC RENEWAL
3.1 Term: Initial term of twelve (12) months.
3.2 Renewal: Contract renews for successive 12-month terms unless either party gives thirty (30) days written notice of non-renewal.

4. TERMINATION
4.1 Termination for Convenience: Either party may terminate this Agreement for convenience at any time upon giving thirty (30) days' written notice to the other party without early termination penalty fees.
4.2 Termination for Cause: Either party may terminate immediately if material breach is not cured within fourteen (14) days.

5. CONFIDENTIALITY & DATA PRIVACY
5.1 Mutual confidentiality obligations apply.
5.2 Security: Provider shall comply with SOC 2 Type II security standards.

6. LIMITATION OF LIABILITY & INDEMNIFICATION
6.1 Liability Cap: Provider's total aggregate liability shall not exceed twelve (12) months of fees paid by Customer.
6.2 Indemnification: Both parties agree to mutually indemnify each other against third-party intellectual property claims.

7. GOVERNING LAW & DISPUTE RESOLUTION
7.1 Governing Law: Laws of India.
7.2 Dispute Resolution: Arbitration in Bengaluru before an independent panel of 3 arbitrators (1 chosen by each party, 1 by ICC).
`;

export const DEMO_COMPARISON_RESULT: ComparisonResult = {
  docAId: 'demo-doc-001',
  docBId: 'demo-doc-revised',
  docAName: 'Acme_Master_Services_Agreement_2025.txt (Original)',
  docBName: 'Acme_MSA_Revised_Amendment_v2.txt (Revised)',
  hasMaterialDifferences: true,
  summary: 'The Revised Amendment v2 incorporates significant improvements for the Customer: Net-30 payment terms (up from 15 days), mutual 30-day convenience termination with ZERO penalty fees (eliminating the 50% early termination fee), increased Provider liability cap to 12 months (up from 3 months), capped annual rate hikes at 5% (down from 12%), and mutual 3-arbitrator dispute resolution.',
  diffs: [
    {
      category: 'Payment Terms',
      docAText: 'Section 2.1: Payment due within 15 days. Late interest 18% per annum. Rate hikes up to 12% with 30 days notice.',
      docBText: 'Section 2.1: Payment due within 30 days. Late interest 12% per annum. Rate hikes capped at 5% with 60 days notice.',
      explanation: 'Extended payment window to standard Net-30, lowered late penalty, and capped rate increases at 5%.',
      significance: 'Substantial'
    },
    {
      category: 'Termination Conditions',
      docAText: 'Section 4.1: Provider requires 30 days notice. Customer requires 90 days notice + 50% early termination penalty.',
      docBText: 'Section 4.1: Either party may terminate for convenience with 30 days written notice with NO early termination fee.',
      explanation: 'Established equal 30-day convenience termination rights and completely eliminated the 50% penalty fee.',
      significance: 'Substantial'
    },
    {
      category: 'Liability & Indemnification',
      docAText: 'Section 6.1 & 6.3: Provider liability capped at 3 months of fees. Customer indemnifies Provider unilaterally.',
      docBText: 'Section 6.1 & 6.2: Provider liability capped at 12 months of fees. Mutual indemnification for IP claims.',
      explanation: 'Increased liability protection 4x for Customer and made legal indemnification mutual.',
      significance: 'Substantial'
    },
    {
      category: 'Renewal Notice Window',
      docAText: 'Section 3.2: 60 days written notice required to prevent automatic renewal.',
      docBText: 'Section 3.2: 30 days written notice required to prevent automatic renewal.',
      explanation: 'Provides more flexibility to decide on contract renewal prior to expiration.',
      significance: 'Moderate'
    },
    {
      category: 'Dispute Resolution',
      docAText: 'Section 7.2: Single arbitrator appointed exclusively by Provider.',
      docBText: 'Section 7.2: Independent panel of 3 arbitrators (1 chosen by each party, 1 by ICC).',
      explanation: 'Replaced unilateral arbitrator appointment with a balanced 3-arbitrator panel.',
      significance: 'Substantial'
    }
  ]
};
