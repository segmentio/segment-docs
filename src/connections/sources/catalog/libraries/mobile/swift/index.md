---
title: 'Analytics for Swift'
strat: swift
redirect_from:
  - '/connections/sources/catalog/cloud-apps/swift/'
id: dZeHygTSD4
---
With Analytics-Swift, you can send data from iOS, tvOS, iPadOS, WatchOS, macOS and Linux applications to any analytics or marketing tool without having to learn, test, or implement a new API every time. 

Analytics-Swift enables you to process and track the history of a payload, while Segment controls the API and prevents unintended operations. Analytics-Swift also offers default implementations to help you maintain destinations and integrations.

If you're migrating to Analytics-Swift from a different mobile library, you can skip to the [migration guide](/docs/connections/sources/catalog/libraries/mobile/swift/migration/).

> warning ""
> The following documentation covers `Analytics Swift` implementations. If you are using the older `Analytics iOS` SDK, you can find the documentation [here.](/docs/connections/sources/catalog/libraries/mobile/ios/)

## Sources

The Analytics-Swift [implementation guide](/docs/connections/sources/catalog/libraries/mobile/swift/implementation) covers all platforms for which you can build Swift applications, including iOS, macOS, tvOS, and watchOS.

## Destinations

Destinations compatible with Analytics-Swift sources include purpose built Device Mode plugins, and all Cloud Mode destinations.

<div class="double">
  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/swift/destination-plugins"
    icon="destinations-catalog/mobile.svg"
    title="Device-mode Plugins"
    description="These destinations are built on Segment's plugin architecture, and allow for direct Device-mode integration."
    newtab="false"
  %}

  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/swift/cloud-mode-destinations"
    icon="destinations-catalog/cloud-apps.svg"
    title="Cloud-mode Destinations"
    description="Destinations that support Cloud-mode connections to Segment."
    newtab="false"
  %}
</div>

## Tools and extensions

Analytics for Swift is built with extensibility in mind. Use the tools list below to improve data collection.

- [Plugin architecture](/docs/connections/sources/catalog/libraries/mobile/swift/destination-plugins/#plugin-architecture)
- [Typewriter](/docs/connections/sources/catalog/libraries/mobile/swift/swift-typewriter)
- [Destination filters](/docs/connections/sources/catalog/libraries/mobile/swift/swift-destination-filters)

## Sample applications

{% assign resources = site.data.catalog.swift_resources.items | where: "categories", "sample" %}
{: .columns}
{% for resource in resources %}
- [{{resource.name}}]({{resource.url}}){:target="_blank"}
{%endfor%}