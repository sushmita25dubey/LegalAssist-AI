import mammoth from 'mammoth';

export async function extractTextFromFile(file: File): Promise<string> {
  const fileNameLower = file.name.toLowerCase();

  try {
    if (fileNameLower.endsWith('.txt')) {
      const text = await file.text();
      if (!text || text.trim().length === 0) {
        throw new Error('The text file appears to be empty or unreadable.');
      }
      return text.trim();
    }

    if (fileNameLower.endsWith('.docx')) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const extractedText = result.value ? result.value.trim() : '';
      if (!extractedText) {
        throw new Error('Could not extract readable text from this DOCX file.');
      }
      return extractedText;
    }

    if (fileNameLower.endsWith('.pdf')) {
      // Browser PDF text extraction using ArrayBuffer reading fallback
      const arrayBuffer = await file.arrayBuffer();
      const textDecoder = new TextDecoder('utf-8');
      const rawContent = textDecoder.decode(arrayBuffer);
      
      // Extract visible text streams from PDF raw structure
      const textMatches: string[] = [];
      const textStreamRegex = /\(([^)]+)\)\s*T[jJ]|T[dD]\s*\(([^)]+)\)/g;
      let match;
      while ((match = textStreamRegex.exec(rawContent)) !== null) {
        const chunk = match[1] || match[2];
        if (chunk && chunk.trim().length > 1) {
          textMatches.push(chunk);
        }
      }

      if (textMatches.length > 5) {
        return textMatches.join(' ');
      }

      // If binary stream or fallback needed
      // eslint-disable-next-line no-control-regex
      const cleanString = rawContent.replace(/[\x00-\x09\x0B-\x1F\x7F-\x9F]/g, ' ');
      const words = cleanString.match(/[A-Za-z0-9.,;:!?'"()\-\s]{4,}/g) || [];
      const extracted = words.join(' ').replace(/\s+/g, ' ').trim();
      
      if (extracted.length < 50) {
        throw new Error('Unable to extract text from PDF. The document may be scanned, image-based, or password-protected.');
      }
      return extracted;
    }

    // Default fallback
    const defaultText = await file.text();
    return defaultText.trim();
  } catch (err: any) {
    console.error('Text extraction failed:', err);
    throw new Error(err.message || 'Failed to extract text from file.');
  }
}
