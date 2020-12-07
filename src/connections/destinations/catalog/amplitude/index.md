---
rewrite: true
title: Amplitude Destination
---

[Amplitude](https://amplitude.com/) is an event tracking and segmentation
platform for your web and mobile apps. By analyzing the actions your users
perform, you can gain a better understanding to drive retention, engagement,
and conversion.

Our Amplitude destination code is open sourced on GitHub. Feel free to check it
out:
[iOS](https://github.com/segment-integrations/analytics-ios-integration-amplitude),
[Android](https://github.com/segment-integrations/analytics-android-integration-amplitude) and
[JS](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/amplitude).
Our server-side integration is not open-source.

In addition to the docs below, Amplitude has created a [destination
guide](https://amplitude.zendesk.com/hc/articles/217934128-Segment-Amplitude-Integration).

NOTE: If you're trying to delete users based on GDPR regulations, Amplitude requires a secret key that you'll need to include on your Segment source(s) settings (under the "Secret Key" setting of the Amplitude destination). You can find your Secret Key on the [General Settings](https://amplitude.zendesk.com/hc/en-us/articles/235649848-Settings#project-general-settings) of your Amplitude project.

This document was last updated on September 17th, 2019. If you notice any gaps,
outdated information or simply want to leave some feedback to help us improve
our documentation, [let us know](https://segment.com/help/contact)!

**Use Cases**

{% include components/reference-button.html href="https://segment.com/recipes/ab-test-cta-conversions-optimizely/" icon="media/academy.svg" title="Optimizing page performance using heatmaps" description="Test which call to action (CTA) results in more shopping cart conversions with Optimizely and Amplitude." %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.

2. Search for "Amplitude" in the Catalog, select it, and choose which of your sources to connect the destination to.

3. In the destination settings, enter your Amplitude API key.

   You can find the your Amplitude API key from the [Amplitude project
settings](https://analytics.amplitude.com/settings/projects). Find the project
you want to send data to. The API key you should add to your Segment
destination settings is the API key of the project you want to send data to. It
should be a randomized, 32-character long string of numbers and letters.

4. If you've included Segment's snippet on your page, then Amplitude's SDK will
   be loaded on your page. You can use Segment's client-side SDK to begin
sending events right away.

   On server-side, you can begin sending events to Segment right away; they
will appear in your Amplitude project.

- - -

## Page and Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Page](https://segment.com/docs/connections/spec/page/) and [Screen](https://segment.com/docs/connections/spec/screen/) method does. By default, Segment won't send these standard calls to Amplitude. However, you can enable them with the destination settings outlined below, which
you can find under the "Optional Settings" tab. An example call would look like with a server-side call:

```js
analytics.page({
  userId: "some_user_id", // on A.js client-side, you can leave out the `userId`
  category: "Merchant",
  name: "Settings",
})

// Note: `screen` calls are not possible from the A.js client-side.
analytics.screen({
  userId: "some_user_id",
  category: "Merchant",
  name: "Settings",
})
```

`page` and `screen` calls have two important properties: a *name*, such as "Settings", and a *category*, such as "Merchant". How you pass these properties will depend on the Segment library you're using. Segment will determine when to send events to Amplitude based on the settings you've enabled, and whether the call has a name or category included.

**Important:** If you enable more than one of the following settings, multiple events will be sent for the same call.

### Client and Server

On the client and server, you can use the following settings:

| Setting Name | When events are sent to Amplitude | Amplitude Event Name | Example for `{"name": "Settings", "category": "Merchant" }`  |
| --- | --- | --- | --- |
| Track Named Pages | A `page`/`screen` *name* is provided | Loaded/Viewed (Category) (Name) Page/Screen | "Loaded Merchant Settings Page" |
| Track Categorized Pages | A `page`/`screen` *category* is provided | Loaded/Viewed (Category) Page/Screen | "Loaded Merchant Page" |
| Track All Pages | Always | Loaded/Viewed a Page/Screen | "Loaded a Page" |

Before you choose which setting is right for you, there are a couple of things worth considering first.

- When you use the **Track Named Pages** or **Track Categorized Pages** settings, Segment sends a Page or Screen call that includes the name or category. This option stores the page and screen name as a top-level event type. However, there are [limits for how many distinct event types Amplitude allows](https://help.amplitude.com/hc/en-us/articles/115002923888-Limits#event-types) tracked per project. Each unique Page and Screen name, Page and Screen category, and Track event counts towards the event type limit. Anything past the thresholds is not visualized in Amplitude.

- When you use the **Track All Pages** setting, Segment sends a `Loaded a Page` event type to Amplitude. When you use the generic event name, it is applied to all Page and Screen calls, so you don't hit the event type limit in your project in Amplitude. The page or screen name is available as an attribute of the `Loaded a Page` event, and you can query it as an event property. The `Loaded a Page` event is counted as one event type, and Amplitude does not place any limits on the number of unique event property values in Amplitude.

> success ""
> **Tip**: These settings apply to mobile Cloud-mode connections.

### iOS

On iOS for a Device-mode connection, you can use these settings:

| Setting Name | When events will be sent to Amplitude | Amplitude Event Name | Example for `{"name": "Settings", "category": "Merchant" }` |
| --- | --- | --- |
| Track All Pages | Always | Viewed (Name) | "Viewed Settings" |
| Track All Screens | Always | Loaded a Screen | "Loaded a Screen" |

The difference between "Track All Pages" and "Track All Screens" is that
"Track All Screens" will include the screen name and category as event
properties. You probably want to use "Track All Screens".

### Android

These settings are available for Android sources, when you are using a Device-mode connection:

| Setting Name | When events will be sent to Amplitude | Amplitude Event Name | Example for `{"name": "Settings", "category": "Merchant" }` |
| --- | --- | --- | --- |
| Track Named Pages | A `screen` *name* is provided | Viewed (Category) (Name) Screen | "Viewed Merchant Settings Screen" |
| Track Categorized Pages | A `screen` *category* is provided | Viewed (Category) Screen | "Viewed Merchant Screen" |
| Track All Pages | Always | If a `screen` *name* is provided: `Viewed (Name) Screen`. Otherwise `Loaded a Screen` | "Viewed Settings Screen" |
| Track All Screens | Always | Loaded a Screen | "Loaded a Screen" |

You can learn more about `page` calls from our [`page` spec](/docs/connections/spec/page/)
and `screen` calls from our [`screen` spec](/docs/connections/spec/screen/).

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```js
// On server-side
analytics.identify({
  "userId": "123",
  "anonymousId": "a80b66d5-b86d-41bd-866f-fe04ee7841af",
  "traits": {
    "email": "derek@sivers.org",
    "name": "Derek Sivers",
    "industry": "Music"
  }
})

// On client-side
analytics.identify({
  "email": "derek@sivers.org",
  "name": "Derek Sivers",
  "industry": "Music"
})
```

When you call `identify`, we'll use the `userId` provided to set the [User Id in Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/206404628-Step-2-Assign-User-IDs-and-Identify-Your-Users), and
set any `traits` you provide as Amplitude custom `user_properties`.

### Merging users with Anonymous ID and User ID

To have Amplitude recognize an anonymous user and a known/logged in user, when calling `.identify()` you should include both the `anonymousId` you were using before the user logged in, as well as their `userId`. Otherwise, Amplitude won't automatically be able to identify that anonymous user as being the same person when they log in.

If you're using a server-side library or the Segment HTTP API, you need to explicitly include both `anonymousId` and `userId`. If you're using the Segment client-side JavaScript or our bundled SDK, Segment will automatically include `anonymousId` for you.

### Amplitude Device ID

Device ID will be set in slightly different ways, depending on the library and connection mode you're using (Device-mode vs Cloud-mode).

**Default**

The table below represents default behavior.

| Library | Default | Fallback |
| --- | --- | --- |
| A.js | [Generated by Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#determining-unique-users) | `anonymousId` |
| Server-side  |  `context.device.id` | `anonymousId`  |
| iOS |  [Generated by Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#determining-unique-users) | n/a  |
| Android | [Generated by Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#determining-unique-users)  | n/a |

**Prefer Anonymous ID for Device ID**

If you're using the "Prefer Anonymous ID for Device ID" setting in client-side, server-side, or a mobile library with Cloud-mode enabled, the following rules apply.

| Library | Default | Fallback |
| --- | --- | --- |
| A.js | `anonymousId` | [Generated by Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#determining-unique-users) |
| Server-side  |  `anonymousId` | `context.device.id`  |

**Prefer Advertising ID for Device ID**

This option is not currently available for mobile libraries using cloud-mode.

If you're using the "Prefer Advertising ID for Device ID" setting with one of our bundled mobile SDKs, the following rules apply.

| Library | Default | Fallback |
| --- | --- | --- |
| iOS | `anonymousId` | [Generated by Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#determining-unique-users) |
| Android  |  `anonymousId` | [Generated by Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#determining-unique-users)   |

#### Device ID priority
If you have multiple settings enabled, one setting or value can take priority of another. This table lists which settings, if enabled, takes priority over other settings or values.

| Library | Priority (highest to lowest) |
| --- | --- |
| A.js | Prefer Anonymous ID for Device ID <br /> Set Device ID From URL Parameter amp_device_id (Device-mode only) <br /> [Device ID Generated by Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#determining-unique-users) |
| Server-side  | Prefer Anonymous ID for Device ID <br /> `context.device.id` |
| iOS |  Use AdvertisingId for Device ID (Device-mode only) <br /> [Device ID Generated by Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#determining-unique-users)
| Android | Use AdvertisingId for Device ID (Device-mode only) <br /> [Device ID Generated by Amplitude](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#determining-unique-users)


**Merging users with Device ID**

For Amplitude to associate both client-side and server-side activity with the
same user, you will need to pass the same `deviceID` to Amplitude.  Otherwise,
Amplitude will create two users - one for each of the `deviceID`'s set per the functionality outlined in the tables above.

You can grab `deviceID` from Amplitude on the client-side to send server-side
by calling this method within the
[`ready`](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#ready)
function on the client-side to send server-side:

```js
analytics.ready(function() {
  // Instead of console.log(...), you probably want to do upload_to_server(...)
  // or something to that effect.
  console.log(amplitude.getInstance().options.deviceId);
});
```

Similarly, when a user logs in, be sure to send the same Amplitude `deviceID`
with your `identify` call. Otherwise, Amplitude will create two separate users: one for your anonymous user, and another for your logged-in user. This will be handled automatically on mobile.



## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. Amplitude supports a number of special properties, all of which are included in the example below:

```javascript
// On server-side
analytics.track({
  "userId": "123",
  "event": "Subscription Started",
  "properties": {
    "plan": "Basic",
    "revenue": "32"
  },
  "context": {
    "ip": "8.8.8.8",
    "device": {
      "id": "2b6f0cc904d137be2e1730235f5664094b831186",
      "model": "iPhone 6",
      "brand": "Apple",
      "manufacturer": "Apple"
    },
    "os": {
      "name": "iOS",
      "version": "9.1"
    },
    "network": {
      "carrier": "T-Mobile"
    },
    "app": {
      "version": "3.5.1"
    },
    "location": {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "latitude": "37.7672319",
      "longitude": "-122.4021353"
    },
    "locale": {
      "language": "en-us"
    }
  }
})
```

Many of these properties will automatically be sent for you if you use one of Segment's browser or mobile libraries such as
[Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/), [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/), or [Android](/docs/connections/sources/catalog/libraries/mobile/android/).

For a complete list of special `context` keys see [our common fields spec](/docs/connections/spec/common/).

### Log Revenue V2

Our iOS and Android components support sending revenue using Amplitude's preferred `logRevenueV2` method. Segment will set Amplitude's special revenue properties, such as `revenueType` and `productIdentifier`, which are used in Amplitude's Revenue Analysis and Revenue LTV charts. Any properties not mapped to Amplitude's special properties will be sent using the Amplitude
`eventProperties` field.

| Amplitude Property | Segment Property | Description |
| --- | --- | --- |
| `productId` | `productId` | An identifier for the product. |
| `quantity` | `quantity` | The quantity of products purchased. Note: revenue = `quantity` * `price`. |
| `price` | `price` or `revenue` (or `total` for mobile)^ | The price of the products purchased, and this can be negative. |
| `revenueType` | `revenueType`| The type of revenue (e.g. tax, refund, income). |
| `receiptSignature`  | `receiptSignature` (Android only) | The receipt signature.  |
| `receipt` | `receipt` | This is required if you want to verify the revenue event. |
| `eventProperties` | Any remaining properties | A NSDictionary or Map of event properties to include in the revenue event. |

^ If `properties.price` is not present, Segment will fallback to `revenue` and send that as `price`. In our iOS and Android components, if `revenue` isn't present either, we'll do an additional fallback to `total`.

Property names should be `camelCase` for Android implementations and `snake_case` for iOS implementations.



**Note**: Amplitude currently does not support currency conversion. All revenue data should be normalized to your currency of choice, before being sent to Amplitude.


### Revenue

In our client side, iOS, and Android components, if the preferred `logRevenueV2` setting is not enabled, the deprecated `logRevenue` methods still work. Fields such as `revenueType` will be missing from events logged with these old methods, so the ability to segment on those revenue events will be limited in the Amplitude platform.

| Amplitude Property | Segment Property | Description |
| --- | --- | --- |
| `productId` | `productId` | An identifier for the product. |
| `quantity` | `quantity` | The quantity of products purchased. Note: revenue = `quantity` * `price`. |
| `price` | `price` (or `revenue` or `total`)^ | The price of the products purchased, and this can be negative. |
| `receipt` | `receipt` (mobile only) | This is required if you want to verify the revenue event. |
| `receiptSignature`  | `receiptSignature` (Android only) | The receipt signature.  |
| `revenueType` | `revenueType` (Server-side only)| The type of revenue (e.g. tax, refund, income). |
| `revenue`  |  `reveue` (Server-side only) | The revenue collected.  |
| `eventProperties` | Any remaining properties (Server-side only) | A NSDictionary or Map of event properties to include in the revenue event. |


^ In our A.js, iOS and Android components, if `properties.price` is not present, Segment will fallback to `revenue` and send that as `price`. In addition, in our iOS and Android components, if `revenue` isn't present either, we'll do an additional fallback to `total`.

**Note:** If your site allows for users to perform a single transaction with multiple different products (such as a shopping cart checkout), we recommend using an [Order Completed](/docs/connections/destinations/catalog/amplitude/#order-completed) event to track revenue with Amplitude.



### Order Completed

To track revenue with Amplitude, we recommend using our [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) event. This event allows you to define a list of products that a user purchased in a transaction. The need for this functionality is most applicable to sites that have a shopping cart experience.

This event's functionality is currently only available for data originating from a server or web [source](https://segment.com/docs/connections/sources/). An `Order Completed` event from mobile using our bundled Amplitude integration
will work the same as our standard `track` event documented above.

Here's an example of how you'd create an "Order Completed" event:

```javascript
analytics.track({
  "userId": "e953c39d2597f0b8a79dd3c407baeb13bb58523a",
  "event": "Order Completed",
  "properties": {
    "checkoutId": "6727142daf49b93a601d3a31bc3d53aeae1d15ab",
    "orderId": "50314b8e9bcf000000000000",
    "affiliation": "Google Store",
    "total": 30,
    "revenue": 25,
    "shipping": 3,
    "tax": 2,
    "discount": 2.5,
    "coupon": "hasbros",
    "currency": "USD",
    "products": [
      {
        "productId": "507f1f77bcf86cd799439011",
        "sku": "45790-32",
        "name": "Monopoly: 3rd Edition",
        "price": 19,
        "quantity": 1,
        "category": "Games"
      },
      {
        "productId": "505bd76785ebb509fc183733",
        "sku": "46493-32",
        "name": "Uno Card Game",
        "price": 3,
        "quantity": 2,
        "category": "Games"
      }
    ]
  }
})
```

When you send an "Order Completed" event, an "Order Completed" event will
appear in Amplitude for that purchase. In addition, an Amplitude event called
"Product Purchased" will be created for each product in the purchase. All event
properties, except `products`, will be `event_properties` of the Amplitude
"Order Completed" event. Information about each product will be present *only*
on the individual "Product Purchased" events.

**Track Revenue Per Product**

Amplitude has two different ways to track revenue associated with a
multi-product purchase. You can choose which method you want to use using the
[Track Revenue Per Product](#track-revenue-per-product) destination setting:

1. Disable the setting ("off"): Log a single revenue event with the total amount purchased. Revenue data will be added to the Amplitude "Order Completed" event. The "Product Purchased" events will not have any native Amplitude revenue data.

2. Enable the setting ("on"): Log a single revenue event for each product that was purchased. Revenue data will be added to each "Product Purchased" event, and the "Order Completed" event will not have any native Amplitude revenue data.

Make sure you are adhering to our event spec and pass at minimum a
`revenue` property, as well as a `price` and `quantity` property for each
product in the products list.

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. Note that groups are an enterprise-only feature in Amplitude,
and are only available if you've purchased the Accounts add-on. An example call would look like:

```js
// On server-side
analytics.group("some_group_id", {
  userId: "some_user_id",
  traits: {
    email: "the_group_email",
    some_other_property: "some_other_value",
  }
})

// On client-side
analytics.group("some_group_id", {
  email: "the_group_email",
  some_other_property: "some_other_value",
})
```

Even if you don't have an enterprise account or don't have the Accounts add-on, Segment will always add groups as `user_properties` of a user.  As long as you specify the destination settings below, Segment will add the "group type" as a
user property whose value will be the "group value".

To use Amplitude's groups with Segment, you must enable the following
destination settings and provide them with the appropriate values. They act as
a mapping from Segment group traits to Amplitude group types and values.

- **"Amplitude Group Type Trait"**: This specifies what trait in your
  `.group()` calls will contain the Amplitude "group type". In other words,
it's how you tell Segment which trait should be used as the group type.

- **"Amplitude Group Value Trait"**: This specifies what trait in your
  `.group()` calls will contain the Amplitude "group value". It's how you tell
Segment which trait should be used as the group value.

For example, if you specified `group_type` as the "Amplitude Group Type Trait",
and `name` as the "Amplitude Group Value Trait", then the following call:

```js
analytics.group("082108c8-f51e-485f-9d2d-b6ba57ee2c40", {
  group_type: "Organization",
  name: "ExampleCorp, LLC",
  employees: "20",
  email: "hello@example.com"
});
```

Would associate the current user with the group with type `"Organization"` and
value `"ExampleCorp, LLC"`. On client-side, that's all that happens. On
server-side and Android, the traits you pass (in this case, `group_type`, `name`,
`employees`, and `email`) will be provided as `group_properties` of that group.

What you provide as group ID doesn't matter, but Segment requires that all
`.group()` calls provide a group ID; you cannot leave group ID empty.

### Legacy Group Behavior

If you do not provide "Amplitude Group Type/Value Trait", or one of the traits
was not provided in your call to `.group()`, then Segment will fall back to the
following legacy behavior: the user will be associated with a group with the
type "[Segment] Group" and with the value "(Group Id)". No properties will be
associated with that group.

For example, the previous group call would associate the user with a group of
type "[Segment] Group" and value "082108c8-f51e-485f-9d2d-b6ba57ee2c40".


## Alias

Segment's `alias` method maps to Amplitude's `usermap` endpoint. Invoking a
Segment `alias` method allows you to associate a Segment user's `previousId`
with the user's `userId`, or what Amplitude refers to, respectively, as a
`user_id` and a `global_user_id`.

By default, Segment does **NOT** send `alias` events downstream to Amplitude.
To begin forwarding `alias` events from Segment, enable the `Enable Alias`
setting in your Amplitude destination settings in the Segment UI. Once enabled,
Segment will forward both client-side and server-side `alias` events. _All_
`alias` events are processed on Segment's servers, however, so you will not see
a `usermap` request to Amplitude if you examine your browser's Network activity
after invoking a Segment `alias` event.

For more
information on Segment's `alias` method, see our [`alias`
specification](https://segment.com/docs/connections/spec/alias/). For more information on
Amplitude's `usermap` functionality, check out [their
documentation](https://amplitude.zendesk.com/hc/en-us/articles/360002750712-Portfolio-Cross-Project-Analysis#user-mapping-aliasing).

| Segment identifier name | Equivalent Amplitude identifier name |
|--|--|
| `previousId` | `user_id` |
| `userId` | `global_user_id` |

### Mapping Users

Mapping a Segment user's `previousId` to the user's `userId` in Amplitude is as
simple as invoking a Segment `alias` method with an argument for each value.
The below `alias` example would map `previousId` `123` to id `456` in
Amplitude. Both `123` and `456` will still have separate profiles, but the
profiles will be merged together when examining the user's behavior in
[Amplitude's Cross Project
view](https://amplitude.zendesk.com/hc/en-us/articles/360002750712-Portfolio-Cross-Project-Analysis#user-mapping-aliasing).
This kind of mapping is useful for users who have different ids across
different Amplitude projects. The user's `user_ids` act as child ids and can
all be mapped to a single `global_user_id` in Amplitude, allowing you to analyze
the user's aggregate behavior in Amplitude's Cross Portfolio view.

```js
analytics.alias({
  previousId: '123',
  userId: '456'
})
```

If you invoke `alias` client side, you don't need to pass a `previousId`
explicitly. Segment's client-side library sets the value of `previousId` to the
value of the current user's previous `userId`. For example, the below `alias`
method would map `userId` `previousUserId` to the new `userId`, `finalUserId`:

```js
analytics.identify('previousUserId')
analytics.alias('finalUserId')
// remember to identify with the new `userId`
analytics.identify('finalUserId')
```

### Unmapping Users

Segment supports `unmapping` users as well. To unmap a user, simply pass the
user's `previousId` as an integration-specific option. The below example sends
a request to Amplitude that will disassociate user `123` from _all_
`global_user_ids` it was previously associated with.

```js
analytics.alias({
  userId: '456',
  integrations: {
    Amplitude: {
      unmap: '123'
    }
  }
})
```


## Advanced Functionality

### sessionId

[Segment doesn't have a concept for a
session](https://segment.com/blog/facts-vs-stories-why-segment-has-no-sessions-api/).
Client-side calls to Amplitude will include session information since we are
bundling Amplitude's SDK. To set up the same `sessionId` for server-side calls
to Amplitude, you will have to explicitly set the
[session\_id](https://amplitude.zendesk.com/hc/en-us/articles/204771828-HTTP-API#optional-amplitude-specific-keys-for-the-event-argument)
as an integration-specific option like so:

```
{
  "userId": "1234",
  "traits": {
    "email": "someone@somewhere.com",
    "name": "Some Person",
    "industry": "Technology"
  },
  "context": {
    "ip": "00.0.00.00"
  },
  "timestamp": "2016-10-17T00:30:08.276Z",
  "integrations": {
    "Amplitude": {
      "session_id": "<Timestamp>"
    }
  }
}
```

You will need to pass the start time of a session as `<Timestamp>`.

### Setting event-level groups using .track()

Amplitude supports setting event-level groups, meaning the group designation
only applies for the specific event being logged and does not persist on the
user. To specify these groups, provide an integration-specific `groups` property
with key-value pairs corresponding to groupType-groupValue pairs you want to
appear in Amplitude:

```js
analytics.track("Clicked Benefits Dropdown", {
  dropdownColor: "blue"
},
{
  integrations: {
    Amplitude: {
      groups: {
        onboarding_cohort: "Summer 2016"
      }
    }
  }
});
```

### Setting Amplitude Version User Property using .identify()

If you are sending event data server-side (cloud-mode) to Amplitude and want to use their [Release objects](https://help.amplitude.com/hc/en-us/articles/360017800371), you can set the app version user property using code like the example below. Be sure that you send the version details in the context object and not as a standard user trait.

```js
analytics.identify('testUser', {
  email: 'john@doe.com',
  name: 'John Doe'
}, {
  context: {
    app: { 'version': "<value_here>", }
  }
});
```

### Legacy group assignment using .identify()

**Note:** While this behavior will continue to be supported, the recommended
way to associate a user with a group in Amplitude is to use a `.group()` call.

You can associate a user with a group by providing an integration-specific
`groups` property, with the keys being Amplitude "group type" and the values
being Amplitude "group value":

```js
analytics.identify('user-id', {
  email: 'bill@example.com',
  country: 'USA'
}, {
  integrations: {
    Amplitude: {
      groups: {
        sports: ['basketball', 'tennis']
      }
    }
  }
});
```

This `identify` event would create or update a new user in Amplitude and set
`basketball` and `tennis` as their `sport` groups.

### Location Tracking

Supported using our iOS and Android components.

Defaults to enabled. If a user has granted your app location permissions,
enable this setting so that the SDK will also grab the location of the user.
Amplitude will never prompt the user for location permission, so this must be
done by your app.

The user's location is only fetched once per session on iOS. If you need to
force update the location in Amplitude, you can use the native method
`updateLocation` (iOS only) as documented
[here](https://amplitude.zendesk.com/hc/en-us/articles/115002278527#location-tracking).
Also note that calling `enableLocationListening` on the iOS SDK forces the SDK
to update the initial location that was cached during app startup.

On Android, when enabled, this setting adds a latitude and longitude property
to each track event reflecting where geographically the event was triggered.

Note that even you disable location listening, Amplitude's server
side ingestion layer will attempt to determine the user's location from their
IP address.  If you would like to block all location information from being
tracked, contact your CSM at amplitude to disable all location
tracking.

### Set AdvertisingId for DeviceId

Supported using our iOS and Android components.

Segment supports Amplitude's `useAdvertisingIdForDeviceId` method. For iOS,
this will allow you to use the `advertisingIdentifier` instead of
`identifierForVendor` as the Device ID in Amplitude. This is useful for tying
together data from advertising campaigns to analytics data. Note that Apple
prohibits the use of `advertisingIdentifier` if your app does not have
advertising.

On Android, this setting relies on Google's Advertising ID. This method can
return `null` if a Device ID has not been generated yet.

### Increment Traits

This will increment a user property by some numerical value. If the user
property does not have a value set yet, it will be initialized to 0 before
being incremented.

For each trait passed in `identify`, if it is configured in the settings panel
under `traitsToIncrement`, Segment calls Amplitude's `add` method on the
Amplitude identity instance. The trait should have a numerical value to
increment on.

### Set trait once

Supported on all components.

This sets the value of a user property only once. Subsequent operations on that
user property will be ignored. Configure the `trait` you would like to
`setOnce` in the integration settings pane. Segment then checks the `traits`
object for the configured `trait` when `identify` is called.

### Log out of sessions

Supported using our iOS and Android components.

Out-of-session events have a `session_id` of -1 and are not considered part of
the current session, meaning they do not extend the current session. This might
be useful if you are logging events triggered by push notifications, for
example.  To set an out of session event, pass in `true` for the key
`outOfSession` on a `track` call using the integration specific option.

iOS Example:

```objc
[[SEGAnalytics sharedAnalytics]
  track: @"Push Notification Viewed"
  properties: nil
  options: @{
    @"integrations": @{
      @"Amplitude": @{
        @"outOfSession": @YES
      }
    }
  }
];
```

Android Example:

```java
Properties properties = new Properties();
Map<String, Object> amplitudeOptions = new HashMap<>();
amplitudeOptions.put("outOfSession", true);

Options options = new Options().setIntegrationOptions("Amplitude", amplitudeOptions);
Analytics.with(context).track("Push Notification Viewed", properties, options);
```

### Flush

Our mobile components map Segment's `flush` method to Amplitude's `uploadEvents`
method.

### Reset

Our mobile components support logging out users in Amplitude using Segment's
`reset` method. There is no need to worry about aliasing users, as Amplitude
will merge user data on the backend so that any events up to that point from the
same client will be tracked under the same user.

Segment logs out the user by setting the `userId` to `nil` and calling
Amplitude's method to regenerate a new `deviceId`.

## Troubleshooting

### Instrumentation Explorer

Amplitude offers a robust [Instrumentation Explorer/Debugger](https://help.amplitude.com/hc/en-us/articles/360003032451-Instrumentation-Explorer-Debugger). This is a helpful Chrome extension that shows each page interaction that sends an event to Amplitude.

### Amplitude/Segment FAQ

Have a question about the Amplitude/Segment integration that's already been answered? Take a look at [Amplitude's FAQ](https://help.amplitude.com/hc/en-us/articles/217934128-Segment-Amplitude-Integration#faq) for common issues integrating Amplitude with Segment.

### I Don't See My Data In Amplitude

If you aren't seeing your data arrive in Amplitude, we recommend you start by taking a look at our [Analytics.js Guide on validating data being transmitted](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#is-data-being-transmitted-to-your-third-party-destinations) to your third-party destination .
