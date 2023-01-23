import "./styles/style.css";
import { tasksModule, projectModule } from "./scripts/app";
import DOM from "./scripts/DOM";
import DOMcontrol from "./scripts/DOMcontrol";
import format from "date-fns/format";
import { compareAsc, parse } from "date-fns";

const uTasks = tasksModule();
const uProjects = projectModule();
const allProjects = uProjects.listProjects();
let appropriateTask;
const projectBtns = []

const getCurrentDate = function () {
  const dateToday = format(new Date(), "do-MMM.-yyyy");
  return dateToday;
};

const getProjectTask = function (button) {
  const reference = button.textContent;
  let tasks
  allProjects.forEach((project => {
    if (project.getProjectName() === reference){
      tasks = project.listTasks()
    }
  }))
  return tasks;
}

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

// const activateBtns = function (project, list) {
//   const reference = project.getProjectReference();
//   const item = document.querySelector(`li[data-ref=${reference}`)
//   let projectButton
//   const buttons = item.querySelectorAll('button');
//   buttons.forEach((button => {
//     if (button.textContent === project.getProjectName()) ProjectButton = button;
//   }))
//   ProjectButton.addEventListener('click')
// }

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
      controlDOM.updateProjectList(mainDOM.projectList, allProjects, projectBtns);
      controlDOM.addProjectSummaryCards(projectSection.section, allProjects);
      activateProjectBtns(projectBtns);
      break;
    default:
      let date;
      if (!form.dateInput.value) {
        date = format(new Date(), "do-MMM.-yyyy");
      } else {
        date = format(new Date(form.dateInput.value), "do-MMM.-yyyy");
      }
      
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
      
  }
  removeForm(event);
};

function deleteProject(e) {
  const reference = e.target.dataset.ref
  const item = mainDOM.projectList.querySelector(`li[data-ref = ${reference}`);
  uProjects.deleteProject(reference);
  controlDOM.updateProjectList(mainDOM.projectList, allProjects, projectBtns);
  activateProjectBtns(projectBtns);
}

const bindEvents = function (element) {
  
  switch (true) {
    case (element === form.submitTaskBtn):
      form.submitTaskBtn.addEventListener("click", checkForm);
      form.submitTaskBtn.addEventListener("click", displayContent);
      break;
    case (element === form.closeBtn):
      form.closeBtn.addEventListener("click", removeForm);
      break;
    case (element === form.section):
      form.section.addEventListener("mousedown", removeForm);
      break;
    case (element === form.submitProjectBtn):
      form.submitProjectBtn.addEventListener("click", checkForm);
      form.submitProjectBtn.addEventListener("click", displayContent);
      break;
    case (element.dataset.btn === 'del'):
      element.addEventListener('click', deleteProject);
      element.addEventListener('click', displayContent);
      break;
    default:
      element.addEventListener("click", displayContent);
  }
};

const displayContent = function (e) {
  e.stopPropagation();
  
  switch (true) {
    case (this === mainDOM.btnToday):
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      taskSection.title.textContent = "Todays tasks:";
      mainDOM.main.appendChild(taskSection.section);
      appropriateTask = getTasksToday();
      controlDOM.updateTaskList(taskSection.section, appropriateTask);
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
      console.log(getAllTasks());
      break;
    case (this === mainDOM.btnComing):
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      taskSection.title.textContent = "Upcoming tasks:";
      mainDOM.main.appendChild(taskSection.section);
      appropriateTask = getUpcomingTasks();
      controlDOM.updateTaskList(taskSection.section, appropriateTask);
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
      break;
    case (this === mainDOM.addProject):
      controlDOM.removeForm(mainDOM.main);
      form = controlDOM.createProjectForm();
      bindEvents(form.closeBtn);
      bindEvents(form.submitProjectBtn);
      bindEvents(form.section);
      mainDOM.base.appendChild(form.section);
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      projectSection = controlDOM.createProjectSummarySection();
      mainDOM.main.appendChild(taskSection.section);
      mainDOM.main.appendChild(projectSection.section);
      appropriateTask = getAllTasks();
      controlDOM.updateTaskList(taskSection.section, appropriateTask);
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
      controlDOM.addProjectSummaryCards(projectSection.section, allProjects);
      break;
    case (this === mainDOM.btnProject):
      controlDOM.removeSections(mainDOM.main);
      projectSection = controlDOM.createProjectSummarySection();
      projectSection.section.classList.add('wide')
      mainDOM.main.appendChild(projectSection.section);
      controlDOM.addProjectSummaryCards(projectSection.section, allProjects);
      break;
    case (this === mainDOM.addTasksBtn):
      controlDOM.removeForm(mainDOM.main);
      form = controlDOM.createTaskForm(allProjects);
      bindEvents(form.closeBtn);
      bindEvents(form.submitTaskBtn);
      bindEvents(form.section);
      mainDOM.base.appendChild(form.section);
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      projectSection = controlDOM.createProjectSummarySection();
      mainDOM.main.appendChild(taskSection.section);
      mainDOM.main.appendChild(projectSection.section);
      appropriateTask = getAllTasks();
      controlDOM.updateTaskList(taskSection.section, appropriateTask);
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
      controlDOM.addProjectSummaryCards(projectSection.section, allProjects);
      break;
    case (this.dataset.btn === "project"):
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();      
      mainDOM.main.appendChild(taskSection.section);
      appropriateTask = getProjectTask(this);
      controlDOM.updateTaskList(taskSection.section, appropriateTask);
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
      break;
    default:
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      projectSection = controlDOM.createProjectSummarySection();
      mainDOM.main.appendChild(taskSection.section);
      mainDOM.main.appendChild(projectSection.section);
      appropriateTask = getAllTasks();
      controlDOM.updateTaskList(taskSection.section, appropriateTask);
      controlDOM.applyUtilityBtnEvents(
        taskSection.section,
        uTasks,
        allProjects
      );
      controlDOM.addProjectSummaryCards(projectSection.section, allProjects);
  }
};

const activateProjectBtns = function (list) {
  list.forEach((item) => {
    const projectButton = item.querySelector('button[data-btn=project]');
    bindEvents(projectButton);
  })
  list.forEach((item) => {
    const deleteBtn = item.querySelector("img[data-btn = del]");
    bindEvents(deleteBtn);
  })
}

const bindInitialBtn = function (e) {
  e.stopPropagation();
  bindEvents(mainDOM.btnBoard);
  bindEvents(mainDOM.btnToday);
  bindEvents(mainDOM.addProject);
  bindEvents(mainDOM.btnComing);
  bindEvents(mainDOM.btnProject);
  bindEvents(mainDOM.addTasksBtn)
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

mainDOM.main.appendChild(taskSection.section);
mainDOM.main.appendChild(projectSection.section);
controlDOM.updateTaskList(taskSection.section, getAllTasks());
controlDOM.applyUtilityBtnEvents(taskSection.section, uTasks, allProjects);
controlDOM.addProjectSummaryCards(
  projectSection.section,
  uProjects.listProjects()
);


controlDOM.updateProjectList(mainDOM.projectList, allProjects, projectBtns);
activateProjectBtns(projectBtns);
window.addEventListener("load", bindInitialBtn);
