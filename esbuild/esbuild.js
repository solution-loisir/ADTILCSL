const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const jsInputFolder = "js";

const scripts = fs.readdirSync(jsInputFolder)
.map(scriptPath => path.join(jsInputFolder, scriptPath))
.filter(scriptPath => scriptPath !== path.join(jsInputFolder, "dependencies"));

const isProd = process.env.ELEVENTY_ENV === "prod";

esbuild.build({
    entryPoints: scripts,
    bundle: true,
    format: "iife",
    watch: !isProd,
    minify: isProd,
    outdir: "docs/js",
  }).catch(() => process.exit(1));