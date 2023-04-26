---
title: Single Page Applications
strat: ajs
---

While Single Page Apps (SPAs) are great for many reasons, they do require some extra consideration in order to set up client-side tracking than with a traditional webpage.

By default, the Segment analytics.js library doesn’t generate or store the referrer value. Instead, the referrer value you see in the payload is the value returned by `document.referrer` directly from the browser, and the URL value is the canonical URL on the page.

When a user navigates between pages on an SPA website, there won’t be a referrer because there is no concept of a new page since it’s all a single page load. This means that the referrer will always be the same as they were on the first page call where someone was directed to your site since the page doesn't reload. However, in order to circumvent this, you can manually set the referrer and URL in your Segment calls by updating the context object.

For example, a Page call with the referrer and URL manually set looks like this:

```js
analytics.page({
  referrer: 'https://segment.com/',
  url: 'https://segment.com/pricing/?ref=nav'
})
```

A Track call with these fields manually updated looks like this:

```js
analytics.track('Example Event', {}, {page: {
  referrer: 'https://segment.com/',
  url: 'https://segment.com/pricing/?ref=nav'
}})
```

## Tracking emulated page views

Your application should update the URL in the address bar to emulate traditional webpage navigation. Full page requests aren't made in most of these instances since the resources are loaded on initial page load. This means that the Page call in the traditional analytics.js snippet won't fire again as a user navigates around your site.

You should still place the snippet in the head of your site, but you should remove the Page call and fire it whenever you're emulating a page load. Segment recommends that you call [Page](/docs/connections/sources/catalog/libraries/website/javascript/#page) from the same block of logic that updates the view and URL path like below:

```js
// The new view has been called to render
analytics.page("Home")
```

To track more than the page field, pass those fields in as additional properties. Segment recommends that you use variables to set information about page properties, rather than hard-coding. In most SPA frameworks, you can automate this by attaching the Page call to the routing service.

## What to do with code that lives in the analytics.ready() function?

Analytics.js ships with a function called analytics.ready() which lets you make calls to the native integrations that Segment loads for you before they actually initialize. For instance, this is where you could choose to load a live chat widget only for users that you haven't yet identified with a userId.

Since the code in the head of your website is executed only on initial page load or a refresh, you can still make calls to those native tools, but they won't run on each emulated page view.

## How to track UTMs on a Single Page Application?

UTMs should be passed either in the URL and Segment will capture it automatically, or you can manually pass it into the context campaign fields.
