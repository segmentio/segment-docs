document.addEventListener('DOMContentLoaded', () => {
  const openSidebarButton = document.querySelector('[open-sidebar]')
  const sidebar = document.querySelector('nav.Sidebar')
  openSidebarButton.addEventListener('click', (e) => {
    e.preventDefault()
    sidebar.toggleAttribute('open')
  })
});

Array.from(document.querySelectorAll('.DocsNav-tab')).forEach(tab => {
  tab.onclick = function(e) {
    window.analytics.track('Docs Top Nav Clicked', {
      docs_page_context: window.location.pathname,
      docs_page_click: e.target.href
    })
  }
})
