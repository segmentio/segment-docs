---
title: Upgrade to Analytics.js 2.0
strat: ajs
---

Analytics.js 2.0 is fully backward compatible with Analytics.js Classic when you use the default Segment snippet in a standard implementation. To upgrade your sources, follow the manual upgrade steps below, or see the schedule for automatic migration. As with all upgrades, Segment recommends that you start development on a non-production source to test the upgrade process and outcome, prior to upgrading your production sources.

## Manual upgrade

To upgrade a source to Analytics.js 2.0:

1. In your Segment workspace, open the **Connections** page.
2. Open the JavaScript source you will upgrade.
3. On the **Settings** tab, open the **Analytics.js** category.
4. Enable the flag for Analytics 2.0.
5. Within 5 minutes, the source receives Analytics.js 2.0. No code or tag changes required.
6. Open the Debugger to ensure that events are flowing as expected.

> info ""
> If you set `'Segment.io:' false` in the integrations object, Analytics.js 2.0 drops the event before it reaches the Source Debugger.

## Automatic migration

Analytics.js sources will upgrade to Analytics.js 2.0 on the date below, according to the account tier. On the date listed, Segment will upgrade all Analytics.js sources within the associated account tier.

| Segment Plan | Upgrade Date |
|--------------| -------------|
| Free         | June 15, 2021|
| Team         | July 6, 2021 |
| Business     | TBD          |

> info ""
> The plans and dates listed above are subject to change.

## Revert to Analytics.js Classic

Once a source moves to Analytics.js 2.0, you can follow the steps above in [Manual migration](#manual-migration) to roll back to Analytics.js Classic.

## Cases that require additional intervention

In some cases, upgrading to Analytics.js 2.0 requires manual effort beyond enabling the Analytics.js 2.0 toggle.  

### Using in-domain instrumentation CDN aliasing

If the source you intend to upgrade uses the in-domain instrumentation as well as a custom "Alias for analytics.js", then you should update the AJS snippet to the latest version (4.15.3 or higher) before you toggle on Analytics.js 2.0.

### Relying on Analytics.js Classic's `ajs_anonymous_id` cookie format  

Analytics.js 2.0 removes inbuilt quotes from cookie values, resulting in a different format for the `ajs_anonymous_id` value when compared to Analytics.js Classic.  Though you can retrieve cookie values with [standard supported functions](/docs/connections/sources/catalog/libraries/website/javascript/identity/#retrieve-the-anonymous-id), you'll need to configure your environment to accept the new format if your implementation relies on accessing the cookie value directly.

### Using a strict content security policy on the page

Analytics.js 2.0 asynchronously loads different pieces of the library as needed. If the source you're upgrading uses a strict Content Security Policy (CSP) that allows JavaScript to be downloaded from specific locations, then you need to update the CSP to account for all the pieces used for Analytics.js 2.0. Therefore, beyond allowing the main analytics.min.js script, you should allow the following paths in your CSP:
- `https://cdn.segment.com/v1/projects/<WRITE_KEY>/settings`
- `https://cdn.segment.com/analytics-next/bundles/*`
- `https://cdn.segment.com/next-integrations/integrations/*`

### Using trackLink on elements that are not links

Previously, it was possible to attach `trackLink` to any element, and a `trackLink` call would fire for that element if it wasn't a link. Now, when you attach `trackLink` to a non-link element, an additional search of that element’s children occurs for any nested links and fires track calls based on those links. If you wish to fire track calls on non-link elements that have links as children, you can use a `track` call instead.
