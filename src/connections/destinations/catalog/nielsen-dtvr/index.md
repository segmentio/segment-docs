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
[here](https://engineeringportal.nielsen.com/docs/Digital_Pre-Certification_Checklist)
with your Nielsen representative before shipping this implementation to
production.

## Mobile

To get started with Nielsen-DTVR and Segment, you'll want to first integrate
your mobile app with our [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) or
[Android](/docs/connections/sources/catalog/libraries/mobile/android/) sources.

### iOS

#### Install the SDK

The recommended way to install Analytics for iOS is using Cocoapods, since it
means you can create a build with specific destinations, and because it makes
it simple to install and upgrade. Simply add the Analytics dependency to
your Podfile, like so:

```
pod 'Analytics' '~> 3.0'
pod 'Segment-Nielsen-DTVR'
```

#### Add the Nielsen App SDK Framework 

The integration relies on the NielsenApp SDK framework, which can either be installed using CocoaPods or by manually
adding the framework. You will need to have a Nielsen representative before
getting started.

##### CocoaPods

When using the Nielsen SDK version 6.2.0.0 and above, Nielsen recommends
installation using CocoaPods, and Apple recommends using the dynamic framework.

Requirements for CocoaPods:

Dynamic Framework - version 1.6.1 or higher
Static Framework - version 1.4.0 or higher

1. Set repository credentials The first step is to add the credentials received
from Nielsen into your .netrc file. Navigate to your home folder and create a
file called .netrc ``` cd ~/ vi .netrc ```

  Add the credentials in the following format:
  ```
  machine raw.githubusercontent.com
  login <Nielsen App SDK client>
  password <Auth token>
  ```

  You will need to fill out a license agreement form and have the contact
  information for your Nielsen representative in order to obtain the
  credentials
  [here](https://engineeringportal.nielsen.com/docs/connections/special:Downloads)

2. Add the source to your Podfile:

  Dynamic Framework - `source 'https://github.com/NielsenDigitalSDK/nielsenappsdk-ios-specs-dynamic.git'`
  Note - you will also need to include `use_frameworks!`

  Static Framework - `source 'https://github.com/NielsenDigitalSDK/nielsenappsdk-ios-specs.git'`

3. Add the pod to your Podfile:

  `pod NielsenAppSDK`

4. Install pods

  `pod install`

The full instructions from Nielsen can be found
[here](https://engineeringportal.nielsen.com/docs/Digital_Measurement_iOS_Artifactory_Guide)

##### Manual

Navigate to the [Nielsen
Downloads](https://engineeringportal.nielsen.com/docs/connections/special:Downloads) page
to download the iOS SDK. You will need to fill out a license agreement form and
have the contact information for your Nielsen representative ready.

Once extracted, add the static NielsenAppApi.framework to the project and
ensure it's in the `Frameworks` folder, and that it is linked.

Nielsen also requires the following frameworks, which must be included into
Link Binary with Libraries (within app target's Build Phases). However, if
using the dynamic framework, these will dynamically be linked and there is no
need to manually link these. - AdSupport.framework -
SystemConfiguration.framework - CoreLocation.framework (Not applicable for
International (Germany)) - libsqlite3

### Android

To install the Segment-Nielsen-DTVR integration, you will first want to add
Nielsen's maven repository to your app's module `build.gradle file`. Nielsen
provides information on what your `build.gradle` file should look like after
adding their repository [here in their
documentation](https://engineeringportal.nielsen.com/docs/Digital_Measurement_Android_Artifactory_Guide#Add_Nielsen_Maven_Repository).

To retrieve Nielsen credentials, you will need to fill out a license agreement
form [here](https://engineeringportal.nielsen.com/docs/connections/special:Downloads)

An easy way to configure your app with your Nielsen credentials is to set the
Nielsen `user` and `authCode` as `ENV` variables, for example:

```
export ORG_GRADLE_PROJECT_NIELSEN_USER=<nielsen_user>
export ORG_GRADLE_PROJECT_NIELSEN_AUTHCODE=<nielsen_authCode>
```

Then, to include Segment's Nielsen-DTVR module, simply add the following line
to your module-level `build.gradle` file:

```
compile 'com.segment.analytics.android.integrations:nielsen-dtvr:+'
```

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

**IMPORTANT**: If you do not implement the Segment [Video
Spec](/docs/connections/spec/video/) properly with key lifecycle events, this integration
will not behave properly.

Again, also refer to our [Video Spec](/docs/connections/spec/video/) and implement
video tracking as outlined there. We will map the semantic events and
properties to Nielsen's relevant methods and metadata.

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
