import EditProject from "../images/editBook.svg";
import EditTask from "../images/edit.svg";
import Trash from "../images/trash.svg";

const DOMcontrol = function () {
  const createTaskSection = function () {
    const section = document.createElement("section");

    const title = document.createElement("h1");
    title.classList.add("taskHeader");
    title.textContent = "Tasks";
    section.appendChild(title);

    section.appendChild(title);
    return { section, title };
  };

  const createProjectSummarySection = function () {
    const section = document.createElement("section");
    section.setAttribute("id", "project");
    const title = document.createElement("h1");
    title.textContent = "Projects";
    section.appendChild(title);
    return { section };
  };

  const removeSections = function (main) {
    const sections = main.querySelectorAll("section");
    sections.forEach((section) => {
      main.removeChild(section);
    });
  };

  const createProjectForm = function () {
    const section = document.createElement("section");
    section.setAttribute("id", "form");

    const form = document.createElement("form");
    form.classList.add("form");

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
    firstLabel.textContent = "Project Name:";
    scndLabel.textContent = "Description:";
    firstLabel.appendChild(firstInput);
    scndLabel.appendChild(scndInput);
    form.appendChild(formHeader);
    form.appendChild(firstLabel);
    form.appendChild(scndLabel);
    form.appendChild(submitProjectBtn);
    section.appendChild(form);

    return { section, closeBtn, firstInput, scndInput, submitProjectBtn };
  };

  const createTaskForm = function (projects) {
    const section = document.createElement("section");
    section.setAttribute("id", "form");

    const form = document.createElement("form");
    form.classList.add("form");

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

    const repositoryLabel = document.createElement("label");

    const repository = document.createElement("select");

    const optionCount = 0 + projects.length;
    for (let i = 0; i <= optionCount; i += 1) {
      const option = document.createElement("option");
      switch (true) {
        case i === optionCount:
          option.textContent = "Usual Task";
          option.setAttribute("selected", "");
          break;
        default:
          option.textContent = projects[i].getProjectName();
      }
      repository.appendChild(option);
    }
    const submitTaskBtn = document.createElement("button");
    submitTaskBtn.textContent = "Add Task";
    submitTaskBtn.classList.add("kit");

    formTitle.textContent = "Add Tasks:";
    firstLabel.textContent = "Task:";
    firstLabel.appendChild(firstInput);
    dateLabel.textContent = "Due date:";
    dateLabel.appendChild(dateInput);
    priorityLabel.textContent = "Priority:";
    priorityLabel.appendChild(priorityInput);
    scndLabel.textContent = "Notes";
    scndLabel.appendChild(scndInput);
    repositoryLabel.textContent = "List in:";
    repositoryLabel.appendChild(repository);
    form.appendChild(formHeader);
    form.appendChild(firstLabel);
    form.appendChild(dateLabel);
    form.appendChild(priorityLabel);
    form.appendChild(scndLabel);
    form.appendChild(repositoryLabel);
    form.appendChild(submitTaskBtn);
    section.appendChild(form);
    return {
      section,
      closeBtn,
      firstInput,
      dateInput,
      priorityInput,
      scndInput,
      repository,
      submitTaskBtn,
    };
  };

  const removeForm = function (base) {
    if (!base.querySelector("section#form")) return;
    const form = base.querySelector("section#form");
    base.removeChild(form);
  };

  const createCards = function (item) {
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
    delImg.dataset.ref = item.taskReference;
    delImg.dataset.btn = "del";
    card.appendChild(delBtn);

    if (item.completed) {
      checkbox.checked = true;
      task.classList.add("crossout");
      date.classList.add("crossout");
      card.classList.add("crossout");
    } else {
      task.classList.remove("crossout");
      date.classList.remove("crossout");
      card.classList.remove("crossout");
    }

    return card;
  };

  const addCards = function (section, tasks) {
    tasks.forEach((task) => {
      const card = createCards(task);
      section.appendChild(card);
    });
  };

  const createProjectSummaryCards = function (project) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("project");
    card.dataset.ref = project.getProjectReference();

    const title = document.createElement("h3");
    title.textContent = project.getProjectName();
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = project.getProjectDescription();
    card.appendChild(description);
    return card;
  };

  const addProjectSummaryCards = function (section, projects) {
    projects.forEach((project) => {
      const card = createProjectSummaryCards(project);
      section.appendChild(card);
    });
  };

  const updateTaskList = function (taskSection, tasks) {
    const cards = taskSection.querySelectorAll("div.card");
    cards.forEach((card) => taskSection.removeChild(card));
    addCards(taskSection, tasks);
  };

  const updateProjectList = function (projectList, projects, buttonArray) {
    const list = projectList.querySelectorAll("li");
    buttonArray.splice(0, buttonArray.length);

    list.forEach((project) => {
      projectList.removeChild(project);
    });

    projects.forEach((project) => {
      let taskSecion = createTaskSection();
      const li = document.createElement("li");
      li.dataset.ref = project.getProjectReference();

      const projectName = document.createElement("button");
      projectName.classList.add("list");
      projectName.textContent = project.getProjectName();
      projectName.dataset.btn = "project";

      const editProjectBtn = document.createElement("button");
      editProjectBtn.dataset.ref = project.getProjectReference();
      const editProjectImg = new Image(22, 22);
      editProjectImg.src = EditProject;
      editProjectImg.setAttribute("alt", "Edit Project Icon");
      editProjectBtn.classList.add("list");
      editProjectBtn.appendChild(editProjectImg);

      const delBtn = document.createElement("button");
      const delImg = new Image(22, 22);
      delImg.dataset.ref = project.getProjectReference();
      delImg.src = Trash;
      delImg.dataset.btn = "del";
      delImg.setAttribute("alt", "Trash Icon");
      delBtn.classList.add("list");
      delBtn.appendChild(delImg);

      li.appendChild(projectName);
      li.appendChild(editProjectBtn);
      li.appendChild(delBtn);
      buttonArray.push(li);
      projectList.appendChild(li);
    });
  };

  const findTaskThroughReference = function (reference, tasks, projects) {
    let task;
    if (tasks.listTasks().length) {
      tasks.listTasks().forEach((item) => {
        if (item.taskReference === reference) task = item;
      });
    }
    if (projects.length) {
      projects.forEach((project) => {
        project.listTasks().forEach((item) => {
          if (item.taskReference === reference) task = item;
        });
      });
    }
    return task;
  };

  const crossOut = function (tasks, projects) {
    const allTasks = [];
    let card;
    const reference = event.target.dataset.ref;
    const divs = this.querySelectorAll("div.card");
    divs.forEach((div) => {
      if (div.dataset.ref === reference) card = div;
    });
    const taskText = card.querySelector("p.task");
    const taskDate = card.querySelector("time.task");
    tasks.listTasks().forEach((task) => {
      allTasks.push(task);
    });
    projects.forEach((project) => {
      project.listTasks().forEach((task) => {
        allTasks.push(task);
      });
    });
    const task = findTaskThroughReference(reference, tasks, projects);
    task.toggleStatus();
    if (task.completed) {
      card.classList.add("crossout");
      taskText.classList.add("crossout");
      taskDate.classList.add("crossout");
    } else {
      card.classList.remove("crossout");
      taskText.classList.remove("crossout");
      taskDate.classList.remove("crossout");
    }
  };

  const addNotes = function (tasks, projects) {
    event.stopPropagation();
    let card;
    const reference = event.target.dataset.ref;
    const divs = this.querySelectorAll("div.card");
    divs.forEach((div) => {
      if (div.dataset.ref === reference) card = div;
    });
    const task = findTaskThroughReference(reference, tasks, projects);
    const notes = document.createElement("p");
    const notesContainer = document.createElement("div");
    notesContainer.appendChild(notes);
    notesContainer.classList.add("notes");
    notes.textContent = task.note;
    if (!card.querySelector("div.notes")) {
      card.appendChild(notesContainer);
    } else {
      const notesRemove = card.querySelector("div.notes");
      card.removeChild(notesRemove);
    }
  };

  const applyNotesEvent = function (section, tasks, projects) {
    const noteBtns = section.querySelectorAll("button[data-btn=notes]");
    noteBtns.forEach((button) => {
      button.addEventListener("click", addNotes.bind(section, tasks, projects));
    });
  };

  const applyCompletedEvent = function (section, tasks, projects) {
    const checkboxes = section.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener(
        "click",
        crossOut.bind(section, tasks, projects)
      );
    });
  };

  function deleteTasks(reference, tasks, projects) {
    if (tasks.listTasks().length) tasks.deleteTasks(reference);

    if (projects.length) {
      projects.forEach((project) => {
        project.deleteTasks(reference);
      });
    }
  }

  function deleteCard(tasks, projects) {
    event.stopPropagation();
    let card;
    console.log(this);
    const reference = event.target.dataset.ref;
    deleteTasks(reference, tasks, projects);
    const divs = this.querySelectorAll("div.card");
    divs.forEach((div) => {
      if (div.dataset.ref === reference) card = div;
    });
    this.removeChild(card);
  }

  function applyDeleteEvent(section, tasks, projects) {
    const deleteBtns = section.querySelectorAll("img[data-btn = del]");
    deleteBtns.forEach((button) => {
      button.addEventListener(
        "click",
        deleteCard.bind(section, tasks, projects)
      );
    });
  }

  const applyUtilityBtnEvents = function (section, tasks, projects) {
    applyNotesEvent(section, tasks, projects);
    applyCompletedEvent(section, tasks, projects);
    applyDeleteEvent(section, tasks, projects);
  };

  return {
    createTaskSection,
    removeSections,
    createProjectSummarySection,
    createProjectForm,
    createTaskForm,
    removeForm,
    addProjectSummaryCards,
    updateProjectList,
    updateTaskList,
    applyUtilityBtnEvents,
  };
};

export default DOMcontrol;
