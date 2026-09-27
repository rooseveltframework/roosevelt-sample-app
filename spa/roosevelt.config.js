// roosevelt reads this file for its configuration
//
// it is javascript rather than json so that it can hold comments, real numbers and booleans, and code
//
// see https://rooseveltframework.org/docs/latest/configuration for what can go in here

// a ref is for a value that depends on a param roosevelt works out for itself, such as where the public folder ends up
const rooseveltConfig = require('roosevelt/config')

module.exports = {
  makeBuildArtifacts: true,
  http: {
    enable: false
  },
  https: {
    enable: true,
    port: 2663,
    options: {
      cert: 'cert.pem',
      key: 'key.pem'
    }
  },
  secretsPath: 'secrets',
  favicon: 'images/favicon.ico',
  modelsPath: 'mvc/models',
  viewsPath: 'mvc/views',
  controllersPath: 'mvc/controllers',
  viewEngine: [
    'html:teddy'
  ],
  css: {
    sourcePath: 'css',
    compiler: {
      enable: true,
      module: 'sass',
      options: {}
    },
    output: 'css',
    versionFile: null
  },
  js: {
    sourcePath: 'js',
    bundler: {
      enable: true,
      module: 'esbuild'
    },
    bundles: [
      {
        config: {
          entryPoints: [
            rooseveltConfig.ref(params => `${params.js.sourcePath}/main.js`)
          ],
          bundle: true,
          outfile: rooseveltConfig.ref(params => `${params.publicFolder}/js/main.js`),
          nodePaths: [
            rooseveltConfig.ref(params => `${params.js.sourcePath}`),
            rooseveltConfig.ref(params => `${params.buildFolder}/js`),
            rooseveltConfig.ref(params => `${params.appDir}`),
            'mvc/controllers'
          ],
          define: rooseveltConfig.ref(params => ({ 'process.env.NODE_ENV': JSON.stringify(params.mode === 'development' ? 'development' : 'production') }))
        }
      }
    ]
  },
  clientControllers: {
    enable: true,
    exposeAll: true,
    blocklist: [
      'server/*'
    ],
    allowlist: [],
    defaultBundle: 'controllers.js',
    output: 'js'
  },
  clientViews: {
    enable: true,
    exposeAll: true,
    blocklist: [
      'robots.txt'
    ],
    allowlist: [],
    defaultBundle: 'views.js',
    output: 'js',
    minify: true,
    minifyOptions: {
      caseSensitive: true,
      collapseWhitespace: true,
      removeAttributeQuotes: false
    }
  },
  clientModels: {
    enable: true,
    exposeAll: true,
    blocklist: [
      'server/*'
    ],
    allowlist: [],
    apiRoute: '/api',
    output: 'js/models'
  },
  symlinks: [
    {
      source: rooseveltConfig.ref(params => `${params.staticsRoot}/images`),
      dest: rooseveltConfig.ref(params => `${params.publicFolder}/images`)
    }
  ]
}
