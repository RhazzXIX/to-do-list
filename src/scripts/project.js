import taskFns from "./tasks";

const projectModule = (function () {
  const CreateProject = function () {
    const projectList = [];

    const NewProject = function (name) {
      let projectName = name;
      const getProjectName = () => projectName;
      const changeProjectName = (newName) => (projectName = newName);
      const project = Object.assign(Object.create(taskFns()), {
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

export default projectModule;
