const COMPONENT_NAME = 'data-hoverhelp'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const BODY_SELECTOR = 'data-hoverhelp-body'
const TRIGGER_SELECTOR = '[data-hoverhelp-target]'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const triggers = components[i].querySelectorAll(TRIGGER_SELECTOR)

    for (let i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('mouseover', e => {
        e.preventDefault()

        const targetBody = document.querySelector(`[${BODY_SELECTOR}=${e.target.dataset.hoverhelpTarget}]`)

        components[i].classList.toggle(components[i].dataset.activeClass)
      })
    }

    document.addEventListener('mouseover', e => {
      if (components[i].classList.contains(components[i].dataset.activeClass)) {
        const hoverhelpBody = components[i].querySelector(`[${BODY_SELECTOR}]`)

        for (let i = 0; i < triggers.length; i++) {
          if (!hoverhelpBody.contains(e.target) && e.target !== triggers[i]) {
            components[i].classList.remove(components[i].dataset.activeClass)
          }
        }
      }
    })
  }
}
