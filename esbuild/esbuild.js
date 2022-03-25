const esbuild = require("esbuild");
const browserslist = require("browserslist-to-esbuild")();

const modernEntryPoint = "js/index.js";
const tempLegacyEntryPoint = "_temp/js/legacy.js";
const outdir = "docs/js";

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
    outdir
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
    outdir
  }).catch(() => process.exit(1));
}