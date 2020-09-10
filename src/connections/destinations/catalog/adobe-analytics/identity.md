---
title: Identity Resolution in Segment Adobe Analytics
strat: adobe
---

This page explains how your destination settings (for Identity Resolution and Timestamps) change how user session data (the `userId` and `visitorId`) are sent to Adobe Analytics. You should get familiar with the destination settings in the Segment app before continuing.

The Identity Resolution destination settings are:
- **Marketing Cloud ID**
- **Drop VisitorID**, and **No Fallbacks for VisitorID:Server-Side Only** destination settings.

![](/docs/connections/destinations/catalog/adobe-analytics/images/identity-resolution.png)

The Timestamp destination settings are:
- **Timestamp Option**
- **Send Both Timestamp and VisitorID for Timestamp Optional Reporting Suites**
- **Prefer VisitorID for Hybrid Timestamp Reporting**

![](/docs/connections/destinations/catalog/adobe-analytics/images/timestamps.png)

## Analytics.js - Device Mode

If you're using Analytics.js in device-mode, Segment "wraps" the Adobe libraries. In this configuration, Segment sends Events directly from the client using the Adobe Analytics [`Appmeasurement.js` library](https://docs.adobe.com/content/help/en/analytics/implementation/js/overview.html). For more information on choosing a connection mode see our section on [Choosing between Device-mode and Cloud-mode](/docs/connections/destinations/catalog/adobe-analytics/#choosing-between-device-mode-and-cloud-mode). In this section we will discuss how identity resolution is  handled if you are  using  Analytics.js in device-mode.

You can enable **Drop Visitor ID** from the Segment app to prevent Adobe from creating a new user profile when you set `window.s.visitorID` with a custom value. However if you're only using Analytics.js to send data to Adobe, this can make it difficult to combine anonymous and identified users inside your reports.

Adobe Analytics counts every "effective" visitor ID as a *unique* visitor. Unfortunately, Segment cannot to alias two effective IDs on your behalf, either implicitly or explicitly.

To understand this, it's important to first understand what Adobe Analytics means by **"effective" visitor ID identifiers**. We recommend reading [the Adobe documentation on connecting users across devices](https://docs.adobe.com/content/help/en/analytics/implementation/js/xdevice-visid/xdevice-connecting.html).

Analytics.js automatically generates an Adobe Analytics [`s_vi` cookie value](https://docs.adobe.com/content/help/en/core-services/interface/ec-cookies/cookies-analytics.html) which it uses as a visitor ID until you `identify` your users. If you provide your Marketing Cloud ID Service Organization ID, then Segment sets the Experience Cloud ID and uses that instead.

Once you `identify` your user, Segment sets the `visitorId` variable to your `userId`. This effectively creates a new user, which *does* have unique user implications. However, based on a thorough reading of the Adobe documentation and discussion with many customers, we believe this is the best practice because it allows you to seamlessly track logged-in users across devices.

## Cloud Mode - Server Side

In Cloud Mode, you can send data through the Segment servers where it is then mapped and sent on to Adobe Analytics. "Cloud-mode" data is data sent _without_ bundling the Segment-Adobe-Analytics SDK. You enable Cloud-mode from the Adobe Analytics source settings in the Segment app. It can be sent using mobile libraries, Analytics.js, and other server-based sources. Cloud mode data is sent to Adobe using Adobe's data insertion API in XML format. For more information on choosing a connection mode see our section on [Choosing between Device-mode and Cloud-mode](/docs/connections/destinations/catalog/adobe-analytics/#choosing-between-device-mode-and-cloud-mode). In this section we will discuss how identity resolution is handled if you are using a Cloud Mode connection.

There are several options for tracking your users on the server. If you only track logged-in users, you can send their `userId` in your events to ensures that the events are attributed to the correct user. If you're tracking anonymous users, Segment sends the `s_vi` cookie from Adobe if you pass it under `context['Adobe Analytics'].visitorId` as the `visitorId`. If you do not pass as `visitorID`, Segment uses the `userId` if present, or as a last resort uses the Segment `anonymousId`. The Segment `anonymousId` is different from the anonymous `s_vi` value that Adobe Analytics auto-generates and uses on the client as an anonymous ID.

This may be acceptable if your organization can handle slightly inflated user counts, because all events in that anonymous user's session can still be attributed to a single user ID. If you want to tie the anonymous event from the device with your server-side events, you could extract the `s_vi` cookie value from the client and pass it to your server. Segment retains any value passed in `context["Adobe Analytics"].visitorId` and passes that as the `visitorID` when provided. However if you use this method, you might need to manage the `s_vi` cookies for all of your users since you must always pass it with each server side call. You can only parse the `s_vi` cookie if you have **1st party cookie** enabled in you reporting suite.

Segment recommends that you accept the slightly inflated user count, and use the Segment `userId` as the `visitorId`. Yes, you'll have two user profiles if you have any anonymous client side events, but you can always set up custom `eVars` to connect the few anonymous events to the correct user.

If you're using the Experience Cloud ID, you should accept this and use the Segment `userId`, and include a `marketingCloudVisitorId` in `context["Adobe Analytics"].marketingCloudVisitorId`. Segment sends both the `userId` (or `anonymousId`, if the call is anonymous) in the `<visitorId>` tag and the Experience Cloud ID in the `<marketingCloudVisitorID>` tag, and Adobe resolves the users from there.

> note ""
> **Note**: If you use the destination-specific `integration` object to pass the `visitorId` in your Segment `page` or `track` events, then the `visitorId` persists on Page or Track calls that occur after an Identify call. You can use this to override the Segment setting the `visitorId` variable to your `userId` after an `identify` call.

We know this is daunting territory, so don't hesitate to [contact us directly for guidance](https://segment.com/help/contact/).


## No Fallbacks for VisitorId Setting - Cloud Mode Only

Segment introduced a new **No Fallbacks for Visitor ID** setting to help with the transition from using the Adobe Analytics `visitorID` to using the Experience Cloud ID (ECID). If a `visitorId` is not explicitly sent in the integration specific object in your payload (ie. `context["Adobe Analytics"].visitorId`), Segment will fallback  to setting the `<visitorID>` tag to `userId` (or `anonymousId`, if the call is anonymous). You can use this setting to indicate that you only want the `<visitorId>` tag to be set with the `visitorId` value sent in your integration specific object.  Enabling this will help to reduce inflated user counts that are set with a Segment `userId`.

If you disable the **Drop Visitor ID** setting, Segment sends a `<visitorID>` in these three scenarios:
- When your calls don't send timestamps (meaning the Timestamp Option setting is set to disabled)
- When your calls use hybrid timestamp mode and are sending `visitorId`
- When your calls use hybrid timestamp mode and are sending `visitorId` and timestamp

**NOTE:** If one of these three scenarios is met and a your calls do not send a `visitorId` in the integrations object, Segment falls back to setting the visitorId to a Segment `userId`. This timestamp-dependent behavior does not change when you enable **No Fallbacks for Visitor ID**. The **No Fallbacks for Visitor ID** setting is an added feature in addition to that setting.

If **No Fallbacks for Visitor ID** is enabled, and you're setting a `marketingCloudVisitorID` in the `integrations` object, then Segment will _never_ pass anything except the `visitorId` from the integrations object as the `<visitorID>` tag.

This decision tree is a visual representation of how Segment's Adobe Analytics destination settings and payload data interact with Segment to determine when to send a `visitorId` to Adobe.

![](/docs/connections/destinations/catalog/adobe-analytics/images/adobe-identity-res-decision-tree.png)
