const COMPONENT_NAME = 'data-feedback'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const HELPFUL_BUTTON_SELECTOR = `[data-ref="feedback[helpful]"]`
const UNHELPFUL_BUTTON_SELECTOR = `[data-ref="feedback[unhelpful]"]`
const CONTENT_SELECTOR = `[data-ref="feedback[content]"]`
const ACTIVE_CLASS = 'data-active-class'
const typewriter = require('analytics')

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  const trackFeedback = (helpful, section) => {
    typewriter.feedbackProvided({
      title: `${document.title}`,
      helpful,
      url: document.url,
      section
    })
  }

  for (let i = 0; i < components.length; i++) {
    const helpfulButton = components[i].querySelector(HELPFUL_BUTTON_SELECTOR)
    const unhelpfulButton = components[i].querySelector(UNHELPFUL_BUTTON_SELECTOR)
    const content = components[i].querySelector(CONTENT_SELECTOR)

    const clickHandler = () => {
      if (content) {
        content.hidden = false
      }

      helpfulButton.disabled = true
      unhelpfulButton.disabled = true
    }

    helpfulButton.addEventListener('click', (event) => {
      event.preventDefault()
      const section = helpfulButton.hasAttribute('data-section') ? 'right-nav' : 'footer'
      const activeClass = helpfulButton.getAttribute(ACTIVE_CLASS)
      helpfulButton.classList.add(activeClass)

      clickHandler()
      trackFeedback(true, section)
    })

    unhelpfulButton.addEventListener('click', (event) => {
      event.preventDefault()
      const section = helpfulButton.hasAttribute('data-section') ? 'side-nav' : 'footer'
      const activeClass = unhelpfulButton.getAttribute(ACTIVE_CLASS)
      unhelpfulButton.classList.add(activeClass)

      clickHandler()
      trackFeedback(false, section)
    })
  }
}
