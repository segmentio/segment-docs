---
title: 'Bucket Web (Actions) Destination'
hidden: true
id: 656dc9330d1863a8870bacd1
published: true
beta: true
versions:
  - name: "Bucket (Classic)"
    link: '/docs/connections/destinations/catalog/bucket'
---

{% include content/plan-grid.md name="actions" %}

[Bucket](https://bucket.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="blank"} is a feature-focused analytics software that empowers software teams with a repeatable approach to shipping features that satisfy customers.

Bucket maintains this destination. For any issues with the destination, [contact the Bucket Support team](mailto:support@bucket.co).


> warning ""
> If you are using both the Bucket Web (Actions) destination and the server side [Bucket destination](/docs/connections/destinations/catalog/bucket/) on the same source, avoid duplicate event tracking by disabling the "Track Event" mapping in Bucket Web (Actions).


## Benefits of Bucket Web (Actions) compared to Bucket Classic

Bucket Web (Actions) provides the following benefits over the classic Bucket destination:

- **Clearer mapping of data**. Actions-based destinations let you define the mapping between the data Segment receives from your source and the data Segment sends to the destination.
- Automatically enables [Live Satisfaction](https://bucket.co/live-satisfaction){:target="_blank"} prompts in your app, giving you fully-automated customer satisfaction scores and feedback on your features.


## Getting started

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for `"Bucket Web"` in the Destinations Catalog, and select the `Bucket Web (Actions)` destination.
3. Choose which source should send data to the Bucket destination.
4. Go to [Bucket's Settings](https://app.bucket.co){:target="blank"} and find and copy the Tracking Key on the Tracking page.
5. Enter the Tracking Key as Tracking Key in the "Bucket Web (Actions)" destination settings in Segment.

{% include components/actions-fields.html %}

## Content security policies (CSP)

If you are running with strict Content Security Policies active on your website, you will need to enable these directives in order to use this destination:

| Directive       | Values                          | Module            | Reason                                                                                                                                   |
| --------------- | ------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| script-src-elem | https://cdn.jsdelivr.net        | bootstrap         | Loads the Bucket tracking SDK from a CDN                                                                                                 |
| connect-src     | https://tracking.bucket.co      | tracking          | Used for all tracking methods: `analytics.identify()`, `analytics.group()` and `analytics.track()`                                       |
| connect-src     | https://livemessaging.bucket.co | live satisfaction | Server sent events from the Bucket Live Feedback service, which allows for automatically collecting feedback when a user used a feature. |
| style-src       | 'unsafe-inline'                 | feedback UI       | The feedback UI is styled with inline styles. Not having this directive results unstyled HTML elements.                                  |

As HTTP-header:

```http
Content-Security-Policy: script-src-elem https://cdn.jsdelivr.net; connect-src https://livemessaging.bucket.co https://tracking.bucket.co; style-src 'unsafe-inline'
```

As `<meta>`-tag:

```html
<meta http-equiv="Content-Security-Policy" content="script-src-elem https://cdn.jsdelivr.net; connect-src https://livemessaging.bucket.co https://tracking.bucket.co; style-src 'unsafe-inline'">
```
