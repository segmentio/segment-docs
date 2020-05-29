---
title: Facebook Pixel Server-Side Destination
rewrite: true
---

[Facebook Pixel Server-Side API](https://developers.facebook.com/docs/marketing-api/server-side-api) allows advertisers to send events from their servers directly to Facebook. Server-Side events are linked to a pixel and are processed like browser pixel events. This means that Server-Side events are used in measurement, reporting, and optimization in the same way as browser pixel events.

The Facebook Pixel server-side component can be used in one of two ways:
1. In conjunction with the existing Client-Side (web) Pixel.
2. As a stand-alone, Server-Side only offering.

For beta-testing, we are releasing the Server-Side component as a standalone destination.

## Other Facebook Destinations Supported by Segment
This page is about the **Facebook Pixel Server-Side**. For documentation on other Facebook destinations, including Facebook Pixel, see the pages linked below.

| **Facebook Destination**   | Supported by Personas |
| ---------------------- | --------------------- |
| **[Facebook App Events](/docs/connections/destinations/catalog/facebook-app-events/)**                  | Yes                   |
| **[Facebook Offline Conversions](/docs/connections/destinations/catalog/facebook-offline-conversions/)** | Yes                   |
| **[Facebook Pixel](/docs/connections/destinations/catalog/facebook-pixel/)**                             | No                    |
| **[Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/)**      | Yes                   |

## Getting Started

{% include content/connection-modes.md %}

### From Facebook Events Manager
1. Access pixel setting through [Events Manager](https://business.facebook.com/events_manager/pixel/settings)
2. Select your pixel (e.g. Jasper’s Market Pixel).
3. Select the ‘Settings’ tab 
4. Scroll down to **Server-Side API for Web**
5. Toggle the Segment Partner Integration ‘On’

> note ""
> This section will only show under the following circumstances:
> * _You have enabled Facebook Pixel Client-side integration. Facebook will automatically give you Server-Side API access overnight once enabled._
> * _You have your Pixel ID whitelisted by contacting your Facebook Account Representative._

![](images/image1.png)

> note ""
> The steps above presume prerequisites for Server-side Events have been satisfied which include: 
> * _Business has been set up by the advertiser_
> * _Pixel has been created and assigned to the business created by the advertiser_

Learn more about your pixel event data in Events Manager in the [Facebook Ads Help Center](https://www.facebook.com/business/help/898185560232180?id=1205376682832142).

### From Segment
1. Add the Facebook Server-Side Destination
    * You won’t find the server-side destination in the catalog, as it is in private beta. Instead, please navigate to: ```https://app.segment.com/<your-workspace>/destinations/catalog/facebook-pixel-server-side```
2. Add your Settings
    * Pixel ID (Required)
    * Map Categories to FB Content Types (Optional) 
    * Map Your Events to Standard FB Events (Optional)

## Track

Currently, Facebook Pixel Server-Side only supports Track calls.

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track("My Custom Event", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```
### Standard Events

To send *Standard* events, use the Segment destination setting labeled "Map Your Events to Standard FB Events". Then, any time Segment receives one of the events in that mapping, it will be sent to Facebook as the standard event you specified. All properties you included in the event will be sent as event properties. You can find documentation on these events [here](https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events).

In addition, Segment will specially handle the following event types and send them as Standard events:

- "Order Completed" will be sent as "Purchase"
- "Product Added" will be sent as "AddToCart"
- "Product List Viewed" will be sent as "ViewContent"
- "Product Viewed" will be sent as "ViewContent"
- "Products Searched" will be sent as "Search"
- "Checkout Started" will be sent as "InitiateCheckout"

Facebook requires a currency for "Purchase" events -- if you leave it out, Segment will set a default value of "USD".

Additionally, you can use the "Map  Your Events to Standard FB Events" setting to map any of your other events to one of Facebook's Standard Events. Any unmapped events will be automatically sent to Facebook Pixel Server-Side as a custom event.

We map the following Segment traits to [Facebook properties](https://developers.facebook.com/docs/marketing-api/server-side-api/parameters):

| **Segment Trait** | **Pixel Property** | **Notes** |
| ---------------------- | --------------------- | ---------------------- |
| **[Facebook Offline Conversions](/docs/connections/destinations/catalog/facebook-offline-conversions/)** | Yes |
| **[Facebook Pixel](/docs/connections/destinations/catalog/facebook-pixel/)**                             | No                    |



| **Segment Property**    | **Pixel Property**   | **Notes**            |
| -------------------- | -------------------- | -------------------- |
| event                | event\_name          |                      |
| messageId            | event\_id            |                      |
| timestamp            | event\_time          |                      |
| userId               | external\_id         | Any unique ID from the advertiser, such as membership IDs, user IDs, and cookie IDs. See ‘Alternative External IDs’ section below.                             |
| context.ip           | user\_data.client\_ip\_address |            |
| context.userAgent    | user\_data.client\_user\_agent           |                      |
| context.traits.email | user\_data.em        | hashed               |
| context.traits.phone | user\_data.ph        | hashed               |
| context.traits.firstName                 | user\_data.fn        | hashed               |
| context.traits.lastName                  | user\_data.ln        | hashed               |
| context.traits.address.city                  | user\_data.ct        | hashed               |
| context.traits.address.postalCode                  | user\_data.zp        | hashed               |
| context.traits.address.state                  | user\_data.st        | hashed               |
| context.traits.birthday                  | user\_data.db        | hashed               |
| properties.fbp       | fbp                  |                      |
| properties.fbc       | fbc                  |                      |
| properties.revenue   | custom\_data.value   | Customizable, see 'Alternative Value Properties' section below   |
| properties.currency  | custom\_data.currency                    | Defaults to USD if not set  |
| properties.products  | custom\_data.contents                    | Must be an array. num\_items is set to the length of this   |
| properties.products\[x\].price                | custom\_data.contents\[x\].item\_price              | Must be an integer   |
| properties.products\[x\].product\_id                 | custom\_data.contents\[x\].id              | Must be a string     |
| properties.products\[x\].quantity                | custom\_data.contents\[x\].quantity              | Must be an integer   |
| properties.query     | custom\_data.search\_string              |         
| properties.status    | custom\_data.status  |                      |


In order to access the contexts and context.traits objects within a
Track call, you can use the following format, also found
[here](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#context--traits):

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

Any properties you send that aren't listed above will be sent in the
'Custom Data' part of our payload to Facebook.

**Alternative External IDs**

By default, we'll send the user ID as external ID and if user ID is
absent, we will fall back to anonymous ID. If you wish to use a different
field in your payload as the external ID, you can use the "Alternative
External ID Field". Example values for this setting include
'context.traits.email' and 'properties.externalid'.

**Alternative Value Properties**

For most events we will send revenue for the Pixel value field but for
the pre-purchase events "Product Viewed" and "Product Added", we will
use the value of the "Value Field Identifier" setting to determine which
property to key off of for the "value" field. This field defaults to
"price" if you don't set it yourself.

## Verify Events in Facebook

After you start sending your events, you should start seeing them in twenty
minutes. You can confirm that Facebook received them:

1.   Go to Events Manager

2.   Click on the corresponding pixel

3.   Under Overview tab, you should see events where Connection Mode is Server

> note ""
> Note: It may take a few minutes before events start showing up

![](images/image2.png)
