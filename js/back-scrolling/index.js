const COMPONENT_SELECTOR = '[data-back-scrolling]'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    window.onscroll = () => {
      if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        components[i].classList.add(components[i].dataset.activeClass)
      } else {
        components[i].classList.remove(components[i].dataset.activeClass)
      }
    }

    components[i].addEventListener('click', e => {
      e.preventDefault()

      window.scrollTo({top: 0, behavior: 'smooth'})
    })
  }
}
