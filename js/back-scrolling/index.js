const COMPONENT_SELECTOR = '[data-back-scrolling]'
const typewriter = require('analytics')

export default function () {
  const components = Array.from(document.querySelectorAll(COMPONENT_SELECTOR))

  if (!components.length) return

  function handleScroll() {
    const scrolled =
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30

    components.forEach(component => {
      const activeClass = component.dataset.activeClass
      if (!activeClass) return

      component.classList.toggle(activeClass, scrolled)
    })
  }

  // Single optimized scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true })

  components.forEach(component => {
    component.addEventListener('click', e => {
      e.preventDefault()

      typewriter.scrollToTopClicked()

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  })
}
