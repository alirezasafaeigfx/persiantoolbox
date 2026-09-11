'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui';
import FinancialTransparencyBox from '@/components/finance/FinancialTransparencyBox';
import { formatMoneyFa } from '@/shared/utils';
import ShareResult from '@/components/ui/ShareResult';

type MahrResult = {
  mahrAmount: number;
  mahrToday: number;
  ratio: number;
  increase: number;
};

// Verified annual consumer-price indices used by the monetary-mahr formula.
// Automatic presets intentionally stop at 1401; newer years require an
// authoritative annual index supplied manually by the user.
const CPI_INDEXES: Record<number, number> = {
  1390: 40.321,
  1391: 52.635,
  1392: 70.916,
  1393: 81.948,
  1394: 91.714,
  1395: 100,
  1396: 109.65,
  1397: 143.842,
  1398: 203.15,
  1399: 298.858,
  1400: 437.042,
  1401: 640.225,
};

const MARRIAGE_YEARS = Object.keys(CPI_INDEXES).map(Number);
const PAYMENT_YEARS = MARRIAGE_YEARS.slice(1).map((year) => year + 1);

function calculateMahr(
  mahrAmount: number,
  marriageIndex: number,
  priorPaymentYearIndex: number,
): MahrResult | null {
  if (mahrAmount <= 0 || marriageIndex <= 0 || priorPaymentYearIndex <= 0) {
    return null;
  }

  const ratio = priorPaymentYearIndex / marriageIndex;
  const mahrToday = mahrAmount * ratio;
  const increase = mahrToday - mahrAmount;
  return { mahrAmount, mahrToday, ratio, increase };
}

export default function MahrCalculator() {
  const [mahrAmount, setMahrAmount] = useState('');
  const [marriageYear, setMarriageYear] = useState('1395');
  const [paymentYear, setPaymentYear] = useState('1399');
  const [marriageIndexManual, setMarriageIndexManual] = useState('');
  const [priorPaymentYearIndexManual, setPriorPaymentYearIndexManual] = useState('');
  const [useManualIndex, setUseManualIndex] = useState(false);

  const parsedMarriageIndex = Number.parseFloat(marriageIndexManual);
  const parsedPriorPaymentYearIndex = Number.parseFloat(priorPaymentYearIndexManual);

  const selectedMarriageYear = Number.parseInt(marriageYear, 10);
  const selectedPaymentYear = Number.parseInt(paymentYear, 10);
  const priorPaymentYear = selectedPaymentYear - 1;

  const marriageIndex = useManualIndex
    ? Number.isNaN(parsedMarriageIndex)
      ? 0
      : parsedMarriageIndex
    : (CPI_INDEXES[selectedMarriageYear] ?? 0);

  const priorPaymentYearIndex = useManualIndex
    ? Number.isNaN(parsedPriorPaymentYearIndex)
      ? 0
      : parsedPriorPaymentYearIndex
    : selectedPaymentYear > selectedMarriageYear
      ? (CPI_INDEXES[priorPaymentYear] ?? 0)
      : 0;

  const mahrNum = useMemo(() => parseFloat(mahrAmount.replace(/,/g, '')) || 0, [mahrAmount]);

  const result = useMemo(
    () => calculateMahr(mahrNum, marriageIndex, priorPaymentYearIndex),
    [mahrNum, marriageIndex, priorPaymentYearIndex],
  );

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden section-surface p-6 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgb(var(--color-primary-rgb)/0.15),_transparent_55%)]" />
        <div className="relative space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            محاسبه مهریه وجه رایج به نرخ روز
          </h1>
          <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
            محاسبه مهریه وجه رایج بر اساس تبصره ماده ۱۰۸۲ قانون مدنی و شاخص سالانه بانک مرکزی؛
            مبنای تعدیل، شاخص سال قبل از تأدیه نسبت به شاخص سال وقوع عقد است.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
            <span className="rounded-full border border-[var(--border-light)] px-3 py-1">
              تبصره ماده ۱۰۸۲ قانون مدنی
            </span>
            <span className="rounded-full border border-[var(--border-light)] px-3 py-1">
              مخصوص مهریه وجه رایج
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">اطلاعات مهریه</h2>
          <div className="space-y-3">
            <div>
              <label htmlFor="mahr-amount" className="text-sm text-[var(--text-muted)]">
                مبلغ مهریه وجه رایج (تومان)
              </label>
              <input
                id="mahr-amount"
                type="text"
                inputMode="decimal"
                value={mahrAmount}
                onChange={(e) => setMahrAmount(e.target.value)}
                placeholder="مثال: ۱٬۰۰۰٬۰۰۰"
                className="w-full mt-1 rounded-[var(--radius-md)] border border-[var(--border-light)] bg-[var(--surface-1)] p-3 text-[var(--text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
                aria-label="مبلغ مهریه وجه رایج (تومان)"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="mahr-manual"
                type="checkbox"
                checked={useManualIndex}
                onChange={(e) => setUseManualIndex(e.target.checked)}
                className="rounded"
                aria-label="ورود دستی شاخص‌های رسمی"
              />
              <label htmlFor="mahr-manual" className="text-sm text-[var(--text-muted)]">
                ورود دستی شاخص‌های رسمی
              </label>
            </div>

            {useManualIndex ? (
              <>
                <div className="rounded-[var(--radius-md)] bg-[var(--bg-subtle)] p-3 text-xs text-[var(--text-muted)]">
                  برای سال‌هایی که شاخص سالانه در فهرست خودکار موجود نیست، متوسط شاخص سال وقوع عقد و
                  متوسط شاخص سال قبل از تأدیه را از منبع رسمی وارد کنید.
                </div>
                <div>
                  <label htmlFor="mahr-marriage-index" className="text-sm text-[var(--text-muted)]">
                    شاخص سال وقوع عقد
                  </label>
                  <input
                    id="mahr-marriage-index"
                    type="text"
                    inputMode="decimal"
                    value={marriageIndexManual}
                    onChange={(e) => setMarriageIndexManual(e.target.value)}
                    placeholder="مثال: ۱۰۰"
                    className="w-full mt-1 rounded-[var(--radius-md)] border border-[var(--border-light)] bg-[var(--surface-1)] p-3 text-[var(--text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
                    aria-label="شاخص سال وقوع عقد"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mahr-prior-payment-index"
                    className="text-sm text-[var(--text-muted)]"
                  >
                    شاخص سال قبل از تأدیه
                  </label>
                  <input
                    id="mahr-prior-payment-index"
                    type="text"
                    inputMode="decimal"
                    value={priorPaymentYearIndexManual}
                    onChange={(e) => setPriorPaymentYearIndexManual(e.target.value)}
                    placeholder="مثال: ۲۰۳.۱۵"
                    className="w-full mt-1 rounded-[var(--radius-md)] border border-[var(--border-light)] bg-[var(--surface-1)] p-3 text-[var(--text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
                    aria-label="شاخص سال قبل از تأدیه"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="mahr-marriage-year" className="text-sm text-[var(--text-muted)]">
                    سال وقوع عقد
                  </label>
                  <select
                    id="mahr-marriage-year"
                    value={marriageYear}
                    onChange={(e) => setMarriageYear(e.target.value)}
                    className="w-full mt-1 rounded-[var(--radius-md)] border border-[var(--border-light)] bg-[var(--surface-1)] p-3 text-[var(--text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
                    aria-label="سال وقوع عقد"
                  >
                    {MARRIAGE_YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year} (شاخص: {CPI_INDEXES[year]})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="mahr-payment-year" className="text-sm text-[var(--text-muted)]">
                    سال تأدیه
                  </label>
                  <select
                    id="mahr-payment-year"
                    value={paymentYear}
                    onChange={(e) => setPaymentYear(e.target.value)}
                    className="w-full mt-1 rounded-[var(--radius-md)] border border-[var(--border-light)] bg-[var(--surface-1)] p-3 text-[var(--text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
                    aria-label="سال تأدیه"
                  >
                    {PAYMENT_YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year} (شاخص سال قبل: {CPI_INDEXES[year - 1]})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  فهرست خودکار با شاخص‌های سالانه موجود تا ۱۴۰۱ کار می‌کند؛ برای تأدیه بعد از ۱۴۰۲،
                  حالت ورود دستی را انتخاب کنید.
                </p>
              </>
            )}
          </div>
          <div className="rounded-[var(--radius-md)] bg-[var(--bg-subtle)] p-3 text-xs text-[var(--text-muted)]">
            فرمول: (شاخص سال قبل از تأدیه ÷ شاخص سال وقوع عقد) × مبلغ مندرج در عقدنامه
          </div>
        </Card>

        {result ? (
          <Card
            className="p-6 space-y-3"
            role="region"
            aria-live="polite"
            aria-label="نتیجه محاسبه مهریه"
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">نتیجه محاسبه</h2>
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-light)]">
              <span className="text-sm text-[var(--text-muted)]">مبلغ مندرج در عقدنامه</span>
              <span className="text-sm font-bold text-[var(--text-primary)]">
                {formatMoneyFa(result.mahrAmount)} تومان
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-light)]">
              <span className="text-sm text-[var(--text-muted)]">تعدیل بر اساس شاخص</span>
              <span className="text-sm font-bold text-[var(--color-success)]">
                {formatMoneyFa(result.increase)} تومان
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-light)]">
              <span className="text-sm text-[var(--text-muted)]">نسبت شاخص‌ها</span>
              <span className="text-sm font-bold text-[var(--text-primary)]">
                {result.ratio.toFixed(4)}
              </span>
            </div>
            <div className="pt-2">
              <div className="flex items-center justify-between py-2 border-b border-[var(--border-light)]">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  مهریه وجه رایج تعدیل‌شده
                </span>
                <span className="text-lg font-bold text-[var(--color-success)]">
                  {formatMoneyFa(result.mahrToday)} تومان
                </span>
              </div>
            </div>
            <div className="rounded-[var(--radius-md)] bg-[var(--bg-subtle)] p-3 text-xs text-[var(--text-muted)]">
              این نتیجه صرفاً برآورد محاسباتی است. مبلغ رسمی باید با شاخص ابلاغی مربوط و مرجع صالح
              تطبیق داده شود.
            </div>
            <ShareResult
              title="محاسبه مهریه وجه رایج به نرخ روز"
              text={`مهریه وجه رایج تعدیل‌شده: ${formatMoneyFa(result.mahrToday)} تومان | تعدیل: ${formatMoneyFa(result.increase)} تومان`}
            />
          </Card>
        ) : null}
      </div>

      <FinancialTransparencyBox
        calculationName="شفافیت محاسبه مهریه وجه رایج به نرخ روز"
        formulaSummary="(شاخص سال قبل از تأدیه ÷ شاخص سال وقوع عقد) × مبلغ مندرج در عقدنامه"
        legalBasis="تبصره ماده ۱۰۸۲ قانون مدنی و ماده ۲ آیین‌نامه اجرایی آن"
        dataSource="متوسط شاخص سالانه بهای کالاها و خدمات مصرفی اعلامی بانک مرکزی"
        lastUpdated="۱۴۰۱"
      />
    </div>
  );
}
