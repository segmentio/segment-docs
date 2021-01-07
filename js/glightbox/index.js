import GLightbox from 'glightbox'

const COMPONENT_SELECTOR = '[data-glightbox]'

const closeIcon = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.41 5L9.7 1.71c.19-.18.3-.43.3-.71A1.003 1.003 0 008.29.29L5 3.59 1.71.29A1.003 1.003 0 00.29 1.71L3.59 5 .3 8.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L5 6.41 8.29 9.7c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L6.41 5z" fill="#fff"/>
</svg>`

const nextIcon = `<svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7 6.29l-5-5a.965.965 0 00-.71-.3 1.003 1.003 0 00-.71 1.71l3.29 3.29H1.99c-.55 0-1 .45-1 1s.45 1 1 1h9.59l-3.29 3.29a1.003 1.003 0 001.42 1.42l5-5c.18-.18.29-.43.29-.71 0-.28-.12-.52-.3-.7z" fill="#fff"/>
</svg>
`

const prevIcon = `<svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.99 5.99H4.41L7.7 2.7a1.003 1.003 0 00-1.42-1.42l-5 5a1.014 1.014 0 000 1.42l5 5a1.003 1.003 0 001.42-1.42L4.41 7.99H14c.55 0 1-.45 1-1s-.46-1-1.01-1z" fill="#fff"/>
</svg>`

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let c = 0; c < components.length; c++) {
    const images = components[c].querySelectorAll('img')

    const gallery = GLightbox({
      elements: [...images].map((image) => {
        return {
          'href': image.getAttribute('src'),
          'type': 'image',
          'description': image.getAttribute('alt'),
        }
      }),
      openEffect: 'fade',
      closeEffect: 'fade',
      svg: {
        close: closeIcon,
        next: nextIcon,
        prev: prevIcon
      }
    })

    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', (event) => {
        event.preventDefault()

        gallery.openAt(i)
      })
    }
  }
}
