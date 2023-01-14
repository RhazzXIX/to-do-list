import "./styles/style.css";
import DOM from "./scripts/dom";
import Today from "./scripts/content";
import tasksModule from "./scripts/tasks";
import projectModule from "./scripts/project";
import Trash from "./images/trash.svg";
import EditProject from "./images/editBook.svg";
import EditTask from "./images/edit.svg";


const  partsDOM = DOM;


const uTasks = tasksModule();
// console.log(uTasks);
const uProjects = projectModule();
// console.log(uProjects);

uProjects.listProjects()[0].addTasks("buy soil", "afternoon");
uProjects.listProjects()[1].addTasks();
// console.log(uProjects.listProjects()[0].getProjectName());
// console.log(uProjects.listProjects());
// uProjects.listProjects().forEach((item) => console.log(item.listTasks()));
uTasks.addTasks("buy groceries", "today", 1);
uTasks.addTasks("drop shopee", "today", 2);
uTasks.addTasks("pay bills", "today", 1);
// console.log(uTasks.listTasks());

const bindBtnEvents = function (button) {
  console.log(button === partsDOM.addProject);
}

const listProject = function () {
  uProjects.listProjects().forEach((project) => {
    const li = document.createElement("li");
    
    const pName = document.createElement("button");
    pName.textContent = project.getProjectName();
    
    const editProjectBtn = document.createElement("button");
    const editProjectImg = new Image(22, 22);
    editProjectImg.src = EditProject;
    editProjectImg.setAttribute('alt', 'Edit Project Icon');
    editProjectBtn.appendChild(editProjectImg);
    
    const delBtn = document.createElement("button");
    const delImg = new Image(22, 22);
    delImg.src = Trash;
    delImg.setAttribute("alt", "Trash Icon");
    delBtn.appendChild(delImg);
    
    li.appendChild(pName);
    li.appendChild(editProjectBtn)
    li.appendChild(delBtn)
    DOM.projectList.appendChild(li);
  });
};

bindBtnEvents(partsDOM.addProject);

listProject();
