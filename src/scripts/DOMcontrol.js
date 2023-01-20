import EditProject from "../images/editBook.svg";
import EditTask from "../images/edit.svg";
import Trash from "../images/trash.svg";

const DOMcontrol = (function() {
  const createTaskSection = function () {
    const section = document.createElement("section");
    const header = document.createElement("header");
    header.setAttribute("id", "taskHeader");
    section.appendChild(header);
  
    const title = document.createElement("h1");
    title.classList.add("taskHeader");
    title.textContent = "Tasks";
    header.appendChild(title);
  
    const addTasksBtn = document.createElement("button");
    addTasksBtn.setAttribute("id", "addTasks");
    addTasksBtn.classList.add("kit");
    addTasksBtn.textContent = "+";
    header.appendChild(addTasksBtn);
    section.appendChild(header);
    return { section, title, header, addTasksBtn };
  }

  const createProjectSummarySection = function () {
    const section = document.createElement("section");
    const title = document.createElement("h1");
    title.textContent = 'Projects';
    section.appendChild(title)
    return {section};
  }
  
  const removeSections = function (main) {
    const sections = main.querySelectorAll('section')
    sections.forEach(section => {
      main.removeChild(section);
    });
  }

  const createProjectForm = function () {
    const section = document.createElement("section");
    section.setAttribute("id", "form");

    const form = document.createElement("form");
    form.classList.add('form');
    
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
    firstInput.setAttribute("type", "text");
  
    const scndLabel = document.createElement("label");
    scndLabel.setAttribute("for", "scndInput");
  
    const scndInput = document.createElement("textarea");
    scndInput.setAttribute("id", "scndInput");

    const submitProjectBtn = document.createElement("button");
    submitProjectBtn.textContent = "Add Project";
    submitProjectBtn.classList.add("kit");
  
    formTitle.textContent = "Add Project";
    scndLabel.textContent = "Description:";
    firstLabel.textContent = "Project Name:";
    firstLabel.appendChild(firstInput);
    scndLabel.appendChild(scndInput);
    form.appendChild(formHeader);
    form.appendChild(firstLabel);
    form.appendChild(scndLabel);
    form.appendChild(submitProjectBtn);
    section.appendChild(form);

    return  { section, closeBtn, firstInput, scndInput, submitProjectBtn }
  }

  const createTaskForm = function () {
    const section = document.createElement("section");
    
    
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
    firstInput.setAttribute("type", "text");
  
    const scndLabel = document.createElement("label");
    scndLabel.setAttribute("for", "scndInput");
  
    const scndInput = document.createElement("textarea");
    scndInput.setAttribute("id", "scndInput");
  
    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Set due date:";
    dateLabel.setAttribute("for", "date");
  
    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "date");
  
    dateLabel.appendChild(dateInput);
  
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Set priority:";
    priorityLabel.setAttribute("for", "priority");
  
    const priorityInput = document.createElement("select");
    priorityInput.setAttribute("id", "priority");
  
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
  
    const submitProjectBtn = document.createElement("button");
    submitProjectBtn.textContent = "Add Project";
    submitProjectBtn.classList.add("kit");
  
    const submitTaskBtn = document.createElement("button");
    submitTaskBtn.textContent = "Add Task";
    submitTaskBtn.classList.add("kit");

    return section;
  }

  const removeForm = function(base) {
    if (!base.querySelector('section#form')) return
    const form = base.querySelector('section#form');
    base.removeChild(form);
  }

  function addCards(section, tasks) {
    tasks.listTasks().forEach((task) => {
      const card = createCards(task);
      section.appendChild(card);
    });
  }

  function createCards(item) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.ref = item.taskReference;
    card.classList.add(item.priority);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.dataset.btn = "checkbox";
    checkbox.dataset.ref = item.taskReference;
    card.appendChild(checkbox);

    const task = document.createElement("p");
    task.textContent = item.task;
    task.classList.add("task");
    task.dataset.ref = item.taskReference;
    card.appendChild(task);

    const date = document.createElement("time");
    date.textContent = item.date;
    date.dataset.ref = item.taskReference;
    date.classList.add("task");
    card.appendChild(date);

    const noteBtn = document.createElement("button");
    noteBtn.textContent = "⬍";
    noteBtn.dataset.btn = "notes";
    noteBtn.dataset.ref = item.taskReference;
    noteBtn.classList.add("cardBtn");
    card.appendChild(noteBtn);

    const editProjectBtn = document.createElement("button");
    const editProjectImg = new Image(22, 22);
    editProjectImg.src = EditProject;
    editProjectImg.setAttribute("alt", "Edit Project Icon");
    editProjectBtn.classList.add("cardBtn");
    editProjectBtn.appendChild(editProjectImg);
    editProjectBtn.dataset.ref = item.taskReference;
    card.appendChild(editProjectBtn);

    const delBtn = document.createElement("button");
    const delImg = new Image(22, 22);
    delImg.src = Trash;
    delImg.setAttribute("alt", "Trash Icon");
    delBtn.classList.add("cardBtn");
    delBtn.appendChild(delImg);
    delBtn.dataset.ref = item.taskReference;
    card.appendChild(delBtn);

    // bindBtnEvents(checkbox);
    // bindBtnEvents(noteBtn);

    return card;
  }

  const addProjectSummaryCards = function (section, projects) {
    projects.forEach((project) => {
      const card = createProjectSummaryCards(project);
      section.appendChild(card);
    })

  }

  const createProjectSummaryCards = function (project) {
    console.log(project);
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.ref = project.getProjectReference();

    const title = document.createElement('h3');
    title.textContent = project.getProjectName();
    card.appendChild(title);

    const description = document.createElement('p');
    description.textContent = project.getProjectDescription();
    card.appendChild(description);
    return card;
  }


  return { createTaskSection, removeSections, createProjectSummarySection, createProjectForm, createTaskForm, removeForm, addCards, addProjectSummaryCards }

}) ;

export default DOMcontrol