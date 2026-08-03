/**
 * Learning missions — guided, multi-step decision practice for each track.
 *
 * Pure data. A mission references existing level IDs as prerequisite lessons
 * (levelIds); it never duplicates lesson, quiz, or scenario content. Nothing
 * here executes Git — every command shown is an educational simulation.
 *
 * Completion is stored as a list of mission IDs (state.missionsDone); missions
 * award no XP (XP stays tied to the 30 levels) and never gate lessons, tracks,
 * or the path achievement.
 *
 * Step shape:
 *   { id, situation, commandPreview?, stateNote?, choices:[{id,label,feedback,tone}],
 *     correct, explanation, hint }
 *   tone ∈ 'correct' | 'unsafe' | 'risky' | 'incorrect'
 */
export const MISSIONS = [
  /* ---------------- CORE ---------------- */
  {
    id: 'core-ship-change',
    title: 'آماده‌سازی و ارسال یک تغییر طراحی برای بازبینی',
    shortDescription: 'یک تغییر طراحی را تمیز Stage، Commit و Push کن و برای بازبینی، Pull Request باز کن.',
    trackId: 'core',
    levelIds: [4, 5, 7, 8, 11, 12],
    difficulty: 'مقدماتی',
    icon: 'ph-rocket-launch',
    context: 'روی شاخهٔ <code>feature/pricing-hero</code> رنگ و فاصلهٔ بخش قیمت را عوض کرده‌ای. می‌خواهی همین یک تغییر را تمیز و بدون اضافات، برای بازبینی تیم بفرستی.',
    objectives: [
      'وضعیت مخزن را قبل از Commit بررسی کنی',
      'فقط فایل‌های عمدی را Stage کنی و Secret را بیرون نگه داری',
      'پیام Commit معنادار بنویسی و شاخه را Push کنی',
      'فرق Pull Request (GitHub) با دستور محلی Git را بدانی',
    ],
    steps: [
      {
        id: 's1',
        situation: 'تازه ویرایش‌ها را ذخیره کرده‌ای. قبل از هر کار دیگری، اولین قدم درست کدام است؟',
        commandPreview: 'git status',
        stateNote: 'این دستور فقط وضعیت را نشان می‌دهد؛ Working tree و Staging area را تغییر نمی‌دهد.',
        choices: [
          { id: 'a', label: 'git status بزنم تا ببینم چه فایل‌هایی تغییر کرده و چه چیزی Stage شده', feedback: 'درست است. git status عکس فعلی سه ناحیه را نشان می‌دهد: چه چیزی تغییر کرده (Working tree)، چه چیزی آمادهٔ Commit است (Staging)، و چه فایل‌هایی اصلاً ردگیری نمی‌شوند. با این دید، تصمیم‌های بعدی مطمئن‌تر است.', tone: 'correct' },
          { id: 'b', label: 'git commit -am بزنم تا سریع همه‌چیز ثبت شود', feedback: 'در این موقعیت مناسب نیست، چون هنوز نمی‌دانی چه فایل‌هایی تغییر کرده‌اند. commit -am همهٔ فایل‌های ردگیری‌شده را یکجا ثبت می‌کند و ممکن است تغییرات ناخواسته هم وارد Commit شوند. اول وضعیت را ببین.', tone: 'risky' },
          { id: 'c', label: 'git push بزنم تا کارم روی GitHub برود', feedback: 'زود است. هنوز چیزی Commit نکرده‌ای، پس Push چیزی برای فرستادن ندارد. Push آخرین قدم است، نه اولین.', tone: 'incorrect' },
        ],
        correct: 'a',
        explanation: 'git status نقطهٔ شروع هر کار امن است؛ قبل از Stage و Commit همیشه یک بار وضعیت را ببین.',
        hint: 'کدام دستور فقط «گزارش» می‌دهد و هیچ چیزی را تغییر نمی‌دهد؟',
      },
      {
        id: 's2',
        situation: 'خروجی نشان می‌دهد دو فایل تغییر کرده: <code>pricing.css</code> (تغییر عمدی تو) و <code>.env</code> (یک کلید API که ابزارت خودکار ساخته). چه چیزی را Stage می‌کنی؟',
        commandPreview: 'git add pricing.css',
        stateNote: 'git add فقط فایل‌های انتخابی را از Working tree به Staging area می‌برد.',
        choices: [
          { id: 'a', label: 'git add . بزنم تا همه‌چیز با هم برود', feedback: 'در این موقعیت امن نیست. git add . فایل <code>.env</code> حاوی کلید را هم Stage می‌کند و یک Commit بعدی آن را وارد تاریخچه می‌کند. Secret نباید هرگز Commit شود؛ Private بودن مخزن هم این را امن نمی‌کند.', tone: 'unsafe' },
          { id: 'b', label: 'فقط git add pricing.css بزنم و .env را به .gitignore اضافه کنم', feedback: 'درست است. فقط فایل عمدی را Stage می‌کنی و <code>.env</code> را با gitignore از ردگیری بیرون نگه می‌داری. اگر کلید واقعی بوده، بهتر است Revoke هم بشود. این همان اصل Commit تمیز و بدون Secret است.', tone: 'correct' },
          { id: 'c', label: 'git add .env بزنم چون بخشی از پروژه است', feedback: 'این انتخاب خطرناک است. <code>.env</code> جای متغیرهای محرمانه است و نباید در تاریخچهٔ Git برود. الگوی درست، Commit‌کردن <code>.env.example</code> بدون مقدار است، نه خودِ .env.', tone: 'unsafe' },
        ],
        correct: 'b',
        explanation: 'Stage گزینشی یعنی Commit تو دقیقاً همان چیزی است که قصد داشتی — نه بیشتر، نه یک Secret اضافه.',
        hint: 'کدام فایل هرگز نباید وارد تاریخچه شود، حتی در مخزن Private؟',
      },
      {
        id: 's3',
        situation: 'حالا می‌خواهی Commit بزنی. کدام پیام Commit بهتر است؟',
        commandPreview: 'git commit -m "feat(pricing): adjust hero color and spacing"',
        choices: [
          { id: 'a', label: '"update"', feedback: 'مناسب نیست. «update» هیچ اطلاعاتی نمی‌دهد؛ سه ماه بعد کسی که تاریخچه را می‌خواند نمی‌فهمد چه تغییری بوده و چرا.', tone: 'risky' },
          { id: 'b', label: '"feat(pricing): adjust hero color and spacing"', feedback: 'درست است. پیام کوتاه، در زمان حال، و با دامنهٔ مشخص (pricing) می‌گوید چه چیزی و کجا تغییر کرده. همین Commit را در Diff و بازبینی خوانا می‌کند.', tone: 'correct' },
          { id: 'c', label: '"final FINAL v2 done"', feedback: 'مناسب نیست. این نوع پیام‌ها تاریخچه را شلوغ و بی‌معنا می‌کنند. هدف پیام Commit، توضیح تغییر است نه شمارهٔ نسخهٔ شخصی.', tone: 'risky' },
        ],
        correct: 'b',
        explanation: 'پیام خوب Commit = چه چیزی تغییر کرد و چرا، کوتاه و قابل‌خواندن؛ این سرمایه‌گذاری روی بازبینی و آیندهٔ تیم است.',
        hint: 'کدام پیام به یک همکار می‌گوید دقیقاً چه چیزی عوض شده؟',
      },
      {
        id: 's4',
        situation: 'Commit زده شد، ولی هنوز فقط روی کامپیوتر توست. برای اینکه تیم ببیندش چه می‌کنی؟',
        commandPreview: 'git push -u origin feature/pricing-hero',
        stateNote: 'Push مرجع شاخهٔ محلی را به مخزن Remote می‌فرستد؛ کار Remote را به شاخهٔ محلی نمی‌آورد.',
        choices: [
          { id: 'a', label: 'git push -u origin feature/pricing-hero', feedback: 'درست است. این شاخهٔ محلی را روی Remote منتشر می‌کند و با ‎-u‎ ارتباط upstream را می‌سازد تا Push و Pull بعدی ساده باشند. حالا شاخه روی GitHub قابل‌دیدن است.', tone: 'correct' },
          { id: 'b', label: 'git push origin main تا سریع‌تر به شاخهٔ اصلی برسد', feedback: 'در این موقعیت امن نیست. Push مستقیم به main، کار بازبینی‌نشده را وارد شاخهٔ اصلی می‌کند و روند Pull Request را دور می‌زند. تغییر باید اول در شاخهٔ خودش بماند.', tone: 'unsafe' },
          { id: 'c', label: 'git pull تا هماهنگ شوم', feedback: 'اینجا کار درستی را در زمان اشتباه انجام می‌دهی. Pull برای آوردن کار دیگران است، نه فرستادن کار تو. برای دیده‌شدن شاخه باید Push کنی.', tone: 'incorrect' },
        ],
        correct: 'a',
        explanation: 'Push یعنی «شاخهٔ من را روی سرور بگذار». شاخهٔ فیچر جداست تا بازبینی روی آن انجام شود، نه روی main.',
        hint: 'کدام دستور کار محلی را «به بیرون» می‌فرستد، آن‌هم روی شاخهٔ خودش نه main؟',
      },
      {
        id: 's5',
        situation: 'شاخه روی GitHub است. حالا می‌خواهی رسماً درخواست بازبینی و ادغام بدهی. کدام درست است؟',
        stateNote: 'شبیه‌سازی آموزشی — Pull Request یک قابلیت پلتفرم میزبانی است، نه دستور Git.',
        choices: [
          { id: 'a', label: 'دستور git pull-request را اجرا کنم', feedback: 'مدل ذهنی دقیق نیست. Pull Request یک دستور Git نیست؛ قابلیتی در GitHub (و پلتفرم‌های مشابه) است. <code>git pull</code> هم کار کاملاً متفاوتی است: آوردن و یکپارچه‌کردن تغییرات Remote.', tone: 'incorrect' },
          { id: 'b', label: 'در GitHub روی شاخه یک Pull Request باز کنم', feedback: 'درست است. Pull Request در GitHub باز می‌شود و پیشنهاد می‌دهد تغییرات این شاخه بازبینی و به main ادغام شوند. بازکردن آن به‌تنهایی چیزی را Merge نمی‌کند؛ فضای گفت‌وگو و بررسی می‌سازد.', tone: 'correct' },
          { id: 'c', label: 'خودم شاخه را در GitHub مستقیم به main ادغام کنم', feedback: 'مناسب نیست. ادغام بدون بازبینی، هدف Pull Request را دور می‌زند. قاعدهٔ تیم معمولاً بازبینی و تأیید را قبل از Merge لازم دارد.', tone: 'risky' },
        ],
        correct: 'b',
        explanation: 'Pull Request فرایند بازبینی در GitHub است؛ بازکردنش شروع گفت‌وگوست، نه ادغام خودکار. این با دستور محلی git pull فقط هم‌نام است.',
        hint: 'کدام گزینه «قابلیت پلتفرم» است، نه دستور خط فرمان؟',
      },
      {
        id: 's6',
        situation: 'بازبین روی Pull Request «Request changes» زده و دو کامنت گذاشته. بهترین واکنش؟',
        choices: [
          { id: 'a', label: 'در همان شاخه اصلاح کنم، Commit و Push کنم و گفت‌وگوها را Resolve کنم', feedback: 'درست است. Pull Request به شاخه وصل است؛ هر Push جدید خودکار در همان PR دیده می‌شود و تاریخچهٔ بحث حفظ می‌ماند. نیازی به PR تازه نیست.', tone: 'correct' },
          { id: 'b', label: 'این PR را ببندم و یک PR تازه باز کنم', feedback: 'مناسب نیست. بستن و بازکردن دوباره، تاریخچهٔ بازبینی و کامنت‌ها را از دست می‌دهد. کافی است روی همین شاخه اصلاح و Push کنی.', tone: 'risky' },
          { id: 'c', label: 'اصلاح را مستقیم روی main اعمال کنم', feedback: 'در این موقعیت امن نیست. دورزدن شاخه و بازبینی، دقیقاً همان چیزی است که Pull Request برای جلوگیری از آن ساخته شده.', tone: 'unsafe' },
        ],
        correct: 'a',
        explanation: 'Pull Request زنده است: با هر Push به همان شاخه به‌روز می‌شود. اصلاح در همان شاخه، مسیر تمیز و قابل‌ردگیری است.',
        hint: 'چطور می‌توانی بدون از دست دادن کامنت‌ها، تغییر را در همان درخواست به‌روز کنی؟',
      },
    ],
    completionMessage: 'یک تغییر طراحی را از بررسی وضعیت تا Pull Request و پاسخ به بازبینی، تمیز و امن به مقصد رساندی.',
    nextAction: { label: 'مرور سطح ۱۲: Pull Request برای طراحان', href: '#/level-12' },
  },

  /* ---------------- AI & PROTOTYPE ---------------- */
  {
    id: 'ai-safe-checkpoint',
    title: 'چک‌پوینت امن پیش از ادامهٔ کار با کد AI',
    shortDescription: 'خروجی یک ابزار AI را بررسی کن، Secret را بیرون بگذار، در شاخهٔ جدا چک‌پوینت بساز و فایل ناخواسته را امن برگردان.',
    trackId: 'ai-prototype',
    levelIds: [21, 6, 14],
    difficulty: 'تخصصی',
    icon: 'ph-robot',
    context: 'یک ابزار کدنویسی AI روی پروتوتایپ ۱۴ فایل را تغییر داده. بعضی تغییرها مفیدند، بعضی نه — و یک فایل <code>.env</code> با توکن Figma هم ساخته شده. می‌خواهی قبل از Prompt بعدی، یک نقطهٔ امن داشته باشی.',
    objectives: [
      'خروجی AI را قبل از پذیرش بررسی کنی',
      'از Commit‌شدن Secret جلوگیری کنی',
      'کار آزمایشی را در شاخهٔ جدا نگه داری و چک‌پوینت بسازی',
      'یک فایل ناخواسته را بدون آسیب به بقیه برگردانی',
    ],
    steps: [
      {
        id: 's1',
        situation: 'ابزار می‌گوید «۱۴ فایل به‌روز شد». اولین کار درست چیست؟',
        commandPreview: 'git diff',
        stateNote: 'git diff تغییرات Commit‌نشده را نشان می‌دهد؛ چیزی را تغییر نمی‌دهد.',
        choices: [
          { id: 'a', label: 'اول git diff بزنم و خروجی تولیدشده را بخوانم', feedback: 'درست است. کد AI خودکار درست نیست؛ باید مثل کد یک همکار تازه‌کار بازبینی شود. git diff دقیقاً می‌گوید چه چیزی عوض شده تا آگاهانه تصمیم بگیری.', tone: 'correct' },
          { id: 'b', label: 'git add . و Commit بزنم چون ابزار معمولاً درست کار می‌کند', feedback: 'مناسب نیست. فرض «AI درست است» خطرناک است. Commit‌کردن ۱۴ فایل بدون دیدن آن‌ها، هم تغییر ناخواسته و هم احتمالاً Secret را وارد تاریخچه می‌کند.', tone: 'unsafe' },
          { id: 'c', label: 'همه را دور بریزم چون معلوم نیست چه کرده', feedback: 'عجولانه است. شاید بخشی از تغییرات مفید باشد. اول بررسی کن، بعد تصمیم بگیر چه چیزی بماند و چه چیزی برود.', tone: 'risky' },
        ],
        correct: 'a',
        explanation: 'کار با AI یعنی Git به سیستم کنترل کیفیت تبدیل می‌شود: اول ببین، بعد بپذیر.',
        hint: 'قبل از پذیرفتن کار هر کسی — انسان یا ماشین — چه می‌کنی؟',
      },
      {
        id: 's2',
        situation: 'بین تغییرات، فایل <code>.env</code> با یک توکن واقعی Figma دیده می‌شود. چه می‌کنی؟',
        choices: [
          { id: 'a', label: 'Commit‌اش می‌کنم؛ مخزن Private است پس امن است', feedback: 'در این موقعیت امن نیست. Private یعنی «محدودیت دسترسی»، نه امنیت کامل. توکن Commit‌شده در تاریخچه می‌ماند و هر کسی که بعداً دسترسی بگیرد آن را می‌بیند. Secret نباید Commit شود.', tone: 'unsafe' },
          { id: 'b', label: '.env را به .gitignore اضافه می‌کنم، Commit‌اش نمی‌کنم و در صورت لورفتن توکن را Revoke می‌کنم', feedback: 'درست است. فایل را از ردگیری بیرون می‌گذاری و اگر توکن جایی دیده شده، بهترین کار Revoke و ساخت کلید تازه است. متغیرها را با <code>.env.example</code> بدون مقدار مستند کن.', tone: 'correct' },
          { id: 'c', label: 'Commit می‌کنم و بعداً با یک Commit دیگر پاکش می‌کنم', feedback: 'مناسب نیست. حتی اگر بعداً فایل را پاک کنی، توکن در تاریخچهٔ Git باقی می‌ماند و قابل‌بازیابی است. راه‌حل، اصلاً Commit‌نکردن آن است.', tone: 'unsafe' },
        ],
        correct: 'b',
        explanation: 'privacy با security یکی نیست. Secret از تاریخچه بیرون می‌ماند؛ لو رفت، اول Revoke.',
        hint: 'آیا Private‌بودن مخزن، Commit‌کردن یک توکن را امن می‌کند؟',
      },
      {
        id: 's3',
        situation: 'می‌خواهی آزمایش با AI را ادامه بدهی ولی کار پایدارت در امان بماند. کجا کار کنی؟',
        commandPreview: 'git switch -c ai/hero-experiment',
        choices: [
          { id: 'a', label: 'مستقیم روی main ادامه بدهم تا ساده باشد', feedback: 'مناسب نیست. main باید پایدار بماند. اگر آزمایش خراب شود، main آلوده می‌شود و جداکردن کار سخت می‌شود.', tone: 'risky' },
          { id: 'b', label: 'یک شاخهٔ جدا مثل ai/hero-experiment بسازم و در آن آزمایش کنم', feedback: 'درست است. شاخهٔ جدا، فضای آزمایش امن می‌سازد: هر خروجی AI آنجا می‌ماند و main دست‌نخورده و قابل‌بازگشت است.', tone: 'correct' },
          { id: 'c', label: 'قبل از هر Prompt کل پوشه را دستی zip کنم', feedback: 'ممکن است، ولی بهترین انتخاب نیست. کپی دستی پوشه همان کاری است که Git بهتر و با تاریخچهٔ دقیق انجام می‌دهد. شاخه، ابزار درست همین کار است.', tone: 'risky' },
        ],
        correct: 'b',
        explanation: 'شاخه = فضای آزمایش ایزوله. کار اکتشافی روی شاخهٔ جدا می‌ماند تا main همیشه سالم باشد.',
        hint: 'کدام ابزار Git برای «کار موازی بدون دست‌زدن به main» ساخته شده؟',
      },
      {
        id: 's4',
        situation: 'به یک نقطهٔ سالم رسیده‌ای و می‌خواهی قبل از Prompt بعدی آن را نگه داری. چه می‌کنی؟',
        commandPreview: 'git commit -m "checkpoint: working hero variant before next AI prompt"',
        stateNote: 'Commit یک عکس کامل و قابل‌بازگشت از پروژه می‌سازد.',
        choices: [
          { id: 'a', label: 'همین حالت سالم را با یک Commit چک‌پوینت ثبت کنم', feedback: 'درست است. یک Commit در شاخهٔ آزمایش، نقطهٔ بازگشت می‌سازد؛ اگر Prompt بعدی خراب کرد، با restore یا revert به همین‌جا برمی‌گردی.', tone: 'correct' },
          { id: 'b', label: 'صبر کنم و تا کاملاً تمام‌نشده هیچ Commit نزنم', feedback: 'مناسب نیست. بدون نقطهٔ بازگشت، یک خروجی بد می‌تواند ساعت‌ها کار را ببرد. Commitهای کوچک و مکرر در حین آزمایش، امن‌ترند.', tone: 'risky' },
          { id: 'c', label: 'git reset --hard بزنم تا از نو شروع شود', feedback: 'در این موقعیت امن نیست. reset --hard تغییرات Commit‌نشده را برای همیشه پاک می‌کند. تو می‌خواهی حالت خوب را نگه داری، نه دور بریزی.', tone: 'unsafe' },
        ],
        correct: 'a',
        explanation: 'چک‌پوینت = یک Commit در حالت سالم. کار با AI بدون نقطهٔ بازگشت، ریسک بزرگی است.',
        hint: 'چطور یک «نقطهٔ ذخیرهٔ» قابل‌بازگشت می‌سازی؟',
      },
      {
        id: 's5',
        situation: 'می‌بینی AI فایل درستِ <code>Button.tsx</code> را هم بی‌دلیل عوض کرده و این تغییر هنوز Commit نشده. فقط همین فایل را می‌خواهی به حالت آخرین Commit برگردانی.',
        commandPreview: 'git restore Button.tsx',
        stateNote: 'restore فقط Working tree همان فایل را به آخرین نسخهٔ Commit‌شده برمی‌گرداند.',
        choices: [
          { id: 'a', label: 'git restore Button.tsx', feedback: 'درست است. restore فقط تغییرِ Commit‌نشدهٔ همین فایل را دور می‌ریزد و به آخرین نسخهٔ سالم Commit‌شده برمی‌گردد. بقیهٔ فایل‌ها دست‌نخورده می‌مانند. (چون Commit نشده بود، این تغییر قابل‌بازیابی نیست، پس مطمئن باش.)', tone: 'correct' },
          { id: 'b', label: 'git reset --hard تا همه‌چیز پاک شود', feedback: 'در این موقعیت امن نیست. reset --hard همهٔ تغییرات Commit‌نشدهٔ شاخه را می‌برد، نه فقط این فایل. تو تغییرات خوب دیگر را هم از دست می‌دهی.', tone: 'unsafe' },
          { id: 'c', label: 'git revert روی Button.tsx بزنم', feedback: 'مدل ذهنی دقیق نیست. revert برای خنثی‌کردن یک Commit موجود است، نه دورریختن تغییر Commit‌نشدهٔ یک فایل. اینجا چون هنوز Commit نشده، ابزار درست restore است.', tone: 'incorrect' },
        ],
        correct: 'a',
        explanation: 'restore ابزار دقیق برای «این فایل را به حالت Commit‌شده برگردان» است؛ reset --hard پتک است و revert برای تاریخچهٔ Commit‌شده.',
        hint: 'کدام دستور فقط یک فایل مشخص را برمی‌گرداند، نه کل شاخه؟',
      },
    ],
    completionMessage: 'خروجی AI را کنترل‌شده مدیریت کردی: بررسی، بیرون‌گذاشتن Secret، شاخهٔ آزمایش، چک‌پوینت، و بازگردانی امن یک فایل.',
    nextAction: { label: 'مرور سطح ۲۱: Git برای پروژه‌های AI', href: '#/level-21' },
  },

  /* ---------------- DESIGN SYSTEM ---------------- */
  {
    id: 'ds-token-conflict',
    title: 'حل تعارض توکن‌های مشترک بدون بازنویسی کار تیم',
    shortDescription: 'روی شاخهٔ جدا کار کن، وضعیت Remote را بیاور، یک تعارض توکن را درست حل کن و برای بازبینی آماده کن.',
    trackId: 'design-system',
    levelIds: [8, 10, 17, 23, 24],
    difficulty: 'تخصصی',
    icon: 'ph-palette',
    context: 'تو و یک هم‌تیمی هر دو رنگ اصلی برند را در <code>tokens.json</code> عوض کرده‌اید. کار او زودتر روی <code>main</code> در Remote رفته. می‌خواهی تغییر خودت را بدون پاک‌کردن کار او به مقصد برسانی.',
    objectives: [
      'روی شاخهٔ عمدی کار کنی، نه مستقیم روی main',
      'قبل از Push وضعیت Remote را بیاوری و بررسی کنی',
      'بدانی تعارض یعنی چه و مارکرها را درست حل کنی',
      'فایل حل‌شده را Stage کنی و عملیات را ادامه بدهی',
    ],
    steps: [
      {
        id: 's1',
        situation: 'می‌خواهی رنگ برند را عوض کنی. کجا این کار را انجام می‌دهی؟',
        commandPreview: 'git switch -c ds/brand-color',
        choices: [
          { id: 'a', label: 'مستقیم روی main تغییر می‌دهم تا سریع‌تر باشد', feedback: 'مناسب نیست. تغییر مستقیم روی main، بازبینی را دور می‌زند و در فایل مشترک، برخورد با کار دیگران را محتمل‌تر می‌کند.', tone: 'risky' },
          { id: 'b', label: 'یک شاخهٔ جدا مثل ds/brand-color می‌سازم و آنجا کار می‌کنم', feedback: 'درست است. تغییر توکن روی شاخهٔ خودش می‌ماند تا بازبینی شود و main پایدار بماند — به‌ویژه برای فایل‌های مشترک Design System.', tone: 'correct' },
          { id: 'c', label: 'tokens.json را کپی می‌کنم و نسخهٔ دوم می‌سازم', feedback: 'مناسب نیست. دو نسخه از یک فایل توکن، منبع حقیقت را می‌شکند. Git برای نگه‌داشتن یک فایل با تاریخچهٔ شاخه‌ای ساخته شده، نه کپی دستی.', tone: 'risky' },
        ],
        correct: 'b',
        explanation: 'تغییرات Design System روی شاخهٔ عمدی انجام می‌شود تا قابل‌بازبینی و قابل‌بازگشت بماند.',
        hint: 'کدام روش تغییر را ایزوله و قابل‌بازبینی نگه می‌دارد؟',
      },
      {
        id: 's2',
        situation: 'قبل از Push، می‌خواهی مطمئن شوی کار هم‌تیمی‌ات را از بین نمی‌بری. چه می‌کنی؟',
        commandPreview: 'git fetch origin\ngit log --oneline main..origin/main',
        stateNote: 'fetch فقط remote-tracking مثل origin/main را به‌روز می‌کند؛ شاخهٔ کاری‌ات را خودکار تغییر نمی‌دهد.',
        choices: [
          { id: 'a', label: 'git push --force تا نسخهٔ من قطعی شود', feedback: 'در این موقعیت امن نیست. force push تاریخچهٔ Remote را بازنویسی می‌کند و می‌تواند Commit هم‌تیمی‌ات را پاک کند. این دقیقاً همان «بازنویسی خاموش کار مشترک» است که باید از آن پرهیز کرد.', tone: 'unsafe' },
          { id: 'b', label: 'git fetch بزنم و ببینم روی origin/main چه Commit تازه‌ای هست', feedback: 'درست است. fetch وضعیت Remote را به remote-tracking می‌آورد بدون تغییر کار فعلی‌ات، تا قبل از یکپارچه‌سازی ببینی هم‌تیمی‌ات چه کرده. این قدم امن قبل از هر ادغام است.', tone: 'correct' },
          { id: 'c', label: 'tokens.json را پاک کنم و از نو بنویسم', feedback: 'مناسب نیست. پاک‌کردن فایل، کار هم‌تیمی‌ات را هم دور می‌ریزد. هدف، یکپارچه‌کردن دو تغییر است، نه حذف یکی.', tone: 'risky' },
        ],
        correct: 'b',
        explanation: 'fetch یعنی «اول خبرها را بیاور و ببین»؛ force push در کار تیمی می‌تواند کار دیگران را نابود کند.',
        hint: 'کدام دستور وضعیت Remote را می‌آورد بدون اینکه چیزی را بازنویسی کند؟',
      },
      {
        id: 's3',
        situation: 'بعد از یکپارچه‌سازی، در <code>tokens.json</code> این را می‌بینی:<br><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> … <code>=======</code> … <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/main</code>. این یعنی چه؟',
        stateNote: 'شبیه‌سازی آموزشی — این مارکرها را Git برای نشان‌دادن دو نسخهٔ متفاوت می‌گذارد.',
        choices: [
          { id: 'a', label: 'اشتباه کرده‌ام و باید کار را از نو شروع کنم', feedback: 'مدل ذهنی دقیق نیست. تعارض به‌معنای خطای تو نیست. یعنی هر دو نفر همان خط را جور دیگری عوض کرده‌اید و Git نمی‌تواند خودش تصمیم بگیرد؛ از تو تصمیم انسانی می‌خواهد.', tone: 'incorrect' },
          { id: 'b', label: 'Git نتوانسته خودکار تصمیم بگیرد و منتظر انتخاب من است', feedback: 'درست است. مارکرها یعنی هر دو شاخه همان خط را تغییر داده‌اند و Git بخش متعارض را نگه داشته تا تو تصمیم بگیری کدام نسخه (یا ترکیب) درست است.', tone: 'correct' },
          { id: 'c', label: 'فایل خراب شده و باید حذفش کنم', feedback: 'مناسب نیست. فایل خراب نیست؛ فقط دو نسخه کنار هم نشان داده شده. حذف فایل یعنی از دست دادن هر دو تغییر.', tone: 'risky' },
        ],
        correct: 'b',
        explanation: 'تعارض یعنی درخواست تصمیم انسانی، نه خطا. مارکرها را باید بررسی کرد، نه کورکورانه حذف.',
        hint: 'وقتی دو نفر همان خط را عوض می‌کنند، Git از چه کسی کمک می‌خواهد؟',
      },
      {
        id: 's4',
        situation: 'می‌دانی رنگ نهایی برند طبق تصمیم تیم <code>#6C5CE7</code> است. چطور تعارض را حل می‌کنی؟',
        choices: [
          { id: 'a', label: 'مارکرها را همان‌طور رها می‌کنم و Commit می‌زنم', feedback: 'مناسب نیست. اگر مارکرهای <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> و <code>=======</code> در فایل بمانند، <code>tokens.json</code> دیگر JSON معتبر نیست و Build و ابزارها می‌شکنند.', tone: 'incorrect' },
          { id: 'b', label: 'نسخهٔ درست را نگه می‌دارم، مارکرها را حذف می‌کنم و مطمئن می‌شوم JSON معتبر است', feedback: 'درست است. حل تعارض یعنی تصمیم‌گرفتن دربارهٔ محتوای نهایی: مقدار درست (#6C5CE7) را نگه می‌داری، هر سه خط مارکر را برمی‌داری و اعتبار فایل را بررسی می‌کنی.', tone: 'correct' },
          { id: 'c', label: 'هر دو نسخه را نگه می‌دارم تا چیزی گم نشود', feedback: 'مناسب نیست. نگه‌داشتن دو مقدار برای همان کلید، JSON را نامعتبر یا نتیجه را نامشخص می‌کند. باید یک مقدار نهایی انتخاب شود.', tone: 'risky' },
        ],
        correct: 'b',
        explanation: 'حل تعارض = انتخاب محتوای نهایی و برداشتن همهٔ مارکرها، سپس اطمینان از معتبربودن فایل.',
        hint: 'اگر مارکرها در فایل بمانند، آیا tokens.json هنوز JSON معتبری است؟',
      },
      {
        id: 's5',
        situation: 'فایل را درست حل کردی و ذخیره کردی. قدم بعدی برای کامل‌کردن ادغام چیست؟',
        commandPreview: 'git add tokens.json\ngit commit',
        stateNote: 'فایل حل‌شده باید Stage شود تا Git بداند تعارض برطرف شده.',
        choices: [
          { id: 'a', label: 'git add tokens.json و سپس ادامهٔ عملیات (Commit)', feedback: 'درست است. فایل حل‌شده را Stage می‌کنی تا Git بفهمد تعارض برطرف شده، بعد عملیات را با Commit کامل می‌کنی. حالا آمادهٔ Push و بازبینی است.', tone: 'correct' },
          { id: 'b', label: 'مستقیم git push بزنم', feedback: 'مناسب نیست. تا وقتی فایل حل‌شده Stage و Commit نشده، ادغام کامل نیست و Push یا رد می‌شود یا حالت ناتمام را می‌فرستد. اول عملیات را ببند.', tone: 'risky' },
          { id: 'c', label: 'git merge --abort بزنم', feedback: 'ممکن است، ولی بهترین انتخاب نیست. abort کل ادغام را لغو می‌کند و کار حل‌تعارضی که تازه انجام دادی از بین می‌رود. abort برای وقتی است که می‌خواهی از اول شروع کنی، نه وقتی حل کرده‌ای.', tone: 'risky' },
        ],
        correct: 'a',
        explanation: 'بعد از حل، فایل را Stage کن و عملیات را ادامه بده؛ abort فقط وقتی به کار می‌آید که بخواهی همه‌چیز را لغو کنی.',
        hint: 'Git از کجا می‌فهمد که تعارض یک فایل واقعاً حل شده؟',
      },
    ],
    completionMessage: 'یک تعارض توکن مشترک را بدون بازنویسی کار تیم حل کردی: شاخهٔ جدا، fetch، حل درست مارکرها و ادامهٔ امن ادغام.',
    nextAction: { label: 'مرور سطح ۲۴: Git برای Figma و Design Tokens', href: '#/level-24' },
  },

  /* ---------------- DESIGN TECHNOLOGIST ---------------- */
  {
    id: 'dt-clean-branch',
    title: 'آماده‌کردن یک شاخهٔ تمیز برای بازبینی',
    shortDescription: 'بین Merge و Rebase درست انتخاب کن، یک رفع‌باگ را Cherry-pick کن و یک Commit اشتباهِ منتشرشده را امن خنثی کن.',
    trackId: 'design-technologist',
    levelIds: [14, 27, 28],
    difficulty: 'پیشرفته',
    icon: 'ph-crown-simple',
    context: 'شاخهٔ محلی و هنوز Push‌نشدهٔ <code>feature/nav-redesign</code> چند Commit شلوغ دارد. یک رفع‌باگ لازم هم در شاخهٔ دیگری جا مانده، و یک Commit اشتباه دیروز منتشر شده و دو هم‌تیمی از آن Pull کرده‌اند.',
    objectives: [
      'بین Merge و Rebase با توجه به اشتراکی‌بودن تاریخچه انتخاب کنی',
      'یک Commit مشخص را با Cherry-pick بیاوری',
      'یک Commit منتشرشدهٔ اشتباه را بدون بازنویسی تاریخچهٔ مشترک خنثی کنی',
      'تفاوت پیامد ابزارها روی تاریخچهٔ محلی و مشترک را بفهمی',
    ],
    steps: [
      {
        id: 's1',
        situation: 'می‌خواهی تاریخچهٔ شاخهٔ محلی و هنوز Push‌نشده‌ات را قبل از باز کردن Pull Request خطی و خوانا کنی. کدام امن است؟',
        commandPreview: 'git rebase main',
        stateNote: 'Rebase تاریخچه را بازنویسی می‌کند؛ روی شاخهٔ محلیِ منتشرنشده امن است.',
        choices: [
          { id: 'a', label: 'روی همین شاخهٔ محلیِ منتشرنشده git rebase main بزنم', feedback: 'درست است. چون شاخه هنوز Push نشده و کسی رویش کار نمی‌کند، Rebase امن است و تاریخچه را خطی و تمیز می‌کند. Rebase را فقط روی کار محلیِ به‌اشتراک‌گذاشته‌نشده انجام بده.', tone: 'correct' },
          { id: 'b', label: 'روی یک شاخهٔ مشترک که دیگران هم Push کرده‌اند Rebase و force push بزنم', feedback: 'در این موقعیت امن نیست. Rebase و force push روی شاخهٔ مشترک، تاریخچه‌ای که دیگران دارند را بازنویسی می‌کند و کارشان را می‌شکند. Rebase مخصوص تاریخچهٔ محلی است.', tone: 'unsafe' },
          { id: 'c', label: 'git reset --hard بزنم تا Commitهای شلوغ پاک شوند', feedback: 'مناسب نیست. reset --hard می‌تواند کار را برای همیشه ببرد. هدف تو مرتب‌کردن تاریخچه است، نه دورریختن Commitها.', tone: 'unsafe' },
        ],
        correct: 'a',
        explanation: 'Rebase روی شاخهٔ محلیِ منتشرنشده امن و مفید است؛ روی تاریخچهٔ مشترک، بازنویسی خطرناک است.',
        hint: 'آیا این شاخه را کسی دیگر دارد، یا فقط روی کامپیوتر توست؟',
      },
      {
        id: 's2',
        situation: 'یک Commit رفع‌باگ با شناسهٔ <code>a1b2c3d</code> در شاخهٔ دیگری است و همین‌الان فقط همان یک Commit را لازم داری، نه کل آن شاخه را.',
        commandPreview: 'git cherry-pick a1b2c3d',
        choices: [
          { id: 'a', label: 'git cherry-pick a1b2c3d', feedback: 'درست است. Cherry-pick یک Commit مشخص را از شاخهٔ دیگر روی شاخهٔ فعلی می‌آورد — دقیقاً وقتی یک رفع‌باگ مستقل را می‌خواهی، نه کل تاریخچهٔ آن شاخه.', tone: 'correct' },
          { id: 'b', label: 'کل آن شاخه را Merge کنم', feedback: 'مناسب نیست. Merge همهٔ Commitهای آن شاخه را می‌آورد، از جمله کارهای ناتمام یا نامربوط. وقتی فقط یک Commit را می‌خواهی، Cherry-pick دقیق‌تر است.', tone: 'risky' },
          { id: 'c', label: 'تغییر را دستی کپی و پیست کنم', feedback: 'مناسب نیست. کپی دستی، پیام و نویسنده و ارتباط تاریخچه را از دست می‌دهد و خطاپذیر است. Cherry-pick همین کار را تمیز و قابل‌ردگیری انجام می‌دهد.', tone: 'risky' },
        ],
        correct: 'a',
        explanation: 'Cherry-pick برای «یک Commit مستقل را از جای دیگر بیاور» است؛ برای مجموعهٔ وابسته، Merge یا Rebase مناسب‌تر است.',
        hint: 'کدام ابزار دقیقاً یک Commit را جابه‌جا می‌کند، نه کل شاخه را؟',
      },
      {
        id: 's3',
        situation: 'آن Commit اشتباه دیروز Push شده و دو هم‌تیمی از آن Pull کرده‌اند. می‌خواهی اثرش را خنثی کنی. کدام امن است؟',
        commandPreview: 'git revert a1b2c3d',
        stateNote: 'Revert یک Commit جدید می‌سازد که اثر Commit قبلی را خنثی می‌کند؛ تاریخچه را بازنویسی نمی‌کند.',
        choices: [
          { id: 'a', label: 'git revert روی آن Commit بزنم', feedback: 'درست است. چون Commit منتشر شده و دیگران آن را دارند، revert امن‌ترین راه است: یک Commit تازه می‌سازد که اثر آن را خنثی می‌کند، بدون بازنویسی تاریخچهٔ مشترک.', tone: 'correct' },
          { id: 'b', label: 'git reset --hard و بعد force push', feedback: 'در این موقعیت امن نیست. reset و force push تاریخچهٔ منتشرشده را بازنویسی می‌کند و با نسخهٔ دو هم‌تیمی تضاد می‌سازد. برای کار مشترک، این خطرناک است.', tone: 'unsafe' },
          { id: 'c', label: 'git commit --amend روی آن Commit', feedback: 'مناسب نیست. amend هش Commit را عوض می‌کند و تاریخچهٔ منتشرشده را بازنویسی می‌کند؛ مثل reset، برای Commit‌های Push‌شده مشکل‌ساز است.', tone: 'unsafe' },
        ],
        correct: 'a',
        explanation: 'برای تاریخچهٔ مشترک، revert امن است چون تاریخچه را بازنویسی نمی‌کند؛ reset و amend فقط قبل از انتشار مناسب‌اند.',
        hint: 'کدام گزینه بدون بازنویسی تاریخچه، اثر یک Commit را خنثی می‌کند؟',
      },
      {
        id: 's4',
        situation: 'حالا شاخه‌ات تاریخچهٔ خوانا دارد و باگ خنثی شده. برای بازبینی چه می‌کنی؟',
        choices: [
          { id: 'a', label: 'شاخهٔ فیچرِ تمیز را Push و یک Pull Request برای بازبینی باز کنم', feedback: 'درست است. با تاریخچهٔ مرتب، Push شاخهٔ فیچر و باز کردن Pull Request، مسیر استاندارد بازبینی و ادغام است. کار تو حالا برای تیم خوانا و قابل‌بحث است.', tone: 'correct' },
          { id: 'b', label: 'مستقیم به main رفتن و Push کردن', feedback: 'مناسب نیست. Push مستقیم به main بازبینی را دور می‌زند. کل هدف این مرتب‌سازی، آماده‌کردن یک شاخهٔ قابل‌بازبینی بود.', tone: 'risky' },
          { id: 'c', label: 'شاخهٔ مشترکی که دیگران رویش کار می‌کنند را Rebase کنم', feedback: 'در این موقعیت امن نیست. Rebase شاخهٔ مشترک، تاریخچهٔ دیگران را بازنویسی می‌کند. شاخهٔ فیچر خودت را بفرست، نه شاخهٔ مشترک را دستکاری کن.', tone: 'unsafe' },
        ],
        correct: 'a',
        explanation: 'شاخهٔ تمیز + Pull Request = بازبینی روشن. بازنویسی تاریخچهٔ مشترک همچنان ممنوع می‌ماند.',
        hint: 'کدام مسیر، کار مرتب‌شده را برای بازبینی می‌فرستد بدون دستکاری تاریخچهٔ مشترک؟',
      },
    ],
    completionMessage: 'یک شاخهٔ تمیز و قابل‌بازبینی ساختی: Rebase امن روی کار محلی، Cherry-pick هدفمند، و خنثی‌کردن امن یک Commit منتشرشده با revert.',
    nextAction: { label: 'مرور سطح ۲۷: Rebase', href: '#/level-27' },
  },
];

export const MISSION_BY_ID = MISSIONS.reduce((m, x) => { m[x.id] = x; return m; }, {});
export const MISSION_IDS = MISSIONS.map(m => m.id);
export const missionsForTrack = (trackId) => MISSIONS.filter(m => m.trackId === trackId);
