const glob = require("glob");
const fs = require("fs");

export default ({ extension, page }) => {
  console.log("\x1b[33mmiguel\x1b[0m - %s", "starting styleguide generation");

  glob(`**/*${extension}`, function (err, filePaths) {
    if (err) {
      throw err;
    }

    const examples = filePaths.map((filePath) => {
      const nameRegEx = new RegExp(
        `.+\/(.+)${extension.replace(/\./g, "\\.")}`
      );
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

    const template = generateTemplate({ examples, page });

    fs.writeFile(`./pages/${page}.js`, template, "utf8", (err) => {
      if (err) {
        throw err;
      }

      console.log(
        "\x1b[33mmiguel\x1b[0m - %s",
        `generated styleguide at pages/${page}.js`
      );
    });
  });
};

function generateTemplate({ examples, page }) {
  return `
    import { MiguelContext, StyleGuide } from "miguel/components";
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
          <MiguelContext.Provider value={{ miguelRoot: '${page}' }}>
            <StyleGuide clean>
              {!Element ? <div>Component could not be found</div> : <Element />}
            </StyleGuide>
          </MiguelContext.Provider>
        );
      }

      return (
        <MiguelContext.Provider value={{ miguelRoot: '${page}' }}>
          <StyleGuide>
            ${examples
              .map(({ elementString }) => `<${elementString} />`)
              .join("\n")}
          </StyleGuide>
        </MiguelContext.Provider>
      );
    };
  `;
}
