import taskFns from "./app";

const projectModule = (function () {
  const CreateProject = function () {

    const projectList = [];
  
  
    const NewProject = function (name) {
      let projectName = name;
      const getProjectName = () => projectName;
      const changeProjectName = (newName) => projectName = newName;
      const project = Object.assign( Object.create(taskFns()), {getProjectName, changeProjectName});
      return  project
    };
  
    const createProject = (function (projectName) {
      const newProject = NewProject(projectName);
      projectList.push(newProject);
    })
  
    const listProject = (function () {
      const list = projectList.map(item => item);
      return list;
    })
  
    const plants = createProject('Plants');
    listProject()[0].addTasks('buy pots', '09-15-2015');
    listProject()[0].addTasks('buy soil', '09-15-2015');
    
    
    
    const table = createProject("Table");
    listProject()[1].addTasks('Buy wood', 'today');
    
    
    
    return {createProject, listProject};
    
  };

  return CreateProject
})();




export default projectModule;
