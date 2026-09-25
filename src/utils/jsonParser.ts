/**
 * Safely parses JSON strings returned by AI, stripping markdown fences and handling common syntax glitches.
 */
export function safeParseAiJson<T>(rawResponse: string, fallback?: T): { data: T | null; error?: string } {
  if (!rawResponse || typeof rawResponse !== 'string') {
    return { data: fallback || null, error: 'Empty AI response received.' };
  }

  let cleaned = rawResponse.trim();

  // Strip markdown code fences if present (e.g. ```json ... ```)
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  }

  // Attempt 1: Direct JSON parse
  try {
    const parsed = JSON.parse(cleaned) as T;
    return { data: parsed };
  } catch (_firstErr) {
    // Attempt 2: Extract JSON object block using regex
    try {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as T;
        return { data: parsed };
      }
    } catch (_secondErr) {
      // Failed secondary parse
    }

    // Attempt 3: Extract JSON array block using regex
    try {
      const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        const parsed = JSON.parse(arrayMatch[0]) as T;
        return { data: parsed };
      }
    } catch (_thirdErr) {
      // Failed tertiary parse
    }

    return {
      data: fallback || null,
      error: `Failed to parse structured JSON from AI response: ${(_firstErr as Error).message}`
    };
  }
}
