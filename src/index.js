import { defaults } from "./defaults";
import notify from "./utils/notify";
import path from "path";
import runMiguel from "./scripts/runMiguel";
import Watchpack from "watchpack";

class MiguelPlugin {
  constructor(options) {
    this.options = {
      ...defaults,
      ...options.miguel,
    };
  }

  getChangedFiles(compiler) {
    const { watchFileSystem } = compiler;
    const watcher = watchFileSystem.watcher || watchFileSystem.wfs.watcher;

    return Object.keys(watcher.mtimes);
  }

  apply(compiler) {
    if (this.options.watch === false) {
      runMiguel(this.options);
      return notify("watch disabled - not listening to changes");
    }

    compiler.hooks.watchRun.tap("MiguelPlugin", () => {
      const changedFiles = this.getChangedFiles(compiler);
      const { extension } = this.options;

      if (changedFiles.find((file) => file.includes(extension))) {
        notify(`example updated`);
        runMiguel(this.options);
      }
    });

    let files = [];

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

    const wp = new Watchpack({
      ignored: [...defaultIgnore, ...this.options.watchIgnore].map((current) =>
        path.join(path.resolve("."), current)
      ),
    });
    wp.watch([], [path.resolve(".")], 0);

    wp.on("aggregated", () => {
      const knownFiles = wp.getTimeInfoEntries();
      const knownFilesAsArray = Array.from(knownFiles.entries());
      const newFiles = knownFilesAsArray
        .filter(([key]) => key.includes(this.options.extension))
        .map(([key]) => key)
        .sort((a, b) => b < a);

      if (JSON.stringify(newFiles) !== JSON.stringify(files)) {
        runMiguel(this.options);
        files = newFiles;
      }
    });
  }
}

module.exports = (nextConfig) => ({
  ...nextConfig,
  webpack(config, options) {
    if (!options.defaultLoaders) {
      throw new Error(
        "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
      );
    }

    /* Currently only in dev, on build run it from cli. */
    if (options.dev && options.isServer) {
      config.plugins.push(new MiguelPlugin(nextConfig));
    }

    if (typeof nextConfig.webpack === "function") {
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});
