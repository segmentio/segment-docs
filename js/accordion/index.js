import { accordionTriggered } from './events'

const COMPONENT_NAME = 'data-accordion'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const TRIGGER_SELECTOR = `[data-ref="accordion[trigger]"]`
const BODY_SELECTOR = `[data-ref="accordion[body]"]`

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    let body = components[i].querySelector(BODY_SELECTOR)
    let trigger = components[i].querySelector(TRIGGER_SELECTOR)

    if (body) {
      let activeClass = components[i].getAttribute('data-class-active') || 'active'

      if (trigger) {
        trigger.addEventListener('click', (event) => {
          event.preventDefault()

          components[i].dispatchEvent(accordionTriggered)
          components[i].classList.toggle(activeClass)
        })
      }
    }
  }
}
