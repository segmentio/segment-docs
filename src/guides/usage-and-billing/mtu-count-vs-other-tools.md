---
title: "Why is my MTU count higher or lower than the user count I see in my downstream destinations/other tools?"
---

Comparing numbers between any two end-tools (or between Segment and an end tool) is rarely going to produce identical numbers. Each tool accepts and defines incoming data slightly differently, and they will not always match 100% depending on what types of data the tool accepts.

For example, consider these instances with some of our most popular destinations:

**Google Analytics:**

*   When sending `page` views from one of Segment’s server-side libraries, a `url` property is required. Otherwise, Google Analytics will silently reject your `page` event.
    
*   It is against Google’s terms of service to pass Personally Identifiable Information (PII) to your Google Analytics reporting interface. For that reason Segment will never pass anything from an [`identify`](https://segment.com/docs/spec/identify) call to Google unless you specifically tell us to.
    
*   If you want to pass the `id` from your [`identify`](https://segment.com/docs/spec/identify) calls to Google Analytics - enable **Send User-ID to GA** in your Advanced Google Analytics settings on the Segment destinations catalog.
    

**Amplitude:**

*   By default, Segment won’t send standard [`page`](https://segment.com/docs/spec/page/) or [`screen`](https://segment.com/docs/spec/screen/) calls to Amplitude. However, you can enable sending `page` and `screen` calls with the following destination settings, which you can find under the "Advanced Options" tab.
    
*   If you’re using a server-side library or the Segment HTTP API to send events or traits about anonymous visitors, Amplitude won’t automatically be able to identify that anonymous user as being the same person when they log in. To have Amplitude connect the dots, when you call `.identify()` on user log-in, you should include both the `anonymousId` you were using before the user logged in, as well as their `userId`.
    
*   For Amplitude to associate both client-side and server-side activity with the same user, you will need to pass the same `deviceId` to Amplitude. Otherwise, Amplitude will create two users - one associated with your `deviceId` and another user associated with your Segment `anonymousId`.
    

Please contact our [support team](https://segment.com/help/contact/) for further inquiries about a specific tool you have questions about to ensure there isn’t an implementation error.
