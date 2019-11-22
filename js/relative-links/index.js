export default function() {
  // fixes relative links to play well with basehref
  var x = document.links.length;
  var baseHref = document.getElementsByTagName('base')[0].href
  for (var i = 0; i < x; i++) {
    var thisHREF = document.links[i].href;
    if (thisHREF.indexOf(baseHref + "#") > -1) {
      var anchor = thisHREF.replace(baseHref,'')
      thisHREF = document.location.pathname + anchor;
      document.links[i].setAttribute('href', thisHREF);
    }
  }
}