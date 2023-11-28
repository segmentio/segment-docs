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

Segment also provides a Chrome web extension, [Segment Inspector](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#segment-inspector), that allows you to easily validate that you are successfully loading Analytics.js.

Solution: [Follow the Analytics.js Quickstart Guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/)

## Are you loading two instances of Analytics.js?

Note that you *cannot* load Analytics.js twice on the same page, even if you're using different write keys. You might encounter `Uncaught RangeError: Maximum call stack size exceeded`. You can conditionally set the write key based on an environment variable.

Example:
```js
var writeKey;
ENV === 'production' ? writeKey = 'A' : writeKey = 'B';
```

## Do you see events appear in your debugger?

When you reload the page, does your debugger show a new [`page`](/docs/connections/spec/page) and an [`identify`](/docs/connections/spec/identify) call? You can also check the JavaScript console in the browser and manually fire an `identify` call as such, which would show up in the debugger.

![Making an identify call](images/7Ymnh2S.gif)

If the call doesn't appear in the debugger, open up the JavaScript console and check the Network tab to see if the outbound web services requests are being initiated:

![Checking for calls in the network tab](images/d8CmIY2.png)

In the above, the `p` is a [`page`](/docs/connections/spec/page) call and the `i` is an [`identify`](/docs/connections/spec/identify) call. If you don't at least see the `p`, then check if you are loading Analytics.js correctly.


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

Alternatively, Segment provides the [Segment Inspector](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#segment-inspector), a Chrome web extension designed to enable debugging of your Segment integration in web applications that are instrumented with Analytics.js.

## Is there a size limit on requests?

Yes, 32KB per event message. Events with a payload larger than 32KB are accepted by Analytics.js, with the browser returning a `200` response from the Segment servers, but the event will be silently dropped once it enters Segment's pipeline. 

## Analytics.js failing to load due to Ad Blockers or Browser Privacy Settings

Segment advises against circumventing tracking blockers or browser privacy settings for client-side tracking. The user has ultimate control as to what gets loaded on the page. Segment acknowledges that this can result in some data loss in client-side tracking and suggests [workarounds](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#ad-blocking) to address this issue.

## Analytics.js and Destinations not tracking query string parameters on certain Safari iOS and MacOS Versions

Please be aware that due to updates in certain Safari iOS and MacOSversions, our Analytics.js and Destinations tools might experience limitations in capturing query string parameters. As a result, customers may notice some events missing campaign information.

## If Analytics.js fails to load, are callbacks not fired?

In the event that Analytics.js does not load, callbacks passed into your API calls do not fire. This is as designed, because the purpose of callbacks are to provide an estimate that the event was delivered and if the library never loads, the events won't be delivered.

## Why do I see a network request to `/m`?

In May 2018, Segment released a change to Analytics.js that collects client-side performance metrics in Analytics.js. This includes metrics like:

- When client side integrations are initialized and when they fail
- When messages are sent to client side integrations and when they fail

Segment added these metrics to proactively identify and resolve issues with individual client-side integrations. These metrics are connected to alerts that notify Segment's on-call engineers to take action on these quickly.

There should be no noticeable impact to your data flow. You may notice Analytics.js make an extra network request in the network tab to carry the metrics data to Segment's servers. This should be very infrequent since the data is sampled and batched every 30 seconds, and should not have any impact of website performance.

## How are properties with `null` and `undefined` values treated?

Segment uses the [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify){:target="blank"} method under the hood. Property values set to `null` or `undefined` are treated in accordance with the expected behaviour for the standard method:

```js
console.log(JSON.stringify({ x: null, y: 6 }));
// expected output: "{"x":null,"y":6}"

console.log(JSON.stringify({ x: undefined, y: 6 }));
// expected output: "{"y":6}"
```

## Why am I seeing a "SameSite" warning?

If you see a warning like the following, it could have one of several causes:
"A cookie associated with a cross-site resource at http://segment.com/ was set without the `SameSite` attribute [...]"

Segment correctly sets cookies with the 'SameSite' attribute with Analytics.js.

If you see this warning, it is because you previously visited http://segment.com, and are getting the warning due to unrelated cookies. To verify that this is the issue, visit your page in Incognito Mode and confirm that the warning no longer occurs. Your users won't see this warning unless they _also_  visited http://segment.com.


### Can I overwrite the context fields?

Yes.  This can be useful if some of these fields contain information you don't want to collect.

For example, imagine that your website allows users to view a receipt for purchases at the URL `https://mywebsite.com/store/purchases`.  Your users click a link that redirects to that specific URL, your app sets a `receiptId` in the query string, and returns the appropriate receipt.  You also send a Track call to Segment from this page.

Since this `receiptId` might contain sensitive information, you can prevent the context field `page.url` from being included in your Track call by overwriting the field in the `options` parameter, as in the example below:

```js
analytics.track("Receipt Viewed", {}, {
    page: {
        url: null
    }
})
```
This works for any [context field](/docs/connections/spec/common/#context) that Segment automatically collects.

When working with Page calls, you can overwrite context fields by following the same instructions above. However, because the `context.page` fields are also available in the `properties` parameter for page calls, you must also prevent the same fields in the `properties` parameter from being included in your Page call. The example below will allow you to overwrite `url` available in context field `page.url` and properties parameter:

```js
analytics.page("Receipt Page", {
      url: null,
},{
    page: {
        url: null
    }
})
```


### What is the impact of exposing the source's write keys?

For the Segment script to work in the browser, you need to expose the write key in order for client-side tracking to work. Segment's library architecture requires the write key to be exposed, similar to that of other major tools like Google Analytics, Mixpanel, Kissmetrics, Hubspot, and Marketo.

If you see any unusual behavior associated with your write key, you can generate a new key. Navigate to **Connections > Sources** and select your source. On the **Settings** tab, go to the **API Keys** section, and click **Generate New Key**.

If you want to hide the write key, you can use Segment's [HTTP Tracking API source](/docs/connections/sources/catalog/libraries/server/http-api/) or one of the other [server-side libraries](/docs/connections/sources/catalog/#server).

### Can I add context fields that do not already exist?

Yes. Similar to overwriting context, you can add context fields by passing them into the options object as the third argument of the event call. For example, the analytics.js library does not automatically collect location information. To add this into the context object, pass it into the third argument as in the example below:

```js
analytics.track("Order Completed", {}, {
    location: {
        latitude: '39.7392',
        longitude: '104.9903'
    }
})
```

> info ""
> You must pass the context object with the call, event if it's empty, as shown by the empty object in the example above.

Some destinations accept properties only. As a result, custom context fields you add may not forward to these destinations.

### Why am I seeing additional cookies on my website?

The AJS cookies being set under segment.com are first-party cookies. They are part of Segment's own implementation as well as the destination Segment uses. These cookies are not related to your implementation of Segment, and you only see them because you've visited Segment's domain using the same browser. They are sent to the writekey connected to Segment's own workspace, and are associated with the events Segment tracks when you visit segment.com.


## Known issues:

[Review and contribute to these on GitHub](https://github.com/segmentio/analytics.js/issues)
