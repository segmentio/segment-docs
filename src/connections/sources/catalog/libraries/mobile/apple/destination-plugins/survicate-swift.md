---
title: Analytics Swift Survicate Plugin
strat: swift
---

[Survicate](https://survicate.com/){:target="_blank"} is an all-in-one customer feedback platform that helps you collect and act on feedback from your customers. It helps you understand your customers and improve their experience with your product or service.

Add Survicate device mode support to your applications using this plugin for [Analytics-Swift](https://github.com/segmentio/analytics-swift){:target="_blank"}.

## Adding the dependency

When you add the Analytics Swift Survicate Plugin, the Survicate library is installed as an additional dependency.

### Using Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repo:

https://github.com/survicate/analytics-swift-survicate.git

You'll then have the option to pin to a version or specific branch, and select which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### Using Package.swift

Open your Package.swift file and add the following to your the `dependencies` section:

```swift
.package(
name: "SurvicateDestination",
url: "https://github.com/survicate/analytics-swift-survicate.git",
from: "3.0.2"
),
```

```swift
import Segment
import SurvicateDestination // <-- Add this line
```


> info " "
> When you add the Analytics Swift Survicate Plugin, the Survicate library is installed as an additional dependency.


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library. Add this plugin to the list of imports.

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

Your events will now begin to flow to Survicate in device mode.

### Using the SurvicateDestination plugin

#### Identify

In the SurvicateDestination plugin, the identify event from Segment is transferred to the setUserTrait method of Survicate. This is achieved within the identify function of the SurvicateDestination class. The traits and userId from the IdentifyEvent are extracted and set as user traits in Survicate using the setUserTrait method. The traits are a dictionary where each key-value pair is set as a user trait. The userId is also set as a user trait with the key "userId".

#### Track

In the SurvicateDestination plugin, the track method from Segment is used as the invokeEvent method in Survicate. This means that when you track an event in Segment, it will be invoked in Survicate.

#### Screen

Similarly, the screen method from Segment is used as the enterScreen method in Survicate. This means that when you track a screen in Segment, it will be entered in Survicate.

***reset***

The reset method from Segment is used as the reset method in Survicate. This means that when you reset the user in Segment, it will be reset in Survicate.