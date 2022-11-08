import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {
 DefinePlugin,
 ProgressPlugin,
 HotModuleReplacementPlugin,
} from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import sass from "sass";
import autoprefixer from "autoprefixer";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";

const NODE_ENV = process.env.NODE_ENV || "development";
const isDev = NODE_ENV === "development";

const loader = (loaderName, isShort = true) =>
 require.resolve(isShort ? `${loaderName}-loader` : loaderName);
const pathJoin = (dir = "", abs = __dirname) => path.join(abs, dir);
const pathResolve = (dir = "", abs = __dirname) => path.resolve(abs, dir);
const slash = (dirName, lastSlash = true, firstSlash = true) =>
 `${firstSlash ? "/" : null}${dirName}${lastSlash ? "/" : null}`;

const shortModuleName = [
 ".js",
 ".jsx",
 ".tsx",
 ".ts",
 ".json",
 ".scss",
 ".sass",
 ".css",
 ".less",
 ".styl",
];

const dir = {
 packages: "node_modules",
 packagesRegexp: /node_modules/,
 assets: "assets",
 build: "build",
 src: "src",
 public: "public",
 components: "components",
 img: "img",
 sound: "sound",
 video: "video",
 font: "font",
 css: "css",
 svg: "svg",
 js: "js",
};

const ext = {
 svg: /\i.svg$/i,
 scripts: /\.m?[tj]sx?$/i,
 styles: /\.s?[ac]ss$/i,
 pug: /\.pug$/i,
 jade: /\.jade$/i,
 js: /\.jsx?$/i,
 ts: /\.tsx?$/i,
 json: /\.json$/i,
 mp3: /\.mp3$/i,
};

const test = {
 svg: ext.svg,
 svgEmit: [ext.scripts, ext.styles, ext.pug],
 scripts: ext.scripts,
 styles: ext.styles,
 mediaImage: /\.(a?png|jpe?g|tiff?|bmp|webp|avif|gif|ico)$/i,
 mediaFont: /\.(f.svg|woff2?|[ot]tf|eot)$/i,
 mediaVideo: /\.(mp4|webm|avi)$/i,
 mediaSound: ext.mp3,
 pug: [ext.pug, ext.jade],
 js: [ext.js, ext.json],
 ts: ext.ts,
};

const paths = {
 root: pathJoin(),
 exclude: [dir.packagesRegexp, pathResolve(dir.packages)],
 output: (path = slash(dir.assets), pattern = "[name].[ext]") =>
  `${path}${pattern}`,
};

const loaders = {
 svg: loader("@svgr/webpack", false),
 babel: loader("babel"),
 ts: loader("ts"),
 babelPresetEnv: loader("@babel/preset-env", false),
 babelPresetTypescript: loader("@babel/preset-typescript", false),
 pug: loader("pug"),
 file: loader("file"),
 style: loader("style"),
 css: loader("css"),
 postcss: loader("postcss"),
 sass: loader("sass"),
};

const devProdPlugins = isDev
 ? [new HotModuleReplacementPlugin()]
 : [
    new MiniCssExtractPlugin({
     filename: `${dir.assets}/${dir.css}/[name].css`,
    }),
   ];

const minifyOptionObj = {
 collapseWhitespace: true,
 keepClosingSlash: true,
 removeComments: true,
 removeRedundantAttributes: true,
 removeScriptTypeAttributes: true,
 removeStyleLinkTypeAttributes: true,
 useShortDoctype: true,
 removeAttributeQuotes: true,
};

module.exports = {
 target: "web",
 name: "webpack 5 starter",
 watch: !isDev ? true : false,
 watchOptions: !isDev
  ? {
     aggregateTimeout: 5,
     poll: 1000,
    }
  : {},

 entry: {
  home: pathJoin(`${dir.src}/${dir.js}/index.js`),
 },
 output: {
  path: pathJoin(dir.build),
  filename: `${dir.assets}/${dir.js}/[name].js`,
 },
 mode: NODE_ENV,
 // cache: { type: "memory", cacheUnaffected: true },
 cache: false,

 infrastructureLogging: {
  level: "log",
  debug: ["sass-loader"],
 },

 stats: {
  loggingDebug: ["sass-loader"],
 },

 resolve: {
  extensions: shortModuleName,
  alias: {
   ["@.components"]: pathResolve("src/components/"),
   ["@.data"]: pathResolve("src/data/"),
   ["@.icons"]: pathResolve("src/icons/"),
   ["@.shared"]: pathResolve("src/shared/"),
  },
 },

 ...(() => {
  return !isDev
   ? {
      optimization: {
       emitOnErrors: false,
       minimize: true,
       minimizer: [
        new TerserPlugin({
         test: test.scripts,
         extractComments: false,
         terserOptions: {
          compress: {
           drop_console: true,
          },
         },
        }),
       ],
      },
     }
   : {};
 })(),

 devtool: isDev ? "source-map" : false,
 profile: isDev ? true : false,

 devServer: isDev
  ? {
     open: true,
     compress: true,
     hot: true,
     port: 4600,
     hot: true,
     client: {
      overlay: {
       errors: true,
       warnings: false,
      },
      progress: true,
     },
    }
  : {},

 module: {
  noParse: /jquery|lodash/,

  rules: [
   {
    test: ext.js,
    use: loaders.babel,
    exclude: paths.exclude,
    include: pathJoin(dir.src),
   },
   {
    test: ext.ts,
    use: loaders.ts,
    exclude: paths.exclude,
    include: pathJoin(dir.src),
   },
   {
    test: test.svg,
    use: [
     {
      loader: loaders.svg,
      options: {
       prettier: false,
       svgo: false,
       titleProp: true,
       ref: true,
       svgoConfig: {
        plugins: [{ removeViewBox: false }],
       },
      },
     },
     {
      loader: loaders.file,
      options: {
       name: `${dir.assets}/${dir.svg}/[name].[ext]`,
      },
     },
    ],
    issuer: {
     and: [test.svgEmit],
    },
   },

   {
    test: test.mediaImage,
    type: "asset/resource",
    generator: {
     outputPath: `${dir.assets}/${dir.img}/`,
     filename: `[name][ext]`,
    },
   },

   {
    test: test.mediaSound,
    type: "asset/resource",
    generator: {
     outputPath: `${dir.assets}/${dir.sound}/`,
     filename: `[name][ext]`,
    },
   },

   {
    test: test.mediaVideo,
    type: "asset/resource",
    generator: {
     outputPath: `${dir.assets}/${dir.video}/`,
     filename: `[name][ext]`,
    },
   },
   {
    test: test.mediaFont,
    type: "asset/resource",
    generator: {
     ...(() => {
      return isDev ? { publicPath: "assets/fonts/" } : {};
     })(),
     outputPath: "assets/fonts/",
     filename: `[name][ext]`,
    },
   },
   {
    test: test.pug,
    loader: loaders.pug,
    options: {
     pretty: true,
    },
    exclude: paths.exclude,
   },
   {
    test: test.styles,
    use: [
     (() => {
      return !isDev
       ? {
          loader: MiniCssExtractPlugin.loader,
          options: {
           publicPath: "../fonts/",
          },
         }
       : { loader: loader("style") };
     })(),
     {
      loader: loader("css"),
     },
     {
      loader: loader("postcss"),
      options: {
       postcssOptions: {
        plugins: [
         [
          "autoprefixer",
          {
           // 'browsers': ['> 1%', 'last 2 versions']
          },
         ],
        ],
       },
      },
     },
     {
      loader: loader("sass"),
      options: { implementation: sass, sourceMap: true },
     },
    ],
   },
  ],
 },

 plugins: [
  ...devProdPlugins,
  new CaseSensitivePathsPlugin(),
  new ProgressBarPlugin(),
  new HtmlWebpackPlugin({
   title: "",
   template: pathResolve(`${dir.public}/index.html`),
   filename: "index.html",
   chunks: ["home"],
   minify: !isDev ? minifyOptionObj : {},
  }),
  new CopyPlugin({
   patterns: [
    {
     from: pathJoin(dir.public),
     to: pathJoin(dir.build),
     globOptions: {
      ignore: ["**/*.html"],
     },
    },
   ],
  }),
 ],
};
