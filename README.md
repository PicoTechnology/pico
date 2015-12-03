# radiar

### Git Workflow
```
git checkout [branch-name]
```
```
git checkout -b [new-branch-name]
```
```
git remote add upstream [url-to-upstream]
```

### the daily workflow
```
git add . 
```
```
git commit -m 'Commit message goes here...'
```
```
git fetch upstream [branch-name]
```
```
git rebase upstream/[branch-name]
```
```
git push origin [branch-name]
```
Submit the Pull Request

```
git fetch upstream
```

### Git Config Values
We will primarily be using the folling prefixes for our branches:
* `dev/` - development branch
* `feat/` - feature branch
* `bugfix/` - self-evident
* `refactor/` - self-evident

###### React Router
https://www.npmjs.com/package/react-router

###### Webpack
https://webpack.github.io/

###### React Hot Reloader
https://github.com/gaearon/react-hot-boilerplate

###### Redux (Reducer + Flux)
To facilitate with state management, we will use Redux by Dan Abramov.

During development, check out the Redux DevTools
https://github.com/gaearon/redux-devtools

Here is an illuminating video by Dan Abramov (Redux author) talking about React Hot Reloader and the Redux project.
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

