const MenuSpy = require('menuspy');
const COMPONENT_SELECTOR = '[data-anchors-indicator]'
const ACTIVE_CLASS = 'data-active-class'

const OPTIONS = {
  enableLocationHash: false
}

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  components.forEach(component => {
    const activeClass = component.getAttribute(ACTIVE_CLASS)

    new MenuSpy(component, Object.assign({
      activeClass: activeClass
    }, OPTIONS))
  })
}
