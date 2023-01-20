import "./styles/style.css";
import { tasksModule, projectModule } from "./scripts/app";
import DOM from "./scripts/DOM";
import DOMcontrol from "./scripts/DOMcontrol";
import format from "date-fns/format";
import { compareAsc, parse } from "date-fns";

const uTasks = tasksModule();
const uProjects = projectModule();
const allProjects = uProjects.listProjects();

uTasks.addTasks("buy groceries", "20th-Jan.-2023", "Low", "local market");
uTasks.addTasks("buy soil", "20th-Jan.-2023", "Medium", "Loam soil is preferred");
uTasks.addTasks(
  "pay Bills",
  "20th-Jan.-2023",
  "High",
  "Electric Bill and Water Bill"
);

uProjects.createNewProject("To Do List", "Create a to do list");
uProjects.createNewProject("Test Project", "Test this projects");
allProjects[0].addTasks("test Task", "28th-Jan.-2023", "Low", "just testing on adding task")

const getCurrentDate = function () {
  const dateToday = format(new Date(), 'do-MMM.-yyyy');
  return dateToday;
}

const getAllTasks = function () {
  const tasks = [];
  uTasks.listTasks().forEach((task) => {
    tasks.push(task);
  })
  // console.log(uProjects);
  // console.log(uProjects.listProjects())
  allProjects.forEach((project) => {
    project.listTasks().forEach((task) => {
      tasks.push(task);
    })
  })
  return tasks;
}

const getTasksToday = function () {
  const tasks = getAllTasks().filter((task) =>  task.date === getCurrentDate());
  return tasks;
}

const getUpcomingTasks = function () {
  const tasks = getAllTasks().filter((task => {
    const taskDate = parse(task.date, "do-MMM.-yyyy", new Date ())
    const dateToday = parse(getCurrentDate(), "do-MMM.-yyyy", new Date ())
    return compareAsc(taskDate, dateToday);
  }))
  return tasks
}

console.log(getAllTasks());
console.log(getTasksToday());
console.log(getUpcomingTasks())



const controlDOM = DOMcontrol();
console.log(controlDOM);

const mainDOM = DOM();

console.log(mainDOM);

const bindInitialBtn = function (e) {
  e.stopPropagation();
  console.log(e);
  bindEvents(mainDOM.btnBoard);
  bindEvents(mainDOM.btnToday);
  bindEvents(mainDOM.addProject);
};

let form;
let taskSection;
let projectSection;
taskSection = controlDOM.createTaskSection();
projectSection = controlDOM.createProjectSummarySection();
mainDOM.main.appendChild(taskSection.section);
mainDOM.main.appendChild(projectSection.section);
controlDOM.addCards(taskSection.section, uTasks);
controlDOM.addProjectSummaryCards(
  projectSection.section,
  uProjects.listProjects()
);

const removeForm = function (e) {
  e.stopPropagation();
  controlDOM.removeForm(mainDOM.base);
};

const displayContent = function (e) {
  e.stopPropagation();
  console.log(this);
  switch (this) {
    case mainDOM.btnToday:
      console.log("activated");
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      taskSection.title.textContent = 'Todays tasks:'
      mainDOM.main.appendChild(taskSection.section);
      break;
    case mainDOM.addProject:
      controlDOM.removeForm(mainDOM.main);
      form = controlDOM.createProjectForm();
      bindEvents(form.closeBtn);
      bindEvents(form.submitProjectBtn);
      bindEvents(form.section);
      mainDOM.base.appendChild(form.section);
      break;
    default:
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      projectSection = controlDOM.createProjectSummarySection();
      mainDOM.main.appendChild(taskSection.section);
      mainDOM.main.appendChild(projectSection.section);
      controlDOM.addCards(taskSection.section, uTasks);
      controlDOM.addProjectSummaryCards(
        projectSection.section,
        uProjects.listProjects()
      );
  }
};

const bindEvents = function (element) {
  switch (element) {
    case mainDOM.btnBoard:
      mainDOM.btnBoard.addEventListener("click", displayContent);
      break;
    case mainDOM.btnToday:
      mainDOM.btnToday.addEventListener("click", displayContent);
      break;
    case mainDOM.addProject:
      mainDOM.addProject.addEventListener("click", displayContent);
      break;
    case form.closeBtn:
      form.closeBtn.addEventListener("click", removeForm);
      break;
    // case form.submitProjectBtn:
    //   form.submitProjectBtn.addEventListener ()
    default:
      element.addEventListener("click", (e) => console.log(btn));
      console.log(element);
  }
};

window.addEventListener("load", bindInitialBtn);
