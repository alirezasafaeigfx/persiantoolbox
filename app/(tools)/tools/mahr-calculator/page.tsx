import Script from 'next/script';
import dynamic from 'next/dynamic';
import ToolPageShell from '@/components/ui/ToolPageShell';
import { buildMetadata, siteUrl } from '@/lib/seo';
import { getToolByPathOrThrow } from '@/lib/tools-registry';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

const MahrCalculator = dynamic(
  () => import('@/components/features/finance/MahrCalculator').then((m) => m.default),
  {
    loading: () => (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-8 w-48 rounded-[var(--radius-lg)] bg-[var(--surface-2)]" />
        <div className="h-64 rounded-[var(--radius-lg)] bg-[var(--surface-2)]" />
      </div>
    ),
  },
);

const baseTool = getToolByPathOrThrow('/tools/mahr-calculator');
const tool = {
  ...baseTool,
  title: 'محاسبه مهریه به نرخ روز رایگان | مهریه وجه رایج',
  description:
    'محاسبه مهریه وجه رایج به نرخ روز بر اساس تبصره ماده ۱۰۸۲ قانون مدنی و شاخص سالانه بانک مرکزی، با استفاده از شاخص سال قبل از تأدیه.',
  keywords: [
    'محاسبه مهریه به نرخ روز رایگان',
    'مهریه وجه رایج',
    'شاخص مهریه بانک مرکزی',
    'ماده ۱۰۸۲ قانون مدنی',
    'محاسبه مهریه پولی',
  ],
  content: {
    intro:
      'این ابزار برای محاسبه مهریه وجه رایج است. مبلغ مندرج در عقدنامه با نسبت متوسط شاخص سال قبل از تأدیه به متوسط شاخص سال وقوع عقد تعدیل می‌شود.',
    sections: [
      {
        heading: 'فرمول قانونی محاسبه مهریه وجه رایج',
        paragraphs: [
          'طبق تبصره ماده ۱۰۸۲ قانون مدنی و آیین‌نامه اجرایی آن، در مهریه‌ای که وجه رایج است مبلغ مندرج در عقدنامه بر اساس تغییر شاخص سالانه قیمت تعدیل می‌شود.',
          'فرمول این صفحه: مبلغ مهریه × (متوسط شاخص سال قبل از تأدیه ÷ متوسط شاخص سال وقوع عقد). این ابزار برای مهریه سکه‌ای یا طلا محاسبه قیمت روز انجام نمی‌دهد.',
        ],
      },
    ],
    steps: [
      'مبلغ مهریه وجه رایج درج‌شده در عقدنامه را وارد کنید.',
      'سال وقوع عقد را انتخاب کنید.',
      'سال تأدیه را انتخاب کنید تا شاخص سال قبل از تأدیه اعمال شود.',
      'مبلغ تعدیل‌شده را مشاهده و با شاخص رسمی مربوط تطبیق دهید.',
    ],
    tips: [
      'برای سال‌های خارج از فهرست خودکار، شاخص‌های سالانه رسمی را به‌صورت دستی وارد کنید.',
      'این نتیجه برآورد محاسباتی است و جایگزین محاسبه رسمی مرجع صالح نیست.',
    ],
    faq: [
      {
        question: 'آیا این ابزار مهریه سکه‌ای را هم محاسبه می‌کند؟',
        answer:
          'خیر. این ابزار فقط برای مهریه وجه رایج طراحی شده و قیمت روز سکه یا طلا را محاسبه نمی‌کند.',
      },
      {
        question: 'برای سال تأدیه از کدام شاخص استفاده می‌شود؟',
        answer:
          'در فرمول آیین‌نامه، متوسط شاخص سال قبل از تأدیه به متوسط شاخص سال وقوع عقد تقسیم می‌شود.',
      },
      {
        question: 'آیا نتیجه ابزار مبلغ رسمی قابل اجرا است؟',
        answer:
          'خیر. خروجی برای برآورد است و مبلغ رسمی باید با شاخص ابلاغی و محاسبه مرجع صالح تطبیق داده شود.',
      },
    ],
  },
};

export const metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: tool.path,
  keywords: tool.keywords,
});

export default function MahrCalculatorRoute() {
  return (
    <ToolPageShell tool={tool}>
      <BreadcrumbSchema
        items={[
          { name: 'خانه', url: siteUrl },
          { name: 'ابزارهای مالی', url: `${siteUrl}/tools` },
          { name: 'محاسبه مهریه وجه رایج' },
        ]}
      />
      <Script
        id="mahr-howto"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'نحوه محاسبه مهریه وجه رایج به نرخ روز',
            description:
              'راهنمای محاسبه مهریه وجه رایج بر اساس تبصره ماده ۱۰۸۲ قانون مدنی و شاخص سال قبل از تأدیه.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'مبلغ مهریه وجه رایج را وارد کنید',
                text: 'مبلغ درج‌شده در عقدنامه را به تومان وارد کنید.',
              },
              {
                '@type': 'HowToStep',
                name: 'سال وقوع عقد را انتخاب کنید',
                text: 'سال وقوع عقد را برای تعیین شاخص مبنا انتخاب کنید.',
              },
              {
                '@type': 'HowToStep',
                name: 'سال تأدیه را مشخص کنید',
                text: 'سال تأدیه را انتخاب کنید؛ فرمول از متوسط شاخص سال قبل از تأدیه استفاده می‌کند.',
              },
              {
                '@type': 'HowToStep',
                name: 'مبلغ تعدیل‌شده را بررسی کنید',
                text: 'نتیجه را مشاهده و برای استفاده رسمی با شاخص ابلاغی و مرجع صالح تطبیق دهید.',
              },
            ],
            tool: {
              '@type': 'HowToTool',
              name: 'ماشین‌حساب مهریه وجه رایج',
              url: `${siteUrl}/tools/mahr-calculator`,
            },
          }),
        }}
      />
      <MahrCalculator />
    </ToolPageShell>
  );
}
