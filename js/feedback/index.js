const COMPONENT_NAME = 'data-feedback'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const BUTTON_SELECTOR = `[data-ref-button]`
const CONTENT_SELECTOR = `[data-ref="feedback[content]"]`
const ACTIVE_CLASS = 'data-active-class'
const typewriter = require('analytics')

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)
  const buttons = document.querySelectorAll(BUTTON_SELECTOR)
  const helpfulButtons = [...buttons].filter(button => button.dataset.refButton === 'helpful')
  const unhelpfulButtons = [...buttons].filter(button => button.dataset.refButton === 'unhelpful')
  const contents = document.querySelectorAll(CONTENT_SELECTOR)

  const trackFeedback = (helpful, section) => {
    typewriter.feedbackProvided({
      title: `${document.title}`,
      helpful,
      url: document.url,
      section
    })
  }

  const clickHandler = () => {
    if (contents.length) {
      for (let i = 0; i < contents.length; i++) {
        contents[i].hidden = false
      }
    }

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true
    }
  }

  const addActiveClasses = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      const activeClass = elements[i].getAttribute(ACTIVE_CLASS)
      elements[i].classList.add(activeClass)
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
      event.preventDefault()

      const section = buttons[i].hasAttribute('data-section') ? 'right-nav' : 'footer'
      const helpful = buttons[i].dataset.refButton === 'helpful'
      let activeButtons = []

      clickHandler()

      if (helpful) {
        addActiveClasses(helpfulButtons)
        trackFeedback(true, section)
      } else {
        addActiveClasses(unhelpfulButtons)
        trackFeedback(false, section)
      }
    })
  }
}
