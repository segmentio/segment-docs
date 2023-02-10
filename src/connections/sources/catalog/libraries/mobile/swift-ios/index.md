---
title: 'Analytics for Swift'
strat: swift
redirect_from:
  - '/connections/sources/catalog/cloud-apps/swift/'
id: dZeHygTSD4
---
With Analytics-Swift, you can send data from iOS, tvOS, iPadOS, WatchOS, macOS and Linux applications to any analytics or marketing tool without having to learn, test, or implement a new API every time. 

Analytics-Swift enables you to process and track the history of a payload, while Segment controls the API and prevents unintended operations. Analytics-Swift also offers default implementations to help you maintain destinations and integrations.

If you're migrating to Analytics-Swift from a different mobile library, you can skip to the [migration guide](/docs/connections/sources/catalog/libraries/mobile/swift-ios/migration/).

> warning ""
> The following documentation covers `Analytics Swift` implementations. If you are using the older `Analytics iOS` SDK, you can find the documentation [here.](/docs/connections/sources/catalog/libraries/mobile/ios/)

## Sources

Choose the platform in which you're implementing Analytics Swift.

- [iOS](/docs/connections/sources/catalog/libraries/mobile/swift-ios/implementation)
- [macOS](/docs/connections/sources/catalog/libraries/mobile/swift-ios/implementation)
- [tvOS](/docs/connections/sources/catalog/libraries/mobile/swift-ios/implementation)
- [watchOS](/docs/connections/sources/catalog/libraries/mobile/swift-ios/implementation)

## Destinations

Descriptive text about these destinations

<div class="double">
  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/swift-ios/swift_destination_plugins"
    icon="destinations-catalog/mobile.svg"
    title="Device Mode Plugins"
    description="These plugins integrate directly......"
    newtab="false"
  %}

  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/swift-ios/cloud_mode_destinations"
    icon="destinations-catalog/cloud-apps.svg"
    title="Cloud Mode"
    description="Some text about cloud mode stuff here"
    newtab="false"
  %}
</div>

## Tools and extensions

Analytics for Swift is built with extensibility in mind. Use the tools list below to improve data collection.

- [Plugin architecture](/docs/connections/sources/catalog/libraries/mobile/swift-ios/plugin_architecture)
- [Typewriter](/docs/connections/sources/catalog/libraries/mobile/swift-ios/swift_typewriter)
- [Destination filters](/docs/connections/sources/catalog/libraries/mobile/swift-ios/swift_destination_filters)

## Additional resources

Looking for more? See the additional resources below.
- [Blog posts](#)
- [Analytics iOS (Classic)](/docs/connections/sources/catalog/libraries/mobile/ios/)


<!-- <div class="destinations-catalog">
  {% assign categories = "Sources, Destinations, Tools & Extensions, Additional Resources" | split: ", " %}

  {% for category in categories %}
    <div class="destinations-catalog__section markdown" id="{{ category | slugify }}">
      <h2 class="destinations-catalog__title" id="{{ category | slugify }}">
        {{ category }}
      </h2>
      {% if category == "Sources" %}
        <p>Choose the platform you are implementing Analytics Swift in to get started.</p>
      {% endif %}
      {%  if category == "Destinations" %}
        <p>You can find more information about Destination types on the Destinations Overview page.</p>
      {%  endif %}
      {%  if category == "Tools & Extensions" %}
        <p> Analytics for Swift was built with extensibility top of mind. Check out all of the additional tools you can use to improve data collection below.</p>
      {%  endif %}
      <div class="flex flex--wrap waffle waffle--xlarge">
        {% assign resources = site.data.catalog.swift_resources.items | where: "categories", category %}
        {% for resource in resources %}
          <div class="flex__column flex__column--6">
            <a class="thumbnail-integration flex flex--middle" href="{{ site.baseurl }}/{{ resource.url }}">
              <div class="thumbnail-integration__content">
                <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                  <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                      <img class="thumbnail-integration__logo image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                  </div>
                  <h5 class="flex__column flex__column--12 flex__column--10@medium">{{ resource.name }}</h5>
                </div>
              </div>
            </a>
          </div>
        {% endfor %}
      </div>
    </div>
    {% endfor %}
  </div> -->
