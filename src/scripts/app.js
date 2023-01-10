

const tasksModule = (function() {
  const tasks = [];

  const task = (function () {
    const getPriority = function () {
      console.log(this.priority);
    }
    return {getPriority}
  }) ();

  const Task = function (duty, date, project, priority) {
    const Duty = Object.create(task);
    let level = priority
    if (level === undefined) level = 4;
    
    return Object.assign(Duty, {duty, date, project, priority})
  };

  const addTasks = function (duty, date, project, priority) {
    const newTask = Task (duty, date, project, priority);
    tasks.push(newTask);
  };

  const deleteTasks = function(data) {
    const index = tasks.findIndex((list) => list.duty === data);
    tasks.splice(index,1);
  }

  const getTask = function () {
    const tasksList = tasks;
    return tasksList;
  }
  
  const water = addTasks('water the plants', 'today');
  const groceries = addTasks('buy groceries', 'afternoon');

  tasks[0].getPriority();
  
  console.log(tasks);
  return { addTasks, deleteTasks, getTask }
}) ();


export default tasksModule;