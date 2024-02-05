---
title: Analytics for Kotlin Implementation Guide
strat: kotlin-android
tags:
  - android
  - kotlin
  - android-kotlin
---

Once you've installed the mobile or server Analytics Kotlin library, you can start collecting data through Segment's tracking methods:
- [Identify](#identify)
- [Track](#track)
- [Screen](#screen)
- [Group](#group)

> info ""
> For any of the different methods described, you can replace the properties and traits in the code samples with variables that represent the data collected.

### Identify
The [Identify](/docs/connections/spec/identify/) method lets you tie a user to their actions and record traits about them. This includes a unique user ID and any optional traits you know about them like their email, name, or address. The traits option can include any information you want to tie to the user. When using any of the reserved traits, be sure the information reflects the name of the trait. For example, `email`  should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun identify(userId: String, traits: JsonObject = emptyJsonObject)

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> identify(userId: String, traits: T, serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}
{% codeexampletab Kotlin %}
```java
analytics.identify("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```
{% endcodeexampletab %}
{% codeexampletab Java %}
```java
analytics.identify("user-123", Builders.buildJsonObject(o -> {
    o.put("username", "MisterWhiskers")
        .put("email", "hello@test.com")
        .put("plan", "premium");
}));

// or

analytics.identify("user-123", new YourJsonSerializable());
```
{% endcodeexampletab %}
{% endcodeexample %}

### Track
The [Track](/docs/connections/spec/track/) method lets you record the actions your users perform. Every action triggers an event, which also has associated properties that the track method records.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun track(name: String, properties: JsonObject = emptyJsonObject)

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> track(name: String, properties: T, serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```java
analytics.track("View Product", buildJsonObject {
    put("productId", 123)
    put("productName" "Striped trousers")
});
```
{% endcodeexampletab %}
{% codeexampletab Java %}
```java
analytics.track("View Product", Builders.buildJsonObject(o -> {
   o.put("productId", 123)
    .put("productName", "Striped Trousers")
});
```
{% endcodeexampletab %}
{% endcodeexample %}

### Screen
The [Screen](/docs/connections/spec/screen/) method lets you record whenever a user sees a screen in your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event whenever the user opens a screen in your app. This could be a view, fragment, dialog, or activity depending on your app.

Not all integrations support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun screen(screenTitle: String, properties: JsonObject = emptyJsonObject, category: String = "")

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> screen(screenTitle: String, properties: T, category: String = "", serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}
{% codeexampletab Kotlin %}
```java
analytics.screen("ScreenName", buildJsonObject {
    put("productSlug", "example-product-123")
});
```
{% endcodeexampletab %}
{% codeexampletab Java %}
```java
analytics.screen("ScreenName", Builders.buildJsonObject(o -> {
    o.put("productSlug", "example-product-123");
}));

// or

analytics.screen("ScreenName", new YourJsonSerializable());
```
{% endcodeexampletab %}
{% endcodeexample %}

> info ""
> Add the [AndroidRecordScreenPlugin](https://github.com/segmentio/analytics-kotlin/blob/main/samples/kotlin-android-app/src/main/java/com/segment/analytics/next/plugins/AndroidRecordScreenPlugin.kt) to enable automatic screen tracking.

### Group
The [Group](/docs/connections/spec/group/) method lets you associate an individual user with a group— whether it's a company, organization, account, project, or team. This includes a unique group identifier and any additional group traits you may have, like company name, industry, number of employees. You can include any information you want to associate with the group in the traits option. When using any of the [reserved group traits](/docs/connections/spec/group/#traits), be sure the information reflects the name of the trait. For example, email should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun group(groupId: String, traits: JsonObject = emptyJsonObject)

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> group(groupId: String, traits: T, serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}
{% codeexampletab Kotlin %}
```java
analytics.group("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```
{% endcodeexampletab %}
{% codeexampletab Java %}
```java
analytics.group("user-123", Builders.buildJsonObject(o -> {
    o.put("username", "MisterWhiskers")
        .put("email", "hello@test.com")
        .put("plan", "premium");
}));

// or

analytics.group("user-123", new YourJsonSerializable());
```
{% endcodeexampletab %}
{% endcodeexample %}

## Utility methods
The Analytics Kotlin utility methods help you work with plugins from the analytics timeline. They include:
- [Add](#add)
- [Find](#find)
- [Remove](#remove)
- [Reset](#reset)

There's also the [Flush](#flush) method to help you manage the current queue of events.

### Add
The Add method lets you add a plugin to the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun add(plugin: Plugin): Analytics
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
val plugin = object: Plugin {
    override val type = Plugin.Type.Enrichment
    override val name = "SomePlugin"
    override var lateinit analytics: Analytics
}
analytics.add(plugin)
```
{% endcodeexampletab %}
{% endcodeexample %}

### Find
The Find method lets you find a registered plugin from the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun find(pluginName: String): Plugin
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
val plugin = analytics.find(SomePlugin::class)
```
{% endcodeexampletab %}
{% endcodeexample %}

### Remove
The Remove methods lets you remove a registered plugin from the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun remove(pluginName: String): Analytics
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.remove("SomePlugin")
```
{% endcodeexampletab %}
{% endcodeexample %}

### Flush
The Flush method lets you force flush the current queue of events regardless of what the `flushAt` and `flushInterval` is set to.

{% codeexample %}
{% codeexampletab Method signature %}
```java
public fun flush()
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.flush()
```
{% endcodeexampletab %}
{% endcodeexample %}

### Reset
The `reset` method clears the SDK’s internal stores for the current user and group. This is useful for apps where users log in and out with different identities on the same device over time.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun reset()
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.reset()
```
{% endcodeexampletab %}
{% endcodeexample %}

{% include content/reset-mobile.md %}

### OpenURL
While Analytics Kotlin will automatically track deep links that open your app when the `trackDeepLinks` Configuration property is set to `true`. There are some situations when the app is already open that could cause a deep link open event to be missed.

The `openUrl` function allows you to manually track that a deep link has opened your app while your app was already open:

```kotlin
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
    
        // Add a deep-link opened event manually.
        // This is necessary when your Activity has a android:launchMode of
        // 'singleInstance', 'singleInstancePerTask', 'singleTop', or any other mode
        // that will re-use an existing Activity instead of creating a new instance.
        // The Analytics SDK automatically identifies when you app is started from 
        // a deep link if the Activity is created, but not if it is re-used. Therefore 
        // we have to add this code to manually capture the Deep Link info.
        
        val referrer = "unknown" 
        analytics.trackDeepLinkOpen(referrer, intent)
    }
```

> info ""
>Due to the way deep links are handled in Android, we can not know the referrer when a deep link causes `onNewIntent()` to be fired instead of `onCreate()`. 

For a sample implementation see our Kotlin Sample App.


## Changelog
[View the Analytics Kotlin changelog on GitHub](https://github.com/segmentio/analytics-kotlin/releases).
