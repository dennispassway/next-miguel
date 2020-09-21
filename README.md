<p align="center">
    <img width="400" alt="miguel" src="https://user-images.githubusercontent.com/2776959/87653847-a863b900-c745-11ea-9c6d-ac20456813a5.png">
  <p align="center">Styleguide generator for https://nextjs.org/</p>
</p>

![Publish to npm](https://github.com/dennispassway/next-miguel/workflows/Publish%20to%20npm/badge.svg)

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
    page: "miguel",  // Render page at 'pages/miguel.js'
    watchIgnore: [],  // Add files or directies that should not be watched
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

export const ContactExample = ({ id }) => (
  <Example title="Contact" description="Here is my contact component" id={id}>
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


## Multiple Examples
To create multiple Miguel examples you can add multiple named exports to the same file.
Use the `Example` component included in Miguel to document your component.

```js
import { Example } from "next-miguel/components";
import { Contact } from "./Contact";

export const ContactExampleA = ({ id }) => (
  <Example title="Contact A" description="Here is my contact component in form A" id={id}>
    <Contact
      title="Miguel"
      email="Miguel@test.com"
      tel="+31612345678"
      whatsapp="+31612345678"
    />
  </Example>
);

export const ContactExampleB = ({ id }) => (
  <Example title="Contact B" description="Here is my contact component in form B" id={id}>
    <Contact
      title="The brother of Miguel"
      email="miguelsbrother@test.com"
      tel="+31612345678"
      whatsapp="+31612345678"
    />
  </Example>
);
```

## Including in other tools
The name of the export used in the Example component is mapped to a component that can be accessed by a query string.
So the following example renders the component on `/miguel?id=HelloWorld`.

You can iframe this component in other tools like [lasagna](https://lasagna.app) or [zeroheight](https://zeroheight.com/). When included in other source, the examples use [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer) to make them responsive in iframes.

```js
import { Example } from "next-miguel/components";

export const HelloWorld = () => (
  <Example title="Hello" description="world">
    <div>Hello world</div>
  </Example>
);
```

To add a link to the example on the miguel page add an id to the example component.

```js
import { Example } from "next-miguel/components";

export const HelloWorld = ({ id }) => (
  <Example title="Hello" description="world" id={id}>
    <div>Hello world</div>
  </Example>
);
```

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

### page
The page the styleguide is rendered to. This value is automatically created at `/pages/[page].js` so that next builds it as a page. Defaults to `'miguel'`.

```js
miguel: {
  page: 'miguel',
}
```

### watch
Should miguel watch for file changes while developing? Defaults to `true`.

```js
miguel: {
  watch: true,
}
```

### watchIgnore
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