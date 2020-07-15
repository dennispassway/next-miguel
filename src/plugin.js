import runMiguel from "./scripts/runMiguel";

class MiguelPlugin {
  constructor(options) {
    this.options = options.miguel || {};
  }

  getChangedFilesWithExtension(compiler) {
    const { watchFileSystem } = compiler;
    const watcher = watchFileSystem.watcher || watchFileSystem.wfs.watcher;

    const changedFiles = Object.keys(watcher.mtimes);
    return changedFiles.filter((file) =>
      file.includes(this.options.extension || ".example.js")
    );
  }

  apply(compiler) {
    compiler.hooks.environment.tap("MiguelPlugin", () => {
      runMiguel(this.options);
    });

    if (this.options.watch !== false) {
      compiler.hooks.watchRun.tap("MiguelPlugin", () => {
        const changedFiles = this.getChangedFilesWithExtension(compiler);

        if (changedFiles && changedFiles.length) {
          runMiguel(this.options);
        }
      });
    }
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
