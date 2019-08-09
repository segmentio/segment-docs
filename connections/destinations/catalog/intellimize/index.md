---
title: Intellimize
beta: true
---

This destination is maintained by the Intellimize team. Please reach out to their Support team at segment@intellimize.com.

## Getting Started

You can enable Intellimize in your Segment Destinations dashboard. You will need to authorize the destination with your Intellimize API key. To retrieve your API key, reach out to your account representative at Intellimize.

Intellimize supports the `identify`, `page`, `screen`, `track`, `group`, and `alias` methods. Please ensure that `identify` calls include a userID. The `identify` call is the most important method to drive improved performance for now. Segment will automatically send these calls to Intellimize's endpoint at https://api.intellimize.co/segment once enabled.

## Identify

When you `identify` a user, Segment will pass that user's information to Intellimize.  Please ensure `userID` is included in the `identify` call.

Please ensure that no personally identifiable information (PII) is included in the call. Intellimize expressly forbids sending of PII to Intellimize.

## Page, Screen, Track, Group & Alias

When you call any of these events, Segment will relay the events to Intellimize's endpoint.

## Settings

You will need to enter your API key in the Destination Settings page for Intellimize. To retrieve your API key, reach out to your account representative at Intellimize or to segment@intellimize.com.
