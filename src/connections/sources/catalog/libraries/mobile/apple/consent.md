---
title: Consent Manager for Swift
strat: swift
---
Add Segment-driven consent management support for your application via this plugin for [Analytics-Swift](https://github.com/segmentio/analytics-swift) 

This plugin provides the framework to integrate Consent Management Platform (CMP) SDKs like OneTrust to supply consent status and potentially block events going to device mode destinations.

Read more about Segment’s Consent Management solutions [here](https://segment.com/docs/privacy/configure-consent-management/), as well as enabling it for your workspace.

## Background

Consent Management is the management of a user’s consent preferences related to privacy. You might be familiar with the privacy pop-ups that have become mandated recently that ask the user if they consent to the use of certain categories of cookies.

The privacy pop-up asks the user if they will consent to the use of cookies and allows the user to customize their consent by turning on/off different categories of cookies.

After the user selects “Allow All” or “Save Preferences,” a callback is fired and the owner of the website is notified as to the consent preferences of a given user. The website owner must then store that consent preference and abide by it. Any rejected cookies must not be set or read to avoid large fines that can be handed down by government authorities.

Additionally, besides the initial pop-up, the website owner must give users a way to later change any preferences they originally selected. This is usually accomplished by providing a link to display the customization screen.


## Segment managed CMP

Segment provides a framework for users to integrate any CMP they choose and use the Segment web app to map consent categories to device mode destinations. This information is sent down the analytics-swift SDK and stored for later lookup.

Every event that flows through the library will be stamped with the current status according to whatever configured CMP is used. Event stamping is handled by the ConsentManagementPlugin. 

Using consent status stamped on the events and the mappings sent down from the Segment web app each event is evaluated and action is taken. Currently the supported actions are:

- Blocking - This action is implemented by the ConsentBlockingPlugin

## Event Stamping

Event stamping is the process of adding the consent status information to an existing event. The information is added to the context object of every event. Below is a before and after example:

Before

```json
{
    "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
    "type": "track",
    "event": "MyEvent",
    "userId": "u123",
    "timestamp": "2023-01-01T00:00:00.000Z",
    "context": {
        "traits": {
            "email": "peter@example.com",
            "phone": "555-555-5555"
        },
        "device": {
            "advertisingId": "7A3CBBA0-BDF5-11E4-8DFC-AA02A5B093DB"
        }
    }
}
```
After

```json
{
    "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
    "type": "track",
    "event": "MyEvent",
    "userId": "u123",
    "timestamp": "2023-01-01T00:00:00.000Z",
    "context": {
        "traits": {
            "email": "peter@example.com",
            "phone": "555-555-5555"
        },
        "device": {
            "advertisingId": "7A3CBBA0-BDF5-11E4-8DFC-AA02A5B093DB"
        },
        "consent": {
            "categoryPreferences": {
                "Advertising": true,
                "Analytics": false,
                "Functional": true,
                "DataSharing": false
            }
        }
    }
}
```

## Segment Consent Preference Event

When notified by the CMP SDK that consent has changed, a track event with name “Segment Consent Preference” will be emitted. Below is example of what that event will look like:

```json
{
    "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
    "type": "track",
    "event": "Segment Consent Preference",
    "userId": "u123",
    "timestamp": "2023-01-01T00:00:00.000Z",
    "context": {
        "device": {
            "advertisingId": "7A3CBEA0-BDF5-11E4-8DFC-AA07A5B093DB"
        },
        "consent": {
            "categoryPreferences": {
                "Advertising": true,
                "Analytics": false,
                "Functional": true,
                "DataSharing": false
            }
        }
    }
}
```

## Event Flow

1. An event is dropped onto the timeline by some tracking call.
2. The ConsentManagementPlugin consumes the event, stamps it, and returns it.
3. The event is now stamped with consent information from this point forward.
4. The event is copied. The copy is consumed by a Destination Plugin and continues down its internal timeline. The original event is returned and continues down the main timeline.
    - a. The stamped event is now on the timeline of the destination plugin.
    - b. The event reaches the ConsentBlockingPlugin which makes a decision as to whether or not to let the event continue down the timeline.
    - c. If the event has met the consent requirements it continues down the timeline.
5. The event continues down the timeline.




## Getting Started

### via Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repo.
```
https://github.com/segment-integrations/analytics-swift-consent
```

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### via Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-consent.git",
            from: "1.0.0"
        ),
```

Next pick from one of the prebuilt integration:

- OneTrust: `https://github.com/segment-integrations/analytics-swift-consent-onetrust`

Or build your own integration (see below)

Next you'll need to write some setup/init code where you have your
Analytics setup:

```swift
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))

let consentManager = ConsentManager(provider: MyConsentProvider())
analytics.add(plugin: consentManager)
// add any device mode destinations you might have ...
analytics.add(plugin: FirebaseDestination())
analytics.add(plugin: TaplyticsDestination())
        
// Note: Different consent management providers may require consentManager.start() be called differently.
// Tell the consent manager to start processing events.  It will queue events until start() is called.
consentManager.start()
```

The Consent Manager plugin will automatically add a ConsentBlockingPlugin to any device mode destinations, so there's no extra steps for you to do in your code. Blocking for cloud mode destinations will be handled server-side at Segment.

## Building your own integration
In order to integrate a new CMP, you will need to satisfy the below requirements.

### Consent Category Provider
You'll need to create a `ConsentCategoryProvider` that will provide a mapping of consent category to whether or not a given category has been consented by the user.  It must also provide a way to inform the `ConsentManager` of any changes that happen during runtime.

Example:
```swift
class MyConsentProvider: ConsentCategoryProvider {
    // this will be set later by the ConsentManager.
    var changeCallback: ConsentChangeCallback? = nil
    // this is the imaginary Consent SDK you supplied/wrote.
    let consentSDK: MyConsentSDK

    var categories: [String : Bool] {
        // Returns a simple dictionary of categories and their 
        // enabled/disabled status.
        //
        // ie: ["Analytics": true, "Advertising": false, "Performance": true]
        return consentSDK.categoriesAndStatus()
    }
    
    init(consentSDK: MyConsentSDK) {
        self.consentSDK = consentSDK
        self.consentSDK.changeListener = consentChanged
    }

    func consentChanged() {
        guard let changeCallback else { return }
        // this will tell the ConsentManager that consent has changed, it 
        // will check the `categories` above again and then send
        // a "Segment Consent Preference" track event with the updates.
        changeCallback()
    }
}

```