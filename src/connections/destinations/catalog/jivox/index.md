---
title: Jivox IQ Destination
id: 61a0f8fdc53f13a42eac137c
---
[Jivox](https://jivox.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) personalizes digital marketing and advertising. Using the power of big data and machine learning algorithms, Jivox IQ assembles thousands of creative and messaging variations in real-time to create millions of personalized conversations.

This destination is maintained by Jivox. For any issues with the destination, [contact the Jivox Support team](mailto:support@jivox.com).

## Getting Started

{% include content/connection-modes.md %} 

1. Contact [Jivox IQ Support Team](mailto:support@jivox.com?subject=Need%20API%20key%20for%20Segment%20Destination%20configuration%20for%20) to get the API Key.
2. From the Destinations catalog page in the Segment App, click **Add Destination**.
3. Search for "Jivox IQ" in the Destinations Catalog, and select the "Jivox IQ" destination.
4. Choose which Source should send data to the "Jivox IQ" destination.
5. Enter the "API Key" in the "Jivox IQ" destination settings in Segment.


## Supported methods

Jivox IQ supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/sources/catalog/libraries/website/javascript/#page) calls to understand the user journey. For example:

```js
let properties = {
    jvxUserId: 'a345pf56',
    ...otherProperties
};
analytics.page(properties);
```

Segment sends Page calls to Jivox IQ as a `pageview`. 

### Screen

Send [Screen](/docs/connections/spec/screen) calls to understand the user journey. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"
                            properties:@{ @"jvxUserId": @"a345pf56" }];

```

Segment sends Screen calls to Jivox IQ as a `screenview`. 


### Identify

Send [Identify](/docs/connections/sources/catalog/libraries/website/javascript/#identify) calls to connect Jivox IQ User identified by `jvxUserId` with Segment User identified by `anonymousId/userId`. Send the `jvxUserId` as userId in `identify` call. For example:

```js
let jvxUserId = 'a345pf56';
analytics.identify(jvxUserId, {
  email: 'john.doe@example.com'
});
```

The userId becomes the primary key used to identify user attributes, event, conversions across later user activity events. These are then used to personalise the ad serving. 

Segment sends Identify calls to Jivox IQ as an `identify` event.

### Track

Send [Track](/docs/connections/sources/catalog/libraries/website/javascript/#track) calls to track user conversions and other actions. For example:

```js
let properties = { 
    jvxUserId: 'a345pf56',
    ...otherProperties
}
analytics.track('Login Button Clicked', properties);
```

Segment sends Track calls to Jivox IQ as a `track` event.
