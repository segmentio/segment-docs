export default function() {
  // highlight active link slug in side menu
  const pathname = document.location.pathname
  // find all links associated with active catalog page
  const links = document.querySelectorAll(
    `[data-class-active="menu-item--active"] > ul > li > a[href="${pathname}"]`
  )
  // only open the first 'category' that contains the active integrations
  if (!!links.length) {
    links[0].parentElement.parentElement.parentElement.className +=
      ' menu-item--active'
    for (let i = 0; i < links.length; i++) {
      let link = links[i]
      if (link.classList.contains('menu-item__link')) {
        // set link to be active
        link.parentElement.className +=
          ' menu-item--active menu-item--indicator'
        link.className += ' menu-item__link--indicator'
      }
    }
  }
}
