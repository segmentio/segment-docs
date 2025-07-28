---
title: Userpilot Mobile (Device Mode) Destination
---

Userpilot helps product teams deliver personalized in-app experiences to increase growth metrics at every stage of the user journey. When you integrate Userpilot with Segment, you can send your Segment events to Userpilot, allowing you to create more personalized experiences for your users across the product lifecycle.

[Userpilot](https://www.userpilot.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides in-app guidance, product tours, and contextual onboarding experiences to help teams activate users and drive feature adoption.

This destination is maintained by Userpilot. For any issues with the destination, [contact the Userpilot Support team](mailto:support@userpilot.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"}, search for "Userpilot Mobile (Device Mode)".
2. Select **Userpilot Mobile** and click **Add Destination**.
3. Select an existing Source to connect to Userpilot.
4. Go to the [Userpilot installation dashboard](https://run.userpilot.io/installation){:target="_blank"}, and copy your **App Token**.
5. Enter the **App Token** in the Userpilot destination settings in Segment.

## Supported methods

Userpilot supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to associate a user with traits. These are used for segmentation, personalization, and lifecycle targeting.

```swift
analytics.identify(userId: "<USER_ID>", traits: [
  "email": "john.doe@example.com",
  "name": "John Doe",
  "plan": "Pro",
  "createdAt": "2023-08-01T00:00:00Z"
])
```

Calling `identify` from `Segment` will trigger the `userpilot.identify`. Segment recommends passing as much data as possible to get the most out of Userpilot.

Data passed in an Identify call can be organized under different categories.
* Properties about the user such as `plan` or `userRole` to help targeting a specifc segment
* Properties to personalize the content of the Userpilot experiences, such as `name` or `company`
* Properties to target users based on their lifecycle, such as `createdAt`, which allows you to target newly created accounts or accounts that have yet to achieve a certain feature in the user lifecyle

These appear within the Userpilot user dashboard and power audience segmentation and targeting.


### Group
Send [Group](/docs/connections/spec/group) calls to associate users with an account, organization, or project.

```swift
analytics.group(groupId: "<GROUP_ID>", traits: [
  "companyName": "Acme Inc.",
  "subscriptionTier": "Enterprise"
])
```

Segment sends Group calls to Userpilot as a `userpilot.identify` update with company-level traits, allowing you to use company metadata in targeting logic.


### Screen
Send [Screen](/docs/connections/spec/screen) calls to track navigation or screen changes in mobile apps.

```swift
analytics.screen(title: "Home")
```

Segment sends Screen calls to Userpilot as a `userpilot.screen` event. This allows Userpilot to:
* Trigger relevant experiences configured for specific pages/screens.
* Check for ongoing experiences already running.


### Track

Send [Track](/docs/connections/spec/track) calls to log user actions or custom events.

```swift
analytics.track(name: "Button Clicked", properties: [
  "buttonColor": "green"
])
```

Segment sends Track calls to Userpilot as `userpilot.track`. These custom events can be used to:
* Trigger specific experiences (e.g., a Caroucel or Survey)
* Monitor user behavior for analytics or lifecycle targeting