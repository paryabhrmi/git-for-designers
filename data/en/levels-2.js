export const EN_LEVELS_2 = [
{ id:11, title:'Pull Request', subtitle:'The most important place for team conversation about changes.',
body:`
<h3>What is a Pull Request?</h3>
<p>A <strong>Pull Request (PR)</strong> is a formal request on GitHub: "My branch is ready; please review it, and if it's approved, merge it into main." A PR is not just a Merge button; it's a space for conversation, review, recording decisions, and quality control.</p>
<div class="callout note"><span class="co-title">A common naming mix-up</span><code>git pull</code> is a local command for fetching changes; a <strong>Pull Request</strong> is a review process on GitHub. They only share part of a name.</div>
<h3>Creating a PR</h3>
<p>After you push a branch, GitHub shows a Compare &amp; pull request button. Two key choices:</p>
<ul>
<li><strong>Base Branch:</strong> the merge destination (usually main).</li>
<li><strong>Compare Branch:</strong> your branch, the one to be reviewed.</li>
</ul>
<p>Then you write a <strong>title</strong> (short and descriptive, like a good commit message) and a <strong>description</strong> (what, why, and how to test it).</p>
<h3>Parts of the PR page</h3>
<ul>
<li><strong>Conversation:</strong> the description, comments, and discussion history.</li>
<li><strong>Commits:</strong> the list of commits on the branch.</li>
<li><strong>Files Changed:</strong> the full diff; where the real review happens.</li>
</ul>
<h3>Roles and management tools</h3>
<ul>
<li><strong>Reviewer:</strong> the person you ask to review.</li>
<li><strong>Assignee:</strong> the person responsible for moving the PR forward (usually you).</li>
<li><strong>Label:</strong> tags like design or bug for categorizing.</li>
<li><strong>Draft PR:</strong> "Not finished yet, but I'd like your thoughts." When it's ready, you click Ready for Review.</li>
</ul>
<h3>The review cycle</h3>
<ol>
<li>The reviewer leaves <strong>Inline Comments</strong> on specific lines in the Files Changed tab.</li>
<li>At the end they submit one of three states: <strong>Approve</strong>, <strong>Request Changes</strong> (fixes are needed), or just Comment.</li>
<li>You commit and push your fixes on the same branch; the PR updates automatically.</li>
<li>You mark settled discussions with <strong>Resolve Conversation</strong>.</li>
<li>If main has moved ahead of your branch, the <strong>Update Branch</strong> button syncs your branch with main.</li>
<li>Finally: <strong>Merge</strong> (with one of the three methods from level 9), or <strong>Close</strong> without merging (and Reopen if needed).</li>
</ol>
<h3>Small PR, good review</h3>
<p>A PR with 200 changed lines gets a careful review; a PR with 2,000 lines gets only a tired Approve. Break big changes into several independent PRs. A <strong>PR Template</strong> (a file in the repo that predefines the description structure) helps ensure no PR is opened without the necessary information.</p>
`,
quiz:[
{q:'What is the difference between git pull and a Pull Request?', o:['They are the same thing','git pull is a command for fetching changes; a PR is the process of reviewing and approving changes on GitHub','A PR is the graphical version of git pull','git pull only works after a PR'], why:'The similarity is only in the name: one is local synchronization, the other is the social process of review.'},
{q:'What do Base and Compare mean when creating a PR?', o:['Base is your branch, Compare is the main branch','Base is the merge destination, and Compare is the branch being reviewed','Both must be main','Base means the first commit'], why:'The direction of a PR: Compare (your branch) goes into Base (usually main).'},
{q:'When is a Draft PR the right choice?', o:['For PRs that were rejected','When the work is not complete yet but you want early feedback','For private PRs','Only for bugs'], why:'Draft means "stay in the loop but don\'t merge yet"; later it becomes Ready for Review.'},
{q:'A reviewer spots a problem on line 42. The most professional tool?', o:['A message in the team\'s Telegram','An Inline Comment on that exact line in the Files Changed tab','A phone call','Editing your branch directly without telling you'], why:'An Inline Comment pins the feedback to the exact line involved and records it in the PR\'s history.'},
{q:'What does Request Changes mean?', o:['The PR is closed immediately','The reviewer withholds approval until the specified fixes are made','The branch gets deleted','It\'s just an optional suggestion'], why:'Request Changes is a formal review state: the items must be fixed and re-reviewed before merging.'},
{q:'Why is a small PR better?', o:['Because GitHub has a size limit','Because it gets a more careful review, merges faster, and is easier to roll back if something goes wrong','Because it has fewer commits','It isn\'t better; bigger is more professional'], why:'Review quality is inversely related to the size of the change.'}
]},
{ id:12, title:'Pull Requests for designers', subtitle:'Your PR can be the best Design Handoff document.',
body:`
<h3>A design PR is different from a coding PR</h3>
<p>When your change is design in nature (a component, a token, a layout, a prototype), the reviewer needs to understand the <strong>design decision</strong>, not just the code. The PR is where the problem, the decision, and the visual evidence are recorded alongside the change itself — and unlike chat messages, they stay searchable forever.</p>
<h3>Suggested structure for a design PR description</h3>
<pre><code>## Problem
On empty search results, the user was left with a blank page.

## Design decision
Empty State with a helpful message + three suggested searches.
An Illustration option was explored and rejected due to page weight.

## What changed
- New EmptyState component
- spacing-section token from 32 to 40

## Figma reference
Link to the final frame + the Explore version

## States covered
Default / no suggestions / RTL / mobile

## Known limitations
Suggestions are static for now; waiting on the API.

## Questions for review
Is 40px consistent with the rest of the pages?</code></pre>
<h3>Key elements</h3>
<ul>
<li><strong>Before / After:</strong> two screenshots side by side; the fastest way to communicate a visual change. You can drag and drop images directly into the PR description.</li>
<li><strong>Figma link:</strong> link to the exact frame, not the whole file.</li>
<li><strong>States covered:</strong> hover, focus, empty, error, loading, RTL... Writing them down both helps the reviewer and forces you to actually check them.</li>
<li><strong>Edge cases:</strong> very long text, no image, narrow viewport.</li>
<li><strong>Quality checklist:</strong> Design Tokens (no hard-coded raw values!), responsive behavior, and accessibility (contrast, focus, aria).</li>
<li><strong>Questions for the developer:</strong> ask about ambiguities right there; a question recorded in the PR beats a question lost in chat.</li>
</ul>
<h3>The PR as Design Review and Handoff</h3>
<p>When a PR is written this way, it can serve as the formal Design Review venue (a designer reviewer + a developer reviewer) and at the same time as the handoff document: the developer knows what changed, why, and with what limitations.</p>
<h3>Where PR documentation ends and Figma begins</h3>
<table><tr><th>In Figma</th><th>In the PR</th></tr>
<tr><td>The desired state and design exploration: variants, flows, specs</td><td>The history of actual product change: what happened, why, when, and by whom</td></tr>
<tr><td>A living document that gets rewritten</td><td>A fixed record of each change that is never lost</td></tr></table>
`,
quiz:[
{q:'The most important thing a design PR should convey beyond the code?', o:['The number of hours worked','The problem and the design decision, with its reasoning','The name of the design tool','The designer\'s favorite font'], why:'The reviewer needs to understand why this change is right; the code only shows the "how".'},
{q:'The best way to show a visual change in a PR?', o:['A long text explanation','Before/After screenshots','A link to the entire Figma file with no explanation','An attached PSD file'], why:'A side-by-side comparison communicates the change in seconds.'},
{q:'Why is a States covered list valuable?', o:['To make the PR longer','It gives the reviewer a review map and forces you to actually check every state','GitHub requires it','Only for large projects'], why:'A forgotten state (like error or RTL) is the most common design bug; this list prevents it.'},
{q:'What goes in the Known limitations section?', o:['Your personal weaknesses','Deliberate limitations of the current solution (like static data until the API is ready)','Hidden bugs you don\'t want anyone to find','You should never write down limitations'], why:'Transparently recording limitations builds trust and prevents the "is this a bug?" misunderstanding.'},
{q:'The right boundary between Figma and PR documentation?', o:['Everything only in Figma','Figma holds the desired state and exploration; the PR holds the recorded history of every real change and its reasoning','Everything only in the PR','They should be copies of each other'], why:'Figma is a living document that gets rewritten; the PR is the permanent record of each change.'}
]},
{ id:13, title:'Reading a Diff', subtitle:'In the AI era, reading changes matters more than memorizing commands.',
body:`
<h3>What is a Diff?</h3>
<p>A <strong>Diff</strong> is a precise display of the difference between two states, line by line:</p>
<pre><code><span class="c">--- a/components/Button.css</span>
<span class="c">+++ b/components/Button.css</span>
 .button {
<span class="r">-  padding: 8px 12px;</span>   <span class="c">← Removed Line</span>
<span class="g">+  padding: 12px 20px;</span>   <span class="c">← Added Line</span>
 }</code></pre>
<p>A subtle detail: a "modified" line appears in a diff as one removal + one addition. Diffs come at different levels: one file, one commit, between two branches, or an entire Pull Request.</p>
<h3>Split and Unified</h3>
<ul>
<li><strong>Unified View:</strong> removals and additions stacked in one column; good for small changes.</li>
<li><strong>Split View:</strong> before and after in two side-by-side columns; usually more readable for a designer doing visual comparison. On GitHub you can switch it in the Files Changed tab.</li>
</ul>
<h3>A file-by-file review method</h3>
<ol>
<li>First look at the <strong>list of changed files</strong>: is there a file here you didn't expect?</li>
<li>Read the main changed files carefully.</li>
<li>On GitHub, mark each reviewed file as Viewed so you don't lose your place.</li>
</ol>
<h3>Checklist for hunting unintended changes</h3>
<ul>
<li><strong>Accidental deletions:</strong> big red blocks. Was this removal intentional?</li>
<li><strong>Dependency changes:</strong> any change in <code>package.json</code> means a new package or a new version; it must be deliberate and explainable.</li>
<li><strong>New files:</strong> where did this come from and why is it needed?</li>
<li><strong>Config changes:</strong> configuration files (build, lint, sample env) affect the whole project; don't skim past them.</li>
</ul>
<h3>Reviewing AI-generated changes</h3>
<p>The most important modern use of this skill: AI usually changes more than you asked for. Before accepting any output:</p>
<ul>
<li>Compare the file list against your own request; anything out of scope?</li>
<li>Hunt for unwanted deletions and "unrequested rewrites".</li>
<li>Take added dependencies and config changes seriously.</li>
</ul>
<h3>A designer's eye on a Diff</h3>
<ul>
<li><strong>Design Tokens:</strong> changing <code>#0969DA</code> to <code>#0A6FD0</code> is one line in a diff, but it affects the entire product.</li>
<li><strong>Copy and content:</strong> text changes (button labels, error messages) are fully reviewable in a diff.</li>
<li><strong>States:</strong> did the hover, focus, and disabled classes/styles change accordingly too?</li>
</ul>
<h3>Committing only part of your changes</h3>
<p>A diff isn't just for reading; it's also a separation tool. With <code>git add -p</code> (or line selection in your editor's Source Control) stage only the related pieces and leave the rest for the next commit.</p>
`,
quiz:[
{q:'How does a modified line appear in a diff?', o:['In yellow','As one removed line (-) and one added line (+)','With a ~ symbol','It isn\'t shown'], why:'Git has no concept of "editing a line"; every change = removing the old version + adding the new one.'},
{q:'When is Split View the better choice?', o:['Only for JSON files','When a visual before/after comparison in two columns is more readable','When the change is a single line','Never'], why:'Two side-by-side columns directly support a designer\'s Before/After mental model.'},
{q:'The right first step in reviewing a large PR?', o:['Reading line by line from the first file','Scanning the list of changed files to spot anything unexpected','A quick Approve','Checking only the CSS files'], why:'The file list is the overall map of the change; an unexpected file is the first warning sign.'},
{q:'In an AI-generated diff you see a change to package.json you didn\'t ask for. The right reaction?', o:['It must have been necessary; move on','Stop and investigate: which package, why was it added, and is it safe and necessary','Hide the file from the diff','Just accept it without even googling the package name'], why:'A new dependency means third-party code entering the project; it must be deliberate, necessary, and trustworthy.'},
{q:'Why does a one-line Design Token change deserve serious review?', o:['Because JSON is fragile','Because one token may be used in dozens of components, so its effect is global','Because tokens can\'t be reverted','It doesn\'t; it\'s just one line'], why:'A token\'s blast radius has no relation to the size of its diff; the smallest diff can have the biggest visual impact.'},
{q:'You want to commit only part of the changes in one file?', o:['Impossible; the whole file goes in','git add -p, or line selection in your editor\'s Source Control','Make two copies of the file','git commit --half'], why:'Staging at the hunk level — and even the line level — is possible; it\'s the foundation of atomic commits.'}
]},
{ id:14, title:'Undoing and fixing changes', subtitle:'Git\'s safety net: almost nothing is ever truly lost.',
body:`
<h3>Map of the undo tools</h3>
<table><tr><th>Situation</th><th>Tool</th><th>Safety</th></tr>
<tr><td>I don't want the unsaved changes in a file</td><td><code>git restore file</code></td><td>⚠️ Uncommitted changes really are deleted</td></tr>
<tr><td>I staged a file by mistake</td><td><code>git restore --staged file</code></td><td>✅ Completely safe</td></tr>
<tr><td>Message/content of the last commit (not pushed)</td><td><code>git commit --amend</code></td><td>✅ Safe before pushing</td></tr>
<tr><td>A published commit was wrong</td><td><code>git revert</code></td><td>✅ The safest public option</td></tr>
<tr><td>Any other disaster</td><td><code>git reflog</code></td><td>🛟 The spare tire</td></tr></table>
<h3>git restore — bringing a file back</h3>
<pre><code>git restore styles.css            <span class="c"># throw away the file's uncommitted changes</span>
git restore .                     <span class="c"># all files (use with caution)</span>
git restore --staged styles.css   <span class="c"># only unstage; keep the changes</span>
git restore --source=abc123 tokens.json  <span class="c"># bring the file back from an old commit</span></code></pre>
<h3>git revert — the public antidote</h3>
<p>Revert creates a <strong>new commit</strong> that neutralizes the effect of a previous commit. History stays intact and nothing is "erased"; that's why it's the standard, safe path for pushed commits and shared branches:</p>
<pre><code>git revert abc123
<span class="c"># history: ...→ abc123 (mistake) → def456 (Revert "mistake")</span></code></pre>
<h3>Revert versus Reset</h3>
<table><tr><th></th><th>Revert</th><th>Reset</th></tr>
<tr><td>Method</td><td>Creates a new neutralizing commit</td><td>Moves history backwards (rewriting)</td></tr>
<tr><td>History</td><td>Preserved</td><td>Changed</td></tr>
<tr><td>Public/pushed commits</td><td>✅ Correct</td><td>❌ Forbidden</td></tr></table>
<h3>git reflog — the spare tire</h3>
<p>The reflog is Git's local diary: everywhere your HEAD has been — even commits "lost" through a reset, or deleted branches — is recorded there:</p>
<pre><code>git reflog
<span class="c"># a1b2c3 HEAD@{0}: reset: moving to HEAD~2</span>
<span class="c"># d4e5f6 HEAD@{1}: commit: feat: add hero section  ← this is the one I want!</span>
git switch -c rescue d4e5f6   <span class="c"># recover it on a new branch</span></code></pre>
<p>The same technique brings back a <strong>deleted branch</strong>: find the branch's last commit in the reflog and create a new branch from it.</p>
<h3>Aborting an operation midway</h3>
<pre><code>git merge --abort     <span class="c"># cancel a merge mid-conflict</span>
git rebase --abort    <span class="c"># cancel a rebase</span></code></pre>
<h3>A restore point before AI changes</h3>
<p>Before handing work to an agent or running a big prompt: <strong>commit</strong> (and preferably work on a separate branch). Then whatever happens, the way back is one command away.</p>
<div class="callout tip"><span class="co-title">Learning priority</span>1) restore 2) revert 3) commit --amend 4) reflog 5) and only after all of these: reset.</div>
`,
quiz:[
{q:'You want to completely throw away a file\'s saved-but-uncommitted changes?', o:['git revert file','git restore file','git reset --hard HEAD~1','git rm file'], why:'restore returns the file to its last committed state. Careful: because these changes were never committed, they cannot be recovered.'},
{q:'Why is revert right for a pushed commit, and reset is not?', o:['Because reset is slower','Because revert neutralizes the commit\'s effect with a new commit, without rewriting history, and doesn\'t conflict with your teammates\' copies','Because reset only works locally','It makes no difference'], why:'Published history is the team\'s shared contract; revert preserves it, reset breaks it.'},
{q:'You "lost" two commits with an accidental reset --hard. The rescue path?', o:['The work is gone','git reflog, find the commit hash, and create a branch from it','Re-download from GitHub even though they were never pushed','git revert --undo'], why:'The reflog holds all of HEAD\'s previous positions; the "lost" commits are still there.'},
{q:'You deleted a branch with -D and regret it. What do you do?', o:['It\'s irreversible','Find the branch\'s last commit hash in the reflog and create a new branch from it','Call GitHub Support','git branch --undelete'], why:'Deleting a branch only removes the pointer; the commits remain for a while and are recoverable via the reflog.'},
{q:'The right move before running a big prompt on your project?', o:['Closing the editor','Committing the healthy state (preferably working on a separate branch) as a restore point','Turning Git off','Manually copying the folder'], why:'With one commit, recovering from any bad AI output is only one restore/revert away.'},
{q:'In the middle of a conflict-heavy merge you want to bail out entirely?', o:['git merge --abort','git restore .','Restart the computer','git revert HEAD'], why:'merge --abort cancels the operation and returns everything to how it was before the merge started.'}
]},
{ id:15, title:'Reset', subtitle:'The powerful tool for rewriting local history — with respect and caution.',
body:`
<h3>What does git reset do?</h3>
<p>Reset moves the branch pointer back to a previous commit, as if the commits after it "never happened". It has three modes, which differ in what happens to your changes:</p>
<pre><code><span class="c"># HEAD~1 means "one commit back"</span>
git reset --soft HEAD~1   <span class="c"># the commit is undone; changes stay staged</span>
git reset HEAD~1          <span class="c"># (Mixed, the default) changes return to the Working Directory</span>
git reset --hard HEAD~1   <span class="c"># ⚠️ the commit and all changes are completely deleted</span></code></pre>
<table><tr><th>Mode</th><th>Commit</th><th>Stage</th><th>Files</th><th>Common use</th></tr>
<tr><td>Soft</td><td>Undone</td><td>Kept</td><td>Kept</td><td>Combining the last few commits into one better commit</td></tr>
<tr><td>Mixed</td><td>Undone</td><td>Emptied</td><td>Kept</td><td>"Let me redo the add and commit from scratch"</td></tr>
<tr><td>Hard</td><td>Deleted</td><td>Deleted</td><td>Deleted</td><td>"Destroy this work completely" — with eyes open</td></tr></table>
<h3>The danger of reset --hard</h3>
<div class="callout warn"><span class="co-title">Two very different kinds of destruction</span>Commits deleted by a reset can usually be recovered from <code>git reflog</code>; but changes that <strong>were never committed</strong> and get wiped by --hard are truly gone forever. Before any --hard, run <code>git status</code> once and make sure you have nothing uncommitted.</div>
<h3>The before-and-after-Push rule</h3>
<ul>
<li><strong>Before pushing:</strong> reset is a legitimate local cleanup tool; the commits are still yours alone.</li>
<li><strong>After pushing:</strong> reset means rewriting shared history; your next push will be rejected, and it can only proceed with a Force Push, which breaks your teammates' history. In that case the right path is <code>git revert</code>.</li>
</ul>
<h3>Recovering from a bad reset</h3>
<pre><code>git reflog                       <span class="c"># find the hash of the commit before the reset</span>
git reset --hard d4e5f6          <span class="c"># go right back there</span></code></pre>
<h3>The right times to use reset</h3>
<ul>
<li>You made three messy local commits and want one clean commit instead: <code>reset --soft HEAD~3</code> plus one new commit.</li>
<li>The last commit was entirely wrong and it hasn't been pushed: <code>reset --hard HEAD~1</code> (after checking status).</li>
<li>You want to redo your mistaken adds: a plain <code>reset</code> (Mixed).</li>
</ul>
`,
quiz:[
{q:'What state are you in after git reset --soft HEAD~1?', o:['Everything is wiped','The commit is undone, but its changes are staged and waiting','Files went back two commits','The branch is deleted'], why:'soft only moves the commit pointer back; the stage and the files stay untouched.'},
{q:'Which reset mode changes the Working Directory files too?', o:['soft','mixed','hard','None of them'], why:'Only hard resets all three layers (history, stage, files) to the target commit.'},
{q:'What is truly unrecoverable after a reset --hard?', o:['The deleted commits','Changes that were never committed','Files inside gitignore','Nothing'], why:'Commits survive in the reflog; but work that was never committed leaves no trace in Git.'},
{q:'You pushed a bad commit and the team already has it. The right path?', o:['reset --hard and then Force Push','git revert that commit','Delete the repo from GitHub','Amend it'], why:'Rewriting shared history puts everyone in conflict; revert neutralizes the mistake without rewriting.'},
{q:'You want to turn three messy local commits into one clean commit?', o:['reset --hard HEAD~3','reset --soft HEAD~3, then one new commit','revert three times','Delete the branch'], why:'soft keeps the changes from all three commits staged and ready, so you can commit again with one good message.'}
]},
{ id:16, title:'Stash', subtitle:'The temporary drawer: set unfinished work aside, come back later.',
body:`
<h3>What is Stash?</h3>
<p><strong>Stash</strong> puts your uncommitted changes into a "temporary drawer" and cleans the Working Directory. The classic scenario: you're mid-way through a feature when an urgent bug shows up on main; you don't want to commit the half-done work, but you don't want to throw it away either.</p>
<pre><code>git stash push -m "hero layout WIP"   <span class="c"># save with a name (a good habit)</span>
git switch main                        <span class="c"># go fix the bug</span>
<span class="c"># ... fix, commit, push ...</span>
git switch feature/hero
git stash pop                          <span class="c"># the half-done work is back</span></code></pre>
<h3>The main commands</h3>
<pre><code>git stash                    <span class="c"># quick save (unnamed)</span>
git stash -u                 <span class="c"># include untracked files too</span>
git stash list               <span class="c"># stash@{0}: hero layout WIP ...</span>
git stash apply stash@{1}    <span class="c"># apply, but keep it in the list</span>
git stash pop                <span class="c"># apply + remove from the list</span>
git stash drop stash@{0}     <span class="c"># delete one stash</span>
git stash clear              <span class="c"># delete all (no way back)</span></code></pre>
<div class="callout note"><span class="co-title">apply or pop?</span>pop is for one-time consumption; apply is for when you want to try the same changes in several places, or when you're being careful so the stashed copy isn't lost if a conflict occurs.</div>
<h3>Tips and edge cases</h3>
<ul>
<li><strong>Untracked:</strong> by default, stash does not pick up brand-new files; the <code>-u</code> flag is required.</li>
<li><strong>Stash when switching branches:</strong> if your uncommitted changes are incompatible with the target branch, Git refuses the switch; stash is the standard solution. A stash isn't glued to a branch; you can apply it on a different branch too.</li>
<li><strong>Conflicts in a stash:</strong> if the files changed since you stashed, the familiar conflict markers appear during pop/apply and you resolve them just like a merge. Note: on a conflict, pop does not automatically delete the stash.</li>
</ul>
<h3>Stash or Commit?</h3>
<p>Stash is for "a few hours, quick context switch": it's local, never pushed, has no proper message, and is easy to forget. If the unfinished work will sit for more than a day or matters, make a temporary commit with a wip message on its own branch instead of stashing; it's safer and more visible.</p>
`,
quiz:[
{q:'The main scenario for using Stash?', o:['Permanently archiving versions','Temporarily setting aside unfinished work for a quick switch (e.g. going after an urgent bug)','Sending changes to GitHub','Deleting unwanted changes'], why:'Stash is a temporary drawer: it cleans the Working Directory without committing or throwing away the work.'},
{q:'The difference between pop and apply?', o:['pop is faster','pop applies and removes the stash from the list; apply keeps it','apply only works on main','There is no difference'], why:'apply means "copy it, keep it"; pop means "take it and consume it".'},
{q:'You created a new (untracked) file but git stash didn\'t pick it up. Why?', o:['Stash is broken','By default stash only saves tracked files; you need the -u flag for untracked ones','The file must be pushed first','New files can\'t be stashed'], why:'stash -u (or --include-untracked) includes new files too.'},
{q:'You have important unfinished work that will likely hang for a week. The better choice?', o:['A named stash','A temporary (wip) commit on its own branch','Copying the files to the desktop','Neither; you must finish it'], why:'Stash is local, unbacked-up, and forgettable; a commit on a branch is safe, pushable, and visible.'},
{q:'You hit a conflict during stash pop. What happens?', o:['The stash is destroyed and the work is lost','Conflict markers appear and you resolve them like a merge; the stash was not auto-deleted either','Git decides on its own','pop becomes impossible'], why:'Resolving a stash conflict is exactly the same skill as resolving a merge conflict, and the stashed copy remains until you delete it manually.'}
]},
{ id:17, title:'Tags and Releases', subtitle:'Marking important versions and announcing them officially.',
body:`
<h3>What is a Tag?</h3>
<p>A <strong>Tag</strong> is a permanent label on a specific commit; like placing a bookmark on a point in history that says "this was version 1.2.0". Unlike a branch, which moves forward with every new commit, a tag stays fixed.</p>
<h3>Two kinds of tags</h3>
<ul>
<li><strong>Lightweight Tag:</strong> just a simple pointer to a commit, with no extra information.</li>
<li><strong>Annotated Tag:</strong> a full object with the creator's name, a date, and a message. Always choose this one for official releases.</li>
</ul>
<pre><code>git tag v1.0.0                              <span class="c"># Lightweight</span>
git tag -a v1.2.0 -m "Add dark mode tokens" <span class="c"># Annotated ✅</span>
git tag                                     <span class="c"># list tags</span>
git show v1.2.0                             <span class="c"># details</span>
git push origin v1.2.0                      <span class="c"># tags are NOT pushed automatically!</span>
git push origin --tags                      <span class="c"># all of them at once</span>
git tag -d v1.2.0                           <span class="c"># delete locally</span>
git push origin --delete v1.2.0             <span class="c"># delete from the remote</span></code></pre>
<h3>Semantic Versioning</h3>
<p>The universal numbering convention: <code>MAJOR.MINOR.PATCH</code> — for example <code>2.4.1</code></p>
<table><tr><th>Part</th><th>When does it increase?</th><th>Design System example</th></tr>
<tr><td><strong>MAJOR</strong> (2.x.x)</td><td>Breaking change: consumers must change their code</td><td>Removing or renaming a token; removing a component prop</td></tr>
<tr><td><strong>MINOR</strong> (x.4.x)</td><td>New, backwards-compatible capability</td><td>Adding a new button variant or a new token</td></tr>
<tr><td><strong>PATCH</strong> (x.x.1)</td><td>Bug fix with no behavior change</td><td>Fixing the error color's contrast or a wrong spacing value</td></tr></table>
<h3>Releases on GitHub</h3>
<p>A <strong>Release</strong> is a layer on top of a tag: an official page with a version title, a <strong>Release Note</strong> (this version explained for humans), and attached files. GitHub can also generate the list of changes automatically.</p>
<h3>Changelog</h3>
<p>A <strong>Changelog</strong> is a file in the repo (usually <code>CHANGELOG.md</code>) that keeps a categorized history of versions:</p>
<pre><code>## [2.0.0] - 2026-03-14
### Breaking
- color-brand-primary removed → use color-brand instead

### Added
- Dark mode tokens

### Fixed
- Disabled text color contrast</code></pre>
<div class="callout tip"><span class="co-title">Why does this matter to a designer?</span>When a Design System, Component Library, or Design Tokens are versioned, teams can stay on a specific version and upgrade deliberately. The sentence "the colors suddenly changed" turns, with one clear Release Note, into "version 2 was released and here is what changed".</div>
`,
quiz:[
{q:'The difference between a Tag and a Branch?', o:['None','A tag is a fixed label on one commit; a branch moves forward with every new commit','Tags only exist on GitHub','A branch is permanent and a tag is temporary'], why:'A tag is a fixed historical point; a branch is a moving timeline.'},
{q:'Which kind of tag is better for an official release?', o:['Lightweight','Annotated','Both are the same','Neither; a Release is enough'], why:'Annotated records the creator, date, and message, and is the standard for official versions.'},
{q:'You created a tag but it isn\'t on GitHub. Why?', o:['GitHub is lagging','Tags are not sent by a regular git push; you need git push origin TAGNAME or --tags','The tag must be Annotated','You must make the repo public'], why:'A default push only sends the branch\'s commits; tags are pushed separately.'},
{q:'You removed a token and renamed it. Which part of the version must increase?', o:['PATCH','MINOR','MAJOR','None'], why:'This is a Breaking Change: consumers must change their code, so MAJOR.'},
{q:'You added a new button variant without breaking anything. The version goes from 1.4.2 to what?', o:['2.0.0','1.5.0','1.4.3','1.4.2'], why:'A new backwards-compatible capability = increment MINOR and reset PATCH to zero.'},
{q:'What is a Release Note?', o:['A commit message','A human-readable explanation of a version\'s changes on the Release page','Another name for a Tag','A configuration file'], why:'A Release Note tells users what was added, fixed, or broken in this version.'}
]},
{ id:18, title:'GitHub Issues and managing work', subtitle:'Where work gets defined, moves forward, and connects to real change.',
body:`
<h3>What is an Issue?</h3>
<p>An <strong>Issue</strong> is a unit of work or discussion in a repo: a bug, a feature request, or a task. Every Issue has a number (<code>#42</code>), is searchable, and lives right next to the code — not in a chat that gets lost by tomorrow.</p>
<h3>Three common kinds</h3>
<ul>
<li><strong>Bug Report:</strong> what you saw, what you expected, how to reproduce it (+ a screenshot).</li>
<li><strong>Feature Request:</strong> what problem, for whom, why now.</li>
<li><strong>Task:</strong> a specific, bounded piece of work, e.g. "document the spacing tokens".</li>
</ul>
<h3>Organizing tools</h3>
<ul>
<li><strong>Label:</strong> a categorization tag (bug, design, tokens, a11y).</li>
<li><strong>Milestone:</strong> a group of Issues for one goal or version (e.g. v2.0).</li>
<li><strong>Assignee:</strong> the person responsible for doing it.</li>
<li><strong>Issue Template:</strong> a ready-made form that asks for the required fields up front. A good <strong>Design Task Template</strong> asks: the problem, the audience, the required states, the Figma link, and the acceptance criteria.</li>
</ul>
<h3>Connecting an Issue to a Pull Request</h3>
<p>Use keywords in the description or commit message so the Issue closes automatically when the PR is merged:</p>
<pre><code>Closes #42
Fixes #17
Resolves #103</code></pre>
<p>Even a plain mention of <code>#42</code> creates a two-way link, keeping the "problem → change" trail traceable.</p>
<h3>GitHub Projects</h3>
<p>A <strong>Board</strong> (kanban) view over Issues and PRs: Status columns (Todo / In Progress / In Review / Done) and fields like Priority. Its advantage over a separate tool is that the cards' status stays in sync with real activity in the repo.</p>
<div class="callout note"><span class="co-title">Connecting design decisions to Issues</span>Record design decisions in the related Issue, not just in the Figma file. Six months later, whoever asks "why did it end up this way?" can find the discussion, the rejected options, and the final PR side by side with a single search.</div>
`,
quiz:[
{q:'What is an Issue on GitHub?', o:['A Git system error','A unit of work or discussion (bug, feature, task) recorded and tracked next to the code','Another name for a commit','A security alert'], why:'An Issue is the work-management tool inside the repo, and it links to real code changes.'},
{q:'What do you write so Issue #42 closes automatically when the PR merges?', o:['#42 done','Closes #42','close-issue 42','@42'], why:'The Closes/Fixes/Resolves keywords + the Issue number create this automatic connection.'},
{q:'What is a Milestone for?', o:['A colored label','Grouping Issues around one goal or version','Assigning a responsible person','Auto-closing an Issue'], why:'A Milestone shows the progress of a set of work items toward a version or goal.'},
{q:'The main advantage of recording design decisions in an Issue instead of team chat?', o:['More speed','Permanence, searchability, and a direct connection to the code change','Better looks','It is mandatory'], why:'The Issue is archived along with the project and links to the related PR and commits.'},
{q:'What does a good Design Task Template ask for?', o:['Only a title','The problem, the audience, the required states, the Figma link, and the acceptance criteria','The designer\'s name and hours worked','Only the Figma link'], why:'A template prevents vague tasks and collects the required information from the start.'}
]},
{ id:19, title:'Collaboration', subtitle:'The rules of the game when several people work on one repo.',
body:`
<h3>What is a Fork?</h3>
<p>A <strong>Fork</strong> means making a complete copy of someone else's repo <strong>in your own GitHub account</strong>. Because you usually can't push directly to other people's repos, you make your changes in your fork and then send a PR from there.</p>
<table><tr><th></th><th>Fork</th><th>Clone</th></tr>
<tr><td>Where does the copy go?</td><td>In your GitHub account (the server)</td><td>On your computer (local)</td></tr>
<tr><td>When?</td><td>When you don't have write access (Open Source projects)</td><td>Always; for working on any repo</td></tr></table>
<h3>Contributor Workflow</h3>
<pre><code>1. Fork  →  2. Clone your fork  →  3. New branch
4. Change + Commit  →  5. Push to your fork  →  6. Open a PR to the original repo</code></pre>
<p>On an internal team where you have write access, no fork is needed: you create a branch directly and open a PR.</p>
<h3>Access levels</h3>
<ul>
<li><strong>Read:</strong> viewing and cloning; no pushing.</li>
<li><strong>Write:</strong> creating branches, pushing, and opening PRs — the usual access for a team member.</li>
<li><strong>Admin:</strong> repo settings, access management, and branch rules.</li>
</ul>
<p>A <strong>Collaborator</strong> is someone who has been granted access to the repo. A <strong>Code Owner</strong> (defined in the <code>CODEOWNERS</code> file) is the person responsible for specific parts of the project; for example, any PR that touches the tokens file automatically adds the system designer as a reviewer.</p>
<h3>Protected Branch</h3>
<p>Rules placed on main so nobody can break it by accident:</p>
<ul>
<li><strong>Blocking direct pushes:</strong> every change goes through a PR only.</li>
<li><strong>Required Review:</strong> without at least one Approve, the Merge button is disabled.</li>
<li><strong>Required Status Check:</strong> tests and builds must be green.</li>
</ul>
<h3>Team conventions</h3>
<ul>
<li><strong>Branching Convention:</strong> a shared naming pattern (<code>feature/</code>, <code>fix/</code>).</li>
<li><strong>Definition of Done:</strong> the team's agreement on what "done" means — e.g.: reviewed, states covered, documented, checks green.</li>
<li><strong>Review Etiquette:</strong> comment on the work, not the person; be specific and actionable; distinguish between "must" and "personal-taste suggestion"; call out the good parts too; respond quickly, because a stalled PR slows the whole team down.</li>
</ul>
`,
quiz:[
{q:'How does a Fork differ from a Clone?', o:['A fork is a local copy, a clone is in the cloud','A fork is a copy of the repo in your GitHub account; a clone is a copy on your computer','There is no difference','Forks are only for private repos'], why:'A fork happens on the server so you have somewhere to push; a clone is the local copy you work in.'},
{q:'When do you need a Fork?', o:['Always','When you don\'t have Write access to the original repo (like Open Source projects)','When the internet is slow','For every new branch'], why:'With Write access inside a team, you create branches directly and no fork is needed.'},
{q:'What does a Protected Branch on main usually require?', o:['Small file sizes','Changes entering only through PRs, with reviews and passing checks','Using Rebase','Daily commits'], why:'The goal is that no unreviewed change lands directly on the main branch.'},
{q:'What does the CODEOWNERS file do?', o:['Keeps the employee list','Defines who owns each part of the project and automatically adds them as a reviewer on the relevant PRs','Grants Admin access','Signs commits'], why:'For example, any change in the tokens folder summons the system designer as a reviewer.'},
{q:'What does Definition of Done mean?', o:['The delivery date','The team\'s agreement on the specific criteria for a piece of work being "done"','The last commit','Closing the Issue'], why:'Without a shared standard, everyone has a different definition of "done".'},
{q:'Which review feedback is more professional?', o:['"This is wrong."','"This spacing is 16, but the spacing-md token is 24; to stay consistent with the cards, it would be better to use the token."','"Why are you so careless?"','"We\'ll talk later."'], why:'Good feedback is specific, actionable, and focused on the work, not the person.'}
]},
{ id:20, title:'Security', subtitle:'A leaked key is the most expensive commit of your life.',
body:`
<h3>What is a Secret?</h3>
<p>A <strong>Secret</strong> is any piece of information that only authorized systems should have: an <strong>API Key</strong>, an <strong>Access Token</strong>, a database password, a private key. The simple rule: a secret must never be inside your code or your Git history.</p>
<h3>The right way: .env files</h3>
<pre><code><span class="c"># .env  ← in .gitignore, never committed</span>
FIGMA_TOKEN=figd_xxxxxxxx

<span class="c"># .env.example  ← this one IS committed (variable names only, no values)</span>
FIGMA_TOKEN=</code></pre>
<h3>If a secret leaks</h3>
<ol>
<li><strong>Revoke it immediately</strong> and create a new key. This is the most important step, because anything pushed even once may have been seen and saved.</li>
<li>Untrack the file and add it to gitignore.</li>
<li>If needed, scrub the history (with tools like git-filter-repo); but this is no substitute for step one.</li>
</ol>
<h3>GitHub's automatic shields</h3>
<ul>
<li><strong>Secret Scanning:</strong> GitHub detects the patterns of known tokens in pushes and warns you (and in some cases notifies the provider so the key gets invalidated).</li>
<li><strong>Dependabot:</strong> monitors your project's dependencies and produces a <strong>Dependency Alert</strong> — and even an upgrade PR — for vulnerable versions.</li>
</ul>
<h3>Access hygiene</h3>
<ul>
<li><strong>Private versus Public:</strong> default to Private unless you deliberately want it public. Public means anyone on the internet can see it.</li>
<li><strong>Repository Permission:</strong> grant the minimum access needed (Read for an observer, Write for an active member).</li>
<li><strong>SSH Key Security:</strong> create the private key with a passphrase, never copy it anywhere, and remove old devices' keys from GitHub.</li>
<li><strong>PAT Scope and Expiration:</strong> create tokens with the least possible access and the shortest reasonable lifetime; a never-expiring token with full access is the worst combination.</li>
<li><strong>Branch Protection:</strong> beyond quality, it's a security layer: no change enters main without a review.</li>
<li><strong>Signed Commit:</strong> a cryptographic signature on a commit that proves it really came from you; in sensitive repos it earns the Verified badge.</li>
</ul>
<div class="callout warn"><span class="co-title">Check your screenshots</span>Designers post more screenshots than anyone. Before attaching one to a PR or an Issue, make sure none of these are in the image: tokens and keys in the Terminal or DevTools, real users' emails and data, internal environment URLs, and personal information in tabs and notifications.</div>
`,
quiz:[
{q:'You committed and pushed a real API key in a file. The first thing to do?', o:['Delete the file and make a new commit','Immediately revoke the key and create a new one','Make the repo private','Wait for a GitHub alert'], why:'An exposed key must be invalidated; deleting the file removes it neither from history nor from the hands of anyone who saw it.'},
{q:'Which file should be committed?', o:['.env','.env.example, with variable names and no values','Both','Neither'], why:'.example documents the configuration structure without exposing sensitive values.'},
{q:'What does Dependabot do?', o:['Formats your code','Finds vulnerable dependencies and produces alerts/upgrade PRs','Signs commits','Protects branches'], why:'Dependabot watches over the security of the dependency chain.'},
{q:'The right principle for creating a Personal Access Token?', o:['Maximum access with no expiration, for convenience','The least access needed (Scope) and the shortest reasonable lifetime','One token for the whole team','Storing it in the repo for easy access'], why:'The principle of least privilege limits the potential damage of a leak.'},
{q:'Before attaching a screenshot to a PR, what should you watch out for?', o:['The image resolution','Tokens in the Terminal/DevTools, real user data, and internal environment URLs','The file format','The font size'], why:'Leaking information through an image is exactly as dangerous as committing a secret.'},
{q:'What does a Signed Commit guarantee?', o:['Code quality','The authenticity of the identity of whoever made the commit','The absence of conflicts','Passing the tests'], why:'The cryptographic signature proves the commit really was made by the key\'s owner.'}
]}
];
