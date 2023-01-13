import { format, getTime } from "date-fns";
import Logo from "./images/EXEcute2.png";
import bell from "./images/bell.svg";
import bellRing from "./images/bell-ring.svg";
import Note from "./images/notebook.svg";
import Board from "./images/board.svg";
import Today from './images/today.svg';
import coming from './images/coming.svg';
import GitHub from './images/GitHub.png'


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
  let currentDate = format(new Date(), "eo-MMM.-yy");
  let currentTime = format(new Date(), "hh:mm:ss aa");
  time.textContent = `${currentTime}  ${currentDate}`;
  time.setAttribute("datetime", `${currentTime}  ${currentDate}`);
  headerMain.appendChild(time);

  const timeUpdate = function () {
    currentDate = format(new Date(), "eo-MMM.-yy");
    currentTime = format(new Date(), "hh:mm:ss aa");
    time.textContent = `${currentTime}   ${currentDate}`;
    time.setAttribute("datetime", `${currentTime}  ${currentDate}`);
  };

  setInterval(() => timeUpdate(), 1000);

  const sidebar = document.createElement("aside");

  const nav = document.createElement("ul");
  for (let i = 0; i <= 3; i += 1) {
    const list = document.createElement("li");
    const holder = document.createElement("div");
    holder.classList.add('nav')
    const img = new Image();
    img.classList.add('svg');
    const p = document.createElement("p");
    const button = document.createElement('button')
    button.textContent = "˅"
    holder.appendChild(img);
    holder.appendChild(p);
    list.appendChild(holder);

    switch (i) {
      case 1:
        img.src = Today;
        img.setAttribute("alt", "Today Icon");
        p.textContent = "Today";
        break;
      case 2:
        img.src = coming;
        img.setAttribute("alt", "Upcoming Icon");
        p.textContent = "Upcoming";
        break;
      case 3:
        img.src = Note;
        img.setAttribute("alt", "Project Icon");
        p.textContent = "Projects";
        list.appendChild(button);
        break;
      default:
        img.src = Board;
        img.setAttribute("alt", "Board Icon");
        p.textContent = "Board";
    }
    nav.appendChild(list);
  }

  sidebar.appendChild(nav);

  const div2 = document.createElement('div');
  sidebar.appendChild(div2);
  const github = new Image();
  github.src = GitHub;
  github.setAttribute('alt', 'GitHub Logo');
  
  const gitAnchor = document.createElement('a');
  gitAnchor.setAttribute('href', 'https://github.com/RhazzXIX')
  gitAnchor.appendChild(github);

  sidebar.appendChild(gitAnchor);

  const main = document.createElement("main");
  const div = document.createElement('div');
  div.textContent = 'test'
  main.appendChild(div);

  base.appendChild(headerMain);
  base.appendChild(sidebar);
  base.appendChild(main);

  console.log(base.offsetWidth);

  return { base };
})();

export default DOM;