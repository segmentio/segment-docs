---
title: Upgrade to Analytics.js 2.0
strat: ajs
---

Analytics.js 2.0 is fully backward compatible with Analytics.js Classic. To upgrade your sources, follow the manual upgrade steps below, or see the schedule for automatic migration. As with all upgrades, Segment recommends that you start development on a non-production source to test the upgrade process and outcome, prior to upgrading your production sources.

## Manual upgrade

To upgrade a source to Analytics.js 2.0:

1. In your Segment workspace, open the **Connections** page.
2. Open the Javascript source you will upgrade.
3. On the **Settings** tab, open the **Analytics.js** category.
4. Enable the flag for Analytics 2.0.
5. Within 5 minutes, the source receives Analytics.js 2.0. No code or tag changes required.
6. Open the Debugger to ensure that events are flowing as expected.

## Automatic migration

Analytics.js sources will upgrade to Analytics.js 2.0 on the date below, according to the account tier. On the date listed, Segment will upgrade all Analytics.js sources within the associated account tier.

| Segment Plan | Upgrade Date |
|--------------| -------------|
| Free         | June 15, 2021|
| Team         | July 6, 2021 | 
| Business     | Q3, 2021     |

> info ""
> The plans and dates listed above are subject to change.

## Revert to Analytics.js Classic

Once a source moves to Analytics.js 2.0, you can follow the steps above in [Manual migration](#manual-migration) back to  roll back to Analytics.js Classic.

## Cases that require additional intervention

There are two cases where upgrading to Analytics.js 2.0 requires manual effort beyond enabling the Analytics.js 2.0 toggle.

### When using in-domain instrumentation CDN aliasing

If the source you intend to upgrade uses the in-domain instrumentation as well as a custom "Alias for analytics.js", then you should update the AJS snippet to the latest version (4.13.2 or higher) before you toggle on Analytics.js 2.0. 

### When using a strict content security policy on the page 

Analytics.js 2.0 asynchronously loads different pieces of the library as needed. If the source you're upgrading uses a strict Content Security Policy (CSP) that allows Javascript to be downloaded from specific locations, then you need to update the CSP to account for all the pieces used for Analytics.js 2.0. Therefore, beyond allowing the main analytics.min.js script, you should allow the following paths in your CSP: 
- `https://cdn.segment.com/v1/projects/<WRITE_KEY>/settings`
- `https://cdn.segment.com/analytics-next/bundles/*` 
- `https://cdn.segment.com/next-integrations/integrations/*`
