---
title: Google Tag Manager Destination
hide-cmodes: true
strat: google
id: 54521fd625e721e32a72eeb9
---
[Google Tag Manager](https://support.google.com/tagmanager){:target="_blank"} (GTM) is a tag management system that allows you to quickly update tags and code snippets on your website. Once you add the Tag Manager snippet to your website, you can configure tags using a web-based user interface without having to alter and deploy additional code. This reduces errors and frees you from having to involve a developer whenever you need to make changes. The Google Tag Manager Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-google-tag-manager){:target="_blank"}.

> info ""
> The Google Tag Manager destination is web only and is only compatible with Analytics.js sources. This destination is not compatible with iOS or other mobile sources. For mobile tracking, Segment recommends using the [Firebase Destination](/docs/connections/destinations/catalog/firebase/). 

> info "Consent mode"
> Google enforced consent on March 6, 2024 for European Economic Area (EEA) users. Learn more about [consent mode](/docs/connections/destinations/catalog/google-tag-manager/#consent-mode) and how to set it up. 

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Google Tag Manager" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In your Segment UI's destination settings, enter your Container ID (note: it should start with "GTM-"). You can find this in the Admin section of your [GTM dashboard](https://tagmanager.google.com/#/admin/){:target="_blank"}.
4. GTM loads on any pages where your Segment snippet is initialized and `analytics.page` is called in client-side JavaScript. Once you've turned on GTM through Segment, you can use Segment `track` events to populate the GTM `dataLayer`, and remove the GTML snippet from your page.

> info ""
> Segment recommends that you load GTM through Segment rather than loading Segment inside of GTM. When you load Segment through GTM, it limits Segment's ability to help troubleshoot.

## Page
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page('Home', {
  title: 'Welcome | My Website',
  url: 'https://mywebsite.com/'
});
```

You must call the Page method for Google Tag Manager to load. Segment includes a call to `analytics.page` in your default Segment snippet, so if you want GTM to work the same as if you've installed the GTM snippet directly, you will want to keep the Page method in your snippet.

### Tracking All Pages
When you turn on the setting to **Track All Pages** in your Optional Settings, Segment tracks events whenever you call the `page` method and sends a "Loaded a Page" event to Google Tag Manager. See the `track` section below for more info on how Segment sends events to GTM.

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

When you make a `track` call with GTM enabled through Segment, the event data is pushed to the GTM `dataLayer`.

For example, if you make this `track` call:

```javascript
analytics.track('Played Video', {
  title: 'How to Dance the Tango',
  location: 'Tango FAQ Page'
})
```

Segment sends it to the `dataLayer` as an object like this:

```json
{
  event: 'Played Video',
  title: 'How to Dance the Tango',
  location: 'Tango FAQ Page'
}
```


## Troubleshooting

### 404 Error
If you are seeing `404` error on the JavaScript console of your page and it is attributed to Google Tag Manager, it is likely that you have yet to publish your GTM container. If the issue still persists, please ensure that Google's preview mode is disabled and that the [environment variable](/docs/connections/destinations/catalog/google-tag-manager/#environment) is removed from your destination settings.


### Duplicate Events

If you have Google Ads enabled and see duplicate events in GTM, check to see if the event is set as a conversion in Google Ads. Duplicate conversions are common when you use both Google Ads and GTM, since Segment's Adwords destination initializes the gtag script with the dataLayer itself. So, when you fire a mapped event, Segment submits the payload directly to the dataLayer.

Google recommends using [transactionIds](https://support.google.com/google-ads/answer/6386790){:target="_blank"} to prevent this duplication. 


On the dataLayer, you might find the `eventModel` field, which is an internal Google field only present in events captured by the Google Ads SDK. To prevent GTM tags from creating duplicate events, you can create a GTM variable and use `eventModel` as a condition to filter events.

> warning "The following solution was shared by a Segment customer and is not officially endorsed by Segment"
> Please test this solution before implementing it with production data. If you have any questions about the GTM setup, consult the [GTM documentation](https://support.google.com/tagmanager/answer/6103657?hl=en){:target="_blank"}.

1. Create a [GTM variable](https://support.google.com/tagmanager/answer/7683056?hl=en){:target="_blank"} to capture the `eventModel` field when events hit the Google DataLayer
2. Set the variable to add the value "GTM" to the `eventModel` field when the field is not present in the event dataLayer. The format value should be set to "Convert undefined to GTM"
3. Add the newly created variable to your GTM trigger so that only events containing `eventModel = GTM` trigger the tag.



## Appendices

### UserId and AnonymousId
By default Segment pushes the `anonymousId` and `userId`(if exists) into the `dataLayer` for each `page` or `track` call. Since the `anonymousId` is created by Segment, namespaces that property in the `dataLayer` as `segmentAnonymousId`.

### Environments
If you're using an 'environment' variable for `gtm_preview` in your tag's query string, you can set that string in the **Environment** of your Optional Settings. IMPORTANT: Make sure the string includes the `gtm_auth` variable. For example, your string should look like: `env-xx&gtm_auth=xxxxx`.

### Consent mode
[Consent mode](https://support.google.com/analytics/answer/9976101?hl=en){:target="_blank"} is a feature provided by Google in the context of its products, particularly the Gtag library and Google Analytics. As of March 6, 2024, Google announced that consent mode must function for European Economic Area (EEA) users, otherwise data from EEA users won't process. 

For Google Tag Manager, consent mode settings need to be managed directly [within your GTM account](https://support.google.com/tagmanager/answer/10718549?hl=en#tag-settings){:target="_blank"}. There's no direct update from Segment for the GTM destination regarding consent mode, as it's managed within GTM tags themselves.

Segment recommends you install a consent management platform that uses the current [consent-tools wrapper](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-tools){:target="_blank"} that's outside of Google Tag Manager like [OneTrust](https://tanelytics.com/integrate-onetrust-with-google-tag-manager/){:target="_blank"}.
