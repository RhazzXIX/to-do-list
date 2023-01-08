import './styles/style.css';

const div = document.createElement('div')
div.textContent = 'Click me!';

document.querySelector('body').appendChild(div);

div.addEventListener('click',(e) => {
  e.stopPropagation();
  if (div.textContent === 'Click me!') {
    div.textContent = 'Hello Up-Skilling World!';
  } else {div.textContent = 'Click me!'};
});

// console.log(div2);