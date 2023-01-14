const tasksModule = (function () {
  const CreateTaskList = function () {
    const tasks = [];

    const Task = function () {
      const getPriority = function () {
        console.log(this.priority);
      };
      const returnTask = function () {
        return this;
      };
      return { getPriority, returnTask };
    };

    const NewTask = function (task, date, level) {
      const duty = Object.create(Task());
      let priority = level;
      if (priority === undefined) priority = 4;
      return Object.assign(duty, { task, date, priority });
    };

    const addTasks = function (task, date, priority) {
      const newTask = NewTask(task, date, priority);
      tasks.push(newTask);
    };

    const deleteTasks = function (task) {
      const index = tasks.findIndex((list) => list.task === task);
      tasks.splice(index, 1);
    };

    const listTasks = function () {
      const tasksList = tasks.map((list) => list);
      return tasksList;
    };

    const editTasks = function (duty) {
      const taskEdit = tasks.filter((item) => item.duty === duty);
    };

    return Object.assign({}, { addTasks, deleteTasks, listTasks });
  };

  const newTask = CreateTaskList();

  return CreateTaskList;
})();

console.log(tasksModule())

const projectModule = (function () {
  const CreateProject = function () {
    const projectList = [];

    const NewProject = function (name, description) {
      let projectName = name;
      let projectDescription = description;
      const getProjectName = () => projectName;
      const changeProjectName = function ( newName) { projectName = newName};
      const project = Object.assign(Object.create(tasksModule()), {
        getProjectName,
        changeProjectName,
      });
      return project;
    };

    const createNewProject = function (projectName) {
      const newProject = NewProject(projectName);
      projectList.push(newProject);
    };

    const listProjects = function () {
      const list = projectList.map((item) => item);

      return list;
    };

    const plants = createNewProject("Plants");

    const table = createNewProject("Table");

    return { createNewProject, listProjects };
  };

  return CreateProject;
})();

export { tasksModule, projectModule};
