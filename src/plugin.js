import runMiguel from "./scripts/runMiguel";

class MiguelPlugin {
  constructor(options) {
    this.options = options.miguel || {};
  }

  getChangedFiles(compiler) {
    const { watchFileSystem } = compiler;
    const watcher = watchFileSystem.watcher || watchFileSystem.wfs.watcher;

    return Object.keys(watcher.mtimes);
  }

  apply(compiler) {
    // Set up blog index at start
    compiler.hooks.environment.tap("MiguelPlugin", () => {
      runMiguel(this.options);
    });

    // Re generate styleguide when example.js files change
    compiler.hooks.watchRun.tap("MiguelPlugin", () => {
      const changedFile = this.getChangedFiles(compiler);

      if (
        changedFile.find((file) =>
          file.includes(this.options.extension || ".example.js")
        )
      ) {
        runMiguel(this.options);
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
