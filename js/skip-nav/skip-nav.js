const button = document.createElement ('skiplink');
button.textContent = 'Skip to main content';

  button.addEventListener ('focus', (keypress) => {
    button.style.display = 'inline-block';
  });

  button.addEventListener ('blur', (keypress) => {
  button.style.display = 'none';
  });

document.body.appendChild(button)