---
title: Kameleoon Destination
rewrite: true
id: 609b99352cc613d05627620e
---
[Kameleoon's](https://kameleoon.com/en) powerful and easy-to-use A/B testing, full stack, and AI-powered personalization solutions help marketers, product owners, and developers maximize customer engagement and conversion all from a single platform.

This destination is maintained by Kameleoon. For any issues with the destination, [contact the Kameleoon Support team](mailto:support@kameleoon.com).


## Getting Started

{% include content/connection-modes.md %}

Segment's Kameleoon destination supports the following Kameleoon products:
* [Kameleoon Experiment](https://www.kameleoon.com/en/platform/ab-testing-client-side){:target="_blank"} (Web Client-side)
* [Kameleoon Full Stack](https://www.kameleoon.com/en/platform/ab-testing-full-stack){:target="_blank"} (Web or mobile Apps, IoT..)
* [Kameleoon AI Personalization](https://www.kameleoon.com/en/platform/personalization){:target="_blank"} (Web Client-side)


In order to use the Kameleoon & Segment.io integration, you first need to request an API Key. Send your request it to [support@kameleoon.com](mailto:support@kameleoon.com), and be sure to specify your Kameleoon account login.

You will also need the **sitecode** key. You can find it in your Kameleoon account, as described in [How do I find my site id?](https://help.kameleoon.com/question/how-do-i-find-my-site-id/){:target="_blank"}.

To add the destination to your Segment workspace:

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Kameleoon** in the Destinations Catalog, and select the **Kameleoon** destination.
3. Choose which Source should send data to the **Kameleoon** destination.
4. Enter the **API Key** and the **sitecode** in the Kameleoon destination settings in Segment.

## Implementation pre-requisites: matching Users between Kameleoon and Segment

The integration requires you to use the same system of identifiers for both tools, meaning the `userId` value you pass to Segment should be the same value as Kameleoon uses to identify a “visitor”.

If you use Kameleoon Experiment or Kameleoon AI Personalization on your website, Kameleoon places a cookie that contains an anonymous unique identifier, called the Kameleoon visitorcode. This ID is randomly assigned to a visitor and is used to uniquely identify a browser.

You can either pass Kameleoon's visitorcode in the userId property of the Segment calls to ensure Kameleoon can consolidate data and avoid any analytics discrepancies between the tools in your campaign results, OR you may specify in all Segment calls an additional user property, `k_visitorCode`, whose value is the Kameleoon visitorcode. You can retrieve the user visitorCode from the browser by using Kameleoon's [Activation API](https://developers.kameleoon.com/activation-api.html#visitor){:target="_blank"}.

If you are not able to update your existing Segment tracking plan, you can also pass Kameleoon's visitor code in an additional Segment call as follows: `analytics.track('Kameleoon identifier', {'k_visitorCode': Kameleoon.API.Visitor.code});Kameleoon`. This will automatically link your internal user ID or anonymous ID to Kameleoon's own visitorCode. Make sure to call it only once per session.

If you use Kameleoon Full Stack, please refer to the [Kameleoon SDK documentation](https://developers.kameleoon.com/sdks-overview.html){:target="_blank"}. Kameleoon recommends you to use your own internal ID to identify users.

## Supported methods

Kameleoon supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).


If the Segment event name matches exactly the name of an existing [goal](https://help.kameleoon.com/create-new-goal/){:target="_blank"} in your Kameleoon account, a conversion for this goal will be associated to the visitor. If the goal does not exist, Kameleoon will create a [custom goal](https://help.kameleoon.com/create-new-goal/#Custom_goal){:target="_blank"} by using the Segment event name and associate the conversion to the visitor. The goal will appear in the Kameleoon [goals page](https://help.kameleoon.com/manage-goals/){:target="_blank"} with the name convention 'SegmentIO eventType - eventName'. Once the goal has been created, you can use them in any of your [campaign](https://help.kameleoon.com/set-up-goal-campaign/){:target="_blank"}.


### Page

Send [Page](/docs/connections/spec/page/) calls to record whenever a user sees a page of your website, along with any optional properties about the page. Calling page or screen in a source is one of the first steps to getting started with Segment.

For example:

```js
analytics.page('Home', {"k_visitorCode": "oa16i4syt2ve3b0z"});
```


### Screen

Send [Screen](/docs/connections/spec/screen/) calls to record whenever a user sees a screen, the mobile equivalent of page, in your mobile app, along with any properties about the screen. Calling page or screen in a source is one of the first steps to getting started with Segment.

For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"
                            properties:@{ @"k_visitorCode": @"oa16i4syt2ve3b0z" }];
```

Segment sends Screen calls to Kameleoon as a `screenview`.


### Track

Send [Track](/docs/connections/spec/track/) calls to record any actions your users perform, along with any properties that describe the action.

For example:

```js
analytics.track('Login Button Clicked', {"k_visitorCode": "oa16i4syt2ve3b0z"});
```

Segment sends Track calls to Kameleoon as a `track` event.
