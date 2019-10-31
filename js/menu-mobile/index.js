const COMPONENT_NAME = 'data-menu-mobile'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const TRIGGER_SELECTOR = '[data-ref*="menu-mobile[trigger]"]'

const DEFAULTS = {
  classActive: 'active',
  classBody: 'active'
}

export default function () {
  const component = document.querySelector(COMPONENT_SELECTOR)

  if (component) {
    const settings = Object.assign({}, DEFAULTS, JSON.parse(component.getAttribute(COMPONENT_NAME) || '{}'))
    const triggers = document.querySelectorAll(TRIGGER_SELECTOR)

    for (let i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', (event) => {
        event.preventDefault()

        component.classList.toggle(settings.classActive)
        document.body.classList.toggle(settings.classBody)
      })
    }
  }
}
