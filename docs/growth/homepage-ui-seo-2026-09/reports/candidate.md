# گزارش اجرای بسته PR #43 — homepage UI/SEO

## هویت

- Task IDs و وضعیت: PT-00 DONE، PT-01 DONE، PT-02 REVIEW، PT-03 REVIEW، PT-04 DONE، PT-05 BLOCKED، PT-06 BLOCKED.
- Branch / base SHA / candidate SHA: `codex/pr43-homepage-ui-seo-exec` / `origin/docs/homepage-ui-seo-program-20260920`=`c201a8fbd070a978538a0d8118263eab5b8b8279` / SHA نهایی پس از commit گزارش در خروجی Git ثبت می‌شود.
- PR URL و base branch: stacked PR به `docs/homepage-ui-seo-program-20260920`؛ پس از push در خروجی نهایی ثبت می‌شود.
- Production SHA مشاهده‌شده و زمان UTC: `7b743046b9f3d652ecfc2d2f2a64274550e2e21f`، مشاهده‌شده در 2026-09-20.
- وضعیت worktree و commitهای مربوط: worktree مستقل؛ `fdba7289` یکسان‌سازی هویت SEO و `83bd1b64` اصلاح هیرو/کارت‌ها. checkout اصلی دست‌نخورده و تغییرات مالک حفظ شده‌اند.

## تغییر و دلیل

- JSON-LD صفحه خانه اکنون یک Organization و WebSite پایدار دارد؛ publisher و `isPartOf` ارجاع یکسان دارند و متن حریم خصوصی visible/schema همسان و scoped است.
- هیرو و کارت‌های وظیفه با CSS Module scoped بازطراحی شدند: سلسله‌مراتب خواناتر، teal محدود، focus واضح، RTL/دارک‌مود و responsive حفظ شد.
- آزمون‌های E2E جستجوی فارسی، CTAها، anchor، overflow موبایل و consent ایزوله شدند؛ fallbackهای ناامن حذف شدند.
- PT-04 فقط تشخیص و پیشنهاد است؛ رفتار اعلان‌ها تغییر نکرده و برای اصلاح نیازمند تأیید مالک است.
- تغییر خارج از فهرست اولیه: هیچ dependency یا deploy تغییر نکرد؛ تنظیم موقت Playwright فقط برای اجرای Windows پاک شد.

## شواهد

| فرمان یا سناریو | نتیجه | مسیر artifact یا لینک |
| --- | --- | --- |
| تست واحد schema/copy | PASS، 16/16 | `tests/unit/homepage-seo-contract.test.ts` |
| `pnpm ci:quick` | FAIL فقط 1 تست pre-existing ویندوزی: `site-settings-storage` با EPERM در `rmSync`؛ lint/typecheck و 1750 تست vitest موفق | خروجی اجرای محلی؛ `tests/unit/site-settings-storage.test.ts` |
| `pnpm ci:contracts` | PASS | خروجی اجرای محلی |
| `pnpm build` | PASS، 656 صفحه؛ warningهای موجود Edge/runtime و trace ادمین | خروجی اجرای محلی |
| `pnpm predeploy:smoke` | FAIL، wrapper POSIX env روی PowerShell | — |
| `pnpm smoke:local` با env معادل PowerShell | PASS، 11 route | خروجی اجرای محلی |
| E2E جستجو/CTA/a11y/consent/schema | PASS، 39/39 | `tests/e2e/home.spec.ts` و suiteهای مرتبط |
| موبایل/دسکتاپ روشن/تاریک | PASS؛ بدون overflow و یک H1 در 360/390/768/1440 و zoom 200% | `reports/baseline/screenshots/` و `reports/candidate/screenshots/` |
| Lighthouse هم‌شرایط | baseline median: Perf 77، LCP 5592.2ms، CLS 0، TBT 69، FCP 2142.2ms؛ candidate median: Perf 75، LCP 5742.14ms، CLS 0، TBT 73، FCP 2442.14ms؛ delta در budget برنامه، CLS بدون تغییر | `reports/baseline/lighthouse/` و `reports/candidate/lighthouse/` |
| PT-04 controlled overlay reproduction | PASS؛ unknown consent overlap confirmed; accepted/rejected and dismissal states measured | `reports/overlay-diagnosis.md` |

## حدود و ادامه

- یافته قطعی: خطر هم‌پوشانی consent/install در consent نامعلوم بازتولید شد. فرضیه hydration در dev log `/loan` ثبت شد اما E2E همان مسیر PASS است و خارج از دامنه این بسته است.
- مانع: تست `site-settings-storage` روی Windows به‌علت singleton `node:sqlite` و حذف temp dir fail می‌شود؛ کوچک‌ترین اقدام، اصلاح lifecycle/cleanup تست یا اجرای همان gate روی Linux CI است. wrapper `predeploy:smoke` نیز باید cross-platform شود.
- GSC داده واقعی در دسترس نبود؛ PT-05 عمداً BLOCKED و هیچ محتوای جدیدی منتشر نشد.
- بله، یک تست قبل از تغییر نیز همین failure محیطی را داشت؛ failure به homepage مربوط نیست.
- MERGED: no. DEPLOYED: no.
- OWNER_VISUAL_APPROVAL: جهت طراحی قبلاً تأیید شده؛ تأیید نهایی این candidate هنوز yes نشده است.
- اقدام بعدی: بازبینی PR stacked، تصمیم مالک درباره PT-04، سپس در صورت تأیید رفع blockerهای CI و بازاجرای exact-head checks. merge/deploy فقط با دستور صریح مالک.

