export const EN_LEVELS_3 = [
{ id:21, title:'Git for AI Projects', subtitle:'When a machine writes part of the code, Git becomes your quality control system.',
body:`
<h3>Why is Git critical here?</h3>
<p>AI-generated code is fast, voluminous, and sometimes goes beyond what you asked for. Git gives you three things without which working with agents is unmanageable: a <strong>restore point</strong>, a <strong>reviewable Diff</strong>, and a <strong>separate space for experiments</strong>.</p>
<h3>A safe protocol for working with an agent</h3>
<pre><code>1. git status            <span class="c"># make sure nothing uncommitted is left hanging</span>
2. git commit            <span class="c"># create a clean restore point</span>
3. git switch -c experiment/ai-onboarding   <span class="c"># separate branch for the experiment</span>
4. <span class="c">&larr; run the Prompt / Agent</span>
5. git diff              <span class="c"># review line by line; anything out of scope?</span>
6. git add -p            <span class="c"># stage only the changes that are right</span>
7. git commit            <span class="c"># with a clear message, noting it was AI-assisted</span></code></pre>
<h3>Checklist for reviewing AI output</h3>
<ul>
<li><strong>Out-of-scope changes:</strong> Were files modified that should have been left alone? Did it rewrite healthy code on its own initiative?</li>
<li><strong>Added dependencies:</strong> Every new package in <code>package.json</code> must be necessary and trustworthy.</li>
<li><strong>Config files:</strong> Changes to build/lint settings have project-wide effects.</li>
<li><strong>Security risk:</strong> Sample keys or tokens in the code, calls to unknown services, disabled protections.</li>
<li><strong>Accidental deletions:</strong> Take large red blocks in the Diff seriously.</li>
</ul>
<h3>Recording generation context (Prompt Changelog)</h3>
<p>For reproducibility and transparency, keep the generation details in the repository: the prompt that was used, the model and its version, and the context and constraints you provided. A simple file like <code>ai/prompts.md</code> is enough:</p>
<pre><code>## 2026-04-02 — Empty state component
Model: claude-opus-5
Prompt: "Build an EmptyState component with the existing tokens; no raw color values."
Constraints: no new libraries, RTL-safe
Outcome: accepted with a spacing fix (PR #128)</code></pre>
<h3>Comparing multiple outputs</h3>
<p>Want to evaluate two AI solutions? Put each output on its own branch (<code>experiment/ai-a</code> and <code>experiment/ai-b</code>), commit each one, and compare them with <code>git diff experiment/ai-a experiment/ai-b</code> or each branch's preview. The losing branch gets deleted, without leaving any trace on main.</p>
<h3>Governance: agents on a team</h3>
<ul>
<li><strong>Limit access:</strong> An agent should never hold a production key or be allowed to push directly to main.</li>
<li><strong>Agent-generated Commit/PR:</strong> In the commit message or PR description, state that the output was produced with AI assistance and who reviewed it.</li>
<li><strong>Mandatory human review:</strong> Configure branch protection so that no AI change gets merged without human approval.</li>
</ul>
<div class="callout tip"><span class="co-title">Bottom line</span>A designer's core skill in the AI era isn't writing prompts; it's <strong>reading Diffs</strong> and having a restore point.</div>
`,
quiz:[
{q:'Before running a large prompt against your project, what matters most?', o:['Closing all your files','Committing a clean state and working on a separate branch','Deleting the history','Pushing to main'], why:'A commit creates a restore point, and a separate branch keeps main safe from a failed experiment.'},
{q:'The AI changed files that were not part of your request. What is this problem called?', o:['Merge Conflict','An out-of-scope change','Fast-forward','Detached HEAD'], why:'Going beyond the scope of the request is the most common risk with agent output, and it shows up in the Diff.'},
{q:'You want to compare two different AI solutions. Best structure?', o:['Commit both onto main','Each output on its own branch, then compare with diff or a preview','Copy the files into two folders','Keep only the first one'], why:'Parallel branches make it possible to compare and discard the losing option without polluting main.'},
{q:'What do you record in a Prompt Changelog?', o:['Only the date','The prompt, model and version, constraints, and the outcome','Your GitHub username','The number of lines of code'], why:'This information makes the output reproducible and the decisions reviewable.'},
{q:'Which policy is right for an agent on a team?', o:['Full admin access for speed','Limited access, no direct pushes to main, and mandatory human review','No restrictions at all','A complete ban on using it'], why:'Least privilege plus human review preserves speed without giving up control.'},
{q:'The most important Git skill for a designer working with AI?', o:['Memorizing every command','Reading Diffs carefully and having a restore point','Writing pipelines','Mastering Git internals'], why:'Evaluating output and being able to go back are the two pillars of working safely with AI.'}
]},
{ id:22, title:'Git for Prototypes', subtitle:'Multiple live, comparable versions — without final-v7 folders.',
body:`
<h3>A repository for prototypes</h3>
<p>A code prototype deserves its own lightweight repository — a place where you're free to experiment without the pressure of production standards. Practical advice: <strong>keep prototype and production separate</strong>, so exploratory code doesn't accidentally slip into the product and throwaway code doesn't slow down the team's reviews.</p>
<h3>One idea, one branch</h3>
<ul>
<li><strong>Variant:</strong> <code>prototype/nav-tabs</code> and <code>prototype/nav-drawer</code> to compare two solutions.</li>
<li><strong>User flow:</strong> <code>prototype/checkout-one-step</code> for one complete path.</li>
<li><strong>Stakeholder version:</strong> a version simplified or polished for a presentation.</li>
<li><strong>User test:</strong> <code>prototype/test-round-2</code>, which stays untouched during the test so the results remain valid.</li>
</ul>
<p>Treat <strong>main in the prototype repository</strong> as the <strong>stable version</strong>: the one that always works and that you can show anyone without stress.</p>
<h3>Per-branch deploys and Preview URLs</h3>
<p>Hosting services (like Vercel or Netlify, and GitHub Pages too) can connect to your repository and create a live <strong>Preview URL</strong> for every branch or every PR. For a designer, the effect is transformative:</p>
<ul>
<li>A live link for stakeholders instead of a zip file or screenshots.</li>
<li>User testing on the user's real device.</li>
<li>Comparing two variants side by side in two browser tabs.</li>
</ul>
<div class="example"><div class="ex-title">A real workflow</div>
<pre><code>git switch -c prototype/nav-drawer
<span class="c"># build the variant ... </span>
git push -u origin prototype/nav-drawer
<span class="c"># a Preview URL is created automatically &rarr; send the link to the team</span>
<span class="c"># record feedback in that branch's PR or Issue</span></code></pre></div>
<h3>Recording feedback and each version's fate</h3>
<p>Open a PR (even a Draft) for every variant, and write the feedback, test results, and final decision right there. After the decision:</p>
<ul>
<li><strong>Winner:</strong> merge into the prototype's main.</li>
<li><strong>Loser:</strong> delete the branch — the history and the documented discussion live on in the closed PR.</li>
<li><strong>Rollback:</strong> if the new version bombs in a presentation, get back quickly with a revert or by returning to the stable version's tag.</li>
</ul>
<h3>Turning a prototype into production</h3>
<p>Prototype code usually doesn't go straight into the product; but its value isn't thrown away either: the prototype acts as an <strong>executable specification</strong> — it shows behavior, animation, states, and edge cases precisely. In the hand-off PR, link to the prototype branch or commit so the developer has an exact reference.</p>
`,
quiz:[
{q:'Why do we keep the prototype repository separate from production?', o:['To save disk space','So exploratory code does not accidentally enter the product and freedom to experiment is preserved','Because Git has two kinds of repositories','To make cloning faster'], why:'Prototype and product standards are different; separation keeps both healthy.'},
{q:'What does a Preview URL enable?', o:['Editing code in the browser','A live link for every branch/PR for presentations, user testing, and comparing variants','Automatic backups','Deleting branches'], why:'Instead of files and screenshots, you share a real, runnable version with ease.'},
{q:'You want to evaluate two navigation variants with the team. The right structure?', o:['Both in one branch with code commented out','Each variant on its own branch with its own preview','Two independent repositories','Screenshots only'], why:'Parallel branches make side-by-side comparison and discarding the loser simple.'},
{q:'A variant failed in user testing. Best move?', o:['Keep the branch forever','Delete the branch and record the reasoning in the closed PR','Delete the whole repository','Merge it into main'], why:'A dead branch clutters the repository, but the knowledge behind the decision should be recorded and preserved in the PR.'},
{q:'The proper role of a prototype in the transition to production?', o:['Its code gets copied verbatim','It is a precise reference for behavior, states, and edge cases for the final implementation','It gets thrown away','It replaces Figma'], why:'A prototype is a living executable specification, even when its code is not meant to be reused as-is.'}
]},
{ id:23, title:'Git for Design Systems', subtitle:'When your design output is code, Git becomes the primary tool for managing it.',
body:`
<h3>Why is a Design System fragile without version control?</h3>
<p>A Design System is a product with many consumers. Without history, versioning, and review, one small change can break ten products at once. Git answers three vital questions: what changed, why, and how do we go back.</p>
<h3>The Design Token repository</h3>
<p>Tokens are usually kept in JSON files and feed every platform:</p>
<pre><code>{
  "color": {
    "brand": { "value": "#0969DA" },
    "danger": { "value": "#CF222E" }
  },
  "spacing": { "md": { "value": "16px" } }
}</code></pre>
<p>Every token change is perfectly transparent in a Diff: one red line and one green line. That's why reviewing tokens is far more precise than sending a screenshot of a color in chat.</p>
<h3>The component change workflow</h3>
<pre><code>1. Issue: the problem and the reason for the change
2. Branch: ds/button-focus-state
3. Change the component + update the docs (Storybook)
4. PR with Before/After, states, and an a11y note
5. Review by the system designer (Code Owner) + a developer
6. Merge &rarr; release a new version with a Tag and Changelog</code></pre>
<h3>Breaking changes, deprecation, and migration</h3>
<ul>
<li><strong>Breaking Change:</strong> a change that forces consumers to modify their code (removing a token, renaming a prop) &larr; a MAJOR version.</li>
<li><strong>Deprecation:</strong> the politer path: first declare the old element "deprecated" (with a warning and a suggested replacement), then remove it in the next version.</li>
<li><strong>Migration Guide:</strong> a step-by-step "from version 1 to 2" guide with an old &rarr; new table. Without it, upgrading becomes very expensive for teams.</li>
</ul>
<h3>Documentation and quality</h3>
<ul>
<li><strong>Storybook:</strong> living component documentation kept next to the code in the same repository and updated with every PR. Documentation kept apart from the code always falls behind.</li>
<li><strong>Documentation versioning:</strong> each version's docs must match that version's code; a team still on v1 needs to see the v1 docs.</li>
<li><strong>Visual regression testing:</strong> automatic screenshots of components on every PR, compared against the previous version; it catches unintended visual changes before Merge.</li>
</ul>
<h3>Governance</h3>
<ul>
<li><strong>Contribution Guideline:</strong> a file that explains how to propose changes, what's required, and what the acceptance criteria are.</li>
<li><strong>Code Owners:</strong> changes to tokens or foundational components automatically require the system designer's review.</li>
<li><strong>Design review in the PR:</strong> the design evaluation is recorded right there, next to the change itself.</li>
<li><strong>Connecting Figma and the repository:</strong> link to the Figma frame from every PR and to the repository from the Figma file, so the two worlds are stitched together.</li>
</ul>
`,
quiz:[
{q:'Why is a Diff valuable for reviewing tokens?', o:['Because it is colorful','Because it shows the exact value changes line by line, without ambiguity','Because JSON is small','Because it has no Figma'], why:'A Diff shows the change from "#0969DA to #0A6FD0" explicitly — something you cannot spot in a screenshot.'},
{q:'Removing a token that other products depend on is what kind of change?', o:['A patch','A Breaking Change requiring a MAJOR version','Just a cosmetic fix','An internal change with no effect'], why:'Consumers are forced to change their code — the exact definition of a Breaking Change.'},
{q:'Deprecation means?', o:['Immediate removal','Declaring something obsolete and introducing a replacement, before removing it in the next version','Restoring the previous version','Locking the component'], why:'Deprecation gives teams the chance to migrate gradually instead of breaking suddenly.'},
{q:'What does a visual regression test catch?', o:['Grammar mistakes in text','Unintended visual changes, via automatic screenshot comparison','Memory leaks','Network problems'], why:'Comparing before/after images on every PR reveals unexpected visual changes before Merge.'},
{q:'Why should documentation live in the same repository as the code?', o:['To save money','Because it gets updated alongside the code in every PR and never falls behind','Because GitHub requires it','For better security'], why:'Documentation kept apart from the code quickly becomes stale; here it is updated in the same PR.'},
{q:'What does a Migration Guide do?', o:['Deletes the old version','Explains the step-by-step path for upgrading from the previous version to the new one','Changes the code automatically','Blocks users'], why:'Without a migration guide, a Breaking Change effectively leaves teams stuck on the old version.'}
]},
{ id:24, title:'Git for Figma and Design Tokens', subtitle:'Connecting the worlds of design and code — where you must know where the truth lives.',
body:`
<h3>Figma Variables and Design Tokens</h3>
<p><strong>Figma Variables</strong> are named values (color, spacing, typography, and so on) inside the design file. The same concepts live in code as <strong>Design Tokens</strong> stored in JSON. Sync means keeping the two in agreement.</p>
<h3>How does sync work?</h3>
<p>Figma plugins (like Tokens Studio and similar ones) can connect to a repository:</p>
<ul>
<li><strong>Push from Figma to GitHub:</strong> variable changes are committed on a new branch and a PR is created.</li>
<li><strong>Pull from GitHub to Figma:</strong> values flow from the repository back into the design file.</li>
<li><strong>One-way or two-way:</strong> two-way sync creates the possibility of a <strong>Token Conflict</strong> (both sides changed the same token). The simplest policy for small teams: make one direction official — usually Figma as the source of changes and the repository as the destination.</li>
</ul>
<h3>Source of Truth</h3>
<p>The most important decision in this space: <strong>where does the truth live?</strong></p>
<table><tr><th>Design Source of Truth (Figma)</th><th>Code Source of Truth (Repo)</th></tr>
<tr><td>The designer makes changes, the code follows</td><td>The repository is the official reference; Figma syncs to it</td></tr>
<tr><td>Faster for design-driven teams</td><td>Safer for large, multi-platform products</td></tr></table>
<p>There is no wrong choice; there is an <strong>unclear</strong> choice. A team that hasn't settled this keeps getting stuck on "which value is correct?"</p>
<h3>Branches and PRs for tokens</h3>
<p>Never take a brand color or typography scale change straight to main. Create a <code>tokens/brand-color-update</code> branch and write in the PR: which token, the old and new value, where it is used, and a screenshot of the visual impact.</p>
<h3>Renaming, removal, and aliases</h3>
<ul>
<li><strong>Renaming or removing a token:</strong> it's a Breaking Change; it needs deprecation, a Migration Guide, and a MAJOR version.</li>
<li><strong>Token Alias:</strong> a token that points to another token — for example <code>button-background &rarr; color-brand</code>. The alias layer (semantic tokens) means a change to a base value propagates correctly everywhere without renaming anything in the components.</li>
</ul>
<h3>Token transformation and Style Dictionary</h3>
<p><strong>Style Dictionary</strong> is a tool that converts JSON tokens into each platform's format: CSS Variables for the web, XML for Android, Swift for iOS. One source, many outputs; and because the conversion happens in the repository, the outputs always stay in sync with the source.</p>
<div class="callout tip"><span class="co-title">What to look for when reviewing tokens in a Diff</span>Did only the value change, or the name too? (A rename = Breaking.) Does the new token follow the naming convention? Do the aliases still point to an existing token? Is the JSON file still valid?</div>
`,
quiz:[
{q:'Figma being the Source of Truth means?', o:['The repository gets deleted','The designer makes changes in Figma and the code follows them','Only developers may make changes','Both sides are the reference at the same time'], why:'Being the reference means the official direction of change starts there; the other side syncs to it.'},
{q:'The main risk of two-way sync?', o:['Slowness','A Token Conflict when both sides have changed the same token','Larger file sizes','Losing branches'], why:'Without a clear reference, parallel changes collide and must be resolved by hand.'},
{q:'What is a Token Alias?', o:['A nickname for a file','A token that points to another token (e.g. button-background → color-brand)','An old version of a token','A deleted token'], why:'The semantic alias layer lets a base value change propagate correctly through the whole system.'},
{q:'What does Style Dictionary do?', o:['Opens the Figma file','Converts JSON tokens into formats for different platforms (CSS, XML, Swift)','Resolves conflicts','Creates commits'], why:'One token source, multiple synchronized outputs for web and mobile.'},
{q:'You saw a token being renamed in a Diff. What does that mean?', o:['A simple fix','Probably a Breaking Change that needs deprecation and a migration guide','Just a cosmetic change','It should be approved without review'], why:'Any code depending on the old name will break, so the formal path for breaking changes must be followed.'},
{q:'How do you get a brand color change into the repository?', o:['Directly on main','On a separate branch with a PR including old/new values, usage locations, and a screenshot of the impact','With a message in the team chat','With no explanation, since it is obvious'], why:'A token change has project-wide impact; it must be reviewed like any other high-risk change.'}
]},
{ id:25, title:'GitHub Actions and CI/CD', subtitle:'Just enough to understand why a PR turned red and what to do about it.',
body:`
<h3>What are CI and CD?</h3>
<ul>
<li><strong>CI (Continuous Integration):</strong> with every change, the project's health is checked automatically (it builds, the tests pass, standards are met).</li>
<li><strong>CD (Continuous Delivery/Deployment):</strong> an approved change is automatically released or made ready to release.</li>
</ul>
<h3>GitHub Actions and its vocabulary</h3>
<p><strong>GitHub Actions</strong> is the system that runs this work. Its structure is simple:</p>
<ul>
<li><strong>Workflow:</strong> the whole automated process (defined in a file inside <code>.github/workflows/</code>).</li>
<li><strong>Trigger:</strong> what starts it — for example, a PR being opened or a push to main.</li>
<li><strong>Job:</strong> one independent unit of work (say, "tests").</li>
<li><strong>Step:</strong> the steps inside each Job (install dependencies, run a command).</li>
</ul>
<pre><code>on: pull_request        <span class="c"># Trigger</span>
jobs:
  test:                 <span class="c"># Job</span>
    steps:              <span class="c"># Steps</span>
      - npm install
      - npm test</code></pre>
<h3>Common checks you'll see on a PR</h3>
<table><tr><th>Check</th><th>What it means</th><th>When it turns red, it means</th></tr>
<tr><td>Build</td><td>Does the project build?</td><td>A code error; this version does not run at all</td></tr>
<tr><td>Test</td><td>Do the tests pass?</td><td>Some behavior is broken</td></tr>
<tr><td>Lint</td><td>Are the code style rules followed?</td><td>Usually a simple, automatable fix</td></tr>
<tr><td>Accessibility</td><td>a11y rules (contrast, roles, labels)</td><td>An accessibility issue — important for a designer!</td></tr>
<tr><td>Visual Regression</td><td>Visual difference from the previous version</td><td>Either a visual bug, or an intentional change that needs approval</td></tr>
</table>
<h3>Preview Deployments and deploying after Merge</h3>
<p>A workflow can build a <strong>Preview Deployment</strong> for every PR (the same Preview URL from level 22) and, after the merge into main, release the production version.</p>
<h3>When a PR turns red</h3>
<ol>
<li>Click the check's name and open the <strong>Action Log</strong>.</li>
<li>The error message is usually at the end of the log, in the red lines.</li>
<li>If it's Lint, it can often be fixed with one automated command; if it's Visual Regression, look at the diff image and decide whether the change was intentional.</li>
<li>Commit and push the fix; the checks re-run automatically.</li>
</ol>
<p>A <strong>Required Check</strong> is a check that must turn green before the Merge button is enabled. A <strong>Secret in Actions</strong> is where the keys a workflow needs are stored in the repository settings (without ever appearing in the code).</p>
<div class="callout note"><span class="co-title">Your role</span>You don't need to write pipelines. You need to be able to read the state of the checks, recognize design-related problems (a11y and Visual Regression), and know that "it works on my machine" is not a valid answer to a red check.</div>
`,
quiz:[
{q:'CI in one sentence?', o:['Automatic release to a server','Automatic health checks on the project with every change','A design tool','A task management system'], why:'Continuous Integration means every change is built and tested immediately, so breakage is caught early.'},
{q:'A Trigger in GitHub Actions is?', o:['The final result','The event that starts a Workflow (such as a PR being opened)','A runtime error','The name of a Job'], why:'The Trigger is the condition that starts a Workflow automatically.'},
{q:'The Accessibility check turned red. The designer’s responsibility?', o:['It has nothing to do with the designer','Investigating the issue (contrast, labels, focus), because it relates directly to design decisions','Just force the Merge','Disable the check'], why:'a11y failures usually have design roots, and the designer is the best person to fix them.'},
{q:'Visual Regression turned red, but the change was intentional. What do you do?', o:['Delete the check','Review the diff image and approve the change as the new reference version','Close the PR','Revert the change'], why:'This check reports a difference, not necessarily an error; human approval decides whether it was intentional or a bug.'},
{q:'A Required Check means?', o:['A check that is optional','A check that must turn green before merging is allowed','A fast check','A manual check'], why:'Branch Protection determines which checks are mandatory for a Merge.'},
{q:'The first step to understand why a check turned red?', o:['Restart your computer','Open the Action Log and read the error message','Close the PR','Push again without any changes'], why:'The log tells you exactly which step failed and why.'}
]},
{ id:26, title:'Command-Line Reference', subtitle:'The essential everyday commands and the next layer, at a glance.',
body:`
<h3>Layer one: the essential commands</h3>
<p>These cover 90% of your daily work:</p>
<table><tr><th>Command</th><th>What it does</th></tr>
<tr><td><code>git --version</code></td><td>Check installation and version</td></tr>
<tr><td><code>git config</code></td><td>Set your name, email, and Git's behavior</td></tr>
<tr><td><code>git init</code></td><td>Create a new repository</td></tr>
<tr><td><code>git clone</code></td><td>Get an existing repository</td></tr>
<tr><td><code>git status</code></td><td>Current state — the most-used command</td></tr>
<tr><td><code>git add</code></td><td>Stage changes</td></tr>
<tr><td><code>git commit</code></td><td>Record in the history</td></tr>
<tr><td><code>git diff</code></td><td>See changes in detail</td></tr>
<tr><td><code>git log</code></td><td>Browse the history</td></tr>
<tr><td><code>git branch</code></td><td>Manage branches</td></tr>
<tr><td><code>git switch</code> / <code>git checkout</code></td><td>Move between branches (switch is the modern one)</td></tr>
<tr><td><code>git merge</code></td><td>Merge branches</td></tr>
<tr><td><code>git remote</code></td><td>Manage remote addresses</td></tr>
<tr><td><code>git fetch</code> / <code>git pull</code></td><td>Get changes from the remote</td></tr>
<tr><td><code>git push</code></td><td>Send changes to the remote</td></tr>
<tr><td><code>git restore</code></td><td>Restore a file / unstage it</td></tr>
<tr><td><code>git revert</code></td><td>Safely undo a commit</td></tr>
<tr><td><code>git stash</code></td><td>Temporarily shelve changes</td></tr>
<tr><td><code>git tag</code></td><td>Mark a version</td></tr>
</table>
<h3>Layer two: once you're more advanced</h3>
<ul>
<li><code>git show COMMIT</code> — the details and changes of one specific commit.</li>
<li><code>git blame FILE</code> — who wrote each line of a file, in which commit, and when. Unbeatable for answering "why is this value like this?" (the name sounds scary, but the use is investigative).</li>
<li><code>git reflog</code> — the history of HEAD's movements; your lifeline.</li>
<li><code>git reset</code> — rewrite local history (with caution).</li>
<li><code>git rm</code> / <code>git mv</code> — delete and move files while recording it in the stage.</li>
<li><code>git clean -n</code> — list the untracked files that would be deleted (<code>-f</code> actually deletes them; irreversible).</li>
<li><code>git grep "text"</code> — quickly search for text across the repository's files.</li>
<li><code>git shortlog -sn</code> — commit counts per author.</li>
<li><code>git archive</code> — a zip export of one version without the history (good for handing off externally).</li>
<li><code>git cherry-pick</code> and <code>git rebase</code> — the next levels.</li>
<li><code>git bisect</code> — find the commit that introduced a bug, using binary search. Low priority, but when you need it, it feels like magic.</li>
</ul>
<div class="callout tip"><span class="co-title">A useful shortcut</span>For any command you don't know: <code>git help COMMAND</code> or <code>git COMMAND -h</code>. And if you're stuck, <code>git status</code> usually suggests the next step itself.</div>
`,
quiz:[
{q:'You want to find out who wrote the value on one line of CSS and why. Which command?', o:['git log','git blame styles.css','git diff','git show'], why:'blame shows the last commit and its author for each line, and from there you can trace the reason for the change.'},
{q:'What does git clean -f do?', o:['Clears the cache','Actually deletes untracked files (irreversible)','Deletes commits','Empties the stage'], why:'Always check the list of deletable files with -n first; these files leave no trace in Git.'},
{q:'Which command should you use the most during the day?', o:['git reset','git status','git rebase','git archive'], why:'status is your compass: where you are, what has changed, and what the next step is.'},
{q:'git show versus git log?', o:['They are the same','log is the list of commits; show is the details and changes of one specific commit','show is only for tags','log only shows the latest commit'], why:'log is the overview of the history; show is a magnifying glass on one commit.'},
{q:'What is git bisect for?', o:['Splitting a branch','Finding the commit that introduced a bug, using binary search','Splitting a large commit','Cutting a file in half'], why:'By binary-testing between the healthy and broken versions, it quickly pinpoints the guilty commit.'}
]},
{ id:27, title:'Rebase', subtitle:'Rewriting history for a clean timeline — but only once you know its rules.',
body:`
<h3>What is Rebase?</h3>
<p><strong>Rebase</strong> means picking up your branch's commits and "replanting" them on top of another branch. The result: as if you had started your work on the latest version of main from the very beginning.</p>
<pre><code>before:  main    o───o───A───B
                   \\
         feature    o1──o2

after rebase main:
         main    o───o───A───B
                             \\
         feature              o1'──o2'   <span class="c">&larr; the rewritten commits</span></code></pre>
<h3>Merge or Rebase?</h3>
<table><tr><th></th><th>Merge</th><th>Rebase</th></tr>
<tr><td>History</td><td>True and non-linear, with a merge commit</td><td>Linear and clean (Linear History)</td></tr>
<tr><td>Commits</td><td>Left untouched</td><td>Rewritten (new hashes)</td></tr>
<tr><td>Safety</td><td>Always safe</td><td>Safe only on a personal branch</td></tr>
</table>
<h3>Updating a local branch with Rebase</h3>
<pre><code>git switch feature/hero
git fetch origin
git rebase origin/main     <span class="c"># replant my work on the latest main</span></code></pre>
<h3>Interactive Rebase — cleanup before a PR</h3>
<pre><code>git rebase -i HEAD~4   <span class="c"># edit the last four commits</span></code></pre>
<p>An editor opens and you choose a command for each commit:</p>
<ul>
<li><strong>squash / fixup:</strong> fold a commit into the previous one (fixup discards its message).</li>
<li><strong>reword:</strong> fix a commit message.</li>
<li><strong>drop:</strong> delete a commit entirely.</li>
<li><strong>Line order:</strong> moving the lines around means reordering the commits.</li>
</ul>
<h3>Conflicts during a Rebase</h3>
<p>Because the commits are re-applied one by one, you may hit conflicts several times — once per commit:</p>
<pre><code><span class="c"># resolve the conflict in the files, then:</span>
git add FILE
git rebase --continue
<span class="c"># or give up entirely and go back to how things were:</span>
git rebase --abort</code></pre>
<h3>The golden rule and force push</h3>
<div class="callout warn"><span class="co-title">Never rebase a public branch</span>Rebase changes commit hashes. If you rebase a branch that others are working on, their history becomes incompatible with yours and everyone ends up in trouble. Rebase belongs on a personal, unpushed branch (or one only you are working on).</div>
<p>After a rebase, your local branch diverges from the remote version and a normal push is rejected. The right way:</p>
<pre><code>git push --force-with-lease
<span class="c"># if someone has pushed something in the meantime, it stops</span>
<span class="c"># ❌ git push --force  &larr; overwrites blindly and swallows other people's work</span></code></pre>
`,
quiz:[
{q:'Rebase in one sentence?', o:['Deleting extra commits','Replanting your branch’s commits on top of another branch for a linear history','Merging two branches with a new commit','Restoring a file'], why:'Rebase moves the branch’s base and re-applies (and rewrites) the commits.'},
{q:'Why is rebasing a public branch dangerous?', o:['It is slow','The commit hashes change, and the history of teammates who have that branch becomes incompatible','GitHub does not support it','Files get deleted'], why:'Rewriting shared history makes everyone else’s copy diverge from the new version.'},
{q:'Which task is NOT possible with Interactive Rebase?', o:['Squashing several commits','Changing a commit message (reword)','Deleting a commit (drop)','Restoring a deleted file from the Stash'], why:'Interactive Rebase is a tool for editing commit history, not for managing the Stash.'},
{q:'You hit a conflict mid-rebase and resolved it. Next step?', o:['git commit','git add FILE then git rebase --continue','git merge --continue','git push'], why:'During a rebase, instead of a new commit, you use continue to keep re-applying the commits.'},
{q:'Why is a push rejected after a rebase, and what is the right way?', o:['Your internet; try again','Because the history was rewritten and diverges from the remote; the safe way is push --force-with-lease','You must delete the branch','You must merge'], why:'--force-with-lease stops you from overwriting someone else’s work if they pushed in the meantime, unlike --force.'},
{q:'The main difference between the results of Merge and Rebase?', o:['Merge is faster','Merge produces a true, non-linear history with a merge commit; Rebase produces a linear history with rewritten commits','Rebase is safer','There is no difference'], why:'The choice is between recording reality precisely (Merge) and linear readability (Rebase).'}
]},
{ id:28, title:'Cherry-pick', subtitle:'Taking exactly one commit from one branch and bringing it to another.',
body:`
<h3>What is Cherry-pick?</h3>
<p>When you need just <strong>one specific commit</strong> from a branch — not the whole branch — you use Cherry-pick. Git takes that commit's changes and applies them as a new commit (with a new hash) on the current branch.</p>
<pre><code>git switch main
git cherry-pick a1b2c3d          <span class="c"># one commit</span>
git cherry-pick a1b2c3d f4e5d6c  <span class="c"># several commits</span></code></pre>
<h3>The right use cases</h3>
<ul>
<li><strong>Hotfix:</strong> you fixed an urgent bug on a feature branch, and that one commit needs to go to main immediately — without dragging the rest of the unfinished work along.</li>
<li><strong>Rescuing one piece of an abandoned branch:</strong> the experiment failed, but it contained one useful commit.</li>
<li><strong>Moving a commit to the right branch:</strong> you accidentally committed on main or the wrong branch.</li>
</ul>
<h3>Conflicts and bailing out</h3>
<pre><code><span class="c"># if there is a conflict: resolve the files, then</span>
git add FILE
git cherry-pick --continue
<span class="c"># or give up:</span>
git cherry-pick --abort</code></pre>
<h3>The duplicate-commit risk</h3>
<div class="callout warn"><span class="co-title">Twin commits</span>The transplanted commit has a new hash, meaning that to Git it is not the same as the original. If you later merge that same branch too, "the same change" appears twice in the history, and the odds of confusing conflicts go up.</div>
<h3>Cherry-pick or Merge?</h3>
<table><tr><th></th><th>Cherry-pick</th><th>Merge</th></tr>
<tr><td>What it brings</td><td>Only the selected commits</td><td>The whole branch with its history</td></tr>
<tr><td>Hashes</td><td>New (a copy)</td><td>Preserved</td></tr>
<tr><td>Best for</td><td>Exceptional, urgent cases</td><td>The normal workflow</td></tr>
</table>
<h3>When NOT to use Cherry-pick</h3>
<ul>
<li>As a daily workflow instead of Merge — it fragments the history and makes it untrustworthy.</li>
<li>When you need several consecutive commits (merge or rebase the branch instead).</li>
<li>When a commit depends on earlier commits; picking it alone breaks the code.</li>
</ul>
`,
quiz:[
{q:'What does Cherry-pick do?', o:['Merges the whole branch','Applies the changes of one specific commit as a new commit on the current branch','Deletes the commit','Copies the branch'], why:'It selectively takes one (or a few) commits, without bringing the whole branch along.'},
{q:'The most fitting situation for Cherry-pick?', o:['The daily workflow instead of Merge','Urgently moving one bug-fix commit to main, without dragging the rest of the unfinished work along','Merging two complete branches','Restoring a deleted file'], why:'Its primary use is exceptional cases like a Hotfix.'},
{q:'Why can Cherry-pick lead to a confusing history?', o:['Because it deletes the commit','Because the copied commit has a new hash, and if the branch is merged later the same change appears twice','Because it only works on main','Because it ignores conflicts'], why:'Git sees two commits with different hashes as two different things, even if their content is identical.'},
{q:'You hit a conflict during a Cherry-pick and want to bail out?', o:['git merge --abort','git cherry-pick --abort','git reset --hard','git revert'], why:'Every in-progress operation has its own dedicated abort.'},
{q:'Which case is a poor fit for Cherry-pick?', o:['One self-contained bug-fix commit','A set of interdependent commits that together build a complete feature','A commit stranded on the wrong branch','One useful commit from an abandoned branch'], why:'For an interdependent set, Merge or Rebase is the right way; cherry-picking pieces breaks the code.'}
]},
{ id:29, title:'Git Internals', subtitle:'Under the hood: the Object Model, HEAD, and the structure of history.',
body:`
<div class="callout note"><span class="co-title">Deeper, but still on the course path</span>This level goes deeper than daily work, but it is part of the full course path and required for the completion certificate. Here you learn why Git is so reliable and why almost nothing ever gets lost.</div>
<h3>The Object Model — Git is a simple database</h3>
<p>Git is really a store of "objects," where each object is identified by a <strong>Hash</strong> (a <strong>SHA</strong> computed from its content). The four main object types:</p>
<ul>
<li><strong>Blob:</strong> the content of a file (without its name).</li>
<li><strong>Tree:</strong> a folder; a list of names pointing to Blobs and other Trees.</li>
<li><strong>Commit Object:</strong> a pointer to a Tree (a snapshot of the whole project) + parent(s) + author + message.</li>
<li><strong>Tag Object:</strong> an annotated tag.</li>
</ul>
<p>Because the identifier is derived from the content, changing a single byte means a completely new object with a different hash; that is why every change in content is <strong>detectable</strong> and the integrity of the history can be verified. Note: this means tampering "becomes visible," not that history is immutable — local history can still be rewritten with <code>reset</code> or <code>rebase</code> and published with a force push; but because the hashes change, that rewriting cannot stay hidden.</p>
<h3>References and HEAD</h3>
<p>A <strong>Reference</strong> is a readable name for a hash: branches and tags are just pointers to a commit. <strong>HEAD</strong> means "where you are standing right now" — usually it points to a branch.</p>
<p><strong>Detached HEAD</strong> is when you are standing directly on a commit, not on a branch. If you commit there and move away, that work is not attached to any branch (though it can be recovered from the reflog). The fix: <code>git switch -c new-branch</code>.</p>
<h3>The Index and Packfiles</h3>
<ul>
<li><strong>Index:</strong> the technical name for the Staging Area; the file that holds what is ready for the next commit.</li>
<li><strong>Packfile:</strong> to save space, Git packs objects into compressed, delta-encoded files. That is why years of history can take up surprisingly little space.</li>
<li><strong>Garbage Collection:</strong> the automatic cleanup of objects that no Reference or reflog points to. As long as the reflog holds onto them, "lost" commits remain recoverable.</li>
</ul>
<h3>The DAG and Three-way Merge</h3>
<p>Git's history structure is a <strong>DAG</strong> (a directed acyclic graph): every commit points to its parent, and merge commits have two parents. To merge, Git uses a <strong>Three-way Merge</strong>: it compares my version, your version, and the <strong>common ancestor</strong>. It is this common ancestor that lets Git figure out what actually changed and where a real conflict exists.</p>
<h3>Plumbing versus Porcelain</h3>
<p>The everyday commands (<code>add</code>, <code>commit</code>, <code>log</code>) are the <strong>Porcelain</strong> layer: made for humans. Beneath them sit <strong>Plumbing</strong> commands like <code>git hash-object</code> and <code>git cat-file</code>, which work directly with the object database and are mostly used in scripts.</p>
`,
quiz:[
{q:'What is a Blob in Git?', o:['A branch','The content of a file without its name','A commit','A remote'], why:'The file name is stored in the Tree; the Blob is just the content.'},
{q:'Why does a commit hash change when the content changes?', o:['It is random','Because the hash is computed from the object’s content, so any change creates a new object','Because the date changes','Because GitHub changes it'], why:'This is exactly what makes history integrity verifiable: any change in content changes the hash and is detectable — not that history is immutable.'},
{q:'Detached HEAD means?', o:['The repository is corrupted','You are standing directly on a commit, not on a branch','The branch was deleted','The remote connection was lost'], why:'In this state, new commits are not attached to any branch; preserve them by creating a branch right there.'},
{q:'Index is the technical name for what?', o:['The history','The Staging Area','The remote folder','The settings file'], why:'The Index is the same area that git add fills.'},
{q:'What does a Three-way Merge use?', o:['Only the two final versions','Both branches’ versions plus their common ancestor','Three different branches','The last three commits'], why:'The common ancestor is the basis for determining "who changed what," and therefore for detecting real conflicts.'}
]},
{ id:30, title:'Wrap-up and Roadmap', subtitle:'Now — where and how to put all of this to work.',
body:`
<h3>The core workflow you should master</h3>
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
<p>The matching commands, start to finish:</p>
<pre><code>git clone URL
git switch -c feature/search-empty-state
<span class="c"># ... make changes ...</span>
git status &amp;&amp; git diff
git add -p
git commit -m "feat: add empty state to search results"
git push -u origin feature/search-empty-state
<span class="c"># on GitHub: Pull Request → Review → Merge</span>
git switch main &amp;&amp; git pull
git revert COMMIT   <span class="c"># if needed</span></code></pre>
<h3>Four scenarios you should be able to run</h3>
<ol>
<li><strong>Managing multiple Prototype versions:</strong> a branch per variant, a Preview URL for each, feedback recorded in the PR, losers deleted, and the stable version kept on main. <em>(Levels 7, 22)</em></li>
<li><strong>Reviewing AI-generated changes:</strong> a commit as a restore point, a separate experiment branch, careful Diff reading, attention to dependencies and config, selective staging, and a revert if needed. <em>(Levels 13, 14, 21)</em></li>
<li><strong>Design hand-off and review in a Pull Request:</strong> a PR structured as Problem / Design decision / What changed / Figma / States / Limitations / Questions, with Before-After and responses to reviews. <em>(Levels 11, 12)</em></li>
<li><strong>Managing Design System and token changes:</strong> a branch and PR for token changes, careful Diff review, spotting Breaking Changes, Semantic Versioning, Changelog, and Releases. <em>(Levels 17, 23, 24)</em></li>
</ol>
<h3>The learning order, condensed</h3>
<table><tr><th>Phase</th><th>Content</th><th>Levels</th></tr>
<tr><td><strong>1. Must-learn</strong></td><td>Core concepts, Repo, Commit, Diff, Branch, Push/Pull, Merge, Conflict, PR, Restore/Revert, gitignore</td><td>1 to 14</td></tr>
<tr><td><strong>2. Professional work</strong></td><td>Reset, Stash, Tags & Releases, Issues, Collaboration, security</td><td>15 to 20</td></tr>
<tr><td><strong>3. Design Technologist</strong></td><td>Git for AI, Prototypes, Design Systems, Figma Sync, CI/CD, CLI, Rebase</td><td>21 to 27</td></tr>
<tr><td><strong>4. Depth & wrap-up</strong></td><td>Cherry-pick, Git Internals, wrap-up and roadmap</td><td>28 to 30</td></tr>
</table>
<h3>The three habits with the biggest impact</h3>
<ul>
<li><strong>status before anything, diff before every commit.</strong> These two habits prevent most of the common mistakes.</li>
<li><strong>Small branches, small PRs, focused commits.</strong> Review quality and team speed depend directly on this.</li>
<li><strong>Create a restore point before any risky work.</strong> With one commit, the fear of breaking things practically disappears.</li>
</ul>
<div class="callout tip"><span class="co-title">Suggested practice for this week</span>Create a private repository, put a simple HTML page in it, create two design-variant branches, deliberately create a conflict and resolve it, open a PR for yourself and write its description using the level 12 structure, and finally revert one of the commits. With this one exercise, you live through the entire core path once.</div>
`,
quiz:[
{q:'The correct order of the core workflow?', o:['Commit → Branch → Push → Diff','Branch → change → review Diff → Stage → Commit → Push → PR → Merge','Push → PR → Commit → Merge','PR → Branch → Commit → Diff'], why:'The branch comes first, the change is reviewed and recorded, then Push and PR, and finally Merge.'},
{q:'In the AI-output review scenario, the two most important tools?', o:['tag and stash','A commit as a restore point + careful Diff reading','rebase and cherry-pick','clone and fork'], why:'The ability to go back and the ability to evaluate a change are the core of working safely with AI.'},
{q:'Which combination is right for managing multiple Prototype versions?', o:['Several separate repositories, one per variant','One branch per variant + Preview URLs + feedback recorded in the PR','Everything in one branch with code commented out','Several folders named v1, v2'], why:'Branches keep the versions live, comparable, and disposable.'},
{q:'Which three habits have the biggest impact on daily work?', o:['Regular rebasing, force pushing, daily resets','Frequent status and diff, keeping branches/PRs/commits small, and creating a restore point before risky work','Memorizing commands, one commit per day, avoiding branches','Working directly on main for speed'], why:'These three habits both reduce mistakes and raise the quality of collaboration.'},
{q:'Within what framework should a Design Token change happen?', o:['Directly on main for speed','A separate branch + a PR with the visual impact + a Breaking Change assessment + versioning and a Changelog','Only in Figma, without recording it in the repository','With a message in the team chat'], why:'Tokens have project-wide impact; they must be reviewed and versioned like any high-risk change.'}
]}
];
