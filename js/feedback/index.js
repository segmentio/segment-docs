const COMPONENT_NAME = 'data-feedback'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const HELPFUL_BUTTON_SELECTOR = `[data-ref="feedback[helpful]"]`
const UNHELPFUL_BUTTON_SELECTOR = `[data-ref="feedback[unhelpful]"]`

const DEFAULTS = {
  message: {
    success: 'Thanks for your feedback!'
  }
}

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const options = JSON.parse(components[i].getAttribute(COMPONENT_NAME) || '{}')
    const settings = Object.assign({}, DEFAULTS, options)

    const helpfulButton = components[i].querySelector(HELPFUL_BUTTON_SELECTOR)
    const unhelpfulButton = components[i].querySelector(UNHELPFUL_BUTTON_SELECTOR)

    helpfulButton.addEventListener('click', (event) => {
      event.preventDefault()

      components[i].innerText = settings.message.success

      window.analytics.track('Docs Rated', {
        title: '{{title}}',
        helpful: true,
        url: document.URL
      })
    })

    unhelpfulButton.addEventListener('click', (event) => {
      event.preventDefault()

      components[i].innerText = settings.message.success

      window.analytics.track('Docs Rated', {
        title: '{{title}}',
        helpful: false,
        url: document.URL
      })
    })
  }
}
