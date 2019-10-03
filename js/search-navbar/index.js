const COMPONENT_SELECTOR = '[data-search-navbar]'
const TRIGGER_SELECTOR = '[data-ref*="search-navbar[trigger]"]'

export default function () {
  const component = document.querySelector(COMPONENT_SELECTOR)

  if (component) {
    const triggers = document.querySelectorAll(TRIGGER_SELECTOR);

    for (let i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', e => {
        e.preventDefault()

        component.classList.toggle(component.dataset.activeClass)
      })
    }
  }  
}
