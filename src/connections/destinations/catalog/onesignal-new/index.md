---
rewrite: true
title: OneSignal New Destination
hide-personas-partial: true
redirect_from: '/connections/destinations/catalog/onesignal/'
id: 60b6a5b69fec493efbd3c64c
---
[OneSignal](https://onesignal.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is the market leader in driving customer engagement with multi-channel messaging across Web and Mobile Push, In-App Messages, SMS, and Email subscribers.

This destination is maintained by OneSignal. For any issues with the destination, [contact the OneSignal support team](mailto:support@onesignal.com){:target="_blank"}.

> info ""
> The OneSignal Destination is available to customers on OneSignal Growth, Professional, and Enterprise plans.

## Getting started

1. Log in to the [OneSignal dashboard](https://app.onesignal.com/){:target="_blank"}.
2. Navigate to **Segment App > Settings > Analytics > Segment.com** and click **Activate**.
3. The Segment App opens in a new window. Log in to authenticate the connection from OneSignal.
4. Select the workspace and source to connect with OneSignal.

> info ""
> OneSignal maps the `userId` field to the **[External User ID](https://documentation.onesignal.com/docs/onboarding-with-onesignal#step-3-connect-user-data-to-onesignal){:target="_blank"}** field in OneSignal.

## Supported methods

OneSignal supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to update users. For example:

```js
analytics.identify('userId123', {
  firstName: 'John',
  lastName: 'Doe',
     country: ‘USA'
});
```

Segment sends Identify traits as [Player Data Tags](https://documentation.onesignal.com/docs/add-user-data-tags){:target="_blank"} in OneSignal.

> warning ""
> OneSignal doesn't accept nested objects or arrays as user properties.

![A screenshot of the Users page in OneSignal.](images/demo.png)

> info "Data Tag Limits"
> Your OneSignal plan may cap incoming Data Tags. Once you've reached your Data Tag limit, your user traits won't update in your OneSignal destination.

### Track

Send [Track](/docs/connections/spec/track) calls to update Data Tags. For example:

```js
analytics.track('Add to Cart', {
    product_name: 'Sunglasses',
    brand: 'Rayban'
})
```

OneSignal stores Track properties as Data Tags but drops the event name. In the example, `Add to Cart` is dropped.

To keep the event names on OneSignal Data Tags, append the event name to the properties. For example, `Add_to_Cart_brand` instead of `brand`.

![Screenshot of the OneSignal dashboard showing a notification for an "eShoppe" campaign.](images/track-example.png)

## Engage

You can send Computed Traits and Audiences generated using [Engage](/docs/engage) to OneSignal.

### Audiences

Engage audiences appear as a [segment](https://documentation.onesignal.com/docs/segmentation){:target="_blank"} in OneSignal.

Track calls from Audiences create a OneSignal [segment](https://documentation.onesignal.com/docs/segmentation){:target="_blank"} with the audience name.

Identify calls from Audiences create a OneSignal [segment](https://documentation.onesignal.com/docs/segmentation){:target="_blank"} with the audience name and add Data Tags on all the matching user records.

![Screenshot of the OneSignal "eShoppe" dashboard](images/audiences.jpg)

Audiences sends Identify and Track calls to OneSignal when a user enters or exits the Audience.

### Computed Traits

OneSignal stores Track and Identify calls from Engage Computed Traits as [Data Tags](https://documentation.onesignal.com/docs/add-user-data-tags){:target="_blank"} for the OneSignal User/Player's records.

## FAQ

#### How do I manage Segment's Reserved and Custom Traits?

* Segment sends user traits to OneSignal as Data Tags. The number of data tags OneSignal allows depends on your OneSignal pricing plan. OneSignal drops the data tags that go over your set number.
* OneSignal always updates the `firstName` and the `lastName` properties for matching users. All other traits are added or updated on a first-come basis. `firstName` and `lastName` tags are stored as `first_name` and `last_name`.
* Send User properties to OneSignal with blank or `null` values to remove the corresponding Data Tag from the OneSignal user record.
* OneSignal doesn't store `email` and `phone` properties. To update `email` and `phone` properties in OneSignal, create a player record with the email address and/or a phone number and map those records with the External_User_ID. Additional properties from Segment map across all your matching records, including email and phone number records.
