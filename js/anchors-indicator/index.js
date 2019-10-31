
const COMPONENT_SELECTOR = '[data-anchors-indicator]'
const ACTIVE_CLASS = 'data-active-class'
const SECTION_ATTR= 'data-sections'

const throttle = (fn, wait) => {
  var time = Date.now()
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn()
      time = Date.now()
    }
  }
}

export default () => {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  components.forEach(component => {
    const sectionSelector = component.getAttribute(SECTION_ATTR)
    const activeClass = component.getAttribute(ACTIVE_CLASS)
    const sections = document.querySelectorAll(`${sectionSelector}`)
    const allLinks = component.querySelectorAll('a')

    function scrollspy() {
      sections.forEach(current => {
        let currentElementOffset = current.offsetTop
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop

        let position = null

        if (window.innerWidth >= 768) {
          position = scrollPosition + (window.innerHeight * 0.2)
        } else {
          position = scrollPosition + (window.innerHeight * 0.6)
        }

        if (currentElementOffset <= position) {
          allLinks.forEach(currentLink => {
            currentLink.classList.remove(activeClass)
          })
          const currentID = current.getAttribute('id')

          if ( currentID ) {
            component
            .querySelector(`a[href='#${currentID}']`)
            .classList.add(activeClass)
          }
        } else {
          const currentID = current.getAttribute('id')

          component.querySelector(`a[href='#${currentID}']`).classList.remove(activeClass)
        }
      })
    }

    window.addEventListener('load', scrollspy())
    window.addEventListener("scroll", throttle(scrollspy, 50))
  })
}
