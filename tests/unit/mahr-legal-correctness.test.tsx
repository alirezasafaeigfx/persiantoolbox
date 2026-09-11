import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MahrCalculator from '@/components/features/finance/MahrCalculator';

function source(path: string): string {
  return readFileSync(join(process.cwd(), path), 'utf8');
}

function sourceBlock(text: string, start: string, end: string): string {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end, startIndex + start.length);
  if (startIndex < 0 || endIndex < 0) {
    throw new Error(`Unable to find source block: ${start} -> ${end}`);
  }
  return text.slice(startIndex, endIndex);
}

describe('mahr legal correctness', () => {
  it('calculates monetary mahr using the annual index of the year before payment', async () => {
    const user = userEvent.setup();
    render(<MahrCalculator />);

    await user.type(screen.getByLabelText('مبلغ مهریه وجه رایج (تومان)'), '1000000');
    await user.selectOptions(screen.getByLabelText('سال وقوع عقد'), '1395');
    await user.selectOptions(screen.getByLabelText('سال تأدیه'), '1399');

    // Official annual index: 1395 = 100, 1398 = 203.15.
    // Payment in 1399 therefore uses 1398 / 1395 = 2.0315.
    expect(screen.getByText('2.0315')).toBeInTheDocument();
  });

  it('does not present unverified future CPI presets or coin-mahr behavior', () => {
    const component = source('components/features/finance/MahrCalculator.tsx');

    expect(component).toContain('1398: 203.15');
    expect(component).toContain('1401: 640.225');
    expect(component).not.toContain('1402:');
    expect(component).not.toContain('1403:');
    expect(component).not.toContain('1404:');
    expect(component).not.toContain('1405:');
    expect(component).not.toContain('۵۰۰ سکه');
    expect(component).toContain('شاخص سال قبل از تأدیه');
    expect(component).toContain('lastUpdated="۱۴۰۱"');
  });

  it('keeps tool metadata scoped to monetary mahr and the Article 1082 formula', () => {
    const registry = source('lib/tools-registry.ts');
    const mahrEntry = sourceBlock(registry, "id: 'mahr-calculator'", "id: 'profit-margin'");

    expect(mahrEntry).toContain('محاسبه مهریه به نرخ روز رایگان');
    expect(mahrEntry).toContain('مهریه وجه رایج');
    expect(mahrEntry).toContain('شاخص سال قبل از تأدیه');
    expect(mahrEntry).not.toContain('ماده ۲۲ قانون حمایت خانواده');
    expect(mahrEntry).not.toContain('سال فعلی');
  });

  it('keeps the guide informational, accurate, and separate from coin-price calculation', () => {
    const article = source('content/blog/2026-06-23-mahr-calculator-guide.md');

    expect(article).toContain('مهریه وجه رایج');
    expect(article).toContain('شاخص سال قبل از تأدیه');
    expect(article).not.toContain('تعداد سکه × قیمت روز سکه');
    expect(article).not.toContain('اطلاعات بورس ایران');
    expect(article).not.toContain('حبس تعزیری');
    expect(article).not.toContain('مهریه مالیات ندارد');
  });

  it('updates structured guidance to the same legally scoped formula', () => {
    const page = source('app/(tools)/tools/mahr-calculator/page.tsx');

    expect(page).toContain('مهریه وجه رایج');
    expect(page).toContain('سال تأدیه');
    expect(page).toContain('شاخص سال قبل از تأدیه');
    expect(page).not.toContain('ماده ۲۲ قانون حمایت خانواده');
  });
});
