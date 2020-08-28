---
title: Adobe Analytics Best Practices
strat: adobe
---

This page contains best practices and tips for setting up and testing Adobe Analytics with Segment.

## Validating by Data by Component

The following list contains tools you can use to validate data coming from Segment and going to each different Adobe Analytics component

- **Analytics.js** - [Adobe Experience Cloud Debugger](https://chrome.google.com/webstore/detail/adobe-experience-cloud-de/ocdmogmohccmeicdhlhhgepeaijenapj) and Chrome Developer Tools
- **Other Segment server libraries** - Segment's in-app [Event Tester Tool](/docs/connections/test-connections/)
- **iOS Device mode** - Charles Proxy, DEBUG mode
- **Android Device Mode** - Charles Proxy, VERBOSE logging


## Reducing API calls by sending events on page or screen

You might want to associate Adobe `<events>` with Segment page or screen events to reduce the number of API calls Segment sends to Adobe Analytics.

For example, instead of sending the Product Viewed event as a `track` to AA, you can trigger a Segment `page` call with an `integrations.Adobe Analytics.events` passed in, with an array of the Adobe events to send:

```javascript
"integrations": {
        "Adobe Analytics": {
          "events": ["event35", "scAdd"]
        }
    }
```

When the integration option `events` is passed in, Segment maps the events and sends them using the `<events>` tag. In the example above, the output would be `<events>event35, scAdd</events>`.

_Considerations_

- Segment does not automatically map to Adobe Pre-Defined events on `page` or `screen` calls
- You must change your implementation to pass integration: AA: false on the event you do not want duplicated.

```javascript
"integrations": {
    "Adobe Analytics": false
    }
```

## Setting custom linkTypes, linkNames and linkUrls

If you are setting up the Adobe Analytics destination in cloud-mode, you can pass in custom `linkTypes`, `linkNames` and `linkURLs`.

**Note**: If you pass in the `visitorId` in a destination-specific `integration` object in your Segment Page or Track events, the `visitorId` passed persists on Page or Track calls that occur after an Identify call. This effectively supersedes the `visitorId` variable Segment would set to your `userId` after an Identify call.

We know this is daunting territory, so don't hesitate to [contact us directly for guidance](https://segment.com/help/contact/)!

### Setting the event linkType

By default, Segment's integration with Adobe Analytics automatically sets an events `linkType` as a custom link `o` for 'other' within the `s.tl()` call. To set the `linkType` of an event as download or exit link, you can pass in a different value in the `integrations.adobe analytics` object of your Segment event payload.

A value of `d` or `D` maps to "download" links, and a value of `e` or `E` maps to "exit" links

The example below shows of how you would set a Segment event as a download link type:

```javascript
"integrations": {
    "Adobe Analytics": {
      "linkType": "d"
    }
}
```

If you pass in Segment events with a download (d or D) linkType, they appear the Download link report in your Adobe Analytics reporting suite. If you pass in Segment events with an "exit" (e or E) linkType, they appear in the Exit link report in your Adobe Analytics reporting suite. Finally, if you pass in Segment events with a value of `o` or `O`, or _no_ linkType in the `integration.Adobe Analytics` object, they appear in the custom link report in your Adobe Analytics reporting suite.

### Setting the event linkName

To pass in a custom LinkName to Adobe Analytics, pass it as a string in the `integrations.Adobe Analytics` object of your Segment event. The example below sets the custom linkname to "Click me".

```javascript
"integrations": {
        "Adobe Analytics": {
          "linkName": "Click me"
        }
    }
```

If you don't specify a custom linkName in the integration specific object in the payload, Segment defaults to mapping `linkName` to the value from `(context.page.url)`. If no URL is present, Segment sets `linkName` to `No linkName provided`.

> note ""
> **Note**: If you enable the `useLegacyLinkName` setting in the UI, Segment prepends `Link Name -` to the value you specified in the integration-specific object.

### Setting the event LinkURL

To pass a custom LinkUrl to Adobe Analytics, pass it as a string in the `integrations.Adobe Analytics` object of your Segment event. The example below sets the custom linkURLs to "example.com/example".

```javascript
"integrations": {
        "Adobe Analytics": {
          "linkUrl": "example.com/example"
        }
    }
```

If you don't specify a custom linkUrl in the integration specific object in the payload, Segment defaults to mapping `linkUrl` to the `(context.page.url)`. If no is URL present, Segment sets `linkUrl`  to `No linkUrl provided`.

## Populating Custom Links report with server side data

Since Segment cannot automatically record context data (including the URL) for calls made from a server library (sending in cloud-mode), you must manually pass `context.page.url` if you want your events to appear in the **Custom Links** report in Adobe Analytics.
