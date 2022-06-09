---
title: Recombee AI Destination
rewrite: true
hide-settings: true
hide-personas-partial: true
id: 6095391bd839b62fca8a8606
---
[Recombee](https://recombee.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a Recommender as a Service, that can use your data to provide the most accurate recommendations of content or products for your users.

Use this Segment destination to send your interaction data views, purchases, plays, etc.) to Recombee.

This destination is maintained by Recombee. For any issues with the destination, [contact the Recombee Support team](mailto:support@recombee.com).

> note "Note:"
> The Recombee Destination is currently in beta, which means that they are still actively developing the destination. If you have any feedback to help improve the Recombee Destination and its documentation, [contact the Recombee support team](mailto:support@recombee.com)!


## Getting Started

{% include content/connection-modes.md %}

1. If you don't already have one, set up a [Recombee account](https://recombee.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners).
1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Recombee" in the Destinations Catalog, and select the Recombee destination.
3. Choose which Source should send data to the Recombee destination.
4. Go to the [Recombee Admin UI](https://admin.recombee.com):
   - Choose the Recombee Database where you want to send the interactions.
   - Click **Settings** in the menu on the left.
   - In the **Settings** section find the **API Identifier** of the Database and its corresponding **Private Token**
5. Back in the Segment web app, go to the Recombee destination settings.
    - Paste the **API Identifier** you just copied in the **Database ID** field.
    - Paste the **Private Token** you just copied in the **API Key** field.

Once you send the data from Segment to the Recombee destination you can:
   - Go to the KPI console of the [Recombee Admin UI](https://admin.recombee.com) to see the numbers of the ingested interactions (updated in Real-time)
   - Click the ID of an Item, User in Items, or section in the Users catalog to see a specific ingested interaction.


## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Recombee as a [Detail View](https://docs.recombee.com/api.html#add-detail-view).


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Video Content Playing', {
  session_id: '12345',
  asset_id: '0129370',
  position: 20,
  total_length: 360,
  recomm_id: 'ce52ada4-e4d9-4885-943c-407db2dee837'
});
```

#### Sending semantic spec events to Recombee
Recombee Destination can process several [Semantic Events](/docs/connections/spec/semantic/):

[Ecommerce](/docs/connections/spec/ecommerce/v2/):
 - [Product Viewed](/docs/connections/spec/ecommerce/v2/#product-viewed) - sends a [Detail View](https://docs.recombee.com/api.html#add-detail-view)
 - [Product Added](/docs/connections/spec/ecommerce/v2/#product-added) - sends a [Cart Addition](https://docs.recombee.com/api.html#add-cart-addition)
 - [Product Removed](/docs/connections/spec/ecommerce/v2/#product-removed) - sends a [Delete Cart Addition](https://docs.recombee.com/api.html#delete-cart-addition)
 - [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) sends a [Purchase](https://docs.recombee.com/api.html#add-purchase) for each of the ordered products
- [Product Added to Wishlist](/docs/connections/spec/ecommerce/v2/#product-added) - sends a [Bookmark](https://docs.recombee.com/api.html#add-bookmark)
- [Product Shared](/docs/connections/spec/ecommerce/v2/#product-added) - sends a [Bookmark](https://docs.recombee.com/api.html#add-bookmark)

[Video](/docs/connections/spec/video/):
- Following events send a [View Portion](https://docs.recombee.com/api.html#set-view-portion):
    - [Video Playback Started](/docs/connections/spec/video/#video-playback-started)
    - [Video Content Playing](/docs/connections/spec/video/#video-content-playing)
    - [Video Playback Paused](/docs/connections/spec/video/#video-playback-paused)
    - [Video Playback Completed](/docs/connections/spec/video/#video-playback-completed)

If you want to send interactions from other events, set them to [Track Events Mapping](#track-events-mapping-optional) in Settings.

## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Recombee as a [Detail View](https://docs.recombee.com/api.html#add-detail-view).


## Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias("507f191e81");
```

Segment sends Alias calls to Recombee as [Merge Users](https://docs.recombee.com/api.html#merge-users) call.

## Delete User

Segment sends a [Delete User](https://docs.recombee.com/api.html#delete-user) call to Recombee on deleting a user.
All the data associated with the user (including interactions) are removed from Recombee.

## Reporting successful recommendations
You can tell Recombee that a specific interaction is based on a successful recommendation (meaning that the recommendations were presented to a user, and the user clicked one of the items), by setting the ID of the successful recommendation request on the `recomm_id` property of a Segment event. You can read more about this setting in [Recombee's Reported Metrics documentations](https://docs.recombee.com/admin_ui.html#reported-metrics))


Recombee recognizes the `recomm_id` property in all the events that send interactions.

In case of [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed), set the `recomm_id` to the object of the product (`products.$.recomm_id`) that was ordered because of a successful recommendation.

Sending the `recomm_id` gives you precise numbers about successful recommendations in the KPI section of the [Recombee Admin UI](https://admin.recombee.com). This explicit feedback also helps you optimize your recommendation models.

## Recombee destination settings

<!--LR: 6/28/2021. We're manually adding the settings in the doc here because the DevCenter does not support Markdown, and copy/pasting into Partner Portal resulted in broken rendering. Hopefully some day this can be improved. -->

### Database ID (Required)

ID of the Recombee Database into which you will send the interactions.

### API Key (Required)

The private token for the database.

### Item ID Property Name (Optional)

For each [Recombee interaction](https://docs.recombee.com/api.html#user-item-interactions), you must provide a `userId` and an `itemId`.

You can set the **Item ID Property Name** to specify the Segment event property to use as the `itemId`.

If you don't provide an **Item ID Property Name**:
- `product_id` is used for [Ecommerce Events](/docs/connections/spec/ecommerce/v2/).
- `content_asset_id` or `asset_id` is used for [Video Events](/docs/connections/spec/video/).
- `name` property is used if it exists.


### Track Events Mapping (Optional)

Recombee can automatically handle different [Ecommerce Events](/docs/connections/spec/ecommerce/v2/) and [Video Events](/docs/connections/spec/video/) in the *Track* call type (see the [Track section](#track)).

If you use some custom Events, you can set which Recombee interaction to send for each one.

The value of the mapping is the name of your event, and the key can be one of:

- [Bookmark](https://docs.recombee.com/api.html#add-bookmark)
- [Cart Addition](https://docs.recombee.com/api.html#add-cart-addition)
- [Detail View](https://docs.recombee.com/api.html#add-detail-view)
- [Purchase](https://docs.recombee.com/api.html#add-purchase)
- [Rating](https://docs.recombee.com/api.html#ratings)
  - a property `rating` must exist and contain a number from interval [-1.0,1.0], where -1.0 means the worst rating possible, 0.0 means neutral, and 1.0 means absolutely positive rating.
- [View Portion](https://docs.recombee.com/api.html#set-view-portion)
  - the portion (how much of the content was consumed by the user) is computed from the `position` and `total_length` properties (see [Content Event Object](/docs/connections/spec/video/#content-event-object)), or can be given as the `portion` property (a number between 0 and 1).


### API URI (Optional)

Specify the URI of the Recombee API to use. Omit the protocol. For example, `rapi.recombee.com`.

Only use this setting if you call the Recombee cluster based in a specific region, or if you were assigned a custom URI by the Recombee Support team.
Otherwise, keep this setting blank.
