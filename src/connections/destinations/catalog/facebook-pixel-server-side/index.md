---
title: Facebook Conversions API Destination
rewrite: true
beta: true
strat: facebook
---

[Facebook Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api) allows advertisers to send events from their servers directly to Facebook. Server-Side events are linked to a pixel and are processed like browser pixel events. This means that Server-Side events are used in measurement, reporting, and optimization in the same way as browser pixel events.

> info "Destination name change"
> Facebook Conversions API was renamed from Facebook Pixel Server-Side.

### Other Facebook Destinations Supported by Segment

This page is about the **Facebook Conversions**. For documentation on other Facebook destinations, including Facebook Pixel, see the pages linked below.

| **Facebook Destination**                                                                                    | Supported by Personas |
| ----------------------------------------------------------------------------------------------------------- | --------------------- |
| **[Facebook App Events](/docs/connections/destinations/catalog/facebook-app-events/)**                      | Yes                   |
| **[Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/)** | Yes                   |
| **[Facebook Offline Conversions](/docs/connections/destinations/catalog/facebook-offline-conversions/)**    | Yes                   |
| **[Facebook Pixel](/docs/connections/destinations/catalog/facebook-pixel/)**                                | No                    |

## Getting Started

{% include content/connection-modes.md %}

### Set up in Segment

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Facebook Conversions API" in the Destinations Catalog, and select the "Facebook Conversions API" destination.
3. Choose which Source should send data to the "Facebook Conversions API" destination.
4. Go to the Facebook Business [Event Manager Pixel Settings](https://business.facebook.com/events_manager/pixel/settings), find and copy the "Pixel ID".
5. Enter the "Pixel ID" in the "Facebook Conversions API" destination settings in Segment.

! See the Use Cases section below for additional implementation steps

## Use Cases

Facebook Conversions API satisfies multiple use cases. It can be used a complement to [Facebook Pixel](/docs/connections/destinations/catalog/facebook-pixel/), or it can be used as a stand-alone alternative.

Implementation Options:
1. [Send the same events from both the browser and the server](/docs/connections/destinations/catalog/facebook-conversions-api/#send-the-same-events-from-both-the-browser-and-the-server).
2. [Send different events; some from the browser others from the server](/docs/connections/destinations/catalog/facebook-conversions-api/#send-different-events-some-from-the-browser-others-from-the-server).
3. [Only send events from the server](/docs/connections/destinations/catalog/facebook-conversions-api/#only-send-events-from-the-server).

### Send the same events from both the browser and the server

#### Description
This approach provides a redundancy that ensures maximum signal reliability. Events that previously could have been lost on the browser side, for a variety of network reasons, are now captured via conversions API. This can be used if you do not want to miss any events coming from the browser. 

#### Match rate considerations
For this option to work best, the same `external_id` needs to be passed from the browser and from the server. To easily achieve this go to your Segment destination settings for Facebook Pixel and toggle on the setting called **Use UserId or Anonymous Id as External Id**. The Facebook Conversions API destination uses the userId (or anonymousId if not present) to set the External Id by default. Therefore enabling this on Facebook Pixel will allow Facebook to match the users. There are some additional steps you can take to increase the match rate for server-side events. [User traits can be passed into the context object of the track events](/docs/connections/destinations/catalog/facebook-conversions-api/#default-mappings-to-facebook-properties). Other fields such as `userAgent`, `ip` address, and [Facebook's parameters (fbp, fbc)](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc) can all be collected from the browser and passed to the server and then manually entered into the events.

#### Dedupliation considerations
Events will only be deduplicated if the same event is sent first from the browser and then from the server. When this sequence occurs the server event will be discarded. If you send two consecutive browser events with the same information, neither will be discarded. If you send two consecutive server events with the same information, neither will be discarded.

### Send different events; some from the browser others from the server

#### Description
This approach can be used if you want to separate events completed on a user's browser from events completed outside the browser. Sensitive information is best kept out of browsers. Any data you don’t want exposed to users should only be sent server-side. You can also set up the Conversions API to measure customer actions that are deeper in your marketing funnel. Seeing these deeper funnel events means you can more accurately measure how your ads are helping you reach your business goals.

#### Match rate considerations
For this option to work best, the same `external_id` needs to be passed from the browser and from the server. To easily achieve this go to your Segment destination settings for Facebook Pixel and toggle on the setting called **Use UserId or Anonymous Id as External Id**. The Facebook Conversions API destination uses the userId (or anonymousId if not present) to set the External Id by default. Therefore enabling this on Facebook Pixel will allow Facebook to match the users. There are some additional steps you can take to increase the match rate for server-side events. [User traits can be passed into the context object of the track events](/docs/connections/destinations/catalog/facebook-conversions-api/#default-mappings-to-facebook-properties). Other fields such as `userAgent`, `ip` address, and [Facebook's parameters (fbp, fbc)](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc) can all be collected from the browser and passed to the server and then manually entered into the events.

#### Deduplication consideratoins
If you choose this option, you do not need to worry about event deduplication.

### Only send events from the server 

#### Description

This approach can be used if you do not wish to track users from the browser with Facebook Pixel. Facebooks Conversions API allows you to have control over your customer data by enabling complete control over the identifiers that are passed to Facebook. This is different from the default behavior of Facebook Pixel which collects cookie data, as well as browser data such as the IP Address and the User Agent.

#### Match rate considerations

Without certain data fields collected from the browser the match rate will not be as strong when using Facebook Conversions API as a stand alone. However, there are some steps you can take to increase the match rate for server-side events. [User traits can be passed into the context object of the track events](/docs/connections/destinations/catalog/facebook-conversions-api/#default-mappings-to-facebook-properties). Other fields such as `userAgent` and `ip` address can be collected from the browser and passed to the server and then manually entered into the events.

#### Deduplication considerations
If you choose this option, you do not need to worry about event deduplication.


## Track

Currently, Facebook Conversions only supports Track calls.

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track('Products Searched', {
  query: 'blue roses'
});
```

### Default Mappings to Facebook Standard Events

The following mappings are automatic and require no additional set up. Any of the Segment Ecommerce Events in the table below will be sent as the corresponding Facebook Standard Event. You learn more about these in the Facebook pixel [standard events documentation](https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events).

| Segment Ecommerce Event | Facebook Standard Event |
| ----------------------- | ----------------------- |
| `Checkout Started`      | `InitiateCheckout`      |
| `Order Completed`       | `Purchase`              |
| `Product Added`         | `AddToCart`             |
| `Product List Viewed`   | `ViewContent`           |
| `Product Viewed`        | `ViewContent`           |
| `Products Searched`     | `Search`                |

! Facebook requires a currency for "Purchase" events -- if you leave it out, Segment will set a default value of "USD".

### Custom Mappings to Facebook Standard Events

To map any of your Segment Events (not listed in the table above) to a Facebook _Standard event_, use the Segment destination setting labeled **Map Your Events to Standard FB Events**. Then, when Segment receives an event that appears in that mapping, the event is sent to Facebook as the standard event you specified. All properties included in the event are sent as event properties. 


### Facebook Custom Events
Any unmapped events are automatically sent to Facebook Conversions as a _custom_ event. If Facebook's predefined standard events aren't suitable for your needs, you can track your own custom events, which also can be used to define [custom audiences](https://developers.facebook.com/docs/facebook-pixel/implementation/custom-audiences) for ad optimization. Custom events also support parameters, which you can include to provide additional information about each custom event.

!! Custom event names cannot exceed 50 characters in length.

### Default Mappings to Facebook Properties

Segment maps the following Segment traits to [Facebook properties](https://developers.facebook.com/docs/marketing-api/server-side-api/parameters):

| **Segment Property**                | **Pixel Property**                   | **Notes**                                                                                                                                       |
| ----------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `context.ip`                        | `user_data.client_ip_address`        |                                                                                                                                                 |
| `context.traits.address.city`       | `user_data.ct`                       | hashed                                                                                                                                          |
| `context.traits.address.postalCode` | `user_data.zp`                       | hashed                                                                                                                                          |
| `context.traits.address.state`      | `user_data.st`                       | hashed                                                                                                                                          |
| `context.traits.birthday`           | `user_data.db`                       | hashed                                                                                                                                          |
| `context.traits.email`              | `user_data.em`                       | hashed                                                                                                                                          |
| `context.traits.firstName`          | `user_data.fn`                       | hashed                                                                                                                                          |
| `context.traits.lastName`           | `user_data.ln`                       | hashed                                                                                                                                          |
| `context.traits.phone`              | `user_data.ph`                       | hashed                                                                                                                                          |
| `context.userAgent`                 | `user_data.client_user_agent`        |                                                                                                                                                 |
| `event`                             | `event_name`                         |                                                                                                                                                 |
| `messageId`                         | `event_id`                           |                                                                                                                                                 |
| `properties.currency`               | `custom_data.currency`               | Defaults to USD if not set                                                                                                                      |
| `properties.fbc`                    | `fbc`                                |                                                                                                                                                 |
| `properties.fbp`                    | `fbp`                                |                                                                                                                                                 |
| `properties.products[x].price`      | `custom_data.contents[x].item_price` | Must be an integer                                                                                                                              |
| `properties.products[x].product_id` | `custom_data.contents[x].id`         | Must be a string                                                                                                                                |
| `properties.products[x].quantity`   | `custom_data.contents[x].quantity`   | Must be an integer                                                                                                                              |
| `properties.products`               | `custom_data.contents`               | Must be an array. `num_items` is set to the length of this                                                                                      |
| `properties.query`                  | `custom_data.search_string`          |                                                                                                                                                 |
| `properties.revenue`                | `custom_data.value`                  | Customizable, see [Alternative Value Properties](#alternative-value-properties)                                                                 |
| `properties.status`                 | `custom_data.status`                 |                                                                                                                                                 |
| `timestamp`                         | `event_time`                         |                                                                                                                                                 |
| `userId`                            | `external_id`                        | Any unique ID from the advertiser, such as membership IDs, user IDs, and cookie IDs. See [Alternative External IDs](#alternative-external-ids). |


To access the `contexts` and `context.traits` objects in a Track call, you can use the [context-traits format](/docs/connections/sources/catalog/libraries/website/javascript/#context--traits) as in the example below.

```javascript
analytics.track("Clicked Email", {
    emailCampaign: 'First Touch'
},
{
    traits: {
        name: "John Doe"
    }
});
```

### Custom Mappings to Facebook Properties
Any properties you send that aren't listed above are sent in the 'Custom Data' part of the Segment payload to Facebook.

### Alternative External IDs

By default, Segment sends the `userID` as `externalID`, and if `userID` is absent falls back to `anonymousID`. To use a different field in your payload as the External ID, use the "Alternative External ID Field". An example value for this setting would be `properties.externalId`.

### Alternative "Value" Properties

For most events Segment sends revenue for the Pixel value field, but for
the pre-purchase events "Product Viewed" and "Product Added", Segment
uses the value of the "Value Field Identifier" setting to determine which
property to use for the "value" field. This field defaults to
`price`.

## Limited Data Use

{% include content/facebook-ldu-intro.md %}

> info ""
> The **Use Limited Data Use** destination setting is disabled by default for all Facebook destinations except for Facebook Pixel. This must be enabled manually from the destination settings if you're using other Facebook destinations.

{% include content/facebook-ldu-params.md %}

Facebook uses the `context.ip` to determine the geolocation if it exists on the event.

You can manually change the Data Processing parameters by adding settings to the `integrations` object. The example below shows how you might set custom Data Processing parameters in Node.

```javascript
// node.js library example

    analytics.track({
      event: 'Membership Upgraded',
      userId: '97234974',
      integrations: {
        "Facebook Conversions": {
          "dataProcessingOptions": [[], 1,1000]
        }
      }
    })
```

## Verify Events in Facebook

After you start sending events, you should start seeing them in twenty
minutes. You can confirm that Facebook received them:

1.   Go to the Events Manager.
2.   Click on the corresponding pixel.
3.   In the **Overview** tab, look for events where the "Connection Mode" is `Server`.

> info ""
> **Note**: It might take a few minutes before events appear in the Events Manager.

![](images/image2.png)
