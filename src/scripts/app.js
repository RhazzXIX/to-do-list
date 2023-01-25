import { format } from "date-fns";

const tasksModule = (function () {
  const CreateTaskList = function () {
    const today = format(new Date(), "do-MMM.-yyyy");
    let storageName;
    let baseTasks = [];

    function setStorageName(name) {
      storageName = name;
    }

    const addToStorage = function () {
      if (storageName === undefined) storageName = "base Tasks";
      const toStorage = JSON.stringify(baseTasks);
      localStorage.setItem(storageName, toStorage);
    };

    const getFromStorage = function () {
      if (storageName === undefined) storageName = "base Tasks";

      if (!localStorage.getItem(storageName)) return;
      const fromStorage = JSON.parse(localStorage.getItem(storageName));
      baseTasks = fromStorage;
    };

    function loadStorage() {
      if (storageName === undefined) storageName = "base Tasks";
      if (localStorage.getItem(storageName)) {
        getFromStorage();
      }
    }

    loadStorage();

    function applyMethods(taskArray) {
      taskArray.forEach((task) => {
        methods(task);
      });
      return taskArray;
    }

    function createReference(task, note) {
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
    }

    function BaseTask(task, initialDate, level, note) {
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
    }

    function methods(task) {
      const duty = task;
      const toggleStatus = function () {
        if (!this.completed) {
          this.completed = true;
        } else {
          this.completed = false;
        }
        updateStorage();
      };
      return Object.assign(duty, { toggleStatus });
    }

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

    return Object.assign(
      {},
      { setStorageName, addTasks, deleteTasks, listTasks, loadStorage }
    );
  };

  return CreateTaskList;
})();

const projectModule = (function () {
  const CreateProject = function () {
    let baseProjectList = [];
    const updatedProjectList = [];

    const addProjectToStorage = function () {
      const toStorage = JSON.stringify(baseProjectList);

      localStorage.setItem("Project Storage", toStorage);
    };

    const getProjectFromStorage = function () {
      if (!localStorage.getItem("Project Storage")) return;
      const fromStorage = JSON.parse(localStorage.getItem("Project Storage"));

      baseProjectList = fromStorage;
    };

    function loadProjectStorage() {
      if (localStorage.getItem("Project Storage")) {
        getProjectFromStorage();
      }
    }

    loadProjectStorage();

    function updateProjectStorage() {
      addProjectToStorage();
      getProjectFromStorage();
    }

    function BaseProject(name, description) {
      let reference = createReference(name, description);
      return { name, description, reference };
    }

    function projectMethods(project) {
      let projectName = project.name;
      let projectDescription = project.description;
      const projectReference = project.reference;

      const getProjectName = () => projectName;

      const changeProjectName = function (newName) {
        projectName = newName;
      };

      const getProjectDescription = () => projectDescription;

      const changeDescription = function (newDescription) {
        projectDescription = newDescription;
      };

      const getProjectReference = () => projectReference;
      const Project = Object.assign(Object.create(tasksModule()), {
        getProjectName,
        changeProjectName,
        getProjectDescription,
        changeDescription,
        getProjectReference,
      });

      Project.setStorageName(getProjectName());
      Project.loadStorage();
      return Project;
    }

    function applyProjectMethods(projects) {
      updatedProjectList.splice(0, updatedProjectList.length);
      projects.forEach((project) => {
        updatedProjectList.push(projectMethods(project));
      });
    }

    const createNewProject = function (projectName, projectDescription) {
      const newProject = BaseProject(projectName, projectDescription);
      baseProjectList.push(newProject);

      updateProjectStorage();
      applyProjectMethods(baseProjectList);
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
      const index = updatedProjectList.findIndex(
        (project) => project.getProjectReference() === reference
      );
      if (index >= 0) {
        updatedProjectList.splice(index, 1);
        baseProjectList.splice(index, 1);
      }
      updateProjectStorage();
    }

    const listProjects = function () {
      applyProjectMethods(baseProjectList);

      return updatedProjectList;
    };

    return { createNewProject, listProjects, deleteProject };
  };

  return CreateProject;
})();

export { tasksModule, projectModule };
