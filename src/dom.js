

const DOM = (function () {
  const base = document.querySelector("body");
  const headerMain = document.createElement("header");
  const main = document.createElement("main");
  const sidebar = document.createElement("aside");

  base.appendChild(headerMain);
  base.appendChild(sidebar);
  base.appendChild(main);

  return { base }
})();

export default DOM;