### Script unverified or undetected by third-party tool

Many times this is a limitation on the tool's detection process, where the detector is looking for a specific HTML element on your page. Our client side analytics.js library asynchronously loads the tool's library or pixel onto the page. As such, the detection fails.

In order to confirm that the tool's library or pixel is actually loaded onto the page, you can open up the [JavaScript console](/docs/connections/sources/catalog/libraries/website/javascript#how-do-i-open-the-javascript-console-in-your-debugger) and go to the network tab when the page is loading.

![Checking network tab to see if script loads](https://i.imgur.com/FdILEbO.gif)

If the script isn't loading, check that any form of ad blocker is disabled.
