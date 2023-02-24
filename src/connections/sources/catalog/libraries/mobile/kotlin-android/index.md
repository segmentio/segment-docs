---
title: 'Analytics for Kotlin (Android)'
strat: kotlin-android
redirect_from:
  - '/connections/sources/catalog/cloud-apps/kotlin/'
id: dZeHygTSD4
---
With Analytics-Kotlin, you can send data using Kotlin applications to any analytics or marketing tool without having to learn, test, or implement a new API every time. Analytics-Kotlin enables you to process and track the history of a payload, while Segment controls the API and prevents unintended operations.

> success ""
> You can choose to set up your Analytics Kotlin source on [mobile](/docs/connections/sources/catalog/libraries/mobile/kotlin-android) or on the [server](/docs/connections/sources/catalog/libraries/server/kotlin). Segment doesn't support device-mode destinations on the server-side.

> warning ""
> If you're migrating to Analytics-Kotlin from a different mobile library, you can skip to the [migration guide](/docs/connections/sources/catalog/libraries/mobile/ kotlin-android/migration/).

## Sources

The Analytics-Kotlin [implementation guide](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/implementation) covers all platforms for which you can build Kotlin applications.

## Destinations

Analytics Kotlin allows you to choose how you send data to Segment and your connected destinations from your app. There are two ways to send data:

**Cloud-mode**: The sources send data directly to the Segment servers, which then translate it for each connected downstream destination, and send it on. Translation is done on the Segment servers, keeping your page size, method count, and load time small.

**Device-mode**: You include additional code on your  app which allows Segment to use the data you collect on the device to make calls directly to the destination tool’s API, without sending it to the Segment servers first. (You still send your data to the Segment servers, but this occurs asynchronously.) This is also called wrapping or bundling, and it might be required when the source has to be loaded on the page to work, or loaded directly on the device to function correctly. 

Connection Mode| Pros | Cons |
-------------- | ---- | ---- |  
Cloud-mode | * Increased app performance | * May limit destination features |
Device-mode | * Access to all features of the destination SDK | * Decreased app performance |

### Supported Destinations

<div class="double">
  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/kotlin-android/destination-plugins"
    icon="destinations-catalog/mobile.svg"
    title="Device-mode Plugins"
    description="These destinations are built on Segment's plugin architecture, and allow for direct Device-mode integration."
    newtab="false"
  %}

  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/kotlin-android/cloud-mode-destinations"
    icon="destinations-catalog/cloud-apps.svg"
    title="Cloud-mode Destinations"
    description="Destinations that support Cloud-mode connections to Segment."
    newtab="false"
  %}
</div>

## Tools and extensions

Analytics for Kotlin is built with extensibility in mind. Use the tools list below to improve data collection.

- [Plugin architecture](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/destination-plugins/#plugin-architecture)
- [Typewriter](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-typewriter)
- [Destination filters](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-destination-filters)

## Sample applications

The code samples below demonstrate the implementation of common use cases of the Analytics Kotlin library across different platforms. 

{% assign resources = site.data.catalog.kotlin_resources.items | where: "categories", "sample" %}
{: .columns}
{% for resource in resources %}
- [{{resource.name}}]({{resource.url}}){:target="_blank"}
{%endfor%}

## Additional Resources

- [Frequently Asked Questions](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android/android-faqs)
- [Analytics Android (Classic)](/docs/connections/sources/catalog/libraries/mobile/android)
