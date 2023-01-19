const taskSection = function (tasks, projects) {
  const section = document.createElement("section");
  const header = document.createElement("header");
  header.setAttribute("id", "taskHeader");
  section.appendChild(header);

  const title = document.createElement("h1");
  title.classList.add("taskHeader");
  title.textContent = "Today's Tasks";
  header.appendChild(title);

  const addTasksBtn = document.createElement("button");
  addTasksBtn.setAttribute("id", "addTasks");
  addTasksBtn.classList.add("kit");
  addTasksBtn.textContent = "+";
//   header.appendChild(addTasksBtn);

  section.appendChild(header);

  return { section, title, header, addTasksBtn };
};

export default taskSection;
