import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const article = readFileSync(
  join(process.cwd(), 'content/blog/2026-06-24-loan-1405-guide.md'),
  'utf8',
);

describe('loan 1405 guide freshness and search-intent contract', () => {
  it('targets the current national-housing-loan and installment-table intent', () => {
    expect(article).toContain("title: 'وام مسکن ملی ۱۴۰۵: سقف ۸۵۰ میلیون + جدول اقساط'");
    expect(article).toContain('جدول اقساط وام مسکن ملی ۱۴۰۵');
    expect(article).toContain('۸۵۰ میلیون تومان');
    expect(article).toContain('بیش از ۶۵ درصد');
  });

  it('removes materially stale or misleading loan claims', () => {
    expect(article).not.toContain('سقف وام**: تا ۵۵۰ میلیون تومان');
    expect(article).not.toContain('صندوق پس‌انداز مسکن یکم | ۸۰۰ میلیون (تهران)');
    expect(article).not.toContain("question: 'چگونه خرید مسکن");
    expect(article).not.toContain("question: 'چگونه سقف وام");
  });

  it('labels installment figures as scenarios rather than guaranteed bank terms', () => {
    expect(article).toContain('سناریوی محاسباتی');
    expect(article).toContain('۱۸٪');
    expect(article).toContain('۲۳٪');
    expect(article).toContain('مبلغ قطعی قسط را قرارداد بانک عامل تعیین می‌کند');
    expect(article).toContain('[/loan]');
  });
});
