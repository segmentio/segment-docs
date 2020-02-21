# Segment Docs Contributors Guide

Thanks for helpin' out! We really appreciate it.


## Setting up your environment

Small edits can be done from the Github web interface. However, some edits will require that you use Git. If you're not a git-native, your best bet is likely to use Atom, the Github-created open-source editor.

We've written a bash script to set up the environment for you on a Mac computer. If you're on another platform, please [email us](mailto:docs-feedback@segment.com) or [file a Github Issue](https://github.com/segmentio/segment-docs/issues/new) to request other instructions, and we'll see what we can do.

> info ""
> You only need to run `make env` once!


## Set up on Mac using the Env script

1. Set up your Github config so you have an SSH key on your laptop.
2. Check clone this repo locally.
3. Open your Terminal app and navigate to where you cloned the docs repo.

1.  Start by checking what directory you’re in, to make sure you’re in the `segment-docs` repo.
    Type `pwd` (which means “print working directory”) to check. You should see something like `~/repos/segment-docs`.
2.  Type `make docs`.
    The script first checks to see if you have Brew installed, and if you don’t, it installs it. It then runs more brew commands to download and install the software you need.

    > **Heads up**! You’re going to need to enter your laptop password as part of this installation, but only once!


Once the installer completes, you still need to do a few small configuration tasks.

1.  Open the Atom app, then click the **Atom** menu in the top left, and click **Install Shell Commands**.
2.  Next, make sure you’re showing invisible characters. These are important for seeing weird formatting in the docs, and for troubleshooting markdown.
    Go to **Preferences > Editor**, and scroll down to **Show Invisibles**. Make sure that’s checked!

3.  Finally, configure bash completion by adding tab-completion to your .bash profile:

    1. Open Terminal and type `atom ~/.bash_profile` to open the file in Atom.

    2. Paste the following anywhere in the file:
    `[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && . "/usr/local/etc/profile.d/bash_completion.sh"`

    3. Save and close the file in Atom.

    4. Quit and relaunch both Terminal and Atom.


TODO: generating and adding a configapi token




## Contributor workflow

There are three ways to edit the Segment docs depending on what and how much you need to change, and your general level of comfort with Github.

- EASY ​[Contribute from the Github web UI](Contribute from the Github web UI)
- MEDIUM [​Contribute using Atom]()
- ADVANCED [​Contribute using Git]()

### Contribute from the Github web UI

Use this method when making small edits to an existing file only.
Don’t use this when:

- Editing more than one file at a time,
- Adding or removing image files
- Making edits that change how the docs or docs navigation works.

In those cases, set up to [contribute with Atom](), and run the docs locally to confirm that your changes work and render as expected.


Before you begin:

Make sure that you’re logged in to Github, and check that you can see the Segment-docs repo.

1. Go to https://github.com/segmentio/segment-docs/tree/master/src, find the file you want to edit, and click the Pencil icon - “Edit this file”
   ![](guide-imgs/github-edit-this-file.png)
2. Make your changes.
3. Scroll allll the way to the bottom and add a title and note about your change
   ![](guide-imgs/github-commit.png)
4. Click **Propose file change**.
5. On the next screen, add a reviewer or two. These should be folks who know enough about the content change to give it a thumbs up. You can also tag @sanscontext.
6. Once someone has reviewed and approved the change, *you* merge the change.
7. Delete the branch once the change has been merged.

TODO: how to make requested changes this way


### Contribute using Atom

Before you begin:
Make sure you’ve installed and configured Atom using the [instructions above]()!



1.  Open Atom, and make sure the Git tool panel is open.
    (Press `Ctrl + Shift + 9` to open or close it, or find it in the **Packages** menu in Atom.)
2.  Switch to the `master` branch, and update/fetch master from within Atom, using the 🔄 Fetch button
    ![](guide-imgs/atom-fetch.png)
3.  Create a new branch from `master`. This is where you’ll commit your changes.
    ![](guide-imgs/atom-new-branch.png)
4.  Make your changes, and save the files you’ve changed.
5.  Stage changes. This means you mark them as specific files that you want to save and check in.
6.  Add a short commit message, and click **Commit to (branchname)**. This adds a save point to your branch.
    ![](guide-imgs/atom-stage-commit-publish.png)

7.  Click **Publish** (or **Push**).

8.  Go to the [Segment-docs repo in Github](https://github.com/segmentio/segment-docs), and create new Pull Request (PR).
    A pull request is how you ask to add your changes to the public version of the documentation.
    If you recently pushed a new branch, Github will prompt you to open a PR by clicking the Compare & pull request button.
    ![](guide-imgs/atom-github-new-pr.png)
    (If you don’t see this, you can go to **Pull requests** tab, and click **New pull request**, then in the second drop down, find your branch name.)
9.  Open your Pull request.
    1. Add a good title that explains what your change does.
    2. Fill out the template sections. At minimum you should explain what this change does, but you can also link to Github issues or Jiras, or other conversations about the issue you’re fixing.
    ![](guide-imgs/atom-github-pr-form.png)
10. Next, request a review or two. One person should be able to check for typos, the other for technical inaccuracies.

    If you’re making a large change, you should include someone from the Engineering or Product teams.
    Github will suggest the last few people who edited that file. That’s often a good way to go! If not, you can requesting a review from sanscontext.
   ![](guide-imgs/atom-github-reviewers.png)



#### Your reviewers might request that you make changes!
You can make any requested changes in Atom, save the files, stage them, write a commit message, and push. They’ll get added to the changes already in the branch in your Pull Request! Just follow steps 4-7 above as needed.

Once your PR has been reviewed, approved, and all the automated tests completed, click **Squash and Merge**, and then **Delete branch** to clean up after yourself!

Back in Atom, you can do a bit of pre-work by selecting the `master` branch and clicking and **Pull**. Now you're ready for the next edits!




### Contribute using git native commands
change to and update master (git checkout master && git pull)

create a new branch from master (git checkout -b my_new_branch)

make changes, save them.

stage changes (git status, git add)

commit (git commit)

push to repo (git push, git push --set-upstream origin)

repeat steps  3-6 as needed

open a PR: go to PRs page, if not prompted, create new by selecting master as base, (your branch name) as other.

Request review - if changes requested, repeat steps 3-6 as needed.

once approved, merge and delete branch, delete branch locally.


## Tips and tricks


### Adding links that open in a new window

Use the standard markdown format for links (ex: `[text](https://example.com)`).
To make a link open in a new tab append `[text](https://example.com){:target="_blank"}` to the end.

### Escaping code snippets

Certain code syntax will be interpreted by Jekyll/Liquid as site code. If you're having trouble showing code snippets in the docs, you can wrap the snippet in a `{% raw %}` tag. In the example below, the curly brackets would not render in the docs. The raw tags ensure the code renders properly.

```
{% raw %}
To pass source name in the slack message, format it like so: `{{properties.sourceName}}`
{% endraw %}
```


### Syntax highlighting

We're using Rouge, set in the `_config.yml`. It's now default for Jekyll 3 and later, so 🎉.
A list of the cues Rouge accepts can be found [here](https://github.com/rouge-ruby/rouge/wiki/list-of-supported-languages-and-lexers).

### Note Blocks
We're using [Premonition](https://github.com/lazee/premonition) for our Note blocks. This is stock right now, with four styles: `note`, `info`, `success`, `warning`, and `error`.

You'd write a block like this:
```md
> warning "I am a warning"
> The body of the warning goes here. Premonition allows you to write any `Markdown` inside the block.
```

Notes *must* include a `[]` in the heading/title, even if it's empty.
You can see how to write them in the `styleguide.md`, and see how they render at [https://segment.build/docs/styleguide](https://segment.build/docs/styleguide)

### Redirect to a workspace
Occasionally, you'll want to deep-link into the Segment app to link a reader to a specific page or screen. Previously we'd throw them an URL and say "replace {MY SLUG} with your actual workspace slug", but now you can use the slug of `goto-my-workspace` and the Segment app will redirect them.
https://app.segment.com/goto-my-workspace/destinations/catalog
