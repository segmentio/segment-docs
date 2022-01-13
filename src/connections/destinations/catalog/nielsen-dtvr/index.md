---
title: Nielsen DTVR Destination
rewrite: true
---

<!-- This file is for you to put your documentation in. Without any content in this file, the doc system pulls from the API and then builds a doc from the template in /client/layouts/destinations.html.  To disable/remove the template content, add `rewrite: true` in the metadata at the top of this file. -->
## Getting Started

Nielsen-DTVR is supported on mobile apps and web browsers.

Digital in TV Ratings (DTVR) responds to the shifting, complex multi-platform,
multi-device and multi-distribution landscape by providing comprehensive
measurement of digital content consumption—including streaming TV commercial
video, static web pages and mobile apps—across all major devices and platforms.

In order to get started with Nielsen-DTVR and retrieve an `appid` to configure
this integration, you must sign a license agreement on the [Nielsen engineering
portal](https://engineeringportal.nielsen.com/docs/Main_Page).

There will be an NDA to sign prior to accessing the download. Nielsen requires
you fill out your company info and have a Nielsen representative before getting
started.

You must also go through the pre-certification process as outlined
[here](https://engineeringportal.nielsen.com/docs/DCR_Pre-Certification_Checklist)
with your Nielsen representative before shipping this implementation to
production.

## Mobile

To get started with Nielsen-DTVR and Segment, you'll want to first integrate
your mobile app with our [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) or
[Android](/docs/connections/sources/catalog/libraries/mobile/android/) sources.

### iOS

To install Nielsen DTVR via Segment on iOS, please follow the instructions in the Segment-Nielsen-DTVR repository [README](https://github.com/segment-integrations/analytics-ios-integration-nielsen-dtvr/blob/master/README.md).

### Android

To install Nielsen DTVR via Segment on Android, please follow the instructions in the Segment-Nielsen-DTVR repository [README](https://github.com/segment-integrations/analytics-android-integration-nielsen-dtvr/blob/master/README.md).

##  Web

If you'd like to measure video on the web, all you have to do is add your
Nielsen `appId` and `instanceName` in your Segment settings and enable this
destination for a JS source. We will then load the Nielsen SDK into the
browser.

## Track

Segment only supports sending `track` events as outlined in our [Video
Spec](/docs/connections/spec/video/). To get started tracking video content through
Segment, make sure you are using a media player that has an API which allows
you to detect the player state such as video or ad plays. For example, you
would not be able to collect ad plays using YouTube since their YouTube SDK
does not expose any hooks into player states during ad plays.

**IMPORTANT**: We will map the semantic events and properties in the Segment [Video Spec](/docs/connections/spec/video/) to Nielsen's relevant methods and metadata. If you do not implement the Segment [Video Spec](/docs/connections/spec/video/) properly, this integration will not behave properly. 

## Settings

#### App ID 
Once the Segment source is integrated with your app, toggle
Nielsen-DTVR on in your Segment destinations catalog, and add your `appId`,
which you can retrieve from your Nielsen representative.

The `appId` is the unique id for the application assigned by Nielsen. It is
GUID data type. Be sure to use the test `appId` during development, test, and
certification processes. Use Production appid to submit app to App / Play
store, after receiving Nielsen certification.

These new settings will take up to an hour to propagate to all of your existing
users. For new users it will be instantaneous.

#### Enable Debug Mode 
Check this setting if you would like to activate the
Debug flag. Once the flag is active, it logs each API call made and the data
passed. DO NOT activate the Debug flag in a production environment.

#### id3Property 
Indicate the key in your payload associated with the id3 tag.
If one is not provided we will default to `id3`.

#### Instance Name 
Required for Web only: A user-defined string value for
describing the player/site.

#### Events to Send Id3 Tags
Add the event names you would like to trigger Segment to `sendId3` tags.

#### sfcode 
Required for mobile only: Add the unique identifier for the
environment that the Nielsen SDK should point to. If not specified the default
value will be `us`.

<!-- Nielsen does not host their framework on a dependency management site such
as Cocoapods nor Maven. You must manually add the framework after installing
the Segment-Nielsen-DTVR dependency. Navigate to [Nielsen's Engineering
Site](https://engineeringportal.nielsen.com/docs/Digital_Downloads) and
download the Video framework. -->
