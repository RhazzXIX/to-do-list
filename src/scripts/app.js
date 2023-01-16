import { format } from "date-fns";
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

    const NewTask = function (task, date, level, note) {
      const duty = Object.create(Task());
      let priority = level;
      const taskReference = createReference(task, note)
      if (priority === undefined) priority = 4;
      return Object.assign(duty, { task, date, priority, taskReference });
    };

    const addTasks = function (task, date, priority, note) {
      const newTask = NewTask(task, date, priority, note);
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

    function createReference (task, note) {
      const ref1 = task.split(' ').reduce((word, word2, i, arr) => {
        if (i === 2) arr.splice(1);
        word += word2.slice(0,1);
        return word
      },'')
      const ref2 = note.split(' ').reduce((word, word2, i, arr) => {
        if (i === 2) arr.splice(1);
        word += word2.slice(0,1);
        return word;
      }, '')
      const date = format(new Date(), 'hmmss');
      const reference = ref1 + ref2 + date;
      return reference;
    }

    return Object.assign({}, { addTasks, deleteTasks, listTasks });
  };

  const newTask = CreateTaskList();

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
      }
      const getProjectReference = () => projectReference;
      const project = Object.assign(Object.create(tasksModule()), {
        getProjectName,
        changeProjectName,
        getProjectDescription,
        changeDescription,
        getProjectReference
      });
      return project;
    };

    const createNewProject = function (projectName, projectDescription) {
      const newProject = NewProject(projectName, projectDescription);
      projectList.push(newProject);
    };

    function createReference (name, desc) {
      const ref1 = name.split(' ').reduce((word, word2, i, arr) => {
        if (i === 2) arr.splice(1);
        word += word2.slice(0,1);
        return word
      },'')
      const ref2 = desc.split(' ').reduce((word, word2, i, arr) => {
        if (i === 2) arr.splice(1);
        word += word2.slice(0,1);
        return word;
      }, '')
      const date = format(new Date(), 'hmmss');
      const reference = ref1 + ref2 + date;
      return reference;
    }

    const listProjects = function () { return projectList };

    return { createNewProject, listProjects };
  };


  return CreateProject;
})();

export { tasksModule, projectModule };
