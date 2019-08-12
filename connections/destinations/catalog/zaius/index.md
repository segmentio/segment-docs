---
title: Zaius
---

This destination is maintained by Zaius.

- - -

## Zaius Destination
Zaius is a behavioral marketing engine that allows marketers analyze, segment, and engage their customers across web, mobile, email and offline channels and devices.

When integrated with Segment, you'll be able to:
  - View your Customer Journey
  - Use our cross-channel analytics
  - Segment your customers
  - Execute coordinated cross-channel personalized campaigns across email, push, facebook and google.

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

### Track
Zaius will be able to process any of your track events and properties sent through. Additionally Zaius has implemented the following special [semantic events](/docs/spec/semantic/):
 - [Email events](/docs/spec/email/)
 - [Ecommerce events](/docs/spec/ecommerce/v2/)

### Page
The Zaius platform processes all of the page events passed into the Segment as well.
