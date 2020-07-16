import path from "path";
import runMiguel from "./scripts/runMiguel";
import Watchpack from "watchpack";

const defaults = {
  ignore: [],
  extension: ".example.js",
  gitignore: true,
  page: "miguel",
  watch: true,
};

class MiguelPlugin {
  constructor(options) {
    this.options = {
      ...defaults,
      ...options.miguel,
    };
  }

  apply() {
    if (this.options.watch === false) {
      runMiguel(this.options);

      return console.log(
        "\x1b[33mmiguel\x1b[0m - %s",
        `not watching for file changes`
      );
    }

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
      ignored: [...defaultIgnore, ...this.options.ignore].map((current) =>
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

    if (options.isServer) {
      config.plugins.push(new MiguelPlugin(nextConfig));
    }

    if (typeof nextConfig.webpack === "function") {
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});
