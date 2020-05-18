import ClipboardJS from 'clipboard'
import tippy from 'tippy.js'

const COMPONENT_SELECTOR = '[data-headings-anchors]'
const HEADINGS_SELECTOR = 'h1, h2, h3, h4'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const headings = components[i].querySelectorAll(HEADINGS_SELECTOR)

    for (let i = 0; i < headings.length; i++) {
      const tooltip = tippy(headings[i], {
        content: 'Copied!',
        theme: 'dark',
        placement: 'top-start',
        distance: 5,
        trigger: 'manual'
      })

      const clipboard = new ClipboardJS(headings[i], {
        text: () => {
          history.replaceState({}, '', '#' + headings[i].getAttribute('id'))
          return window.location.href
        }
      })

      clipboard.on('success', function(e) {
        tooltip.show()

        setTimeout(() => {
          tooltip.hide()
        }, 700)
    
        e.clearSelection()
      })
    }
  }
}
