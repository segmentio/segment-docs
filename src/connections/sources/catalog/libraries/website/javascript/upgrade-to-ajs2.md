---
title: Upgrade to Analytics.js 2.0
strat: ajs
---

Analytics.js 2.0 is fully backward compatible with Analytics.js Classic when you use the default Segment snippet in a standard implementation. To upgrade your sources, follow the manual upgrade steps below, or see the schedule for automatic migration. As with all upgrades, Segment recommends that you start development on a non-production source to test the upgrade process and outcome, prior to upgrading your production sources.

> warning "Deprecation of Analytics.js Classic"
> Segment ended support and maintenance for Analytics.js Classic on August 31, 2022. On February 28, 2023, Segment will remove access to Analytics.js Classic, and all Analytics.js Classic sources and any other source that is loading Analytics.js Classic will upgrade to Analytics.js 2.0.
> <br><br>Upgrade to Analytics.js 2.0 before access ends for Analytics.js Classic. See the [Analytics.js 2.0 docs](/docs/connections/sources/catalog/libraries/website/javascript/) to learn more about the new source.

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

On February 28, 2023, all Analytics.js Classic sources will automatically upgrade to Analytics.js 2.0.

## Revert to Analytics.js Classic

Once a source moves to Analytics.js 2.0, you can follow the steps above in [Manual migration](#manual-migration) to roll back to Analytics.js Classic.

## Cases that require additional intervention

In some cases, upgrading to Analytics.js 2.0 requires manual effort beyond enabling the Analytics.js 2.0 toggle.

### Using in-domain instrumentation CDN aliasing

If the source you intend to upgrade uses the in-domain instrumentation as well as a custom "Alias for analytics.js", then you should update the Analytics.js snippet to the latest version (4.15.3 or higher) before you toggle on Analytics.js 2.0.

### Using a mix of Analytics.js Classic and 2.0 sources

If you're using a mix of Analytics.js Classic and 2.0 sources, the classic source won't be able to use the anonymous ID set by Analytics.js 2.0. In order to fix this, update all sources to 2.0.

### Relying on Analytics.js Classic's `ajs_anonymous_id` cookie format

Analytics.js 2.0 removes inbuilt quotes from cookie values, resulting in a different format for the `ajs_anonymous_id` value when compared to Analytics.js Classic.  Though you can retrieve cookie values with [standard supported functions](/docs/connections/sources/catalog/libraries/website/javascript/identity/#retrieve-the-anonymous-id), you'll need to configure your environment to accept the new format if your implementation relies on accessing the cookie value directly.

If you configured different sources for different subdomains of your website, switch them to Analytics 2.0 at the same time. Switching them at the same time ensures that subdomain tracking won't break. In cases when you need to gradually update to Analytics 2.0, the `utility` [plugin](/docs/connections/sources/catalog/libraries/website/javascript/#example-plugins) can help match the `ajs_anonymous_id` cookie format and ensure that users are consistently identified across your subdomains.

### Using a strict content security policy on the page

Analytics.js 2.0 asynchronously loads different pieces of the library as needed. If the source you're upgrading uses a strict Content Security Policy (CSP) that allows JavaScript to be downloaded from specific locations, then you need to update the CSP to account for all the pieces used for Analytics.js 2.0. Therefore, beyond allowing the main analytics.min.js script, you should allow the following paths in your CSP:
- `https://cdn.segment.com/v1/projects/<WRITE_KEY>/settings`
- `https://cdn.segment.com/analytics-next/bundles/*`
- `https://cdn.segment.com/next-integrations/integrations/*`

### Using trackLink on elements that are not links

Previously, it was possible to attach `trackLink` to any element, and a `trackLink` call would fire for that element if it wasn't a link. Now, when you attach `trackLink` to a non-link element, an additional search of that element's children occurs for any nested links and fires track calls based on those links. If you wish to fire track calls on non-link elements that have links as children, you can use a `track` call instead.

### Using a custom proxy

Analytics.js 2.0 loads new files not usually loaded with Analytics.js Classic, so you'll also need to make sure these new files are considered in your proxy configuration. If the new files are not considered, Analytics.js 2.0 falls back to `cdn.segment.com`. You'll have to proxy the rest of the files used by Analytics.js 2.0 using a scheme similar to Segment's CDN. You have two options:

**Option 1**: Update the proxy so that:

`https://cdn.yourdomain.com/analytics.js/*` maps to `https://cdn.segment.com/analytics.js/*`
`https://cdn.yourdomain.com/analytics.js/*` maps to `https://cdn.segment.com/v1/*`
`https://cdn.yourdomain.com/analytics-next/*` maps to `https://cdn.segment.com/analytics-next/*`
`https://cdn.yourdomain.com/next-integrations/*` maps to `https://cdn.segment.com/next-integrations/*`

**Option 2**: Map `cdn.yourdomain.com/*` to `https://cdn.segment.com/*`

After that, serve AJS from `https://cdn.yourdomain.com/analytics.js/v1/<YOUR_WRITE_KEY>/analytics.min.js` and everything will be fetched from your proxy.

## FAQs

### I'm already using Analytics 2.0, why am I still receiving the message to upgrade?
It's possible that a different source you're using uses an older version of Analytics.js. A way to see which sources are on which versions is to go to the source overview page, then filter on the Analytics.js version.

It's also possible that you have used a write key from another source type (like Ruby) to instrument your JavaScript source. To upgrade these sources, you may need to create a new JavaScript source and replace the write key.

### Should I expect any glitches or downtime when switching to Analytics 2.0?
Segment expects no downtime or glitches when switching to A.js 2.0.

### How can I validate that my source is using Analytics.js 2.0?
If you're using A.js 2.0, the library field will look like the code snippet below ( `next`  will be part of the version field):

```js
"library": {
      "name": "analytics.js",
      "version": "next-1.XX.X"
      }
```

### Are there specific things to test from an engineering point of view?
Like any software upgrade, Segment advises you to start with one source, or a development or staging source. Then you should ensure that traffic is flowing the way you expect it to and that it goes to the appropriate destinations.

### What happens if I don't upgrade by the end of service date?
 On February 28, 2023, all Analytics.js Classic sources will automatically upgrade to Analytics.js 2.0, and any other source that is loading Analytics.js Classic will upgrade to Analytics.js 2.0.
