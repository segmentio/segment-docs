---
title: Friendbuy Cloud Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
hidden: false
id: 61dde0dc77eb0db0392649d3
---
{% include content/plan-grid.md name="actions" %}

[Friendbuy](https://www.friendbuy.com/){:target='_blank'} powers referral programs for e-commerce merchants of all sizes, providing an easy solution to launch Refer-a-Friend programs and accelerate growth through word of mouth.

Friendbuy's cloud mode Segment integration allows you to send data to Friendbuy from your data center so that Friendbuy can act on it. For example, you could trigger a reward when a referred customer performs a rewardable event or send customer data to use in your Friendbuy-managed loyalty/rewards program.

If you're using Segment with a Friendbuy referral program you probably want to use the [web destination](/docs/connections/destinations/catalog/actions-friendbuy/) to configure the Friendbuy JavaScript and to send customer and purchase data directly to Friendbuy as the user interacts with your web site. However, if you also want to send events from your data center to Friendbuy, such as purchases due to recurring transactions, you should also use this cloud mode [destination action](/docs/connections/destinations/actions/), which provides an interface between Segment's identify and track calls and Friendbuy's MAPI (merchant API).

## Overview

The Friendbuy cloud mode destination sends information about your customers and their actions to Friendbuy. It supports the following [Friendbuy MAPI events](https://developers.friendbuy.com/#tracking-events){:target='_blank'}.

- **Track Customer**: Converts Segment [Identify](/docs/connections/spec/identify/) calls to Friendbuy [*track customer* MAPI calls](https://developers.friendbuy.com/#tracking-customer-details). Use this to add your customer ID and other customer data to the information that Friendbuy has about the customer.
- **Track Purchase**: Converts Segment [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) calls to Friendbuy [*track purchase* MAPI calls](https://developers.friendbuy.com/#tracking-a-purchase). Use this to send purchase data to Friendbuy and reward advocates based on their friends' purchases.
- **Track Sign-Up**: Converts Segment [Signed Up](/docs/connections/spec/b2b-saas/#signed-up) calls to Friendbuy [*track sign_up* MAPI calls](https://developers.friendbuy.com/#tracking-a-signup). Use this to reward customers for account creation and other sign-up actions.
- **Track Custom Event**: Converts an arbitrary Segment [`analytics.track`](/docs/connections/sources/catalog/libraries/website/javascript/#track) call with an event name and properties of your choosing to a Friendbuy [track custom event MAPI call](https://developers.friendbuy.com/#tracking-a-custom-event). Use this to reward your customers for actions other than purchases or sign-ups.

## Benefits of Friendbuy Cloud Mode (Actions) vs Friendbuy Classic

Friendbuy Cloud Mode (Actions) is the Segment cloud mode destination that works with Friendbuy's current platform. The classic Segment Friendbuy destination works with Friendbuy's legacy platform.

## Getting started

> info ""
> Please contact your Friendbuy Customer Success Manager or email support@friendbuy.com to set up Friendbuy's Segment integration.

1. You need your Friendbuy MAPI Key and MAPI Secret to use the Friendbuy cloud mode integration. Contact your Friendbuy Onboarding & Implementation Representative to have these generated for you. (These are not the same as the Merchant ID and Secret Key that are available in your Friendbuy account.)
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Filter the destinations on Friendbuy in the Catalog and select **Friendbuy (Cloud Destinaton)**. Click **Configure (Cloud Destination)** to configure the Friendbuy destination, and choose which of your sources to connect the destination to.
4. Give the destination a name, and fill in the settings manually.
5. On the **Basic Settings** page enter your Friendbuy MAPI Key and Friendbuy MAPI Secret values from step one, and click **Save Changes**.
6. Select the **Mappings** tab. Click the **+ New Mapping** button. A dialog will pop up showing the supported Friendbuy actions. Click the desired type of action you want to send to Friendbuy and configure it using the steps described below.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

<!-- If applicable, add information regarding the migration from a classic destination to an Actions-based version below -->

## Edit Friendbuy mappings

There are four steps to configure a Segment mapping.

1. **Set up event trigger**: Choose the event trigger, which is the event type (such as *Identify*) or event name (such as *Order Completed*) for events that should be sent to Friendbuy.
2. **Test event trigger**: Find a sample event in your Segment event stream that matches the trigger you defined in step one.
3. **Configure action fields**: Define how the fields in the Segment event are mapped to fields in the Friendbuy track event.
4. **Review mappings**: Verify that the fields in the sample event are mapped correctly.

> info ""
> If you use the Friendbuy web mode destination to handle events generated in the browser as recommended, then when you configure the event trigger in the cloud mode destination you might need to add an extra condition to prevent events that come from Analytics.js calls from being handled by both the web and cloud mode destinations. For example, if you configure a Track Purchase action in the cloud mode destination to handle purchases for a recurring subscription, you might want to add an event property named `source` with the value `data center` to the recurring purchase events that you submit to Segment's REST interface. Then, add a condition on that property in the action's trigger so that only Order Completed events in which the Event Property `source` has the value `data center` are handled by that action. This prevents ordinary purchases sent from Analytics.js and processed by the Friendbuy cloud mode destination from being sent a second time by the web mode destination.

### Configuring action fields

In the **configure action fields** step, the mapping is pre-populated with mappings from the standard Segment event properties to the corresponding Friendbuy fields. You can edit each field if you want to populate that field from a different Segment event property or not send the field at all.

#### Custom attributes

In the *Track Customer*, *Track Purchase*, or *Track Sign Up* mappings you can use the *Custom Attributes* field to send additional custom properties that aren't included in the predefined field names for that event. Use the mapping's *Custom Attributes* field to specify the path to a JSON object that contains those custom attributes. Then, when your code makes its Segment Analytics.js call, include an object at the path that you configured containing your custom attributes. These attributes will then be included in the `additionalProperties` object in the Friendbuy MAPI call.

For example, if your *Track Purchase* call has the default *Custom Attributes* value of `properties.friendbuyAttributes`, and if your track purchase call is:

``` json
{
  "type": "track",
  "event": "Order Completed",
  "source": "data center",
  "userId": "customer-12345",
  "properties": {
    "order_id": "82f250a3-32eb-40be-95fc-77e685ed8448",
    "email": "joe.customer@example.com",
    "total": 54.82,
    "currency": "USD",
    "friendbuyAttributes": {
      "orderNumber": "3",
      "promotion": "black friday"
    }
  }
}
```

then the [Friendbuy MAPI purchase call](https://developers.friendbuy.com/#postpurchaseevent){:target='_blank'} will be:

``` json
{ 
  "orderId": "82f250a3-32eb-40be-95fc-77e685ed8448",
  "email": "joe.customer@example.com",
  "customerId": "customer-12345",
  "amount": 54.82,
  "currency": "USD",
  "additionalProperties": {
    "orderNumber": "3",
    "promotion": "black friday"
  }
}
```

Note that a Friendbuy MAPI call is limited to a maximum of 10 additional properties, additional properties' values must be strings, and the maximum length of an additional property's value is 128 characters.  Additional properties that don't comply with these restrictions are dropped.

### Custom events

To allow Friendbuy to act on an event that isn't one of the standard events described in the [Overview](#overview), use a custom event.

To configure a custom event:

1. Click **New Mapping** and choose **Track Custom Event**.

2. When you configure the event trigger, for the Event Name choose the name of the Segment event you're tracking. For example, if you want to reward on app downloads that you're tracking with `{ "type": "track", "event": "Downloaded", ... }`, use `Downloaded` as the *Event Name* in the trigger.

3. When you configure your action fields, you can accept the default *Event Type* of `event` which will cause Friendbuy to receive track events with the same names as the Segment events. If you want to rename the Friendbuy events, you can replace the *Event Type* with a different value, such as the static string `download`.

4. *Event Properties* is set from the path `properties` by default, which means that all the properties that you include in your Segment `analytics.track` call are passed to Friendbuy. If you only want to pass custom attributes to Friendbuy, you need to segregate the fields to pass to Friendbuy into an object and then specify the path to that object, similar to what is described above in [Custom Attributes](#custom-attributes).

5. To prevent an event that is tracked multiple times from being rewarded more than once, you should include a deduplication ID in your event as described in Friendbuy's [Track Custom Event documentation](https://developers.friendbuy.com/#tracking-a-custom-event){:target='_blank'}. You can either pass an explicit Event ID field in your event (defaulting to the `deduplicationId` property) or you can create the Event ID out of other event properties (such as the `userId`, a `.`, and the `properties.downloadId` in the above example).

<!--
Local Variables:
eval: (visual-line-mode 1)
End:
-->
