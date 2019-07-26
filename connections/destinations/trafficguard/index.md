---
rewrite: true
---
[TrafficGuard](https://trafficguard.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) detects, mitigates, and reports on ad fraud before it hits digital advertising budgets. Three formidable layers of protection block both general invalid traffic (GIVT) and sophisticated invalid traffic (SIVT) to ensure that digital advertising results in legitimate advertising engagement.

This destination is maintained by TrafficGuard.

_**NOTE:** The TrafficGuard Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on March 4, 2019. If you are interested in joining their beta program or have any feedback to help improve the TrafficGuard Destination and its documentation, please [let  their team know](mailto:support@trafficguard.ai)!_

**Use Cases**

* [Protect your website and apps from fraud and bots with TrafficGuard](https://segment.com/recipes/trafficguard-website-app-protection/)

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "TrafficGuard" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find in your property in the [TrafficGuard dashboard](https://dash.trafficguard.ai/dashboard).

![](./images/trafficguard.png)

4. Calls will now be visible in TrafficGuard dashboards in real-time.

NOTE: For TrafficGuard to successfully validate calls, `context.ip` and `context.userAgent` values as well as either `context.campaign.source`, `context.app.name` or `properties.url` will need to be sent. Calls without those values will return an error.


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to TrafficGuard as a `pageview` event.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to TrafficGuard as a `pageview` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

The following `track` calls will be sent to TrafficGuard as events.

| Segment Call | TrafficGuard event |
| -------- | -------- |
| Application Installed | `install` |
| Application Opened, Email Opened | `open` |
| Products Searched | `search` |
| Product Viewed, Product Reviewed, Promotion Viewed | `viewcontent` |
| Product Added | `Add` |
| Checkout Started | `checkout` |
| Product Shared, Cart Shared | `share` |

All other calls will be recorded as `pageview` events until TrafficGuard supports ad hoc event types.

---
