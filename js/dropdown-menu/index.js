const COMPONENT_SELECTOR = '[data-dropdown-menu]'
const DROPDOWN_HEAD = '[data-ref="dropdown-menu[head]"]'
const DROPDOWN_HEAD_INNER = '[data-ref="dropdown-menu[head-inner]"]'
const DROPDOWN_BODY = '[data-ref="dropdown-menu[body]"]'
const DROPDOWN_LINK = '[data-ref="dropdown-menu[link]"]'
const ACTIVE_CLASS_ATTR = 'data-active-class'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  components.forEach(component => {
    const dropdownHeadInner = component.querySelector(DROPDOWN_HEAD_INNER)
    const itemActiveClass = component.getAttribute(ACTIVE_CLASS_ATTR)

    const dropdownHead = component.querySelector(DROPDOWN_HEAD)
    const dropdownHeadActive = dropdownHead.getAttribute(ACTIVE_CLASS_ATTR)

    const dropdownBody = component.querySelector(DROPDOWN_BODY)
    const dropdownBodyActive = dropdownBody.getAttribute(ACTIVE_CLASS_ATTR)

    const links = component.querySelectorAll(DROPDOWN_LINK)

    dropdownHead.addEventListener('click', () => {
      dropdownHead.classList.toggle(dropdownHeadActive)
      dropdownBody.classList.toggle(dropdownBodyActive)
    })

    const updateValue = (dest) => {
      dropdownHeadInner.innerHTML = dest.innerHTML
    }

    links.forEach(link => {
      link.addEventListener('click', () => {
        updateValue(link)

        dropdownHead.classList.remove(dropdownHeadActive)
        dropdownBody.classList.remove(dropdownBodyActive)
      })
    })

    window.addEventListener('scroll', () => {
      const currentActiveIndicator = document.querySelector(`${DROPDOWN_LINK}.${itemActiveClass}`)

      if (currentActiveIndicator) {
        updateValue(currentActiveIndicator)
      }
    })
  })
}
