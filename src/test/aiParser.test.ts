import { describe, it, expect } from 'vitest';
import { safeParseAiJson } from '../utils/jsonParser';

describe('Structured AI Output JSON Parser Tests', () => {
  it('should parse valid clean JSON string', () => {
    const jsonStr = '{"summary": "Test summary", "documentType": "Service Agreement"}';
    const { data, error } = safeParseAiJson<{ summary: string; documentType: string }>(jsonStr);
    expect(error).toBeUndefined();
    expect(data?.summary).toBe('Test summary');
    expect(data?.documentType).toBe('Service Agreement');
  });

  it('should strip markdown json code blocks (```json ... ```)', () => {
    const markdownStr = '```json\n{"summary": "Fenced summary"}\n```';
    const { data } = safeParseAiJson<{ summary: string }>(markdownStr);
    expect(data?.summary).toBe('Fenced summary');
  });

  it('should extract JSON object embedded inside free-form text', () => {
    const verboseAiOutput = 'Here is your analysis:\n{"summary": "Embedded summary"}\nHope this helps!';
    const { data } = safeParseAiJson<{ summary: string }>(verboseAiOutput);
    expect(data?.summary).toBe('Embedded summary');
  });

  it('should return fallback data and error message when parsing unrecoverable text', () => {
    const invalidText = 'This is completely invalid non-JSON output';
    const fallback = { summary: 'Fallback' };
    const { data, error } = safeParseAiJson(invalidText, fallback);
    expect(error).toBeDefined();
    expect(data?.summary).toBe('Fallback');
  });
});
