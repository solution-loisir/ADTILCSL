module.exports = ({ defer = true, condition = true, source }) => {
  const deferAttr = defer ? " defer " : " ";

  if(condition) {
    return `<script${deferAttr}src="${source}"></script>`;
  } else {
    return "";
  }
}