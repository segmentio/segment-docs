import tippy from 'tippy.js'

const BUTTON_SELECTOR = '[data-feedback-button]'
const SEND_SELECTOR = '[data-send-button]'
const TEMPLATE_SELECTOR = '[data-feedback-template]'
const TEXT_SELECTOR = '[data-feedback-text]'
const CONTENT_SELECTOR = '[data-feedback-content]'
const ACTIVE_CLASS = 'data-active-class'
const typewriter = require('analytics')

export default function () {
  const buttons = document.querySelectorAll(BUTTON_SELECTOR)
  const templates = document.querySelectorAll(TEMPLATE_SELECTOR)
  const helpfulTemplate = [...templates].filter(template => template.dataset.feedbackTemplate === 'helpful')
  const unhelpfulTemplate = [...templates].filter(template => template.dataset.feedbackTemplate === 'unhelpful')
  const helpfulButtons = [...buttons].filter(button => button.dataset.feedbackButton === 'helpful')
  const unhelpfulButtons = [...buttons].filter(button => button.dataset.feedbackButton === 'unhelpful')
  const contents = document.querySelectorAll(CONTENT_SELECTOR)

  tippy.setDefaultProps({
    interactive: true,
    placement: 'bottom',
    boundary: 'viewport',
    trigger: 'manual',
    onMount: (tooltip) => {
      const sendButton = document.querySelector(SEND_SELECTOR)
      const feedbackText = document.querySelector(TEXT_SELECTOR)

      sendButton.addEventListener('click', () => {
        const feedbackValue = feedbackText.value

        if (feedbackValue) {
          // TODO: track feedback

          tooltip.hide()

          if (contents.length) {
            for (let i = 0; i < contents.length; i++) {
              contents[i].hidden = false
            }
          }
        }
      })
    }
  })

  const tooltips = tippy(buttons)

  const trackFeedback = (helpful, section) => {
    typewriter.feedbackProvided({
      title: `${document.title}`,
      helpful,
      url: document.url,
      section,
    })
  }

  const clickHandler = () => {
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
      const helpful = buttons[i].dataset.feedbackButton === 'helpful'

      if (helpful) {
        addActiveClasses(helpfulButtons)
        trackFeedback(true, section)

        tooltips[i].setContent(helpfulTemplate[0].innerHTML)
      } else {
        addActiveClasses(unhelpfulButtons)
        trackFeedback(false, section)

        tooltips[i].setContent(unhelpfulTemplate[0].innerHTML)
      }

      tooltips[i].show()

      clickHandler()
    })
  }
}
