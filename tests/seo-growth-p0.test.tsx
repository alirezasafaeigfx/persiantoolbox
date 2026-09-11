import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToastContext } from '@/shared/ui/toast-context';
import NationalIdValidator from '@/components/features/validation-tools/NationalIdValidator';
import { buildToolJsonLd } from '@/lib/seo-tools';
import { BRAND } from '@/lib/brand';
import {
  MIN_INDEXABLE_TAG_POSTS,
  getIndexableTagsForStaticParams,
  getTagsWithCount,
} from '@/lib/blog';
import { getToolByPathOrThrow } from '@/lib/tools-registry';

describe('GSC growth P0 SEO regressions', () => {
  it('keeps single-post blog tags out of the indexable tag set', () => {
    expect(MIN_INDEXABLE_TAG_POSTS).toBeGreaterThanOrEqual(2);

    const counts = new Map(getTagsWithCount().map(({ tag, count }) => [tag, count]));
    for (const tag of getIndexableTagsForStaticParams()) {
      expect(counts.get(tag) ?? 0).toBeGreaterThanOrEqual(MIN_INDEXABLE_TAG_POSTS);
    }
  });

  it('publishes a logo on the SoftwareApplication publisher organization', () => {
    const tool = getToolByPathOrThrow('/tools/invoice-generator');
    const graph = buildToolJsonLd(tool)['@graph'] as Array<Record<string, unknown>>;
    const software = graph.find((node) => node['@type'] === 'SoftwareApplication') as
      | Record<string, unknown>
      | undefined;
    const publisher = software?.['publisher'] as Record<string, unknown> | undefined;

    expect(publisher?.['@type']).toBe('Organization');
    expect(publisher?.['logo']).toBe('https://persiantoolbox.ir/logo.png');
  });

  it('renders one descriptive H1 on the national-id validator', () => {
    render(
      <ToastContext.Provider value={{ showToast: () => undefined }}>
        <NationalIdValidator />
      </ToastContext.Provider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'اعتبارسنجی کد ملی رایگان' }),
    ).toBeInTheDocument();
  });

  it('points brand repository metadata at the active GitHub repository', () => {
    expect(BRAND.repository).toEqual({ owner: 'alirezasafaeigfx', name: 'persiantoolbox' });
  });
});
