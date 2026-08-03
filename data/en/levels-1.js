export const EN_LEVELS_1 = [
{ id:1, title:'Core concepts you must know', subtitle:'Before any command, you need to understand what problem Git actually solves.',
body:`
<h3>What is Version Control?</h3>
<p><strong>Version Control</strong> is a system that keeps the history of changes to your files — so you can see what changed, when, and by whom, and go back to any point in the past whenever you need to.</p>
<div class="example"><div class="ex-title">A familiar example for designers</div>
<p>You have surely seen a folder like this: <code>final.fig</code>, <code>final-v2.fig</code>, and <code>final-FINAL-approved.fig</code>. That is manual, fragile version control. Version Control does the same job in an organized, automatic, and reliable way — without copying files.</p></div>
<h3>What is Git?</h3>
<p><strong>Git</strong> is the most popular version control tool in the world. It is free software that installs on your own computer and keeps the complete history of a project inside the project folder itself. Git does not even need the internet to work.</p>
<h3>Git vs. GitHub</h3>
<table><tr><th></th><th>Git</th><th>GitHub</th></tr>
<tr><td><strong>What is it?</strong></td><td>Version control software</td><td>A website that hosts Git projects</td></tr>
<tr><td><strong>Where is it?</strong></td><td>On your computer</td><td>On cloud servers</td></tr>
<tr><td><strong>What does it do?</strong></td><td>Records history</td><td>Sharing, collaboration, Pull Requests</td></tr></table>
<p>A simple analogy: Git is like the "save file" feature, and GitHub is like "Google Drive for Git projects". You can use Git without GitHub, but the reverse makes no sense. GitHub also has competitors: GitLab and Bitbucket.</p>
<h3>What is a Repository?</h3>
<p>A <strong>Repository</strong> (or "repo" for short) is your project folder together with its entire history. Every project is one repo.</p>
<ul>
<li><strong>Local Repository:</strong> the copy on your own computer that you work with directly.</li>
<li><strong>Remote Repository:</strong> the copy on a server (for example GitHub) that serves as the team's shared reference point.</li>
</ul>
<h3>The three main areas of Git</h3>
<p>Every change in Git passes through three stations. This is the most important mental model in all of Git:</p>
<ol>
<li><strong>Working Directory:</strong> the project folder — where you actually edit files.</li>
<li><strong>Staging Area:</strong> the "shopping cart" of changes. Here you choose which changes go into the next commit.</li>
<li><strong>Commit:</strong> the permanent record. A snapshot of the selected state that stays in the history forever.</li>
</ol>
<pre><code><span class="c"># The path every change travels:</span>
Working Directory  →  Staging Area  →  Commit History
   (edit)              (git add)        (git commit)</code></pre>
<h3>Commit and Commit History</h3>
<p>Each <strong>commit</strong> is a complete save point of the project: which files contained what, along with a message, the author, and a timestamp. The <strong>Commit History</strong> is the chain of these save points — the full story of the project from the beginning until now.</p>
<h3>Snapshots in Git</h3>
<p>Instead of storing "the differences between files", Git stores a <strong>complete snapshot of the whole project</strong> in every commit (and is smart enough not to duplicate unchanged files). That is why going back to any commit means the entire project returns to that exact moment.</p>
<h3>Save vs. Commit</h3>
<p><strong>Save</strong> (Ctrl+S) only writes the latest state of a file to disk and destroys the previous state. A <strong>commit</strong> creates a new point in history without erasing the earlier ones. Save means "overwrite"; commit means "add to the history".</p>
<h3>How Git differs from Cloud Storage</h3>
<p>Dropbox or Google Drive only sync "the latest version of a file", and may keep a few automatic previous versions. Git, in contrast, has <strong>deliberate, described</strong> save points, has branching, has precise line-by-line comparison (Diff), and is built for several people collaborating on the same file.</p>
<h3>The structure of a Repository and the hidden .git folder</h3>
<p>When you turn a folder into a repo, Git creates a hidden folder called <code>.git</code> inside it. The entire history, configuration, and all of Git's magic live inside that one folder. If you delete <code>.git</code>, your project files survive but the whole history is gone — so never touch it by hand.</p>
<h3>The basic Git workflow</h3>
<pre><code><span class="c"># The daily cycle of working with Git:</span>
1. Edit your files               <span class="c">(Working Directory)</span>
2. git status                    <span class="c">← see what has changed</span>
3. git add                       <span class="c">← choose the changes</span>
4. git commit                    <span class="c">← record them with a message</span>
5. git push                      <span class="c">← send them to GitHub</span></code></pre>
<div class="callout tip"><span class="co-title">Level recap</span>Git is the local history keeper; GitHub is its cloud home. Every change travels Working Directory → Staging → Commit, and every commit is a complete, recoverable snapshot of the project.</div>
`,
quiz:[
{q:'What is the main difference between Git and GitHub?', o:['Git is for designers and GitHub is for developers','Git is the version control tool on your computer; GitHub is a cloud service for hosting and collaborating on Git projects','GitHub is the newer version of Git','There is no difference'], why:'Git is local version control software, and GitHub is just one of the services that host it (alongside GitLab and Bitbucket).'},
{q:'What is the correct order of the path a change travels in Git?', o:['Commit → Staging → Working Directory','Staging → Commit → Working Directory','<span dir="ltr">Working Directory → Staging Area → Commit</span>','Working Directory → Commit → Staging Area'], why:'You first edit in the Working Directory, git add moves the change into Staging, and git commit records it in the history.'},
{q:'How does Save differ from Commit?', o:['Save is faster but gives the same result','Save overwrites the previous state of the file; Commit adds a new point in history without deleting earlier ones','Commit only works for code files','Save sends changes to GitHub'], why:'Save means overwriting the latest state; Commit means adding a new snapshot to the history that you can always return to.'},
{q:'What does the hidden .git folder contain?', o:['Only deleted files','Editor settings','The entire history and configuration of the repository','A backup copy from GitHub'], why:'All of Git\u2019s history and metadata live inside the .git folder; deleting it means deleting the whole history.'},
{q:'Why is Git fundamentally different from Dropbox/Google Drive?', o:['Because Git is offline-only','Because Git has deliberate, described save points, branches, and line-by-line diffs, and is built for collaborating on changes','Because Drive rejects large files','Because Git does not compress files'], why:'Cloud storage only syncs the latest version; Git provides deliberate history, branching, and precise comparison.'},
{q:'What does a snapshot mean in Git?', o:['Just the list of changed files','A screenshot of your editor window','A complete picture of the entire project\u2019s state at the moment of the commit','A compressed copy of the last open file'], why:'Each commit stores the full state of the project, which is why returning to any commit brings the whole project back to that moment.'}
]},
{ id:2, title:'Initial setup', subtitle:'Install Git, introduce yourself to it, and connect securely to GitHub.',
body:`
<h3>Installing and checking the version</h3>
<p>Download and install Git from <code>git-scm.com</code> (on a Mac it usually comes with the Xcode Command Line Tools). After installing, verify it in the Terminal:</p>
<pre><code>git --version
<span class="c"># Output looks something like: git version 2.45.0</span></code></pre>
<h3>Introducing yourself to Git</h3>
<p>Every commit is recorded with the author's name and email — so introduce yourself first. The <code>--global</code> flag means this setting applies to all of your projects:</p>
<pre><code>git config --global user.name "Sara Ahmadi"
git config --global user.email "sara@example.com"
git config --global init.defaultBranch main   <span class="c"># name of the default branch</span>
git config --list                             <span class="c"># review your settings</span></code></pre>
<div class="callout note"><span class="co-title">Default Branch</span>In the past the main branch was called <code>master</code>; today's standard is <code>main</code>. With the setting above, every new repo you create starts on main right away.</div>
<h3>Your toolkit</h3>
<ul>
<li><strong>Code Editor:</strong> in this course we use <strong>VS Code</strong> as the example; it is a common recommendation and a great starting point because Git is built right in and it shows diffs and conflicts visually. But your choice of editor is a matter of taste and team preference; Git concepts are editor-independent and work the same way in other compatible editors and clients.</li>
<li><strong>Terminal:</strong> on a Mac, the Terminal app; on Windows, Git Bash or Windows Terminal. Don't be afraid — to get started you only need a handful of simple commands, not hundreds.</li>
<li><strong>GitHub Desktop:</strong> GitHub's official graphical app. It is great for beginners because you commit, push, and branch with buttons while seeing the concepts in action. Recommendation: start with GitHub Desktop, but gradually learn the equivalent commands too.</li>
</ul>
<h3>Your GitHub account and connecting to it</h3>
<p>Create an account at <code>github.com</code>. For your computer to be allowed to push, it has to prove its identity. There are two main ways:</p>
<h4>1) HTTPS + Personal Access Token</h4>
<p>With HTTPS you do not sign in with your real account password; instead you create a <strong>Personal Access Token (PAT)</strong>: a dedicated password with limited permissions and an expiry date. You create it under Settings → Developer settings → Personal access tokens, and enter it instead of your password when pushing. If you use GitHub Desktop, signing in to your account handles all of this for you.</p>
<h4>2) SSH Key</h4>
<p>SSH creates a pair of keys: a <strong>private</strong> key that stays only on your computer, and a <strong>public</strong> key that you give to GitHub. From then on you connect securely without entering a password:</p>
<pre><code><span class="c"># 1) Generate the key</span>
ssh-keygen -t ed25519 -C "sara@example.com"
<span class="c"># 2) Copy the public key (Mac):</span>
pbcopy &lt; ~/.ssh/id_ed25519.pub
<span class="c"># 3) On GitHub: Settings → SSH and GPG keys → New SSH key</span>
<span class="c"># 4) Test the connection:</span>
ssh -T git@github.com
<span class="c"># Hi sara! You've successfully authenticated ✓</span></code></pre>
<div class="callout warn"><span class="co-title">The golden rule</span>Never share your private key (the file without the <code>.pub</code> extension) or your tokens with anyone, never show them in a screenshot, and never put them inside a repo.</div>
<h3>Initial settings for every repository</h3>
<p>When creating a repo on GitHub you make three initial choices: a name and short description, Public or Private visibility, and whether to add starter files like a README and a <code>.gitignore</code>. For personal and practice projects you usually choose Private — but keep in mind that Private means "restricting access" (only authorized people can see it), not complete security. Even in a private repo you must never commit secrets like tokens, passwords, or keys; account security, access levels, and secret management still matter (details in Level 20).</p>
`,
quiz:[
{q:'Which command tells Git your name for all of your projects?', o:['git name "Sara"','git config --global user.name "Sara"','git set username Sara','git user --add Sara'], why:'Identity settings are done with git config, and --global applies them to all of your repos.'},
{q:'What is a Personal Access Token?', o:['Your main GitHub account password','A dedicated password with limited permissions and an expiry date, used instead of your password for HTTPS authentication','An activation code for installing Git','Another name for an SSH key'], why:'A PAT is the secure replacement for your password with HTTPS; you can limit its scope and set an expiry date.'},
{q:'With SSH, which key do you give to GitHub?', o:['The private key','Both keys','The public key (the .pub file)','Neither; SSH has no keys'], why:'The public key is registered on GitHub; the private key never leaves your computer.'},
{q:'Which command tests your SSH connection to GitHub?', o:['git test ssh','ssh -T git@github.com','git connect github','ssh --check github.com'], why:'This command tests SSH authentication and, on success, replies with your username.'},
{q:'Why is setting init.defaultBranch main recommended?', o:['Because Git will not install without it','Because it makes the default branch of new repos match today\u2019s standard, main','Because it makes Git faster','Because GitHub only accepts main'], why:'The current standard name for the main branch is main, and this setting applies it to every new git init.'}
]},
{ id:3, title:'Creating and getting a Repository', subtitle:'Two ways into any project: start from scratch, or bring in an existing one.',
body:`
<h3>Way one: start from scratch with git init</h3>
<p>You can turn any folder into a repository with a single command:</p>
<pre><code>cd my-prototype
git init
<span class="c"># Initialized empty Git repository in my-prototype/.git/</span></code></pre>
<p>From this moment the <code>.git</code> folder exists and Git is ready to track changes. Another route is to create the repo on the GitHub website first (the New repository button) and then clone it; for beginners this path is simpler because the remote connection is set up automatically.</p>
<h3>Way two: get an existing project with git clone</h3>
<pre><code>git clone git@github.com:team/design-system.git
<span class="c"># or with HTTPS:</span>
git clone https://github.com/team/design-system.git</code></pre>
<p>Clone creates a complete copy: all the files + the entire history + a ready-made connection to the remote.</p>
<h3>Init vs. Clone</h3>
<table><tr><th>git init</th><th>git clone</th></tr>
<tr><td>A brand-new project from scratch</td><td>Getting an existing project</td></tr>
<tr><td>Empty history</td><td>The whole history comes with it</td></tr>
<tr><td>No remote; you have to add one yourself</td><td>The remote is set up automatically under the name origin</td></tr></table>
<h3>Remote and the meaning of origin</h3>
<p>A <strong>remote</strong> is the address of a far-away copy of the repo (for example on GitHub). Every remote has a nickname, and by convention the first remote is always called <strong>origin</strong>. So whenever you see origin, read it as: "that same repo on GitHub".</p>
<pre><code>git remote -v                 <span class="c"># list remotes with their URLs</span>
git remote add origin git@github.com:sara/portfolio.git   <span class="c"># add</span>
git remote set-url origin NEW_URL                          <span class="c"># change the URL</span>
git remote rename origin upstream                          <span class="c"># rename</span>
git remote remove origin                                   <span class="c"># remove</span></code></pre>
<div class="example"><div class="ex-title">A real scenario</div>
<p>You started a prototype locally with <code>git init</code> and now want to put it on GitHub: create an empty repo on GitHub, copy its address, connect it with <code>git remote add origin ADDRESS</code>, and then push. That's it.</p></div>
<h3>Inspecting a repository</h3>
<pre><code>git status        <span class="c"># current state: branch, changes, sync with the remote</span>
git log --oneline <span class="c"># condensed history</span>
git remote -v     <span class="c"># where are you connected to?</span>
git branch        <span class="c"># which branch are you on?</span></code></pre>
`,
quiz:[
{q:'What does origin mean in Git?', o:['The first commit of the project','The conventional name for the main remote (usually that same repo on GitHub)','The main branch of the project','The root folder of the project'], why:'origin is just a conventional nickname for the address of the main remote; it could have been named something else.'},
{q:'Which statement about git clone is correct?', o:['It only downloads the latest version of the files','It brings the files + the entire history, and sets up origin automatically','It only brings the main branch, without history','It requires you to create the .git folder manually'], why:'Clone is a complete, ready-to-work copy: the full history plus the remote connection.'},
{q:'Which command lists your remotes along with their URLs?', o:['git origin list','git remote -v','git show remotes','git list --remote'], why:'The -v (verbose) flag also displays each remote\u2019s fetch and push URLs.'},
{q:'You created a project locally with git init. How do you connect it to an empty repo on GitHub?', o:['Clone it again','git remote add origin ADDRESS and then push','Upload the .git folder to GitHub','git init --github'], why:'init alone has no remote; you must add the GitHub address as origin and then push.'},
{q:'What is the main difference between init and clone?', o:['init is faster','init creates a new project with an empty history; clone brings an existing project with its entire history','clone only works for public repos','There is no difference'], why:'init is starting from zero; clone is a complete download of an existing repo.'}
]},
{ id:4, title:'Managing changes', subtitle:'The daily cycle: look, choose, record.',
body:`
<h3>File states: the four conditions</h3>
<ul>
<li><strong>Untracked:</strong> a new file that Git does not know about yet.</li>
<li><strong>Tracked:</strong> a file that Git is watching (it has been committed or added at least once).</li>
<li><strong>Modified:</strong> a tracked file that has changed since the last commit but has not been staged yet.</li>
<li><strong>Staged:</strong> a change that has been selected with add and is ready to be committed.</li>
</ul>
<h3>git status — your ever-present compass</h3>
<pre><code>git status
<span class="c"># On branch main</span>
<span class="c"># Changes to be committed:        ← green: Staged</span>
<span class="g">#   modified: tokens.json</span>
<span class="c"># Changes not staged for commit:  ← red: Modified</span>
<span class="r">#   modified: styles.css</span>
<span class="c"># Untracked files:                ← red: new</span>
<span class="r">#   hero-v2.png</span></code></pre>
<p>The golden habit: run <code>git status</code> before and after everything you do. You will never regret it.</p>
<h3>git diff — what exactly changed?</h3>
<pre><code>git diff              <span class="c"># unstaged changes</span>
git diff --staged     <span class="c"># staged changes (see what you are about to commit)</span>
git diff main design  <span class="c"># compare two branches</span>
git diff abc123 def456 <span class="c"># compare two commits</span></code></pre>
<h3>git add — choosing what to record</h3>
<pre><code>git add styles.css            <span class="c"># one file</span>
git add styles.css tokens.json <span class="c"># several files</span>
git add .                     <span class="c"># all changes (use with care!)</span>
git add -p                    <span class="c"># piece by piece: asks yes/no for each hunk</span>
git restore --staged styles.css <span class="c"># unstage (the change itself stays)</span></code></pre>
<div class="callout tip"><span class="co-title">Why is add -p so valuable?</span>When in one file you have both changed a button color and fixed a spacing bug, <code>git add -p</code> lets you record those as two separate commits. Staging part of a file is the key to clean commits.</div>
<h3>git commit — recording in the history</h3>
<pre><code>git commit -m "fix: align search icon in mobile header"
<span class="c"># or omit -m to open the editor for a fuller message</span></code></pre>
<h3>Reading the history</h3>
<pre><code>git log                   <span class="c"># full: author, date, message</span>
git log --oneline         <span class="c"># each commit on one line</span>
git log --oneline --graph <span class="c"># with a branch graph</span>
git show abc123           <span class="c"># details and changes of one specific commit</span>
git log --stat            <span class="c"># which files changed in each commit</span></code></pre>
<h3>Deleting and moving files with Git</h3>
<pre><code>git rm old-logo.svg           <span class="c"># delete a file + stage the deletion</span>
git mv btn.css button.css     <span class="c"># rename/move + stage it</span></code></pre>
<p>Deleting or renaming a file manually is fine too; you just have to add the change afterwards. The commands above do both steps at once.</p>
<div class="example"><div class="ex-title">A real working day</div>
<pre><code>git status                      <span class="c"># two files have changed</span>
git diff                        <span class="c"># review the changes</span>
git add components/Card.css
git commit -m "style: increase card padding to 24px"
git add tokens.json
git commit -m "feat: add semantic color token for danger state"</code></pre></div>
`,
quiz:[
{q:'A file that Git knows about has changed since the last commit but has not been added. What state is it in?', o:['Untracked','Staged','Modified','Committed'], why:'Tracked + changed without add means Modified. Untracked is reserved for completely new files.'},
{q:'Which command shows changes that have been staged (before committing)?', o:['git diff','git diff --staged','git status -v --all','git show --next'], why:'git diff without a flag only shows unstaged changes; for staged ones you need --staged.'},
{q:'What does git add -p let you do?', o:['Add with high priority','Stage the changes in a file piece by piece','Add private files','Push automatically after adding'], why:'With -p (patch), Git shows you each hunk of change separately and asks whether to stage it; the essential tool for focused commits.'},
{q:'You staged a file by mistake. How do you unstage it without losing the change?', o:['git rm file','git restore --staged file','git delete --stage file','git reset --hard'], why:'restore --staged only takes the file out of the commit basket; your edits stay intact in the Working Directory.'},
{q:'How do you view the history in a condensed, one-line-per-commit form?', o:['git history --short','git log --oneline','git commits','git show --all'], why:'git log --oneline shows each commit on a single line (short hash + message).'},
{q:'How does git rm differ from deleting the file manually in Finder/Explorer?', o:['git rm also deletes the file from GitHub instantly','git rm stages the deletion at the same time; a manual delete needs a separate add','Manual deletion is impossible','There is no difference'], why:'The end result is the same, but git rm does both steps (delete + stage) at once.'}
]},
{ id:5, title:'Writing professional commits', subtitle:'A good commit is a record of your decisions — not a throwaway save.',
body:`
<h3>Small, focused commits (Atomic Commits)</h3>
<p>Each commit should be <strong>one logical change</strong>: not so big that it mixes ten topics, and not so tiny that it is meaningless. The test rule: if you cannot describe the commit in one sentence without using "and", it should probably be two commits.</p>
<div class="example"><div class="ex-title">Bad vs. good</div>
<p><span class="diff-del">− "update stuff" (12 files changed: button color + font + menu bug + a test file)</span>
<span class="diff-add">+ "fix: prevent menu overlap on tablet breakpoint"</span>
<span class="diff-add">+ "style: switch body font to Vazirmatn"</span></p></div>
<h3>Meaningful commit messages</h3>
<ul>
<li>Keep the first line short (under ~50-72 characters) and descriptive; use the imperative mood: "add", not "added".</li>
<li>Answer "what" and, more importantly, "why" — not "how" (the diff already shows how).</li>
<li>If more explanation is needed, write a message body after one blank line.</li>
</ul>
<h3>Conventional Commits</h3>
<p>A simple convention for starting your messages: <code>type: description</code></p>
<table><tr><th>Type</th><th>Meaning</th><th>Example</th></tr>
<tr><td><code>feat</code></td><td>A new feature</td><td>feat: add empty state to search results</td></tr>
<tr><td><code>fix</code></td><td>A bug fix</td><td>fix: correct focus ring color on inputs</td></tr>
<tr><td><code>style</code></td><td>Visual/formatting change without behavior change</td><td>style: unify card border radius to 12px</td></tr>
<tr><td><code>refactor</code></td><td>Rewriting without changing behavior</td><td>refactor: extract Button variants to tokens</td></tr>
<tr><td><code>docs</code></td><td>Documentation</td><td>docs: add usage notes for Modal</td></tr>
<tr><td><code>test</code></td><td>Tests</td><td>test: add visual test for dark mode</td></tr>
<tr><td><code>chore</code></td><td>Housekeeping (config, tooling, dependency updates)</td><td>chore: update storybook to v9</td></tr></table>
<h3>When to commit</h3>
<p>Whenever you reach a "small complete point": a state is finished, a bug is fixed, a token is added. Also, always commit before anything risky (for example running a big AI prompt) so you have a point to return to.</p>
<h3>Fixing the last commit</h3>
<p>Left a file out, or wrote the wrong message? As long as you have not pushed:</p>
<pre><code><span class="c"># Fix only the message:</span>
git commit --amend -m "fix: correct focus ring color on inputs"
<span class="c"># Add a forgotten file to that same commit:</span>
git add forgotten-file.css
git commit --amend --no-edit   <span class="c"># --no-edit keeps the previous message</span></code></pre>
<div class="callout warn"><span class="co-title">Caution</span><code>--amend</code> rewrites the last commit (the hash changes). Only use it on commits that have not been pushed yet.</div>
<h3>Checking before you push</h3>
<pre><code>git log --oneline origin/main..HEAD  <span class="c"># which commits are about to go?</span>
git diff origin/main                 <span class="c"># the total changes compared to the remote</span></code></pre>
`,
quiz:[
{q:'What is an Atomic Commit?', o:['A commit containing only one file','A commit containing exactly one complete, logical change','A commit with a short message','A commit that has not been pushed'], why:'The measure is "one logical topic", not the number of files; a single logical change may span several files.'},
{q:'For "fixing the menu overlap bug", which message follows Conventional Commits correctly?', o:['chore: menu','fixed the menu bug finally!!','fix: prevent menu overlap on tablet breakpoint','feat: menu overlap'], why:'The right type is fix, plus an imperative, specific description. feat is for new features, not bug fixes.'},
{q:'You left a file out of your last commit (not yet pushed). What is the best move?', o:['A new commit with the message "forgot file"','git add file, then git commit --amend --no-edit','git push --force','Delete the repo and start over'], why:'amend adds the file into that same commit, and --no-edit keeps the previous message; the history stays clean.'},
{q:'Why should you not use --amend on a pushed commit?', o:['Because it does not work','Because it rewrites published history and creates a mismatch with your teammates\u2019 copies','Because files get deleted','Because GitHub does not allow it'], why:'amend changes the commit hash; if others already have the old commit, the histories become incompatible.'},
{q:'What should a good commit message primarily answer?', o:['How the code was written','What changed and why','What time the work was done','How many lines of code changed'], why:'The diff shows the "how"; a message\u2019s value is in recording the "what and why".'},
{q:'What is the chore type for?', o:['Fixing critical bugs','Housekeeping tasks like tool configuration and dependency updates','Visual changes','New features'], why:'chore means maintenance work that does not directly affect the product\u2019s features or behavior.'}
]},
{ id:6, title:'Trackable files and .gitignore', subtitle:'Not everything belongs in the history; some things never do.',
body:`
<h3>What is .gitignore?</h3>
<p>A plain text file named <code>.gitignore</code> at the root of your project that tells Git which files and folders it should <strong>not even look at</strong>. These files never appear in status and are never committed.</p>
<pre><code><span class="c"># Sample .gitignore for a design/front-end project</span>

<span class="c"># Dependencies — rebuildable with npm install</span>
node_modules/

<span class="c"># Build output and cache — reproducible</span>
dist/
build/
.cache/

<span class="c"># Sensitive information — must never enter the history</span>
.env
.env.local

<span class="c"># Operating system files</span>
.DS_Store
Thumbs.db

<span class="c"># Editor files</span>
.vscode/
.idea/

<span class="c"># Patterns</span>
*.log          <span class="c"># any file with the log extension</span>
temp-*         <span class="c"># anything starting with temp-</span></code></pre>
<h3>What should be ignored?</h3>
<ul>
<li><strong>Dependencies (node_modules):</strong> thousands of files that can be rebuilt from <code>package.json</code> with a single command. Committing them makes the repo heavy and needlessly cluttered.</li>
<li><strong>Build output and cache:</strong> output generated from source; we keep the source, not the output.</li>
<li><strong>Operating system and editor files:</strong> the Mac's <code>.DS_Store</code> is the most notorious history intruder.</li>
<li><strong>Sensitive information:</strong> the most important case. Read on.</li>
</ul>
<h3>The .env file and secrets</h3>
<p>The <code>.env</code> file is where API keys, passwords, and environment settings live. This file <strong>must always be in .gitignore</strong>, because anything committed even once stays in the history — even if you delete it later. A leaked API key means anyone can use the service at your expense.</p>
<h3>How do you untrack a file that has already been committed?</h3>
<p>gitignore only stops <strong>new</strong> files; a file that is already tracked keeps being tracked. The fix:</p>
<pre><code>git rm --cached .env    <span class="c"># stop tracking it, but keep the file on disk</span>
<span class="c"># now add .env to .gitignore and commit</span></code></pre>
<div class="callout warn"><span class="co-title">Critical point</span>This removes the file from future commits, but the earlier versions are still in the history. If a real secret has leaked, you must immediately revoke that key and create a new one; removing it from the history alone is not enough.</div>
<h3>Gitignore templates</h3>
<p>You do not have to write it from scratch; when creating a repo, GitHub offers ready-made templates for every kind of project (Node, macOS, and more), and the complete collection of templates lives in the official <code>github/gitignore</code> repo.</p>
`,
quiz:[
{q:'Why do we ignore node_modules?', o:['Because its files are corrupted','Because it can be fully rebuilt from package.json with npm install, and committing it makes the repo heavy','Because Git refuses large folders','Because it contains sensitive information'], why:'The general rule: anything that can be regenerated has no place in the history.'},
{q:'What does the .env file usually contain, and what should you do with it?', o:['Font settings; it should be committed','Passwords and API keys; it must always be in .gitignore','The list of branches; it is generated automatically','The commit history'], why:'.env is where secrets live and must never enter the history.'},
{q:'A file was committed earlier, and you have now added it to .gitignore, but Git still shows its changes. Why?', o:['gitignore is broken','gitignore only affects untracked files; you must untrack it with git rm --cached','You need to restart your computer','You need to rename the file'], why:'ignore prevents tracking from starting; for an already-tracked file you must stop the tracking manually.'},
{q:'A real API key was accidentally committed and pushed. What is the most complete response?', o:['Delete the file and push again; done','Immediately revoke the key and create a new one, then remove the file from tracking/history','Make the repo private','Nothing needs to be done'], why:'Because the key is recorded in the history and may have been seen, revoking it is the first and essential step.'},
{q:'What does the *.log pattern in .gitignore mean?', o:['Only the file log.txt','Any file whose extension is log','A folder named log','Hidden files'], why:'The asterisk means "any name"; so all files with the .log extension are ignored.'}
]},
{ id:7, title:'Branch', subtitle:'A parallel world for every idea, without touching the main version.',
body:`
<h3>What is a branch, and why?</h3>
<p>A <strong>branch</strong> is an independent timeline of your project. Whatever changes you make on a new branch, the main branch (<strong>main</strong>) stays untouched and safe. When the result is satisfying, you merge the branch into main; if it is not, you throw the branch away and it is as if nothing ever happened.</p>
<pre><code>          o───o───o   feature/search-empty-state
         /
o───o───o───o───o     main (always safe)</code></pre>
<h3>How a branch differs from copying the folder</h3>
<p>Copying a folder gives you two separate versions with no relationship: no shared history, no precise comparison, and merging them is manual and painful. A branch is lightweight (files are not copied), shares its history, gives you a diff with one command, and merges with one command.</p>
<h3>The essential commands</h3>
<pre><code>git branch                       <span class="c"># list local branches (* means the current one)</span>
git branch -a                    <span class="c"># local + remote</span>
git switch -c feature/hero-redesign  <span class="c"># create a branch + switch to it</span>
git switch main                  <span class="c"># switch to another branch</span>
git branch -m old-name new-name  <span class="c"># rename</span>
git branch -d feature/done       <span class="c"># delete a merged branch</span>
git branch -D feature/failed     <span class="c"># force-delete an unmerged branch</span></code></pre>
<div class="callout note"><span class="co-title">switch or checkout?</span><code>git checkout</code> was the old, multi-purpose command (both switching branches and restoring files). For clarity, two new commands were created: <code>git switch</code> for branches and <code>git restore</code> for files. You will see checkout a lot in older tutorials; use its modern equivalent.</div>
<h3>Local branches, remote branches, and tracking</h3>
<ul>
<li><strong>Local Branch:</strong> a branch on your computer, like <code>main</code> or <code>feature/hero-redesign</code>.</li>
<li><strong>Remote Branch:</strong> a branch actually stored on the server (for example GitHub).</li>
<li><strong>Remote-tracking Branch:</strong> your local picture of the last state you saw from the remote, like <code>origin/main</code>. This is not the branch on GitHub itself; it is just a locally updated note.</li>
<li><strong>Publishing:</strong> the first push of a new branch publishes it on the remote.</li>
<li><strong>Tracking / Upstream Branch:</strong> once a local branch is connected to its remote counterpart, Git knows where pull/push goes by default and can tell you how many commits ahead or behind you are.</li>
</ul>
<pre><code>git push -u origin feature/hero-redesign
<span class="c"># -u sets the upstream; from now on plain git push is enough</span></code></pre>
<h3>Branches in design work</h3>
<ul>
<li><strong>Feature Branch:</strong> each feature is built and reviewed in its own branch.</li>
<li><strong>Prototype Variant:</strong> each prototype variant gets a branch; comparing and presenting them in parallel becomes easy.</li>
<li><strong>Experiment:</strong> try high-risk ideas (for example the output of an AI agent) in a separate branch.</li>
</ul>
<h3>Branch naming conventions</h3>
<pre><code>feature/search-empty-state
prototype/editorial-layout
fix/mobile-navigation
experiment/ai-onboarding</code></pre>
<p>The pattern: <code>type/short-description</code> in lowercase with hyphens. A good name tells you what is inside the branch without opening it.</p>
`,
quiz:[
{q:'What is the biggest advantage of a branch over copying the project folder?', o:['A smaller zip file','Shared history, precise diffs, and merging with a single command','Better color coding in the editor','Faster internet'], why:'Branches are connected to a single shared history, which is why comparing and merging them is systematic.'},
{q:'What is the modern command to create a new branch and switch to it?', o:['git branch --go new','git switch -c feature/x','git checkout --branch','git new feature/x'], why:'switch -c both creates the branch and switches to it (the old equivalent: checkout -b).'},
{q:'What does the -u flag do on a branch\u2019s first push?', o:['It makes the push faster','It sets the upstream link between the local and remote branch so later pushes work without an address','It makes the branch private','It deletes the branch after pushing'], why:'-u (--set-upstream) registers the remote branch as the local branch\u2019s pull/push reference.'},
{q:'What exactly is origin/main?', o:['The main branch on your computer','The remote-tracking branch: the latest picture your computer has of main on the remote','The actual main branch on the GitHub server','Another name for HEAD'], why:'origin/main is a remote-tracking reference; the real branch on the remote is separate and gets updated via fetch.'},
{q:'What is the difference between git branch -d and -D?', o:['None; one is just uppercase','-d only deletes a merged branch; -D force-deletes even if it has not been merged','-D deletes the remote branch','-d hides the branch'], why:'-d has a safeguard so you do not lose unmerged work; -D removes that safeguard.'},
{q:'Which branch name best fits the common convention?', o:['MyNewDesign2','fix/mobile-navigation','final_version_REAL','sara-branch-1'], why:'The type/short-description pattern in lowercase states the branch\u2019s purpose clearly.'}
]},
{ id:8, title:'Connecting Local and Remote', subtitle:'Push, Pull, and Fetch: the language your computer speaks with GitHub.',
body:`
<h3>The three sync commands</h3>
<p>To understand which way data flows, keep three places separate: the <strong>local branch</strong> (like <code>main</code>), the <strong>remote-tracking</strong> reference (like <code>origin/main</code>), and the <strong>branch on the remote</strong> (for example on GitHub).</p>
<table><tr><th>Command</th><th>Data path <span dir="ltr">(source → destination)</span></th><th>What it does</th></tr>
<tr><td><code>git push</code></td><td><span dir="ltr">Local branch → Remote repo</span></td><td>Sends your commits and the local branch reference to the remote per the refspec; it does not bring the remote\u2019s work into your local branch</td></tr>
<tr><td><code>git fetch</code></td><td><span dir="ltr">Remote repo → remote-tracking</span></td><td>Downloads objects and updates <code>origin/...</code>; it does not automatically merge into your current working branch or open files</td></tr>
<tr><td><code>git pull</code></td><td><span dir="ltr">Remote → tracking → current branch</span></td><td>First fetch, then <strong>integrate</strong> the received history into the current branch</td></tr></table>
<div class="callout note"><span class="co-title">Reading the arrows</span>The arrows in the table are written as <span dir="ltr">source → destination</span> so the technical direction does not get flipped by the page layout. Always read the source and destination labels, not just the arrow\u2019s direction.</div>
<pre dir="ltr"><code>push:   [local main] ----------------------> [GitHub main]
fetch:  [GitHub main] ---> [origin/main]      (working branch untouched)
pull:   [GitHub main] ---> [origin/main] ---> integrate into [local main]</code></pre>
<h3>Pull vs. Fetch — with an example</h3>
<p><strong>Fetch</strong> is like checking your mailbox: you see the letters but have not opened them yet; only the remote-tracking references like <code>origin/main</code> get updated, and you can inspect the changes before accepting them. <strong>Pull</strong> means take the letter and integrate it into your current branch right now. The integration method may be a <strong>merge</strong> or a <strong>rebase</strong> — depending on the command\u2019s flags or settings like <code>pull.rebase</code>. Rebase details come in Level 27; for now it is enough to know that pull is not always just a merge.</p>
<pre><code>git fetch origin
git log --oneline main..origin/main   <span class="c"># which commits are on the remote that I don\u2019t have?</span>
git diff main origin/main             <span class="c"># what are their changes?</span>
git pull                              <span class="c"># fetch + integrate into the current branch</span>
<span class="c"># more explicit equivalents (depending on your team\u2019s needs):</span>
<span class="c"># git pull --no-rebase   → after fetch, merge</span>
<span class="c"># git pull --rebase      → after fetch, rebase</span></code></pre>
<p>A design example: your teammate changed the button color token on <code>main</code> on GitHub. With <code>fetch</code> you only learn what happened; with <code>pull</code> that change enters your local branch so you can work on the same base.</p>
<h3>The first push of a branch</h3>
<pre><code>git push -u origin feature/hero-redesign
<span class="c"># the branch is now published on GitHub + the upstream is set</span>
git push                              <span class="c"># next time this alone is enough</span></code></pre>
<div class="callout tip"><span class="co-title">If your push is rejected</span>When the remote is ahead of you, Git may reject your push (for example with the message <code>fetch first</code>). That means you have not yet integrated the remote\u2019s history; force pushing is dangerous in team work.</div>
<h3>Ahead and Behind</h3>
<p>After a fetch, <code>git status</code> tells you where you stand relative to your upstream (usually the remote-tracking branch):</p>
<ul>
<li><strong>Ahead 2:</strong> you have two commits that have not been pushed yet.</li>
<li><strong>Behind 3:</strong> there are three commits on the remote that you have not brought into your local branch yet.</li>
<li><strong>Both (Diverged):</strong> you have local commits and the remote has moved ahead too; you must first integrate the remote\u2019s history (with pull, or fetch then merge/rebase) and then push.</li>
</ul>
<div class="example"><div class="ex-title">A common scenario: push rejected!</div>
<pre><code>git push
<span class="r"># ! [rejected]  main -> main (fetch first)</span>
<span class="c"># Meaning: the remote is ahead of you. The common fix:</span>
git pull      <span class="c"># fetch + integrate (merge or rebase, per your settings)</span>
git push      <span class="c"># now it usually succeeds</span></code></pre></div>
<h3>Deleting a remote branch</h3>
<pre><code>git push origin --delete feature/old-experiment
<span class="c"># the local branch stays; delete it separately: git branch -d</span></code></pre>
<div class="callout tip"><span class="co-title">A professional habit</span>Sync before starting your daily work (fetch or pull), and push your commits early and often. The shorter the gap between syncs, the smaller and less painful the conflicts.</div>
`,
quiz:[
{q:'What is the main difference between fetch and pull?', o:['fetch is faster but does the same thing','fetch only updates the remote-tracking references without touching your working branch; pull is fetch plus integration into the current branch','pull only works for main','fetch also pushes your changes'], why:'pull = fetch + integration. The integration may be a merge or a rebase (via a flag or pull.rebase). With fetch you can review before accepting.'},
{q:'What does the status "Ahead 2, Behind 3" mean?', o:['2 files and 3 folders changed','You have 2 unpushed local commits, and there are 3 commits on the remote you don\u2019t have','You are 2 branches ahead and 3 branches behind','A connection error'], why:'The local and remote branches have diverged; you must first integrate the remote\u2019s history and then push.'},
{q:'Your push was rejected with the message fetch first. What do you do?', o:['git push --force','git pull, then git push','Clone the repo again','Delete the branch'], why:'The remote has changes you don\u2019t have; you must bring them in and integrate them into your branch first. Force pushing is dangerous in team work.'},
{q:'How do you delete a branch from GitHub?', o:['git branch -D feature/x','git push origin --delete feature/x','git remote remove feature/x','git fetch --delete'], why:'Deleting a remote branch is done with push --delete; the local deletion is separate.'},
{q:'Why does pulling frequently reduce conflicts?', o:['Because Git ignores small changes','Because your copy stays close to the team\u2019s, so overlapping changes stay smaller and get resolved sooner','Because pull automatically deletes conflicts','It has no effect'], why:'The later you sync, the more the diverging changes pile up, and the harder their collision becomes.'}
]},
{ id:9, title:'Merge', subtitle:'The moment a branch comes back home.',
body:`
<h3>What is a merge?</h3>
<p><strong>Merge</strong> means bringing the changes of one branch into another. The most common case: your work on a feature branch is done, and now you bring it into main:</p>
<pre><code>git switch main
git pull                          <span class="c"># update main first</span>
git merge feature/search-empty-state
git branch -d feature/search-empty-state  <span class="c"># delete the finished branch</span></code></pre>
<h3>Three ways to merge — these three are all you need</h3>
<h4>1) Fast-forward</h4>
<p>If main has received no new commits since the branch split off, Git simply moves the main pointer forward. No new commit is created; the history stays a straight line.</p>
<pre><code>before:  main ──o───o
                  \\───o───o  feature
after:   main ──o───o───o───o   <span class="c">(a straight line)</span></code></pre>
<h4>2) Merge Commit</h4>
<p>If both branches have moved forward, Git creates a <strong>merge commit</strong> with two parents. The full history of both branches is preserved, but the graph gets busier (non-linear history).</p>
<pre><code>main ──o───o───────M   <span class="c">← merge commit with two parents</span>
            \\─o───o/   feature</code></pre>
<h4>3) Squash Merge</h4>
<p>All the branch\u2019s commits enter main <strong>squashed into one clean commit</strong>. Main\u2019s history stays linear and readable, and the branch\u2019s tiny commits ("wip", "fix typo") never enter it. A very popular option in GitHub PRs.</p>
<h3>Which one should I choose?</h3>
<table><tr><th>Method</th><th>Best for</th><th>Result in the history</th></tr>
<tr><td>Fast-forward</td><td>Small branches when main has stayed still</td><td>Linear, no extra commit</td></tr>
<tr><td>Merge Commit</td><td>When you want the branch\u2019s full history preserved</td><td>Non-linear, with an explicit merge point</td></tr>
<tr><td>Squash</td><td>Feature branches full of tiny, messy commits</td><td>Linear, one commit per feature</td></tr></table>
<p><strong>Rebase and Merge</strong> is the fourth option on GitHub: the branch\u2019s commits are placed onto main one by one, rewritten, so the history stays linear; for now just know it exists — the details come in the Rebase level.</p>
<h3>What should you check before merging?</h3>
<pre><code>git diff main..feature/search-empty-state   <span class="c"># all the changes entering main</span>
git log --oneline main..feature/search-empty-state  <span class="c"># the list of commits</span></code></pre>
<div class="callout note"><span class="co-title">In team work</span>You do not merge directly onto main; you push the branch, open a Pull Request, and the merge happens inside the PR after review. The mechanics are the same — just with oversight.</div>
`,
quiz:[
{q:'When does a Fast-forward merge happen?', o:['When the branch has a conflict','When main has received no new commits since the branch split off','When you use --force','On every successful merge'], why:'When main has no parallel changes, Git just moves the pointer forward — no new commit.'},
{q:'What does a Squash Merge do?', o:['It deletes the branch','It brings all the branch\u2019s commits into main squashed into one commit','It copies the commits one by one','It merges main into the branch'], why:'Squash keeps main\u2019s history clean: each feature = one commit.'},
{q:'What is special about a merge commit?', o:['It has no message','It has two parents and records the point where two branches joined','It cannot be reverted','It is only created on GitHub'], why:'A merge commit is the only kind of commit with two parents; that is why the history graph becomes non-linear.'},
{q:'Your branch is full of tiny commits like "wip" and "typo" and you want main to stay clean. Best choice?', o:['Fast-forward','Merge Commit','Squash Merge','None; you have to delete the commits manually'], why:'Squash gathers all those little pieces into one meaningful commit.'},
{q:'What is the correct sequence for merging a feature into main?', o:['Stay on feature and run git merge main; done','Switch to main, pull, then git merge feature, and finally delete the branch','Delete the branch first, then merge','Just pushing is enough'], why:'Merge runs on the destination branch; so you switch to main first and bring it up to date.'}
]},
{ id:10, title:'Merge Conflict', subtitle:'It looks scary, but it is just one simple question: which version?',
body:`
<h3>What is a conflict, and why does it happen?</h3>
<p>When two branches have changed <strong>the same lines of the same file</strong> in two different ways, Git cannot decide on its own which is correct — so it pauses the merge and asks you. A conflict is not an error; it is a request for a human decision. If the changes are in different files or different lines, Git merges them quietly by itself.</p>
<h3>Spotting a conflict and what it looks like</h3>
<pre><code>git merge feature/new-palette
<span class="r"># CONFLICT (content): Merge conflict in tokens.json</span>
git status   <span class="c"># conflicted files are listed under "Unmerged paths"</span></code></pre>
<p>Inside the conflicted file, Git shows you both versions using <strong>conflict markers</strong>:</p>
<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
  "primary": "#0969DA"        <span class="c">← Current Change (your current branch)</span>
=======
  "primary": "#8250DF"        <span class="c">← Incoming Change (the branch you are bringing in)</span>
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/new-palette</code></pre>
<h3>Four ways to resolve — one click in VS Code</h3>
<ul>
<li><strong>Accept Current:</strong> keep your own branch\u2019s version.</li>
<li><strong>Accept Incoming:</strong> replace it with the incoming branch\u2019s version.</li>
<li><strong>Accept Both:</strong> keep both (when both lines are needed).</li>
<li><strong>Resolve manually:</strong> delete the markers and write the correct final version yourself; sometimes the right answer is a combination of both.</li>
</ul>
<h3>After resolving: continue or abort</h3>
<pre><code><span class="c"># after deciding in every file:</span>
git add tokens.json          <span class="c"># means "this file is resolved"</span>
git commit                   <span class="c"># the merge completes</span>

<span class="c"># if you change your mind and want to go back to before the merge:</span>
git merge --abort</code></pre>
<div class="callout warn"><span class="co-title">Always check the result</span>After resolving a conflict, open the file and make sure no marker (&lt;&lt;&lt;&lt;&lt;&lt;&lt;) is left behind and the file is valid. In JSON files (like design tokens), one leftover comma breaks the entire file.</div>
<h3>Conflicts in your tools</h3>
<ul>
<li><strong>VS Code:</strong> highlights the conflicted sections with Accept buttons above each block, plus a three-column Merge Editor view.</li>
<li><strong>GitHub Desktop:</strong> lists the conflicted files and opens your editor to resolve them; it can handle the simple ones itself.</li>
<li><strong>Design tokens:</strong> conflicts in token JSON files are the most common conflicts designers face, because the file is shared and changes often.</li>
</ul>
<h3>Prevention beats cure</h3>
<ul>
<li>Keep branches small and short-lived, and merge early.</li>
<li>Pull from main regularly so your branch does not fall behind.</li>
<li>Before changing shared files (tokens, configs), coordinate with your teammates so you do not land on the same file at the same time.</li>
</ul>
`,
quiz:[
{q:'When exactly does a conflict occur?', o:['Whenever two people work on the same project','When two branches have changed the same lines of the same file differently','Every time you pull','When the internet disconnects'], why:'Changes in different lines or files are merged by Git automatically; only a direct overlap needs a human decision.'},
{q:'In the markers, what is the section between <<<<<<< HEAD and =======?', o:['The Incoming Change (the incoming branch)','The Current Change (your current branch\u2019s version)','Git\u2019s suggested final version','Corrupted code'], why:'The HEAD side is always the version of the branch you are standing on; after ======= comes the incoming version.'},
{q:'After manually resolving a conflict in a file, what is the next step?', o:['git merge --continue-file','git add that file, then git commit','Rename the file','git push --force'], why:'add tells Git this file is resolved; commit finalizes the merge.'},
{q:'You change your mind mid-conflict and want to return to the state before the merge?', o:['git undo','git merge --abort','git reset --hard origin','Delete the files manually'], why:'merge --abort cancels the operation and returns the branch to its state before the merge began.'},
{q:'Why does resolving a conflict in a token JSON file require extra care?', o:['Because JSON cannot be merged','Because one leftover marker or comma structurally breaks the file and the whole token system fails','Because GitHub rejects JSON files','It does not require extra care'], why:'JSON is a strict format; after resolving, always verify the file is valid.'},
{q:'What is the most effective way to reduce conflicts?', o:['Never creating branches','Small branches, merging early, pulling regularly from main, and coordinating on shared files','Always clicking Accept Incoming','Locking files'], why:'Conflict is the product of long divergence; frequent syncing keeps it small.'}
]}
];
