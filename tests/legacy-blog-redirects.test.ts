import { describe, expect, it } from 'vitest';

import nextConfig from '../next.config.mjs';

describe('legacy blog redirects', () => {
  it('permanently redirects the historical OCR article URL to the current article URL', async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: '/blog/2026-06-26-ocr-persian-guide',
          destination: '/blog/2026-06-19-ocr-persian-guide',
          permanent: true,
        },
      ]),
    );
  });
});
