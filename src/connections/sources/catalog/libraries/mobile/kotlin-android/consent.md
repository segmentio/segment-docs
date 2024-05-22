---
title: Consent Manager for Kotlin
strat: kotlin-android
---
Add Segment-driven consent management support for your application via this plugin for [Analytics-Kotlin](https://github.com/segmentio/analytics-kotlin) 

This plugin provides the framework to integrate Consent Management Platform (CMP) SDKs like OneTrust to supply consent status and potentially block events going to device mode destinations.

Read more about Segment’s Consent Management solutions [here](https://segment.com/docs/privacy/configure-consent-management/), as well as enabling it for your workspace.

## Background

Consent Management is the management of a user’s consent preferences related to privacy. You might be familiar with the privacy pop-ups that have become mandated recently that ask the user if they consent to the use of certain categories of cookies.

The privacy pop-up asks the user if they will consent to the use of cookies and allows the user to customize their consent by turning on/off different categories of cookies.

After the user selects “Allow All” or “Save Preferences,” a callback is fired and the owner of the website is notified as to the consent preferences of a given user. The website owner must then store that consent preference and abide by it. Any rejected cookies must not be set or read to avoid large fines that can be handed down by government authorities.

Additionally, besides the initial pop-up, the website owner must give users a way to later change any preferences they originally selected. This is usually accomplished by providing a link to display the customization screen.


## Segment managed CMP

Segment provides a framework for users to integrate any CMP they choose and use the Segment web app to map consent categories to device mode destinations. This information is sent down the analytics-kotlin SDK and stored for later lookup.

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

## Segment Consent Preference Updated Event

When notified by the CMP SDK that consent has changed, a track event with name “Segment Consent Preference Updated” will be emitted. Below is example of what that event will look like:

```json
{
    "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
    "type": "track",
    "event": "Segment Consent Preference Updated",
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

To get started add the dependency for consent management to your app's build.gradle file:

```groovy
    implementation 'com.segment.analytics.kotlin.destinations:consent:<LATEST_VERSION>'
```

Next pick from one of the prebuilt integration:

- OneTrust: https://github.com/segment-integrations/analytics-kotlin-consent-onetrust

Or build your own integration (see below)

Next you'll need to write some setup/init code where you have your
Analytics setup:

```kotlin
// Setup Analytics
analytics = Analytics(SEGMENT_WRITE_KEY, applicationContext) {
   this.collectDeviceId = true
   this.trackApplicationLifecycleEvents = true
   this.trackDeepLinks = true
   this.flushPolicies = listOf(
      CountBasedFlushPolicy(5), // Flush after 5 events
      FrequencyFlushPolicy(5000) // Flush after 5 Seconds
   )
}

// Add the myDestination plugin into the main timeline
val myDestinationPlugin = myDestinationPlugin()
analytics.add(myDestinationPlugin)

// Create the Consent Category Provider that will get the status of consent categories
val consentCategoryProvider = MyConsentCategoryProvider(cmpSDK)
val store = SynchronousStore() // Use only a Synchronous store here!

val consentPlugin = ConsentManagementPlugin(store, consentCategoryProvider)

// Add the Consent Plugin directly to analytics
analytics.add(consentPlugin)

// Use the CMP SDK to get the list of consent categories.
consentCategoryProvider.setCategories(cmpSDK.getCategories())

// Once the categories have been set we can start processing events by starting
// the Consent Management plugin
consentPlugin.start()
```

## Building your own integration
In order to integrate a new CMP, you will need to satisfy the below requirements.

### Consent Category Provider
First you'll need to create a `ConsentCategoryProvider` that will provide a mapping of consent category to whether or not a given category has been consented by the user.

Example:
```Kotlin
class OneTrustConsentCategoryProvider(
    val otPublishersHeadlessSDK: OTPublishersHeadlessSDK,
    val categories: List<String>
) : ConsentCategoryProvider {

    override fun getCategories(): Map<String, Boolean> {
        var categoryConsentMap = HashMap<String, Boolean>()

        categories.forEach { category ->
            val consent = otPublishersHeadlessSDK.getConsentStatusForGroupId(category)
            val consentValue = when (consent) {
                1 -> true
                else -> false
            }

            categoryConsentMap.put(category, consentValue)
        }

        return categoryConsentMap
    }
}
```

Here we show how OneTrust is integrated. As you can see it uses a passed in list of categories to query the OneTrust SDK and maps the OneTrust response (-1, 0, or 1) to true/false.

### Consent Changed Notifier
The second and last integration point is a way to notify the ConsentManagementPlugin that consent has changed for the user.

Here is an OneTrust example:
```kotlin
package com.segment.analytics.kotlin.destinations.consent.onetrust

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.onetrust.otpublishers.headless.Public.Keys.OTBroadcastServiceKeys
import com.segment.analytics.kotlin.destinations.consent.ConsentManagementPlugin
import java.lang.ref.WeakReference

class OneTrustConsentChangedNotifier(
    val contextReference: WeakReference<Context>,
    val categories: List<String>,
    val consentPlugin: ConsentManagementPlugin
) {

    private val consentChangedReceiver: BroadcastReceiver? = null

    fun register() {
        if (consentChangedReceiver != null) {
            unregister()
        }

        val context = contextReference.get()
        categories.forEach {

            if (context != null) {
                context.registerReceiver(
                    OneTrustConsentChangedReceiver(consentPlugin),
                    IntentFilter(OTBroadcastServiceKeys.OT_CONSENT_UPDATED)
                )
            }
        }
    }

    fun unregister() {
        val context = contextReference.get()
        if (context != null) {
            context.unregisterReceiver(consentChangedReceiver)
        }
    }
}

class OneTrustConsentChangedReceiver(val consentPlugin: ConsentManagementPlugin) :
    BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        consentPlugin.notifyConsentChanged()
    }
}
```

Here we can see that the OneTrust SDK notifies us of consent change via an Android Intent with the action `OTBroadcastServiceKeys.OT_CONSENT_UPDATED` so our notifier must create a broadcast receiver and listen for this event. One the event is broadcast the reciever will then call `consentPlugin.notifyConsentChanged()` to let the ConsentManagmentPlugin to send the `Segment Consent Preference Updated` event.