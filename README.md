## What is Miguel?
Miguel is a simple styleguide generator for Next.js

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
Add the Miguel command to your buildstep in the `package.json`

```
{
  "scripts": {
    "build": "miguel && next build",
    "build-miguel": "miguel"
  },
}
```

### Creating your first example
To create a Miguel example create a file named: `[componentname].example.js`.
Use the `Describer` included in Miguel to document your component.

```
import { Describer } from "miguel";
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
Run the command you created in your `package.json`: `npm run build-miguel` or `yarn build-miguel` to generate the styleguide.
By default, Miguel finds all `*.examples.js` files in your project and generates exampkles for them. The styleguide is created at `/pages/miguel-styleguide.js`

Now run your local next server (`next`) and navigate to `/miguel-styleguide` to see the result.

## Usage

### Including in other tools (id=*)
@TODO

### Options
@TODO