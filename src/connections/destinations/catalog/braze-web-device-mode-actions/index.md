---
title: Braze Web Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
redirect_from:
  - '/connections/destinations/catalog/actions-braze-web/'
  - '/connections/destinations/catalog/vendor-braze/'
id: 60fb01aec459242d3b6f20c1
versions:
  - name: 'Braze Cloud Mode (Actions)'
    link: '/docs/connections/destinations/catalog/braze-cloud-mode-actions'
  - name: 'Braze (Classic)'
    link: '/docs/connections/destinations/catalog/braze'
---
{% include content/plan-grid.md name="actions" %}

[Braze](https://www.braze.com/){:target="_blank"}, formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.

## Benefits of Braze Web Mode (Actions) vs Braze Classic

Braze Web Mode (Actions) provides the following benefits over Braze Classic:

- **E-commerce mappings**. Users who can't follow the e-commerce spec due to incompatible event names (for example, Trip Booked vs Order Completed) can log purchases in Braze Web Mode (Actions).

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Braze" in the Catalog, select **Braze Web Mode (Actions)**, and choose which of your sources to connect the destination to.
3. Configure the Connection Settings. **API Key** and **SDK Endpoint** are required settings.

> info ""
> If you're using a device-mode connection, Braze's SDK assigns a `device_id` and a backend identifier, `braze_id`, to every user. This allows Braze to capture anonymous activity from the device by matching on those identifiers instead of `userId`. This applies to _device-mode connections_.


{% include components/actions-fields.html settings="true"%}

{% include components/actions-fields.html%}

## Other features

Braze Web Mode (Actions) can use the following features of Braze.

### In-app Messaging

Once configured, you can trigger in-app message display as a result of several different event types. By default, all In-App Messages that a user is eligible for are automatically delivered to the user upon a session start event. A new session automatically starts when a user loads your site. If you'd like to force a new session for a user, make an Identify call with the corresponding [userId](/docs/connections/spec/identify/#user-id) for that user.

If you don't want your site to display new In-App Messages as they're received, disable automatic display and register your own display subscribers. To do this:

Create your subscriber by calling:

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

The `inAppMessages` parameter will be an array of [`appboy.ab.InAppMessage`](https://js.appboycdn.com/web-sdk/latest/doc/ab.InAppMessage.html){:target="_blank"} subclass or [`appboy.ab.ControlMessage`](https://js.appboycdn.com/web-sdk/latest/doc/ab.ControlMessage.html){:target="_blank"} objects, each of which has various lifecycle event subscription methods.



### Push Notifications

1. To support push notifications on Chrome, you'll need to enable FCM/GCM as well as configure your site. Check out steps [one and two here for detailed instructions on both](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup#step-1-to-support-chrome-enable-fcmgcm){:target="_blank"}.

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

Braze recommends checking to see if this returns `true` since not all browsers can receive push notifications. See [Soft Push Prompts](#soft-push-prompts) for instructions on setting up a soft push prompt using Braze In-App Messages.

To unsubscribe a user, call:

```js
analytics.ready(function() {
  window.appboy.unregisterAppboyPushMessages();
});
```

1. Set your GCM/FCM server API key and SenderID on the Braze dashboard. You can find more details for this [here](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup#step-4-set-your-gcmfcm-server-api-key-and-senderid-on-the-Braze-dashboard){:target="_blank"}.

2. To support push notifications on Safari, add your Website Push ID into your Segment Settings UI and Segment sends it when the Braze Web SDK initializes. To get your Website Push ID, follow the first two bullet points in [these instructions](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup#step-5-configure-safari-push){:target="_blank"}.

### Soft Push Prompts

1. Follow [step one](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup#soft-push-prompts){:target="_blank"} to create a "Prime for Push" in-app messaging Campaign on the Braze dashboard.

2. Add the following snippet to your site:

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

For more details on this snippet, see Braze's documentation [here](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup#soft-push-prompts){:target="_blank"}.

> info ""
> Place this snippet outside of your [Segment Snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet) within your `script` tag.

1. When you'd like to display the Soft Push to a user, call:

```js
 analytics.ready(function() {
  window.appboy.logCustomEvent("prime-for-push")
 });
```



## Important differences from the classic Braze destination
- Braze Web Mode (Actions) supports the Braze [Web](https://github.com/segment-integrations/analytics.js-integration-appboy){:target="_blank"} integration. [Braze Cloud Mode (Actions)](/docs/connections/destinations/catalog/actions-braze-cloud) supports server and mobile sources, but to use mobile sources in device-mode, use the Braze Classic destination.


## Migration from Braze Classic

{% include content/ajs-upgrade.md %}

Keep the following in mind if you plan to move to Braze (Actions) from the classic Braze destination.
{% include components/actions-map-table.html name="braze-web" %}
