import { format, getTime } from "date-fns";
import "./styles/style.css";
import tasksFns from "./scripts/app";
import projectFns from "./scripts/project";
import Logo from "./images/EXEcute2.png";
import bell from "./images/bell.svg";
import bellRing from "./images/bell-ring.svg";
import Note from "./images/notebook.svg"
import Board from "./images/board.svg"

const tasks = tasksFns();
const projects = projectFns();
console.log(projects);
console.log(tasks);

const DOM = (function () {
  const base = document.querySelector("body");

  const headerMain = document.createElement("header");

  const exeLogo = new Image();
  exeLogo.src = Logo;
  exeLogo.setAttribute("id", "exe");
  exeLogo.setAttribute("alt", "EXEcute Logo");
  headerMain.appendChild(exeLogo);

  const addTasks = document.createElement("button");
  addTasks.setAttribute("id", "addTasks");
  addTasks.textContent = "+";
  headerMain.appendChild(addTasks);

  const notif = new Image();
  notif.src = bell;
  notif.setAttribute("alt", "Bell Icon");
  notif.classList.add("svg");
  headerMain.appendChild(notif);

  const time = document.createElement("time");
  let currentDate = format(new Date(), "eo-MMM-yy");
  let currentTime = format(new Date(), "hh:mm:ss aa");
  time.textContent = `${currentTime}  ${currentDate}`;
  time.setAttribute('datetime',`${currentTime}  ${currentDate}`)
  headerMain.appendChild(time);

  const timeUpdate = function () {
    currentDate = format(new Date(), "eo-MMM-yy");
    currentTime = format(new Date(), "hh:mm:ss aa");
    time.textContent = `${currentTime}   ${currentDate}`;
    time.setAttribute('datetime',`${currentTime}  ${currentDate}`)
  };

  setInterval(() => timeUpdate(), 1000);

  const sidebar = document.createElement("aside");
  
  const nav = document.createElement('ul');
  for (let i = 0; i <= 3; i += 1) {
    const list = document.createElement('li')
    const holder = document.createElement('div');
    const img = new Image();
    const p = document.createElement('p');

    switch (i) {
      default:
        img.src = Board;
        img.setAttribute('alt', 'Board Icon');
        p.textContent = "Board";

    }

    holder.appendChild(img);
    holder.appendChild(p);
    list.appendChild(holder);
    nav.appendChild(list);
  };

  sidebar.appendChild(nav);


  const main = document.createElement("main");

  base.appendChild(headerMain);
  base.appendChild(sidebar);
  base.appendChild(main);

  return { base };
})();
