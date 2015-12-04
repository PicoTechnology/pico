# Contributing

### Git Config Values
We will primarily be using the folling prefixes for our branches:
* `dev/` - development branch
* `feat/` - feature branch
* `bugfix/` - self-evident
* `refactor/` - self-evident

### Git Workflow
At the beginning of the day, head over to your `https://github.com/<your-username-here>/pico`, and check to see if your repository is ahead/behind the project's (read `upstream`)repository.

### Making a new branch

Feature branches! Before branching off, make sure that the branch you are currently on is `dev/`. For example:
```
$ git branch -a
```
Make sure you see something like:
```
* dev
  master
  feat/myOtherReactComponent
```
If you do not see this, run this command:
```
$ git checkout dev
```
Now that you are on the dev branch, create a new branch for your feature/bugfix/refactor, etc.
```
$ git checkout -b <new-branch-name>
```
This will ensure that all of the directories and files from the dev branch will transfer over to the new branch; this is desirable to reduce merge conflicts. Please be careful to do this every time you create a new branch.

### Syncing with upstream
If you need to fetch / rebase from the organization's repository, the follow commands will work.

Make sure you do not have any unsaved work...
```
$ git status
```
If you do, stage and commit this work before rebasing...
```
$ git add . 
$ git commit -m 'Commit message goes here'
```
Fetch from the `upstream` repository. Here we assume you are interested in upstream's dev branch as this is most likely the case.
```
$ git fetch upstream dev
```
Rebase to sync-up with the `upstream`
```
$ git rebase upstream/dev
```
Resolve any merge conflicts as they arise. 

### Pushing to the origin
If you are at a stage where you should push your work up to your local GitHub repository, then do so:
```
$ git add . 
$ git commit -m 'Commit message goes here'
$ git push origin <working-branch-name>
```
Now make a Pull Request to the `upstream`'s `dev/` branch so that everything can synchronized and other developers can `fetch` your work from the dev branch!

Thank you for abiding!