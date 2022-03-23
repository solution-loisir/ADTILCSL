const esbuild = require("esbuild");

const modernEntryPoint = "js/index.js";
const legacyEntryPoint = "js/legacy.js";
const modernOutdir = "docs/js";
const tempDir = "_temp/js";

const isProd = process.env.ELEVENTY_ENV === "prod";

esbuild.build({
  entryPoints: [modernEntryPoint],
  bundle: true,
  format: "esm",
  splitting: true,
  watch: !isProd,
  minify: isProd,
  outdir: modernOutdir
}).catch(() => process.exit(1));

if(isProd) {
  esbuild.build({
    entryPoints: [legacyEntryPoint],
    bundle: true,
    target: require("browserslist-to-esbuild")(),
    format: "iife",
    outdir: tempDir
  }).catch(() => process.exit(1));
}