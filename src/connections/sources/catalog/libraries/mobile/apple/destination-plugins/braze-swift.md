---
title: Analytics Swift Braze Plugin
---

[Braze](https://www.braze.com/), formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.

Braze’s destination plugin code is open source and available on GitHub. You can view it [here.](https://github.com/braze-inc/analytics-swift-braze). This destination plugin is maintained by Braze. For any issues with the destination plugin code, please reach out to Braze's support.

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Braze" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the Destination Settings, add the **API Key**, found in the Braze Dashboard in *App Settings > Manage App Group*.
4. Set up a new App Group REST API Key in the Braze Dashboard in *App Settings > Developer Console > API Settings*. For more information, see [Creating and Managing REST API Keys](https://www.braze.com/docs/api/basics/#creating-and-managing-rest-api-keys) in the Braze documentation. 
  - Select the `users.track` endpoint in the **User Data** section.

## Adding the dependency

### through Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repository.

https://github.com/segment-integrations/analytics-swift-braze{:target="_blank"}

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### through Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-braze.git",
            from: "1.0.0"
        ),
```


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentBraze // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: BrazeDestination())
```
## Screen
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```swift
analytics.screen(title: "SomeScreen")
```

Segment sends Page calls to Braze as custom events if you have enabled either **Track All Pages** or **Track Only Named Pages** in the Segment Settings. 

## Identify

> info "Tip"
> Add Segment's open-source [Middleware](https://github.com/segmentio/segment-braze-mobile-middleware) tool to optimize your integration. This tool limits [Data Point](https://www.braze.com/docs/user_guide/onboarding_with_braze/data_points/) use by debouncing duplicate identify() calls from Segment. For more information, see the project's [README](https://github.com/segmentio/segment-braze-mobile-middleware/blob/master/README.md#how-does-this-work).

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```swift
struct MyTraits: Codable {
        let favoriteColor: String
}

analytics.identify(userId: "a user's id", MyTraits(favoriteColor: "fuscia"))
```

When you Identify a user, Segment passes that user's information to Braze with `userId` as Braze's External User ID.

If you're using a device-mode connection, Braze's SDK assigns a `device_id` and a backend identifier, `braze_id`, to every user. This allows Braze to capture anonymous activity from the device by matching on those identifiers instead of `userId`. This applies to _device-mode connections_.

### Capture the `braze_id` of anonymous users

Pass one of the many identifiers that may exist on an anonymous user profile to the [Braze's User by Identifier REST endpoint](https://www.braze.com/docs/api/endpoints/export/user_data/post_users_identifier/){:target='_blank'} to capture and export the `braze_id`. These identifiers include:
- email address
- phone number
- device_id

Choose an identifier that is available on the user profile at that point in the user lifecycle.

For example, if you pass device_id to the User by Identifier endpoint:

```js
{
  "device_id": “{{device_id}}",
  "fields_to_export": ["braze_id"]
}
```

The endpoint returns:

```js
{
  "users": [
    {
        "braze_id": “{{braze_id}}"
    }
  ],
  "message": "success"
} 
```


> info "Tip"
> Braze is complex. If you decide to use the `braze_id`, consider [contacting Segment Success Engineering](https://segment.com/help/contact/) or a Solutions Architect to verify your Braze implementation.

Segment's special traits recognized as Braze's standard user profile fields (in parentheses) are:

| Segment Event     | Braze Event  |
|-------------------|-------------|
| `firstName`       | `first_name`|
| `lastName`        | `last_name` |
| `birthday`        | `dob`       |
| `avatar`          | `image_url` |
| `address.city`    | `home_city` |
| `address.country` | `country`   |
| `gender`          | `gender`    |

Segment sends all other traits (except Braze's [reserved user profile fields](https://www.braze.com/docs/api/objects_filters/user_attributes_object/#braze-user-profile-fields)) to Braze as custom attributes. You can send an array of strings as trait values but not nested objects.

## Track

> info "Tip"
> To lower [Data Point](https://www.braze.com/docs/user_guide/onboarding_with_braze/data_points/) use, limit the events you send to Braze to those that are relevant for campaigns and segmentation to the Braze destination. For more information, see [Schema Controls](/docs/protocols/schema/).

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call looks like:

```swift
struct TrackProperties: Codable {
        let someValue: String
}

analytics.track(name: "My Event", properties: TrackProperties(someValue: "Hello"))
```
When you `track` an event, Segment sends that event to Braze as a custom event.

> note ""
> Braze requires that you include a `userId` or `braze_id` for all calls made in cloud-mode. Segment sends a `braze_id` if `userId` is missing. When you use a device-mode connection, Braze automatically tracks anonymous activity using the `braze_id` if a `userId` is missing.

> note ""
> Segment removes the following custom properties reserved by Braze:
>
>  - `time`
>  - `quantity`
>  - `event_name`
>  - `price`
>  - `currency`

### Order Completed

When you `track` an event with the name `Order Completed` using the [e-commerce tracking API](/docs/connections/spec/ecommerce/v2/), Segment sends the products you've listed to Braze as purchases.

### Purchases

When you pass [ecommerce events](/docs/connections/spec/ecommerce/v2/), the name of the event becomes the `productId` in Braze. An example of a purchase event looks like:

```swift
struct TrackProperties: Codable {
        let revenue: String
        let currency: String
}

analytics.track(name: "Purchased Item", properties: TrackProperties(revenue: "2000", currency: "USD"))
```

The example above would have "Purchased Item" as its `productId` and includes two required properties that you must pass in:

- `revenue`
- `currency`

Braze supports currency codes as specified in [their Purchase Object Specification](https://www.braze.com/docs/api/objects_filters/purchase_object/). Be aware that any currency reported other than USD displays in [the Braze UI in USD based on the exchange rate on the date it was reported](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/logging_purchases/#logging-purchases).

You can add more product details in the form of key-value pairs to the `properties` object. The following reserved keys are not passed to Braze if included in your Track call's `properties` object:

- `time`
- `product_id`
- `quantity`
- `event_name`
- `price`


## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```swift
struct MyTraits: Codable {
        let username: String
        let email: String
        let plan: String
}

// ...

analytics.group(groupId: "group123", traits: MyTraits(
        username: "MisterWhiskers",
        email: "hello@test.com",
        plan: "premium"))
```

When you call `group`, Segment sends a custom attribute to Braze with the name `ab_segment_group_<groupId>`, where `<groupId>` is the group's ID in the method's parameters. For example, if the group's ID is `1234`, then the custom attribute name is `ab_segment_group_1234`. The value of the custom attribute is `true`.


