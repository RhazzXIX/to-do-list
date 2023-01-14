
const contentModule =(function () {
  const sectionToday = document.createElement('section');
  
  const taskHeader = document.createElement('h1');
  taskHeader.classList.add('taskHeader');
  taskHeader.textContent = "Today's Tasks"
     
  const taskSection = document.createElement('section');
  taskSection.appendChild(taskHeader);

  sectionToday.appendChild(taskSection);

  return {sectionToday}
}) ();

export default contentModule