const COMPONENT_NAME = 'data-popover'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const BODY_SELECTOR = 'data-popover-body'
const TRIGGER_SELECTOR = '[data-popover-target]'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const triggers = components[i].querySelectorAll(TRIGGER_SELECTOR)

    for (let i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', e => {
        e.preventDefault()

        const targetBody = document.querySelector(`[${BODY_SELECTOR}=${e.target.dataset.popoverTarget}]`)

        components[i].classList.toggle(components[i].dataset.activeClass)
      })
    }

    document.addEventListener('click', e => {
      if (components[i].classList.contains(components[i].dataset.activeClass)) {
        const popoverBody = components[i].querySelector(`[${BODY_SELECTOR}]`)

        for (let i = 0; i < triggers.length; i++) {
          if (!popoverBody.contains(e.target) && e.target !== triggers[i]) {
            components[i].classList.remove(components[i].dataset.activeClass)
          }
        }
      }
    })
  }
}
