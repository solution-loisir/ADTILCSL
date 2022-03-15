const esbuild = require("esbuild");
const fs = require("fs");

const scripts = fs.readdirSync("./js/").map(scriptPath => `js/${scriptPath}`).filter(scriptPath => scriptPath !== "js/dependencies");

const isProd = process.env.ELEVENTY_ENV === "prod";

esbuild.build({
    entryPoints: scripts,
    bundle: true,
    format: "iife",
    watch: !isProd,
    minify: isProd,
    outdir: "docs/js",
  }).catch(() => process.exit(1));