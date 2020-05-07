const COMPONENT_SELECTOR = '[data-headings-anchors]'
const HEADINGS_SELECTOR = 'h1, h2, h3, h4, h5, h6'

const copyStringToClipboard = (str) => {
  const el = document.createElement('textarea')

  el.value = str
  el.setAttribute('readonly', '')
  el.style = {position: 'absolute', left: '-9999px'}
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const headings = components[i].querySelectorAll(HEADINGS_SELECTOR)

    for (let i = 0; i < headings.length; i++) {
      headings[i].addEventListener('click', () => {
        history.replaceState({}, '', '#' + headings[i].getAttribute('id'));
        history.scrollRestoration = 'manual';

        copyStringToClipboard(window.location.href);
      })
    }
  }
}
