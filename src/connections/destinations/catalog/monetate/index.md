---
title: Monetate Destination
id: 54521fd925e721e32a72eede
---
## Getting Started

Segment allows you to track events directly into Monetate, and create, test, deploy, and measure personalized marketing campaigns.

### Client-Side

Because the Monetate destination needs to be on the page right away, Segment can't add it for you. That means you'll need to put the Monetate JavaScript snippet on the page. Pop over to Monetate and in Settings > destination > Tag you'll find their snippet.

To get started with Monetate and Segment, just enable the Monetate destination on your Segment **Destinations page**. If you've already copied the Monetate script tag onto your page, you're ready to go!

 Copy and paste the code provided immediately after your opening `<head>` tag.

The script looks something like this:

```html
<script type="text/javascript">
var monetateT = new Date().getTime();
(function() {
    var p = document.location.protocol;
    if (p == "http:" || p == "https:") {
        var m = document.createElement("script"); m.type = "text/javascript"; m.src = (p == "https:" ? "https://s" : "http://") + "e.monetate.net/js/2/[siteId]/p/[domain]/entry.js";
        var e = document.createElement("div"); e.appendChild(m); document.write(e.innerHTML);
    }
})();
</script>
```

Include this snippet on every page you want to run experiments on and track as a goal. This snippet will not change. This separate script is required because Monetate alters the page, if it were loaded async the alterations may cause unappealing results.

## Page

When you call the [`page`](/docs/connections/spec/page/) method with a name and category, we call the 'setPageType' method in Monetate. This allows you to run your campaigns on different page types.

## Track

When you call the [`track`](/docs/connections/spec/track/) method with the event names `Viewed Product`, `Added Product`, `Order Completed` from our [e-commerce API](/docs/connections/spec/ecommerce/v2/) we will call the corresponding `addItems`, `addReviewRows`, `addConversionRows` in Monetate if the Retail option is not checked in settings, and `addProducts`, `addCartRows`, `addPurchaseRows` if it is. Other event names will not be forwarded to Monetate.
