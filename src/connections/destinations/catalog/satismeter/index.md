---
title: SatisMeter Destination
id: 54c02a5adb31d978f14a7f6f
---
[The SatisMeter destination code](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/satismeter){:target="_blank"} is all open-source on GitHub if you want to check it out.

See SatisMeter in action on their [sample app](https://app.satismeter.com/sample){:target="_blank"}.

After you enable SatisMeter in Segment, the SatisMeter NPS survey will be shown to your customers.

## Features
With SatisMeter you can:

- Gather NPS and customer feedback straight from your web app
- Send gathered customer feedback back to Segment which distributes it to other customer analytics tools
- Get the feedback directly into your Slack channel
- Customize SatisMeter survey to comply with your design
- Send email surveys to users that don't answer the in-app survey
- Ask every user in their own language

## Get Started

To get started, sign up to SatisMeter and click **Enable with Segment**. This links your SatisMeter project with your Segment project and enables the destination.

!["Enable with segment" button](images/enable-with-segment.png)

## Identify

Users need to be identified in order to target surveys at the right time.

### Client-side destination

Identifying of users is done by calling the Identify method using the [analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/) library. The recommended traits are `name`, `email` and `createdAt`, however SatisMeter can collect any other traits you'd like to see next to feedback from your customers.

Here's an example of the Identify call:
```js
analytics.identify('007', {
 name: 'James Bond',
 email: '007@sis.gov.uk',
 createdAt: '2015-06-16T09:19:47.155Z'
});
```

It is important to send the `createdAt` trait, which tells SatisMeter how long the customer has been using your service. This way, Satismeter can show the survey to people that already have some experience with your service.

### Server-side destination

You can also send additional traits you don't have available on client-side using one of the [server libraries](/docs/connections/sources/#server) provided by Segment. These traits are added to the collected responses from your users.

## Sending data from SatisMeter back to Segment (optional)
SatisMeter can send completed survey responses to Segment. From Segment, you can distribute the survey information to your other Segment destinations.

### Segment write key
Copy the Segment write key (Project settings / API KEYS / WRITE KEY) and paste it into SatisMeter (Integrations / Segment).
The write key looks like this: `8lnHXS8z3lkCyNkFlggIvd59M2BXdSHn`

## SatisMeter traits and events
When a user completes a survey the following traits are added to the user:

- `NPS_rating`: NPS rating (0-10)
- `NPS_comment`: written feedback that user left
- `NPS_date`: date when the NPS survey was filled out

SatisMeter also records the following events
- `Viewed NPS Survey`: The survey was shown to the user
- `Closed NPS Survey`: User closed the survey without filling it
- `Answered NPS Survey`: User filled the rating of NPS Survey
- `Completed NPS Survey`: User completed the survey (including the follow-up question)

## Troubleshooting
### The SatisMeter widget does not show up
Make sure you are sending an `analytics.identify()` call when the page is loaded. If you are calling this method, make sure SatisMeter survey has a reason to be displayed. The widget will not display unless the customer fits your targeting settings.

### The SatisMeter widget shows up right after sign-up
It is important to send the `createdAt` trait to the `analytics.identify()` method. Without this SatisMeter widget will be shown right after sign-up to every user that fits your other targeting settings.

You can change the targeting settings in Targeting section of SatisMeter settings.
