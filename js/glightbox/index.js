import GLightbox from 'glightbox'

const COMPONENT_SELECTOR = '[data-glightbox]'

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
    })

    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', (event) => {
        event.preventDefault()

        gallery.open()
      })
    }
  }
}
