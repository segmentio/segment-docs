---
title: Crazy Egg Destination
rewrite: true
id: 54521fd525e721e32a72eea7
---
[Crazy Egg](https://www.crazyegg.com/){:target="_blank"} is a user testing tool that gives you heatmaps, clickmaps and scrollmaps of your visitors interacting with your site. It helps you learn where your users are having trouble. The Crazy Egg Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-crazy-egg){:target="_blank"}.

## Getting Started



1. From the Segment web app, click **Catalog**.
2. Search for "Crazy Egg" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Navigate to the [set up page within your Crazy Egg UI](https://app.crazyegg.com/v2/install/manually){:target="_blank"} and copy the Account Number which should be a series of 8-9 numbers in bold.
4. Enter this in the Segment app's destination settings under "Account Number".
5. Enter the URL of the page you want to use heatmap tracking on to complete the set up process.

Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading the Crazy Egg snippet and recording heatmap data.

You can navigate to the [Crazy Egg Dashboard](https://app.crazyegg.com/v2/dashboard){:target="_blank"} to track the data.

> success ""
> It may take up to 24-48 hours for Segment data to appear in Crazy Egg.



## Page
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:
```javascript
analytics.page();
```
As this is automatically included in the `analytics.js` snippet by default, you don't need to take any further action. If you remove this default page call for whatever reason, Crazy Egg will not be able to record any heatmaps.

> **Note:** Since Crazy Egg only records data about mouse clicks and scrolls, it does not collect any of the data represented by other standard Segment API methods.

## Troubleshooting

### I can't map user variables
The current Crazy Egg Destination doesn't support mapping of user variables out of the box. You will need to add your own additional JavaScript as specified in Crazy Egg's [Custom User Variables](https://support.crazyegg.com/hc/en-us/articles/360054584474-Custom-User-Variables){:target="_blank"} documentation.

{% include content/client-side-script-unverified.md %}
