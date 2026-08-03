export const LEVELS = [
{ id:1, title:'مفاهیم پایه و ضروری', branch:'main', subtitle:'قبل از هر دستوری، باید بفهمی Git اصلاً چه مسئله‌ای را حل می‌کند.',
body:`
<h3>Version Control چیست؟</h3>
<p><strong>Version Control</strong> (کنترل نسخه) یعنی سیستمی که تاریخچهٔ تغییرات فایل‌ها را نگه می‌دارد؛ به‌طوری که بتوانی ببینی چه چیزی، کی و توسط چه کسی تغییر کرده و در صورت نیاز به هر نقطه‌ای در گذشته برگردی.</p>
<div class="example"><div class="ex-title">مثال آشنا برای طراح</div>
<p>حتماً پوشه‌ای شبیه این دیده‌ای: <code>final.fig</code> و <code>final-v2.fig</code> و <code>final-FINAL-approved.fig</code>. این همان کنترل نسخهٔ دستی و شکننده است. Version Control همین کار را به‌صورت منظم، خودکار و قابل‌اعتماد انجام می‌دهد؛ بدون کپی‌کردن فایل‌ها.</p></div>
<h3>Git چیست؟</h3>
<p><strong>Git</strong> محبوب‌ترین ابزار کنترل نسخه در دنیاست. یک نرم‌افزار رایگان که روی کامپیوتر خودت نصب می‌شود و تاریخچهٔ کامل پروژه را داخل همان پوشهٔ پروژه نگه می‌دارد. Git برای کارکردن حتی به اینترنت نیاز ندارد.</p>
<h3>تفاوت Git و GitHub</h3>
<table><tr><th></th><th>Git</th><th>GitHub</th></tr>
<tr><td><strong>چیست؟</strong></td><td>نرم‌افزار کنترل نسخه</td><td>وب‌سایت میزبانی پروژه‌های Git</td></tr>
<tr><td><strong>کجاست؟</strong></td><td>روی کامپیوتر تو</td><td>روی سرورهای ابری</td></tr>
<tr><td><strong>چه می‌کند؟</strong></td><td>تاریخچه را ثبت می‌کند</td><td>اشتراک‌گذاری، همکاری، Pull Request</td></tr></table>
<p>تشبیه ساده: Git مثل «قابلیت ذخیره‌سازی فایل» است و GitHub مثل «Google Drive برای پروژه‌های Git». می‌توانی از Git بدون GitHub استفاده کنی، ولی برعکسش معنا ندارد. رقبای GitHub هم وجود دارند: GitLab و Bitbucket.</p>
<h3>Repository چیست؟</h3>
<p><strong>Repository</strong> (یا کوتاه: Repo) یعنی پوشهٔ پروژه به‌همراه تمام تاریخچه‌اش. هر پروژه یک Repo است.</p>
<ul>
<li><strong>Local Repository:</strong> نسخه‌ای که روی کامپیوتر خودت است و مستقیم با آن کار می‌کنی.</li>
<li><strong>Remote Repository:</strong> نسخه‌ای که روی سرور (مثلاً GitHub) است و نقطهٔ مشترک تیم محسوب می‌شود.</li>
</ul>
<h3>سه ناحیهٔ اصلی Git</h3>
<p>هر تغییری در Git از سه ایستگاه عبور می‌کند. این مهم‌ترین مدل ذهنی کل Git است:</p>
<ol>
<li><strong>Working Directory:</strong> پوشهٔ پروژه؛ جایی که فایل‌ها را واقعاً ویرایش می‌کنی.</li>
<li><strong>Staging Area:</strong> «سبد خرید» تغییرات. اینجا انتخاب می‌کنی کدام تغییرات وارد ثبت بعدی شوند.</li>
<li><strong>Commit:</strong> ثبت دائمی. یک عکس (Snapshot) از وضعیت انتخاب‌شده که برای همیشه در تاریخچه می‌ماند.</li>
</ol>
<pre><code><span class="c"># مسیر حرکت هر تغییر:</span>
Working Directory  →  Staging Area  →  Commit History
   (ویرایش)            (git add)        (git commit)</code></pre>
<h3>Commit و Commit History</h3>
<p>هر <strong>Commit</strong> یک نقطهٔ ذخیرهٔ کامل از پروژه است: چه فایل‌هایی چه محتوایی داشتند، به‌همراه توضیح، نویسنده و زمان. <strong>Commit History</strong> زنجیرهٔ همین نقطه‌هاست؛ داستان کامل پروژه از اول تا الان.</p>
<h3>Snapshot در Git</h3>
<p>Git به‌جای ذخیرهٔ «فرق فایل‌ها»، در هر Commit یک <strong>عکس کامل از کل پروژه</strong> ذخیره می‌کند (و هوشمندانه فایل‌های تغییرنکرده را تکرار نمی‌کند). به همین دلیل برگشتن به هر Commit یعنی برگشتن کل پروژه به همان لحظه.</p>
<h3>تفاوت Save و Commit</h3>
<p><strong>Save</strong> (Ctrl+S) فقط آخرین حالت فایل را روی دیسک می‌نویسد و حالت قبلی را نابود می‌کند. <strong>Commit</strong> یک نقطهٔ تاریخی جدید می‌سازد بدون اینکه نقاط قبلی از بین بروند. Save یعنی «بازنویسی»، Commit یعنی «افزودن به تاریخچه».</p>
<h3>تفاوت Git با Cloud Storage</h3>
<p>Dropbox یا Google Drive فقط «آخرین نسخهٔ فایل» را همگام می‌کنند و شاید چند نسخهٔ خودکار قبلی را نگه دارند. Git در عوض: نقاط ذخیرهٔ <strong>عمدی و توضیح‌دار</strong> دارد، شاخه‌سازی (Branch) دارد، مقایسهٔ دقیق خط‌به‌خط (Diff) دارد و برای همکاری چند نفر روی یک فایل ساخته شده است.</p>
<h3>ساختار یک Repository و پوشهٔ مخفی .git</h3>
<p>وقتی پوشه‌ای را به Repo تبدیل می‌کنی، Git یک پوشهٔ مخفی به نام <code>.git</code> داخلش می‌سازد. تمام تاریخچه، تنظیمات و جادوی Git داخل همین یک پوشه است. اگر <code>.git</code> را پاک کنی، پروژه سالم می‌ماند ولی کل تاریخچه از بین می‌رود؛ پس هرگز دستی به آن دست نزن.</p>
<h3>Git Workflow پایه</h3>
<pre><code><span class="c"># چرخهٔ روزمرهٔ کار با Git:</span>
1. فایل‌ها را ویرایش کن          <span class="c">(Working Directory)</span>
2. git status                    <span class="c">← ببین چه چیزی تغییر کرده</span>
3. git add                       <span class="c">← تغییرات را انتخاب کن</span>
4. git commit                    <span class="c">← با یک پیام ثبت کن</span>
5. git push                      <span class="c">← به GitHub بفرست</span></code></pre>
<div class="callout tip"><span class="co-title">جمع‌بندی این سطح</span>Git تاریخچه‌ساز محلی است، GitHub خانهٔ ابری آن. هر تغییر از مسیر Working Directory ← Staging ← Commit عبور می‌کند و هر Commit یک عکس کامل و برگشت‌پذیر از پروژه است.</div>
`,
quiz:[
{q:'تفاوت اصلی Git و GitHub چیست؟', o:['Git برای طراحان است و GitHub برای برنامه‌نویسان','Git ابزار کنترل نسخه روی کامپیوتر توست؛ GitHub سرویس ابری میزبانی و همکاری روی پروژه‌های Git','GitHub نسخهٔ جدیدتر Git است','هیچ تفاوتی ندارند'], a:1, why:'Git نرم‌افزار محلی کنترل نسخه است و GitHub فقط یکی از سرویس‌های میزبانی آن (در کنار GitLab و Bitbucket).'},
{q:'ترتیب درست مسیر یک تغییر در Git کدام است؟', o:['Commit ← Staging ← Working Directory','Staging ← Commit ← Working Directory','<span dir="ltr">Working Directory → Staging Area → Commit</span>','Working Directory ← Commit ← Staging Area'], a:2, why:'اول در Working Directory ویرایش می‌کنی، با git add وارد Staging می‌شود و با git commit در تاریخچه ثبت می‌شود.'},
{q:'تفاوت Save با Commit چیست؟', o:['Save سریع‌تر است ولی نتیجهٔ یکسانی دارد','Save حالت قبلی فایل را بازنویسی می‌کند؛ Commit یک نقطهٔ تاریخی جدید اضافه می‌کند بدون حذف قبلی‌ها','Commit فقط برای فایل‌های کدنویسی کار می‌کند','Save تغییرات را به GitHub می‌فرستد'], a:1, why:'Save یعنی بازنویسی آخرین حالت؛ Commit یعنی افزودن یک Snapshot جدید به تاریخچه که همیشه قابل بازگشت است.'},
{q:'پوشهٔ مخفی .git چه چیزی در خود دارد؟', o:['فقط فایل‌های حذف‌شده','تنظیمات ادیتور','کل تاریخچه و تنظیمات Repository','نسخهٔ پشتیبان از GitHub'], a:2, why:'همهٔ تاریخچه و متادیتای Git داخل پوشهٔ .git است؛ حذف آن یعنی حذف کل تاریخچه.'},
{q:'چرا Git با Dropbox/Google Drive فرق اساسی دارد؟', o:['چون Git فقط آفلاین است','چون Git نقاط ذخیرهٔ عمدی و توضیح‌دار، Branch و Diff خط‌به‌خط دارد و برای همکاری روی تغییرات ساخته شده','چون Drive فایل‌های بزرگ را قبول نمی‌کند','چون Git فایل‌ها را فشرده نمی‌کند'], a:1, why:'Cloud Storage فقط آخرین نسخه را همگام می‌کند؛ Git تاریخچهٔ عمدی، شاخه‌سازی و مقایسهٔ دقیق ارائه می‌دهد.'},
{q:'Snapshot در Git یعنی چه؟', o:['فقط لیست فایل‌های تغییرکرده','اسکرین‌شات از صفحهٔ ادیتور','عکس کامل از وضعیت کل پروژه در لحظهٔ Commit','کپی فشردهٔ آخرین فایل باز'], a:2, why:'هر Commit وضعیت کامل پروژه را ذخیره می‌کند، به همین دلیل بازگشت به هر Commit کل پروژه را به آن لحظه برمی‌گرداند.'}
]},
{ id:2, title:'راه‌اندازی اولیه', branch:'setup/install', subtitle:'نصب، معرفی خودت به Git و اتصال امن به GitHub.',
body:`
<h3>نصب و بررسی نسخه</h3>
<p>Git را از <code>git-scm.com</code> دانلود و نصب کن (در مک معمولاً با نصب Xcode Command Line Tools هم می‌آید). بعد از نصب، در Terminal بررسی کن:</p>
<pre><code>git --version
<span class="c"># خروجی چیزی شبیه: git version 2.45.0</span></code></pre>
<h3>معرفی خودت به Git</h3>
<p>هر Commit با نام و ایمیل نویسنده ثبت می‌شود؛ پس اول خودت را معرفی کن. فلگ <code>--global</code> یعنی این تنظیم برای همهٔ پروژه‌های تو اعمال شود:</p>
<pre><code>git config --global user.name "Sara Ahmadi"
git config --global user.email "sara@example.com"
git config --global init.defaultBranch main   <span class="c"># نام شاخهٔ پیش‌فرض</span>
git config --list                             <span class="c"># بررسی تنظیمات</span></code></pre>
<div class="callout note"><span class="co-title">Default Branch</span>در گذشته شاخهٔ اصلی <code>master</code> نام داشت؛ استاندارد امروزی <code>main</code> است. با تنظیم بالا، هر Repo جدیدی که بسازی مستقیم با main شروع می‌شود.</div>
<h3>ابزارهای کارت</h3>
<ul>
<li><strong>Code Editor:</strong> در این دوره از <strong>VS Code</strong> به‌عنوان مثال استفاده می‌کنیم؛ پیشنهاد رایج و نقطهٔ شروع خوبی است چون Git داخلش یکپارچه است و Diff و Conflict را بصری نشان می‌دهد. ولی انتخاب ادیتور به سلیقه و تیم بستگی دارد؛ مفاهیم Git مستقل از ادیتور است و در ادیتورها و کلاینت‌های سازگار دیگر هم به همان شکل کار می‌کند.</li>
<li><strong>Terminal:</strong> در مک اپ Terminal، در ویندوز Git Bash یا Windows Terminal. نترس؛ برای شروع فقط ده‌ها دستور ساده لازم داری، نه صدها.</li>
<li><strong>GitHub Desktop:</strong> اپ گرافیکی رسمی GitHub. برای شروع عالی است چون Commit و Push و Branch را با دکمه انجام می‌دهی و همزمان مفاهیم را می‌بینی. توصیه: از GitHub Desktop شروع کن ولی به‌مرور دستورهای معادل را هم یاد بگیر.</li>
</ul>
<h3>حساب GitHub و اتصال</h3>
<p>در <code>github.com</code> حساب بساز. برای اینکه کامپیوترت اجازهٔ Push داشته باشد، باید هویتش را ثابت کند. دو راه اصلی:</p>
<h4>۱) HTTPS + Personal Access Token</h4>
<p>در روش HTTPS با رمز واقعی حسابت وارد نمی‌شوی؛ به‌جای آن یک <strong>Personal Access Token (PAT)</strong> می‌سازی: یک رمز مخصوص با دسترسی محدود و تاریخ انقضا. از مسیر Settings ← Developer settings ← Personal access tokens ساخته می‌شود و هنگام Push به‌جای پسورد وارد می‌شود. اگر از GitHub Desktop استفاده کنی، ورود به حساب همهٔ این‌ها را خودش مدیریت می‌کند.</p>
<h4>۲) SSH Key</h4>
<p>SSH یک جفت کلید می‌سازد: کلید <strong>خصوصی</strong> که فقط روی کامپیوتر تو می‌ماند و کلید <strong>عمومی</strong> که به GitHub می‌دهی. از آن به بعد بدون واردکردن رمز، امن وصل می‌شوی:</p>
<pre><code><span class="c"># 1) ساخت کلید</span>
ssh-keygen -t ed25519 -C "sara@example.com"
<span class="c"># 2) کپی کلید عمومی (مک):</span>
pbcopy &lt; ~/.ssh/id_ed25519.pub
<span class="c"># 3) در GitHub: Settings → SSH and GPG keys → New SSH key</span>
<span class="c"># 4) تست اتصال:</span>
ssh -T git@github.com
<span class="c"># Hi sara! You've successfully authenticated ✓</span></code></pre>
<div class="callout warn"><span class="co-title">قانون طلایی</span>کلید خصوصی (فایل بدون پسوند <code>.pub</code>) و توکن‌ها را هرگز با کسی به اشتراک نگذار، در اسکرین‌شات نشان نده و هرگز داخل Repo نگذار.</div>
<h3>تنظیمات اولیهٔ هر Repository</h3>
<p>هنگام ساخت Repo در GitHub سه انتخاب اولیه داری: نام و توضیح کوتاه، Public یا Private بودن، و افزودن فایل‌های شروع مثل README و <code>.gitignore</code>. برای پروژه‌های شخصی و تمرینی معمولاً Private را انتخاب می‌کنی؛ ولی حواست باشد Private یعنی «محدودکردن دسترسی» (فقط افراد مجاز می‌بینند)، نه امنیت کامل. حتی در Repo خصوصی هم نباید Secret مثل توکن، رمز یا کلید را Commit کنی؛ امنیت حساب، سطح دسترسی‌ها و مدیریت Secret همچنان مهم‌اند (جزئیات در سطح ۲۰).</p>
`,
quiz:[
{q:'دستور معرفی نام تو به Git برای همهٔ پروژه‌ها کدام است؟', o:['git name "Sara"','git config --global user.name "Sara"','git set username Sara','git user --add Sara'], a:1, why:'تنظیمات هویتی با git config انجام می‌شود و --global آن را برای همهٔ Repoها اعمال می‌کند.'},
{q:'Personal Access Token چیست؟', o:['رمز اصلی حساب GitHub','یک رمز مخصوص با دسترسی محدود و انقضا، برای احراز هویت به‌جای پسورد در HTTPS','کد فعال‌سازی نصب Git','نام دیگری برای SSH Key'], a:1, why:'PAT جایگزین امن پسورد در روش HTTPS است؛ می‌توانی دامنهٔ دسترسی (Scope) و تاریخ انقضایش را محدود کنی.'},
{q:'در روش SSH کدام کلید را به GitHub می‌دهی؟', o:['کلید خصوصی','هر دو کلید','کلید عمومی (فایل .pub)','هیچ‌کدام؛ SSH کلید ندارد'], a:2, why:'کلید عمومی روی GitHub ثبت می‌شود؛ کلید خصوصی هرگز از کامپیوتر تو خارج نمی‌شود.'},
{q:'دستور تست اتصال SSH به GitHub؟', o:['git test ssh','ssh -T git@github.com','git connect github','ssh --check github.com'], a:1, why:'این دستور احراز هویت SSH را امتحان می‌کند و در صورت موفقیت با نام کاربری‌ات جواب می‌دهد.'},
{q:'چرا تنظیم init.defaultBranch main توصیه می‌شود؟', o:['چون بدون آن Git نصب نمی‌شود','چون شاخهٔ پیش‌فرض Repoهای جدید را مطابق استاندارد امروزی main می‌کند','چون سرعت Git را بیشتر می‌کند','چون GitHub فقط main را قبول می‌کند'], a:1, why:'نام استاندارد فعلی شاخهٔ اصلی main است و این تنظیم آن را برای هر git init جدید اعمال می‌کند.'}
]},
{ id:3, title:'ساخت و دریافت Repository', branch:'setup/repo', subtitle:'دو راه ورود به دنیای هر پروژه: از صفر بساز یا موجود را بیاور.',
body:`
<h3>راه اول: ساخت از صفر با git init</h3>
<p>هر پوشه‌ای را می‌توانی با یک دستور به Repository تبدیل کنی:</p>
<pre><code>cd my-prototype
git init
<span class="c"># Initialized empty Git repository in my-prototype/.git/</span></code></pre>
<p>از این لحظه پوشهٔ <code>.git</code> ساخته شده و Git آمادهٔ ردگیری تغییرات است. راه دیگر این است که اول Repo را در سایت GitHub بسازی (دکمهٔ New repository) و بعد آن را Clone کنی؛ برای شروع این مسیر ساده‌تر است چون اتصال Remote خودکار برقرار می‌شود.</p>
<h3>راه دوم: دریافت پروژهٔ موجود با git clone</h3>
<pre><code>git clone git@github.com:team/design-system.git
<span class="c"># یا با HTTPS:</span>
git clone https://github.com/team/design-system.git</code></pre>
<p>Clone یک کپی کامل می‌سازد: همهٔ فایل‌ها + کل تاریخچه + اتصال آماده به Remote.</p>
<h3>تفاوت Init و Clone</h3>
<table><tr><th>git init</th><th>git clone</th></tr>
<tr><td>پروژهٔ جدید از صفر</td><td>دریافت پروژهٔ موجود</td></tr>
<tr><td>تاریخچهٔ خالی</td><td>کل تاریخچه همراهش می‌آید</td></tr>
<tr><td>Remote ندارد؛ باید خودت اضافه کنی</td><td>Remote به‌صورت خودکار با نام origin تنظیم شده</td></tr></table>
<h3>Remote و مفهوم origin</h3>
<p><strong>Remote</strong> یعنی آدرس یک نسخهٔ راه‌دور از Repo (مثلاً روی GitHub). هر Remote یک نام مستعار دارد و نام قراردادی اولین Remote همیشه <strong>origin</strong> است. پس هر جا origin دیدی، بخوان: «همان Repo روی GitHub».</p>
<pre><code>git remote -v                 <span class="c"># لیست Remoteها با آدرس</span>
git remote add origin git@github.com:sara/portfolio.git   <span class="c"># افزودن</span>
git remote set-url origin NEW_URL                          <span class="c"># تغییر آدرس</span>
git remote rename origin upstream                          <span class="c"># تغییر نام</span>
git remote remove origin                                   <span class="c"># حذف</span></code></pre>
<div class="example"><div class="ex-title">سناریوی واقعی</div>
<p>پروتوتایپی را محلی با <code>git init</code> شروع کرده‌ای و حالا می‌خواهی روی GitHub بگذاری: در GitHub یک Repo خالی بساز، آدرسش را کپی کن، با <code>git remote add origin ADDRESS</code> وصلش کن و بعد Push کن. همین.</p></div>
<h3>بررسی اطلاعات Repository</h3>
<pre><code>git status        <span class="c"># وضعیت فعلی: شاخه، تغییرات، همگامی با Remote</span>
git log --oneline <span class="c"># تاریخچهٔ خلاصه</span>
git remote -v     <span class="c"># به کجا وصلی؟</span>
git branch        <span class="c"># روی کدام شاخه‌ای؟</span></code></pre>
`,
quiz:[
{q:'origin در Git یعنی چه؟', o:['اولین Commit پروژه','نام قراردادی Remote اصلی (معمولاً همان Repo روی GitHub)','شاخهٔ اصلی پروژه','پوشهٔ ریشهٔ پروژه'], a:1, why:'origin فقط یک نام مستعار قراردادی برای آدرس Remote اصلی است؛ می‌شد اسم دیگری هم داشته باشد.'},
{q:'کدام گزینه دربارهٔ git clone درست است؟', o:['فقط آخرین نسخهٔ فایل‌ها را می‌آورد','فایل‌ها + کل تاریخچه را می‌آورد و origin را خودکار تنظیم می‌کند','فقط شاخهٔ main را بدون تاریخچه می‌آورد','نیاز به ساخت دستی پوشهٔ .git دارد'], a:1, why:'Clone یک کپی کامل و آماده‌به‌کار است: تاریخچهٔ کامل به‌علاوهٔ اتصال Remote.'},
{q:'برای دیدن لیست Remoteها با آدرس‌شان چه دستوری می‌زنی؟', o:['git origin list','git remote -v','git show remotes','git list --remote'], a:1, why:'فلگ -v (verbose) آدرس Fetch و Push هر Remote را هم نمایش می‌دهد.'},
{q:'پروژه‌ای را محلی با git init ساخته‌ای. برای اتصالش به یک Repo خالی در GitHub چه می‌کنی؟', o:['دوباره clone می‌کنی','git remote add origin ADDRESS و سپس Push','پوشهٔ .git را در GitHub آپلود می‌کنی','git init --github'], a:1, why:'init به‌تنهایی Remote ندارد؛ باید آدرس GitHub را به‌عنوان origin اضافه کنی و بعد Push کنی.'},
{q:'فرق اصلی init و clone چیست؟', o:['init سریع‌تر است','init پروژهٔ جدید با تاریخچهٔ خالی می‌سازد؛ clone پروژهٔ موجود را با کل تاریخچه می‌آورد','clone فقط برای Repoهای Public کار می‌کند','هیچ فرقی ندارند'], a:1, why:'init شروع از صفر است، clone دریافت کامل یک Repo موجود.'}
]},
{ id:4, title:'مدیریت تغییرات', branch:'feature/daily-flow', subtitle:'چرخهٔ روزانه: ببین، انتخاب کن، ثبت کن.',
body:`
<h3>وضعیت فایل‌ها: چهار حالت</h3>
<ul>
<li><strong>Untracked:</strong> فایل جدیدی که Git هنوز آن را نمی‌شناسد.</li>
<li><strong>Tracked:</strong> فایلی که Git آن را زیر نظر دارد (حداقل یک‌بار Commit یا add شده).</li>
<li><strong>Modified:</strong> فایل Tracked که بعد از آخرین Commit تغییر کرده ولی هنوز Stage نشده.</li>
<li><strong>Staged:</strong> تغییری که با add انتخاب شده و آمادهٔ Commit است.</li>
</ul>
<h3>git status — قطب‌نمای همیشگی</h3>
<pre><code>git status
<span class="c"># On branch main</span>
<span class="c"># Changes to be committed:        ← سبز: Staged</span>
<span class="g">#   modified: tokens.json</span>
<span class="c"># Changes not staged for commit:  ← قرمز: Modified</span>
<span class="r">#   modified: styles.css</span>
<span class="c"># Untracked files:                ← قرمز: جدید</span>
<span class="r">#   hero-v2.png</span></code></pre>
<p>عادت طلایی: قبل و بعد از هر کاری <code>git status</code> بزن. هیچ‌وقت پشیمان نمی‌شوی.</p>
<h3>git diff — دقیقاً چه چیزی عوض شده؟</h3>
<pre><code>git diff              <span class="c"># تغییرات Stage‌نشده</span>
git diff --staged     <span class="c"># تغییرات Stage‌شده (قبل از Commit ببین چه ثبت می‌کنی)</span>
git diff main design  <span class="c"># مقایسهٔ دو شاخه</span>
git diff abc123 def456 <span class="c"># مقایسهٔ دو Commit</span></code></pre>
<h3>git add — انتخاب برای ثبت</h3>
<pre><code>git add styles.css            <span class="c"># یک فایل</span>
git add styles.css tokens.json <span class="c"># چند فایل</span>
git add .                     <span class="c"># همهٔ تغییرات (با احتیاط!)</span>
git add -p                    <span class="c"># بخش‌به‌بخش: از هر تکه می‌پرسد بله/خیر</span>
git restore --staged styles.css <span class="c"># خارج‌کردن از Stage (خود تغییر می‌ماند)</span></code></pre>
<div class="callout tip"><span class="co-title">چرا add -p ارزشمند است؟</span>وقتی در یک فایل هم رنگ دکمه را عوض کرده‌ای و هم یک باگ فاصله‌گذاری را، با <code>git add -p</code> می‌توانی این دو را در دو Commit جدا ثبت کنی. Stage کردن بخشی از فایل، کلید Commitهای تمیز است.</div>
<h3>git commit — ثبت در تاریخچه</h3>
<pre><code>git commit -m "fix: align search icon in mobile header"
<span class="c"># یا بدون -m تا ادیتور برای پیام کامل‌تر باز شود</span></code></pre>
<h3>خواندن تاریخچه</h3>
<pre><code>git log                   <span class="c"># کامل: نویسنده، تاریخ، پیام</span>
git log --oneline         <span class="c"># هر Commit در یک خط</span>
git log --oneline --graph <span class="c"># با نمودار شاخه‌ها</span>
git show abc123           <span class="c"># جزئیات و تغییرات یک Commit خاص</span>
git log --stat            <span class="c"># کدام فایل‌ها در هر Commit تغییر کرده‌اند</span></code></pre>
<h3>حذف و جابه‌جایی فایل با Git</h3>
<pre><code>git rm old-logo.svg           <span class="c"># حذف فایل + ثبت حذف در Stage</span>
git mv btn.css button.css     <span class="c"># تغییر نام/جابه‌جایی + ثبت در Stage</span></code></pre>
<p>اگر فایل را دستی حذف یا rename کنی هم مشکلی نیست؛ فقط بعدش باید تغییر را add کنی. دستورهای بالا این دو مرحله را یکجا انجام می‌دهند.</p>
<div class="example"><div class="ex-title">یک روز کاری واقعی</div>
<pre><code>git status                      <span class="c"># دو فایل تغییر کرده</span>
git diff                        <span class="c"># مرور تغییرات</span>
git add components/Card.css
git commit -m "style: increase card padding to 24px"
git add tokens.json
git commit -m "feat: add semantic color token for danger state"</code></pre></div>
`,
quiz:[
{q:'فایلی که Git می‌شناسد و بعد از آخرین Commit تغییر کرده ولی add نشده، در چه وضعیتی است؟', o:['Untracked','Staged','Modified','Committed'], a:2, why:'Tracked + تغییر بدون add یعنی Modified. Untracked مخصوص فایل‌های کاملاً جدید است.'},
{q:'برای دیدن تغییراتی که Stage شده‌اند (قبل از Commit) چه دستوری می‌زنی؟', o:['git diff','git diff --staged','git status -v --all','git show --next'], a:1, why:'git diff بدون فلگ فقط تغییرات Stage‌نشده را نشان می‌دهد؛ برای Staged باید --staged بزنی.'},
{q:'git add -p چه امکانی می‌دهد؟', o:['add کردن با اولویت بالا','Stage کردن بخش‌به‌بخش تغییرات یک فایل','add کردن فایل‌های خصوصی','push خودکار بعد از add'], a:1, why:'با -p (patch) Git هر تکهٔ تغییر را جدا نشانت می‌دهد و می‌پرسی Stage شود یا نه؛ ابزار اصلی Commitهای متمرکز.'},
{q:'فایلی را اشتباهی Stage کرده‌ای. برای خارج‌کردنش از Stage بدون ازدست‌دادن تغییر چه می‌کنی؟', o:['git rm file','git restore --staged file','git delete --stage file','git reset --hard'], a:1, why:'restore --staged فقط فایل را از سبد Commit بیرون می‌آورد؛ خود ویرایش‌ها در Working Directory سالم می‌مانند.'},
{q:'برای دیدن تاریخچه به‌صورت خلاصه و یک‌خطی؟', o:['git history --short','git log --oneline','git commits','git show --all'], a:1, why:'git log --oneline هر Commit را در یک خط (هش کوتاه + پیام) نشان می‌دهد.'},
{q:'فرق git rm با حذف دستی فایل در Finder/Explorer چیست؟', o:['git rm فایل را از GitHub هم فوراً حذف می‌کند','git rm حذف را همزمان در Stage هم ثبت می‌کند؛ حذف دستی نیاز به add جداگانه دارد','حذف دستی غیرممکن است','هیچ فرقی ندارد'], a:1, why:'نتیجهٔ نهایی یکی است، ولی git rm دو مرحله (حذف + Stage) را یکجا انجام می‌دهد.'}
]},
{ id:5, title:'نوشتن Commit حرفه‌ای', branch:'feature/clean-commits', subtitle:'Commit خوب، سند تصمیم‌های توست؛ نه یک ذخیرهٔ الکی.',
body:`
<h3>Commit کوچک و متمرکز (Atomic Commit)</h3>
<p>هر Commit باید <strong>یک تغییر منطقی</strong> باشد: نه آن‌قدر بزرگ که ده موضوع را قاطی کند، نه آن‌قدر ریز که بی‌معنا شود. قانون تست: اگر نتوانی Commit را در یک جمله بدون «و» توضیح بدهی، احتمالاً باید دو Commit باشد.</p>
<div class="example"><div class="ex-title">بد در برابر خوب</div>
<p><span class="diff-del">− "update stuff" (تغییر ۱۲ فایل: رنگ دکمه + فونت + باگ منو + فایل تست)</span>
<span class="diff-add">+ "fix: prevent menu overlap on tablet breakpoint"</span>
<span class="diff-add">+ "style: switch body font to Vazirmatn"</span></p></div>
<h3>Commit Message معنادار</h3>
<ul>
<li>خط اول کوتاه (زیر ~۵۰-۷۲ کاراکتر) و توصیفی؛ به‌صورت امری: «add» نه «added».</li>
<li>به «چه» و مهم‌تر از آن «چرا» جواب بده، نه «چطور» (چطور را خود Diff نشان می‌دهد).</li>
<li>اگر توضیح بیشتر لازم است، بعد از یک خط خالی، بدنهٔ پیام را بنویس.</li>
</ul>
<h3>Conventional Commits</h3>
<p>یک قرارداد ساده برای شروع پیام‌ها: <code>type: description</code></p>
<table><tr><th>نوع</th><th>یعنی</th><th>مثال</th></tr>
<tr><td><code>feat</code></td><td>قابلیت جدید</td><td>feat: add empty state to search results</td></tr>
<tr><td><code>fix</code></td><td>رفع باگ</td><td>fix: correct focus ring color on inputs</td></tr>
<tr><td><code>style</code></td><td>تغییر ظاهری/فرمت بدون تغییر رفتار</td><td>style: unify card border radius to 12px</td></tr>
<tr><td><code>refactor</code></td><td>بازنویسی بدون تغییر رفتار</td><td>refactor: extract Button variants to tokens</td></tr>
<tr><td><code>docs</code></td><td>مستندات</td><td>docs: add usage notes for Modal</td></tr>
<tr><td><code>test</code></td><td>تست</td><td>test: add visual test for dark mode</td></tr>
<tr><td><code>chore</code></td><td>کارهای جانبی (تنظیمات، ابزار، آپدیت وابستگی)</td><td>chore: update storybook to v9</td></tr></table>
<h3>زمان مناسب Commit</h3>
<p>هر وقت به یک «نقطهٔ کامل کوچک» رسیدی: یک State تمام شد، یک باگ رفع شد، یک توکن اضافه شد. قبل از هر کار ریسکی (مثلاً اجرای یک Prompt بزرگ روی AI) هم حتماً Commit کن تا نقطهٔ بازگشت داشته باشی.</p>
<h3>اصلاح آخرین Commit</h3>
<p>فایلی را جا انداختی یا پیام غلط بود؟ تا وقتی Push نکرده‌ای:</p>
<pre><code><span class="c"># فقط اصلاح پیام:</span>
git commit --amend -m "fix: correct focus ring color on inputs"
<span class="c"># اضافه‌کردن فایل فراموش‌شده به همان Commit:</span>
git add forgotten-file.css
git commit --amend --no-edit   <span class="c"># --no-edit یعنی پیام قبلی بماند</span></code></pre>
<div class="callout warn"><span class="co-title">احتیاط</span><code>--amend</code> آخرین Commit را بازنویسی می‌کند (هش عوض می‌شود). فقط روی Commitهایی استفاده کن که هنوز Push نشده‌اند.</div>
<h3>بررسی قبل از Push</h3>
<pre><code>git log --oneline origin/main..HEAD  <span class="c"># چه Commitهایی قرار است بروند؟</span>
git diff origin/main                 <span class="c"># مجموع تغییرات نسبت به Remote</span></code></pre>
`,
quiz:[
{q:'Atomic Commit یعنی چه؟', o:['Commit فقط شامل یک فایل','Commit شامل دقیقاً یک تغییر منطقی و کامل','Commit با پیام کوتاه','Commitی که Push نشده'], a:1, why:'معیار «یک موضوع منطقی» است نه تعداد فایل؛ ممکن است یک تغییر منطقی چند فایل را شامل شود.'},
{q:'برای «رفع باگ همپوشانی منو» کدام پیام با Conventional Commits درست است؟', o:['chore: menu','fixed the menu bug finally!!','fix: prevent menu overlap on tablet breakpoint','feat: menu overlap'], a:2, why:'نوع درست fix است + توضیح امری و مشخص. feat برای قابلیت جدید است نه رفع باگ.'},
{q:'فایلی را در آخرین Commit (هنوز Push‌نشده) جا انداخته‌ای. بهترین کار؟', o:['یک Commit جدید با پیام "forgot file"','git add file سپس git commit --amend --no-edit','git push --force','حذف Repo و شروع دوباره'], a:1, why:'amend فایل را به همان Commit اضافه می‌کند و --no-edit پیام قبلی را نگه می‌دارد؛ تاریخچه تمیز می‌ماند.'},
{q:'چرا نباید --amend را روی Commit پوش‌شده استفاده کنی؟', o:['چون کار نمی‌کند','چون تاریخچهٔ منتشرشده را بازنویسی می‌کند و با نسخهٔ همکارانت تضاد ایجاد می‌شود','چون فایل‌ها حذف می‌شوند','چون GitHub اجازه نمی‌دهد'], a:1, why:'amend هش Commit را تغییر می‌دهد؛ اگر دیگران Commit قبلی را دارند، تاریخچه‌ها ناسازگار می‌شود.'},
{q:'پیام Commit خوب بیشتر باید به چه چیزی جواب بدهد؟', o:['چطور کد نوشته شده','چه چیزی و چرا تغییر کرده','چه ساعتی کار انجام شده','چند خط کد تغییر کرده'], a:1, why:'«چطور» را Diff نشان می‌دهد؛ ارزش پیام در ثبت «چه و چرا» است.'},
{q:'نوع chore برای چیست؟', o:['رفع باگ‌های بحرانی','کارهای جانبی مثل تنظیمات ابزار و آپدیت وابستگی‌ها','تغییرات ظاهری','قابلیت جدید'], a:1, why:'chore یعنی کارهای نگهداری که مستقیم روی قابلیت یا رفتار محصول اثر ندارند.'}
]},
{ id:6, title:'فایل‌های قابل ردگیری و \u2066.gitignore\u2069', branch:'chore/gitignore', subtitle:'همه‌چیز نباید وارد تاریخچه شود؛ بعضی چیزها هرگز.',
body:`
<h3>gitignore. چیست؟</h3>
<p>فایلی متنی به نام <code>.gitignore</code> در ریشهٔ پروژه که به Git می‌گوید کدام فایل‌ها و پوشه‌ها را <strong>اصلاً نبیند</strong>. این فایل‌ها در status ظاهر نمی‌شوند و هرگز Commit نمی‌شوند.</p>
<pre><code><span class="c"># .gitignore نمونه برای پروژهٔ طراحی/فرانت‌اند</span>

<span class="c"># وابستگی‌ها — قابل بازسازی با npm install</span>
node_modules/

<span class="c"># خروجی Build و Cache — قابل بازتولید</span>
dist/
build/
.cache/

<span class="c"># اطلاعات حساس — هرگز نباید در تاریخچه باشند</span>
.env
.env.local

<span class="c"># فایل‌های سیستم‌عامل</span>
.DS_Store
Thumbs.db

<span class="c"># فایل‌های ادیتور</span>
.vscode/
.idea/

<span class="c"># الگوها</span>
*.log          <span class="c"># هر فایلی با پسوند log</span>
temp-*         <span class="c"># هر چیزی که با temp- شروع شود</span></code></pre>
<h3>چه چیزهایی را ignore کنیم؟</h3>
<ul>
<li><strong>Dependencies (node_modules):</strong> هزاران فایل که با یک دستور از روی <code>package.json</code> قابل بازسازی‌اند. Commit کردنشان Repo را سنگین و بی‌دلیل شلوغ می‌کند.</li>
<li><strong>Build و Cache:</strong> خروجی تولیدشده از سورس؛ سورس را نگه می‌داریم نه خروجی را.</li>
<li><strong>فایل‌های سیستم‌عامل و ادیتور:</strong> <code>.DS_Store</code> مک معروف‌ترین مزاحم تاریخچه‌هاست.</li>
<li><strong>اطلاعات حساس:</strong> مهم‌ترین مورد. ادامه را بخوان.</li>
</ul>
<h3>فایل .env و Secretها</h3>
<p>فایل <code>.env</code> جایی است که API Key، رمزها و تنظیمات محیطی نگهداری می‌شوند. این فایل <strong>باید همیشه در gitignore باشد</strong>، چون هر چیزی که یک‌بار Commit شود، در تاریخچه می‌ماند — حتی اگر بعداً حذفش کنی. یک API Key لورفته یعنی هر کسی می‌تواند با هزینهٔ تو از سرویس استفاده کند.</p>
<h3>فایلی که قبلاً Commit شده را چطور از ردگیری خارج کنیم؟</h3>
<p>gitignore فقط جلوی فایل‌های <strong>جدید</strong> را می‌گیرد؛ فایلی که قبلاً Tracked شده همچنان ردگیری می‌شود. راه‌حل:</p>
<pre><code>git rm --cached .env    <span class="c"># از ردگیری خارج شود ولی فایل روی دیسک بماند</span>
<span class="c"># حالا .env را به .gitignore اضافه کن و Commit بزن</span></code></pre>
<div class="callout warn"><span class="co-title">نکتهٔ حیاتی</span>این کار فایل را از Commitهای آینده حذف می‌کند، ولی نسخه‌های قبلی همچنان در تاریخچه هستند. اگر Secret واقعی لو رفته، باید فوراً آن Key را باطل (Revoke) کنی و نسخهٔ جدید بسازی؛ پاک‌کردن از تاریخچه به‌تنهایی کافی نیست.</div>
<h3>Gitignore Template</h3>
<p>لازم نیست از صفر بنویسی؛ GitHub هنگام ساخت Repo قالب آماده برای هر نوع پروژه (Node، macOS و...) پیشنهاد می‌دهد و مجموعهٔ کامل قالب‌ها در Repo رسمی <code>github/gitignore</code> موجود است.</p>
`,
quiz:[
{q:'چرا node_modules را ignore می‌کنیم؟', o:['چون فایل‌هایش خراب‌اند','چون با npm install از روی package.json کاملاً قابل بازسازی است و Commit کردنش Repo را سنگین می‌کند','چون Git پوشه‌های بزرگ را قبول نمی‌کند','چون حاوی اطلاعات حساس است'], a:1, why:'قاعدهٔ کلی: چیزی که قابل بازتولید است، جایی در تاریخچه ندارد.'},
{q:'فایل .env معمولاً چه چیزی دارد و تکلیفش چیست؟', o:['تنظیمات فونت؛ باید Commit شود','رمزها و API Keyها؛ باید همیشه در gitignore باشد','لیست Branchها؛ خودکار ساخته می‌شود','تاریخچهٔ Commitها'], a:1, why:'.env محل Secretهاست و نباید هرگز وارد تاریخچه شود.'},
{q:'فایلی قبلاً Commit شده و حالا به gitignore اضافه‌اش کرده‌ای، ولی Git هنوز تغییراتش را نشان می‌دهد. چرا؟', o:['gitignore خراب است','gitignore فقط روی فایل‌های Untracked اثر دارد؛ باید با git rm --cached از ردگیری خارجش کنی','باید کامپیوتر را ری‌استارت کنی','باید فایل را rename کنی'], a:1, why:'ignore جلوی شروع ردگیری را می‌گیرد؛ برای فایل Tracked باید ردگیری را دستی قطع کنی.'},
{q:'API Key واقعی اشتباهاً Commit و Push شده. کامل‌ترین واکنش؟', o:['فایل را حذف و دوباره Push می‌کنی؛ تمام','فوراً Key را Revoke می‌کنی و Key جدید می‌سازی، سپس فایل را از ردگیری/تاریخچه پاک می‌کنی','Repo را Private می‌کنی','هیچ کاری لازم نیست'], a:1, why:'چون Key در تاریخچه ثبت شده و ممکن است دیده شده باشد، باطل‌کردن آن قدم اول و ضروری است.'},
{q:'الگوی *.log در gitignore یعنی؟', o:['فقط فایل log.txt','هر فایلی که پسوندش log باشد','پوشه‌ای به نام log','فایل‌های مخفی'], a:1, why:'ستاره یعنی «هر نامی»؛ پس همهٔ فایل‌های با پسوند .log نادیده گرفته می‌شوند.'}
]},
{ id:7, title:'Branch', branch:'feature/branching', subtitle:'دنیای موازی برای هر ایده، بدون دست‌زدن به نسخهٔ اصلی.',
body:`
<h3>Branch چیست و چرا؟</h3>
<p><strong>Branch</strong> (شاخه) یک خط زمانی مستقل از پروژه است. روی شاخهٔ جدید هر تغییری بدهی، شاخهٔ اصلی (<strong>main</strong>) دست‌نخورده و سالم می‌ماند. وقتی نتیجه راضی‌کننده بود، شاخه را به main ادغام (Merge) می‌کنی؛ اگر نبود، شاخه را دور می‌اندازی و انگار هیچ اتفاقی نیفتاده.</p>
<pre><code>          o───o───o   feature/search-empty-state
         /
o───o───o───o───o     main (همیشه سالم)</code></pre>
<h3>فرق Branch با کپی‌کردن پوشه</h3>
<p>کپی پوشه یعنی دو نسخهٔ جدا که هیچ رابطه‌ای ندارند: تاریخچهٔ مشترک ندارند، مقایسهٔ دقیق ندارند و ادغامشان دستی و دردناک است. Branch سبک است (فایل‌ها کپی نمی‌شوند)، تاریخچهٔ مشترک دارد، با یک دستور Diff می‌گیری و با یک دستور Merge می‌کنی.</p>
<h3>دستورهای اصلی</h3>
<pre><code>git branch                       <span class="c"># لیست شاخه‌های محلی (* یعنی شاخهٔ فعلی)</span>
git branch -a                    <span class="c"># محلی + Remote</span>
git switch -c feature/hero-redesign  <span class="c"># ساخت شاخه + رفتن روی آن</span>
git switch main                  <span class="c"># جابه‌جایی به شاخهٔ دیگر</span>
git branch -m old-name new-name  <span class="c"># تغییر نام</span>
git branch -d feature/done       <span class="c"># حذف شاخهٔ Merge‌شده</span>
git branch -D feature/failed     <span class="c"># حذف اجباری شاخهٔ Merge‌نشده</span></code></pre>
<div class="callout note"><span class="co-title">switch یا checkout؟</span><code>git checkout</code> دستور قدیمی و چندکاره بود (هم جابه‌جایی شاخه، هم بازگردانی فایل). برای شفافیت، دو دستور جدید ساختند: <code>git switch</code> برای شاخه‌ها و <code>git restore</code> برای فایل‌ها. در آموزش‌های قدیمی checkout زیاد می‌بینی؛ معادل مدرنش را استفاده کن.</div>
<h3>شاخهٔ محلی، Remote و Tracking</h3>
<ul>
<li><strong>Local Branch:</strong> شاخه‌ای روی کامپیوتر تو، مثل <code>main</code> یا <code>feature/hero-redesign</code>.</li>
<li><strong>Remote Branch:</strong> شاخه‌ای که واقعاً روی سرور (مثلاً GitHub) ذخیره شده است.</li>
<li><strong>Remote-tracking Branch:</strong> تصویر محلی از آخرین وضعیتی که از Remote دیده‌ای، مثل <code>origin/main</code>. این خودِ شاخه روی GitHub نیست؛ فقط یادداشت به‌روزشوندهٔ محلی است.</li>
<li><strong>Publish کردن:</strong> اولین Push شاخهٔ جدید، آن را روی Remote منتشر می‌کند.</li>
<li><strong>Tracking / Upstream Branch:</strong> وقتی شاخهٔ محلی به همتای Remote وصل شود، Git می‌داند pull/push پیش‌فرض به کجاست و می‌تواند بگوید چند Commit جلو یا عقب هستی.</li>
</ul>
<pre><code>git push -u origin feature/hero-redesign
<span class="c"># -u یعنی upstream ست شود؛ از این به بعد فقط git push کافی است</span></code></pre>
<h3>Branch در کار طراحی</h3>
<ul>
<li><strong>Feature Branch:</strong> هر قابلیت در شاخهٔ خودش ساخته و Review می‌شود.</li>
<li><strong>Prototype Variant:</strong> هر واریانت پروتوتایپ یک شاخه؛ مقایسه و ارائهٔ موازی راحت می‌شود.</li>
<li><strong>Experiment:</strong> ایده‌های پرریسک (مثلاً خروجی یک Agent هوش مصنوعی) را در شاخهٔ جدا امتحان کن.</li>
</ul>
<h3>Branch Naming Convention</h3>
<pre><code>feature/search-empty-state
prototype/editorial-layout
fix/mobile-navigation
experiment/ai-onboarding</code></pre>
<p>الگو: <code>type/short-description</code> با حروف کوچک و خط تیره. نام خوب، بدون بازکردن شاخه می‌گوید داخلش چه خبر است.</p>
`,
quiz:[
{q:'مهم‌ترین مزیت Branch نسبت به کپی‌کردن پوشهٔ پروژه؟', o:['حجم کمتر فایل zip','تاریخچهٔ مشترک، Diff دقیق و Merge با یک دستور','رنگ‌بندی بهتر در ادیتور','سرعت بیشتر اینترنت'], a:1, why:'شاخه‌ها به یک تاریخچهٔ واحد وصل‌اند؛ به همین دلیل مقایسه و ادغامشان سیستماتیک است.'},
{q:'دستور مدرن ساخت شاخهٔ جدید و رفتن روی آن؟', o:['git branch --go new','git switch -c feature/x','git checkout --branch','git new feature/x'], a:1, why:'switch -c هم شاخه را می‌سازد هم روی آن سوییچ می‌کند (معادل قدیمی: checkout -b).'},
{q:'فلگ -u در اولین Push شاخه چه می‌کند؟', o:['Push را سریع‌تر می‌کند','ارتباط Upstream بین شاخهٔ محلی و Remote را تنظیم می‌کند تا pushهای بعدی بدون آدرس کار کنند','شاخه را Private می‌کند','شاخه را بعد از Push حذف می‌کند'], a:1, why:'-u (--set-upstream) شاخهٔ Remote را به‌عنوان مرجع pull/push شاخهٔ محلی ثبت می‌کند.'},
{q:'origin/main دقیقاً چیست؟', o:['شاخهٔ اصلی روی کامپیوتر تو','شاخهٔ remote-tracking: آخرین تصویری که کامپیوترت از main روی Remote دارد','خودِ شاخهٔ main روی سرور GitHub','نام دیگر HEAD'], a:1, why:'origin/main یک مرجع remote-tracking است؛ شاخهٔ واقعی روی Remote جداست و با fetch به‌روز می‌شود.'},
{q:'فرق git branch -d با -D؟', o:['هیچ؛ یکی حروف بزرگ است','-d فقط شاخهٔ Merge‌شده را حذف می‌کند؛ -D حذف اجباری است حتی اگر Merge نشده باشد','-D شاخهٔ Remote را حذف می‌کند','-d شاخه را مخفی می‌کند'], a:1, why:'-d محافظ دارد تا کار Merge‌نشده را از دست ندهی؛ -D این محافظ را برمی‌دارد.'},
{q:'کدام نام شاخه با کانونشن رایج سازگارتر است؟', o:['MyNewDesign2','fix/mobile-navigation','final_version_REAL','sara-branch-1'], a:1, why:'الگوی type/short-description با حروف کوچک، هدف شاخه را شفاف بیان می‌کند.'}
]},
{ id:8, title:'اتصال Local و Remote', branch:'feature/sync', subtitle:'Push، Pull و Fetch: زبان گفت‌وگوی کامپیوتر تو با GitHub.',
body:`
<h3>سه دستور همگام‌سازی</h3>
<p>برای فهم جهت داده، سه جا را جدا نگه دار: <strong>شاخهٔ محلی</strong> (مثل <code>main</code>)، <strong>remote-tracking</strong> (مثل <code>origin/main</code>)، و <strong>شاخه روی Remote</strong> (مثلاً روی GitHub).</p>
<table><tr><th>دستور</th><th>مسیر داده <span dir="ltr">(منبع → مقصد)</span></th><th>چه می‌کند</th></tr>
<tr><td><code>git push</code></td><td><span dir="ltr">Local branch → Remote repo</span></td><td>Commitها و مرجع شاخهٔ محلی را طبق refspec به Remote می‌فرستد؛ کار Remote را به شاخهٔ محلی نمی‌آورد</td></tr>
<tr><td><code>git fetch</code></td><td><span dir="ltr">Remote repo → remote-tracking</span></td><td>اشیاء و به‌روزرسانی <code>origin/...</code> را می‌آورد؛ شاخهٔ کاری فعلی و فایل‌های بازت را خودکار ادغام نمی‌کند</td></tr>
<tr><td><code>git pull</code></td><td><span dir="ltr">Remote → tracking → current branch</span></td><td>اول fetch، بعد <strong>یکپارچه‌سازی</strong> تاریخچهٔ دریافت‌شده در شاخهٔ فعلی</td></tr></table>
<div class="callout note"><span class="co-title">جهت در RTL</span>فلش‌های جدول با <span dir="ltr">منبع → مقصد</span> نوشته شده‌اند تا جهت فنی با چیدمان راست‌به‌چپ صفحه جابه‌جا نشود. همیشه برچسب منبع و مقصد را بخوان، نه فقط جهت فلش.</div>
<pre dir="ltr"><code>push:   [local main] ----------------------> [GitHub main]
fetch:  [GitHub main] ---> [origin/main]      (working branch untouched)
pull:   [GitHub main] ---> [origin/main] ---> integrate into [local main]</code></pre>
<h3>تفاوت Pull و Fetch — با مثال</h3>
<p><strong>Fetch</strong> مثل چک‌کردن صندوق پست است: نامه‌ها را می‌بینی ولی هنوز بازشان نکرده‌ای؛ فقط مراجع remote-tracking مثل <code>origin/main</code> به‌روز می‌شوند و می‌توانی قبل از پذیرش، تغییرات را بررسی کنی. <strong>Pull</strong> یعنی نامه را بگیر و همین حالا در شاخهٔ فعلی‌ات یکپارچه کن. روش یکپارچه‌سازی ممکن است <strong>merge</strong> یا <strong>rebase</strong> باشد — بسته به فلگ دستور یا تنظیماتی مثل <code>pull.rebase</code>. جزئیات Rebase در سطح ۲۷ می‌آید؛ اینجا کافی است بدانی Pull همیشه فقط Merge نیست.</p>
<pre><code>git fetch origin
git log --oneline main..origin/main   <span class="c"># چه Commitهایی روی Remote هست که من ندارم؟</span>
git diff main origin/main             <span class="c"># تغییراتشان چیست؟</span>
git pull                              <span class="c"># fetch + یکپارچه‌سازی در شاخهٔ فعلی</span>
<span class="c"># معادل صریح‌تر (بسته به نیاز تیم):</span>
<span class="c"># git pull --no-rebase   → بعد از fetch، merge</span>
<span class="c"># git pull --rebase      → بعد از fetch، rebase</span></code></pre>
<p>مثال طراحی: همکارت توکن رنگ دکمه را روی <code>main</code> در GitHub عوض کرده. با <code>fetch</code> فقط می‌فهمی چه شده؛ با <code>pull</code> آن تغییر وارد شاخهٔ محلی‌ات می‌شود تا روی همان پایه کار کنی.</p>
<h3>اولین Push یک شاخه</h3>
<pre><code>git push -u origin feature/hero-redesign
<span class="c"># شاخه روی GitHub منتشر (Publish) شد + upstream تنظیم شد</span>
git push                              <span class="c"># دفعات بعد همین کافی است</span></code></pre>
<div class="callout tip"><span class="co-title">اگر Push رد شد</span>وقتی Remote جلوتر باشد، Git ممکن است Push را reject کند (مثلاً پیام <code>fetch first</code>). این یعنی تاریخچهٔ Remote را هنوز یکپارچه نکرده‌ای؛ force push در کار تیمی خطرناک است.</div>
<h3>Ahead و Behind</h3>
<p><code>git status</code> بعد از Fetch نسبت به upstream (معمولاً همان remote-tracking) می‌گوید کجایی:</p>
<ul>
<li><strong>Ahead 2:</strong> دو Commit داری که هنوز Push نشده.</li>
<li><strong>Behind 3:</strong> سه Commit روی Remote هست که هنوز وارد شاخهٔ محلی‌ات نکرده‌ای.</li>
<li><strong>هر دو (Diverged):</strong> هم تو Commit محلی داری هم Remote جلو رفته؛ باید اول تاریخچهٔ Remote را یکپارچه کنی (با pull، یا fetch سپس merge/rebase) و بعد Push.</li>
</ul>
<div class="example"><div class="ex-title">سناریوی رایج: Push رد شد!</div>
<pre><code>git push
<span class="r"># ! [rejected]  main -> main (fetch first)</span>
<span class="c"># یعنی: Remote جلوتر از توست. راه‌حل رایج:</span>
git pull      <span class="c"># fetch + یکپارچه‌سازی (merge یا rebase طبق تنظیم)</span>
git push      <span class="c"># حالا معمولاً قبول می‌شود</span></code></pre></div>
<h3>حذف شاخهٔ Remote</h3>
<pre><code>git push origin --delete feature/old-experiment
<span class="c"># شاخهٔ محلی سر جایش می‌ماند؛ جدا حذفش کن: git branch -d</span></code></pre>
<div class="callout tip"><span class="co-title">عادت حرفه‌ای</span>قبل از شروع کار روزانه همگام شو (fetch یا pull)، و Commitهایت را زود‌به‌زود Push کن. هرچه فاصلهٔ همگام‌سازی کمتر باشد، Conflictها کوچک‌تر و کم‌دردتر می‌شوند.</div>
`,
quiz:[
{q:'تفاوت اصلی fetch و pull؟', o:['fetch سریع‌تر است ولی همان کار را می‌کند','fetch فقط remote-tracking را به‌روز می‌کند بدون تغییر شاخهٔ کاری؛ pull همان fetch به‌علاوهٔ یکپارچه‌سازی در شاخهٔ فعلی است','pull فقط برای main کار می‌کند','fetch تغییرات را Push هم می‌کند'], a:1, why:'pull = fetch + یکپارچه‌سازی. یکپارچه‌سازی ممکن است merge یا rebase باشد (فلگ یا pull.rebase). با fetch می‌توانی قبل از پذیرش بررسی کنی.'},
{q:'وضعیت "Ahead 2, Behind 3" یعنی؟', o:['۲ فایل و ۳ پوشه تغییر کرده','۲ Commit محلی Push‌نشده داری و ۳ Commit روی Remote هست که نداری','۲ شاخه جلوتر و ۳ شاخه عقب‌تری','خطای اتصال'], a:1, why:'شاخهٔ محلی و Remote از هم فاصله گرفته‌اند (Diverged)؛ باید اول تاریخچهٔ Remote را یکپارچه کنی و سپس push کنی.'},
{q:'Push شد rejected با پیام fetch first. چه می‌کنی؟', o:['git push --force','git pull سپس git push','Repo را دوباره clone می‌کنی','شاخه را حذف می‌کنی'], a:1, why:'Remote تغییراتی دارد که تو نداری؛ اول باید آن‌ها را بیاوری و در شاخه‌ات یکپارچه کنی. force push در کار تیمی خطرناک است.'},
{q:'برای حذف یک شاخه از روی GitHub؟', o:['git branch -D feature/x','git push origin --delete feature/x','git remote remove feature/x','git fetch --delete'], a:1, why:'حذف شاخهٔ Remote با push --delete انجام می‌شود؛ حذف محلی جداگانه است.'},
{q:'چرا Pull مکرر، Conflict را کم می‌کند؟', o:['چون Git تغییرات کوچک را نادیده می‌گیرد','چون فاصلهٔ نسخهٔ تو با تیم کم می‌ماند و هم‌پوشانی تغییرات کوچک‌تر و زودتر حل می‌شود','چون Pull به‌طور خودکار Conflict را حذف می‌کند','ربطی ندارد'], a:1, why:'هرچه دیرتر همگام شوی، تغییرات واگرا بیشتر انباشته می‌شوند و برخوردشان سنگین‌تر می‌شود.'}
]},
{ id:9, title:'Merge', branch:'feature/merge', subtitle:'لحظهٔ بازگشت شاخه به خانه.',
body:`
<h3>Merge چیست؟</h3>
<p><strong>Merge</strong> یعنی آوردن تغییرات یک شاخه به شاخهٔ دیگر. رایج‌ترین حالت: کارَت در Feature Branch تمام شده و حالا آن را وارد main می‌کنی:</p>
<pre><code>git switch main
git pull                          <span class="c"># main را به‌روز کن</span>
git merge feature/search-empty-state
git branch -d feature/search-empty-state  <span class="c"># شاخهٔ تمام‌شده را حذف کن</span></code></pre>
<h3>سه روش Merge — همین سه تا را بدان کافی است</h3>
<h4>۱) Fast-forward</h4>
<p>اگر از زمان جداشدن شاخه، main هیچ Commit جدیدی نگرفته باشد، Git فقط اشاره‌گر main را جلو می‌کشد. هیچ Commit جدیدی ساخته نمی‌شود؛ تاریخچه یک خط صاف می‌ماند.</p>
<pre><code>قبل:  main ──o───o
                  \\───o───o  feature
بعد:  main ──o───o───o───o   <span class="c">(خط صاف)</span></code></pre>
<h4>۲) Merge Commit</h4>
<p>اگر هر دو شاخه جلو رفته باشند، Git یک <strong>Commit ادغام</strong> با دو والد می‌سازد. تاریخچهٔ کامل هر دو شاخه حفظ می‌شود ولی نمودار شلوغ‌تر است (تاریخچهٔ غیرخطی).</p>
<pre><code>main ──o───o───────M   <span class="c">← Merge Commit با دو والد</span>
            \\─o───o/   feature</code></pre>
<h4>۳) Squash Merge</h4>
<p>همهٔ Commitهای شاخه <strong>فشرده در یک Commit تمیز</strong> وارد main می‌شوند. تاریخچهٔ main خطی و خوانا می‌ماند و جزئیات Commitهای ریز شاخه («wip»، «fix typo») واردش نمی‌شود. در PRهای GitHub گزینهٔ بسیار محبوبی است.</p>
<h3>کدام را انتخاب کنم؟</h3>
<table><tr><th>روش</th><th>مناسبِ</th><th>نتیجه در تاریخچه</th></tr>
<tr><td>Fast-forward</td><td>شاخه‌های کوچک وقتی main ثابت مانده</td><td>خطی، بدون Commit اضافه</td></tr>
<tr><td>Merge Commit</td><td>وقتی می‌خواهی تاریخچهٔ کامل شاخه حفظ شود</td><td>غیرخطی، با نقطهٔ ادغام مشخص</td></tr>
<tr><td>Squash</td><td>Feature Branchهایی با Commitهای ریز و کثیف</td><td>خطی، هر Feature یک Commit</td></tr></table>
<p><strong>Rebase and Merge</strong> گزینهٔ چهارم در GitHub است: Commitهای شاخه تک‌تک و بازنویسی‌شده روی main گذاشته می‌شوند تا تاریخچه خطی بماند؛ فعلاً فقط بدان چنین چیزی هست، جزئیاتش در سطح Rebase.</p>
<h3>قبل از Merge چه چیزی را بررسی کنیم؟</h3>
<pre><code>git diff main..feature/search-empty-state   <span class="c"># کل تغییراتی که وارد main می‌شود</span>
git log --oneline main..feature/search-empty-state  <span class="c"># لیست Commitها</span></code></pre>
<div class="callout note"><span class="co-title">در کار تیمی</span>Merge مستقیم روی main نمی‌زنی؛ شاخه را Push می‌کنی، Pull Request باز می‌کنی و Merge از داخل PR و بعد از Review انجام می‌شود. مکانیک همان است، فقط با نظارت.</div>
`,
quiz:[
{q:'Fast-forward Merge کی اتفاق می‌افتد؟', o:['وقتی شاخه Conflict دارد','وقتی main از زمان جداشدن شاخه هیچ Commit جدیدی نگرفته باشد','وقتی از --force استفاده کنی','در هر Merge موفق'], a:1, why:'وقتی main عقب نمانده تغییری موازی ندارد، Git فقط اشاره‌گر را جلو می‌برد؛ بدون Commit جدید.'},
{q:'Squash Merge چه می‌کند؟', o:['شاخه را حذف می‌کند','همهٔ Commitهای شاخه را در یک Commit فشرده وارد main می‌کند','Commitها را تک‌تک کپی می‌کند','main را به شاخه ادغام می‌کند'], a:1, why:'Squash تاریخچهٔ main را تمیز نگه می‌دارد: هر Feature = یک Commit.'},
{q:'Merge Commit چه ویژگی خاصی دارد؟', o:['پیام ندارد','دو والد دارد و نقطهٔ اتصال دو شاخه را ثبت می‌کند','قابل Revert نیست','فقط در GitHub ساخته می‌شود'], a:1, why:'Merge Commit تنها نوع Commitی است که دو والد دارد؛ به همین دلیل نمودار تاریخچه غیرخطی می‌شود.'},
{q:'شاخه‌ات پر از Commitهای ریز مثل "wip" و "typo" است و می‌خواهی main تمیز بماند. بهترین انتخاب؟', o:['Fast-forward','Merge Commit','Squash Merge','هیچ‌کدام؛ باید Commitها را دستی پاک کنی'], a:2, why:'Squash همهٔ آن ریزه‌کاری‌ها را در یک Commit معنادار جمع می‌کند.'},
{q:'ترتیب درست ادغام Feature در main؟', o:['روی feature بمان و git merge main بزن؛ تمام','به main برو، pull کن، سپس git merge feature و در آخر شاخه را حذف کن','اول شاخه را حذف کن بعد merge بزن','فقط push کافی است'], a:1, why:'Merge روی شاخهٔ مقصد اجرا می‌شود؛ پس اول به main می‌روی و به‌روزش می‌کنی.'}
]},
{ id:10, title:'Merge Conflict', branch:'fix/conflicts', subtitle:'ترسناک به نظر می‌رسد، ولی فقط یک سؤال ساده است: کدام نسخه؟',
body:`
<h3>Conflict چیست و چرا پیش می‌آید؟</h3>
<p>وقتی دو شاخه <strong>همان خط‌های همان فایل</strong> را به دو شکل متفاوت تغییر داده باشند، Git نمی‌تواند خودش تصمیم بگیرد کدام درست است؛ پس Merge را نگه می‌دارد و از تو می‌پرسد. Conflict خطا نیست؛ درخواست تصمیم انسانی است. اگر تغییرات در فایل‌ها یا خط‌های متفاوت باشند، Git خودش بی‌سروصدا ادغام می‌کند.</p>
<h3>تشخیص و شکل Conflict</h3>
<pre><code>git merge feature/new-palette
<span class="r"># CONFLICT (content): Merge conflict in tokens.json</span>
git status   <span class="c"># فایل‌های Conflictدار زیر "Unmerged paths" لیست می‌شوند</span></code></pre>
<p>داخل فایل Conflictدار، Git با <strong>Conflict Marker</strong>ها دو نسخه را نشانت می‌دهد:</p>
<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
  "primary": "#0969DA"        <span class="c">← Current Change (شاخهٔ فعلی تو)</span>
=======
  "primary": "#8250DF"        <span class="c">← Incoming Change (شاخه‌ای که می‌آوری)</span>
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/new-palette</code></pre>
<h3>چهار راه حل — در VS Code با یک کلیک</h3>
<ul>
<li><strong>Accept Current:</strong> نسخهٔ شاخهٔ خودت بماند.</li>
<li><strong>Accept Incoming:</strong> نسخهٔ شاخهٔ ورودی جایگزین شود.</li>
<li><strong>Accept Both:</strong> هر دو نگه داشته شوند (وقتی هر دو خط لازم‌اند).</li>
<li><strong>حل دستی:</strong> Markerها را پاک کن و نسخهٔ نهایی درست را خودت بنویس؛ گاهی جواب درست ترکیبی از هر دو است.</li>
</ul>
<h3>بعد از حل: ادامه یا لغو</h3>
<pre><code><span class="c"># بعد از تصمیم‌گیری در همهٔ فایل‌ها:</span>
git add tokens.json          <span class="c"># یعنی «این فایل حل شد»</span>
git commit                   <span class="c"># Merge کامل می‌شود</span>

<span class="c"># اگر پشیمان شدی و می‌خواهی به قبل از Merge برگردی:</span>
git merge --abort</code></pre>
<div class="callout warn"><span class="co-title">همیشه نتیجه را چک کن</span>بعد از حل Conflict، فایل را باز کن و مطمئن شو هیچ Marker (&lt;&lt;&lt;&lt;&lt;&lt;&lt;)ی جا نمانده و فایل معتبر است. در فایل‌های JSON (مثل Design Tokenها) یک ویرگول جامانده کل فایل را می‌شکند.</div>
<h3>Conflict در ابزارهای تو</h3>
<ul>
<li><strong>VS Code:</strong> بخش‌های Conflict را رنگی نشان می‌دهد با دکمه‌های Accept بالای هر بلوک + نمای Merge Editor سه‌ستونه.</li>
<li><strong>GitHub Desktop:</strong> فایل‌های Conflictدار را لیست می‌کند و برای حل، ادیتور را باز می‌کند؛ حل ساده‌ها را هم داخل خودش دارد.</li>
<li><strong>Design Tokenها:</strong> Conflict روی JSON توکن‌ها رایج‌ترین Conflict طراح‌هاست؛ چون فایل مشترک و پرتغییر است.</li>
</ul>
<h3>پیشگیری بهتر از درمان</h3>
<ul>
<li>شاخه‌ها را کوچک و کوتاه‌عمر نگه دار و زود Merge کن.</li>
<li>مرتب از main، Pull کن تا شاخه‌ات عقب نماند.</li>
<li>قبل از تغییر فایل‌های مشترک (توکن‌ها، Configها) با هم‌تیمی هماهنگ کن که همزمان روی یک فایل نیفتید.</li>
</ul>
`,
quiz:[
{q:'Conflict دقیقاً کی رخ می‌دهد؟', o:['هر بار که دو نفر روی یک پروژه کار کنند','وقتی دو شاخه همان خط‌های همان فایل را متفاوت تغییر داده باشند','هر بار که pull بزنی','وقتی اینترنت قطع شود'], a:1, why:'تغییر در خط‌ها یا فایل‌های متفاوت را Git خودش ادغام می‌کند؛ فقط هم‌پوشانی مستقیم نیاز به تصمیم انسانی دارد.'},
{q:'در Markerها، بخش بین <<<<<<< HEAD و ======= چیست؟', o:['Incoming Change (شاخهٔ ورودی)','Current Change (نسخهٔ شاخهٔ فعلی تو)','نسخهٔ نهایی پیشنهادی Git','کد خراب‌شده'], a:1, why:'سمت HEAD همیشه نسخهٔ شاخه‌ای است که رویش ایستاده‌ای؛ بعد از ======= نسخهٔ ورودی است.'},
{q:'بعد از حل دستی Conflict در یک فایل، قدم بعدی؟', o:['git merge --continue-file','git add آن فایل و سپس git commit','فایل را rename می‌کنی','git push --force'], a:1, why:'add به Git می‌گوید این فایل حل شده؛ commit ادغام را نهایی می‌کند.'},
{q:'وسط Conflict پشیمان شدی و می‌خواهی به وضعیت قبل از Merge برگردی؟', o:['git undo','git merge --abort','git reset --hard origin','فایل‌ها را دستی پاک می‌کنی'], a:1, why:'merge --abort عملیات را لغو و شاخه را به حالت قبل از شروع Merge برمی‌گرداند.'},
{q:'چرا حل Conflict در فایل JSON توکن‌ها دقت بیشتری می‌خواهد؟', o:['چون JSON قابل Merge نیست','چون یک Marker یا ویرگول جامانده، فایل را از نظر ساختاری خراب می‌کند و کل سیستم توکن می‌شکند','چون GitHub فایل JSON را قبول نمی‌کند','دقت بیشتری نمی‌خواهد'], a:1, why:'JSON فرمت سخت‌گیری است؛ بعد از حل حتماً اعتبار فایل را چک کن.'},
{q:'مؤثرترین راه کاهش Conflict؟', o:['هرگز Branch نساختن','شاخه‌های کوچک، Merge زود، Pull مرتب از main و هماهنگی روی فایل‌های مشترک','همیشه Accept Incoming زدن','قفل‌کردن فایل‌ها'], a:1, why:'Conflict محصول واگرایی طولانی است؛ همگامی مکرر آن را کوچک نگه می‌دارد.'}
]},
{ id:11, title:'Pull Request', branch:'feature/pull-requests', subtitle:'مهم‌ترین محل گفت‌وگوی تیم دربارهٔ تغییرات.',
body:`
<h3>Pull Request چیست؟</h3>
<p><strong>Pull Request (PR)</strong> یک درخواست رسمی در GitHub است: «شاخهٔ من آماده است؛ لطفاً بررسی کنید و اگر تأیید شد، به main ادغام کنید.» PR فقط دکمهٔ Merge نیست؛ فضای گفت‌وگو، Review، ثبت تصمیم‌ها و کنترل کیفیت است.</p>
<div class="callout note"><span class="co-title">اشتباه رایج اسم‌ها</span><code>git pull</code> یک دستور محلی برای دریافت تغییرات است؛ <strong>Pull Request</strong> یک فرایند بررسی در GitHub است. فقط اشتراک اسمی دارند.</div>
<h3>ساخت PR</h3>
<p>بعد از Push شاخه، در GitHub دکمهٔ Compare &amp; pull request ظاهر می‌شود. دو انتخاب کلیدی:</p>
<ul>
<li><strong>Base Branch:</strong> مقصد ادغام (معمولاً main).</li>
<li><strong>Compare Branch:</strong> شاخهٔ تو که قرار است بررسی شود.</li>
</ul>
<p>سپس <strong>عنوان</strong> (کوتاه و توصیفی، مثل یک Commit Message خوب) و <strong>توضیحات</strong> (چه، چرا، چطور تست شود) را می‌نویسی.</p>
<h3>اجزای صفحهٔ PR</h3>
<ul>
<li><strong>Conversation:</strong> توضیحات، کامنت‌ها و تاریخچهٔ گفت‌وگو.</li>
<li><strong>Commits:</strong> لیست Commitهای شاخه.</li>
<li><strong>Files Changed:</strong> Diff کامل؛ جایی که Review واقعی اتفاق می‌افتد.</li>
</ul>
<h3>نقش‌ها و ابزارهای مدیریتی</h3>
<ul>
<li><strong>Reviewer:</strong> کسی که از او درخواست بررسی می‌کنی.</li>
<li><strong>Assignee:</strong> مسئول پیش‌بردن PR (معمولاً خودت).</li>
<li><strong>Label:</strong> برچسب‌هایی مثل design، bug برای دسته‌بندی.</li>
<li><strong>Draft PR:</strong> «هنوز تمام نشده ولی نظرتان را می‌خواهم.» وقتی آماده شد، Ready for Review می‌زنی.</li>
</ul>
<h3>چرخهٔ Review</h3>
<ol>
<li>Reviewer در تب Files Changed روی خط‌های مشخص <strong>Inline Comment</strong> می‌گذارد.</li>
<li>در پایان یکی از سه حالت را ثبت می‌کند: <strong>Approve</strong> (تأیید)، <strong>Request Changes</strong> (اصلاح لازم است)، یا فقط Comment.</li>
<li>تو اصلاحات را در همان شاخه Commit و Push می‌کنی؛ PR خودکار به‌روز می‌شود.</li>
<li>گفت‌وگوهای حل‌شده را <strong>Resolve Conversation</strong> می‌کنی.</li>
<li>اگر main از شاخه‌ات جلو افتاده، دکمهٔ <strong>Update Branch</strong> شاخه را با main همگام می‌کند.</li>
<li>در نهایت: <strong>Merge</strong> (با یکی از سه روش سطح ۹)، یا <strong>Close</strong> بدون ادغام (و در صورت نیاز Reopen).</li>
</ol>
<h3>PR کوچک، Review خوب</h3>
<p>یک PR با ۲۰۰ خط تغییر، Review دقیق می‌گیرد؛ یک PR با ۲۰۰۰ خط، فقط یک Approve خسته. تغییرات بزرگ را به چند PR مستقل بشکن. <strong>PR Template</strong> (فایلی در Repo که ساختار توضیحات را از قبل مشخص می‌کند) کمک می‌کند هیچ PRای بدون اطلاعات لازم باز نشود.</p>
`,
quiz:[
{q:'تفاوت git pull و Pull Request؟', o:['یکی هستند','git pull دستور دریافت تغییرات است؛ PR فرایند بررسی و تأیید تغییرات در GitHub است','PR نسخهٔ گرافیکی git pull است','git pull فقط بعد از PR کار می‌کند'], a:1, why:'شباهتشان فقط در اسم است: یکی همگام‌سازی محلی، دیگری فرایند اجتماعی Review.'},
{q:'Base و Compare در ساخت PR یعنی؟', o:['Base شاخهٔ تو، Compare شاخهٔ main','Base مقصد ادغام است و Compare شاخه‌ای که بررسی می‌شود','هر دو باید main باشند','Base یعنی اولین Commit'], a:1, why:'جهت PR: Compare (شاخهٔ تو) به داخل Base (معمولاً main).'},
{q:'Draft PR برای چه وقتی است؟', o:['PRهایی که رد شده‌اند','وقتی کار هنوز کامل نیست ولی می‌خواهی بازخورد اولیه بگیری','PRهای خصوصی','فقط برای باگ‌ها'], a:1, why:'Draft یعنی «در جریان باش ولی هنوز Merge نکن»؛ بعداً Ready for Review می‌شود.'},
{q:'Reviewer مشکلی در خط ۴۲ دیده. حرفه‌ای‌ترین ابزار؟', o:['پیام در تلگرام تیم','Inline Comment روی همان خط در تب Files Changed','تماس تلفنی','ویرایش مستقیم شاخهٔ تو بدون اطلاع'], a:1, why:'Inline Comment بازخورد را دقیقاً به خط مربوطه سنجاق می‌کند و در تاریخچهٔ PR ثبت می‌شود.'},
{q:'Request Changes یعنی؟', o:['PR فوراً بسته می‌شود','Reviewer تأیید نمی‌کند تا اصلاحات مشخص‌شده انجام شود','شاخه حذف می‌شود','فقط یک پیشنهاد اختیاری است'], a:1, why:'Request Changes یک وضعیت رسمی Review است: قبل از Merge باید موارد رفع و دوباره بررسی شوند.'},
{q:'چرا PR کوچک بهتر است؟', o:['چون GitHub محدودیت حجم دارد','چون Review دقیق‌تری می‌گیرد، سریع‌تر Merge می‌شود و در صورت مشکل، برگرداندنش ساده‌تر است','چون Commit کمتری دارد','بهتر نیست؛ بزرگ‌تر حرفه‌ای‌تر است'], a:1, why:'کیفیت Review با حجم تغییرات رابطهٔ معکوس دارد.'}
]},
{ id:12, title:'Pull Request برای طراحان', branch:'design/pr-craft', subtitle:'PR تو می‌تواند بهترین سند Design Handoff باشد.',
body:`
<h3>PR طراحی با PR کدنویسی فرق دارد</h3>
<p>وقتی تغییر تو ماهیت طراحی دارد (کامپوننت، توکن، لی‌آوت، پروتوتایپ)، Reviewer باید <strong>تصمیم طراحی</strong> را بفهمد، نه فقط کد را. PR جایی است که مسئله، تصمیم و شواهد بصری کنار خود تغییر ثبت می‌شوند — و برخلاف پیام‌های چت، برای همیشه قابل جست‌وجو می‌مانند.</p>
<h3>ساختار پیشنهادی توضیحات PR طراحی</h3>
<pre><code>## Problem
در نتایج خالی جست‌وجو، کاربر با صفحهٔ سفید رها می‌شد.

## Design decision
Empty State با پیام راهنما + سه جست‌وجوی پیشنهادی.
گزینهٔ Illustration بررسی و به‌خاطر وزن صفحه رد شد.

## What changed
- کامپوننت EmptyState جدید
- توکن spacing-section از 32 به 40

## Figma reference
لینک فریم نهایی + نسخهٔ Explore

## States covered
Default / بدون پیشنهاد / RTL / موبایل

## Known limitations
پیشنهادها فعلاً استاتیک‌اند؛ منتظر API.

## Questions for review
آیا 40px با بقیهٔ صفحات سازگار است؟</code></pre>
<h3>عناصر کلیدی</h3>
<ul>
<li><strong>Before / After:</strong> دو اسکرین‌شات کنار هم؛ سریع‌ترین راه انتقال تغییر بصری. تصاویر را می‌توانی مستقیم در توضیحات PR بکشی و رها کنی.</li>
<li><strong>لینک Figma:</strong> به فریم دقیق لینک بده، نه کل فایل.</li>
<li><strong>Stateهای بررسی‌شده:</strong> hover، focus، empty، error، loading، RTL... . نوشتنشان هم به Reviewer کمک می‌کند هم خودت را وادار به چک‌کردن می‌کند.</li>
<li><strong>Edge Caseها:</strong> متن خیلی بلند، بدون تصویر، صفحهٔ باریک.</li>
<li><strong>چک‌لیست کیفی:</strong> Design Tokenها (مقدار خام ننوشته باشی!)، Responsive Behavior و Accessibility (کنتراست، فوکوس، aria).</li>
<li><strong>سؤال از Developer:</strong> ابهام‌ها را همان‌جا بپرس؛ سؤال ثبت‌شده در PR بهتر از سؤال گم‌شده در چت است.</li>
</ul>
<h3>PR به‌عنوان Design Review و Handoff</h3>
<p>وقتی PR این‌طور نوشته شود، همان‌جا می‌تواند محل Design Review رسمی باشد (Reviewer طراح + Reviewer دولوپر) و همزمان سند Handoff: دولوپر می‌داند چه چیزی، چرا و با چه محدودیت‌هایی تغییر کرده.</p>
<h3>مرز مستندسازی PR و Figma</h3>
<table><tr><th>در Figma</th><th>در PR</th></tr>
<tr><td>وضعیت مطلوب و اکتشاف طراحی: واریانت‌ها، فلوها، Specها</td><td>تاریخچهٔ تغییر واقعی محصول: چه شد، چرا، کی و توسط چه کسی</td></tr>
<tr><td>سند زنده که بازنویسی می‌شود</td><td>سند ثابت هر تغییر که هرگز گم نمی‌شود</td></tr></table>
`,
quiz:[
{q:'مهم‌ترین چیزی که PR طراحی باید علاوه بر کد منتقل کند؟', o:['تعداد ساعت کار','مسئله و تصمیم طراحی با دلیلش','نام ابزار طراحی','فونت مورد علاقهٔ طراح'], a:1, why:'Reviewer باید بفهمد چرا این تغییر درست است؛ کد فقط «چطور» را نشان می‌دهد.'},
{q:'بهترین روش نمایش تغییر بصری در PR؟', o:['توضیح متنی طولانی','اسکرین‌شات Before/After','لینک به کل فایل Figma بدون توضیح','فایل PSD پیوست'], a:1, why:'مقایسهٔ کنار هم، تغییر را در چند ثانیه منتقل می‌کند.'},
{q:'چرا فهرست States covered ارزشمند است؟', o:['برای طولانی‌شدن PR','هم به Reviewer نقشهٔ بررسی می‌دهد هم خودت را وادار می‌کند همهٔ Stateها را واقعاً چک کنی','GitHub آن را الزامی کرده','فقط برای پروژه‌های بزرگ'], a:1, why:'State فراموش‌شده (مثلاً error یا RTL) رایج‌ترین باگ طراحی است؛ این فهرست جلویش را می‌گیرد.'},
{q:'در بخش Known limitations چه می‌نویسی؟', o:['ضعف‌های شخصی‌ات','محدودیت‌های آگاهانهٔ راه‌حل فعلی (مثل دیتای استاتیک تا آماده‌شدن API)','باگ‌های مخفی که نمی‌خواهی کسی بفهمد','هیچ‌وقت نباید محدودیت نوشت'], a:1, why:'ثبت شفاف محدودیت‌ها اعتماد می‌سازد و از سوءتفاهم «این باگ است؟» جلوگیری می‌کند.'},
{q:'مرز درست مستندسازی Figma و PR؟', o:['همه‌چیز فقط در Figma','Figma وضعیت مطلوب و اکتشاف؛ PR تاریخچهٔ ثبت‌شدهٔ هر تغییر واقعی و چرایی‌اش','همه‌چیز فقط در PR','هر دو باید کپی هم باشند'], a:1, why:'Figma سند زنده است و بازنویسی می‌شود؛ PR سند دائمی هر تغییر است.'}
]},
{ id:13, title:'خواندن Diff', branch:'review/read-diff', subtitle:'در دورهٔ AI، مهارت خواندن تغییرات از حفظ‌بودن دستورها مهم‌تر است.',
body:`
<h3>Diff چیست؟</h3>
<p><strong>Diff</strong> نمایش دقیق تفاوت دو وضعیت است، خط به خط:</p>
<pre><code><span class="c">--- a/components/Button.css</span>
<span class="c">+++ b/components/Button.css</span>
 .button {
<span class="r">-  padding: 8px 12px;</span>   <span class="c">← Removed Line (خط حذف‌شده)</span>
<span class="g">+  padding: 12px 20px;</span>   <span class="c">← Added Line (خط اضافه‌شده)</span>
 }</code></pre>
<p>نکتهٔ ظریف: «تغییر یک خط» (Modified) در Diff به‌صورت یک حذف + یک اضافه نمایش داده می‌شود. سطح‌های مختلف Diff: یک فایل، یک Commit، بین دو Branch، یا کل یک Pull Request.</p>
<h3>Split و Unified</h3>
<ul>
<li><strong>Unified View:</strong> حذف و اضافه پشت‌سرهم در یک ستون؛ برای تغییرات کوچک.</li>
<li><strong>Split View:</strong> قبل و بعد در دو ستون کنار هم؛ برای طراح که مقایسهٔ بصری می‌کند معمولاً خواناتر است. در GitHub از تب Files Changed قابل تغییر است.</li>
</ul>
<h3>روش بررسی فایل‌به‌فایل</h3>
<ol>
<li>اول <strong>لیست فایل‌های تغییرکرده</strong> را نگاه کن: آیا فایلی اینجا هست که انتظارش را نداشتی؟</li>
<li>فایل‌های اصلی تغییر را با دقت بخوان.</li>
<li>در GitHub هر فایل بررسی‌شده را Viewed بزن تا گم نشوی.</li>
</ol>
<h3>چک‌لیست شکار تغییرات ناخواسته</h3>
<ul>
<li><strong>حذف تصادفی:</strong> بلوک‌های قرمز بزرگ. آیا این حذف عمدی بوده؟</li>
<li><strong>تغییر Dependency:</strong> هر تغییری در <code>package.json</code> یعنی پکیج جدید یا نسخهٔ جدید؛ باید عمدی و قابل توضیح باشد.</li>
<li><strong>فایل جدید:</strong> از کجا آمده و چرا لازم است؟</li>
<li><strong>تغییر Config:</strong> فایل‌های تنظیمات (build، lint، env نمونه) روی کل پروژه اثر می‌گذارند؛ سرسری رد نشو.</li>
</ul>
<h3>بررسی تغییرات AI-generated</h3>
<p>مهم‌ترین کاربرد امروزی این مهارت: AI معمولاً بیشتر از چیزی که خواستی تغییر می‌دهد. قبل از پذیرش هر خروجی:</p>
<ul>
<li>لیست فایل‌ها را با درخواست خودت مقایسه کن؛ تغییر خارج از Scope؟</li>
<li>دنبال حذف‌های ناخواسته و «بازنویسی‌های سرخود» بگرد.</li>
<li>Dependencyهای اضافه‌شده و تغییرات Config را جدی بگیر.</li>
</ul>
<h3>نگاه طراحانه به Diff</h3>
<ul>
<li><strong>Design Tokenها:</strong> تغییر <code>#0969DA</code> به <code>#0A6FD0</code> در Diff یک خط است، ولی روی کل محصول اثر می‌گذارد.</li>
<li><strong>Copy و Content:</strong> تغییر متن‌ها (لیبل دکمه، پیام خطا) در Diff کاملاً قابل Review است.</li>
<li><strong>Stateها:</strong> آیا کلاس‌ها/استایل‌های hover و focus و disabled هم متناسب تغییر کرده‌اند؟</li>
</ul>
<h3>انتخاب بخشی از تغییرات برای Commit</h3>
<p>Diff فقط برای خواندن نیست؛ ابزار جداسازی هم هست. با <code>git add -p</code> (یا انتخاب خط‌ها در Source Control ادیتور) فقط تکه‌های مرتبط را Stage کن و بقیه را برای Commit بعدی بگذار.</p>
`,
quiz:[
{q:'در Diff، خط تغییرکرده (Modified) چطور نمایش داده می‌شود؟', o:['با رنگ زرد','به‌صورت یک خط حذف (-) و یک خط اضافه (+)','با علامت ~','نمایش داده نمی‌شود'], a:1, why:'Git مفهوم «ویرایش خط» ندارد؛ هر تغییر = حذف نسخهٔ قبلی + افزودن نسخهٔ جدید.'},
{q:'Split View چه زمانی انتخاب بهتری است؟', o:['فقط برای فایل‌های JSON','وقتی مقایسهٔ بصری قبل/بعد در دو ستون خواناتر است','وقتی تغییرات یک خط است','هیچ‌وقت'], a:1, why:'دو ستون کنار هم، مدل ذهنی Before/After طراح را مستقیم پشتیبانی می‌کند.'},
{q:'اولین قدم درست در Review یک PR بزرگ؟', o:['خواندن خط‌به‌خط از اولین فایل','مرور لیست فایل‌های تغییرکرده برای یافتن موارد غیرمنتظره','Approve سریع','چک‌کردن فقط فایل‌های CSS'], a:1, why:'لیست فایل‌ها نقشهٔ کلی تغییر است؛ فایل غیرمنتظره اولین علامت خطر است.'},
{q:'در Diff خروجی AI، تغییری در package.json می‌بینی که نخواسته بودی. واکنش درست؟', o:['حتماً لازم بوده؛ رد شو','توقف و بررسی: چه پکیجی، چرا اضافه شده و آیا امن و ضروری است','فایل را از Diff مخفی می‌کنی','فقط اسم پکیج را گوگل نمی‌کنی و قبول می‌کنی'], a:1, why:'Dependency جدید یعنی کد شخص ثالث وارد پروژه می‌شود؛ باید عمدی، ضروری و قابل اعتماد باشد.'},
{q:'چرا تغییر یک خطی یک Design Token بررسی جدی می‌خواهد؟', o:['چون JSON حساس است','چون یک توکن ممکن است در ده‌ها کامپوننت استفاده شده باشد و اثرش سراسری است','چون توکن‌ها قابل Revert نیستند','نمی‌خواهد؛ یک خط است'], a:1, why:'دامنهٔ اثر توکن با اندازهٔ Diff آن نسبتی ندارد؛ کوچک‌ترین Diff می‌تواند بزرگ‌ترین اثر بصری را داشته باشد.'},
{q:'می‌خواهی فقط بخشی از تغییرات یک فایل را Commit کنی؟', o:['غیرممکن است؛ فایل کامل می‌رود','git add -p یا انتخاب خط‌ها در Source Control ادیتور','فایل را دو نسخه می‌کنی','git commit --half'], a:1, why:'Stage در سطح تکه (hunk) و حتی خط ممکن است؛ پایهٔ Commitهای اتمیک.'}
]},
{ id:14, title:'بازگرداندن و اصلاح تغییرات', branch:'fix/undo-safely', subtitle:'شبکهٔ ایمنی Git: تقریباً هیچ‌چیز واقعاً از بین نمی‌رود.',
body:`
<h3>نقشهٔ ابزارهای بازگشت</h3>
<table><tr><th>موقعیت</th><th>ابزار</th><th>امنیت</th></tr>
<tr><td>تغییرات ذخیره‌نشده در یک فایل را نمی‌خواهم</td><td><code>git restore file</code></td><td>⚠️ تغییرات Commit‌نشده واقعاً حذف می‌شوند</td></tr>
<tr><td>فایل را اشتباهی Stage کردم</td><td><code>git restore --staged file</code></td><td>✅ کاملاً امن</td></tr>
<tr><td>پیام/محتوای آخرین Commit (Push‌نشده)</td><td><code>git commit --amend</code></td><td>✅ قبل از Push امن</td></tr>
<tr><td>یک Commit منتشرشده اشتباه بود</td><td><code>git revert</code></td><td>✅ امن‌ترین راه عمومی</td></tr>
<tr><td>هر فاجعهٔ دیگری</td><td><code>git reflog</code></td><td>🛟 چرخ یدک</td></tr></table>
<h3>git restore — برگرداندن فایل</h3>
<pre><code>git restore styles.css            <span class="c"># تغییرات Commit‌نشدهٔ فایل را دور بریز</span>
git restore .                     <span class="c"># همهٔ فایل‌ها (با احتیاط)</span>
git restore --staged styles.css   <span class="c"># فقط از Stage خارج کن؛ تغییرات بمانند</span>
git restore --source=abc123 tokens.json  <span class="c"># فایل را از یک Commit قدیمی بیاور</span></code></pre>
<h3>git revert — پادزهر عمومی</h3>
<p>Revert یک <strong>Commit جدید</strong> می‌سازد که اثر یک Commit قبلی را خنثی می‌کند. تاریخچه دست نمی‌خورد و چیزی «پاک» نمی‌شود؛ به همین دلیل برای Commitهای Push‌شده و شاخه‌های مشترک، راه استاندارد و امن است:</p>
<pre><code>git revert abc123
<span class="c"># تاریخچه: ...→ abc123 (اشتباه) → def456 (Revert "اشتباه")</span></code></pre>
<h3>Revert در برابر Reset</h3>
<table><tr><th></th><th>Revert</th><th>Reset</th></tr>
<tr><td>روش</td><td>Commit خنثی‌کنندهٔ جدید می‌سازد</td><td>تاریخچه را به عقب می‌برد (بازنویسی)</td></tr>
<tr><td>تاریخچه</td><td>حفظ می‌شود</td><td>تغییر می‌کند</td></tr>
<tr><td>Commit عمومی/Push‌شده</td><td>✅ درست</td><td>❌ ممنوع</td></tr></table>
<h3>git reflog — چرخ یدک</h3>
<p>Reflog دفترچهٔ خاطرات محلی Git است: هر جایی که HEAD تو بوده — حتی Commitهایی که با reset «گم» شده‌اند یا شاخه‌های حذف‌شده — آنجا ثبت است:</p>
<pre><code>git reflog
<span class="c"># a1b2c3 HEAD@{0}: reset: moving to HEAD~2</span>
<span class="c"># d4e5f6 HEAD@{1}: commit: feat: add hero section  ← این را می‌خواهم!</span>
git switch -c rescue d4e5f6   <span class="c"># بازیابی در یک شاخهٔ جدید</span></code></pre>
<p>با همین روش <strong>شاخهٔ حذف‌شده</strong> هم برمی‌گردد: آخرین Commit شاخه را در reflog پیدا کن و شاخه‌ای جدید از آن بساز.</p>
<h3>لغو عملیات نیمه‌کاره</h3>
<pre><code>git merge --abort     <span class="c"># لغو Merge وسط Conflict</span>
git rebase --abort    <span class="c"># لغو Rebase</span></code></pre>
<h3>Restore Point قبل از تغییرات AI</h3>
<p>قبل از سپردن کار به یک Agent یا اجرای Prompt بزرگ: <strong>Commit کن</strong> (و ترجیحاً در شاخهٔ جدا کار کن). بعدش هر اتفاقی افتاد، بازگشت یک دستور فاصله دارد.</p>
<div class="callout tip"><span class="co-title">اولویت یادگیری</span>۱) restore ۲) revert ۳) commit --amend ۴) reflog ۵) و فقط بعد از این‌ها: reset.</div>
`,
quiz:[
{q:'تغییرات ذخیره‌شده ولی Commit‌نشدهٔ یک فایل را می‌خواهی کامل دور بریزی؟', o:['git revert file','git restore file','git reset --hard HEAD~1','git rm file'], a:1, why:'restore فایل را به آخرین وضعیت Commit‌شده برمی‌گرداند. حواست باشد این تغییرات چون Commit نشده‌اند، قابل بازیابی نیستند.'},
{q:'چرا برای Commit پوش‌شده revert درست است و reset نه؟', o:['چون reset کندتر است','چون revert بدون بازنویسی تاریخچه، اثر Commit را با یک Commit جدید خنثی می‌کند و با نسخهٔ همکاران تضاد نمی‌سازد','چون reset فقط محلی کار می‌کند','فرقی ندارد'], a:1, why:'تاریخچهٔ منتشرشده قرارداد مشترک تیم است؛ revert آن را حفظ می‌کند، reset آن را می‌شکند.'},
{q:'با reset --hard اشتباهی دو Commit را «گم» کرده‌ای. راه نجات؟', o:['کار از دست رفته','git reflog، پیداکردن هش Commit و ساخت شاخه از آن','دانلود دوباره از GitHub حتی اگر Push نشده بودند','git revert --undo'], a:1, why:'reflog همهٔ موقعیت‌های قبلی HEAD را دارد؛ Commitهای «گم‌شده» هنوز آنجا هستند.'},
{q:'شاخه‌ای را با -D حذف کردی و پشیمانی. چه می‌کنی؟', o:['غیرقابل بازگشت است','هش آخرین Commit شاخه را از reflog پیدا و از آن شاخهٔ جدید می‌سازی','GitHub Support را صدا می‌زنی','git branch --undelete'], a:1, why:'حذف شاخه فقط اشاره‌گر را پاک می‌کند؛ Commitها تا مدتی باقی‌اند و از reflog قابل بازیابی‌اند.'},
{q:'قبل از اجرای یک Prompt بزرگ روی پروژه، حرکت درست؟', o:['بستن ادیتور','Commit کردن وضعیت سالم (و ترجیحاً کار در شاخهٔ جدا) به‌عنوان Restore Point','خاموش‌کردن Git','کپی دستی پوشه'], a:1, why:'با یک Commit، بازگشت از هر خروجی بد AI فقط یک restore/revert فاصله دارد.'},
{q:'وسط یک Merge پر از Conflict می‌خواهی کلاً منصرف شوی؟', o:['git merge --abort','git restore .','ری‌استارت سیستم','git revert HEAD'], a:0, why:'merge --abort عملیات را لغو و همه‌چیز را به قبل از شروع Merge برمی‌گرداند.'}
]},
{ id:15, title:'Reset', branch:'danger/reset', subtitle:'ابزار قدرتمند بازنویسی تاریخچهٔ محلی — با احترام و احتیاط.',
body:`
<h3>git reset چه می‌کند؟</h3>
<p>Reset اشاره‌گر شاخه را به یک Commit قبلی برمی‌گرداند؛ انگار Commitهای بعد از آن «هرگز اتفاق نیفتاده‌اند». سه حالت دارد که فرقشان در سرنوشت تغییرات است:</p>
<pre><code><span class="c"># HEAD~1 یعنی «یک Commit قبل»</span>
git reset --soft HEAD~1   <span class="c"># Commit باز می‌شود؛ تغییرات در Stage می‌مانند</span>
git reset HEAD~1          <span class="c"># (Mixed، پیش‌فرض) تغییرات به Working Directory برمی‌گردند</span>
git reset --hard HEAD~1   <span class="c"># ⚠️ Commit و همهٔ تغییرات کاملاً حذف می‌شوند</span></code></pre>
<table><tr><th>حالت</th><th>Commit</th><th>Stage</th><th>فایل‌ها</th><th>کاربرد رایج</th></tr>
<tr><td>Soft</td><td>باز می‌شود</td><td>می‌ماند</td><td>می‌ماند</td><td>ترکیب چند Commit آخر در یک Commit بهتر</td></tr>
<tr><td>Mixed</td><td>باز می‌شود</td><td>خالی می‌شود</td><td>می‌ماند</td><td>«بگذار add و commit را از نو انجام دهم»</td></tr>
<tr><td>Hard</td><td>حذف</td><td>حذف</td><td>حذف</td><td>«این کار را کامل نابود کن» — با چشم باز</td></tr></table>
<h3>خطر reset --hard</h3>
<div class="callout warn"><span class="co-title">دو نوع نابودی متفاوت</span>Commitهای حذف‌شده با reset معمولاً از <code>git reflog</code> قابل بازیابی‌اند؛ ولی تغییراتی که <strong>هرگز Commit نشده بودند</strong> و با --hard پاک شوند، واقعاً و برای همیشه از بین می‌روند. قبل از هر --hard یک بار <code>git status</code> بزن و مطمئن شو چیز Commit‌نشده‌ای نداری.</div>
<h3>قانون قبل و بعد از Push</h3>
<ul>
<li><strong>قبل از Push:</strong> Reset ابزار مشروع نظافت محلی است؛ Commitها هنوز مال خودت‌اند.</li>
<li><strong>بعد از Push:</strong> Reset یعنی بازنویسی تاریخچهٔ مشترک؛ Push بعدی‌ات رد می‌شود و تنها با Force Push پیش می‌رود که تاریخچهٔ همکارانت را می‌شکند. در این حالت راه درست <code>git revert</code> است.</li>
</ul>
<h3>بازیابی بعد از Reset اشتباه</h3>
<pre><code>git reflog                       <span class="c"># هش Commit قبل از reset را پیدا کن</span>
git reset --hard d4e5f6          <span class="c"># به همان‌جا برگرد</span></code></pre>
<h3>زمان درست استفاده از Reset</h3>
<ul>
<li>سه Commit شلوغ محلی زده‌ای و می‌خواهی یکی تمیز جایشان بگذاری: <code>reset --soft HEAD~3</code> و یک Commit جدید.</li>
<li>Commit آخر کلاً اشتباه بود و Push هم نشده: <code>reset --hard HEAD~1</code> (بعد از چک status).</li>
<li>می‌خواهی add های اشتباهت را از نو بچینی: <code>reset</code> ساده (Mixed).</li>
</ul>
`,
quiz:[
{q:'بعد از git reset --soft HEAD~1 چه وضعی داری؟', o:['همه‌چیز پاک شده','Commit باز شده ولی تغییراتش Stage‌شده منتظرند','فایل‌ها به دو Commit قبل برگشته‌اند','شاخه حذف شده'], a:1, why:'soft فقط اشاره‌گر Commit را عقب می‌برد؛ Stage و فایل‌ها دست‌نخورده می‌مانند.'},
{q:'کدام حالت reset فایل‌های Working Directory را هم تغییر می‌دهد؟', o:['soft','mixed','hard','هیچ‌کدام'], a:2, why:'فقط hard هر سه لایه (تاریخچه، Stage، فایل‌ها) را به Commit مقصد برمی‌گرداند.'},
{q:'چه چیزی بعد از reset --hard واقعاً غیرقابل بازیابی است؟', o:['Commitهای حذف‌شده','تغییراتی که هرگز Commit نشده بودند','فایل‌های داخل gitignore','هیچ‌چیز'], a:1, why:'Commitها در reflog می‌مانند؛ ولی کاری که هیچ‌وقت Commit نشده، هیچ ردی در Git ندارد.'},
{q:'Commit اشتباه را Push کرده‌ای و تیم آن را دارد. راه درست؟', o:['reset --hard و سپس Force Push','git revert آن Commit','حذف Repo از GitHub','amend کردن'], a:1, why:'بازنویسی تاریخچهٔ مشترک همه را دچار تضاد می‌کند؛ revert بدون بازنویسی، اشتباه را خنثی می‌کند.'},
{q:'سه Commit شلوغ محلی را می‌خواهی به یک Commit تمیز تبدیل کنی؟', o:['reset --hard HEAD~3','reset --soft HEAD~3 سپس یک Commit جدید','revert سه بار','حذف شاخه'], a:1, why:'soft تغییرات هر سه Commit را آماده در Stage نگه می‌دارد تا با یک پیام خوب دوباره Commit کنی.'}
]},
{ id:16, title:'Stash', branch:'feature/stash', subtitle:'کشوی موقت: کار نیمه‌تمام را کنار بگذار، بعداً برگرد.',
body:`
<h3>Stash چیست؟</h3>
<p><strong>Stash</strong> تغییرات Commit‌نشده را در یک «کشوی موقت» می‌گذارد و Working Directory را تمیز می‌کند. سناریوی کلاسیک: وسط کار روی یک فیچر هستی، یک باگ فوری روی main پیدا می‌شود؛ کار نصفه را نه می‌خواهی Commit کنی نه دور بریزی.</p>
<pre><code>git stash push -m "hero layout WIP"   <span class="c"># ذخیره با نام (عادت خوب)</span>
git switch main                        <span class="c"># برو باگ را حل کن</span>
<span class="c"># ... fix, commit, push ...</span>
git switch feature/hero
git stash pop                          <span class="c"># کار نصفه برگشت</span></code></pre>
<h3>دستورهای اصلی</h3>
<pre><code>git stash                    <span class="c"># ذخیرهٔ سریع (بی‌نام)</span>
git stash -u                 <span class="c"># شامل فایل‌های Untracked هم بشود</span>
git stash list               <span class="c"># stash@{0}: hero layout WIP ...</span>
git stash apply stash@{1}    <span class="c"># اعمال، ولی در لیست بماند</span>
git stash pop                <span class="c"># اعمال + حذف از لیست</span>
git stash drop stash@{0}     <span class="c"># حذف یک Stash</span>
git stash clear              <span class="c"># حذف همه (بی‌بازگشت)</span></code></pre>
<div class="callout note"><span class="co-title">apply یا pop؟</span>pop برای مصرف یک‌باره؛ apply وقتی می‌خواهی همان تغییرات را روی چند جا امتحان کنی یا محتاطی که اگر Conflict شد، نسخهٔ Stash از دست نرود.</div>
<h3>نکته‌ها و لبه‌ها</h3>
<ul>
<li><strong>Untracked:</strong> Stash پیش‌فرض فایل‌های کاملاً جدید را برنمی‌دارد؛ فلگ <code>-u</code> لازم است.</li>
<li><strong>Stash هنگام تغییر Branch:</strong> اگر تغییرات Commit‌نشده با شاخهٔ مقصد ناسازگار باشد، Git جابه‌جایی را رد می‌کند؛ Stash راه‌حل استاندارد است. Stash به شاخه چسبیده نیست؛ می‌توانی روی شاخهٔ دیگری هم اعمالش کنی.</li>
<li><strong>Conflict در Stash:</strong> اگر فایل‌ها از زمان Stash تغییر کرده باشند، هنگام pop/apply همان Conflict Markerهای آشنا ظاهر می‌شوند و مثل Merge حلشان می‌کنی. نکته: در صورت Conflict، pop به‌طور خودکار Stash را حذف نمی‌کند.</li>
</ul>
<h3>Stash یا Commit؟</h3>
<p>Stash برای «چند ساعت، جابه‌جایی سریع» است: محلی است، Push نمی‌شود، پیام درست‌وحسابی ندارد و فراموش‌شدنش آسان است. اگر کار نیمه‌تمام قرار است بیش از یک روز بماند یا مهم است، به‌جای Stash یک Commit موقت با پیام wip در شاخهٔ خودش بزن؛ امن‌تر و قابل‌مشاهده‌تر است.</p>
`,
quiz:[
{q:'سناریوی اصلی استفاده از Stash؟', o:['ذخیرهٔ دائمی نسخه‌ها','کنارگذاشتن موقت کار نیمه‌تمام برای جابه‌جایی سریع (مثلاً رفتن سراغ باگ فوری)','ارسال تغییرات به GitHub','حذف تغییرات ناخواسته'], a:1, why:'Stash کشوی موقت است: Working Directory را تمیز می‌کند بدون Commit یا دورریختن کار.'},
{q:'فرق pop و apply؟', o:['pop سریع‌تر است','pop اعمال می‌کند و Stash را از لیست حذف می‌کند؛ apply آن را نگه می‌دارد','apply فقط برای main کار می‌کند','هیچ فرقی ندارند'], a:1, why:'apply یعنی «کپی کن، نگه دار»؛ pop یعنی «بردار و مصرف کن».'},
{q:'فایل جدید (Untracked) ساخته‌ای ولی git stash آن را برنداشت. چرا؟', o:['Stash خراب است','Stash پیش‌فرض فقط فایل‌های Tracked را ذخیره می‌کند؛ برای Untracked فلگ -u لازم است','فایل باید اول Push شود','فایل‌های جدید قابل Stash نیستند'], a:1, why:'stash -u (یا --include-untracked) فایل‌های جدید را هم شامل می‌شود.'},
{q:'کار نیمه‌تمام مهمی داری که احتمالاً یک هفته معلق می‌ماند. انتخاب بهتر؟', o:['Stash با نام','Commit موقت (wip) در شاخهٔ خودش','کپی فایل‌ها در دسکتاپ','هیچ‌کدام؛ باید تمامش کنی'], a:1, why:'Stash محلی، بی‌پشتیبان و فراموش‌شدنی است؛ Commit در شاخه امن، قابل Push و قابل‌رؤیت است.'},
{q:'هنگام stash pop به Conflict خوردی. چه اتفاقی می‌افتد؟', o:['Stash نابود می‌شود و کار از دست می‌رود','Conflict Markerها ظاهر می‌شوند و مثل Merge حل می‌کنی؛ Stash هم خودکار حذف نشده','Git خودش تصمیم می‌گیرد','pop غیرممکن می‌شود'], a:1, why:'حل Conflict استاش دقیقاً همان مهارت حل Conflict در Merge است و نسخهٔ Stash تا حذف دستی باقی می‌ماند.'}
]},
{ id:17, title:'Tag و Release', branch:'release/v1.0.0', subtitle:'نشانه‌گذاری نسخه‌های مهم و اعلام رسمی آن‌ها.',
body:`
<h3>Tag چیست؟</h3>
<p><strong>Tag</strong> یک برچسب دائمی روی یک Commit خاص است؛ مثل گذاشتن یک بوک‌مارک روی نقطه‌ای از تاریخچه که می‌گوید «این نسخهٔ ۱.۲.۰ بود». برخلاف Branch که با هر Commit جدید جلو می‌رود، Tag ثابت می‌ماند.</p>
<h3>دو نوع Tag</h3>
<ul>
<li><strong>Lightweight Tag:</strong> فقط یک اشاره‌گر ساده به Commit، بدون اطلاعات اضافه.</li>
<li><strong>Annotated Tag:</strong> شیء کاملی با نام سازنده، تاریخ و پیام. برای انتشار رسمی همیشه این را انتخاب کن.</li>
</ul>
<pre><code>git tag v1.0.0                              <span class="c"># Lightweight</span>
git tag -a v1.2.0 -m "Add dark mode tokens" <span class="c"># Annotated ✅</span>
git tag                                     <span class="c"># لیست Tagها</span>
git show v1.2.0                             <span class="c"># جزئیات</span>
git push origin v1.2.0                      <span class="c"># Tagها خودکار Push نمی‌شوند!</span>
git push origin --tags                      <span class="c"># همه با هم</span>
git tag -d v1.2.0                           <span class="c"># حذف محلی</span>
git push origin --delete v1.2.0             <span class="c"># حذف از Remote</span></code></pre>
<h3>Semantic Versioning</h3>
<p>قرارداد جهانی شماره‌گذاری: <code>MAJOR.MINOR.PATCH</code> — مثلاً <code>2.4.1</code></p>
<table><tr><th>بخش</th><th>کی زیاد می‌شود؟</th><th>مثال در Design System</th></tr>
<tr><td><strong>MAJOR</strong> (2.x.x)</td><td>تغییر شکننده (Breaking): مصرف‌کننده باید کدش را عوض کند</td><td>حذف یا تغییر نام یک توکن؛ حذف یک prop کامپوننت</td></tr>
<tr><td><strong>MINOR</strong> (x.4.x)</td><td>قابلیت جدید و سازگار با قبل</td><td>افزودن واریانت جدید دکمه یا توکن جدید</td></tr>
<tr><td><strong>PATCH</strong> (x.x.1)</td><td>رفع باگ بدون تغییر رفتار</td><td>اصلاح کنتراست رنگ خطا یا فاصلهٔ غلط</td></tr></table>
<h3>Release در GitHub</h3>
<p><strong>Release</strong> لایه‌ای روی Tag است: یک صفحهٔ رسمی با عنوان نسخه، <strong>Release Note</strong> (توضیح این نسخه برای انسان‌ها) و فایل‌های پیوست. GitHub می‌تواند فهرست تغییرات را هم به‌صورت خودکار تولید کند.</p>
<h3>Changelog</h3>
<p><strong>Changelog</strong> فایلی در Repo (معمولاً <code>CHANGELOG.md</code>) که تاریخچهٔ نسخه‌ها را دسته‌بندی‌شده نگه می‌دارد:</p>
<pre><code>## [2.0.0] - 2026-03-14
### Breaking
- color-brand-primary حذف شد → از color-brand استفاده کنید

### Added
- توکن‌های حالت تیره

### Fixed
- کنتراست رنگ متن غیرفعال</code></pre>
<div class="callout tip"><span class="co-title">چرا برای طراح مهم است؟</span>وقتی Design System، Component Library یا Design Tokenها نسخه‌بندی می‌شوند، تیم‌ها می‌توانند روی نسخهٔ مشخصی بمانند و آگاهانه ارتقا دهند. جملهٔ «رنگ‌ها یهو عوض شد» با یک Release Note شفاف تبدیل می‌شود به «نسخهٔ ۲ منتشر شد و اینها تغییر کرد».</div>
`,
quiz:[
{q:'فرق Tag و Branch؟', o:['هیچ','Tag برچسبی ثابت روی یک Commit است؛ Branch با هر Commit جدید جلو می‌رود','Tag فقط در GitHub وجود دارد','Branch دائمی است و Tag موقت'], a:1, why:'Tag نقطهٔ تاریخی ثابت است، Branch خط زمانی متحرک.'},
{q:'برای انتشار رسمی کدام نوع Tag مناسب‌تر است؟', o:['Lightweight','Annotated','هر دو یکسان','هیچ‌کدام؛ Release کافی است'], a:1, why:'Annotated نام سازنده، تاریخ و پیام را ثبت می‌کند و برای نسخه‌های رسمی استاندارد است.'},
{q:'Tag ساختی ولی روی GitHub نیست. چرا؟', o:['GitHub تأخیر دارد','Tagها با git push معمولی فرستاده نمی‌شوند؛ باید git push origin TAGNAME یا --tags بزنی','Tag باید Annotated باشد','باید Repo را Public کنی'], a:1, why:'Push پیش‌فرض فقط Commitهای شاخه را می‌فرستد؛ Tag جدا Push می‌شود.'},
{q:'یک توکن را حذف و نامش را عوض کرده‌ای. کدام بخش نسخه باید زیاد شود؟', o:['PATCH','MINOR','MAJOR','هیچ‌کدام'], a:2, why:'این یک Breaking Change است: مصرف‌کننده باید کدش را تغییر دهد، پس MAJOR.'},
{q:'واریانت جدیدی به دکمه اضافه کرده‌ای بدون خراب‌کردن چیزی. نسخه از 1.4.2 به چه می‌رود؟', o:['2.0.0','1.5.0','1.4.3','1.4.2'], a:1, why:'قابلیت جدید سازگار با قبل = افزایش MINOR و صفرشدن PATCH.'},
{q:'Release Note چیست؟', o:['پیام Commit','توضیح انسانی تغییرات یک نسخه در صفحهٔ Release','نام دیگر Tag','فایل تنظیمات'], a:1, why:'Release Note به کاربران می‌گوید در این نسخه چه چیزی اضافه، اصلاح یا شکسته شده است.'}
]},
{ id:18, title:'GitHub Issues و مدیریت کار', branch:'chore/issues', subtitle:'جایی که کار تعریف می‌شود، پیش می‌رود و به تغییر واقعی وصل می‌شود.',
body:`
<h3>Issue چیست؟</h3>
<p><strong>Issue</strong> یک واحد کار یا گفت‌وگو در Repo است: یک باگ، یک درخواست قابلیت، یا یک تسک. هر Issue شماره دارد (<code>#42</code>)، قابل جست‌وجو است و کنار خود کد زندگی می‌کند — نه در چتی که فردا گم می‌شود.</p>
<h3>سه نوع رایج</h3>
<ul>
<li><strong>Bug Report:</strong> چه دیدی، چه انتظار داشتی، چطور تکرارش کنیم (+ اسکرین‌شات).</li>
<li><strong>Feature Request:</strong> چه مسئله‌ای، برای چه کسی، چرا حالا.</li>
<li><strong>Task:</strong> کار مشخص و محدود، مثلاً «توکن‌های spacing را مستند کن».</li>
</ul>
<h3>ابزارهای سازمان‌دهی</h3>
<ul>
<li><strong>Label:</strong> برچسب دسته‌بندی (bug، design، tokens، a11y).</li>
<li><strong>Milestone:</strong> گروهی از Issueها برای یک هدف یا نسخه (مثلاً v2.0).</li>
<li><strong>Assignee:</strong> مسئول انجام.</li>
<li><strong>Issue Template:</strong> فرم آماده که فیلدهای لازم را از قبل می‌پرسد. یک <strong>Design Task Template</strong> خوب می‌پرسد: مسئله، مخاطب، Stateهای موردنیاز، لینک Figma، معیار پذیرش.</li>
</ul>
<h3>وصل‌کردن Issue به Pull Request</h3>
<p>در توضیحات یا Commit Message از کلیدواژه‌ها استفاده کن تا با Merge شدن PR، Issue خودکار بسته شود:</p>
<pre><code>Closes #42
Fixes #17
Resolves #103</code></pre>
<p>حتی اشارهٔ ساده به <code>#42</code> هم لینک دوطرفه می‌سازد تا مسیر «مسئله ← تغییر» قابل ردیابی بماند.</p>
<h3>GitHub Projects</h3>
<p>نمای <strong>Board</strong> (کانبان) روی Issueها و PRها: ستون‌های Status (Todo / In Progress / In Review / Done) و فیلدهایی مثل Priority. مزیتش نسبت به ابزار جدا این است که وضعیت کارت‌ها با فعالیت واقعی در Repo همگام می‌شود.</p>
<div class="callout note"><span class="co-title">ارتباط Design Decision با Issue</span>تصمیم‌های طراحی را در Issue مربوطه ثبت کن، نه فقط در فایل Figma. شش ماه بعد کسی که می‌پرسد «چرا این‌طوری شد؟» با یک جست‌وجو، بحث، گزینه‌های رد‌شده و PR نهایی را کنار هم پیدا می‌کند.</div>
`,
quiz:[
{q:'Issue در GitHub چیست؟', o:['خطای سیستمی Git','واحد کار یا گفت‌وگو (باگ، قابلیت، تسک) که کنار کد ثبت و پیگیری می‌شود','نام دیگر Commit','هشدار امنیتی'], a:1, why:'Issue ابزار مدیریت کار داخل Repo است و به تغییرات واقعی کد لینک می‌شود.'},
{q:'برای بسته‌شدن خودکار Issue #42 با Merge شدن PR چه می‌نویسی؟', o:['#42 done','Closes #42','close-issue 42','@42'], a:1, why:'کلیدواژه‌های Closes/Fixes/Resolves + شمارهٔ Issue این اتصال خودکار را می‌سازند.'},
{q:'Milestone برای چیست؟', o:['برچسب رنگی','گروه‌بندی Issueها حول یک هدف یا نسخه','تعیین مسئول','بستن خودکار Issue'], a:1, why:'Milestone پیشرفت مجموعه‌ای از کارها به‌سمت یک نسخه یا هدف را نشان می‌دهد.'},
{q:'مزیت اصلی ثبت تصمیم‌های طراحی در Issue به‌جای چت تیمی؟', o:['سرعت بیشتر','ماندگاری، قابلیت جست‌وجو و اتصال مستقیم به تغییر کد','زیبایی بیشتر','اجباری بودن'], a:1, why:'Issue همراه پروژه بایگانی می‌شود و به PR و Commit مربوطه لینک می‌خورد.'},
{q:'Design Task Template خوب چه چیزی می‌پرسد؟', o:['فقط عنوان','مسئله، مخاطب، Stateهای لازم، لینک Figma و معیار پذیرش','نام طراح و ساعت کار','فقط لینک Figma'], a:1, why:'Template جلوی تسک‌های مبهم را می‌گیرد و اطلاعات لازم را از ابتدا جمع می‌کند.'}
]},
{ id:19, title:'Collaboration', branch:'team/workflow', subtitle:'قواعد بازی وقتی چند نفر روی یک Repo کار می‌کنند.',
body:`
<h3>Fork چیست؟</h3>
<p><strong>Fork</strong> یعنی ساختن کپی کاملی از Repo شخص دیگر <strong>در حساب GitHub خودت</strong>. چون معمولاً اجازهٔ Push مستقیم به Repo دیگران را نداری، تغییرات را در Fork خودت انجام می‌دهی و بعد از آنجا PR می‌فرستی.</p>
<table><tr><th></th><th>Fork</th><th>Clone</th></tr>
<tr><td>کجا کپی می‌شود؟</td><td>در حساب GitHub تو (سرور)</td><td>روی کامپیوتر تو (محلی)</td></tr>
<tr><td>کِی؟</td><td>وقتی دسترسی نوشتن نداری (پروژه‌های Open Source)</td><td>همیشه؛ برای کارکردن روی هر Repo</td></tr></table>
<h3>Contributor Workflow</h3>
<pre><code>1. Fork  →  2. Clone فورک خودت  →  3. Branch جدید
4. تغییر + Commit  →  5. Push به فورک  →  6. باز کردن PR به Repo اصلی</code></pre>
<p>در تیم داخلی که دسترسی نوشتن داری، Fork لازم نیست: مستقیم Branch می‌سازی و PR می‌دهی.</p>
<h3>سطوح دسترسی</h3>
<ul>
<li><strong>Read:</strong> دیدن و Clone؛ بدون Push.</li>
<li><strong>Write:</strong> ساخت Branch، Push و باز کردن PR — دسترسی معمول یک عضو تیم.</li>
<li><strong>Admin:</strong> تنظیمات Repo، مدیریت دسترسی‌ها و قوانین Branch.</li>
</ul>
<p><strong>Collaborator</strong> کسی است که به Repo دسترسی داده شده. <strong>Code Owner</strong> (تعریف‌شده در فایل <code>CODEOWNERS</code>) یعنی صاحب مسئولیت بخش‌های مشخصی از پروژه؛ مثلاً هر PR که فایل توکن‌ها را تغییر دهد، خودکار طراح سیستم را به‌عنوان Reviewer اضافه می‌کند.</p>
<h3>Protected Branch</h3>
<p>قوانینی که روی main گذاشته می‌شود تا کسی نتواند سهواً خرابش کند:</p>
<ul>
<li><strong>جلوگیری از Push مستقیم:</strong> هر تغییر فقط از راه PR.</li>
<li><strong>Required Review:</strong> بدون حداقل یک Approve، دکمهٔ Merge غیرفعال است.</li>
<li><strong>Required Status Check:</strong> تست‌ها و Buildها باید سبز باشند.</li>
</ul>
<h3>قراردادهای تیمی</h3>
<ul>
<li><strong>Branching Convention:</strong> الگوی نام‌گذاری مشترک (<code>feature/</code>، <code>fix/</code>).</li>
<li><strong>Definition of Done:</strong> توافق تیم بر اینکه «تمام‌شده» یعنی چه — مثلاً: Review شده، Stateها پوشش دارد، مستند شده، Checkها سبزند.</li>
<li><strong>Review Etiquette:</strong> روی کار نظر بده نه روی آدم؛ مشخص و قابل‌اجرا بنویس؛ بین «باید» و «پیشنهاد سلیقه‌ای» تفاوت بگذار؛ نکات خوب را هم بگو؛ سریع جواب بده چون PR معطل، تیم را کند می‌کند.</li>
</ul>
`,
quiz:[
{q:'Fork چه فرقی با Clone دارد؟', o:['Fork کپی محلی است، Clone ابری','Fork کپی Repo در حساب GitHub توست؛ Clone کپی روی کامپیوتر تو','هیچ فرقی ندارند','Fork فقط برای Repoهای خصوصی است'], a:1, why:'Fork اتفاقی سمت سرور است تا جایی برای Push داشته باشی؛ Clone کپی محلی برای کار است.'},
{q:'کی به Fork نیاز داری؟', o:['همیشه','وقتی دسترسی Write به Repo اصلی نداری (مثل پروژه‌های Open Source)','وقتی اینترنت کند است','برای هر Branch جدید'], a:1, why:'با دسترسی Write داخل تیم، مستقیم Branch می‌سازی و Fork لازم نیست.'},
{q:'Protected Branch روی main معمولاً چه چیزی را الزام می‌کند؟', o:['حجم کم فایل‌ها','ورود تغییرات فقط از راه PR، همراه Review و Checkهای موفق','استفاده از Rebase','Commit روزانه'], a:1, why:'هدف این است که هیچ تغییر بررسی‌نشده‌ای مستقیم روی شاخهٔ اصلی ننشیند.'},
{q:'فایل CODEOWNERS چه می‌کند؟', o:['لیست کارمندان را نگه می‌دارد','مسئول هر بخش از پروژه را تعیین می‌کند و او را خودکار به Reviewerهای PR مربوطه اضافه می‌کند','دسترسی Admin می‌دهد','Commitها را امضا می‌کند'], a:1, why:'مثلاً هر تغییر در پوشهٔ توکن‌ها، طراح سیستم را به‌عنوان Reviewer فرا می‌خواند.'},
{q:'Definition of Done یعنی؟', o:['تاریخ تحویل','توافق تیم بر معیارهای مشخص «تمام‌شده» بودن یک کار','آخرین Commit','بسته‌شدن Issue'], a:1, why:'بدون معیار مشترک، هر کس تعریف متفاوتی از «تمام شد» دارد.'},
{q:'کدام بازخورد Review حرفه‌ای‌تر است؟', o:['«این کار اشتباهه.»','«این فاصله ۱۶ است ولی توکن spacing-md برابر ۲۴ است؛ برای هماهنگی با کارت‌ها بهتر است از توکن استفاده کنیم.»','«چرا این‌قدر بی‌دقتی؟»','«بعداً حرف می‌زنیم.»'], a:1, why:'بازخورد خوب مشخص، قابل‌اجرا و متمرکز بر کار است، نه شخص.'}
]},
{ id:20, title:'امنیت', branch:'security/hardening', subtitle:'یک کلید لورفته گران‌ترین Commit عمر توست.',
body:`
<h3>Secret چیست؟</h3>
<p><strong>Secret</strong> هر اطلاعاتی است که فقط باید در اختیار سیستم‌های مجاز باشد: <strong>API Key</strong>، <strong>Access Token</strong>، پسورد دیتابیس، کلید خصوصی. قانون ساده: Secret هرگز نباید داخل کد یا تاریخچهٔ Git باشد.</p>
<h3>روش درست: فایل env.</h3>
<pre><code><span class="c"># .env  ← در .gitignore، هرگز Commit نمی‌شود</span>
FIGMA_TOKEN=figd_xxxxxxxx

<span class="c"># .env.example  ← این Commit می‌شود (فقط نام متغیرها، بدون مقدار)</span>
FIGMA_TOKEN=</code></pre>
<h3>اگر Secret لو رفت</h3>
<ol>
<li><strong>فوراً Revoke کن</strong> و کلید جدید بساز. این مهم‌ترین قدم است؛ چون هر چیزی که یک بار Push شده، ممکن است دیده و ذخیره شده باشد.</li>
<li>فایل را از ردگیری خارج کن و به gitignore اضافه کن.</li>
<li>در صورت نیاز، تاریخچه را پاک‌سازی کن (ابزارهایی مثل git-filter-repo)؛ ولی این جایگزین قدم اول نیست.</li>
</ol>
<h3>سپرهای خودکار GitHub</h3>
<ul>
<li><strong>Secret Scanning:</strong> GitHub الگوی توکن‌های شناخته‌شده را در Push پیدا می‌کند و هشدار می‌دهد (و در برخی موارد سرویس‌دهنده را مطلع می‌کند تا کلید باطل شود).</li>
<li><strong>Dependabot:</strong> وابستگی‌های پروژه را رصد می‌کند و برای نسخه‌های آسیب‌پذیر <strong>Dependency Alert</strong> و حتی PR ارتقا می‌سازد.</li>
</ul>
<h3>بهداشت دسترسی</h3>
<ul>
<li><strong>Private در برابر Public:</strong> پیش‌فرض را Private بگذار مگر اینکه عمداً بخواهی عمومی باشد. Public یعنی هر کسی روی اینترنت می‌بیند.</li>
<li><strong>Repository Permission:</strong> حداقل دسترسی لازم را بده (Read برای ناظر، Write برای عضو فعال).</li>
<li><strong>SSH Key Security:</strong> کلید خصوصی را با پسفریز بساز، هرگز کپی‌اش نکن و کلیدهای دستگاه‌های قدیمی را از GitHub حذف کن.</li>
<li><strong>PAT Scope و Expiration:</strong> توکن را با کمترین دسترسی ممکن و کوتاه‌ترین عمر معقول بساز؛ توکن بی‌انقضا با دسترسی کامل، بدترین ترکیب است.</li>
<li><strong>Branch Protection:</strong> علاوه بر کیفیت، یک لایهٔ امنیتی است: هیچ تغییری بدون Review وارد main نمی‌شود.</li>
<li><strong>Signed Commit:</strong> امضای رمزنگاری‌شدهٔ Commit که ثابت می‌کند واقعاً از طرف تو ثبت شده؛ در Repoهای حساس نشان Verified می‌گیرد.</li>
</ul>
<div class="callout warn"><span class="co-title">اسکرین‌شات‌ها را چک کن</span>طراح‌ها بیشتر از همه اسکرین‌شات می‌گذارند. قبل از پیوست به PR یا Issue مطمئن شو این‌ها در تصویر نیستند: توکن و کلید در Terminal یا DevTools، ایمیل و اطلاعات کاربران واقعی، آدرس محیط‌های داخلی، و اطلاعات شخصی در تب‌ها و نوتیفیکیشن‌ها.</div>
`,
quiz:[
{q:'API Key واقعی را در فایل Commit کرده و Push کرده‌ای. اولین کار؟', o:['فایل را حذف و Commit جدید بزنی','فوراً کلید را Revoke کنی و کلید جدید بسازی','Repo را Private کنی','منتظر هشدار GitHub بمانی'], a:1, why:'کلید افشاشده باید باطل شود؛ حذف فایل، آن را از تاریخچه و از دست کسانی که دیده‌اند خارج نمی‌کند.'},
{q:'کدام فایل باید Commit شود؟', o:['env.','env.example. با نام متغیرها و بدون مقدار','هر دو','هیچ‌کدام'], a:1, why:'example. ساختار پیکربندی را مستند می‌کند بدون افشای مقادیر حساس.'},
{q:'Dependabot چه می‌کند؟', o:['کد را فرمت می‌کند','وابستگی‌های آسیب‌پذیر را پیدا و هشدار/PR ارتقا تولید می‌کند','Commitها را امضا می‌کند','Branch را محافظت می‌کند'], a:1, why:'Dependabot امنیت زنجیرهٔ وابستگی‌ها را رصد می‌کند.'},
{q:'اصل درست ساخت Personal Access Token؟', o:['بیشترین دسترسی و بدون انقضا برای راحتی','کمترین دسترسی لازم (Scope) و کوتاه‌ترین عمر معقول','یکی برای همهٔ اعضای تیم','ذخیره در Repo برای دسترسی راحت'], a:1, why:'اصل حداقل دسترسی خسارت احتمالی افشا را محدود می‌کند.'},
{q:'قبل از پیوست‌کردن اسکرین‌شات به PR، مراقب چه چیزی باید بود؟', o:['رزولوشن تصویر','توکن‌ها در Terminal/DevTools، داده‌های واقعی کاربران و آدرس محیط‌های داخلی','فرمت فایل','اندازهٔ فونت'], a:1, why:'افشای اطلاعات از راه تصویر همان‌قدر خطرناک است که Commit کردن Secret.'},
{q:'Signed Commit چه چیزی را تضمین می‌کند؟', o:['کیفیت کد','اصالت هویت ثبت‌کنندهٔ Commit','نبود Conflict','عبور از تست‌ها'], a:1, why:'امضای رمزنگاری‌شده ثابت می‌کند Commit واقعاً از طرف صاحب کلید ثبت شده است.'}
]},
{ id:21, title:'Git برای پروژه‌های AI', branch:'ai/safe-workflow', subtitle:'وقتی بخشی از کد را ماشین می‌نویسد، Git به سیستم کنترل کیفیت تبدیل می‌شود.',
body:`
<h3>چرا Git اینجا حیاتی است؟</h3>
<p>کد تولیدشده با AI سریع، حجیم و گاهی فراتر از چیزی است که خواسته‌ای. Git سه چیز می‌دهد که بدون آن‌ها کار با Agentها بی‌مهار است: <strong>نقطهٔ بازگشت</strong>، <strong>Diff قابل بررسی</strong> و <strong>فضای جدا برای آزمایش</strong>.</p>
<h3>پروتکل ایمن کار با Agent</h3>
<pre><code>1. git status            <span class="c"># مطمئن شو چیز Commit‌نشده‌ای معلق نیست</span>
2. git commit            <span class="c"># نقطهٔ بازگشت سالم بساز</span>
3. git switch -c experiment/ai-onboarding   <span class="c"># شاخهٔ جدا برای آزمایش</span>
4. <span class="c">← اجرای Prompt / Agent</span>
5. git diff              <span class="c"># خط‌به‌خط بررسی کن؛ چیزی خارج از Scope هست؟</span>
6. git add -p            <span class="c"># فقط تغییرات درست را Stage کن</span>
7. git commit            <span class="c"># با پیام شفاف، و ذکر اینکه AI-assisted بوده</span></code></pre>
<h3>چک‌لیست بررسی خروجی AI</h3>
<ul>
<li><strong>تغییر خارج از Scope:</strong> فایل‌هایی که نباید دست می‌خوردند تغییر کرده‌اند؟ بازنویسی سرخود بخش‌های سالم؟</li>
<li><strong>Dependencyهای اضافه‌شده:</strong> هر پکیج جدید در <code>package.json</code> باید ضروری و قابل‌اعتماد باشد.</li>
<li><strong>فایل‌های Config:</strong> تغییر تنظیمات build/lint اثر سراسری دارد.</li>
<li><strong>Security Risk:</strong> کلید یا توکن نمونه در کد، فراخوانی سرویس ناشناس، غیرفعال‌کردن محافظت‌ها.</li>
<li><strong>حذف تصادفی:</strong> بلوک‌های قرمز بزرگ در Diff را جدی بگیر.</li>
</ul>
<h3>ثبت زمینهٔ تولید (Prompt Changelog)</h3>
<p>برای تکرارپذیری و شفافیت، اطلاعات تولید را در Repo نگه دار: Promptی که استفاده شد، مدل و نسخه‌اش، و Context و Constraintهایی که دادی. یک فایل ساده مثل <code>ai/prompts.md</code> کافی است:</p>
<pre><code>## 2026-04-02 — Empty state component
Model: claude-opus-5
Prompt: «کامپوننت EmptyState با توکن‌های موجود بساز؛ رنگ خام ننویس.»
Constraints: بدون کتابخانهٔ جدید، RTL-safe
Outcome: پذیرفته‌شده با اصلاح spacing (PR #128)</code></pre>
<h3>مقایسهٔ چند خروجی</h3>
<p>می‌خواهی دو راه‌حل AI را بسنجی؟ هر خروجی را در شاخهٔ جداگانه بگذار (<code>experiment/ai-a</code> و <code>experiment/ai-b</code>)، هر کدام را Commit کن و با <code>git diff experiment/ai-a experiment/ai-b</code> یا Preview هر شاخه مقایسه کن. شاخهٔ بازنده حذف می‌شود، بدون هیچ ردی روی main.</p>
<h3>حاکمیت: Agent در تیم</h3>
<ul>
<li><strong>محدودکردن دسترسی:</strong> Agent نباید کلید تولید (production) داشته باشد یا اجازهٔ Push مستقیم به main.</li>
<li><strong>Agent-generated Commit/PR:</strong> در پیام Commit یا توضیح PR مشخص کن که خروجی با کمک AI تولید شده و چه کسی بازبینی کرده است.</li>
<li><strong>Human Review اجباری:</strong> Branch Protection را طوری تنظیم کن که هیچ تغییر AI بدون تأیید انسان Merge نشود.</li>
</ul>
<div class="callout tip"><span class="co-title">جمع‌بندی</span>مهارت اصلی طراح در دورهٔ AI، نوشتن Prompt نیست؛ <strong>خواندن Diff</strong> و داشتن نقطهٔ بازگشت است.</div>
`,
quiz:[
{q:'قبل از اجرای یک Prompt بزرگ روی پروژه، مهم‌ترین کار؟', o:['بستن همهٔ فایل‌ها','Commit کردن وضعیت سالم و کار در شاخهٔ جدا','پاک‌کردن تاریخچه','Push کردن به main'], a:1, why:'Commit نقطهٔ بازگشت می‌سازد و شاخهٔ جدا main را از آزمایش ناموفق مصون نگه می‌دارد.'},
{q:'AI فایل‌هایی را تغییر داده که در درخواستت نبودند. اسم این مشکل؟', o:['Merge Conflict','تغییر خارج از Scope','Fast-forward','Detached HEAD'], a:1, why:'خروج از دامنهٔ درخواست، رایج‌ترین ریسک خروجی Agentهاست و در Diff قابل تشخیص است.'},
{q:'می‌خواهی دو راه‌حل مختلف AI را مقایسه کنی. بهترین ساختار؟', o:['هر دو را روی main Commit کنی','هر خروجی در شاخهٔ جدا، سپس مقایسه با diff یا Preview','فایل‌ها را در دو پوشه کپی کنی','فقط اولی را نگه داری'], a:1, why:'شاخه‌های موازی مقایسه و دورانداختن گزینهٔ بازنده را بدون آلوده‌کردن main ممکن می‌کنند.'},
{q:'در Prompt Changelog چه چیزی ثبت می‌کنی؟', o:['فقط تاریخ','Prompt، مدل و نسخه، Constraintها و نتیجه','نام کاربر GitHub','تعداد خطوط کد'], a:1, why:'این اطلاعات خروجی را تکرارپذیر و تصمیم‌ها را قابل بازبینی می‌کند.'},
{q:'کدام سیاست برای Agent در تیم درست است؟', o:['دسترسی کامل Admin برای سرعت','دسترسی محدود، بدون Push مستقیم به main و با Human Review اجباری','بدون هیچ محدودیتی','ممنوعیت کامل استفاده'], a:1, why:'اصل حداقل دسترسی + بازبینی انسانی، سرعت را حفظ می‌کند بدون واگذاری کنترل.'},
{q:'مهم‌ترین مهارت Git برای طراحی که با AI کار می‌کند؟', o:['حفظ‌کردن همهٔ دستورها','خواندن دقیق Diff و داشتن نقطهٔ بازگشت','نوشتن Pipeline','تسلط بر Git Internals'], a:1, why:'ارزیابی خروجی و امکان بازگشت، دو ستون کار امن با AI هستند.'}
]},
{ id:22, title:'Git برای Prototypeها', branch:'prototype/variants', subtitle:'چند نسخهٔ زنده و قابل‌مقایسه، بدون پوشه‌های final-v7.',
body:`
<h3>Repository برای Prototype</h3>
<p>پروتوتایپ کد یک Repo مستقل و سبک می‌خواهد؛ جایی که آزادی آزمایش داشته باشی بدون فشار استانداردهای محصول. توصیهٔ عملی: <strong>Prototype و Production را جدا نگه دار</strong> تا کد اکتشافی سهواً وارد محصول نشود و کدهای موقتی، Review تیم را کند نکنند.</p>
<h3>هر ایده، یک شاخه</h3>
<ul>
<li><strong>Variant:</strong> <code>prototype/nav-tabs</code> و <code>prototype/nav-drawer</code> برای مقایسهٔ دو راه‌حل.</li>
<li><strong>User Flow:</strong> <code>prototype/checkout-one-step</code> برای یک مسیر کامل.</li>
<li><strong>Stakeholder Version:</strong> نسخه‌ای که برای ارائه ساده یا آماده شده.</li>
<li><strong>User Test:</strong> <code>prototype/test-round-2</code> که در طول تست دست‌نخورده می‌ماند تا نتایج معتبر باشند.</li>
</ul>
<p>شاخهٔ <strong>main در Repo پروتوتایپ</strong> را به‌عنوان <strong>Stable Version</strong> نگه دار: نسخه‌ای که همیشه کار می‌کند و می‌توانی بدون استرس به کسی نشان دهی.</p>
<h3>Deploy هر Branch و Preview URL</h3>
<p>سرویس‌های میزبانی (مثل Vercel یا Netlify و همچنین GitHub Pages) می‌توانند به Repo وصل شوند و برای هر شاخه یا هر PR یک <strong>Preview URL</strong> زنده بسازند. اثرش برای طراح تحول‌آفرین است:</p>
<ul>
<li>لینک زنده به‌جای فایل zip یا اسکرین‌شات برای Stakeholder.</li>
<li>تست کاربر روی دستگاه واقعی کاربر.</li>
<li>مقایسهٔ همزمان دو واریانت در دو تب مرورگر.</li>
</ul>
<div class="example"><div class="ex-title">جریان کاری واقعی</div>
<pre><code>git switch -c prototype/nav-drawer
<span class="c"># ساخت واریانت ... </span>
git push -u origin prototype/nav-drawer
<span class="c"># Preview URL خودکار ساخته می‌شود → لینک را برای تیم بفرست</span>
<span class="c"># بازخوردها را در PR یا Issue همان شاخه ثبت کن</span></code></pre></div>
<h3>ثبت بازخورد و سرنوشت هر نسخه</h3>
<p>برای هر واریانت یک PR (حتی Draft) باز کن و بازخوردها، نتایج تست و تصمیم نهایی را همان‌جا بنویس. بعد از تصمیم:</p>
<ul>
<li><strong>برنده:</strong> Merge به main پروتوتایپ.</li>
<li><strong>بازنده:</strong> شاخه را حذف کن — تاریخچه و مستندات بحثش در PR بسته‌شده باقی می‌ماند.</li>
<li><strong>Rollback:</strong> اگر نسخهٔ جدید در ارائه بد از آب درآمد، با revert یا برگشت به Tag نسخهٔ پایدار، سریع به عقب برگرد.</li>
</ul>
<h3>تبدیل Prototype به Production</h3>
<p>کد پروتوتایپ معمولاً مستقیم به محصول نمی‌رود؛ ولی ارزشش هم دور ریخته نمی‌شود: پروتوتایپ نقش <strong>مشخصات اجرایی</strong> را دارد — رفتار، انیمیشن، Stateها و Edge Caseها را دقیق نشان می‌دهد. در PR انتقال، به شاخه یا Commit پروتوتایپ لینک بده تا دولوپر مرجع دقیق داشته باشد.</p>
`,
quiz:[
{q:'چرا Repo پروتوتایپ را از Production جدا نگه می‌داریم؟', o:['برای صرفه‌جویی در فضا','تا کد اکتشافی سهواً وارد محصول نشود و آزادی آزمایش حفظ شود','چون Git دو نوع Repo دارد','برای سرعت بیشتر Clone'], a:1, why:'استانداردهای پروتوتایپ و محصول متفاوت‌اند؛ جداسازی هر دو را سالم نگه می‌دارد.'},
{q:'Preview URL چه امکانی می‌دهد؟', o:['ویرایش کد در مرورگر','لینک زندهٔ هر شاخه/PR برای ارائه، تست کاربر و مقایسهٔ واریانت‌ها','بکاپ خودکار','حذف شاخه'], a:1, why:'به‌جای فایل و اسکرین‌شات، نسخهٔ اجراشدنی واقعی را به‌سادگی به اشتراک می‌گذاری.'},
{q:'دو واریانت ناوبری را می‌خواهی با تیم بسنجی. ساختار درست؟', o:['هر دو در یک شاخه با کامنت کردن کد','هر واریانت در شاخهٔ جدا با Preview جداگانه','دو Repo مستقل','فقط اسکرین‌شات'], a:1, why:'شاخه‌های موازی مقایسهٔ همزمان و دورانداختن گزینهٔ بازنده را ساده می‌کنند.'},
{q:'واریانتی در تست کاربر رد شد. بهترین کار؟', o:['نگه‌داشتن ابدی شاخه','حذف شاخه و ثبت دلیل تصمیم در PR بسته‌شده','حذف کل Repo','Merge کردن با main'], a:1, why:'شاخهٔ مرده Repo را شلوغ می‌کند، ولی دانش تصمیم باید در PR ثبت و ماندگار بماند.'},
{q:'نقش درست پروتوتایپ در انتقال به محصول؟', o:['کدش عیناً کپی می‌شود','مرجع دقیق رفتار، Stateها و Edge Caseها برای پیاده‌سازی نهایی است','دور انداخته می‌شود','جایگزین Figma می‌شود'], a:1, why:'پروتوتایپ مشخصات اجرایی زنده است، حتی وقتی کدش قرار نیست عیناً استفاده شود.'}
]},
{ id:23, title:'Git برای Design System', branch:'ds/governance', subtitle:'وقتی خروجی طراحی تو کد است، Git می‌شود ابزار اصلی مدیریتش.',
body:`
<h3>چرا Design System بدون Version Control شکننده است؟</h3>
<p>Design System محصولی است با مصرف‌کننده‌های متعدد. بدون تاریخچه، نسخه‌بندی و Review، یک تغییر کوچک می‌تواند ده محصول را همزمان بشکند. Git به سه سؤال حیاتی جواب می‌دهد: چه چیزی تغییر کرد، چرا، و چطور برگردیم.</p>
<h3>Design Token Repository</h3>
<p>توکن‌ها معمولاً در فایل‌های JSON نگهداری می‌شوند و منبع تغذیهٔ همهٔ پلتفرم‌ها هستند:</p>
<pre><code>{
  "color": {
    "brand": { "value": "#0969DA" },
    "danger": { "value": "#CF222E" }
  },
  "spacing": { "md": { "value": "16px" } }
}</code></pre>
<p>هر تغییر توکن در Diff کاملاً شفاف است: یک خط قرمز و یک خط سبز. به همین دلیل Review توکن‌ها بسیار دقیق‌تر از فرستادن اسکرین‌شات رنگ در چت است.</p>
<h3>جریان کار تغییر کامپوننت</h3>
<pre><code>1. Issue: مسئله و دلیل تغییر
2. Branch: ds/button-focus-state
3. تغییر کامپوننت + به‌روزرسانی مستندات (Storybook)
4. PR با Before/After، Stateها و یادداشت a11y
5. Review طراح سیستم (Code Owner) + دولوپر
6. Merge → انتشار نسخهٔ جدید با Tag و Changelog</code></pre>
<h3>Breaking Change، Deprecation و Migration</h3>
<ul>
<li><strong>Breaking Change:</strong> تغییری که مصرف‌کننده مجبور به اصلاح کدش می‌شود (حذف توکن، تغییر نام prop) ← نسخهٔ MAJOR.</li>
<li><strong>Deprecation:</strong> مسیر مؤدبانه‌تر: اول عنصر قدیمی را «منسوخ» اعلام کن (با هشدار و جایگزین پیشنهادی) و در نسخهٔ بعدی حذفش کن.</li>
<li><strong>Migration Guide:</strong> راهنمای گام‌به‌گام «از نسخهٔ ۱ به ۲» با جدول قدیمی ← جدید. بدون آن، ارتقا برای تیم‌ها بسیار پرهزینه می‌شود.</li>
</ul>
<h3>مستندات و کیفیت</h3>
<ul>
<li><strong>Storybook:</strong> مستندات زندهٔ کامپوننت‌ها که کنار کد در همان Repo نگهداری و با هر PR به‌روز می‌شود. مستندات جدا از کد، همیشه عقب می‌ماند.</li>
<li><strong>Documentation Versioning:</strong> مستندات هر نسخه باید با کد همان نسخه بخواند؛ تیمی که روی v1 مانده باید مستندات v1 را ببیند.</li>
<li><strong>Visual Regression Test:</strong> اسکرین‌شات خودکار کامپوننت‌ها در هر PR و مقایسه با نسخهٔ قبل؛ تغییر بصری ناخواسته را قبل از Merge می‌گیرد.</li>
</ul>
<h3>حاکمیت (Governance)</h3>
<ul>
<li><strong>Contribution Guideline:</strong> فایلی که می‌گوید چطور پیشنهاد بدهند، چه چیزی لازم است و معیار پذیرش چیست.</li>
<li><strong>Code Owners:</strong> تغییر توکن‌ها یا کامپوننت‌های پایه، خودکار Review طراح سیستم را لازم می‌کند.</li>
<li><strong>Design Review در PR:</strong> ارزیابی طراحی همان‌جا و کنار خود تغییر ثبت می‌شود.</li>
<li><strong>ارتباط Figma و Repository:</strong> در هر PR به فریم Figma و در فایل Figma به Repo لینک بده تا دو دنیا به هم دوخته شوند.</li>
</ul>
`,
quiz:[
{q:'چرا Diff برای Review توکن‌ها ارزشمند است؟', o:['چون رنگی است','چون تغییر دقیق مقدارها را خط‌به‌خط و بدون ابهام نشان می‌دهد','چون JSON کوچک است','چون Figma ندارد'], a:1, why:'Diff تغییر «#0969DA به #0A6FD0» را صریح نشان می‌دهد؛ چیزی که در اسکرین‌شات قابل تشخیص نیست.'},
{q:'حذف یک توکن که محصولات دیگر از آن استفاده می‌کنند چه نوع تغییری است؟', o:['Patch','Breaking Change و نیازمند MAJOR','فقط یک اصلاح ظاهری','تغییر داخلی بی‌اثر'], a:1, why:'مصرف‌کننده مجبور به تغییر کد می‌شود؛ تعریف دقیق Breaking Change.'},
{q:'Deprecation یعنی؟', o:['حذف فوری','اعلام منسوخ‌شدن با معرفی جایگزین، پیش از حذف در نسخهٔ بعد','بازگرداندن نسخهٔ قبلی','قفل‌کردن کامپوننت'], a:1, why:'Deprecation به تیم‌ها فرصت مهاجرت تدریجی می‌دهد به‌جای شکستن ناگهانی.'},
{q:'Visual Regression Test چه چیزی را می‌گیرد؟', o:['خطای گرامری متن','تغییرات بصری ناخواسته با مقایسهٔ خودکار اسکرین‌شات‌ها','نشت حافظه','مشکلات شبکه'], a:1, why:'مقایسهٔ تصویری قبل/بعد در هر PR، تغییرات ظاهری پیش‌بینی‌نشده را قبل از Merge نشان می‌دهد.'},
{q:'چرا مستندات باید در همان Repo کد باشد؟', o:['برای صرفه‌جویی در هزینه','چون با هر PR همراه کد به‌روز می‌شود و عقب نمی‌ماند','چون GitHub اجباری کرده','برای امنیت بیشتر'], a:1, why:'مستندات جدا از کد به‌سرعت بی‌اعتبار می‌شود؛ در همان PR به‌روزرسانی می‌شود.'},
{q:'Migration Guide چه کاری می‌کند؟', o:['نسخهٔ قدیمی را حذف می‌کند','مسیر گام‌به‌گام ارتقا از نسخهٔ قبلی به جدید را توضیح می‌دهد','کد را خودکار تغییر می‌دهد','کاربران را مسدود می‌کند'], a:1, why:'بدون راهنمای مهاجرت، Breaking Change عملاً باعث ماندن تیم‌ها روی نسخهٔ قدیمی می‌شود.'}
]},
{ id:24, title:'Git برای Figma و Design Tokens', branch:'tokens/figma-sync', subtitle:'اتصال دنیای طراحی و کد؛ جایی که باید بدانی حقیقت کجاست.',
body:`
<h3>Figma Variables و Design Token</h3>
<p><strong>Figma Variables</strong> مقادیر نام‌دار (رنگ، فاصله، تایپوگرافی و...) در فایل طراحی‌اند. همین مفاهیم در کد به‌صورت <strong>Design Token</strong> در قالب JSON نگهداری می‌شوند. Sync یعنی این دو با هم بخوانند.</p>
<h3>Sync چطور کار می‌کند؟</h3>
<p>پلاگین‌های Figma (مثل Tokens Studio و پلاگین‌های مشابه) می‌توانند به یک Repo وصل شوند:</p>
<ul>
<li><strong>Push از Figma به GitHub:</strong> تغییرات متغیرها در یک شاخهٔ جدید Commit می‌شود و PR ساخته می‌شود.</li>
<li><strong>Pull از GitHub به Figma:</strong> مقادیر از Repo به فایل طراحی برمی‌گردد.</li>
<li><strong>یک‌طرفه یا دوطرفه:</strong> Sync دوطرفه امکان <strong>Token Conflict</strong> می‌سازد (هر دو طرف یک توکن را عوض کرده‌اند). ساده‌ترین سیاست برای تیم‌های کوچک: یک جهت را رسمی کن — معمولاً Figma منبع تغییر و Repo مقصد.</li>
</ul>
<h3>Source of Truth</h3>
<p>مهم‌ترین تصمیم این حوزه: <strong>حقیقت کجاست؟</strong></p>
<table><tr><th>Design Source of Truth (Figma)</th><th>Code Source of Truth (Repo)</th></tr>
<tr><td>طراح تغییر می‌دهد، کد دنبال می‌کند</td><td>Repo مرجع رسمی است، Figma با آن همگام می‌شود</td></tr>
<tr><td>سریع‌تر برای تیم‌های طراحی‌محور</td><td>مطمئن‌تر برای محصولات چندپلتفرمی و بزرگ</td></tr></table>
<p>انتخاب غلط نداریم؛ انتخاب <strong>نامشخص</strong> داریم. تیمی که این را روشن نکرده، دائم درگیر «کدام مقدار درست است؟» می‌شود.</p>
<h3>Branch و PR برای توکن‌ها</h3>
<p>تغییر رنگ برند یا مقیاس تایپوگرافی را هرگز مستقیم روی main نبر. شاخهٔ <code>tokens/brand-color-update</code> بساز و در PR بنویس: چه توکنی، مقدار قبلی و جدید، کجاها استفاده شده، و اسکرین‌شات اثر بصری.</p>
<h3>تغییر نام، حذف و Alias</h3>
<ul>
<li><strong>تغییر نام یا حذف توکن:</strong> Breaking Change است؛ نیاز به Deprecation، Migration Guide و نسخهٔ MAJOR دارد.</li>
<li><strong>Token Alias:</strong> توکنی که به توکن دیگری اشاره می‌کند — مثلاً <code>button-background → color-brand</code>. لایهٔ Alias (توکن‌های معنایی) باعث می‌شود تغییر مقدار پایه، همه‌جا به‌درستی منتشر شود بدون تغییر نام در کامپوننت‌ها.</li>
</ul>
<h3>Token Transformation و Style Dictionary</h3>
<p><strong>Style Dictionary</strong> ابزاری است که توکن‌های JSON را به فرمت هر پلتفرم تبدیل می‌کند: CSS Variables برای وب، XML برای اندروید، Swift برای iOS. یک منبع، چند خروجی؛ و چون این تبدیل در Repo انجام می‌شود، خروجی‌ها همیشه با منبع هماهنگ‌اند.</p>
<div class="callout tip"><span class="co-title">هنگام Review توکن در Diff چه ببینیم؟</span>آیا فقط مقدار عوض شده یا نام هم؟ (تغییر نام = Breaking) آیا توکن جدید با قرارداد نام‌گذاری می‌خواند؟ آیا Aliasها هنوز به توکن موجود اشاره می‌کنند؟ آیا فایل JSON معتبر مانده است؟</div>
`,
quiz:[
{q:'Source of Truth بودن Figma یعنی؟', o:['Repo حذف می‌شود','طراح در Figma تغییر می‌دهد و کد از آن پیروی می‌کند','فقط دولوپر اجازهٔ تغییر دارد','هر دو طرف همزمان مرجع‌اند'], a:1, why:'مرجع بودن یعنی جهت رسمی تغییر از آنجا شروع می‌شود؛ سمت دیگر همگام می‌شود.'},
{q:'خطر اصلی Sync دوطرفه؟', o:['کندی','Token Conflict وقتی هر دو طرف یک توکن را تغییر داده‌اند','افزایش حجم فایل','ازدست‌رفتن Branchها'], a:1, why:'بدون مرجع مشخص، تغییرات موازی به تضاد می‌رسند و باید دستی حل شوند.'},
{q:'Token Alias چیست؟', o:['نام مستعار فایل','توکنی که به توکن دیگری اشاره می‌کند (مثلاً button-background → color-brand)','نسخهٔ قدیمی توکن','توکن حذف‌شده'], a:1, why:'لایهٔ معنایی Alias باعث می‌شود تغییر مقدار پایه به‌درستی در کل سیستم منتشر شود.'},
{q:'Style Dictionary چه می‌کند؟', o:['فایل Figma را باز می‌کند','توکن‌های JSON را به فرمت‌های پلتفرم‌های مختلف (CSS، XML، Swift) تبدیل می‌کند','Conflict را حل می‌کند','Commit می‌سازد'], a:1, why:'یک منبع توکن، چند خروجی هماهنگ برای وب و موبایل.'},
{q:'تغییر نام یک توکن در Diff دیدی. چه معنایی دارد؟', o:['یک اصلاح ساده','احتمالاً Breaking Change که به Deprecation و راهنمای مهاجرت نیاز دارد','فقط تغییر ظاهری','باید بدون بررسی Approve شود'], a:1, why:'هر کدی که به نام قبلی وابسته است می‌شکند؛ پس مسیر رسمی تغییر شکننده باید طی شود.'},
{q:'تغییر رنگ برند را چطور وارد Repo می‌کنی؟', o:['مستقیم روی main','در شاخهٔ جدا با PR شامل مقدار قبلی/جدید، محل‌های استفاده و اسکرین‌شات اثر','با پیام در چت تیم','بدون توضیح، چون واضح است'], a:1, why:'تغییر توکن اثر سراسری دارد؛ باید مثل هر تغییر پرمخاطره Review شود.'}
]},
{ id:25, title:'GitHub Actions و CI/CD', branch:'ci/checks', subtitle:'در حد فهمیدن اینکه چرا PR قرمز شده و چه باید کرد.',
body:`
<h3>CI و CD چیست؟</h3>
<ul>
<li><strong>CI (Continuous Integration):</strong> با هر تغییر، به‌صورت خودکار بررسی می‌شود که پروژه سالم است (Build می‌شود، تست‌ها پاس می‌شوند، استانداردها رعایت شده).</li>
<li><strong>CD (Continuous Delivery/Deployment):</strong> تغییر تأییدشده به‌صورت خودکار منتشر یا آمادهٔ انتشار می‌شود.</li>
</ul>
<h3>GitHub Actions و واژگانش</h3>
<p><strong>GitHub Actions</strong> سیستم اجرای این کارهاست. ساختارش ساده است:</p>
<ul>
<li><strong>Workflow:</strong> کل فرایند خودکار (تعریف‌شده در فایلی داخل <code>.github/workflows/</code>).</li>
<li><strong>Trigger:</strong> چه چیزی آن را شروع می‌کند — مثلاً باز شدن PR یا Push به main.</li>
<li><strong>Job:</strong> یک واحد کار مستقل (مثلاً «تست»).</li>
<li><strong>Step:</strong> قدم‌های داخل هر Job (نصب وابستگی‌ها، اجرای دستور).</li>
</ul>
<pre><code>on: pull_request        <span class="c"># Trigger</span>
jobs:
  test:                 <span class="c"># Job</span>
    steps:              <span class="c"># Steps</span>
      - npm install
      - npm test</code></pre>
<h3>Checkهای رایج که در PR می‌بینی</h3>
<table><tr><th>Check</th><th>یعنی چه</th><th>وقتی قرمز شد یعنی</th></tr>
<tr><td>Build</td><td>پروژه ساخته می‌شود؟</td><td>خطای کد؛ نسخه اصلاً اجرا نمی‌شود</td></tr>
<tr><td>Test</td><td>تست‌ها پاس می‌شوند؟</td><td>رفتاری شکسته شده</td></tr>
<tr><td>Lint</td><td>قواعد نگارش کد رعایت شده؟</td><td>معمولاً اصلاح ساده و خودکار</td></tr>
<tr><td>Accessibility</td><td>قواعد a11y (کنتراست، نقش‌ها، لیبل‌ها)</td><td>مشکل دسترس‌پذیری — برای طراح مهم!</td></tr>
<tr><td>Visual Regression</td><td>تفاوت بصری با نسخهٔ قبل</td><td>یا باگ بصری، یا تغییر عمدی که باید تأیید شود</td></tr>
</table>
<h3>Preview Deployment و Deploy بعد از Merge</h3>
<p>یک Workflow می‌تواند برای هر PR یک <strong>Preview Deployment</strong> بسازد (همان Preview URL سطح ۲۲) و پس از Merge شدن به main، نسخهٔ اصلی را منتشر کند.</p>
<h3>وقتی PR قرمز می‌شود</h3>
<ol>
<li>روی نام Check کلیک کن و <strong>Action Log</strong> را باز کن.</li>
<li>معمولاً پیام خطا در انتهای لاگ و در خط‌های قرمز است.</li>
<li>اگر Lint است، اغلب با یک دستور خودکار درست می‌شود؛ اگر Visual Regression است، تصویر تفاوت را ببین و تصمیم بگیر عمدی بوده یا نه.</li>
<li>اصلاح را Commit و Push کن؛ Checkها خودکار دوباره اجرا می‌شوند.</li>
</ol>
<p><strong>Required Check</strong> یعنی Checkهایی که تا سبز نشوند دکمهٔ Merge فعال نمی‌شود. <strong>Secret در Actions</strong> هم جایی است که کلیدهای موردنیاز Workflow (بدون قرارگرفتن در کد) در تنظیمات Repo ذخیره می‌شوند.</p>
<div class="callout note"><span class="co-title">نقش تو</span>لازم نیست Pipeline بنویسی. باید بتوانی وضعیت Checkها را بخوانی، مشکل مربوط به طراحی (a11y و Visual Regression) را تشخیص بدهی و بدانی که «روی سیستم من کار می‌کند» جواب معتبری برای یک Check قرمز نیست.</div>
`,
quiz:[
{q:'CI در یک جمله؟', o:['انتشار خودکار روی سرور','بررسی خودکار سلامت پروژه با هر تغییر','ابزار طراحی','سیستم مدیریت تسک'], a:1, why:'Continuous Integration یعنی هر تغییر بلافاصله Build و تست می‌شود تا خرابی زود پیدا شود.'},
{q:'Trigger در GitHub Actions یعنی؟', o:['نتیجهٔ نهایی','رویدادی که Workflow را شروع می‌کند (مثل باز شدن PR)','خطای اجرا','نام Job'], a:1, why:'Trigger شرط شروع خودکار Workflow است.'},
{q:'Check مربوط به Accessibility قرمز شده. مسئولیت طراح؟', o:['ربطی به طراح ندارد','بررسی مشکل (کنتراست، لیبل، فوکوس) چون مستقیماً به تصمیم طراحی مربوط است','فقط Merge اجباری','غیرفعال‌کردن Check'], a:1, why:'خطاهای a11y معمولاً ریشهٔ طراحی دارند و طراح بهترین فرد برای اصلاحشان است.'},
{q:'Visual Regression قرمز شده ولی تغییر عمدی بوده. چه می‌کنی؟', o:['Check را حذف می‌کنی','تصویر تفاوت را بررسی و تغییر را به‌عنوان نسخهٔ مرجع جدید تأیید می‌کنی','PR را می‌بندی','تغییر را برمی‌گردانی'], a:1, why:'این Check تفاوت را گزارش می‌دهد نه لزوماً خطا؛ تأیید انسانی تعیین می‌کند عمدی بوده یا باگ.'},
{q:'Required Check یعنی؟', o:['Checkای که اختیاری است','Checkای که تا سبز نشود اجازهٔ Merge داده نمی‌شود','Check سریع','Check دستی'], a:1, why:'در Branch Protection تعیین می‌شود که کدام Checkها برای Merge الزامی‌اند.'},
{q:'اولین قدم برای فهمیدن دلیل قرمزشدن یک Check؟', o:['ری‌استارت کامپیوتر','باز کردن Action Log و خواندن پیام خطا','بستن PR','Push دوباره بدون تغییر'], a:1, why:'لاگ دقیقاً می‌گوید کدام مرحله و چرا شکست خورده است.'}
]},
{ id:26, title:'مرجع دستورهای خط فرمان', branch:'ref/cli', subtitle:'دستورهای ضروری روزمره و لایهٔ بعدی، در یک نگاه.',
body:`
<h3>لایهٔ اول: دستورهای ضروری</h3>
<p>این‌ها ۹۰٪ کار روزمرهٔ تو را پوشش می‌دهند:</p>
<table><tr><th>دستور</th><th>کار</th></tr>
<tr><td><code>git --version</code></td><td>بررسی نصب و نسخه</td></tr>
<tr><td><code>git config</code></td><td>تنظیم نام، ایمیل و رفتار Git</td></tr>
<tr><td><code>git init</code></td><td>ساخت Repository جدید</td></tr>
<tr><td><code>git clone</code></td><td>دریافت Repository موجود</td></tr>
<tr><td><code>git status</code></td><td>وضعیت فعلی — پرکاربردترین دستور</td></tr>
<tr><td><code>git add</code></td><td>Stage کردن تغییرات</td></tr>
<tr><td><code>git commit</code></td><td>ثبت در تاریخچه</td></tr>
<tr><td><code>git diff</code></td><td>مشاهدهٔ دقیق تغییرات</td></tr>
<tr><td><code>git log</code></td><td>مرور تاریخچه</td></tr>
<tr><td><code>git branch</code></td><td>مدیریت شاخه‌ها</td></tr>
<tr><td><code>git switch</code> / <code>git checkout</code></td><td>جابه‌جایی بین شاخه‌ها (switch مدرن‌تر)</td></tr>
<tr><td><code>git merge</code></td><td>ادغام شاخه‌ها</td></tr>
<tr><td><code>git remote</code></td><td>مدیریت آدرس‌های Remote</td></tr>
<tr><td><code>git fetch</code> / <code>git pull</code></td><td>دریافت تغییرات از Remote</td></tr>
<tr><td><code>git push</code></td><td>ارسال تغییرات به Remote</td></tr>
<tr><td><code>git restore</code></td><td>بازگرداندن فایل / خارج‌کردن از Stage</td></tr>
<tr><td><code>git revert</code></td><td>خنثی‌کردن امن یک Commit</td></tr>
<tr><td><code>git stash</code></td><td>ذخیرهٔ موقت تغییرات</td></tr>
<tr><td><code>git tag</code></td><td>نشانه‌گذاری نسخه</td></tr>
</table>
<h3>لایهٔ دوم: وقتی حرفه‌ای‌تر شدی</h3>
<ul>
<li><code>git show COMMIT</code> — جزئیات و تغییرات یک Commit مشخص.</li>
<li><code>git blame FILE</code> — هر خط فایل را چه کسی، در چه Commitی و کِی نوشته. برای فهمیدن «چرا این مقدار این‌طور است؟» بی‌نظیر است (نامش ترسناک است، کاربردش کاوشگرانه).</li>
<li><code>git reflog</code> — تاریخچهٔ حرکات HEAD؛ طناب نجات.</li>
<li><code>git reset</code> — بازنویسی تاریخچهٔ محلی (با احتیاط).</li>
<li><code>git rm</code> / <code>git mv</code> — حذف و جابه‌جایی همراه با ثبت در Stage.</li>
<li><code>git clean -n</code> — نمایش فایل‌های Untracked قابل حذف (<code>-f</code> واقعاً حذف می‌کند؛ برگشت‌ناپذیر).</li>
<li><code>git grep "text"</code> — جست‌وجوی سریع متن در فایل‌های Repo.</li>
<li><code>git shortlog -sn</code> — تعداد Commit به تفکیک نویسنده.</li>
<li><code>git archive</code> — خروجی zip از یک نسخه بدون تاریخچه (مناسب تحویل به بیرون).</li>
<li><code>git cherry-pick</code> و <code>git rebase</code> — سطح‌های بعدی.</li>
<li><code>git bisect</code> — یافتن Commitی که باگ را ایجاد کرده، با جست‌وجوی دودویی. اولویت پایین، ولی وقتی لازم شود، جادویی است.</li>
</ul>
<div class="callout tip"><span class="co-title">میان‌بُر مفید</span>هر دستوری را نمی‌دانی: <code>git help COMMAND</code> یا <code>git COMMAND -h</code>. و اگر گیر کردی، <code>git status</code> معمولاً خودش پیشنهاد قدم بعدی را می‌دهد.</div>
`,
quiz:[
{q:'می‌خواهی بفهمی چه کسی و چرا مقدار یک خط CSS را نوشته. کدام دستور؟', o:['git log','git blame styles.css','git diff','git show'], a:1, why:'blame برای هر خط، آخرین Commit و نویسنده‌اش را نشان می‌دهد و از آنجا به دلیل تغییر می‌رسی.'},
{q:'git clean -f چه می‌کند؟', o:['Cache را پاک می‌کند','فایل‌های Untracked را واقعاً حذف می‌کند (برگشت‌ناپذیر)','Commitها را پاک می‌کند','Stage را خالی می‌کند'], a:1, why:'قبل از آن حتماً با -n فهرست حذف‌شدنی‌ها را ببین؛ این فایل‌ها در Git ردی ندارند.'},
{q:'کدام دستور بیشتر از همه باید در روز استفاده شود؟', o:['git reset','git status','git rebase','git archive'], a:1, why:'status قطب‌نمای توست: کجایی، چه تغییری داری و قدم بعدی چیست.'},
{q:'git show در برابر git log؟', o:['یکی هستند','log فهرست Commitهاست؛ show جزئیات و تغییرات یک Commit مشخص','show فقط برای Tagهاست','log فقط آخرین Commit را نشان می‌دهد'], a:1, why:'log نمای کلی تاریخچه است، show ذره‌بین روی یک Commit.'},
{q:'git bisect برای چیست؟', o:['تقسیم شاخه','یافتن Commitی که باگ را وارد کرده با جست‌وجوی دودویی','تقسیم Commit بزرگ','دو نیم کردن فایل'], a:1, why:'با تست دودویی بین نسخهٔ سالم و خراب، سریع Commit مقصر را پیدا می‌کند.'}
]},
{ id:27, title:'Rebase', branch:'advanced/rebase', subtitle:'بازنویسی تاریخچه برای خط زمانی تمیز — فقط با دانستن قواعدش.',
body:`
<h3>Rebase چیست؟</h3>
<p><strong>Rebase</strong> یعنی برداشتن Commitهای شاخهٔ تو و «کاشتن دوبارهٔ» آن‌ها روی نوک یک شاخهٔ دیگر. نتیجه: انگار از همان ابتدا کارت را روی آخرین نسخهٔ main شروع کرده بودی.</p>
<pre><code>قبل:  main    o───o───A───B
                \\
      feature    o1──o2

بعد از rebase main:
      main    o───o───A───B
                          \\
      feature              o1'──o2'   <span class="c">← Commitهای بازنویسی‌شده</span></code></pre>
<h3>Merge یا Rebase؟</h3>
<table><tr><th></th><th>Merge</th><th>Rebase</th></tr>
<tr><td>تاریخچه</td><td>واقعی و غیرخطی، با Commit ادغام</td><td>خطی و تمیز (Linear History)</td></tr>
<tr><td>Commitها</td><td>دست‌نخورده می‌مانند</td><td>بازنویسی می‌شوند (هش جدید)</td></tr>
<tr><td>امنیت</td><td>همیشه امن</td><td>فقط روی شاخهٔ شخصی امن</td></tr>
</table>
<h3>به‌روزرسانی شاخهٔ محلی با Rebase</h3>
<pre><code>git switch feature/hero
git fetch origin
git rebase origin/main     <span class="c"># کارم را روی آخرین main بنشان</span></code></pre>
<h3>Interactive Rebase — نظافت قبل از PR</h3>
<pre><code>git rebase -i HEAD~4   <span class="c"># چهار Commit آخر را ویرایش کن</span></code></pre>
<p>ویرایشگری باز می‌شود و برای هر Commit یک فرمان انتخاب می‌کنی:</p>
<ul>
<li><strong>squash / fixup:</strong> ادغام Commit در Commit قبلی (fixup پیامش را دور می‌ریزد).</li>
<li><strong>reword:</strong> اصلاح پیام Commit.</li>
<li><strong>drop:</strong> حذف کامل یک Commit.</li>
<li><strong>ترتیب خط‌ها:</strong> جابه‌جا کردن خط‌ها یعنی تغییر ترتیب Commitها.</li>
</ul>
<h3>Conflict در Rebase</h3>
<p>چون Commitها یکی‌یکی دوباره اعمال می‌شوند، ممکن است چند بار Conflict ببینی — هر بار برای یک Commit:</p>
<pre><code><span class="c"># حل Conflict در فایل‌ها، سپس:</span>
git add FILE
git rebase --continue
<span class="c"># یا انصراف کامل و بازگشت به قبل:</span>
git rebase --abort</code></pre>
<h3>قانون طلایی و Force Push</h3>
<div class="callout warn"><span class="co-title">هرگز شاخهٔ عمومی را Rebase نکن</span>Rebase هش Commitها را عوض می‌کند. اگر شاخه‌ای را که دیگران رویش کار می‌کنند Rebase کنی، تاریخچهٔ آن‌ها با تو ناسازگار می‌شود و همه دچار دردسر می‌شوند. Rebase مال شاخهٔ شخصی و Push‌نشده (یا شاخه‌ای که فقط خودت رویش هستی) است.</div>
<p>بعد از Rebase، شاخهٔ محلی با نسخهٔ Remote واگرا می‌شود و Push معمولی رد می‌شود. راه درست:</p>
<pre><code>git push --force-with-lease
<span class="c"># اگر کسی در این فاصله چیزی Push کرده باشد، متوقف می‌شود</span>
<span class="c"># ❌ git push --force  ← کورکورانه بازنویسی می‌کند و کار دیگران را می‌بلعد</span></code></pre>
`,
quiz:[
{q:'Rebase در یک جمله؟', o:['حذف Commitهای اضافه','کاشتن دوبارهٔ Commitهای شاخهٔ تو روی نوک شاخهٔ دیگر برای تاریخچهٔ خطی','ادغام دو شاخه با Commit جدید','بازگرداندن فایل'], a:1, why:'Rebase پایهٔ (base) شاخه را جابه‌جا می‌کند و Commitها را دوباره اعمال (و بازنویسی) می‌کند.'},
{q:'چرا Rebase روی شاخهٔ عمومی خطرناک است؟', o:['کند است','هش Commitها عوض می‌شود و تاریخچهٔ همکارانی که آن شاخه را دارند ناسازگار می‌شود','GitHub پشتیبانی نمی‌کند','فایل‌ها حذف می‌شوند'], a:1, why:'بازنویسی تاریخچهٔ مشترک، نسخهٔ دیگران را از نسخهٔ جدید واگرا می‌کند.'},
{q:'با Interactive Rebase کدام کار ممکن نیست؟', o:['squash کردن چند Commit','تغییر پیام Commit (reword)','حذف یک Commit (drop)','بازگرداندن فایل حذف‌شده از Stash'], a:3, why:'Interactive Rebase ابزار ویرایش تاریخچهٔ Commitهاست، نه مدیریت Stash.'},
{q:'وسط Rebase به Conflict خوردی و حلش کردی. قدم بعد؟', o:['git commit','git add FILE سپس git rebase --continue','git merge --continue','git push'], a:1, why:'در Rebase به‌جای Commit جدید، با continue ادامهٔ اعمال Commitها را می‌دهی.'},
{q:'بعد از Rebase، Push چرا رد می‌شود و راه درست چیست؟', o:['اینترنت؛ دوباره تلاش کن','چون تاریخچه بازنویسی شده و با Remote واگراست؛ راه امن push --force-with-lease است','باید شاخه را حذف کنی','باید Merge کنی'], a:1, why:'--force-with-lease اگر کسی در این فاصله Push کرده باشد جلوی بازنویسی کار او را می‌گیرد، برخلاف --force.'},
{q:'تفاوت اصلی نتیجهٔ Merge و Rebase؟', o:['Merge سریع‌تر است','Merge تاریخچهٔ واقعی و غیرخطی با Commit ادغام می‌سازد؛ Rebase تاریخچهٔ خطی با Commitهای بازنویسی‌شده','Rebase امن‌تر است','هیچ تفاوتی ندارند'], a:1, why:'انتخاب بین ثبت دقیق واقعیت (Merge) و خوانایی خطی (Rebase) است.'}
]},
{ id:28, title:'Cherry-pick', branch:'advanced/cherry-pick', subtitle:'برداشتن دقیقاً یک Commit از یک شاخه و آوردنش به شاخهٔ دیگر.',
body:`
<h3>Cherry-pick چیست؟</h3>
<p>وقتی فقط <strong>یک Commit مشخص</strong> از یک شاخه را لازم داری — نه کل شاخه — از Cherry-pick استفاده می‌کنی. Git تغییرات آن Commit را برمی‌دارد و به‌صورت یک Commit جدید (با هش جدید) روی شاخهٔ فعلی اعمال می‌کند.</p>
<pre><code>git switch main
git cherry-pick a1b2c3d          <span class="c"># یک Commit</span>
git cherry-pick a1b2c3d f4e5d6c  <span class="c"># چند Commit</span></code></pre>
<h3>کاربردهای درست</h3>
<ul>
<li><strong>Hotfix:</strong> باگ فوری را در شاخهٔ فیچر رفع کرده‌ای و همان یک Commit باید فوراً روی main برود، بی‌آنکه بقیهٔ کار نیمه‌تمام برود.</li>
<li><strong>نجات یک تکه از شاخهٔ رهاشده:</strong> آزمایش شکست خورده ولی یک Commit مفید داشت.</li>
<li><strong>انتقال Commit به شاخهٔ درست:</strong> اشتباهاً روی main یا شاخهٔ اشتباه Commit زده‌ای.</li>
</ul>
<h3>Conflict و انصراف</h3>
<pre><code><span class="c"># در صورت Conflict: فایل‌ها را حل کن، سپس</span>
git add FILE
git cherry-pick --continue
<span class="c"># یا انصراف:</span>
git cherry-pick --abort</code></pre>
<h3>خطر تکرار Commit</h3>
<div class="callout warn"><span class="co-title">Commit دوقلو</span>Commit منتقل‌شده هش جدیدی دارد، یعنی از نظر Git با اصل یکی نیست. اگر بعداً همان شاخه را هم Merge کنی، «همان تغییر» دو بار در تاریخچه دیده می‌شود و احتمال Conflictهای گیج‌کننده بالا می‌رود.</div>
<h3>Cherry-pick یا Merge؟</h3>
<table><tr><th></th><th>Cherry-pick</th><th>Merge</th></tr>
<tr><td>چه می‌آورد؟</td><td>فقط Commitهای انتخابی</td><td>کل شاخه با تاریخچه‌اش</td></tr>
<tr><td>هش‌ها</td><td>جدید (کپی)</td><td>حفظ می‌شود</td></tr>
<tr><td>مناسبِ</td><td>موارد استثنایی و فوری</td><td>جریان کار عادی</td></tr>
</table>
<h3>کی از Cherry-pick استفاده نکنیم؟</h3>
<ul>
<li>به‌عنوان جریان کار روزمره به‌جای Merge — تاریخچه را تکه‌تکه و غیرقابل‌اعتماد می‌کند.</li>
<li>وقتی چندین Commit پشت‌سرهم لازم داری (به‌جایش شاخه را Merge یا Rebase کن).</li>
<li>وقتی Commit به Commitهای قبلی وابسته است؛ برداشتن تنهایی‌اش کد را می‌شکند.</li>
</ul>
`,
quiz:[
{q:'Cherry-pick چه می‌کند؟', o:['کل شاخه را ادغام می‌کند','تغییرات یک Commit مشخص را به‌صورت Commit جدید روی شاخهٔ فعلی اعمال می‌کند','Commit را حذف می‌کند','شاخه را کپی می‌کند'], a:1, why:'انتخاب گزینشی یک (یا چند) Commit، بدون آوردن کل شاخه.'},
{q:'مناسب‌ترین موقعیت برای Cherry-pick؟', o:['جریان کار روزانه به‌جای Merge','انتقال فوری یک Commit رفع باگ به main، بدون بردن بقیهٔ کار نیمه‌تمام','ادغام دو شاخهٔ کامل','بازگرداندن فایل حذف‌شده'], a:1, why:'کاربرد اصلی‌اش موارد استثنایی مثل Hotfix است.'},
{q:'چرا Cherry-pick می‌تواند به تاریخچهٔ گیج‌کننده منجر شود؟', o:['چون Commit را پاک می‌کند','چون Commit کپی‌شده هش جدید دارد و اگر بعداً شاخه Merge شود، همان تغییر دو بار ظاهر می‌شود','چون فقط روی main کار می‌کند','چون Conflict را نادیده می‌گیرد'], a:1, why:'Git دو Commit با هش متفاوت را دو چیز متفاوت می‌بیند، حتی اگر محتوایشان یکی باشد.'},
{q:'در Cherry-pick به Conflict خوردی و می‌خواهی منصرف شوی؟', o:['git merge --abort','git cherry-pick --abort','git reset --hard','git revert'], a:1, why:'هر عملیات نیمه‌تمام abort مخصوص خودش را دارد.'},
{q:'کدام مورد برای Cherry-pick نامناسب است؟', o:['یک Commit مستقل رفع باگ','مجموعه‌ای از Commitهای وابسته به هم که یک فیچر کامل را می‌سازند','Commit جامانده در شاخهٔ اشتباه','یک Commit مفید از شاخهٔ رهاشده'], a:1, why:'برای مجموعهٔ وابسته، Merge یا Rebase راه درست است؛ Cherry-pick تکه‌تکه کد را می‌شکند.'}
]},
{ id:29, title:'Git Internals', branch:'deep/internals', subtitle:'زیر کاپوت: Object Model، HEAD و ساختار تاریخچه.',
body:`
<div class="callout note"><span class="co-title">عمق بیشتر، همان مسیر دوره</span>این سطح از کار روزمره عمیق‌تر است، ولی بخشی از مسیر کامل دوره و شرط گواهی پایان است. اینجا می‌فهمی چرا Git این‌قدر مطمئن است و چرا تقریباً هیچ‌چیز گم نمی‌شود.</div>
<h3>Object Model — Git یک پایگاه‌دادهٔ ساده است</h3>
<p>Git در واقع یک انبار «شیء» است که هر شیء با <strong>Hash</strong> (یک <strong>SHA</strong>ی محاسبه‌شده از محتوایش) شناخته می‌شود. چهار نوع شیء اصلی:</p>
<ul>
<li><strong>Blob:</strong> محتوای یک فایل (بدون نام).</li>
<li><strong>Tree:</strong> یک پوشه؛ فهرستی از نام‌ها که به Blobها و Treeهای دیگر اشاره می‌کند.</li>
<li><strong>Commit Object:</strong> اشاره به یک Tree (عکس کل پروژه) + والد(ها) + نویسنده + پیام.</li>
<li><strong>Tag Object:</strong> برچسب Annotated.</li>
</ul>
<p>چون شناسه از محتوا ساخته می‌شود، تغییر یک بایت یعنی شیء کاملاً جدید با هش متفاوت؛ به همین دلیل هر تغییر در محتوا <strong>قابل‌تشخیص</strong> است و یکپارچگی تاریخچه را می‌توان راستی‌آزمایی کرد. توجه: این یعنی دستکاری «آشکار می‌شود»، نه اینکه تاریخچه تغییرناپذیر باشد — تاریخچهٔ محلی را همچنان می‌توان با <code>reset</code> یا <code>rebase</code> بازنویسی و با force push منتشر کرد؛ ولی چون هش‌ها عوض می‌شوند، این بازنویسی پنهان نمی‌ماند.</p>
<h3>Reference و HEAD</h3>
<p><strong>Reference</strong> اسم خوانا برای یک هش است: شاخه‌ها و Tagها فقط اشاره‌گر به یک Commit‌اند. <strong>HEAD</strong> یعنی «الان کجا ایستاده‌ای» — معمولاً به یک شاخه اشاره می‌کند.</p>
<p><strong>Detached HEAD</strong> وقتی است که مستقیم روی یک Commit ایستاده‌ای، نه روی شاخه. اگر آنجا Commit بزنی و بروی، آن کار به هیچ شاخه‌ای وصل نیست (ولی از reflog قابل بازیابی است). راه‌حل: <code>git switch -c new-branch</code>.</p>
<h3>Index و Packfile</h3>
<ul>
<li><strong>Index:</strong> نام فنی همان Staging Area؛ فایلی که وضعیت آمادهٔ Commit بعدی را نگه می‌دارد.</li>
<li><strong>Packfile:</strong> برای صرفه‌جویی، Git اشیاء را در فایل‌های فشرده و به‌صورت تفاضلی بسته‌بندی می‌کند. به همین دلیل تاریخچهٔ چندساله می‌تواند حجم کمی داشته باشد.</li>
<li><strong>Garbage Collection:</strong> پاک‌سازی خودکار اشیائی که هیچ Reference یا reflogی به آن‌ها اشاره نمی‌کند. تا وقتی reflog نگهشان دارد، Commitهای «گم‌شده» قابل بازیابی‌اند.</li>
</ul>
<h3>DAG و Three-way Merge</h3>
<p>ساختار تاریخچهٔ Git یک <strong>DAG</strong> (گراف جهت‌دار بدون دور) است: هر Commit به والدش اشاره می‌کند و Merge Commitها دو والد دارند. برای ادغام، Git از <strong>Three-way Merge</strong> استفاده می‌کند: نسخهٔ من، نسخهٔ تو و <strong>جد مشترک</strong> را مقایسه می‌کند. همین جد مشترک است که به Git اجازه می‌دهد بفهمد چه چیزی واقعاً تغییر کرده و کجا واقعاً تضاد وجود دارد.</p>
<h3>Plumbing در برابر Porcelain</h3>
<p>دستورهای روزمره (<code>add</code>، <code>commit</code>، <code>log</code>) لایهٔ <strong>Porcelain</strong> هستند: برای انسان. زیرشان دستورهای <strong>Plumbing</strong> مثل <code>git hash-object</code> و <code>git cat-file</code> قرار دارند که مستقیم با پایگاه‌دادهٔ اشیاء کار می‌کنند و بیشتر در اسکریپت‌ها کاربرد دارند.</p>
`,
quiz:[
{q:'Blob در Git چیست؟', o:['یک شاخه','محتوای یک فایل بدون نامش','یک Commit','یک Remote'], a:1, why:'نام فایل در Tree ذخیره می‌شود؛ Blob فقط محتواست.'},
{q:'چرا هش Commit با تغییر محتوا عوض می‌شود؟', o:['تصادفی است','چون هش از محتوای شیء محاسبه می‌شود، پس هر تغییری شیء جدیدی می‌سازد','چون تاریخ تغییر می‌کند','چون GitHub آن را عوض می‌کند'], a:1, why:'همین ویژگی یکپارچگی تاریخچه را قابل‌راستی‌آزمایی می‌کند: هر تغییر در محتوا هش را عوض می‌کند و قابل‌تشخیص است — نه اینکه تاریخچه تغییرناپذیر باشد.'},
{q:'Detached HEAD یعنی؟', o:['Repo خراب شده','مستقیم روی یک Commit ایستاده‌ای، نه روی شاخه','شاخه حذف شده','اتصال Remote قطع شده'], a:1, why:'در این حالت Commitهای جدید به هیچ شاخه‌ای وصل نیستند؛ با ساخت شاخه از همان‌جا حفظشان کن.'},
{q:'Index نام فنی چیست؟', o:['تاریخچه','Staging Area','پوشهٔ Remote','فایل تنظیمات'], a:1, why:'Index همان ناحیه‌ای است که با git add پر می‌شود.'},
{q:'Three-way Merge از چه چیزی استفاده می‌کند؟', o:['فقط دو نسخهٔ نهایی','نسخهٔ هر دو شاخه به‌علاوهٔ جد مشترکشان','سه شاخهٔ مختلف','سه Commit آخر'], a:1, why:'جد مشترک مبنای تشخیص «چه کسی چه چیزی را تغییر داده» و در نتیجه تشخیص Conflict واقعی است.'}
]},
{ id:30, title:'جمع‌بندی و نقشهٔ راه', branch:'main', subtitle:'حالا این‌ها را کجا و چطور به کار ببری.',
body:`
<h3>Workflow اصلی که باید در آن مسلط باشی</h3>
<pre><code>Clone
 → Create Branch
 → Make Change
 → Review Diff
 → Stage
 → Commit
 → Push
 → Open Pull Request
 → Review
 → Resolve Conflict
 → Merge
 → Revert if needed</code></pre>
<p>دستورهای متناظرش، از ابتدا تا انتها:</p>
<pre><code>git clone URL
git switch -c feature/search-empty-state
<span class="c"># ... تغییرات ...</span>
git status &amp;&amp; git diff
git add -p
git commit -m "feat: add empty state to search results"
git push -u origin feature/search-empty-state
<span class="c"># در GitHub: Pull Request → Review → Merge</span>
git switch main &amp;&amp; git pull
git revert COMMIT   <span class="c"># در صورت نیاز</span></code></pre>
<h3>چهار سناریویی که باید بتوانی اجرا کنی</h3>
<ol>
<li><strong>مدیریت چند نسخهٔ Prototype:</strong> شاخه برای هر واریانت، Preview URL برای هرکدام، ثبت بازخورد در PR، حذف بازنده‌ها و نگه‌داشتن نسخهٔ پایدار روی main. <em>(سطح ۷، ۲۲)</em></li>
<li><strong>بررسی تغییرات تولیدشده توسط AI:</strong> Commit به‌عنوان Restore Point، شاخهٔ آزمایش جدا، خواندن دقیق Diff، توجه به Dependency و Config، Stage گزینشی و Revert در صورت نیاز. <em>(سطح ۱۳، ۱۴، ۲۱)</em></li>
<li><strong>تحویل و Review طراحی در Pull Request:</strong> PR با ساختار Problem / Design decision / What changed / Figma / States / Limitations / Questions، همراه Before-After و پاسخ به Reviewها. <em>(سطح ۱۱، ۱۲)</em></li>
<li><strong>مدیریت تغییرات Design System و Tokenها:</strong> شاخه و PR برای تغییر توکن، Review دقیق Diff، تشخیص Breaking Change، Semantic Versioning، Changelog و Release. <em>(سطح ۱۷، ۲۳، ۲۴)</em></li>
</ol>
<h3>ترتیب یادگیری، خلاصه‌شده</h3>
<table><tr><th>مرحله</th><th>محتوا</th><th>سطح‌ها</th></tr>
<tr><td><strong>۱. حتماً</strong></td><td>مفاهیم پایه، Repo، Commit، Diff، Branch، Push/Pull، Merge، Conflict، PR، Restore/Revert، gitignore</td><td>۱ تا ۱۴</td></tr>
<tr><td><strong>۲. کار حرفه‌ای</strong></td><td>Reset، Stash، Tag و Release، Issue، Collaboration، امنیت</td><td>۱۵ تا ۲۰</td></tr>
<tr><td><strong>۳. Design Technologist</strong></td><td>Git برای AI، Prototype، Design System، Figma Sync، CI/CD، CLI، Rebase</td><td>۲۱ تا ۲۷</td></tr>
<tr><td><strong>۴. تعمیق و جمع‌بندی</strong></td><td>Cherry-pick، Git Internals، جمع‌بندی و نقشهٔ راه</td><td>۲۸ تا ۳۰</td></tr>
</table>
<h3>سه عادتی که بیشترین اثر را دارند</h3>
<ul>
<li><strong>قبل از هر کاری status، قبل از هر Commit ای diff.</strong> این دو عادت جلوی بیشتر اشتباه‌های رایج را می‌گیرند.</li>
<li><strong>شاخه‌های کوچک، PRهای کوچک، Commitهای متمرکز.</strong> کیفیت Review و سرعت تیم مستقیماً به این بستگی دارد.</li>
<li><strong>قبل از هر کار پرریسک، یک نقطهٔ بازگشت بساز.</strong> با یک Commit، ترس از خراب‌کاری تقریباً از بین می‌رود.</li>
</ul>
<div class="callout tip"><span class="co-title">تمرین پیشنهادی برای این هفته</span>یک Repo خصوصی بساز، یک صفحهٔ HTML ساده در آن بگذار، دو شاخهٔ واریانت طراحی بساز، عمداً یک Conflict درست کن و حلش کن، یک PR برای خودت باز کن و با ساختار سطح ۱۲ توضیحش را بنویس، و در آخر یکی از Commitها را Revert کن. با همین یک تمرین، کل مسیر اصلی را یک‌بار زندگی می‌کنی.</div>
`,
quiz:[
{q:'ترتیب درست Workflow اصلی؟', o:['Commit → Branch → Push → Diff','Branch → تغییر → بررسی Diff → Stage → Commit → Push → PR → Merge','Push → PR → Commit → Merge','PR → Branch → Commit → Diff'], a:1, why:'شاخه اول ساخته می‌شود، تغییر بررسی و ثبت می‌شود، سپس Push و PR و در نهایت Merge.'},
{q:'در سناریوی بررسی خروجی AI، مهم‌ترین دو ابزار؟', o:['tag و stash','Commit به‌عنوان نقطهٔ بازگشت + خواندن دقیق Diff','rebase و cherry-pick','clone و fork'], a:1, why:'امکان بازگشت و توان ارزیابی تغییر، هستهٔ کار امن با AI است.'},
{q:'برای مدیریت چند نسخهٔ Prototype کدام ترکیب درست است؟', o:['چند Repo جدا برای هر واریانت','یک شاخه برای هر واریانت + Preview URL + ثبت بازخورد در PR','همه در یک شاخه با کامنت کردن کدها','چند پوشه با نام‌های v1، v2'], a:1, why:'شاخه‌ها نسخه‌ها را زنده، قابل‌مقایسه و قابل‌حذف نگه می‌دارند.'},
{q:'کدام سه عادت بیشترین اثر را در کار روزمره دارند؟', o:['rebase مرتب، force push، reset روزانه','status و diff مکرر، کوچک نگه‌داشتن شاخه/PR/Commit، ساخت نقطهٔ بازگشت قبل از کار پرریسک','حفظ‌کردن دستورها، Commit روزی یک‌بار، اجتناب از Branch','کار مستقیم روی main برای سرعت'], a:1, why:'این سه عادت هم خطا را کم می‌کنند هم کیفیت همکاری را بالا می‌برند.'},
{q:'تغییر Design Token در چه چارچوبی باید انجام شود؟', o:['مستقیم روی main برای سرعت','شاخهٔ جدا + PR با اثر بصری + بررسی Breaking بودن + نسخه‌بندی و Changelog','فقط در Figma بدون ثبت در Repo','با پیام در چت تیم'], a:1, why:'توکن‌ها اثر سراسری دارند؛ باید مثل تغییرات پرمخاطره Review و نسخه‌بندی شوند.'}
]}
];
