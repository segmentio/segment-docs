const typewriter = require('analytics')

export default function() {

  let scrolledToBottom = false
  window.onscroll = function(ev) {
    if (!scrolledToBottom && (window.innerHeight + window.pageYOffset) >= document.querySelectorAll('[data-tracking-scroll]')[0].offsetHeight) {//document.body.offsetHeight) {
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

  function debounce(func, wait, immediate) {
    var timeout;
    return function executedFunction() {
      var context = this;
      var args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  Array.from(document.querySelectorAll('.aa-Input')).forEach(searchInput => {
    searchInput.addEventListener('input', debounce(function(e) {
      const query = e.target.value
      if (query.length) {
        typewriter.docsSearched({
          query
        })
      }
    }, 300))

    // searchInput.onclick = (e) => {
    //   console.log(e)
    //  typewriter.searchClicked()
    // }
  })


  Array.from(document.querySelectorAll('.menu-side__link')).forEach(menuLink => {
    menuLink.onclick = () => {
      const url = location.origin + location.pathname
      typewriter.tocClicked({
        url,
        link: menuLink.href,
        name: menuLink.innerHTML
      })
    }
  })


}