---
title: Analytics Swift Localytics Plugin
id: 54521fd925e721e32a72eed0
---

Our Analytics-Swift Localytics Destination Plugin is open sourced on GitHub. Feel free to
[check it out here](https://github.com/segment-integrations/analytics-swift-localytics){:target="_blank”}.


## Getting started

Once the Segment library is integrated with your site or app, toggle Localytics
on in your Segment destinations, and add your application's **App Key** which
you can find in your Localytics app settings. These new settings will take up to
an hour to propogate to all of your existing users. For new users it'll be
instanteneous!

If you are using version 1.3.0 or higher of the Segment-Localytics Android SDK,
you can include a `localytics.xml` file in your Android project's `res/values`
folder to define your settings. Note that any settings entered in the Segment UI
will override the equivalent values defined in your `localytics.xml` file. You
can read more about the `localytics.xml` file in [Localytics's documentation
here](https://docs.localytics.com/dev/android.html#include-localytics-xml-file){:target="_blank"}.


1.  From the Segment Destinations page click **Add Destination**.
2.  Search for Localytics and select it in the results that appear.
3.  Choose which source to connect to your Localytics destination.
4.  Add your Localytics **App Key** to the destination's settings tab.

## Adding the dependency

***Note:*** the `Localytics` library itself will be installed as an additional dependency.

### Using Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL for this repo:

```
https://github.com/segment-integrations/analytics-swift-localytics
```

You then have the option to pin to a version or specific branch and select which project in your workspace to add the package to.  Once you've made your selections, click the **Add Package** button.  

### Using Package.swift

Open the file where you set up and configured the Analytics-Swift library.  Add this plugin to the list of imports.

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-localytics.git",
            from: "1.0.0"
        ),
```


## Using the plugin in your app

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentLocalytics // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: LocalyticsDestination())
```
Your events now have Localytics session data and start flowing to Localytics in device-mode.

## Identify

When you make an [Identify](/docs/connections/spec/identify/) call, Segment sets the Localytics
customerId and any special Localytics traits you provide, like `name`,
`email`, or custom traits.


## Track

When you make a [Track](/docs/connections/spec/track/) call, Segment logs an event with Localytics containing the name of the event and any optional event properties.

