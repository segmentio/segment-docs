---
title: Adobe Analytics Best Practices
strat: adobe
---

There are a few common questions that we've heard over time that are worth mentioning.

## Validating by Data by Component 
<table>
  <tr>
    <td>**Component**</td>
    <td>**Validation Tool**</td>
  </tr>
  <tr>
    <td>Analytics.js</td>
    <td>[Adobe Experience Cloud Debugger](https://chrome.google.com/webstore/detail/adobe-experience-cloud-de/ocdmogmohccmeicdhlhhgepeaijenapj)<br>Chrome Developer Tools</td>
  </tr>
  <tr>
    <td>Server Side</td>
    <td>Segment in-app Event Tester Tool</td>
  </tr>
  <tr>
    <td>iOS Device Mode</td>
    <td>Charles Proxy<br>DEBUG mode</td>
  </tr>
  <tr>
    <td>Android Device Mode</td>
    <td>Charles Proxy<br>VERBOSE logging</td>
  </tr>
</table>
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

When the integration option `events` is passed in, we map the events and send them using the `<events>` tag. In the example above, we would build `<events>event35, scAdd</events>`.

_Considerations_

- Segment does not automatically map to Adobe Pre-Defined events on `page` or `screen` calls
- You must change your implementation to pass integration: AA: false on the event you do not want duplicated.

```javascript
"integrations": {
    "Adobe Analytics": false
    }
```

## Setting custom linkTypes, linkNames and linkUrls
If you are setting up the Adobe Analytics destination in cloud-mode, you can pass in custom linkTypes, linkNames and linkURLs.

**Note**: If you pass in the `visitorId` in a destination specific `integration` object within your Segment `page` or `track` events, then the `visitorId` passed will persist on page or track calls that occur after an identify call. This will effectively supersede Segment setting the `visitorId` variable to your `userId` after an `identify` call.

We know this is daunting territory, so don't hesitate to contact us directly for guidance!

**Setting the event linkType**

By default, Segment's integration with Adobe Analytics automatically sets an events linkType as a custom link or 'o' for 'other' within the s.tl() call. If you want to set the linkType of an event as download or exit links, you can pass in the following values within the `integrations.adobe analytics` object of your Segment event payload.

A value of `d` or `D` will map to download links and a value of `e` or `E` will map to exit links

Below is a sample snippet of how you would set a Segment event as a download link type:

```javascript
"integrations": {
    "Adobe Analytics": {
      "linkType": "d"
    }
}
```

If you pass in Segment events with a download (d or D) linkType, it will populate the Download link report in your Adobe Analytics reporting suite. If you pass in Segment events with a exit (e or E) linkType, it will populate the Exit link report in your Adobe Analytics reporting suite. Finally, if you pass in Segment event with either no linkType or a value of "o" or "O" in the integration.Adobe Analytics object, it will populate the custom link report in your Adobe Analytics reporting suite.

**Setting the event linkName**

If you want to pass in a custom LinkName to Adobe Analytics, you can now define it by passing it as a string within the `integrations.Adobe Anlaytics`object of your Segment event. An example would be like the one below:

```javascript
"integrations": {
        "Adobe Analytics": {
          "linkName": "some link name"
        }
    }
```

If a custom linkName is not specified in the integration specific object in the payload, Segment will default to mapping `linkName` to the value from `(context.page.url)`. If there is no URL present Segment will set `linkName`  to `No linkName provided`.

NOTE: The `useLegacyLinkName` setting in the UI will be respected if you have the setting enabled and you send a custom `linkName` in the integration specific object.

**Setting the event LinkURL**

If you want to pass in a custom LinkUrl to Adobe Analytics, you can do this by passing it as a string within the `integrations.Adobe Anlaytics`object of your Segment event. An example would be like the one below:

```javascript
"integrations": {
        "Adobe Analytics": {
          "linkUrl": "some link url"
        }
    }
```

If a custom linkUrl is not specified in the integration specific object in the payload, Segment will default to mapping `linkUrl` to the `(context.page.url)`. If there is no URL present Segment will set `linkUrl`  to `No linkUrl provided`.

## Populating Custom Links report with server side data

Since we cannot automatically track page data for **server side** calls, if you want to populate the **Custom Links** report in Adobe Analytics, you must manually pass `context.page.url`.
