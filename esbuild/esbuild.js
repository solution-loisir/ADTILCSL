const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const indir = "js";
const outdir = "_temp/js";

const scripts = fs.readdirSync(indir)
.map(scriptPath => path.join(indir, scriptPath))
.filter(scriptPath => scriptPath !== path.join(indir, "dependencies"));

const isProd = process.env.ELEVENTY_ENV === "prod";

esbuild.build({
  entryPoints: scripts,
  bundle: true,
  format: "iife",
  watch: !isProd,
  minify: isProd,
  outdir
}).catch(() => process.exit(1));