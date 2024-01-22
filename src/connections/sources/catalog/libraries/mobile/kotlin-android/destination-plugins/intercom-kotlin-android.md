---
title: Analytics Kotlin Intercom Plugin
id: 54521fd725e721e32a72eec6
---
[Intercom](https://www.intercom.com/){:target="_blank"} makes customer messaging apps for sales, marketing, and support, connected on one platform. The Intercom Destination Plugin is open-source.You can browse the Kotlin code for [Android](https://github.com/segment-integrations/analytics-kotlin-intercom/tree/main){:target="_blank"} on GitHub.

## Getting Started

1.  From the Segment Destinations page click **Add Destination**.
2.  Search for "Intercom" and select it in the results that appear.
3.  Choose which Source to connect Intercom to.
4.  Authorize your Intercom account in Segment and select the Intercom Account to sync with Segment.

    You can choose which account to sync from the drop down menu in the top right. If you are using [server-side sources](/docs/connections/sources#server), Segment starts passing data through once you activate the Destination. For other libraries  continue reading below.
5. [Find your "App ID" in the Intercom UI](https://docs.intercom.com/faqs-and-troubleshooting/getting-set-up/where-can-i-find-my-app-id){:target="_blank"} or by navigating to the Gear Menu and clicking on "App Settings" followed by "API Keys". It should look something like `9iefb489`.

Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Intercom's `library.js` onto your page.

This means you should remove Intercom's snippet from your page.

## Adding the dependency

## Adding the dependency

To install the Segment-Intercom integration, simply add this line to your gradle file:

```
implementation com.segment.analytics.kotlin.destinations:intercom:<latest_version>
```

Or the following for Kotlin DSL

```
implementation(com.segment.analytics.kotlin.destinations:intercom:<latest_version>)
```


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library.  Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.intercom.IntercomDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = IntercomDestination(applicationContext))
```

Your events will now begin to flow to Intercom in device mode.



## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```java
analytics.identify("user-123", buildJsonObject {
    put("name", "Iñigo Montoya")
    put("email", "avenger@example.com")
    put("company", {
        "id": 123, 
        "name": "Iñigo & Friends Holding Company"
    })
    put("createdAt", "Mon Mar 26 2018 17:44:51 GMT+0000 (UTC)")
});
```

When you call Identify, Segment creates or updates the user in Intercom using their [Users API](https://developers.intercom.com/reference#users){:target="_blank"}. Segment does not currently support creation of leads.

> info ""
> Intercom associates Track events with known users. An Identify call with a `userId` is required before Track events are associated properly. Segment's bundled mobile SDKs also require that `identify` be called prior to `track`, but accepts setting an unknown user in Intercom using the `anonymousId`.

Keep reading for more information about the Identify call depending on the source type you send it from.

- Passing `traits.company` creates a new Intercom Company if the `company_id` does not match a known company. See the [Intercom contact model documentation](https://developers.intercom.com/intercom-api-reference/reference/the-contact-model){:target="_blank"} for more details.
- Trait values must be no longer than 255 characters


Intercom supports both logged-in or logged-out users. You must register your users with Intercom before you can talk to them or see what they do in your app. This means that Identify must be called before Track.

Intercom allows users to choose to track only known or only unknown users, as well as both. Segment supports the ability to track both by checking for logged in users (determined by the `userId`) and falling back to setting the user as "Unidentified" when this is not present.

Intercom knows when your app is backgrounded and comes alive again, so you won't need to re-register your users.

Segment maps the following Intercom standard attributes on Identify.

| Segment Parameter                         | Intercom Parameter       | Description                          |
| ----------------------------------------- | ------------------------ | ------------------------------------ |
| `traits.userId`                           | `user_id`                | The user ID for this user.           |
| `traits.email`                            | `email`                  | The email of this user.              |
| `traits.name`                             | `name`                   | The full name of this user.          |
| `traits.phone`                            | `phone`                  | The phone number for this user.      |
| `traits.company`                          | `company`                | The company associated for this user.|
| `traits.signedUpAt`                       | `created_at`             | The signed up date as an NSDate (iOS) & Long (Android) |
| `integrations.intercom.language_override` | `languageOverride`       | The [language override](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/localize-intercom-to-work-with-multiple-languages){:target="_blank"} code for this user. |
| `integrations.intercom.unsubscribed`      | `unsubscribedFromEmails` | A boolean indicating if the user has unsubscribed from emails.|
| remaining `traits`                        | `customAttributes`       | Custom attributes for this user.     |

> info ""
> Intercom supports values of type String, Long, Float, Double, Boolean, Character, Byte, Short or Integer on Android. Pass Android traits using camel case to conform with Java convention.

#### Collect Context

When this option is selected, Identify calls include contextual information collected by [Segment's mobile libraries](/docs/connections/sources#mobile) if it is available. This info is set as Custom Attributes on the Intercom user.

The fields collected from the [context object](/docs/connections/spec/common/) are `device.type`, `device.manufacturer`, `device.model`, `os.name`, `os.version`, `app.name`, `app.version` and appear in Intercom as `device_type`, `device_manufacturer`, `device_model`, `os_name`, `os_version`, `app_name` and `app_version`.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```java
analytics.track("View Product", buildJsonObject {
    put("productId", 123)
    put("productName" "Striped trousers")
});
```

> info ""
> Because Intercom only associates Track events with known users, an Identify call with a `userId` is required before Track events are associated properly.


### Revenue and currency
If you send `properties.revenue` and `properties.currency`, Segment formats that according to [Intercom's Monetary Amount](https://developers.intercom.com/intercom-api-reference/reference/submit-a-data-event#metadata-object){:target="_blank"} and send it as:

```js
price: {
  amount: <properties.revenue> * 100, // since Intercom requires this in cents
  currency: <properties.currency> // defaults to 'usd'
}
```

The bundled mobile integrations also check `properties.total` if `properties.revenue` is not present, and assign the total value as the amount value.

### Limited Properties
Intercom can only store [five event properties](http://docs.intercom.io/Intercom-for-user-analysis/Tracking-User-Events-in-Intercom#metadata-support){:target="_blank"} per event. That means if you send an event to Segment with more than five properties, Intercom only shows the first five properties.

### Limited Events

Intercom only allows a total of 120 unique _active_ event names. If you're sending Segment more than 120 unique event names, Intercom only accepts the first 120 events that their servers see, and the rest throw an error.

In Intercom, an "Active" event is an event that hasn't been archived. If you archive an event, it makes it inactive and removes it from your 120 active events. If you need to bring your account back under the 120 event limit, archive some events from in the Intercom UI by navigating to **Settings > (workspace name) data > Events**, then click on the event to archive.

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```java
analytics.group("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```

Segment supports Intercom companies in all sources. Users can be put into multiple groups, which associate them to multiple companies in Intercom.

When you call Group from any of any server-side libraries or mobile sources in cloud-mode (without Segment's mobile Intercom SDK installed), you must include either the `userId` or `email` of an existing user in Intercom.

> info ""
> In order for the Company Sessions Count to update within Intercom, the company must first be recorded in an `identify` call.


| Segment Parameter      | Intercom Parameter            | Description                                   |
| ---------------------- | ----------------------------- | --------------------------------------------- |
| `groupId`              | `companyId`                   | The ID for the company.                       |
| `traits.name`          | `name`                        | The name of the company.                      |
| `traits.plan`          | `plan`                        | The plan of the company.                      |
| `traits.monthly_spend` | `monthlySpend`                | The monthly spend of the company.             |
| `traits.company`       | `intercomSettings.company`    | The company associated for this user.         |
| `traits.createdAt`     | `intercomSettings.created_at` | The UNIX timestamp when the user was created. |
| remaining `traits`     | `customAttributes`            | Custom attributes for this user.              |


> info ""
> Intercom supports values of type `String`, `Long`, `Float`, `Double`, `Boolean`, `Character`, `Byte`, `Short` or `Integer` on Android. Pass Android traits using camel case to conform with Java convention.

## Reset
When `reset` is called The bundled mobile SDK `reset` method un-registers a user in Intercom. When users want to log out of your app and you call Segment's `reset` method, Segment calls:

```java
  intercom.logout()
```

## Best Practices

### Arrays and Objects

Intercom doesn't support custom arrays or objects. This means that if you want to send a certain user `trait` or event `property` to Intercom, you must send them at the top level.

This limitation does not apply, however, for mapping `company` objects on [Identify calls](/docs/connections/spec/identify/). Segment continues to handle that in the same way as before. This is only applicable for any custom traits or properties.