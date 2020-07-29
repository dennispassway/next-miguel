import fs from "fs";
import glob from "glob";
import notify from "../utils/notify";
import path from "path";

export default ({ extension, gitignore, page }) => {
  notify("compiling styleguide...");

  glob(`**/*${extension}`, function (err, filePaths) {
    if (err) {
      throw err;
    }

    const examples = getElementsForExtension({ filePaths, extension });
    writeTemplateToFile({ examples, page });

    if (gitignore !== false) {
      addToGitignore({ page });
    }
  });
};

function getElementsForExtension({ filePaths, extension }) {
  return filePaths.map((filePath) => {
    const nameRegEx = new RegExp(`.+\/(.+)${extension.replace(/\./g, "\\.")}`);
    const [path, name] = filePath.match(nameRegEx);
    const importString = `import ${name}Example from '${path}'`;
    const elementString = `${name}Example`;

    const fileContents = fs.readFileSync(filePath, "utf8");
    const examplePropsRegex = /\<Example([^\>]*\n*)*\>/;
    const exampleMatches = fileContents.match(examplePropsRegex);
    const exampleProps =
      exampleMatches && exampleMatches.length ? exampleMatches[1] : "";
    const idRegEx = /id\=\"(.+)\"/;
    const idResult = exampleProps.match(idRegEx);
    const idString =
      idResult && idResult.length
        ? idResult[1]
        : Math.random().toString(32).substr(2);

    return { importString, elementString, idString };
  });
}

function writeTemplateToFile({ examples, page }) {
  const template = generateTemplate({ examples, page });

  const pagesPath = path.join(path.resolve("."), "pages");
  const targetPath = path.join(pagesPath, `${page}.js`);

  if (!fs.existsSync(pagesPath)) {
    fs.mkdirSync(pagesPath);
  }

  fs.writeFile(targetPath, template, "utf8", (err) => {
    if (err) {
      throw err;
    }

    notify("styleguide compiled successfully");
  });
}

function addToGitignore({ page }) {
  const gitgnorePath = path.join(path.resolve("."), ".gitignore");
  const pagePath = `pages/${page}.js`;

  if (!fs.existsSync(gitgnorePath)) {
    fs.writeFile(gitgnorePath, pagePath, "utf8", (err) => {
      if (err) {
        throw err;
      }

      notify(`created .gitignore with ${pagePath}`);
    });
  } else {
    const content = fs.readFileSync(gitgnorePath, "utf8");
    const rules = content.split("\n");
    const foundRule = rules.find((rule) => rule === pagePath);

    if (foundRule) {
      return;
    }

    rules.push(pagePath);

    const newContent = rules.join("\n");

    fs.writeFile(gitgnorePath, newContent, "utf8", (err) => {
      if (err) {
        throw err;
      }

      notify(`added ${pagePath} to .gitignore`);
    });
  }
}

function generateTemplate({ examples, page }) {
  return `
    import { MiguelContext, StyleGuide } from "miguel/components";
    import { useRouter } from "next/router";
    ${examples.map(({ importString }) => importString).join("\n")}

    const Miguel = () => {
      const {
        query: { id },
      } = useRouter();

      const componentMap = {
        ${examples
          .map(
            ({ idString, elementString }) => `'${idString}': ${elementString}`
          )
          .join(",\n")}
      };

      if (id) {
        const Element = componentMap[id];

        return (
          <MiguelContext.Provider value={{ miguelRoot: '${page}', componentId: id }}>
            <StyleGuide clean>
              {!Element ? <div>An example for component '{id}' could not be found...</div> : <Element />}
            </StyleGuide>
          </MiguelContext.Provider>
        );
      }

      return (
        <MiguelContext.Provider value={{ miguelRoot: '${page}', componentId: id }}>
          <StyleGuide>
            ${examples
              .map(({ elementString }) => `<${elementString} />`)
              .join("\n")}
          </StyleGuide>
        </MiguelContext.Provider>
      );
    };

    export default Miguel;
  `;
}
