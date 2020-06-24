---
title: Adobe Analytics Best Practices
strat: adobe
---

There are a few common questions that we've heard over time that are worth mentioning.

### Reducing API calls by sending events on page or screen

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

- We do not automatically map to Adobe Pre-Defined events on `page` or `screen` calls
- You must change your implementation to pass integration: AA: false on the event you do not want duplicated.

```javascript
"integrations": {
    "Adobe Analytics": false
    }
```

### Setting custom linkTypes, linkNames and linkUrls
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


### Best practices for userId and sessioning
You can enable **Drop Visitor ID** from the Segment app to prevent Adobe from creating a new user profile when you set `window.s.visitorID` with a custom value. However, this can break the links between anonymous and identified users inside your reports, if you're only using Analytics.js to send data to Adobe.

Adobe Analytics unfortunately counts every "effective" visitor ID as a *unique* visitor. There is no ability for Segment to alias, implicitly or explicitly, two effective IDs on your behalf.

Key to understanding the implications of this fact is an understanding of what Adobe Analytics means by **"effective" visitor ID**. To do so, we recommend reading [this section of their documentation](https://marketing.adobe.com/resources/help/en_US/sc/implement/xdevice_visid.html).

With analytics.js, we use the default auto-generated Adobe Analytics [`s_vi` cookie value](https://marketing.adobe.com/developer/documentation/data-insertion/c-visitor-id) as effective visitor ID until you `identify` your users. If you provide your Marketing Cloud ID Service Organization ID, then we'll set the MCVID and use that instead.

Once you `identify` your user, Segment sets the `visitorId` variable to your `userId`. This effectively creates a new user, which *does* have unique user implications. However, based on a thorough reading of their documentation and discussion with many customers, we believe this is the best practice because now you can seamlessly track this user across devices whenever they are logged in.

So if you'd like to track your users on the server as well, you have a few options. If you're only tracking logged-in users, sending their `userId` in your events ensures that the events are attributed to the proper user. If you're tracking anonymous users too, Segment sends the `s_vi` cookie from Adobe if you pass it under `context['Adobe Analytics'].visitorId` as the `visitorId`. Then we fallback on the `userId` and lastly the Segment `anonymousId`, which you'll notice is a different ID from the anonymous `s_vi` value used on the client (Adobe Analytics' auto-generated effective ID for anonymous users).

If you don't mind slightly inflated unique user counts, this may be acceptable, as all events in that anonymous user's session are still attributable to a single user ID. If you really do want to tie the anonymous event from the client side with your server side events, you could grab the `s_vi` cookie value from the client and pass it to your server. We respect any value passed in `context["Adobe Analytics"].visitorId` and pass that as the `visitorID` if provided. But keep in mind that if you go this route, you would probably need to manage the `s_vi` cookies for all your users since you always need to pass it with all your server side calls. Note that you can only parse the `s_vi` cookie if you have **1st party cookie** enabled in you reporting suite.

Thus our recommendation is to take the slightly inflated user count, and just use the Segment `userId` as the `visitorId`. Yes, you'll have two user profiles if you have any anonymous client side events, but you can always set up custom eVars to connect the few anonymous events to the right user.

If you're using the `marketingCloudVisitorID`, we recommend doing this and including it in `context["Adobe Analytics"].marketingCloudVisitorId`. Segment sends both the `userId` (or `anonymousId`, if the call is anonymous) in the `<visitorId>` tag and the MCVID in the `<marketingCloudVisitorID>` tag, and Adobe handles it from there.

**Note**: If you pass in the `visitorId` in a destination specific `integration` object within your Segment `page` or `track` events, then the `visitorId` persists on page or track calls that occur after an identify call. This effectively supersedes Segment setting the `visitorId` variable to your `userId` after an `identify` call.

<!-- TODO if you manually pass the visitorID in the Segment page or track call, then it sticks around after identify is called, and it prevents it from breaking - whatever you pass in the integrations object overrides what segment's adobe integration code logic does-->

We know this is daunting territory, so don't hesitate to contact us directly for guidance!

### Populating Custom Links report with server side data

Since we cannot automatically track page data for **server side** calls, if you want to populate the **Custom Links** report in Adobe Analytics, you must manually pass `context.page.url`.
