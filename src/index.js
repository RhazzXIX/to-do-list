import "./styles/style.css";
import tasksFns from "./scripts/app";

const DOM = (function () {
  const base = document.querySelector("body");
  const headerMain = document.createElement("header");
  const main = document.createElement("main");
  const sidebar = document.createElement("aside");

  base.appendChild(headerMain);
  base.appendChild(sidebar);
  base.appendChild(main);

})();


const groceries2 = tasksFns.addTasks('buy groceries more', 'afternoon');

console.log(tasksFns.getTask().push('groceries'));
tasksFns.deleteTasks('water the plants');
console.log(tasksFns.getTask());