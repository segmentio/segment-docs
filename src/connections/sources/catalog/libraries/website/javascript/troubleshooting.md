---
title: Troubleshooting Analytics.js
strat: ajs
---

The console reveals all. [Learn how to access the JavaScript console in each browser](#how-do-i-open-the-javascript-console-in-your-debugger).
Any Analytics.js methods may be executed manually. Use the Network tab to inspect requests.

## Are you loading Analytics.js?

Open the JavaScript console and enter `analytics`. Does it return an object, as seen below?

![Returning analytics object](images/VOsmoAB.gif)

The object means that you are successfully loading Analytics.js onto your website. If you get an `undefined` error, Analytics.js is not loading successfully:

![Returning analytics object error](images/CFsktto.gif)

Segment also provides a Chrome web extension, [Segment Inspector](/docs/connections/sources/catalog/libraries/website/javascript/index.html#segment-inspector), which you can use to validate that you're successfully loading Analytics.js.

Solution: [Follow the Analytics.js Quickstart Guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/)

## Are you loading two instances of Analytics.js?

Note that you *cannot* load Analytics.js twice on the same page, even if you're using different write keys. You might encounter `Uncaught RangeError: Maximum call stack size exceeded`. You can conditionally set the write key based on an environment variable.

Example:
```js
var writeKey;
ENV === 'production' ? writeKey = 'A' : writeKey = 'B';
```

## How do I resolve the 'Failed to Load Analytics.js ChunkLoadError'?

The error can occur for different reasons:

* Snippet syntax: Ensure you correctly added the Segment snippet to the page. Check for any missing or extra characters. Follow [this guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-install-segment-to-your-site).

* NPM package: If you're using Segment through NPM, refer to [this guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2b-install-segment-as-a-npm-package).

* Browser cache: Clear the browser cache, as this is a common cause for `ChunkLoadError`.

* Cloudflare caching: If you use Cloudflare to proxy Segment, disable caching for the Segment JS file.

## Do you see events appear in your debugger?

When you reload the page, does your debugger show a new [`page`](/docs/connections/spec/page)? You can also check the JavaScript console in the browser and manually fire an event, like an Identify call, which would show up in the debugger.

- You can also use [Segment's Chrome extension](/docs/connections/sources/catalog/libraries/website/javascript/index.html#segment-inspector)to inspect events.

![Making an identify call](images/7Ymnh2S.gif)

If the call doesn't appear in the debugger, open up the JavaScript console and check the Network tab to see if the outbound web services requests are being initiated:

![Checking for calls in the network tab](images/d8CmIY2.png)

In the above, the `p` is a [`page`](/docs/connections/spec/page) call and the `i` is an [`identify`](/docs/connections/spec/identify) call. If you don't at least see the `p`, then check if you are loading Analytics.js correctly.

## Using the Segment Chrome extension to validate your implementation

The [Segment Inspector](/docs/connections/sources/catalog/libraries/website/javascript/index.html#segment-inspector) is a Chrome extension designed for debugging Segment integrations in web applications using Analytics.js. The Inspector lets you view and verify event data before it's sent to destinations. Additionally, the tool confirms that API calls from your website reach your Analytics.js source correctly.


## Is data being transmitted to your third-party destinations?

Some destinations send data directly from the website to their servers. You can check the Network tab in your JavaScript console to see the outbound web services requests being initiated.

In the image below, with Google Analytics as an example, the `page` call forms an outbound request that looks like this:

![Google Analytics outbound request](images/CBdS5dO.png)

If this outbound request is not showing up in the network when you fire an `identify` call, then check the following:


## Is your web site deployed under a domain on the Public Suffix List?

The [Public Suffix List](https://publicsuffix.org/list/){:target="blank"} is a catalog of certain Internet effective top-level domains, enumerating all domain suffixes controlled by registrars.

The implications of these domain suffixes is that first party cookies cannot be set on them. Meaning, `foo.example.co.uk` can share cookie access with `bar.example.co.uk`, but `example.co.uk` should be walled off from cookies at `example2.co.uk`. The latter two domains could be registered by different owners.

Examples of domains on the Public Suffix List that are common in troubleshooting include:

- `*.github.io`
- `*.herokuapp.com`
- `*.appspot.com`


## How do I open the JavaScript console in your debugger?

The JavaScript console reveals all requests, outbound and inbound, to your browser. Additionally, you may execute valid JavaScript.

- **Chrome**: `COMMAND+OPTION+J` (Mac) or `CTRL+SHIFT+J` (Windows).
- **Firefox**: `COMMAND+OPTION+K` (Mac) or `CTRL+SHIFT+K` (Windows) and then click on the **Console** tab.
- **Safari**: `COMMAND+OPTION+I` (Mac) or `CTRL+ALT+I` (Windows) and then click on the **Console** tab.
- **IE**: `F12` and then click on the **Console** tab.

Alternatively, Segment provides the [Segment Inspector](/docs/connections/sources/catalog/libraries/website/javascript/index.html#segment-inspector), a Chrome web extension designed to enable debugging of your Segment integration in web applications that are instrumented with Analytics.js.


## Analytics.js failing to load due to Ad Blockers or Browser Privacy Settings

Segment advises against circumventing tracking blockers or browser privacy settings for client-side tracking. The user has ultimate control as to what gets loaded on the page. Segment acknowledges that this can result in some data loss in client-side tracking and suggests [workarounds](/docs/connections/sources/catalog/libraries/website/javascript/index.html#tracking-blockers-and-browser-privacy-settings) to address this issue.

## Analytics.js and Destinations not tracking query string parameters on certain Safari iOS and MacOS Versions

Due to updates in certain Safari iOS and MacOS versions, Segment's Analytics.js and Destinations tools might experience limitations in capturing query string parameters. As a result, you may notice some events missing campaign information.


## Why am I seeing a "SameSite" warning?

If you see a warning like the following, it could have one of several causes:
"A cookie associated with a cross-site resource at http://segment.com/ was set without the `SameSite` attribute [...]"

Segment correctly sets cookies with the 'SameSite' attribute with Analytics.js.

If you see this warning, it is because you previously visited http://segment.com, and are getting the warning due to unrelated cookies. To verify that this is the issue, visit your page in Incognito Mode and confirm that the warning no longer occurs. Your users won't see this warning unless they _also_  visited http://segment.com.


## Why am I seeing additional cookies on my website?

The AJS cookies being set under segment.com are first-party cookies. They are part of Segment's own implementation as well as the destination Segment uses. These cookies are not related to your implementation of Segment, and you only see them because you've visited Segment's domain using the same browser. They are sent to the writekey connected to Segment's own workspace, and are associated with the events Segment tracks when you visit segment.com.

### Known Incompatibilities with Prototype.js

If you're having issues with your destinations loading with Prototype.js, there is a [known issue that was reported](https://github.com/prototypejs/prototype/issues/338){:target="_blank"} regarding this.  In order to prevent the issues, you can preserve the original `Array.from` method without letting the prototype override it.


## Why am I getting an empty campaign object in my event payload?

Analytics.js generates a campaign object inside the context object whenever the URL contains search parameters. Without any UTM parameters, the campaign object remains empty. 

## Why do I see events with timestamps in the past or future?

You may see events with timestamp discrepancies due to manual overriding of the timestamp value, mobile apps closed or set in the background, traffic from bots, or inaccurate device or browser time. For more information, see Segment's [Common Fields Spec](/docs/connections/spec/common/#why-are-events-received-with-timestamps-set-in-the-past-or-future).

## Known issues:

[Review and contribute to these on GitHub](https://github.com/segmentio/analytics.js/issues).
