---
title: Google Tag Manager Destination
hide-cmodes: true
strat: google
id: 54521fd625e721e32a72eeb9
---
[Google Tag Manager](https://support.google.com/tagmanager) (GTM) is a tag management system that allows you to quickly and easily update tags and code snippets on your website or mobile apps. Once you add the Tag Manager snippet to your website or mobile app, you can configure tags using a web-based user interface without having to alter and deploy additional code. This reduces errors and frees you from having to involve a developer whenever you need to make changes. The Google Tag Manager Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-google-tag-manager).


## Getting Started


1. From the Segment web app, click **Catalog**.
2. Search for "Google Tag Manager" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In your Segment UI's destination settings, enter your Container ID (note: it should start with "GTM-"). You can find this in the Admin section of your [GTM dashboard](https://tagmanager.google.com/#/admin/).
4. GTM loads on any pages where your Segment snippet is initialized and `analytics.page` is called in client-side JavaScript. Once you've turned on GTM through Segment, you can use Segment `track` events to populate the GTM `dataLayer`, and remove the GTML snippet from your page.

**Notes**
* Segment recommends that you load GTM through Segment rather than loading Segment inside of GTM.
* Be sure to "publish" your GTM container in GTM before trying to load it through Segment, otherwise your container URL will return a 404 error.


## Page
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page('Home', {
  title: 'Welcome | My Website',
  url: 'https://mywebsite.com/'
});
```

You must call the Page method for Google Tag Manager to load. Segment includes a call to `analytics.page` in your default Segment snippet, so if you haven't removed that, GTM will work the same as if you installed the GTM snippet directly.

### Tracking All Pages
When you turn on the setting to **Track All Pages** in your Optional Settings, Segment tracks events whenever you call the `page` method and send a "Loaded A Page" event to Google Tag Manager. See the `track` section below for more info on how Segment sends events to GTM.

### Named Page Events
If you include a `name` parameter in your `page` calls and turn on the setting to **Track Named Pages** in your Optional Settings, Segment passes on an event to GTM for that page. For example, `analytics.page('Sign up')` would translate to a "Viewed Sign up Page" event. See the `track` section below for more info about how Segment sends events to GTM.

### Categorized Page Events
If you include a `category` parameter in your `page` calls and turn on the setting to **Track Categorized Pages** in your Optional Settings, Segment passes an event to GTM for that page. For example, `analytics.page('Docs', 'Index')` would translate to a "Viewed Docs Index Page" event. See the `track` section below for more info about how Segment sends events to GTM.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
```

When you make a Track call in with GTM enabled through Segment, the event data is pushed to the GTM `dataLayer`.

For example, if you make this `track` call:

```javascript
analytics.track('Played Video', {
  title: 'How to Dance the Tango',
  location: 'Tango FAQ Page'
})
```

Segment it to the `dataLayer` as an object like this:

```json
{
  event: 'Played Video',
  title: 'How to Dance the Tango',
  location: 'Tango FAQ Page'
}
```


## Troubleshooting

### 404 Error

If you are seeing `404` error on the JavaScript console of your page and it is attributed to Google Tag Manager, it is likely that you have yet to publish your GTM container.


## Appendices

### UserId and AnonymousId
By default Segment pushes the `anonymousId` and `userId`(if exists) into the `dataLayer` for each `page` or `track` call. Since the `anonymousId` is created by Segment, namespaces that property in the `dataLayer` as `segmentAnonymousId`.

### Environments
If you're using an 'environment' variable for `gtm_preview` in your tag's query string, you can set that string in the **Environment** of your Optional Settings. IMPORTANT: Make sure the string includes the `gtm_auth` variable. For example, your string should look like: `env-xxxxx&gtm_auth=xxxxx`.
