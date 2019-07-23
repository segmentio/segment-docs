---
rewrite: true
---

[Clearbit Enrichment](https://clearbit.com/segment) helps customers enrich and append real-time data to an email or domain, driving growth or powering your product with social data, location, job title, company size and technology.

This document was last updated on April 20th, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

**Use Cases**

* [Identify what industries drive the highest LTV with Amplitude and Clearbit](https://segment.com/recipes/ltv-by-industry-amplitude/)
* [Identify what industries drive the highest LTV with Mixpanel and Clearbit](https://segment.com/recipes/ltv-by-industry-mixpanel/)


## Getting Started

{{>connection-modes}}

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for “Clearbit Enrichment” within the Destinations Catalog and confirm the Source you’d like to connect to.
3. In your Segment UI's destination settings, enter your Clearbit **secret** API key (note: it should start with "sk_"). You can find this in the API section of your [Clearbit dashboard](https://dashboard.clearbit.com/api).

To verify that the destination has been set up correctly, check the Debugger section of your Segment Source. Assuming everything is as it should be, you should start seeing Clearbit Enrichment data populate in the `identify` events – click on the specific event you're interested in to see Clearbit Enrichment traits. These traits will now be available to other Segment destinations in your account. Notice that all Clearbit Enrichment traits are prefixed with `clearbit_` to ensure they don't conflict with existing traits.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```js
analytics.identify('pixar123', {
  email: "carl.fredricksen@gmail.com"
});
```

When you call `identify` with a `userId` and `email` trait - **the latter must be present for Clearbit Enrichment to function properly** - we'll send the Segment spec to Clearbit so that they can enrich your data. Once Clearbit enriches your data, they will send back a new `identify` call to your Segment source (Clearbit will have access to your `writeKey`) with additional traits.

You can find details on what traits Clearbit Enrichment adds and exactly what will be in the enriched `identify` call on [Clearbit's site](https://segment.clearbit.com/mapping).

## Troubleshooting

### Clearbit Enrichment data is not populating

Please double check that you have entered **the _secret key_**, not the _public key_ Clearbit provides.
