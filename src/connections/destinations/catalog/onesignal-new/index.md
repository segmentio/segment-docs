---
rewrite: true
title: OneSignal New Destination
hide-personas-partial: true
---

[OneSignal](https://onesignal.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the market leader in driving customer engagement with multi-channel messaging across Web and Mobile Push, In-App Messages, SMS, and Email subscribers.
This destination is maintained by OneSignal. For any issues with the destination, [contact OneSignal Support team](mailto:support@onesignal.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
1. Search for OneSignal in the Destinations Catalog, and select the OneSignal destination.
1. Choose which Source should send data to the OneSignal destination.
1. Go to the [OneSignal dashboard](https://app.onesignal.com/apps/){:target="_blank"}, select the App and go to the *Settings > Keys & IDs*. Copy the **App ID** and the **API key**.
1. Enter the OneSignal **App ID** and the **API key** in the OneSignal destination settings in Segment and Enable the destination.
1. Make sure you have an **[External User ID](https://documentation.onesignal.com/docs/onboarding-with-onesignal#step-3-connect-user-data-to-onesignal)** set for your users on OneSignal. OneSignal uses the **External User ID** to match with the **User ID** value from Segment.

> info ""
> The OneSignal Destination is available customers on OneSignal Professional and Enterprise plans.

## Supported methods

OneSignal supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to OneSignal. For example:

```js
analytics.identify('userId123', {
  firstName: 'John',
  lastName: 'Doe',
     country: ‘USA’
});
```

These user traits appear as player [data tags](https://documentation.onesignal.com/docs/add-user-data-tags) in OneSignal.

> warning ""
> OneSignal does not accept nested objects or arrays as user properties.

![](images/demo.png)



### Track

Send [Track](/docs/connections/spec/track) calls to OneSignal. For example:

```js
analytics.track('Add to Cart', {
    product_name: 'Sunglasses',
    brand: 'Rayban'
})
```

For events and associated properties sent using a Track call, OneSignal drops the event name (for example, `Add to Cart`), but stores all the properties (for example, `productname` and `brand`) as data tags.

![](images/track-example.png)




## Personas

You can send computed traits and audiences generated using [Segment Personas](/docs/personas) to OneSignal. To learn more about Personas, contact Segment for a [demo](https://segment.com/contact/demo){:target="_blank"}.

### Audiences

Persona Audiences appear as a [segment](https://documentation.onesignal.com/docs/segmentation) in OneSignal.

Audiences sent as part of a Track call create a OneSignal [segment](https://documentation.onesignal.com/docs/segmentation) with the Audience Name.

Audiences sent as part of an Identify call:

- Create a OneSignal segment with the Audience Name
- add data tags (if there are additional properties in the Identify call) on all the matching user records.

![](images/audiences.jpg)

The Identify and Track calls are sent to OneSignal whenever a user enters or exits the Audience.

### Computed Traits

Personas Computed Traits are stored as [Data Tags](https://documentation.onesignal.com/docs/add-user-data-tags) on the OneSignal user (player) records whether passed to OneSignal as an Identify call or a Track call. You can then use these data tags to manually create OneSignal segments and automate your messaging workflows.

# OneSignal Destination FAQ

**Managing Segment’s Reserved and Custom Traits**

* All Segment user traits are sent to OneSignal as data tags. The number of data tags allowed on OneSignal depends on your OneSignal pricing plan. Tags over the entitled number will be dropped.

* OneSignal always updates the `firstName` and the `lastName` properties for matching users. All other traits are added/updated on a firstcome basis. `firstName` and `lastName` tags are stored as `first_name` and `last_name`.

* User properties sent to OneSignal with blank/null values are removed from the OneSignal user record. This is done to make sure you are within your data tag limits.

* OneSignal doesn’t store email and phone properties as these key identifiers are stored as separate player records in OneSignal. To update user traits for these records in OneSignal
  * Create a player record with the email address and/or a phone number and map those records with the External_User_ID.
  * Additional properties sent from Segment are mapped across all your matching records, including email and phone number records.
