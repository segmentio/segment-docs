---
beta: true
title: Tractionboard Destination
id: 569007b3e954a874ca44cd4e
---
## Getting Started

Once the Segment library is integrated in your app, toggle Tractionboard on in your Segment destinations, and add your Segment Token ID which you can find in the Tractionboard Dashboard, under the Settings > Integrations.

The Segment Tractionboard destination is 100% handled through our side, you just need to take some names in consideration when sending track events.

Tractionboard supports the page, identify, track, group, alias and screen methods.

## Page

The Page method is equivalent to our visit event, which track your user iterations inside your website and app.

## Identify

When you identify a user, we'll pass that user's information to Tractionboard with userId as Tractionboard's External User ID, as if it were our login event. Segment's special traits will be recognized as Tractionboard's attributes, and you can use as many as you want.

## Track

When you track an event, we will send that event to Tractionboard as a custom event. There are certain events that trigger special actions in Tractionboard:

 - `Payment Made`: This is an standard event in Segment ([Payment Made](https://help.segment.com/hc/en-us/articles/204812979-Tracking-payment-events-and-revenue#made-payment)), and it's translated to the Tractionboard payment event, that is used to get the earnings of certain user.
 - `Refund Received`: This is an standard event in Segment ([Refund Received](https://help.segment.com/hc/en-us/articles/204812979-Tracking-payment-events-and-revenue#received-refund)), and it's translated to the Tractionboard refund event, that is used to subtract this amount to the revenue.
 - `cancel`: This event with the userId will update the    user status to canceled, and it will count in the churn rate metric.
 - `signup`: We expect the signup event with the userId. Signup events are used to compose the UAC metric.

## Group

The information provided by this method will be saved as a user's attribute.

## Alias

With this method we will change the id to a certain user saving the old one as a attribute of the new one.

## Screen

It's the same that the page method. Currently we don't support mobile apps, but we can get events from them.
