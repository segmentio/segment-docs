const COMPONENT_NAME = 'data-accordion-group'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const ACCORDION_SELECTOR = `[data-accordion]`

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  components.forEach(component => {
    const accordions = component.querySelectorAll(ACCORDION_SELECTOR)

    accordions.forEach(currentAccordion => {
      currentAccordion.addEventListener('accordion.triggered', () => {
        accordions.forEach(accordion => {
          let activeClass = accordion.getAttribute('data-class-active') || 'active'

          if (accordion.classList.contains(activeClass) && accordion != currentAccordion) {
            accordion.classList.remove(activeClass)
          }
        })
      })
    })
  })
}
