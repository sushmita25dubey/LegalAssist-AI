import { 
  analyzeDocumentWithGemini, 
  askDocumentWithGemini, 
  compareDocumentsWithGemini, 
  generateChecklistWithGemini,
  generateLegalPrepWithGemini 
} from '../services/geminiServer';

/**
 * Server API Handler for Vite Middleware & Serverless Runtimes
 */
export async function handleApiRequest(req: any, res: any) {
  const url = new URL(req.url || '', 'http://localhost');
  const pathname = url.pathname;

  // Only allow POST method for AI endpoints
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end(JSON.stringify({ error: 'Method Not Allowed', message: 'Only POST requests are supported.' }));
    return;
  }

  // Parse JSON Body from Node request stream
  let body: any = {};
  try {
    const buffers: Buffer[] = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const rawBody = Buffer.concat(buffers).toString('utf-8');
    body = rawBody ? JSON.parse(rawBody) : {};
  } catch (_err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Bad Request', message: 'Invalid JSON payload.' }));
    return;
  }

  try {
    switch (pathname) {
      case '/api/analyze': {
        const { documentName, text } = body;
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Bad Request', message: 'Document text is required.' }));
          return;
        }

        const result = await analyzeDocumentWithGemini(documentName || 'Document', text);
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, ...result }));
        break;
      }

      case '/api/ask': {
        const { documentText, question } = body;
        if (!documentText || !question) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Bad Request', message: 'Document text and question are required.' }));
          return;
        }

        const result = await askDocumentWithGemini(documentText, question);
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, ...result }));
        break;
      }

      case '/api/compare': {
        const { docAText, docAName, docBText, docBName } = body;
        if (!docAText || !docBText) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Bad Request', message: 'Both Document A and Document B text are required.' }));
          return;
        }

        const result = await compareDocumentsWithGemini(docAText, docAName || 'Document A', docBText, docBName || 'Document B');
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, ...result }));
        break;
      }

      case '/api/checklist': {
        const { documentText } = body;
        if (!documentText) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Bad Request', message: 'Document text is required.' }));
          return;
        }

        const result = await generateChecklistWithGemini(documentText);
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, ...result }));
        break;
      }

      case '/api/prep': {
        const { documentText } = body;
        if (!documentText) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Bad Request', message: 'Document text is required.' }));
          return;
        }

        const result = await generateLegalPrepWithGemini(documentText);
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, ...result }));
        break;
      }

      default:
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not Found', message: `Endpoint ${pathname} does not exist.` }));
        break;
    }
  } catch (err: any) {
    console.error(`[API Error on ${pathname}]:`, err);
    res.statusCode = 500;
    res.end(JSON.stringify({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred while processing the legal document.'
    }));
  }
}
