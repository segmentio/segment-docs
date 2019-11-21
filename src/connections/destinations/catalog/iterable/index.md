---
title: Iterable Destination
---

## Getting Started

{% include content/connection-modes.md %}

When you switch on the Iterable destination in your Segment dashboard, your data will start flowing into Iterable, which will trigger workflows and be available for analytics. You can locate your Iterable API key by going to Destinations → API Keys inside the Iterable app.

**Use Cases**

* [Send personalized emails and messages based on topics of interest with Iterable](https://segment.com/recipes/personalized-email-by-topic-iterable/)
* [Drive more product reviews with Iterable](https://segment.com/recipes/drive-product-reviews-iterable/)
* [Personalize notifications based on topics of interest with Iterable and ClearBrain](https://segment.com/recipes/personalize-notifications-by-interest-iterable-clearbrain/)
* [Increase activation by reaching inactive users across mulitple channels with Iterable](https://segment.com/recipes/multi-channel-activation-iterable/)
* [Automatically send a follow up email when your initial email goes unopened](https://segment.com/recipes/iterable-autoresponder-emails-when-unopened/)

- - -

## Identify

When you call `identify` with one of Segment's sources, we'll call Iterable's [update user endpoint](https://api.iterable.com/api/docs#!/users/updateUser_post_7), to add data for that particular user. You can also call `identify` to update user fields.

Iterable keys users by `email` or a user ID. This user ID will be the Segment `userId` if sent. Note that if you fail to send either of `userId` or `email`, Iterable won't accept the request and throws an error.

### Merge Nested Objects


Iterable offers the option to either merge user fields with nested data or overwrite them. (see their [docs](https://api.iterable.com/api/docs#!/users/updateUser_post_10) for more info). By default, this option is set to false. If you wish to disable this, you can pass an destination specific property called `mergeNestedObjects` and set it's value to `true`.

Here's an example:

```js
analytics.identify({
    userId: 'user-id',
    traits: {
        settings: {
            mobile: true
        }
    },
    integrations: {
        Iterable: {
            mergeNestedObjects: true
        }
    }
});
```

This `identify` event would merge the `mobile` property for this user with any other settings that were previously a part of that users settings field.


## Track

When you call `track` with one of Segment's sources, we'll call Iterable's [track API endpoint](https://api.iterable.com/api/docs#!/events/track_post_0), and send over the event properties as the data fields in the request. The name of the `track` event will show up as a Custom Event in Iterable, and will be available to trigger workflows, segment users, and view analytics.

If a user does not already exist in Iterable, calling `track` for a user event will add that user into the system. You can track with either an `email` or userId (if a `userId` exists for that email).

### Example steps:

First `track` event with `userId` and `email`; user will be created

Subsequent `track` with `userId`

### Ecommerce

Iterable also supports Segment's [ecommerce events](/docs/spec/ecommerce/v2/). This works just as you would expect, using the `track` method.

_Note: there is one important difference from the Segment documentation. If you are using the `Product Added` / `Product Removed` events, you will need to also pass along the "products" field with your cart info, just like Segment's example for the `Order Completed` event. You must include all required fields for the Purchase events in Iterable, which includes the total value of the purchase with the property: `total`. This value works best as a float, double, and possibly an integer. An example might look like this: _

```js
analytics.track("Order Completed", {
  total: 100.00
});
```


## Page

Calling `page` to track pageviews will register as a custom event within Iterable. If you have a page called "shoppingCart" the custom event will be called "shoppingCart page" within Iterable.

If a user does not already exist in Iterable, calling `page` for a user event will add that user into the system. Be sure to pass in the `email` the first time you call page for a user, since Iterable keys users by `email`. After the first time, you can call page with `userId`.

### Example steps:

Call `page` with `userId` and `email`; if with `email` and the `email` doesn't exist, the user will be created.


## Sending Email Data from Iterable

Iterable supports sending [email events](/docs/spec/email/) to other tools on the Segment platform. These events will be sent as `track` calls to the other destinations you've turned on.

To enable this feature, go to Destinations, Third Party, and select Segment in the Add Destinations button. Then, enter your API key.

![Send email events from Iterable](images/Iterable1.png)

## Sending Push Notification Data from Iterable

Iterable supports sending push notification events to Segment. These events will be sent as `track` calls to the other destinations you've turned on. Push events will be automatically enabled once the [Email Source](/docs/sources/iterable/) is enabled.

They support the following events:
`Push Delivered`, `Push Bounced`, `Mobile App Uninstalled`, `Push Opened`
