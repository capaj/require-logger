# require-logger

tiny utility to visualize whole dependency tree and possibly help with debugging cyclic dependency issues in node.js

## Install

```
npm i require-logger -g
```

I found that I need this module when debugging circular dependencies. Since other developers on your team might have different tools for this it's probably best to install as global dep.

## Usage

Just require or import at the root file of your app.

```js
require('require-logger')
```

next time you run your app, you should see a tree of dependencies as they are loaded in the STDOUT.
`node_modules` folder deps are skipped. Only local files are shown.
In the tree it's easy to spot cyclic deps and also parent modules which can be broken into multiple modules.
