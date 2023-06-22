---
title: Analytics for Swift Implementation Guide
strat: swift
tags:
  - apple
  - swift
  - ios
---
Once you've installed the Analytics-Swift library, you can start collecting data through Segment's tracking methods:

- [Identify](#identify)
- [Track](#track)
- [Screen](#screen)
- [Group](#group)
- [Alias](#alias)

### Identify
The [Identify](/docs/connections/spec/identify/) method lets you tie a user to their actions and record traits about them. This includes a unique user ID and any optional traits you know about them like their email, name, or address. The traits option can include any information you want to tie to the user. When using any of the reserved traits, be sure the information reflects the name of the trait. For example, `email`  should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
// These signatures provide for a typed version of user traits
func identify<T: Codable>(userId: String, traits: T)
func identify<T: Codable>(traits: T)
func identify(userId: String)
```
{% endcodeexampletab %}

{% codeexampletab Swift %}
```swift
struct MyTraits: Codable {
        let favoriteColor: String
}

analytics.identify(userId: "a user's id", MyTraits(favoriteColor: "fuscia"))
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[self.analytics identify:@"a user's id"
                                traits:@{ @"email": @"fuscia" }];
```
{% endcodeexampletab %}
{% endcodeexample %}

The Identify method has these fields:

Field | Details
----- | -------
`userId` *optional* | The database ID for this user. If you don't know who the user is yet, you can omit the `userId` and just record `traits`. You can read more in the [identify reference](/docs/connections/spec/identify)
`traits` *optional* | A dictionary of traits you know about the user, like their `email` or `name`. You can read more about traits in the [identify reference](/docs/connections/spec/identify).

### Track
The [Track](/docs/connections/spec/track/) method lets you record the actions your users perform. Every action triggers an event, which also has associated properties that the track method records.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func track(name: String)
// This signature provides a typed version of properties.
func track<P: Codable>(name: String, properties: P?)
```
{% endcodeexampletab %}

{% codeexampletab Swift %}
```swift
struct TrackProperties: Codable {
        let someValue: String
}

analytics.track(name: "My Event", properties: TrackProperties(someValue: "Hello"))
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[ self.analytics track:@"My Event"
                            properties:@{ @"someValue": @"Hello" }];
```
{% endcodeexampletab %}
{% endcodeexample %}

The Track method has these fields:

Field | Details
----- | -------
`name` *required* | The name of the event. Segment recommends you to use human-readable names like *Song Played* or *Status Updated*.
`properties` *optional* | The structure of properties for the event. If the event was Product Added to cart, it may have properties like `price` and `productType`.

### Screen
The [Screen](/docs/connections/spec/screen/) method lets you record whenever a user sees a screen in your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Not all integrations support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func screen(title: String, category: String? = nil)
func screen<P: Codable>(title: String, category: String? = nil, properties: P?)
```
{% endcodeexampletab %}

{% codeexampletab Swift %}
```swift
analytics.screen(title: "SomeScreen")
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[self.analytics screen:@"SomeScreen"
                            properties:@{ @"Feed Type": @"private" }];
```
{% endcodeexampletab %}
{% endcodeexample %}

The Screen method has these fields:

Field | Details
----- | -------
`name` *required* | The name of the screen, for example *Signup* or *Home*.
`properties` *optional* |A dictionary of properties for the screen. A screen *Photo Feed* might have properties like `Feed Type` or `Sort Order`.

You can enable automatic screen tracking by using this [example plugin](https://github.com/segmentio/analytics-swift/blob/main/Examples/other_plugins/UIKitScreenTracking.swift){:target="_blank"}.

Once you add the plugin to your project, add it to your Analytics instance:

```swift
 analytics.add(plugin: UIKitScreenTracking())
```
### Group
The [Group](/docs/connections/spec/group/) method lets you associate an individual user with a group— whether it's a company, organization, account, project, or team. This includes a unique group identifier and any additional group traits you may have, like company name, industry, number of employees. You can include any information you want to associate with the group in the traits option. When using any of the [reserved group traits](/docs/connections/spec/group/#traits), be sure the information reflects the name of the trait. For example, email should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func group(groupId: String)
func group<T: Codable>(groupId: String, traits: T?)
```
{% endcodeexampletab %}

{% codeexampletab Swift %}
```swift
struct MyTraits: Codable {
        let username: String
        let email: String
        let plan: String
}

// ...

analytics.group(groupId: "group123", traits: MyTraits(
        username: "MisterWhiskers",
        email: "hello@test.com",
        plan: "premium"))
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[self.analytics group:@"group123"
traits:@{ @"name": @"MisterWhiskers", @"plan": @"premium" }];
```
{% endcodeexampletab %}
{% endcodeexample %}

The Group method has these fields:

Field | Details
----- | -------
`userId` *required* | The ID for this user in your database.
`groupId` *required* | The ID for this group in your database.
`traits` *optional* | A dictionary of traits you know about the group. Things like: `name` or `website`.

### Alias
The [Alias](/docs/connections/spec/alias/) method is used to merge two user identities, effectively connecting two sets of user data as one. When this method is called, the `newId` value overwrites the old `userId`. If no `userId` is currently set, the `newId` associates with future events as the `userId`. This is an advanced method and may not be supported across the entire destination catalog.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func alias(newId: String)
```
{% endcodeexampletab %}

{% codeexampletab Swift%}
```swift
analytics.alias(newId: "user-123")
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[self.analytics alias:@"some new id"];
```
{% endcodeexampletab %}
{% endcodeexample %}

The Alias call has the following fields:

Field | Details
----- | -------
`newId` *required* | The newId of the user you want to map to.

## Utility methods
The Analytics Swift utility methods help you work with [plugins](#plugin-architecture) from the analytics timeline. They include:
- [Add](#add)
- [Find](#find)
- [Remove](#remove)

There's also the [Flush](#flush) method to help you manage the current queue of events.

### Add
The Add method allows you to add a plugin to the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
@discardableResult func add(plugin: Plugin) -> String
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
analytics.add(plugin: UIKitScreenTracking(name: "ScreenTracking"))
```
{% endcodeexampletab %}
{% endcodeexample %}

### Find
The Find method lets you find a registered plugin from the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func find<T: Plugin>(pluginType: T.Type) -> Plugin?
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
let plugin = analytics.find(SomePlugin.self)
```
{% endcodeexampletab %}
{% endcodeexample %}

### Remove
The Remove methods lets you remove a registered plugin from the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func remove(plugin: Plugin)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
analytics.remove(somePluginInstance)
```
{% endcodeexampletab %}
{% endcodeexample %}

### Flush
The Flush method lets you force flush the current queue of events regardless of what the `flushAt` and `flushInterval` is set to.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
public func flush()
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
analytics.flush()
```
{% endcodeexampletab %}
{% endcodeexample %}

### OpenURL

Since there a various deep linking scenarios you may want to account for, the `analytics.openURL(...)` method was added so you can track deep links in any situation. Where and how you implement the method will depend on your app lifecycle setup (for example UIApplicationDelegate vs. UISceneDelegate or UIKit vs. SwiftUI). The snippets below outline what your implementation might look like in a few different scenarios. 

> warning ""
> `Analytics iOS` only captures the `UIApplicationDidFinishLaunchingNotification` notification.

**UIApplicationDelegate**

```swift
// captures if app is closed and launching
application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]?) -> Bool {
    // ...
    if let url = launchOptions?[.url] {
        analytics.openURL(url)
    }
}
// captures if an app was already open and returning to the foreground
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any]) -> Bool {
    analytics.openURL(url)
}
```

**UISceneDelegate**
```swift
// captures if app is closed and launching
func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    // NOTE: There could be multiple URLs.  This example only handles the first one.
    if let url = connectionOptions.urlContexts.first?.url {
        analytics.openURL(url)
    }
}

// captures if an app was already open and returning to the foreground
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    // NOTE: There could be multiple URLs.  This example only handles the first one.
    if let url = URLContexts.first?.url else {
        analytics.openURL(url)
    }
}
```

**SwiftUI**
```swift
// in the app's Scene code ...
var body: some Scene {
    WindowGroup {
        ContentView()
            .onOpenURL { url in
                analytics.openURL(url)
            }
        }
    }
}
```
Calling this method with a valid URL parameter, will also trigger a Segment `Deep Link Opened` track event. 

## Changelog
[View the Analytics Swift changelog on GitHub](https://github.com/segmentio/analytics-swift/releases){:target="_blank"}.   -->
