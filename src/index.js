import "./styles/style.css";
import { tasksModule, projectModule } from "./scripts/app";
import DOM from "./scripts/DOM";
import taskSection from "./scripts/taskSection";
import ProjectSummarySection from "./scripts/projectSummarySection";

const mainDOM = DOM();

const uTasks = tasksModule();
const uProjects = projectModule();
uTasks.addTasks("buy groceries", "01-25-2023", "Low", "local market");
uTasks.addTasks("buy soil", "01-25-2023", "Medium", "Loam soil is preferred");
uTasks.addTasks(
  "pay Bills",
  "01-18-2023",
  "High",
  "Electric Bill and Water Bill"
);

const mainTask = taskSection();

const mainProjectSummary = ProjectSummarySection();

uProjects.createNewProject("To Do List", "");

uProjects.listProjects()[0].addTasks("buy soil", "01-25-2023", "low", "");
// uProjects.listProjects()[1].addTasks();
// console.log(uProjects.listProjects()[0].getProjectName());
// console.log(uProjects.listProjects());
// uProjects.listProjects().forEach((item) => console.log(item.listTasks()));
// uTasks.addTasks("drop shopee", "today", 2);
// uTasks.addTasks("pay bills", "today", 1);
console.log(uTasks.listTasks());

console.log(mainDOM);

const bindBtnEvents = (function () {
  mainDOM.btnBoard.addEventListener('click', displayContent);
  mainDOM.btnToday.addEventListener('click', displayContent);
}) ();

function displayContent(e) {
  e.stopPropagation();
  console.log(this);
  switch (e.target) {
    case (mainDOM.btnToday):

    default:
      mainDOM.main.appendChild(mainTask.section);
      mainDOM.main.appendChild(mainProjectSummary.section);
  }

}
