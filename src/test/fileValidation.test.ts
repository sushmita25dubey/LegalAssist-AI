import { describe, it, expect } from 'vitest';
import { validateFile } from '../utils/fileValidation';

describe('File Validation Unit Tests', () => {
  it('should accept valid PDF file under 10 MB', () => {
    const file = new File(['dummy pdf content'], 'contract.pdf', { type: 'application/pdf' });
    const result = validateFile(file);
    expect(result.isValid).toBe(true);
    expect(result.fileType).toBe('pdf');
  });

  it('should accept valid TXT file under 10 MB', () => {
    const file = new File(['dummy text content'], 'agreement.txt', { type: 'text/plain' });
    const result = validateFile(file);
    expect(result.isValid).toBe(true);
    expect(result.fileType).toBe('txt');
  });

  it('should accept valid DOCX file under 10 MB', () => {
    const file = new File(['dummy docx content'], 'terms.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const result = validateFile(file);
    expect(result.isValid).toBe(true);
    expect(result.fileType).toBe('docx');
  });

  it('should reject unsupported file extension (.exe)', () => {
    const file = new File(['malware'], 'script.exe', { type: 'application/octet-stream' });
    const result = validateFile(file);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Unsupported file format');
  });

  it('should reject empty files (0 bytes)', () => {
    const file = new File([], 'empty.pdf', { type: 'application/pdf' });
    const result = validateFile(file);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('should reject files exceeding the 10 MB limit', () => {
    const largeContent = new Uint8Array(11 * 1024 * 1024); // 11 MB
    const file = new File([largeContent], 'huge.pdf', { type: 'application/pdf' });
    const result = validateFile(file);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('exceeds the maximum allowed limit of 10 MB');
  });
});
