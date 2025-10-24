---
title: Braze Web-Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
redirect_from:
  - '/connections/destinations/catalog/vendor-braze/'
  - '/connections/destinations/catalog/braze-web-device-mode-actions/'
id: 60fb01aec459242d3b6f20c1
versions:
  - name: 'Braze Cloud-Mode (Actions)'
    link: '/docs/connections/destinations/catalog/actions-braze-cloud'
  - name: 'Braze (Classic)'
    link: '/docs/connections/destinations/catalog/braze'
---
{% include content/plan-grid.md name="actions" %}

[Braze](https://www.braze.com/){:target="_blank"}, formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.

## Benefits of Braze Web-Mode (Actions) vs Braze (Classic)

Braze web-mode (Actions) provides the following benefits over Braze (Classic):

- **E-commerce mappings**. Users who can't follow the e-commerce spec due to incompatible event names (for example, Trip Booked vs Order Completed) can log purchases in Braze web-mode (Actions).

## Getting Started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for "Braze" in the Catalog in the Destinations Catalog and select **Braze**.
3. Choose which of your sources to connect the destination to and follow the steps to create your destination.
> warning "Mapping settings"
> Some events require specific property names to map correctly into Braze. 
> For example, purchase events must use a `products` array with `product_id` and `price.
> See [Braze-web settings mappings](#braze-web-settings-mapping) for "Device-web" for the full list of requirements before setting up mappings.
4. In the **Settings** tab, configure the connection settings. **API Key**, **SDK Endpoint**, and **REST Endpoint** are required settings.

After setting up your Braze web-mode (Action) destination in the Segment app, Segment's Analytics.js library starts asynchronously loading the Braze SDK on your page and sending data. Data appears in the Segment CDN in about 45 minutes.  

> info ""
> If you're using a device-mode connection, Braze's SDK assigns a `device_id` and a backend identifier, `braze_id`, to every user. This allows Braze to capture anonymous activity from the device by matching on those identifiers instead of `userId`. This applies to _device-mode connections_.


{% include components/actions-fields.html settings="true" %}

## Other features

Braze web-mode (Actions) can use the following features of Braze.

### In-app messaging

Once configured, you can trigger in-app message display as a result of several different event types. By default, all In-App Messages that a user is eligible for are automatically delivered to the user upon a session start event. A new session automatically starts when a user loads your site. If you'd like to force a new session for a user, make an [Identify](/docs/connections/spec/identify/) call with the corresponding [userId](/docs/connections/spec/identify/#user-id) for that user.

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



### Push notifications

1. To support push notifications on Chrome, you must enable FCM/GCM and configure your site. See steps [one and two in the Braze docs for detailed instructions on both](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup#step-1-to-support-chrome-enable-fcmgcm){:target="_blank"}.

2. **Browser Registration**: For a browser to receive push notifications, you must register it for push by calling:

    ```js
    analytics.ready(function() {
      window.appboy.registerAppboyPushMessages();
    });
    ```

    **Note**: Place this snippet outside of your [Segment Snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet) within your `script` tag.

    **Note**: This requests push permission from the user.

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

1. Set your GCM/FCM server API key and SenderID on the Braze dashboard. You can find more details for this in Braze's [Initial SDK setup for web](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup#step-4-set-your-gcmfcm-server-api-key-and-senderid-on-the-Braze-dashboard){:target="_blank"} documentation.

2. To support push notifications on Safari, add your Website Push ID into your Segment Settings UI and Segment sends it when the Braze Web SDK initializes. To get your Website Push ID, follow the first two bullet points in [these instructions](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup#step-5-configure-safari-push){:target="_blank"}.

### Soft push prompts

1. Follow [step one](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/push_notifications/soft_push_prompt/#step-1-create-a-push-primer-campaign){:target="_blank"} detailed in the Braze docs, to create a "Prime for Push" in-app messaging Campaign on the Braze dashboard.

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

For more details on this snippet, see Braze's [Soft push prompt](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/push_notifications/soft_push_prompt/#step-3-update-integration){:target="_blank"} documentation.

> info ""
> Place this snippet outside of your [Segment Snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet) within your `script` tag.

1. When you'd like to display the Soft Push to a user, call:

```js
 analytics.ready(function() {
  window.appboy.logCustomEvent("prime-for-push")
 });
```

### Enable SDK authentication

When "Enable SDK Authentication" is enabled, Segment will set Braze's `enableSdkAuthentication` to `true`. When this feature is enabled, the Braze SDK will append the current user’s last known JWT to network requests made to Braze Servers.


## Important differences from Braze (Classic) destination
- Braze web-mode (Actions) supports the Braze [Web](https://github.com/segment-integrations/analytics.js-integration-appboy){:target="_blank"} integration. [Braze Cloud-Mode (Actions)](/docs/connections/destinations/catalog/actions-braze-cloud) supports server and mobile sources, but to use mobile sources in device-mode, use the Braze Classic destination.


## Migration from Braze (Classic)

Keep the following in mind if you plan to move to Braze (Actions) from the classic Braze destination.
{% include components/actions-map-table.html name="braze-web" %}


## FAQs

#### How does the Debounce Middleware Action work? 

The following [Debounce Middleware](/docs/connections/destinations/catalog/actions-braze-web/#debounce-middleware) logic is executed at the source-level:

When an Identify call is fired on a website, Segment first caches and compares the user traits object. 

- If the user traits differ from what was previously cached, the data flows through destination filters, insert functions, and then through destination mappings. 
- If user traits are the same as what's cached, Segment assumes that that data was already sent to Braze and a does not make a new request to Braze. 
