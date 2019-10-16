const COMPONENT_NAME = 'data-menu-panels'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const VIEW_SELECTOR = '[data-ref*="menu-panels[view]"]'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const views = components[i].querySelectorAll(VIEW_SELECTOR)
    const triggers = components[i].querySelectorAll('a')

    for (let t = 0; t < triggers.length; t++) {
      triggers[t].addEventListener('click', (event) => {
        event.preventDefault()

        let currentView = Array.from(views).filter((view) => {
          return view.getAttribute('data-target') === triggers[t].getAttribute('href')
        })

        if (currentView) {
          event.preventDefault()

          for (let v = 0; v < views.length; v++) {
            views[v].classList.remove('active')
          }

          currentView[0].classList.add('active')
        }
      })
    }
  }
}
