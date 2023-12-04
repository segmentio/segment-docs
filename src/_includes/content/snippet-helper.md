{% codeexample %}
{% codeexampletab Minified %}
```html
<script>
!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window.analytics.initialized)return window.analytics[e].apply(window.analytics,arguments);var i=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");i.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}i.unshift(e);analytics.push(i);return analytics}};for(var i=0;i<analytics.methods.length;i++){var key=analytics.methods[i];analytics[key]=analytics.factory(key)}analytics.load=function(key,i){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=i};analytics._writeKey="YOUR_WRITE_KEY";;analytics.SNIPPET_VERSION="5.2.0";
analytics.load("YOUR_WRITE_KEY");
analytics.page();
}}();
</script>
```

{% endcodeexampletab %}

{% codeexampletab Non-minified %}
```js
<script type="text/javascript">
(function() {
  // Create a queue, but don't obliterate an existing one!
  var analytics = window.analytics = window.analytics || [];

  // If the real analytics.js is already on the page return.
  if (analytics.initialize) return;

  // If the snippet was invoked already show an error.
  if (analytics.invoked) {
    if (window.console && console.error) {
      console.error("Segment snippet included twice.");
    }
    return;
  }

  // Invoked flag, to make sure the snippet
  // is never invoked twice.
  analytics.invoked = true;

  // A list of the methods in Analytics.js to stub.
  analytics.methods = [
    "trackSubmit",
    "trackClick",
    "trackLink",
    "trackForm",
    "pageview",
    "identify",
    "reset",
    "group",
    "track",
    "ready",
    "alias",
    "debug",
    "page",
    "screen",
    "once",
    "off",
    "on",
    "addSourceMiddleware",
    "addIntegrationMiddleware",
    "setAnonymousId",
    "addDestinationMiddleware",
    "register"
  ];

  // Define a factory to create stubs. These are placeholders
  // for methods in Analytics.js so that you never have to wait
  // for it to load to actually record data. The `method` is
  // stored as the first argument, so we can replay the data.
  analytics.factory = function(e) {
    return function() {
      if (window.analytics.initialized) {
        // Sometimes users assigned analytics to a variable before analytics is done loading, resulting in a stale reference.
        // If so, proxy any calls to the 'real' analytics instance.
        return window.analytics[e].apply(window.analytics, arguments);
      }
      var args = Array.prototype.slice.call(arguments);
      
      // Add buffered page context object so page information is always up-to-date
      if (["track", "screen", "alias", "group", "page", "identify"].indexOf(e) > -1) {
        var c = document.querySelector("link[rel='canonical']");
        args.push({
          __t: "bpc",
          c: c && c.getAttribute("href") || undefined,
          p: location.pathname,
          u: location.href,
          s: location.search,
          t: document.title,
          r: document.referrer
        });
      }

      args.unshift(e);
      analytics.push(args);
      return analytics;
    };
  };


  // For each of our methods, generate a queueing stub.
  for (var i = 0; i < analytics.methods.length; i++) {
    var key = analytics.methods[i];
    analytics[key] = analytics.factory(key);
  }

  // Define a method to load Analytics.js from our CDN,
  // and that will be sure to only ever load it once.
  analytics.load = function(key, options) {
    // Create an async script element based on your key.
    var t = document.createElement("script");
    t.type = "text/javascript";
    t.async = true;
    t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";

    // Insert our script next to the first script element.
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(t, first);
    analytics._loadOptions = options;
  };
  analytics._writeKey = "YOUR_WRITE_KEY";

  

  // Add a version to keep track of what's in the wild.
  analytics.SNIPPET_VERSION = "5.2.0";

  // Load Analytics.js with your key, which will automatically
  // load the tools you've enabled for your account. Boosh!
  analytics.load("YOUR_WRITE_KEY");

  // Make the first page call to load the integrations. If
  // you'd like to manually name or tag the page, edit or
  // move this call however you'd like.
  analytics.page();
})();
</script>
```
{% endcodeexampletab %}

{% endcodeexample %}
