/*
 * Side Nav
 */

// Toggles expanding / collapsing logic
var nodes = document.querySelectorAll(".js-collapse");
var path = window.location.pathname;

// Handle trailing slash...
if (path[path.length - 1] === "/") {
  path = path.substr(0, window.location.pathname.length - 1);
}

for (var node of nodes) {
  node.onclick = function(e) {
    e.target.parentNode.classList.toggle("expanded");
  };
}

// Active link
var node = document.querySelector(`ul a[href='${path}']`);
if (node) {
  node.classList.toggle("active");
}

// Toggles keeping nested menus open...
var node = document.querySelector(`.l-sidenav-subnav a[href='${path}']`);

if (node) {
  var getParent = function(node) {
    for (; node && node !== document; node = node.parentNode) {
      if (node.matches(".l-sidenav-collapsible:not(.section)")) return node;
    }

    return null;
  };

  var parent = getParent(node);
  if (parent) {
    parent.classList.toggle("expanded");
  }
}

/*
 * Table of Contents
 */
var docContent = document.querySelector("body");
var lastScrollTop = 0;
var cachedTitles = {};

var highlightTocItem = function() {
  var titles = document.querySelectorAll("#doc-content h2");

  titles.forEach(function(title) {
    var titleItemPosition = title.getBoundingClientRect().top;
    var id = title.getAttribute("id");
    if (docContent.scrollTop > lastScrollTop) {
      if (titleItemPosition <= 100) {
        resetTocHighlighting();
        var tocItem = document.querySelector(`#doc-toc li a[href='#${id}'`);
        tocItem.classList.toggle("active");
        cachedTitles[id] = title;
      }
    } else {
      if (titleItemPosition > 100 && cachedTitles[id]) {
        delete cachedTitles[id];
        resetTocHighlighting();
        var values = Object.values(cachedTitles);
        var previousTitle = values[values.length - 1];
        if (previousTitle) {
          var previousId = previousTitle.getAttribute("id");
          var tocItem = document.querySelector(
            `#doc-toc li a[href='#${previousId}'`
          );
          tocItem.classList.toggle("active");
        }
      }
    }
  });

  lastScrollTop = docContent.scrollTop;
};

var resetTocHighlighting = function() {
  var items = Array.prototype.slice.call(
    document.querySelectorAll("#doc-toc li a")
  );
  items.map(function(item) {
    item.classList.remove("active");
  });
};

window.addEventListener("scroll", highlightTocItem, false);
