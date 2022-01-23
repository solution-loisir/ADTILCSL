const Image = require("@11ty/eleventy-img");
const outdent = require("outdent");
const path = require("path");

const placeholder = 22;

module.exports = async ({
    input,
    width = [300, 600],
    alt = "",
    baseFormat = "jpeg",
    optimalFormat = ["avif", "webp"],
    lazy = false,
    className = ["shadow-black-transparent"],
    sizes = "100vw"
}) => {
    const { dir, base } = path.parse(input);
    const inputPath = path.join(".", dir, base);

    const metadata = await Image(inputPath, {
        widths: [placeholder, ...width],
        formats: [...optimalFormat, baseFormat],
        urlPath: dir,
        outputDir: path.join("docs", dir)
    });
    
    const lowSrc = metadata[baseFormat][0];
    const highSrc = metadata[baseFormat][metadata[baseFormat].length - 1];
    
    if(lazy) {
      return outdent`
    <picture class="lazy-picture" data-lazy-state="unseen">
    ${Object.values(metadata).map(entry => {
      return `<source type="${entry[0].sourceType}" srcset="${entry[0].srcset}" data-srcset="${entry.filter((imageObject, index) => index !== 0).map(filtered => filtered.srcset).join(", ")}" sizes="${sizes}" class="lazy">`;
    }).join("\n")}
    <img
      src="${lowSrc.url}"
      data-src="${highSrc.url}"
      width="${highSrc.width}"
      height="${highSrc.height}"
      alt="${alt}"
      class="lazy ${className.join(" ")}"
      loading="lazy">
    </picture>

    <noscript>
    <picture>
    ${Object.values(metadata).map(entry => {
      return `<source type="${entry[0].sourceType}" srcset="${entry.filter((imageObject, index) => index !== 0).map(filtered => filtered.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
    <img
      src="${highSrc.url}"
      width="${highSrc.width}"
      height="${highSrc.height}"
      alt="${alt}"
      class="${className.join(" ")}">
    </picture>
    </noscript>`;

    } else if(!lazy) {
      return outdent`
      <picture>
      ${Object.values(metadata).map(entry => {
        return `<source type="${entry[0].sourceType}" srcset="${entry.filter((imageObject, index) => index !== 0).map(filtered => filtered.srcset).join(", ")}" sizes="${sizes}">`;
      }).join("\n")}
      <img
        src="${highSrc.url}"
        width="${highSrc.width}"
        height="${highSrc.height}"
        alt="${alt}"
        class="${className.join(" ")}">
      </picture>`;
    }
}