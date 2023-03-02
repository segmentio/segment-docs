---
title: 'Analytics for Swift'
strat: swift
redirect_from:
  - '/connections/sources/catalog/cloud-apps/swift/'
id: dZeHygTSD4
---
With Analytics Swift, you can send data from iOS, tvOS, iPadOS, WatchOS, macOS and Linux applications to any analytics or marketing tool without having to learn, test, or implement a new API every time. 

Analytics Swift enables you to process and track the history of a payload, while Segment controls the API and prevents unintended operations. Analytics Swift also offers default implementations to help you maintain destinations and integrations.

> warning ""
> If you're migrating to Analytics Swift from a different mobile library, you can skip to the [migration guide](/docs/connections/sources/catalog/libraries/mobile/swift/migration/).

## Getting Started

{% include components/reference-button.html
  href="/docs/connections/sources/catalog/libraries/mobile/swift/implementation"
  icon="languages/swift.svg"
  title="Swift Implementation Guide"
  description="Follow the Analytics Swift implementation guide to add Segment analytics to any Swift application, including iOS, macOS, tvOS, and watchOS apps."
  newtab="false"
  logo="true"
%}


## Destinations

Analytics Swift allows you to choose how you send data to Segment and your connected destinations from your app. There are two ways to send data:

**Cloud-mode**: The sources send data directly to the Segment servers, which then translate it for each connected downstream destination, and send it on. Translation is done on the Segment servers, keeping your page size, method count, and load time small.

**Device-mode**: You include additional code on your  app which allows Segment to use the data you collect on the device to make calls directly to the destination tool’s API, without sending it to the Segment servers first. (You still send your data to the Segment servers, but this occurs asynchronously.) This is also called wrapping or bundling, and it might be required when the source has to be loaded on the page to work, or loaded directly on the device to function correctly. 
### Supported destinations

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
The code samples below demonstrate the implementation of common use cases of the Analytics Swift library across different platforms. 

### Sample applications
{% assign resources = site.data.catalog.swift_resources.items | where: "categories", "app" %}
{: .columns}
{% for resource in resources %}
- [{{resource.name}}]({{resource.url}}){:target="_blank"}
{%endfor%}

### Sample plugins 
{% assign resources = site.data.catalog.swift_resources.items | where: "categories", "plugin" %}
{: .columns}
{% for resource in resources %}
- [{{resource.name}}]({{resource.url}}){:target="_blank"}
{%endfor%}


## Additional Resources

- [Analytics iOS (Classic)](/docs/connections/sources/catalog/libraries/mobile/ios)