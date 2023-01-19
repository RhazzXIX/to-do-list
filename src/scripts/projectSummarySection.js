const ProjectSummarySection = (function () {
  const section = document.createElement('section');
  const title = document.createElement('h1')
  title.textContent = 'Projects';
  section.appendChild(title)
  return {section}
});

export default ProjectSummarySection;