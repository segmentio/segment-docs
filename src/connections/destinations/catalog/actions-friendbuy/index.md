---
title: Friendbuy Web Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
hidden: false
id: 6170a348128093cd0245e0ea
---
<!-- The published version of this document is available at https://segment.com/docs/connections/destinations/catalog/actions-friendbuy/ -->

{% include content/plan-grid.md name="actions" %}

[Friendbuy](https://www.friendbuy.com/){:target='_blank'} is a referral marketing platform.

Friendbuy's web mode Segment integration allows you to enable your Friendbuy referral program through Segment's dashboard instead of adding Friendbuy's JavaScript directly to your site.

This Segment integration is a web mode [destination action](/docs/connections/destinations/actions/) that loads and configures Friendbuy's JavaScript for you. If you're already using Segment's Analytics.js to identify your customers and track their purchases, either directly or through Segment source integrations that you've installed, you can configure Segment to send this data to Friendbuy for use in your referral program.

> warning ""
> The Friendbuy JavaScript won't be loaded unless at least one Mapping is enabled.  Even if you're not sending data to Friendbuy through Analytics.js calls, if you're using Segment to load the Friendbuy JavaScript you must define and enable at least one Mapping.  A safe mapping to enable is the pre-built **Track Page** mapping.

## Overview

The Friendbuy web mode destination sends information about your customers and their actions to Friendbuy. It supports the following [Friendbuy tracking events](https://developers.friendbuy.com/#tracking-events){:target='_blank'}.

- **Track Customer**: Converts Segment [`analytics.identify`](/docs/connections/spec/identify/) calls to Friendbuy *track customer* calls. Use this to add your customer ID and other customer data to the information that Friendbuy has about the customer.
- **Track Purchase**: Converts Segment [`analytics.track('Order Completed')`](/docs/connections/spec/ecommerce/v2/#order-completed) calls to Friendbuy *track purchase* calls. Use this to send purchase data to Friendbuy and reward advocates based on their friends' purchases.
- **Track Sign-Up**: Converts Segment [`analytics.track('Signed Up')`](/docs/connections/spec/b2b-saas/#signed-up) calls to Friendbuy *track sign_up* calls. Use this to reward customers for account creation and other sign-up actions.
- **Track Page**: Converts Segment [`analytics.page`](/docs/connections/sources/catalog/libraries/website/javascript/#page) calls to Friendbuy *track page* calls. Use this to enable your Friendbuy widgets based on page name.
- **Track Custom Event**: Converts an arbitrary Segment [`analytics.track`](/docs/connections/sources/catalog/libraries/website/javascript/#track) call with an event name and properties of your choosing to a Friendbuy track custom event call. Use this to reward your customers for actions other than purchases or sign-ups.

## Benefits of Friendbuy Web Mode (Actions) vs Friendbuy Classic

Friendbuy Web Mode (Actions) is the Segment web mode destination that works with Friendbuy's current platform. The classic Segment Friendbuy destination works with Friendbuy's legacy platform.

## Getting started

> info ""
> Please contact your Friendbuy Customer Success Manager or email support@friendbuy.com to set up Friendbuy's Segment integration.

Before you start, you must have Segment's Analytics.js 2.0 installed on your site. See [Segment's documentation](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) for instructions.

1. Find your Friendbuy Merchant ID, a unique [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier){:target='_blank'} that Friendbuy uses to identify your account. [Log in to your Friendbuy account](https://retailer.friendbuy.io/){:target='_blank'} and visit the **Developer Center** > **Friendbuy Code** page to locate your Merchant ID.
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Filter the destinations on Friendbuy in the Catalog and select **Friendbuy Web Device Mode (Actions)**. Click **Configure Friendbuy Web Device Mode (Actions)** to configure the Friendbuy destination, and choose which of your sources to connect the destination to.
4. Give the destination a name, and fill in the settings manually.
5. On the **Basic Settings** page enter your Merchant ID value from step one, and click **Save Changes**.
6. Select the **Mappings** tab. A number of pre-built mappings are configured for you that map standard events defined in the [Segment Spec](/docs/connections/spec/) to their equivalent Friendbuy events, as displayed below. You can disable events that you don't use or edit the pre-built field mappings.
7. After you configure the destination, enable it from the **Settings** tab. As noted above, the Friendbuy JavaScript will not be loaded unless at least one Mapping is enabled.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

<!-- If applicable, add information regarding the migration from a classic destination to an Actions-based version below -->

## Edit Friendbuy mappings

There are four steps to configure a Segment mapping.

1. **Set up event trigger**: Choose the event trigger, which is the event type (such as *Identify*) or event name (such as *Order Completed*) for events that should be sent to Friendbuy.
2. **Test event trigger**: Find a sample event in your Segment event stream that matches the trigger you defined in step one.
3. **Configure action fields**: Define how the fields in the Segment event are mapped to fields in the Friendbuy track event.
4. **Review mappings**: Verify that the fields in the sample event are mapped correctly.

### Configuring action fields

In the **configure action fields** step, the mapping is pre-populated with mappings from the standard Segment event properties to the corresponding Friendbuy fields. You can edit each field if you want to populate that field from a different Segment event property or not send the field at all.

Note that the default mappings for the *Purchase*, *Sign Up*, and custom events populate Friendbuy's Customer ID field from the User ID passed in the `analytics.identify` call. Unless you change the Customer ID field mapping when you configure the action, you must make an `analytics.identify` call before you make the `analytics.track` call for *Purchase*, *Sign Up*, or custom events if you want to associate a Customer ID with those events.

#### Custom attributes

In the *Track Customer*, *Track Purchase*, or *Track Sign Up* mappings you can use the *Custom Attributes* field to send additional custom properties that aren't included in the predefined field names for that event. Use the mapping's *Custom Attributes* field to specify the path to a JSON object that contains those custom attributes. Then, when your code makes its Segment Analytics.js call, include an object at the path that you configured containing your custom attributes to include them at the root of the Friendbuy track event.

For example, if your *Track Purchase* call has the default *Custom Attributes* value of `properties.friendbuyAttributes`, and if your track purchase call is:

``` javascript
analytics.track("Order Completed", {
  order_id: "82f250a3-32eb-40be-95fc-77e685ed8448",
  total: 54.82,
  currency: "USD",
  friendbuyAttributes: {
    orderNumber: "3",
    promotion: "black friday"
  }
});
```

then the [Friendbuy track purchase call](https://developers.friendbuy.com/#purchase-event){:target='_blank'} will be:

``` javascript
friendbuyAPI.push(["track", "purchase", {
  id: "82f250a3-32eb-40be-95fc-77e685ed8448",
  amount: 54.82,
  currency: "USD",
  orderNumber: "3",
  promotion: "black friday"
}, true]);
```

Note that a Friendbuy track call is limited to a maximum of 10 custom attributes, custom attribute values must be strings, and the maximum length of a custom attribute is 128 characters.  Custom attributes that do not comply with these restrictions are dropped.

### Custom events

To allow Friendbuy to act on an event that isn't one of the standard events described in the [Overview](#overview), use a custom event.

To configure a custom event:

1. Click **New Mapping** and choose **Track Custom Event**.

2. For the Event Name, choose the name of the Segment event you are tracking. For example, if you want to reward on app downloads that you are tracking with `analytics.track("Downloaded", { downloadId: "My App" }`, select `Downloaded` as your *Event Name*.

3. When you configure your action fields, you can accept the default *Event Type* of `event` which will cause Friendbuy to receive track events with the same names as the Segment events. If you want to rename the Friendbuy events, you can replace the *Event Type* with a different value, such as the static string `download`.

4. *Event Properties* is set from the path `properties` by default, which means that all the properties that you include in your Segment `analytics.track` call are passed to Friendbuy. If you only want to pass custom attributes to Friendbuy, you need to segregate the fields to pass to Friendbuy into an object and then specify the path to that object, similar to what is described above in [Custom Attributes](#custom-attributes).

5. To prevent an event that is tracked multiple times from being rewarded more than once, you should include a deduplication ID in your event as described in Friendbuy's [Track Custom Event documentation](https://developers.friendbuy.com/#custom-event){:target='_blank'}. You can either pass an explicit Event ID field in your event (defaulting to the `deduplicationId` property) or you can create the Event ID out of other event properties (such as the `userId`, a `.`, and the `properties.downloadId` in the above example).

<!--
Local Variables:
eval: (visual-line-mode 1)
End:
-->
