---
title: What is the native mobile spec?
---

The [Native Mobile Spec](https://segment.com/docs/connections/spec/mobile) is a common blueprint for the mobile user lifecycle. The Spec outlines the most important events for mobile apps to be tracking and automatically collects many of these events with the Segment Android and iOS SDKs.

This article outlines common questions about our Native Mobile Spec. To learn what the benefits are of the feature, check out our [blog](https://segment.com/blog/native-mobile-spec). For technical set up and documentation, see our [spec docs](https://segment.com/docs/connections/spec/mobile).

### How does the Native Mobile Spec help me?

*   Smaller SDK: Move more destinations to the server-side, including the Facebook App Events destination.

*   Less engineering time: Automatically collect key user events instead of coding them in yourself.

*   Faster time to value: Set up your destinations with key metrics like Daily Active Users, sessions, and in-app purchases right away!

*   Measure ROI of campaigns: Analyze campaign performance with spec'd events like "campaign hit", "install attributed" and "push notification opened" in your favorite analytics or BI tool.


### Which destinations currently take advantage of the mobile spec?

Our [Facebook App Events](/docs/connections/destinations/catalog/facebook-app-events/) cloud-mode destination currently takes advantage of the "Application Installed" event to power new features like custom audience creation, dynamic ads and conversion tracking, without needing to sit on the device. Soon, more destinations like Google Adwords and Salesforce Marketing Cloud and attribution providers will offer similar functionality.


### How does all of this work?

When an engineer installs the SDK, the SDK will automatically register on iOS and Android operation system handlers.

When the application is foregrounded on the phone, our SDK will be called and emit the Application Opened event. Similarly, when the user updates the app, on the next app open, the iOS and Android operation system will tell us and we'll emit a track event called Application Updated event. In-app purchases will trigger Order Completed, etc.

### How do I opt-in to the new feature?

This feature is opted out by default. You have to opt in to collect these events as mentioned in our Quick Start guides ([iOS](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/), [Android](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android/quickstart/)). You'll be doing this in code by altering the configuration you pass into the SDK initialization methods (telling the SDK to collect these events automatically).

### What happens if I' already tracking these events? Will they be double counted?

Yes, they will be double counted, but that's only if you opt into this feature. You can either remove your own tracking code for these events or not opt into auto collectionat all.

### Do I still benefit from this new SDK if I opt out of automatic tracking?

Yes. If you follow the Spec when you write your own custom events, you will be able to take advantage of certain features in downstream destinations on the server-side, like with our [Facebook App Events destination](/docs/connections/destinations/catalog/facebook-app-events).

### Will I need to change the names of the events I am currently tracking?

We recommend migrating to these event names if you're tracking similar events so that you can take advantage of available features in our integrations which will depend on the spec as they become available.

### Can I send custom properties inside of automatic events?

Not currently.

### Is there a way to link the old event name with the new event name?

Not currently. [Contact us](https://segment.com/help/contact/) for alternative options.

### Can I do this later?

You can, but the sooner you switch to the spec'd events, the further back you'll be able to look in your reporting with the same event name!

### How will I be able to take advantage of new campaign events?

In the coming months, we'll be updating our mobile marketing destinations to automatically capture campaign events around attribution, deep linking, and push notifications. These events will go to [destinations](/docs/connections/destinations/), including [warehouses](/docs/connections/storage/catalog/).

### Why don't Push Notification events reach Segment when my Android App is backgrounded?

Android applications can't receive Push Notifications when the process is not running, and when apps are put into background they are eligible to have their Process killed when there is memory pressure. For more more on Android processes, view Android's [Processes and app lifecycle documentation](https://developer.android.com/guide/components/activities/process-lifecycle){:target="_blank"}.

Segment tracks messages delivered to the application. So if the process has been killed for any reason, messages won't be delivered. 

### Why do Push Notifications work with Firebase Cloud Messaging when the app is backgrounded?

Firebase Cloud Messaging (FCM) has its own servers. When an FCM message is created and sent to a device, that message travels through FCM servers and is delivered to the local FCM client device that is part of Android OS. This FCM client is almost always running, even when the app is backgrounded. From there, the FCM message is intended to be delivered to a local application. If the app process is running, the message gets delivered. Otherwise, the user must tap a notification that starts the app and delivers the FCM message.

For more context on how this process works, view the [Firebase FCM architecture documentation](https://firebase.google.com/docs/cloud-messaging/fcm-architecture){:target="_blank"}. 
