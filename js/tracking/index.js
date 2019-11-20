const typewriter = require('analytics')

export default function() {

  let scrolledToBottom = false
  window.onscroll = function(ev) {
    if (!scrolledToBottom && (window.innerHeight + window.pageYOffset) >= document.getElementsByClassName('stage__content')[0].offsetHeight) {//document.body.offsetHeight) {
        scrolledToBottom = true
        console.log("you're at the bottom of the page");
        typewriter.scrolledToBottom({
          url: document.URL
        })
    }
  }
  
  document.getElementById('home-btn').addEventListener('click', function () {
    typewriter.homeButtonClicked({
      url: document.URL
    })
  })
  
  // Array.from(document.querySelectorAll('.menu-item__link')).forEach(link => {
  //   link.onclick = function(e) {
  //     typewriter.docsNavClicked({
  //       docs_page_context: window.location.pathname,
  //       docs_page_click: e.target.href
  //     })
  //   }
  // })
}