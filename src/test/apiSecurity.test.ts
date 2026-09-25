import { describe, it, expect, vi } from 'vitest';
import { handleApiRequest } from '../api/server';

describe('API Endpoint & Security Tests', () => {
  it('should return 455 or 405 Method Not Allowed for GET requests on /api/analyze', async () => {
    const req = {
      url: '/api/analyze',
      method: 'GET',
      [Symbol.asyncIterator]: async function* () {}
    };

    let statusCode = 0;
    let endContent = '';
    const res = {
      setHeader: vi.fn(),
      set statusCode(code: number) { statusCode = code; },
      end: vi.fn((content: string) => { endContent = content; })
    };

    await handleApiRequest(req, res);
    expect(statusCode).toBeGreaterThanOrEqual(400);
    expect(endContent).toContain('Only POST requests are supported');
  });

  it('should return 400 Bad Request when POST payload is missing document text', async () => {
    const req = {
      url: '/api/analyze',
      method: 'POST',
      [Symbol.asyncIterator]: async function* () {
        yield Buffer.from(JSON.stringify({ documentName: 'test.txt', text: '' }));
      }
    };

    let statusCode = 0;
    let endContent = '';
    const res = {
      setHeader: vi.fn(),
      set statusCode(code: number) { statusCode = code; },
      end: vi.fn((content: string) => { endContent = content; })
    };

    await handleApiRequest(req, res);
    expect(statusCode).toBe(400);
    expect(endContent).toContain('Document text is required');
  });

  it('should return 404 Not Found for invalid non-existent API routes', async () => {
    const req = {
      url: '/api/nonexistent',
      method: 'POST',
      [Symbol.asyncIterator]: async function* () {
        yield Buffer.from(JSON.stringify({}));
      }
    };

    let statusCode = 0;
    const res = {
      setHeader: vi.fn(),
      set statusCode(code: number) { statusCode = code; },
      end: vi.fn()
    };

    await handleApiRequest(req, res);
    expect(statusCode).toBe(404);
  });
});
