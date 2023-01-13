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

export default tasksModule;
