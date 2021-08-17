---
title: Braze (Actions) Cloud Destination
hide-boilerplate: true
hide-dossier: true
hidden: true
---
{% include content/plan-grid.md name="actions" %}

[Braze](https://www.braze.com/), formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.


> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Braze Segment destination. There's also a page about the [non-Actions Braze destination](/docs/connections/destinations/catalog/braze/). Both of these destinations receives data _from_ Segment. There's also the [Braze source](/docs/connections/sources/catalog/cloud-apps/braze//), which sends data _to_ Segment!

## Benefits of Braze (Actions) Cloud vs Braze Classic

Braze (Actions) Web provides the following benefits over Braze Classic:

- **E-commerce mappings**. Users who can't follow the e-commerce spec due to incompatible event names (for example, Trip Booked vs Order Completed) can log purchases in Braze (Actions) Cloud.

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Braze" in the Catalog, select **Braze (Actions) Cloud**, and choose which of your sources to connect the destination to.
3. Add the following Connection Settings:
   - **API Key**: Find in the Braze Dashboard in App Settings > Manage App Group.
   - **App ID**: Find in the Braze Dashboard in App Settings > Manage App Group.
   - **REST Endpoint**: Enter the value that maps to your Braze instance. For more information, see [API Overview](https://www.braze.com/docs/api/basics/){:target="_blank"} in the Braze documentation.

{% comment %}
### In-app Messaging (Web)

Find instructions to configure In-app Messaging in the Braze [documentation](https://www.braze.com/academy/Best_Practices/#in-app-message-behavior){:target="_blank"}. Once configured, you can trigger in-app message display as a result of several different event types. By default, all In-App Messages that a user is eligible for are automatically delivered to the user upon a session start event. A new session automatically starts when a user loads your site. If you'd like to force a new session for a user, make an Identify call with the corresponding [userId](/docs/connections/spec/identify/#user-id) for that user.

If you don't want your site to display new In-App Messages as they're received, disable automatic display and register your own display subscribers. To do this:

1. Disable the [Automatically Send In-App Messages Destinations setting](/docs/connections/destinations/catalog/braze/#settings).

2. Create your subscriber by calling:

    ```js
    analytics.ready(function() {
      window.appboy.subscribeToNewInAppMessages(function(inAppMessages) {
         // Display the first in-app message. You could defer display here by pushing this message to code      within in your own application.
         // If you don't want to use Appboy's built-in display capabilities, you could alternatively pass      the in-app message to your own display code here.
         window.appboy.display.showInAppMessage(inAppMessages[0]);

        // Return an array with any remaining, unhandled messages to appboy's internal queue.
        // These will be part of the inAppMessages param the next time this subscriber is invoked.
         return inAppMessages.slice(1);
       });
    });
    ```

The `inAppMessages` parameter will be an array of [`appboy.ab.InAppMessage`](https://js.appboycdn.com/web-sdk/latest/doc/ab.InAppMessage.html) subclass or [`appboy.ab.ControlMessage`](https://js.appboycdn.com/web-sdk/latest/doc/ab.ControlMessage.html) objects, each of which has various lifecycle event subscription methods.



### Push Notifications (Client)

1. To support push notifications on Chrome, you'll need to enable FCM/GCM as well as configure your site. Check out steps [one and two here, for detailed instructions on both](https://www.braze.com/documentation/Web/#step-1-to-support-chrome-enable-fcmgcm).

2. Browser Registration. In order for a browser to receive push notifications, you must register it for push by calling:

    ```js
    analytics.ready(function() {
      window.appboy.registerAppboyPushMessages();
    });
    ```

    **Note:** Place this snippet outside of your [Segment Snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet) within your `script` tag.

    **Note:** This requests push permission from the user.

To show your own push-related UI to the user before requesting push permission (known as a soft push prompt), you can test to see if the user's browser supports push by calling:

```js
analytics.ready(function() {
  if (window.appboy.isPushSupported()) {
    // Add your push logic
  }
 });
```

Braze recommends checking to see if this returns `true` since not all browsers can receive push notifications. [See below](/docs/connections/destinations/catalog/braze/#soft-push-prompts) for instructions on setting up a soft push prompt using Braze In-App Messages.

To unsubscribe a user, call:

```js
analytics.ready(function() {
  window.appboy.unregisterAppboyPushMessages();
});
```

3. Set your GCM/FCM server API key and SenderID on the Braze dashboard. You can find more details for this [here](https://www.braze.com/documentation/Web/#step-4-set-your-gcmfcm-server-api-key-and-senderid-on-the-Braze-dashboard).

4. To support push notifications on Safari, add your Website Push ID into your Segment Settings UI and Segment sends it when the Braze Web SDK initializes. To get your Website Push ID, follow the first two bullet points in [these instructions](https://www.braze.com/documentation/Web/#step-5-configure-safari-push).

### Soft Push Prompts

1. Follow [step one](https://www.braze.com/documentation/Web/#soft-push-prompts) to create a "Prime for Push" in-app messaging Campaign on the Braze dashboard.

2. Disable your [Automatically Send In-App Messages Destination setting](/docs/connections/destinations/catalog/braze/#settings).

3. Add the following snippet to your site:

```js
analytics.ready(function() {
  window.appboy.subscribeToNewInAppMessages(function(inAppMessages) {
    var message = inAppMessages[0];
    if (message != null) {
      var shouldDisplay = true;

      if (message instanceof appboy.ab.inAppMessage) {
        // Read the key/value pair for msg-id
        var msgId = message.extras["msg-id"];

        // If this is our push primer message
        if (msgId == "push-primer") {
          // We don't want to display the soft push prompt to users on browsers that don't support push, or if the user
          // has already granted/blocked permission
          if (!appboy.isPushSupported() || appboy.isPushPermissionGranted() || appboy.isPushBlocked())     {
            shouldDisplay = false;
          }
          // Prompt the user when the first button is clicked
          message.buttons[0].subscribeToClickedEvent(function() {
            appboy.registerAppboyPushMessages();
          });
        }
      }

      // Display the message
      if (shouldDisplay) {
        appboy.display.showInAppMessage(message);
      }
     }

    // Remove this message from the array of IAMs and return whatever's left
    return inAppMessages.slice(1);
   });
 });
```

For more details on this snippet, check out the Braze's docs [here](https://www.braze.com/documentation/Web/#soft-push-prompts).

**Note:** Place this snippet outside of your [Segment Snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet) within your `script` tag.

4. When you'd like to display the Soft Push to a user, call:

```js
 analytics.ready(function() {
  window.appboy.logCustomEvent("prime-for-push")
 });
```

{% endcomment %}

## Important differences from the classic Braze destination
- Braze (Actions) supports the [Web](https://github.com/segment-integrations/analytics.js-integration-appboy){:target="_blank"} integration. For other integrations, including iOS, Android, and Server, use the Braze Classic destination.

## Pre-built subscriptions

| Subscription Name | Trigger                                                                                      | Braze Action        | Non-default mapped fields |
| ----------------- | -------------------------------------------------------------------------------------------- | ------------------- | ------------------------- |
| Track Event       | All **track** calls from the connected source, where the Event Name is not "Order Completed" | Track Event         |                           |
| Track Purchase    | All **track** calls from the connected source, where the Event Name is "Order Completed"     | Track Purchase      |                           |
| Identify Calls    | All **identify** calls from the connected source                                             | Update User Profile |                           |

## Available Braze Actions

Build your own subscription. Combine the supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following Braze-supported actions:
- [Track Event](#track-event)
- [Track Purchase](#track-event)
- [Update User Profile](#update-user-profile)

### Track Event

The Track Event default subscription sends a Track Event to Braze when the Braze (Actions) destination receives a Track call. This action enables you to define the Event details the destination sends with a combination of plain text and information received from the event.

### Track Purchase

The Track Purchases default subscription sends a Track Purchase to Braze when the Braze (Actions) destination receives an event with the specified Event Name. By default, the trigger runs when the destination receives `Order Completed` events, but you can edit this value to match your configuration.

### Update User Profile

The Update User Profile default subscription sends an Update User Profile call to Braze when the Braze (Actions) destination receives an Identify call.

## Migration from Braze Classic
Keep the following in mind if you plan to move to Braze (Actions) from the classic Braze destination.
{% include components/actions-map-table.html name="braze-cloud" %}

