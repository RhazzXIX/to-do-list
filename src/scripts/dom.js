import { format, getTime } from "date-fns";
import Logo from "../images/EXEcute2.png";
import bell from "../images/bell.svg";
import bellRing from "../images/bell-ring.svg";
import Note from "../images/notebook.svg";
import Board from "../images/board.svg";
import Today from "../images/today.svg";
import coming from "../images/coming.svg";
import GitHub from "../images/GitHub.png";

const DOM = (function () {
  const base = document.querySelector("body");

  const header = document.createElement("header");

  const exeLogo = new Image();
  exeLogo.src = Logo;
  exeLogo.setAttribute("id", "exe");
  exeLogo.setAttribute("alt", "EXEcute Logo");
  header.appendChild(exeLogo);

  const addTasks = document.createElement("button");
  addTasks.setAttribute("id", "addTasks");
  addTasks.textContent = "+";
  header.appendChild(addTasks);

  const notif = new Image();
  notif.src = bell;
  notif.setAttribute("alt", "Bell Icon");
  notif.classList.add("svg");
  header.appendChild(notif);

  const time = document.createElement("time");
  let currentDate = format(new Date(), "eo-MMM.-yy");
  let currentTime = format(new Date(), "hh:mm:ss aa");
  time.textContent = `${currentTime}  ${currentDate}`;
  time.setAttribute("datetime", `${currentTime}  ${currentDate}`);
  header.appendChild(time);

  const timeUpdate = function () {
    currentDate = format(new Date(), "eo-MMM.-yy");
    currentTime = format(new Date(), "hh:mm:ss aa");
    time.textContent = `${currentTime}   ${currentDate}`;
    time.setAttribute("datetime", `${currentTime}  ${currentDate}`);
  };

  setInterval(() => timeUpdate(), 1000);

  const sidebar = document.createElement("aside");

  const nav = document.createElement("ul");
  nav.setAttribute("id", "navi");

  const btnBoard = document.createElement("button");

  const btnToday = document.createElement("button");

  const btnComing = document.createElement("button");

  const btnProject = document.createElement("button");

  const addProject = document.createElement("button");
  addProject.setAttribute("id", "addProject");
  addProject.textContent = "+";

  for (let i = 0; i <= 3; i += 1) {
    const list = document.createElement("li");
    const p = document.createElement("p");
    const img = new Image();
    img.classList.add("svg");
    let button;

    switch (i) {
      case 1:
        img.src = Today;
        img.setAttribute("alt", "Today Icon");
        p.textContent = "Today";
        button = btnToday;
        list.appendChild(button);
        break;
      case 2:
        img.src = coming;
        img.setAttribute("alt", "Upcoming Icon");
        p.textContent = "Upcoming";
        button = btnComing;
        list.appendChild(button);
        break;
      case 3:
        img.src = Note;
        img.setAttribute("alt", "Project Icon");
        p.textContent = "Projects";
        button = btnProject;
        list.appendChild(button);
        list.appendChild(addProject);
        break;
      default:
        img.src = Board;
        img.setAttribute("alt", "Board Icon");
        p.textContent = "Board";
        button = btnBoard;
        list.appendChild(button);
    }
    button.appendChild(img);
    button.appendChild(p);
    button.classList.add("nav");
    nav.appendChild(list);
  }

  sidebar.appendChild(nav);

  const projectList = document.createElement("ul");
  projectList.setAttribute("id", "projectList");
  sidebar.appendChild(projectList);

  const github = new Image();
  github.src = GitHub;
  github.setAttribute("alt", "GitHub Logo");

  const gitAnchor = document.createElement("a");
  gitAnchor.setAttribute("href", "https://github.com/RhazzXIX");
  gitAnchor.appendChild(github);

  sidebar.appendChild(gitAnchor);

  const main = document.createElement("main");
  main.setAttribute("id", "content");

  base.appendChild(header);
  base.appendChild(sidebar);
  base.appendChild(main);


  return { main, sidebar, header, nav, projectList, addProject };
})();

export default DOM;
