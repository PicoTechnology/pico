# Contributing

### Git Config Values
We will primarily be using the folling prefixes for our branches:
* `dev/` - development branch
* `feat/` - feature branch
* `bugfix/` - self-evident
* `refactor/` - self-evident

### Git Workflow
At the beginning of the day, head over to your https://github.com/<your-username-here>/pico, and check to see if your repository is ahead/behind the project's (read `upstream`)repository.

Feature branches! Before branching off, make sure that the branch you are on prior to creating a new branch is `dev/`. For example:

```
$ # ensure you are on the dev branch...
$ git branch -a
$ # if you are not, run this command
$ git checkout dev
```
Now that you are on the dev branch, create a new branch for your feature/bugfix/refactor, etc.
```
$ git checkout -b <new-branch-name>
```
This will ensure that all of the directories and files from the dev branch will transfer over to the new branch; this is desirable to reduce merge conflicts. Please be careful to do this every time you create a new branch.
After this new branch has been created, if you need to fetch / rebase from the organization's repository, the follow commands will work.

Stage any work before rebasing...
```
$ git add . 
```
Take a snapshot of your work...
```
$ git commit -m 'Commit message goes here'
```
Fetch from the `upstream` repository... Here we assume you are interested in upstream's dev branch as this is more likely.
```
$ git fetch upstream dev
```
Rebase to sync-up with the `upstream`
```
$ git rebase upstream/dev
```
Resolve any merge conflicts as they arise
If you are at a stage where you should push your work up to your local GitHub repository, then do so:
```
$ # here the <working-branch-name> would be whichever
$ # branch you were working off on your local machine
$ # e.g. feat/myNewReactComponent. This branch will
$ # eventually be merged into upstream's dev branch
$ git push origin <working-branch-name>
```
Make a Pull Request to the `upstream`'s `dev/` branch so that everything can synchronized and other developers can `fetch` your work from dev

### Technology

###### React Router
https://www.npmjs.com/package/react-router

###### Webpack
A substitute for Grunt / Gulp, Browserify and other workflow utilities. Webpack works fantastically with React and is endorsed by many React developers.
https://webpack.github.io/
```
# Run this command from your project root
$ webpack -w
```

###### React Hot Reloader
https://github.com/gaearon/react-hot-boilerplate

###### Redux (Reducer + Flux)
To facilitate state management, we will use Redux by Dan Abramov.

During development, check out the Redux DevTools
https://github.com/gaearon/redux-devtools

Here is an illuminating video by Dan Abramov talking about React Hot Reloader and the Redux project.
https://www.youtube.com/watch?v=xsSnOQynTHs

And for React Native, we will do our styling with the Flexbox
###### Flexbox Tutorials
Here is a playful, interactive resource to quickly introduce yourself to the Flexbox:
http://flexboxfroggy.com/
This resource is endorsed by Facebook as a graphic introduction to the Flexbox model:
https://css-tricks.com/snippets/css/a-guide-to-flexbox/

###### Fetch API
https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en
Parts of the newer Fetch API have been ported to React-Native. So to make HTTP requests, in lieu of the more verbose XMLHttpRequest API, we will use the Fetch API. Here's an overview and a quick introduction to its syntax.

