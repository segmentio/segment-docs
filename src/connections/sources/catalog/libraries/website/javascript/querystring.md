---
title: Using the Analytics.js Querystring API
strat: ajs
---

Analytics.js can trigger Track and Identify events based on the URL query string. You can use this when tracking email click-throughs, social media clicks, and digital advertising.

Here are the query parameters to use:

| Parameter | Description | Triggers |
| ----- | ----------- | -------- |
| `ajs_uid` |  The userId to pass to an identify call. | This triggers an `identify` call. |
| `ajs_event` | The event name to pass to a track call. | This triggers a `track` call.  |
| `ajs_aid` | The anonymousId to set for the user.| This triggers an `analytics.user().anonymousId()` call.|
| `ajs_prop_<property>` | A property to pass to the track call | This won't implicitly trigger an event and is dependent on you also passing `ajs_event` - this property  be included in the resulting `track` call |
| `ajs_trait_<trait>` | A trait to pass to the identify call | This won't implicitly trigger any call and is dependent on you also passing `ajs_uid` - this trait is included in the resulting `identify` call |

For example, this URL:

```text
http://segment.com/?ajs_uid=123456789abcd&ajs_event=Clicked%20Email&ajs_aid=abc123&ajs_prop_emailCampaign=First+Touch&ajs_trait_name=Karl+Jr.
```

would create the following events on the page.

```js
analytics.identify('123456789abcd', { name: 'Karl Jr.' });
analytics.track('Clicked Email', { 'emailCampaign': 'First Touch' });
analytics.user().anonymousId('abc123');
```

Each trigger parameter is optional. You can pass up to **one of each trigger parameter** as shown in the example above.
