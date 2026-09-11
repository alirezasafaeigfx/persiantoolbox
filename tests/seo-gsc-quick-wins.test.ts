import { describe, expect, it } from 'vitest';
import { getToolByPathOrThrow } from '@/lib/tools-registry';

type MetadataExpectation = {
  path: string;
  title: string;
  descriptionTerms: string[];
  keywordTerms: string[];
};

const targets: MetadataExpectation[] = [
  {
    path: '/date-tools/date-difference',
    title: 'محاسبه فاصله بین دو تاریخ | تعداد روز بین دو تاریخ',
    descriptionTerms: ['شمسی', 'میلادی', 'رایگان', 'روز'],
    keywordTerms: ['فاصله بین دو تاریخ', 'تعداد روز بین دو تاریخ'],
  },
  {
    path: '/date-tools/age-calculator',
    title: 'محاسبه سن دقیق آنلاین | سن بر اساس تاریخ تولد',
    descriptionTerms: ['تاریخ تولد', 'شمسی', 'میلادی', 'رایگان'],
    keywordTerms: ['محاسبه سن', 'محاسبه سن دقیق'],
  },
  {
    path: '/tools/check-penalty',
    title: 'محاسبه تأخیر تأدیه رایگان | خسارت چک به نرخ روز',
    descriptionTerms: ['تأخیر تأدیه', 'CPI', 'بانک مرکزی', 'رایگان'],
    keywordTerms: ['محاسبه تاخیر تادیه رایگان', 'خسارت تأخیر تأدیه'],
  },
  {
    path: '/career-tools/work-certificate',
    title: 'ساخت گواهی اشتغال به کار PDF | گواهی سابقه کار آنلاین',
    descriptionTerms: ['PDF', 'گواهی اشتغال به کار', 'گواهی سابقه کار', 'آنلاین'],
    keywordTerms: ['گواهی اشتغال به کار pdf', 'گواهی سابقه کار'],
  },
  {
    path: '/validation-tools/national-id',
    title: 'اعتبارسنجی کد ملی رایگان | بررسی صحت کد ملی آنلاین',
    descriptionTerms: ['بررسی صحت کد ملی', '۱۰ رقمی', 'رایگان', 'آنلاین'],
    keywordTerms: ['صحت کد ملی', 'بررسی صحت کد ملی'],
  },
  {
    path: '/tools/invoice-generator',
    title: 'ساخت فاکتور آنلاین رایگان | فاکتورساز و صورتحساب',
    descriptionTerms: ['فاکتور آنلاین', 'رایگان', 'PDF', 'چاپ'],
    keywordTerms: ['ساخت فاکتور آنلاین رایگان', 'فاکتورساز'],
  },
];

describe('GSC metadata quick wins', () => {
  for (const target of targets) {
    it(`aligns ${target.path} with its proven Search Console intent`, () => {
      const tool = getToolByPathOrThrow(target.path);

      expect(tool.title).toBe(target.title);
      for (const term of target.descriptionTerms) {
        expect(tool.description).toContain(term);
      }
      for (const term of target.keywordTerms) {
        expect(tool.keywords).toContain(term);
      }
    });
  }
});
