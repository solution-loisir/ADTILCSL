module.exports = ({ src, moduleIf }) => `<script defer${ moduleIf ? ` type="module" ` : " "}src="${src}"></script>`;