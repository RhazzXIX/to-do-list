import { format } from "date-fns";

const tasksModule = (function () {
  const CreateTaskList = function () {
    const today = format(new Date(), "do-MMM.-yyyy");
    let storageName;
    const tasks = [];
    let baseTasks = [
      {
        task: "test Storage",
        date: today,
        priority: 'High',
        taskReference: 'tSJtt2255',
        note: 'Just testing the storage',
        completed: false,
      }
    ]
    
    // localStorage.clear();
    console.log(localStorage);

    function setStorageName (name) {
      storageName = name;
    }

    // function createTaskStorage () {
    //   if (!localStorage.length) {
    //     if (storageName === undefined) storageName = 'base Tasks';
    //     console.log(storageName);
    //   }
    //   console.log(localStorage);
    // }

    const addToStorage = function () {
      if (storageName === undefined ) storageName = 'base Tasks';
      const toStorage = JSON.stringify(baseTasks);
      localStorage.setItem(storageName, toStorage)
    }

    const getFromStorage = function () {
      if (!localStorage.getItem(storageName)) return
      const fromStorage = JSON.parse(localStorage.getItem(storageName))
      baseTasks = fromStorage;
    }

    if (localStorage.getItem(storageName)) {
      getFromStorage();
    }

    function applyMethods (taskArray) {
      tasks.splice(0, tasks.length);
      taskArray.forEach((task) => {
        methods(task);
        tasks.push(task);
      });
    }

    function createReference (task, note) {
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

    function BaseTask (task, initialDate, level, note) {
      const completed = false;
      let priority = level;
      
      let date = initialDate;
      if (!initialDate) {
        date = today;
      } else {
        date = format(new Date(initialDate), "do-MMM.-yyyy");
      }
      const taskReference = createReference(task, note);
      if (priority === undefined) priority = 4;
      return { task, date, priority, taskReference, note, completed };
    };

    function methods (task) {
      const duty = task;
      const toggleStatus = function () {
        if (!this.completed) {
          this.completed = true;
        } else {
          this.completed = false;
        }
        updateStorage();
      }
      return Object.assign(duty, { toggleStatus });
    };

    function updateStorage() {
      addToStorage();
      getFromStorage();
    }

    const addTasks = function (task, date, priority, note) {
      const baseTask = BaseTask(task, date, priority, note);
      baseTasks.push(baseTask);
      updateStorage();
    };


    const deleteTasks = function (reference) {      
      const index = baseTasks.findIndex(
        (task) => task.taskReference === reference
      );
      if (index >= 0) baseTasks.splice(index, 1);
      updateStorage();
    };

    const listTasks = function () {
      applyMethods(baseTasks);
      return baseTasks;
    };

    // const editTasks = function (duty) {
    //   const taskEdit = tasks.filter((item) => item.duty === duty);
    // };

    return Object.assign({}, { setStorageName, addTasks, deleteTasks, listTasks });
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
      console.log(project);
      project.setStorageName(getProjectName())
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
      console.log(projectList);
      const index = projectList.findIndex(
        (project) => project.getProjectReference() === reference
      );
      console.log(index);
      if (index >= 0) projectList.splice(index, 1);
      console.log(projectList);
    }

    const listProjects = function () {
      return projectList;
    };

    return { createNewProject, listProjects, deleteProject };
  };

  return CreateProject;
})();

export { tasksModule, projectModule };
