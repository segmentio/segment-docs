import ClipboardJS from 'clipboard'

const COMPONENT_SELECTOR = '[data-headings-anchors]'
const HEADINGS_SELECTOR = 'h1, h2, h3, h4, h5, h6'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const headings = components[i].querySelectorAll(HEADINGS_SELECTOR)

    for (let i = 0; i < headings.length; i++) {
      new ClipboardJS(headings[i], {
        text: () => {
          history.replaceState({}, '', '#' + headings[i].getAttribute('id'))
          return window.location.href
        }
      })
    }
  }
}
