import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

const COMPONENT_SELECTOR = '[data-thumbnail-gallery]'

export default function() {
  const pswpElement = document.querySelector('.pswp')
  const closeButton = document.querySelector('.pswp__button--close')
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  let gallery = null

  const options = {
    index: 0,
    fullscreenEl: false,
    zoomEl: false,
    shareEl: false,
    counterEl: false,
    arrowEl: false,
    preloaderEl: false,
    clickToCloseNonZoomable: false,
    closeOnScroll: false,
  }

  for (let c = 0; c < components.length; c++) {
    const images = components[c].querySelectorAll('img')

    for (let i = 0; i < images.length; i++) {
      const photos = [
        {
          src: images[i].getAttribute('src'),
          w: 900,
          h: 600,
          title: images[i].getAttribute('alt'),
        }
      ]

      images[i].addEventListener('click', (event) => {
        event.preventDefault()

        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, photos, options)

        gallery.init()
      })
    }
  }

  closeButton.addEventListener('click', () => {
    gallery.close()
  })
}
