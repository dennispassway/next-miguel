## What is Miguel?
Miguel is a simple styleguide generator for Next.js

@TODO

### How is it different than [X]?

@TODO

## How does it work?

@TODO

## Getting started

### Installation
To get started, add Miguel to your project with yarn or npm.

```
yarn install miguel
```

```
npm install miguel
```

### Adding Miguel to your build
Add Miguel to your `next.config.js`.

```js
const withMiguel = require("miguel");

module.exports = withMiguel({
  miguel: {
    ignore: ["path/to/ignore"], // Add patterns to ignore
    extension: ".example.js", // Extension of your example files
    gitignore: true, // Add styleguide to gitignore
    page: "miguel", // Render page at 'pages/miguel.js'
    watch: true, // Watch for new / removed files while developing
  },
});
```

### Creating your first example
To create a Miguel example create a file named: `[componentname].example.js`.
Use the `Describer` included in Miguel to document your component.

```js
import { Describer } from "miguel/components";
import { Contact } from "./Contact";

export default () => (
  <Describer title="Contact" description="Here is my contact component" id="contact">
    <Contact
      title="Miguel"
      email="Miguel@test.com"
      tel="+31612345678"
      whatsapp="+31612345678"
    />
  </Describer>
);
```

### Generating the Miguel styleguide
Run your local next server (`next`) and navigate to `/miguel` to see the result.
By default, Miguel finds all `*.examples.js` files in your project and generates examples for them. The styleguide is created at `/pages/miguel.js`

## Usage

### Including in other tools (id=*)
@TODO

### Options
@TODO