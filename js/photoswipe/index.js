import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

export default function() {
  const pswpElement = document.querySelector('.pswp')
  const closeButton = document.querySelector('.pswp__button--close')

  const items = [
    {
      src: 'https://placekitten.com/600/400',
      w: 900,
      h: 600,
      title: 'Example title',
    }
  ];
  
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
  };
  
  const gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options)

  gallery.init()

  closeButton.addEventListener('click', () => {
    gallery.close()
  })
}