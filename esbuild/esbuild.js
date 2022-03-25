const esbuild = require("esbuild");
const browserslist = require("browserslist-to-esbuild")();

const modernEntryPoint = "js/index.js";
const legacyOutfile = "js/legacy.js";
const modernOutdir = "docs/js";
const tempLegacyEntryPoint = "_temp/js/legacy.js";

const isProd = process.env.ELEVENTY_ENV === "prod";
const isBundlingPolyfills = process.env.ESBUILD_ENV === "bundle_polyfills";
const isBundlingLegacy = process.env.ESBUILD_ENV === "bundle_legacy";

if(!isBundlingPolyfills) {
  esbuild.build({
    entryPoints: [modernEntryPoint],
    bundle: true,
    format: "esm",
    target: "es2015",
    splitting: true,
    watch: !isProd,
    minify: isProd,
    outdir: modernOutdir
  }).catch(() => process.exit(1));
}

if(isBundlingLegacy) {
  esbuild.build({
    entryPoints: [modernEntryPoint],
    bundle: true,
    target: browserslist,
    format: "iife"
  }).catch(() => process.exit(1));
}

if(isBundlingPolyfills) {
  esbuild.build({
    entryPoints: [tempLegacyEntryPoint],
    bundle: true,
    target: browserslist,
    format: "iife",
    outdir: "docs/js"
  }).catch(() => process.exit(1));
}