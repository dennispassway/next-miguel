#!/usr/bin/env node
import runMiguel from "../scripts/runMiguel";

function optionsObjectFromArguments(argumentsArray) {
  const dashArguments = argumentsArray.filter(
    (arg) => arg.substring(0, 2) === "--"
  );
  const keyValueReg = new RegExp("--(.+)=(.+)");

  return dashArguments.reduce((mem, arg) => {
    const [_, key, value] = arg.match(keyValueReg);
    return { ...mem, [key]: value };
  }, {});
}

const options = optionsObjectFromArguments(process.argv);
runMiguel(options);
