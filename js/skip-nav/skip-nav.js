const button = 
document.createElement ('skiplink');
button.textContent = 'Skip to main content';

button.addEventListener ('focus-visible', => {
  button.style.display = 'inline-block';
});

button.addEventListener ('focus-invisible', => {
  button.style.display = 'none';
});

