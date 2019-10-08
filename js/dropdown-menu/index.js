const COMPONENT_SELECTOR = '[data-dropdown-menu]'
const DROPDOWN_HEAD = '[data-ref="dropdown-menu[head]"]'
const DROPDOWN_BODY = '[data-ref="dropdown-menu[body]"]'
const ACTIVE_CLASS_ATTR = 'data-active-class'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  components.forEach(component => {
    const dropdownHead = component.querySelector(DROPDOWN_HEAD)
    const dropdownHeadActive = dropdownHead.getAttribute(ACTIVE_CLASS_ATTR)

    const dropdownBody = component.querySelector(DROPDOWN_BODY)
    const dropdownBodyActive = dropdownBody.getAttribute(ACTIVE_CLASS_ATTR)

    dropdownHead.addEventListener('click', () => {
      dropdownHead.classList.toggle(dropdownHeadActive)
      dropdownBody.classList.toggle(dropdownBodyActive)
    })
  })
}
