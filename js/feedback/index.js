import tippy from 'tippy.js'

const BUTTON_SELECTOR = '[data-feedback-button]'
const SEND_SELECTOR = '[data-send-button]'
const TEMPLATE_SELECTOR = '[data-feedback-template]'
const TEXT_SELECTOR = '[data-feedback-text]'
const CONTENT_SELECTOR = '[data-feedback-content]'
const ACTIVE_CLASS = 'data-active-class'
const typewriter = require('analytics')

export default function() {
  const buttons = document.querySelectorAll(BUTTON_SELECTOR)
  const templates = document.querySelectorAll(TEMPLATE_SELECTOR)
  const helpfulTemplate = [...templates].filter(
    (template) => template.dataset.feedbackTemplate === 'helpful'
  )
  const unhelpfulTemplatte = [...templates].filter(
    (template) => template.dataset.feedbackTemplate === 'unhelpful'
  )
  const alternateTemplate = [...templates].filter(
    (template) => template.dataset.feedbackTemplate === 'alternate'
  )
  const helpfulButtons = [...buttons].filter(
    (button) => button.dataset.feedbackButton === 'helpful'
  )
  const unhelpfulButtons = [...buttons].filter(
    (button) => button.dataset.feedbackButton === 'unhelpful'
  )
  const contents = document.querySelectorAll(CONTENT_SELECTOR)

  let sent = false
  const tooltips = tippy(buttons)
  const defaultSettings = {
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
          let { section = 'footer', helpful = false } = JSON.parse(
            window.localStorage.getItem('docsFeedback')
          )
          typewriter.feedbackCommentProvided({
            section,
            helpful,
            title: `${document.title}`,
            url: document.url,
            comment: feedbackValue,
          })

          tooltip.hide()
          sent = true

          for (let i = 0; i < contents.length; i++) {
            contents[i].hidden = false
            contents[i].children[0].hidden = false
            contents[i].children[1].hidden = true
          }
        }
      })
    },
    onShown: () => {
      const feedbackText = document.querySelector(TEXT_SELECTOR)
      feedbackText.focus()
    },
    onHidden: () => {
      if (!sent) {
        for (let i = 0; i < contents.length; i += 1) {
          contents[i].hidden = false
          contents[i].children[0].hidden = true
        }
      }
    },
  }

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
      const activeClasses = elements[i].getAttribute(ACTIVE_CLASS).split(' ')
      
      for (let c = 0; c < activeClasses.length; c++) {
        elements[i].classList.add(activeClasses[c])
      }
    }
  }

  for (let i = 0; i < tooltips.length; i++) {
    tooltips[i].setProps(defaultSettings)
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
      event.preventDefault()

      const section = buttons[i].hasAttribute('data-section')
        ? 'right-nav'
        : 'footer'
      const helpful = buttons[i].dataset.feedbackButton === 'helpful'
      const alternate = buttons[i].dataset.feedbackButton === 'alternate'

      window.localStorage.setItem(
        'docsFeedback',
        JSON.stringify({
          section,
          helpful,
        })
      )

      if (alternate) {
        tooltips[i].setContent(alternateTemplate[0].innerHTML)
      }

      if (helpful & !alternate) {
        addActiveClasses(helpfulButtons)
        trackFeedback(true, section)

        tooltips[i].setContent(helpfulTemplate[0].innerHTML)
      } else if (!helpful & !alternate) {
        addActiveClasses(unhelpfulButtons)
        trackFeedback(false, section)

        tooltips[i].setContent(unhelpfulTemplate[0].innerHTML)
      }

      tooltips[i].show()
      clickHandler()
    })
  }
}
