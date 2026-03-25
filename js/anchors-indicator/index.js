const COMPONENT_SELECTOR = '[data-anchors-indicator]'
const ACTIVE_CLASS = 'data-active-class'
const SECTION_ATTR = 'data-sections'

const throttle = (fn, wait) => {
  let lastTime = 0
  return function () {
    const now = Date.now()
    if (now - lastTime >= wait) {
      fn()
      lastTime = now
    }
  }
}

export default () => {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  components.forEach(component => {
    const sectionSelector = component.getAttribute(SECTION_ATTR)
    const activeClass = component.getAttribute(ACTIVE_CLASS)

    const sections = Array.from(document.querySelectorAll(sectionSelector))
    const links = Array.from(component.querySelectorAll('a'))

    // 🔥 Map sectionId -> link (O(1) lookup)
    const linkMap = {}
    links.forEach(link => {
      const hash = link.hash.replace('#', '')
      linkMap[hash] = link
    })

    // 🔥 Precompute section offsets once
    const sectionData = sections.map(sec => {
      let id = sec.tagName === 'H2'
        ? sec.id
        : sec.querySelector('h2')?.id

      return {
        id,
        offset: sec.offsetTop
      }
    }).filter(s => s.id)

    let currentActive = null

    function scrollspy() {
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop

      const position = scrollPosition + (
        window.innerWidth >= 768
          ? window.innerHeight * 0.2
          : window.innerHeight * 0.6
      )

      // 🔥 Traverse from bottom → first match wins (faster)
      let newActive = null
      for (let i = sectionData.length - 1; i >= 0; i--) {
        if (sectionData[i].offset <= position) {
          newActive = sectionData[i].id
          break
        }
      }

      // 🔥 Update DOM only if changed
      if (newActive !== currentActive) {
        if (currentActive && linkMap[currentActive]) {
          linkMap[currentActive].classList.remove(activeClass)
        }

        if (newActive && linkMap[newActive]) {
          linkMap[newActive].classList.add(activeClass)
        }

        currentActive = newActive
      }
    }

    window.addEventListener('load', scrollspy)
    window.addEventListener('scroll', throttle(scrollspy, 50))
  })
}
