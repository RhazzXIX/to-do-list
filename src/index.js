import "./styles/style.css";
import { tasksModule, projectModule } from "./scripts/app";
import DOM from "./scripts/DOM";
import DOMcontrol from "./scripts/DOMcontrol";
import format from "date-fns/format";
import { compareAsc, parse } from "date-fns";

const uTasks = tasksModule();
const uProjects = projectModule();
const allProjects = uProjects.listProjects();
console.log(allProjects);

const getCurrentDate = function () {
  const dateToday = format(new Date(), "do-MMM.-yyyy");
  return dateToday;
};

const getAllTasks = function () {
  const tasks = [];
  uTasks.listTasks().forEach((task) => {
    tasks.push(task);
  });

  allProjects.forEach((project) => {
    project.listTasks().forEach((task) => {
      tasks.push(task);
    });
  });
  return tasks;
};

const getTasksToday = function () {
  const tasks = getAllTasks().filter((task) => task.date === getCurrentDate());
  return tasks;
};

const getUpcomingTasks = function () {
  const tasks = getAllTasks().filter((task) => {
    const taskDate = parse(task.date, "do-MMM.-yyyy", new Date());
    const dateToday = parse(getCurrentDate(), "do-MMM.-yyyy", new Date());
    if (compareAsc(taskDate, dateToday) === 1) return task;
  });
  return tasks;
};

const getOverdueTasks = function () {
  const tasks = getAllTasks().filter((task) => {
    const taskDate = parse(task.date, "do-MMM.-yyyy", new Date());
    const dateToday = parse(getCurrentDate(), "do-MMM.-yyyy", new Date());
    if (compareAsc(dateToday, taskDate) === -1) return task;
  });
  return tasks;
};

const sortToHigh = function (array) {
  const highToLow = array.sort((task1, task2) => {
    let priority = 0;
    switch (true) {
      case task1.priority === "High" && task2.priority === "High":
        priority = 0;
        break;
      case task1.priority === "High" && task2.priority === "Medium":
        priority = -1;
        break;
      case task1.priority === "High" && task2.priority === "Low":
        priority = -2;
        break;
      case task1.priority === "Medium" && task2.priority === "High":
        priority = 1;
        break;
      case task1.priority === "Medium" && task2.priority === "Low":
        priority = -1;
        break;
      case task1.priority === "Low" && task2.priority === "High":
        priority = 2;
        break;
      case task1.priority === "Low" && task2.priority === "Medium":
        priority = 1;
        break;
      case task1.priority === "Low" && task2.priority === "Low":
        priority = 0;
        break;
      default:
        priority = 0;
    }
    return priority;
  });
  return highToLow;
};

const reverseSort = function (array) {
  const reversedArray = array.reverse();
  return reversedArray;
};

const controlDOM = DOMcontrol();

const mainDOM = DOM();

let form;
let taskSection;
let projectSection;

const removeForm = function (e) {
  e.stopPropagation();
  if (e.type === "mousedown") {
    if (e.target !== form.section) return;
  }
  controlDOM.removeForm(mainDOM.base);
};

const checkForm = function (event) {
  event.stopPropagation();
  if (!form.firstInput.value) return;
  event.preventDefault();
  switch (true) {
    case this === form.submitProjectBtn:
      uProjects.createNewProject(form.firstInput.value, form.scndInput.value);
      controlDOM.updateProjectList(mainDOM.projectList, allProjects);
      break;
    default:
      let date;
      if (!form.dateInput.value) {
        date = format(new Date(), "do-MMM.-yyyy");
      } else {
        date = format(new Date(form.dateInput.value), "do-MMM.-yyyy");
      }
      console.log(form.repository.value);
      switch(form.repository.value) {
        case "Usual Task":
          uTasks.addTasks(
            form.firstInput.value,
            form.dateInput.value,
            form.priorityInput.value,
            form.scndInput.value
          );
          break;
        default:
          allProjects.forEach((project) => {
            if (form.repository.value === project.getProjectName()) {
              project.addTasks(
                form.firstInput.value,
                form.dateInput.value,
                form.priorityInput.value,
                form.scndInput.value
              );
            }
          })
      }
      controlDOM.updateTasksList(taskSection.section, getAllTasks());
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
  }
  removeForm(event);
};

const bindEvents = function (element) {
  switch (element) {
    case form.submitTaskBtn:
      form.submitTaskBtn.addEventListener("click", checkForm);
      break;
    case form.closeBtn:
      form.closeBtn.addEventListener("click", removeForm);
      break;
    case form.section:
      form.section.addEventListener("mousedown", removeForm);
      break;
    case form.submitProjectBtn:
      form.submitProjectBtn.addEventListener("click", checkForm);
      break;
    default:
      element.addEventListener("click", displayContent);
  }
};

const displayContent = function (e) {
  e.stopPropagation();
  switch (this) {
    case mainDOM.btnToday:
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      taskSection.title.textContent = "Todays tasks:";
      mainDOM.main.appendChild(taskSection.section);
      controlDOM.updateTasksList(taskSection.section, getTasksToday());
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
      break;
    case mainDOM.btnComing:
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      taskSection.title.textContent = "Upcoming tasks:";
      mainDOM.main.appendChild(taskSection.section);
      controlDOM.updateTasksList(taskSection.section, getUpcomingTasks());
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
      break;
    case mainDOM.addProject:
      controlDOM.removeForm(mainDOM.main);
      form = controlDOM.createProjectForm();
      bindEvents(form.closeBtn);
      bindEvents(form.submitProjectBtn);
      bindEvents(form.section);
      mainDOM.base.appendChild(form.section);
      break;
    case mainDOM.btnProject:
      controlDOM.removeSections(mainDOM.main);
      projectSection = controlDOM.createProjectSummarySection();
      mainDOM.main.appendChild(projectSection.section);
      controlDOM.addProjectSummaryCards(projectSection.section, allProjects);
      break;
    case taskSection.addTasksBtn:
      controlDOM.removeForm(mainDOM.main);
      form = controlDOM.createTaskForm(allProjects);
      bindEvents(form.closeBtn);
      bindEvents(form.submitTaskBtn);
      bindEvents(form.section);
      mainDOM.base.appendChild(form.section);
      break;
    default:
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      projectSection = controlDOM.createProjectSummarySection();
      bindEvents(taskSection.addTasksBtn);
      mainDOM.main.appendChild(taskSection.section);
      mainDOM.main.appendChild(projectSection.section);
      controlDOM.updateTasksList(taskSection.section, getAllTasks());
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
      controlDOM.addProjectSummaryCards(projectSection.section, allProjects);
  }
};

const bindInitialBtn = function (e) {
  e.stopPropagation();
  bindEvents(mainDOM.btnBoard);
  bindEvents(mainDOM.btnToday);
  bindEvents(mainDOM.addProject);
  bindEvents(mainDOM.btnComing);
  bindEvents(mainDOM.btnProject);
};

uTasks.addTasks("buy groceries", "2023/01/28", "Low", "local market");
uTasks.addTasks(
  "buy soil",
  parse(getCurrentDate(), "do-MMM.-yyyy", new Date()),
  "Medium",
  "Loam soil is preferred"
);
uTasks.addTasks(
  "pay Bills",
  "2023/01/21",
  "High",
  "Electric Bill and Water Bill"
);

uProjects.createNewProject("To Do List", "Create a to do list");
uProjects.createNewProject("Test Project", "Test this projects");
allProjects[0].addTasks(
  "test Task",
  parse(getCurrentDate(), "do-MMM.-yyyy", new Date()),
  "Low",
  "just testing on adding task"
);

taskSection = controlDOM.createTaskSection();
projectSection = controlDOM.createProjectSummarySection();
form = controlDOM.createProjectForm();
bindEvents(taskSection.addTasksBtn);
mainDOM.main.appendChild(taskSection.section);
mainDOM.main.appendChild(projectSection.section);
controlDOM.updateTasksList(taskSection.section, getAllTasks());
controlDOM.applyUtilityBtnEvents(taskSection.section, uTasks, allProjects);
controlDOM.addProjectSummaryCards(
  projectSection.section,
  uProjects.listProjects()
);


controlDOM.updateProjectList(mainDOM.projectList, allProjects);
window.addEventListener("load", bindInitialBtn);
