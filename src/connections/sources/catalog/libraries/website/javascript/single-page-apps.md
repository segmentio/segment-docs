---
title: Single Page Applications
---

While Single Page Apps (SPAs) are great for many reasons, they do require some extra consideration in order to set up client-side tracking than with a traditional webpage.

By default, the Segment analytics.js library doesn’t generate or store the referrer value. Instead, the referrer value you see in the payload is the value returned by `document.referrer` directly from the browser, and the URL value is the canonical URL on the page.

When a user navigates between pages on an SPA website, there won’t be a referrer because there is no concept of a new page since it’s all a single page load. This means that the referrer will always be the same as they were on the first page call where someone was directed to your site since the page doesn't reload. However, in order to circumvent this, you can manually set the referrer and URL in your Segment calls by updating the context object.

For example, a `page` call with the referrer and URL manually set would look like this:

```
analytics.page({
  referrer: 'https://segment.com/',
  url: 'https://segment.com/pricing/?ref=nav'
})
```

A `track` call with these fields manually updated would look like this:

```
analytics.track('Example Event', {}, {page: {
  referrer: 'https://segment.com/',
  url: 'https://segment.com/pricing/?ref=nav'
}})
```

### Tracking emulated page views

Your application should be updating the URL in the address bar to emulate traditional webpage navigation (if you aren't then please do that first!) but full page requests aren't made in most of these instances since the resources have already loaded on initial page load. This means that the `analytics.page()` call in the traditional analytics.js snippet won't fire again as a user navigates around your site.

You should still place the snippet in the head of your site, but you should remove the `page` call and fire it whenever you're emulating a page load. Our recommendation is to call [analytics.page()](https://segment.com/docs/libraries/analytics.js/#page) from the same block of logic that is updating the view and URL path like below:

```
// The new view has been called to render
analytics.page("Home")
```

If you want to track more than the page field, you can simply pass those fields in as additional properties . Also, instead of hard-coding in the names of the page or even the page properties, you can use variables that grab that information. In most SPA frameworks, you can automate this by attaching the `page` call to the routing service.

### What to do with code that lives in the analytics.ready() function?

Analytics.js ships with a function called analytics.ready() which lets you make calls to the native integrations that Segment loads for you before they actually initialize. For instance, this is where you could choose to load a live chat widget only for users that you haven't yet identified with a userId.

Since the code in the head of your website will be executed only on initial page load or a refresh, you can still make calls to those native tools, but you need to be aware that it won't be executed on each emulated page view.
