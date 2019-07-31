exports.boot = function () {
  window.consentManagerConfig = function (exports) {
    var React = exports.React
    var inEU = exports.inEU
    var openConsentManager = exports.openConsentManager
    var openButton = document.getElementById('open-consent-manager')

    function buttonClick (e) {
      // Prevent the implicit consent from kicking in
      e.stopPropagation()
      e.preventDefault()
      openConsentManager()
    }
    openButton.addEventListener('click', buttonClick, false)

    var bannerContent = (
      React.createElement(
        'span',
        null,
        'We use cookies (and other similar technologies) to collect data to improve your experience on our site. By using our website, you\u2019re agreeing to the collection of data as described in our',
        ' ',
        React.createElement(
          'a',
          { href: '/docs/legal/website-data-collection-policy/', target: '_blank' },
          'Website Data Collection Policy'
        ),
        '.'
      )
    )
    var preferencesDialogTitle = 'Website Data Collection Preferences'
    var preferencesDialogContent = (
      React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          'Segment uses data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.'
        ),
        React.createElement(
          'p',
          null,
          'By using our website, you\u2019re agreeing to our',
          ' ',
          React.createElement(
            'a',
            { href: '/docs/legal/website-data-collection-policy/', target: '_blank' },
            'Website Data Collection Policy'
          ),
          '.'
        ),
        React.createElement(
          'p',
          null,
          'The table below outlines how we use this data by category. To opt out of a category of data collection, select \u201CNo\u201D and save your preferences.'
        )
      )
    )
    var cancelDialogTitle = 'Are you sure you want to cancel?'
    var cancelDialogContent = (
      React.createElement(
        'div',
        null,
        'Your preferences have not been saved. By continuing to use our website, you\u2019re agreeing to our',
        ' ',
        React.createElement(
          'a',
          { href: '/docs/legal/website-data-collection-policy/', target: '_blank' },
          'Website Data Collection Policy'
        ),
        '.'
      )
    )

    return {
      container: '#consent-manager',
      writeKey: 'zaySL4FGIiLsxt3I7omU5uLxXqxaBMPh',
      shouldRequireConsent: inEU,
      bannerContent: bannerContent,
      preferencesDialogTitle: preferencesDialogTitle,
      preferencesDialogContent: preferencesDialogContent,
      cancelDialogTitle: cancelDialogTitle,
      cancelDialogContent: cancelDialogContent
    }
  }
}
