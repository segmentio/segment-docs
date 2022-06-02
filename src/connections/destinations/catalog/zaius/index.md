---
title: Zaius Destination
hide-personas-partial: true
id: 56cb441480412f644ff12d37
---
## Zaius Destination
Zaius is a behavioral marketing engine that allows marketers to analyze, segment, and engage their customers across web, mobile, email and offline channels and devices.

When integrated with Segment, you'll be able to:
  - View your Customer Journey
  - Use our cross-channel analytics
  - Segment your customers
  - Execute coordinated cross-channel personalized campaigns across email, push, facebook and google.

This destination is maintained by Zaius.

## Getting Started

It's easy to get started!
  - If you don't have a Zaius account yet, sign up for an account at http://www.zaius.com
  - Sign in to your account and navigate to administration -> integrations
  - Select "Advanced Options" on the Tag Generator page
  - Copy the "Tracking Identifier" for use in Segment's destination UI for Zaius

## Data Details
Zaius depends on three methods to populate the entire system.

### Identify
Identify is key to using Zaius. When users are not logged in we will track anonymous activity based on the Segment anonymousId. As soon as users become identified with an email address or another customer ID, we will merge this data set with anonymous activity automatically.

To map Segment traits to Zaius customer objects, [create a Zaius custom field](https://docs.zaius.com/hc/en-us/articles/360015617313#CreateCustomFields) for each trait. The field name you define in Zaius must match the key for the trait as it appears in Segment identify calls. Any Segment traits which do not have a corresponding Zaius custom field are dropped from the customer object.

### Track
Zaius will be able to process any of your track events and properties sent through. Additionally Zaius has implemented the following special [semantic events](/docs/connections/spec/semantic/):
 - [Email events](/docs/connections/spec/email/)
 - [Ecommerce events](/docs/connections/spec/ecommerce/v2/)

### Page
The Zaius platform processes all of the page events passed into the Segment as well.

## Personas
You can send computed traits and audiences generated using [Segment Personas](/docs/personas/) to this destination as a field on the customer object.

For user-property destinations, an identify call is sent to the destination for each user being added and removed. The property name is the snake_cased version of the audience name, with a true/false value to indicate membership. For example, when a user first completes an order in the last 30 days, Personas sends an Identify call with the trait `order_completed_last_30days: true`. When the user no longer satisfies this condition (for example, it's been more than 30 days since their last order), Personas sets that value to `false`.

To map Segment computed traits and audiences to Zaius customer objects, [create Zaius custom fields](https://docs.zaius.com/hc/en-us/articles/360015617313#CreateCustomFields) for each trait and audience. The field name you define in Zaius must exactly match the key for the trait or audience as it appears in your identify calls. Any Segment traits or audiences which do not have a corresponding Zaius custom field will be dropped from the customer object.

When you first create an audience, Personas sends an Identify call for every user in that audience. Later audience syncs only send updates for users whose membership has changed since the last sync.
