---
title: SparkPage Destination
---

This destination is maintained by SparkPage.

## Getting Started

{% include content/connection-modes.md %}

Once the Segment library is integrated with your server, toggle SparkPage on in your Segment destinations, and add your API key which you can find in the SparkPage Dashboard under "Settings"

The Segment SparkPage destination is 100% handled through our servers, so you don't need to bundle their iOS or Android SDKs. Your Segment SDK will be enough.

SparkPage supports the identify and track methods.

## Identify

When you identify a user, we'll pass that user's information to SparkPage with userId as SparkPage's User ID.

Segment's special traits recognized as SparkPage's standard user profile fields (in parentheses) are:

 - `firstName` (`fname`)
 - `lastName` (`lname`)
 - `email` (`email`)

All other traits will be sent to SparkPage as custom attributes.

## Track

When you track an event, we will send that event to SparkPage as a custom API event.
