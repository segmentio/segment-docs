---
title: Clearbit Reveal Destination
rewrite: true
id: 57e0726680412f644ff36883
---
[Clearbit Reveal](https://clearbit.com/segment) helps customers instantly match IP addresses with company names, and see full profiles for all site visitors. It turns your anonymous web traffic into a full company profile — complete with industry, employee count, funding details, and much more. You can find a list of the different attributes you can collect with Clearbit [here](https://clearbit.com/attributes).

## Getting Started

{% include content/connection-modes.md %}

Setup within Segment:
1. From the Segment web app, click **Catalog**.
2. Search for "Clearbit Reveal" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In your Segment Settings UI, enter your Clearbit **secret** API key (note: it should start with "sk_"). You can find this in the API section of your [Clearbit dashboard](https://dashboard.clearbit.com/api).

Setup within Clearbit:
1. From your [Clearbit dashboard](https://dashboard.clearbit.com/integrate) click on the [Reveal product](https://dashboard.clearbit.com/integrate/reveal).
2. Click on the Segment integration tile and click to 'Enable with Segment'.
3. Select the source that you connected Clearbit Reveal to as a destination in the above Segment set up instructions.
4. CLick 'Send Data'.

To verify that the destination has been set up correctly, send a page event **that includes an IP address**, check the Debugger section of your Segment Source. Assuming everything is as it should be, you should start seeing Clearbit Reveal data populate in an `identify` event – click on the specific event you're interested in to see Clearbit Reveal traits. These traits will now be available to other Segment destinations in your account. Notice that all Clearbit Reveal traits are prefixed with `reveal_` to ensure they don't conflict with existing traits. Clearbit will also send a `track` event for 'enrichment_provider'.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page('Home', {
  title: 'Welcome | My Website',
  url: 'https://mywebsite.com/'
});
```

When you call `page` event from Analytics.js, Clearbit Reveal will send back an enriched `identify` call from their servers. For this to work you **must** send an IP address in the context of your Page calls. Our Analytics.js library collects the IP address for you, otherwise you need to manually retrieve and set it in `context.ip`. The Clearbit Reveal Destination is a server-side destination so you will need to use your secret key. This enriched identify call will only arrive in downstream destinations that are configured to receive server-side `identify` events.

You can find details on what traits Clearbit adds and exactly what will be in the enriched Identify call on [Clearbit's site](https://segment.clearbit.com/mapping) and full documentation on the Reveal API in the [docs here](https://clearbit.com/docs#reveal-api).

**Notes**
1. Clearbit Reveal attributes will not populate on every single identify event as Reveal will not have 100% match rates for your traffic.
2. Enriched `identify` events will only be sent back after the first `page` call per visitor, not with every subsequent `page` call.


## Troubleshooting

### Clearbit Enrichment data is not populating
Double check that you have entered **the _secret key_**, not the _public key_ Clearbit provides. Also check that you included an IP address in your request.

### Marketo not receiving enriched data
By default, Clearbit Reveal information will not be sent to Marketo. If you are interested in passing Clearbit data to Marketo, contact <a href="mailto:support@clearbit.com?subject=Send%20Clearbit%20Reveal%20data%20to%20Marketo">Clearbit Support</a>.
