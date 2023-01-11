import "./styles/style.css";
import tasksFns from "./scripts/app";
import projectFns from "./scripts/project";

const DOM = (function () {
  const base = document.querySelector("body");
  const headerMain = document.createElement("header");
  const main = document.createElement("main");
  const sidebar = document.createElement("aside");

  base.appendChild(headerMain);
  base.appendChild(sidebar);
  base.appendChild(main);

})();
