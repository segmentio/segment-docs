---
title: Nudgespot
---
## Getting Started

When you toggle on Nudgespot in Segment, this is what happens:

+ Our CDN is updated within 5-10 minutes.
+ If you are using Nudgespot for the first time, sign up and choose the 'Segment' option under Destinations on their 'Getting Started with Nudgespot' page.
+ Once you reach the Segment onboarding page, click on the 'Enable with Segment' option.
+ If you are already using Nudgespot, go to the 'Settings' page and click on the 'Enable with Segment' button.

Nudgespot is supported on mobile, web browsers and on the server side.

## Identify

The first thing you’ll want to do is to identify your users so Nudgespot knows who they are. You’ll use the [`identify`](/docs/spec/identify/) method to accomplish this - identify takes the unique user Id of a user, first name, and any other traits you know about them.

## Server Side

When you call [`identify`](/docs/spec/identify/) from any of Nudgespot's server-side libraries, they'll create or update the users in Nudgespot with the traits provided.

## Track

You will see the traits appear as properties on any events you track.

When you use Nudgespot, it's important that you [`identify`](/docs/spec/identify/) a user before you call [`track`](/docs/spec/track/). A [`track`](/docs/spec/track/) without an [`identify`](/docs/spec/identify/) won't create a user.

Nudgespot is a communication tool you can use to communicate with your users after you [`track`](/docs/spec/track/) their action (or inaction). The more events you [`track`](/docs/spec/track/), the better Nudgespot will work for you.

The Segment [`track`](/docs/spec/track/) method maps events and event properties directly to Nudgespot events and event properties.


## Sending Data from Nudgespot

Nudgespot supports sending [email events](/docs/spec/email/) to other tools on the Segment platform. These events will be sent as `track` calls to the other destinations you've turned on. To enable this feature, enter in your Write Key when setting up your account.

![Send email events from Nudgespot](https://cldup.com/h911sko8RG.png)

## Troubleshooting

### When will I see data from my mobile app?

If you already have an app deployed with the Segment source, and you just turned on Nudgespot, it will take up to an hour for all your mobile users to refresh their Segment settings cache, and learn about the new service that you want to send to. After the settings cache refreshes, our source will automatically start sending data to Nudgespot.
