const COMPONENT_NAME = 'data-menu-panels'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const VIEW_SELECTOR = '[data-ref*="menu-panels[view]"]'
const BACK_SELECTOR = '[data-ref*="menu-panels[back]"]'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const triggers = components[i].querySelectorAll('a')
    const back = components[i].querySelectorAll(BACK_SELECTOR)
    const views = components[i].querySelectorAll(VIEW_SELECTOR)

    for (let t = 0; t < triggers.length; t++) {
      triggers[t].addEventListener('click', (event) => {
        event.preventDefault()

        let currentView = [].slice.call(views).filter((view) => {
          return view.getAttribute('data-target') === triggers[t].getAttribute('href')
        })

        if (currentView) {
          event.preventDefault()

          components[i].classList.add(components[i].getAttribute('data-class-active'))

          for (let v = 0; v < views.length; v++) {
            views[v].classList.remove(views[v].getAttribute('data-class-active'))
          }

          currentView[0].classList.add(currentView[0].getAttribute('data-class-active'))
        }
      })
    }

    for (let b = 0; b < back.length; b++) {
      back[b].addEventListener('click', (event) => {
        components[i].classList.remove(components[i].getAttribute('data-class-active'))

        for (let v = 0; v < views.length; v++) {
          views[v].classList.remove(views[v].getAttribute('data-class-active'))
        }
      })
    }
  }
}
