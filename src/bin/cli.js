#!/usr/bin/env node

import { defaults } from "../defaults";
import fs from "fs";
import path from "path";
import runMiguel from "../scripts/runMiguel";

const nextConfig = path.join(path.resolve("."), "next.config.js");
const miguelConfigRegex = new RegExp("miguel: {([^}]+)}");

fs.readFile(nextConfig, (err, data) => {
  if (err) throw err;
  const content = data.toString();
  const [_, config] = content.match(miguelConfigRegex);

  const formattedConfig = `{${config
    .replace(/([^\s]+)\:/g, '"$1":')
    .replace(/\r?\n|\r|\s/g, "")}}`.replace(",}", "}");

  const configAsJson = JSON.parse(formattedConfig);

  const options = {
    ...defaults,
    ...configAsJson,
  };

  runMiguel(options);
});
