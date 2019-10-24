const COMPONENT_SELECTOR = '[data-code-example]'
const NAV_SELECTOR = '[data-ref*="code-example[nav]"]'
const BODY_SELECTOR = '[data-ref*="code-example[body]"]'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const tabs = components[i].querySelector(BODY_SELECTOR).children
    const triggers = components[i].querySelector(NAV_SELECTOR).children

    tabs[0].classList.add(tabs[0].getAttribute('data-class-active'))
    triggers[0].classList.add(triggers[0].getAttribute('data-class-active'))

    for (let i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', (event) => {
        event.preventDefault()

        let tabActiveClass = tabs[i].getAttribute('data-class-active')
        let triggerActiveClass = triggers[i].getAttribute('data-class-active')

        for (let t = 0; t < triggers.length; t++) {
          triggers[t].classList.remove(triggerActiveClass)
        }

        for (let t = 0; t < tabs.length; t++) {
          tabs[t].classList.remove(tabActiveClass)
        }

        tabs[i].classList.add(tabActiveClass)
        triggers[i].classList.add(triggerActiveClass)
      })
    }
  }
}
