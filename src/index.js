import "./styles/style.css";
import { tasksModule, projectModule } from "./scripts/app";
import DOM from "./scripts/DOM";
import DOMcontrol from "./scripts/DOMcontrol";
import format from "date-fns/format";
import { compareAsc, parse } from "date-fns";

const uTasks = tasksModule();
const uProjects = projectModule();
const allProjects = uProjects.listProjects();

uTasks.addTasks("buy groceries", "28th-Jan.-2023", "Low", "local market");
uTasks.addTasks("buy soil", "20th-Jan.-2023", "Medium", "Loam soil is preferred");
uTasks.addTasks(
  "pay Bills",
  "20th-Jan.-2023",
  "High",
  "Electric Bill and Water Bill"
);

uProjects.createNewProject("To Do List", "Create a to do list");
uProjects.createNewProject("Test Project", "Test this projects");
allProjects[0].addTasks("test Task", "7th-Jan.-2023", "Low", "just testing on adding task")

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
    if (compareAsc(taskDate, dateToday) === 1) return task;
  }))
  return tasks
}

const getOverdueTasks = function () {
  const tasks = getAllTasks().filter((task => {
    const taskDate = parse(task.date, "do-MMM.-yyyy", new Date ())
    const dateToday = parse(getCurrentDate(), "do-MMM.-yyyy", new Date ())
    if (compareAsc(dateToday, taskDate) === -1) return task;
  }))
  return tasks
}

const sortToHigh = function(array) {
  const highToLow = array.sort((task1, task2) => {
    let priority = 0;
    
    switch (true) {
      case (task1.priority === 'High' && task2.priority === 'High'):
        priority = 0;
        break;
      case (task1.priority === 'High' && task2.priority === 'Medium'):
        priority = -1;
        break;
      case (task1.priority === 'High' && task2.priority === 'Low'):
        priority = -2;
        break;
      case (task1.priority === 'Medium' && task2.priority === 'High'):
        priority = 1
        break;
      case (task1.priority === 'Medium' && task2.priority === 'Low'):
        priority = -1;
        break;
      case (task1.priority === 'Low' && task2.priority === 'High'):
        priority = 2;
        break;
      case (task1.priority === 'Low' && task2.priority === 'Medium'):
        priority = 1;
        break;
      case (task1.priority === 'Low' && task2.priority === 'Low'):
        priority = 0;
        break;
      default:
        priority = 0
    }
    return priority;
  })
  return highToLow
}

const reverseSort = function (array) {
  const reversedArray = array.reverse();
  return reversedArray;
};


console.log(sortToHigh(getAllTasks()));
console.log(reverseSort(sortToHigh(getAllTasks())))

console.log(getAllTasks());
// console.log(getTasksToday());
// console.log(getUpcomingTasks())
// console.log(getOverdueTasks());


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
  bindEvents(mainDOM.btnComing);
};

let form;
let taskSection;
let projectSection;

taskSection = controlDOM.createTaskSection();
projectSection = controlDOM.createProjectSummarySection();
mainDOM.main.appendChild(taskSection.section);
mainDOM.main.appendChild(projectSection.section);
controlDOM.addCards(taskSection.section, getAllTasks());
controlDOM.addProjectSummaryCards(
  projectSection.section,
  uProjects.listProjects()
);

const removeForm = function (e) {
  e.stopPropagation();
  controlDOM.removeForm(mainDOM.base);
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
    case mainDOM.btnComing:
      mainDOM.btnComing.addEventListener('click', displayContent);
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

const displayContent = function (e) {
  e.stopPropagation();
  console.log(this);
  switch (this) {
    case mainDOM.btnToday:
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      taskSection.title.textContent = 'Todays tasks:'
      mainDOM.main.appendChild(taskSection.section);
      controlDOM.addCards(taskSection.section, getTasksToday());
      break;
    case mainDOM.btnComing:
      console.log('activated')
      controlDOM.removeSections(mainDOM.main);
      taskSection = controlDOM.createTaskSection();
      taskSection.title.textContent = 'Upcoming tasks:'
      mainDOM.main.appendChild(taskSection.section);
      controlDOM.addCards(taskSection.section, getUpcomingTasks());
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
      controlDOM.addCards(taskSection.section, getAllTasks());
      controlDOM.addProjectSummaryCards(
        projectSection.section,
        allProjects
      );
  }
};



window.addEventListener("load", bindInitialBtn);
