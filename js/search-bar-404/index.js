const COMPONENT_NAME = 'data-search'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`

export default function () {
  const search = document.querySelectorAll(COMPONENT_SELECTOR)
  const pathParts = window.location.pathname.split("/")
  const searchWord = pathParts[pathParts.length - 1]

  for (let i = 0; i < search.length; i++) {
    const input = search[i].querySelector('input')
    input.value = searchWord
  }
}
