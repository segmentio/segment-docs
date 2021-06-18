---
title: Recombee AI Destination
rewrite: true
hide-settings: true
---

[Recombee](https://recombee.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a Recommender as a Service, that can use your data to provide the most accurate recommendations of content or products for your users.

This destination can send your interaction data (views, purchases, plays, etc.) to Recombee.

This destination is maintained by Recombee. For any issues with the destination, [contact the Recombee Support team](mailto:support@recombee.com).

> note "Note:"
> The Recombee Destination is currently in beta, which means that they are still actively developing the destination. If you have any feedback to help improve the Recombee Destination and its documentation, [contact the Recombee support team](mailto:support@recombee.com)!


## Getting Started

{% include content/connection-modes.md %} 

> You will need a Recombee account - if you don't have one yet, you can create an instant account at [recombee.com](https://recombee.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners).

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Recombee" in the Destinations Catalog, and select the Recombee destination.
3. Choose which Source should send data to the "Recombee" destination.
4. Go to the [Recombee Admin UI](https://admin.recombee.com):
   - Choose a Recombee Database into which you want to send the interactions.
   - Pick the *Settings* section from the menu on the left.
   - In the section find the *API Identifier* of the Database and the corresponding *Private Token*
5. In the settings of the Recombee Destination in Segment:
    - set the obtained *API Identifier* as the *Database ID*
    - set the obtained *Private Token* as the *API Key*
6. When you start sending the data from Segment to the Recombee Destination you can:
   - see the numbers of the ingested interactions in the KPI console of the [Recombee Admin UI](https://admin.recombee.com) (updated in Real-time)
   - see a particular ingested interaction after clicking on the ID of the item/user in Items/Users catalog sections.


## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Recombee as a [Detail View](https://docs.recombee.com/api.html#add-detail-view). 


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Video Content Playing', {
  session_id: '12345',
  asset_id: '0129370',
  position: 20,
  total_length: 360,
  recomm_id: 'ce52ada4-e4d9-4885-943c-407db2dee837'
});
```

Recombee Destination can process several [Semantic Events](https://segment.com/docs/connections/spec/semantic/):

[Ecommerce](https://segment.com/docs/connections/spec/ecommerce/v2/):
 - [Product Viewed](https://segment.com/docs/connections/spec/ecommerce/v2/#product-viewed) - sends a [Detail View](https://docs.recombee.com/api.html#add-detail-view)
 - [Product Added](https://segment.com/docs/connections/spec/ecommerce/v2/#product-added) - sends a [Cart Addition](https://docs.recombee.com/api.html#add-cart-addition)
 - [Product Removed](https://segment.com/docs/connections/spec/ecommerce/v2/#product-removed) - sends a [Delete Cart Addition](https://docs.recombee.com/api.html#delete-cart-addition)
 - [Order Completed](https://segment.com/docs/connections/spec/ecommerce/v2/#order-completed) sends a [Purchase](https://docs.recombee.com/api.html#add-purchase) for each of the ordered products
- [Product Added to Wishlist](https://segment.com/docs/connections/spec/ecommerce/v2/#product-added) - sends a [Bookmark](https://docs.recombee.com/api.html#add-bookmark)
- [Product Shared](https://segment.com/docs/connections/spec/ecommerce/v2/#product-added) - sends a [Bookmark](https://docs.recombee.com/api.html#add-bookmark)

[Video](https://segment.com/docs/connections/spec/video/):
- Following events send a [View Portion](https://docs.recombee.com/api.html#set-view-portion):
    - [Video Playback Started](https://segment.com/docs/connections/spec/video/#video-playback-started)
    - [Video Content Playing](https://segment.com/docs/connections/spec/video/#video-content-playing)
    - [Video Playback Paused](https://segment.com/docs/connections/spec/video/#video-playback-paused)
    - [Video Playback Completed](https://segment.com/docs/connections/spec/video/#video-playback-completed)

If you want to send interactions from other events, set them to [Track Events Mapping](#Track-Events-Mapping) in Settings.

## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](https://segment.com/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Recombee as a [Detail View](https://docs.recombee.com/api.html#add-detail-view). 


## Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](https://segment.com/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias("507f191e81");
```

Segment sends Alias calls to Recombee as [Merge Users](https://docs.recombee.com/api.html#merge-users) call.

## Delete User

Segment sends a [Delete User](https://docs.recombee.com/api.html#delete-user) call to Recombee on deleting a user.
All the associated data associated with the user (including interactions) are removed from Recombee.

## Reporting of successful recommendations
You can tell Recombee that particular interaction is based on a successful recommendation (e.g. the recommendations were presented to a user and the user clicked one of the items), by setting the ID of the successful recommendation request ([read more details here](https://docs.recombee.com/admin_ui.html#reported-metrics)) to the `recomm_id` property of a Segment event.


The `recomm_id` property is recognized in all the events that send interactions.

In case of [Order Completed](https://segment.com/docs/connections/spec/ecommerce/v2/#order-completed), set the `recomm_id` to the object of the particular product (`products.$.recomm_id`) that was ordered thanks to a successful recommendation.

Sending the `recomm_id` will give you precise numbers about successful recommendations in the KPI section of the [Recombee Admin UI](https://admin.recombee.com). This explicit feedback also helps in optimizing the recommendation models.

## Settings

### Required 

#### Database ID

ID of the Recombee Database into which the interactions will be sent.

#### API Key

Corresponding private token.

### Optional

#### Item ID Property Name

For each [Recombee interaction](https://docs.recombee.com/api.html#user-item-interactions), a `userId` and an `itemId` must be provided.

By setting *Item ID Property Name*, you can specify the name of the Segment event property from which the `itemId` will be read.

If you don't provide the *Item ID Property Name*:
- `product_id` is used for [Ecommerce Events](https://segment.com/docs/connections/spec/ecommerce/v2/)
- `content_asset_id` / `asset_id is used` for [Video Events](https://segment.com/docs/connections/spec/video/)
- `name` property is used if exists


#### Track Events Mapping

This Destination can automatically handle various [Ecommerce Events](https://segment.com/docs/connections/spec/ecommerce/v2/) and [Video Events](https://segment.com/docs/connections/spec/video/) in the *Track* call type (see the [Track section](#Track)).

If you are using some custom Events, you can set which Recombee interaction will be sent for each of them.

The value of the mapping is the name of your event, and the key can be one of:

- [Bookmark](https://docs.recombee.com/api.html#add-bookmark)
- [Cart Addition](https://docs.recombee.com/api.html#add-cart-addition)
- [Detail View](https://docs.recombee.com/api.html#add-detail-view)
- [Purchase](https://docs.recombee.com/api.html#add-purchase)
- [Rating](https://docs.recombee.com/api.html#ratings)
  - a property `rating` must exist and contain a number from interval [-1.0,1.0], where -1.0 means the worst rating possible, 0.0 means neutral, and 1.0 means absolutely positive rating.
- [View Portion](https://docs.recombee.com/api.html#set-view-portion)
  - the portion (how much of the content was consumed by the user) is computed from the `position` and `total_length` properties (see [Content Event Object](https://segment.com/docs/connections/spec/video/#content-event-object)), or can be given as the `portion` property (a number between 0 and 1).


#### API URI

Specify the URI of the Recombee API that should be used.

Example: `rapi.recombee.com`
(note that protocol is omitted).

This is needed if you are calling the Recombee cluster based in a specific region or you were assigned a custom URI by the Recombee Support team.
Otherwise, keep this value unset.
