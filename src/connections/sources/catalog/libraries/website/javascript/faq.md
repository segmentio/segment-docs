---
title: Analytics.js Frequently Asked Questions
strat: ajs
---

## Is there a size limit on requests?

Yes, the limit is 32KB per event message. Events with a payload larger than 32KB are accepted by Analytics.js and Segment servers return a `200` response , but the event is silently dropped once it enters Segment's pipeline. 

## If Analytics.js fails to load, are callbacks not fired?

In the event that Analytics.js does not load, callbacks passed into your API calls do not fire. This is as designed, because the purpose of callbacks are to provide an estimate that the event was delivered and if the library never loads, the events won't be delivered.

## Why do I see a network request to `/m`?

In May 2018, Segment began collecting client-side performance metrics in Analytics.js. This includes metrics like:

- When client side integrations are initialized and when they fail
- When messages are sent to client side integrations and when they fail

Segment added these metrics to proactively identify and resolve issues with individual client-side integrations. These metrics are connected to alerts that notify Segment's on-call engineers to take action on these quickly.

There should be no noticeable impact to your data flow. You may notice Analytics.js make an extra network request in the network tab to carry the metrics data to Segment's servers. This extra network request is not made frequently, since the data is sampled and batched every 30 seconds.

## How are properties with `null` and `undefined` values treated?

Segment treats property values set to `null` as null values and drops events set to`undefined`.

For example:

```js
console.log(JSON.stringify({ x: null, y: 6 }));
// expected output: "{"x":null,"y":6}"

console.log(JSON.stringify({ x: undefined, y: 6 }));
// expected output: "{"y":6}"
```
Segment uses the [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify){:target="blank"} method under the hood. 
## Can I overwrite the context fields?

Yes. This can be useful if some of these fields contain information you don't want to collect.

For example, imagine that your website allows users to view a receipt for purchases at the URL `https://mywebsite.com/store/purchases`.  Your users click a link that redirects to that specific URL, your app sets a `receiptId` in the query string, and returns the appropriate receipt.  You also send a Track call to Segment from this page.

Since this `receiptId` might contain sensitive information, you can prevent the context field `page.url` from being included in your Track call by overwriting the field in the `options` parameter, as in the following example:

```js
analytics.track("Receipt Viewed", {}, {
    page: {
        url: null
    }
})
```
This works for any [context field](/docs/connections/spec/common/#context) that Segment automatically collects.

When working with Page calls, you can overwrite context fields by following the above instructions. However, because the `context.page` fields are also available in the `properties` parameter for page calls, you must also prevent the same fields in the `properties` parameter from being included in your Page call. Use the code in the following example to overwrite `url` available in context field `page.url` and properties parameter:

```js
analytics.page("Receipt Page", {
      url: null,
},{
    page: {
        url: null
    }
})
```

## Can I add context fields that do not already exist?

Yes. You can add context fields by passing them into the options object as the third argument of the event call. For example, the analytics.js library does not automatically collect location information, but you can add it to the context object. To add location information into the context object, pass it into the third argument as in the following example:

```js
analytics.track("Order Completed", {}, {
    location: {
        latitude: '39.7392',
        longitude: '104.9903'
    }
})
```

> info ""
> You must pass the context object with the call, even if it's empty.

Some destinations accept properties only. As a result, custom context fields you add may not forward to these destinations.

## What is the impact of exposing the source's write keys?

Segment's library architecture requires you to expose the write key for client-side tracking to work. Other major tools, like Google Analytics, Mixpanel, Kissmetrics, Hubspot, and Marketo, also require you to expose your write key.

If you see any unusual behavior associated with your write key, generate a new key immediately. To generate a new key, navigate to **Connections > Sources** and select your source. On the **Settings** tab, go to the **API Keys** section and click **Generate New Key**.

If you want to hide the write key, you can use Segment's [HTTP Tracking API source](/docs/connections/sources/catalog/libraries/server/http-api/) or one of the other [server-side libraries](/docs/connections/sources/catalog/#server).

## Will Google Chrome's third-party cookie changes impact Segment Analytics.js?

No, Analytics.js isn't affected by this change. Google's [third-party cookie deprecation](https://developers.google.com/privacy-sandbox/3pcd){:target="_blank"} only blocks third-party cookies, or cookies set by external services. Analytics.js creates first-party cookies, which are cookies created and stored by the website an end-user is browsing. 


## Does Segment support using strict Content Security Policy (CSP) on the page?

If you're using a security policy that allows JavaScript downloads from specific locations using nonces, then you'll need to update the CSP to include all Segment domains. In addition to allowing the main `analytics.min.js` script, you should also allow the following paths in your CSP:
- `https://cdn.segment.com/v1/projects/<WRITE_KEY>/settings`
- `https://cdn.segment.com/analytics-next/bundles/*`
- `https://cdn.segment.com/next-integrations/integrations/*`

Your CSP may also require allowlisting approved domains, in which case you'll want to allow the following endpoints: 
- `api.segment.io`
- `cdn.segment.com`

You'll also need to modify the Segment script with your `nonce` tag, which should match the value specified in your Content Security Policy.

> info ""
> Since Segment interacts with several integrations, support surrounding Content Security Policy issues is limited.

## How is the referrer value set?

The Analytics.js library sets the `context.page.referrer` value from the [`window.document.referrer` property](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer){:target="_blank"} set in the browser. If you notice unexpected referrer values reaching Segment, check how this value is being set on your website.

## Are there any rate limits in place for the CDN settings endpoint?

There are no rate limits in place for the CDN settings endpoint.




