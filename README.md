<p align="center">
    <img width="400" alt="miguel" src="https://user-images.githubusercontent.com/2776959/87653847-a863b900-c745-11ea-9c6d-ac20456813a5.png">
  <p align="center">Styleguide generator for https://nextjs.org/</p>
</p>

## Why Miguel?
Miguel is a simple styleguide generator for [Next.js](https://nextjs.org/).

- Uses Next.js `pages` directory to create a styleguide that is embedded in your application.
- (Almost) no config required, components are always up to date with your live application.
- It's simple, dead simple. A title, description and a component, that's it.
- App context? Router dependencies? Something else? Still works.
- Miguel is easy to integrate with your (external) design system.

No setbacks or frustrated keyboard smashing. If it works in your Next app, it works in Miguel.

## Getting started

### Installation
To get started, add Miguel to your project with yarn or npm.

```
yarn add next-miguel
```

```
npm install next-miguel
```

### Adding Miguel to your build
Add Miguel to your `next.config.js`. See options below.

```js
const withMiguel = require("next-miguel");

module.exports = withMiguel({
  miguel: {
    extension: ".example.js",  // Extension of your example files
    gitignore: true,  // Add styleguide to gitignore
    ignore: [],  // Add patterns to ignore
    page: "miguel",  // Render page at 'pages/miguel.js'
    rebuildIdsOnUpdate: false, // Rebuild the styleguide on changes
    watch: true, // Watch for changes files while developing
  },
});
```

And for production add it to your build step as well:

```
"build": "next-miguel && next build"
```

### Creating your first example
To create a Miguel example create a file named: `[componentname].example.js`.
Use the `Example` component included in Miguel to document your component.

```js
import { Example } from "next-miguel/components";
import { Contact } from "./Contact";

export default () => (
  <Example title="Contact" description="Here is my contact component" id="contact">
    <Contact
      title="Miguel"
      email="Miguel@test.com"
      tel="+31612345678"
      whatsapp="+31612345678"
    />
  </Example>
);
```

### Generate the Miguel styleguide
Run your local next server (`next`) and navigate to `/miguel` to see the result.
By default, Miguel finds all `*.examples.js` files in your project and generates examples for them. The styleguide is created at `/pages/miguel.js`

## Options
Options are passed in the next config under the `miguel` key. When an option is ommited, the default value is used.

```js
module.exports = withMiguel({
  ...
  miguel: {
    extension: ".example.js",
    page: "miguel",
  },
  ...
});
```

extension: ".example.js",  // Extension of your example files
    gitignore: true,  // Add styleguide to gitignore
    ignore: [],  // Add patterns to ignore
    page: "miguel",  // Render page at 'pages/miguel.js'
    rebuildIdsOnUpdate: false, // Rebuild the styleguide on changes
    watch: true, // Watch for changes files while developing

### extension
The extension to look for. These files contain your examples that are generated in the styleguide. Defaults to `.example.js`.

```js
miguel: {
  extension: '.example.js',
}
```

### gitignore
Should the generated page automatically be added to the .gitignore? Defaults to `true`.

```js
miguel: {
  ignore: true,
}
```

### ignore
An array of directories (or files) to ignore in the watch function. This prevents a styleguide build when files change in that directory. Defaults to `[]`.

```js
miguel: {
  ignore: [],
}
```

The files or directories you add to the ignore are added to a list of default ignored directories. These do not have to be added to the ignore.
```js
const defaultIgnore = [
  ".git",
  ".next",
  "*.DS_Store",
  "*.log",
  "bower_components",
  "node_modules",
  "out",
  "tmp",
];
```

### page
The page the styleguide is rendered to. This value is automatically created at `/pages/[page].js` so that next builds it as a page. Defaults to `'miguel'`.

```js
miguel: {
  page: 'miguel',
}
```

### rebuildIdsOnUpdate
Should miguel rebuild the styleguide when a file is updated? Defaults to `false`.
When you change an example's id, this will not be updated before you restart miguel. To fix this, you can choose to rebuild on every update. **This makes your build much slower**, since the content of your examples is parsed on every change.

```js
miguel: {
  rebuildIdsOnUpdate: false
}
```

### watch
Should miguel watch for file changes while developing? Defaults to `true`.

```js
miguel: {
  watch: true,
}
```

## Including in other tools (id=*)
The id used in the Example component is mapped to a component that can be accessed by a query string.
So the following example renders only the component on `/miguel?id=helloworld`.
You can iframe this component in other tools like [lasagna](https://lasagna.app) or [zeroheight](https://zeroheight.com/).

```js
import { Example } from "next-miguel/components";

export default () => (
  <Example title="Hello" description="world" id="helloworld">
    <div>Hello world</div>
  </Example>
);
```

## Todos
- [] Multiple examples in 1 file
- [] open-source it
- [] publish with github actions (https://sergiodxa.com/articles/github-actions-npm-publish/)