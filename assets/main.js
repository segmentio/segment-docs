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
  console.log(parent);
  if (parent) {
    parent.classList.toggle("expanded");
  }
}

/*
 * Side Nav
 */
