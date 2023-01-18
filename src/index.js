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
console.log(uTasks);
uProjects.createNewProject('To Do List', '');


uProjects.listProjects()[0].addTasks("buy soil", "01-25-2023", 'low', '');
// uProjects.listProjects()[1].addTasks();
// console.log(uProjects.listProjects()[0].getProjectName());
// console.log(uProjects.listProjects());
// uProjects.listProjects().forEach((item) => console.log(item.listTasks()));
uTasks.addTasks("buy groceries", "01-25-2023", 'Low', "local market");
uTasks.addTasks("buy soil", "01-25-2023", 'Medium', "Loam soil is preferred");
uTasks.addTasks('pay Bills', '01-18-2023', 'High', 'Electric Bill and Water Bill')
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

  // Main Content
  const main = document.createElement("main");
  main.setAttribute("id", "content");

  // const sectionToday = document.createElement('section');

  const taskSection = document.createElement('section');
  
  const todayHeader = document.createElement('header');
  todayHeader.setAttribute('id', 'todayHeader');
  taskSection.appendChild(todayHeader);
  
  const taskHeader = document.createElement('h1');
  taskHeader.classList.add('taskHeader');
  taskHeader.textContent = "Today's Tasks"
  todayHeader.appendChild(taskHeader)
  
  const addTasksBtn = document.createElement("button");
  addTasksBtn.setAttribute("id", "addTasks");
  addTasksBtn.classList.add("kit");
  addTasksBtn.textContent = "+";
  todayHeader.appendChild(addTasksBtn);

  function addCards () {
    uTasks.listTasks().forEach((item) => {
      console.log(item);
      const card = document.createElement('div');
      card.classList.add(item.priority)
  
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox')
      card.appendChild(checkbox)
      
      const task = document.createElement('p');
      task.textContent = item.task;
      card.appendChild(task);
  
      const date = document.createElement('p');
      date.textContent = item.date;
      card.appendChild(date);
        
      const noteBtn = document.createElement('button');
      noteBtn.textContent = '⬍'
      noteBtn.classList.add('cardBtn');
      card.appendChild(noteBtn);
  
      const editProjectBtn = document.createElement("button");
      const editProjectImg = new Image(22, 22);
      editProjectImg.src = EditProject;
      editProjectImg.setAttribute("alt", "Edit Project Icon");
      editProjectBtn.classList.add("cardBtn");
      editProjectBtn.appendChild(editProjectImg);
      card.appendChild(editProjectBtn);
      
      const delBtn = document.createElement("button");
      const delImg = new Image(22, 22);
      delImg.src = Trash;
      delImg.setAttribute("alt", "Trash Icon");
      delBtn.classList.add("cardBtn");
      delBtn.appendChild(delImg);
      card.appendChild(delBtn);
  
      const notes = document.createElement('p');
      const notesContainer = document.createElement('div');
      notesContainer.appendChild(notes);
      notesContainer.classList.add('notes');
      notes.textContent = item.note;
      // card.appendChild(notesContainer);
    
      taskSection.appendChild(card);
      main.appendChild(taskSection);
    })
  }
  
  addCards();
  
  // sectionToday.appendChild(taskSection);


  

  // Input Forms
  const sectionForm = document.createElement("section");

  sectionForm.setAttribute("id", "form");
  

  const formTitle = document.createElement("h2");

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("kit");
  closeBtn.setAttribute("type", "button");
  closeBtn.setAttribute("id", "closeButton");
  closeBtn.textContent = "✕";

  const formHeader = document.createElement("header");

  formHeader.appendChild(formTitle);
  formHeader.appendChild(closeBtn);

  const firstLabel = document.createElement("label");
  firstLabel.setAttribute("for", "firstInput");

  const firstInput = document.createElement("input");
  firstInput.setAttribute("id", "firstInput");
  firstInput.setAttribute("required", "");
  firstInput.setAttribute('type', 'text');

  const scndLabel = document.createElement("label");
  scndLabel.setAttribute("for", "scndInput");

  const scndInput = document.createElement("textarea");
  scndInput.setAttribute("id", "scndInput");

  const dateLabel = document.createElement('label');
  dateLabel.textContent = 'Set due date:'
  dateLabel.setAttribute('for', 'date');

  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute('id', 'date');

  dateLabel.appendChild(dateInput);

  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Set priority:'
  priorityLabel.setAttribute('for', 'priority');

  const priorityInput = document.createElement("select");
  priorityInput.setAttribute('id', 'priority');
  
  for (let i = 0; i <= 2; i += 1) {
    const option = document.createElement("option");
    switch (i) {
      case 1:
        option.textContent = "Medium";
        break;
      case 2:
        option.textContent = "Low";
        option.setAttribute("selected", "");
        break;
      default:
        option.textContent = "High";
    }
    priorityInput.appendChild(option);
  }

  priorityLabel.appendChild(priorityInput);

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("kit");
  
  base.appendChild(header);
  base.appendChild(sidebar);
  base.appendChild(main);

  

  // Bind Events

  submitBtn.addEventListener("click", submitForm);
  
  function submitForm(event) {
    event.stopPropagation();
    if (!!firstInput.value === true) {
      event.preventDefault();
      uProjects.createNewProject(firstInput.value, scndInput.value);
      updateProjectList();
      removeForm(event);
    }
  }

  addProject.addEventListener("click", showForm);
  addTasksBtn.addEventListener('click', showForm);

  
  closeBtn.addEventListener("click", removeForm);
  
  sectionForm.addEventListener("mousedown", removeForm);
  
  // DOM and App bridge
  function showForm(event) {
    event.stopPropagation();
    const form = document.createElement("form");
    form.setAttribute("id", "form");
    if (this === addProject) {
      formTitle.textContent = "Add Project";
      scndLabel.textContent = "Description:";
      firstLabel.textContent = "Project Name:";
      submitBtn.textContent = "Add Task";
      firstLabel.appendChild(firstInput);
      scndLabel.appendChild(scndInput);
      form.appendChild(formHeader);
      form.appendChild(firstLabel);
      form.appendChild(scndLabel);
      form.appendChild(submitBtn);
      sectionForm.appendChild(form);
      base.appendChild(sectionForm);
    } 
    if (this === addTasksBtn) {
      formTitle.textContent = "Add Task";
      firstLabel.textContent = "Task:";
      scndLabel.textContent = "Notes:";
      submitBtn.textContent = "Add Tasks";
      firstLabel.appendChild(firstInput);
      scndLabel.appendChild(scndInput);
      form.appendChild(formHeader);
      form.appendChild(firstLabel);
      form.appendChild(dateLabel);
      form.appendChild(priorityLabel);
      form.appendChild(scndLabel);
      form.appendChild(submitBtn);
      sectionForm.appendChild(form);
      base.appendChild(sectionForm);
    }
  }

  function removeForm(event) {
    event.stopPropagation();
    const form = sectionForm.querySelector('form#form');
    if (event.type === "mousedown") {
      if (event.target !== sectionForm) return;
      sectionForm.removeChild(form);
      base.removeChild(sectionForm);
    }
    switch (event.target) {
      case closeBtn:
        sectionForm.removeChild(form);
        base.removeChild(sectionForm);
        break;
      case submitBtn:
        sectionForm.removeChild(form);
        base.removeChild(sectionForm);
        break;
      default:
    }
    clearForm();
  }

  function clearForm() {
    firstInput.value = "";
    scndInput.value = "";
    dateInput.value = '';
    priorityInput.value = 'Low'
  }

  const updateProjectList = function () {
    const list = projectList.querySelectorAll("li");

    list.forEach((project) => {
      projectList.removeChild(project);
    });

    uProjects.listProjects().forEach((project) => {
      console.log(project.getProjectReference());
      const li = document.createElement("li");
      li.dataset.ref = project.getProjectReference();

      const pName = document.createElement("button");
      pName.classList.add("list");
      pName.textContent = project.getProjectName();

      const editProjectBtn = document.createElement("button");
      editProjectBtn.dataset.ref = project.getProjectReference();
      const editProjectImg = new Image(22, 22);
      editProjectImg.src = EditProject;
      editProjectImg.setAttribute("alt", "Edit Project Icon");
      editProjectBtn.classList.add("list");
      editProjectBtn.appendChild(editProjectImg);

      const delBtn = document.createElement("button");
      delBtn.dataset.ref = project.getProjectReference();
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
