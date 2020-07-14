#!/usr/bin/env node

const glob = require("glob");
const fs = require("fs");

glob("**/*.example.js", function (err, filePaths) {
  if (err) {
    throw err;
  }

  const examples = filePaths.map((filePath) => {
    const nameRegEx = /.+\/(.+)\.example\.js/;
    const [path, name] = filePath.match(nameRegEx);
    const importString = `import ${name}Example from '${path}'`;
    const elementString = `${name}Example`;

    const fileContents = fs.readFileSync(filePath, "utf8");
    const describerPropsRegex = /\<Describer([^\>]*\n*)*\>/;
    const describerMatches = fileContents.match(describerPropsRegex);
    const describerProps =
      describerMatches && describerMatches.length ? describerMatches[1] : "";
    const idRegEx = /id\=\"(.+)\"/;
    const idResult = describerProps.match(idRegEx);
    const idString =
      idResult && idResult.length
        ? idResult[1]
        : Math.random().toString(32).substr(2);

    return { importString, elementString, idString };
  });

  const template = generateTemplate(examples);

  fs.writeFile("./pages/miguel-styleguide.js", template, "utf8", (err) => {
    if (err) {
      throw err;
    }

    console.log("Miguel generated!");
  });
});

function generateTemplate(examples) {
  return `
    import { StyleGuide } from "miguel";
    import { useRouter } from "next/router";
    ${examples.map(({ importString }) => importString).join("\n")}

    export default () => {
      const {
        query: { component },
      } = useRouter();

      const componentMap = {
        ${examples
          .map(
            ({ idString, elementString }) => `'${idString}': ${elementString}`
          )
          .join(",\n")}
      };

      if (component) {
        const Element = componentMap[component];

        return (
          <StyleGuide clean>
            {!Element ? <div>Component could not be found</div> : <Element />}
          </StyleGuide>
        );
      }

      return (
        <StyleGuide>
          ${examples
            .map(({ elementString }) => `<${elementString} />`)
            .join("\n")}
        </StyleGuide>
      );
    };
  `;
}
