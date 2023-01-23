import { format } from "date-fns";

const tasksModule = (function () {
  const CreateTaskList = function () {
    const tasks = [];

    const Task = function () {
      const completed = false;
      const toggleStatus = function () {
        if (!this.completed) {
          this.completed = true;
        } else {
          this.completed = false;
        }
      };
      return { completed, toggleStatus };
    };

    const createReference = function (task, note) {
      const ref1 = task.split(" ").reduce((word, word2, i, arr) => {
        if (i === 2) arr.splice(1);
        word += word2.slice(0, 1);
        return word;
      }, "");
      const ref2 = note.split(" ").reduce((word, word2, i, arr) => {
        if (i === 2) arr.splice(1);
        word += word2.slice(0, 1);
        return word;
      }, "");
      const date = format(new Date(), "hmmss");
      const reference = ref1 + ref2 + date;
      return reference;
    };

    const NewTask = function (task, initialDate, level, note) {
      const duty = Object.create(Task());
      let priority = level;
      const today = format(new Date(), "do-MMM.-yyyy");
      let date = initialDate;
      if (!initialDate) {
        date = today;
      } else {
        date = format(new Date(initialDate), "do-MMM.-yyyy");
      }
      const taskReference = createReference(task, note);
      if (priority === undefined) priority = 4;
      return Object.assign(duty, { task, date, priority, taskReference, note });
    };

    const addTasks = function (task, date, priority, note) {
      const newTask = NewTask(task, date, priority, note);
      tasks.push(newTask);
    };

    const deleteTasks = function (reference) {
      console.log(tasks)
      const index = tasks.findIndex(
        (task) => task.taskReference === reference
      );
      if (index >= 0) tasks.splice(index, 1);
      console.log(tasks);
    };

    const listTasks = function () {
      const tasksList = tasks.map((list) => list);
      return tasksList;
    };

    // const editTasks = function (duty) {
    //   const taskEdit = tasks.filter((item) => item.duty === duty);
    // };

    return Object.assign({}, { addTasks, deleteTasks, listTasks });
  };

  return CreateTaskList;
})();

const projectModule = (function () {
  const CreateProject = function () {
    const projectList = [];

    const NewProject = function (name, description) {
      let projectName = name;
      let projectDescription = description;
      let projectReference = createReference(name, description);
      const getProjectName = () => projectName;
      const changeProjectName = function (newName) {
        projectName = newName;
      };
      const getProjectDescription = () => projectDescription;
      const changeDescription = function (newDescription) {
        projectDescription = newDescription;
      };
      const getProjectReference = () => projectReference;
      const project = Object.assign(Object.create(tasksModule()), {
        getProjectName,
        changeProjectName,
        getProjectDescription,
        changeDescription,
        getProjectReference,
      });
      return project;
    };

    const createNewProject = function (projectName, projectDescription) {
      const newProject = NewProject(projectName, projectDescription);
      projectList.push(newProject);
    };

    function createReference(name, desc) {
      const ref1 = name.split(" ").reduce((word, word2, i, arr) => {
        if (i === 2) arr.splice(1);
        word += word2.slice(0, 1);
        return word;
      }, "");
      const ref2 = desc.split(" ").reduce((word, word2, i, arr) => {
        if (i === 2) arr.splice(1);
        word += word2.slice(0, 1);
        return word;
      }, "");
      const date = format(new Date(), "hmmss");
      const reference = ref1 + ref2 + date;
      return reference;
    }

    function deleteProject(reference) {
      const index = projectList.filter(
        (project) => project.getProjectReference() === reference
      );
      if (index >= 0) projectList.splice(index, 1);
    }

    const listProjects = function () {
      return projectList;
    };

    return { createNewProject, listProjects };
  };

  return CreateProject;
})();

export { tasksModule, projectModule };
