require("esbuild").build({
    entryPoints: ["js/index.js"],
    bundle: true,
    splitting: true,
    format: "esm",
    watch: true,
    outdir: "docs/js",
  }).catch(() => process.exit(1));