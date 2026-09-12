import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getToolByPathOrThrow } from '@/lib/tools-registry';

const ROUTE = '/pdf-tools/split/split-pdf';

const readSource = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');

describe('split PDF GSC intent and snippet contract', () => {
  it('aligns metadata with the ranking queries and keeps a useful SERP snippet', () => {
    const tool = getToolByPathOrThrow(ROUTE);

    expect(tool.title).toBe('تقسیم فایل PDF آنلاین رایگان | جعبه ابزار فارسی');
    expect(tool.description).toBe(
      'فایل PDF را آنلاین و رایگان بر اساس صفحات دلخواه تقسیم کنید. پردازش در مرورگر انجام می‌شود؛ بدون آپلود فایل به سرور و بدون ثبت‌نام اجباری.',
    );
    expect(tool.description.length).toBeGreaterThanOrEqual(90);
    expect(tool.description.length).toBeLessThanOrEqual(160);
    expect(tool.keywords).toEqual(
      expect.arrayContaining([
        'تقسیم PDF',
        'تقسیم فایل PDF',
        'تقسیم PDF آنلاین',
        'تقسیم فایل PDF آنلاین',
      ]),
    );
  });

  it('uses the exact GSC intent in the visible H1', () => {
    const component = readSource('features/pdf-tools/split/split-pdf.tsx');

    expect(component).toContain('>تقسیم فایل PDF آنلاین</h1>');
  });

  it('keeps the established canonical route unchanged', () => {
    const page = readSource('app/(tools)/pdf-tools/split/split-pdf/page.tsx');

    expect(page).toContain("getToolByPathOrThrow('/pdf-tools/split/split-pdf')");
    expect(page).not.toContain('permanentRedirect');
  });
});
