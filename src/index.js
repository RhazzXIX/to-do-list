import "./styles/style.css";
import { tasksModule, projectModule } from "./scripts/app";
import Trash from "./images/trash.svg";
import EditProject from "./images/editBook.svg";
import EditTask from "./images/edit.svg";
import { format, getTime } from "date-fns";
import Logo from "./images/EXEcute2.png";
import bell from "./images/bell.svg";
import bellRing from "./images/bell-ring.svg";
import Note from "./images/notebook.svg";
import Board from "./images/board.svg";
import Today from "./images/today.svg";
import coming from "./images/coming.svg";
import GitHub from "./images/GitHub.png";

const uTasks = tasksModule();
// console.log(uTasks);
const uProjects = projectModule();
// console.log(uProjects);

// uProjects.listProjects()[0].addTasks("buy soil", "afternoon");
// uProjects.listProjects()[1].addTasks();
// console.log(uProjects.listProjects()[0].getProjectName());
// console.log(uProjects.listProjects());
// uProjects.listProjects().forEach((item) => console.log(item.listTasks()));
uTasks.addTasks("buy groceries", "today", 1, 'local market');
// uTasks.addTasks("drop shopee", "today", 2);
// uTasks.addTasks("pay bills", "today", 1);
console.log(uTasks.listTasks());

const DOM = (function () {
  const base = document.querySelector("body");

  // Main Header
  const header = document.createElement("header");
  header.classList.add("main");

  const exeLogo = new Image();
  exeLogo.src = Logo;
  exeLogo.setAttribute("id", "exe");
  exeLogo.setAttribute("alt", "EXEcute Logo");
  header.appendChild(exeLogo);

  const addTasks = document.createElement("button");
  addTasks.setAttribute("id", "addTasks");
  addTasks.classList.add("kit");
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

  // Main Sidebar
  const sidebar = document.createElement("aside");

  const nav = document.createElement("ul");
  nav.setAttribute("id", "navi");

  const btnBoard = document.createElement("button");

  const btnToday = document.createElement("button");

  const btnComing = document.createElement("button");

  const btnProject = document.createElement("button");

  const addProject = document.createElement("button");
  addProject.setAttribute("id", "addProject");
  addProject.classList.add("kit");
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
    button.classList.add("list");
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

  // Input Forms
  const sectionForm = document.createElement("section");

  sectionForm.setAttribute("id", "form");
  const form = document.createElement("form");
  form.setAttribute("id", "form");

  const formTitle = document.createElement("h2");
  formTitle.textContent = "Add Project";

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("kit");
  closeBtn.setAttribute("type", "button");
  closeBtn.setAttribute("id", "closeButton");
  closeBtn.textContent = "✕";

  const formHeader = document.createElement("header");

  formHeader.appendChild(formTitle);
  formHeader.appendChild(closeBtn);

  const firstLabel = document.createElement("label");
  firstLabel.textContent = "Project Name:";
  firstLabel.setAttribute("for", "firstInput");

  const firstInput = document.createElement("input");
  firstInput.setAttribute("id", "firstInput");
  firstInput.setAttribute("required", "");
  firstLabel.appendChild(firstInput);

  const scndLabel = document.createElement("label");
  scndLabel.setAttribute("for", "scndInput");
  scndLabel.textContent = "Description:";

  const scndInput = document.createElement("textarea");
  scndInput.setAttribute("id", "scndInput");
  scndLabel.appendChild(scndInput);
  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");

  const priorityInput = document.createElement("select");
  for (let i = 0; i <= 2; i += 1) {
    const option = document.createElement("option");
    switch (i) {
      case 1:
        option.textContent = "Priority 2";
        break;
      case 2:
        option.textContent = "Priority 3";
        option.setAttribute("selected", "");
        break;
      default:
        option.textContent = "Priority 1";
    }
    priorityInput.appendChild(option);
  }

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("kit");
  submitBtn.textContent = "Add Project";

  sectionForm.appendChild(form);
  form.appendChild(formHeader);
  form.appendChild(firstLabel);
  form.appendChild(scndLabel);
  form.appendChild(submitBtn);

  // form.appendChild(scndInput);
  // form.appendChild(dateInput);
  // form.appendChild(priorityInput);

  // base.appendChild(sectionForm);

  // Bind Events

  submitBtn.addEventListener("click", submitForm);

  function submitForm (event) {
    event.stopPropagation();
    if (!!firstInput.value === true) {
      event.preventDefault();
      console.log(scndInput.value)
      uProjects.createNewProject(firstInput.value, scndInput.value);
      updateProjectList();
      clearForm();
      removeForm(event);
    }

  }

  addProject.addEventListener("click", showForm);

  function showForm(event) {
    event.stopPropagation();
    if (this === addProject) {
      form.classList.add("project");
      form.classList.add("task");
      base.appendChild(sectionForm);
    }
  }

  closeBtn.addEventListener("click", removeForm);

  sectionForm.addEventListener("click", removeForm);

  
  // DOM and App bridge
  function removeForm(event) {
    switch (event.target) {
      case (sectionForm):
        event.stopPropagation();
        base.removeChild(sectionForm);
        break;
      case (closeBtn):
        event.stopPropagation();
        base.removeChild(sectionForm);
        break;
      case (submitBtn):
        event.stopPropagation();
        base.removeChild(sectionForm);
        break;
      default:
    }
  }

  function clearForm () {
    firstInput.value = '';
    scndInput.value = '';
  }

  const updateProjectList = function () {
    const list = projectList.querySelectorAll('li')
    
    list.forEach(project => {
      projectList.removeChild(project)
    });

    uProjects.listProjects().forEach((project) => {
      console.log(project.getProjectReference());
      const li = document.createElement("li");
    
      const pName = document.createElement("button");
      pName.classList.add("list");
      pName.textContent = project.getProjectName();

      const editProjectBtn = document.createElement("button");
      const editProjectImg = new Image(22, 22);
      editProjectImg.src = EditProject;
      editProjectImg.setAttribute("alt", "Edit Project Icon");
      editProjectBtn.classList.add("list");
      editProjectBtn.appendChild(editProjectImg);

      const delBtn = document.createElement("button");
      const delImg = new Image(22, 22);
      delImg.src = Trash;
      delImg.setAttribute("alt", "Trash Icon");
      delBtn.classList.add("list");
      delBtn.appendChild(delImg);

      li.appendChild(pName);
      li.appendChild(editProjectBtn);
      li.appendChild(delBtn);
      projectList.appendChild(li);
    });
  };
  updateProjectList();
})();
