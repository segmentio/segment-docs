---
title: Auto-Instrumentation
hidden: true
sources: 
  - name: Android
    url: /connections/auto-instrumentation/kotlin-setup/
    logo:
      url: https://cdn.filepicker.io/api/file/9BoiIqVRFmsAuBbMMy9D
    mark:
      url: https://cdn.filepicker.io/api/file/9BoiIqVRFmsAuBbMMy9D
  - name: Apple 
    url: /connections/auto-instrumentation/swift-setup/
    logo:
      url: https://cdn.filepicker.io/api/file/qWgSP5cpS7eeW2voq13u
    mark:
      url: https://cdn.filepicker.io/api/file/qWgSP5cpS7eeW2voq13u
  - name: Web
    url: /connections/auto-instrumentation/web-setup/
    logo:
      url: https://cdn.filepicker.io/api/file/aRgo4XJQZausZxD4gZQq
    mark:
      url: https://cdn.filepicker.io/api/file/aRgo4XJQZausZxD4gZQq
redirect_from:
  - '/docs/connections/auto-instrumentation/setup/'
---

Auto-Instrumentation simplifies tracking in your websites and apps by eliminating the need for a traditional Segment instrumentation.

> info "Auto-Instrumentation Private Beta"
> Auto-Instrumentation is currently in Private Beta and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. Segment is actively iterating on and improving the Auto-Instrumentation user experience.

> success "Enable Auto-Instrumentation in your workspace"
> To enable Auto-Instrumentation in your Segment workspace, reach out to your dedicated account manager.

## Background

Collecting high-quality analytics data is essential, but traditional tracking setups often fall behind as business needs change. Instrumentation updates can take weeks or months, and these delays reduce visibility and increase the burden on engineering teams.

## Auto-Instrumentation as a solution

With just a few lines of code, Auto-Instrumentation handles device tracking for you, helping you focus on collecting the data that's essential to your business and letting your marketers and data analysts gather and update data without relying on engineering teams.

Key Auto-Instrumentation include:

- **No-code event creation**: Define events based on user activity without writing JavaScript.
- **Rapid iteration**: Update your instrumentation logic at any time, without deploying new app versions.
- **Bypass update delays**: Avoid the typical delays associated with app update cycles and app store approvals. Auto-Instrumentation lets you update your tracking setups or fix errors immediately, ensuring your data collection remains accurate and timely.

## How it works

After you install the required SDKs and enable Auto-Instrumentation, Segment detects activity like button clicks, navigation, and network calls. Segment captures these events as signals, which appear in the Event Builder.

You can group signals into complete analytics events, assign names, and map custom properties. You can then [use this data to create detailed analytics events](/docs/connections/auto-instrumentation/configuration/) based on those signals, enriching your insights into user behavior and application performance.

## Setup Guides

<div class="auto-instrumentation-catalog">
<div class="auto-insturmentation__section markdown" id="{{ category | slugify }}">
 <div class="flex flex--wrap waffle waffle--xlarge">
        {% assign category = "source" %}
        {% assign resources = page.sources %}
        {% for resource in resources %}
          <div class="flex__column flex__column--6">
            <a class="thumbnail-integration flex flex--middle" href="{{ site.baseurl }}/{{ resource.url }}">
              <div class="thumbnail-integration__content">
                <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                  <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                      <img class="thumbnail-integration__logo image" alt="{{resource.name}}" src="{{resource.mark.url}}" />
                  </div>
                  <h5 class="flex__column flex__column--12 flex__column--10@medium">{{ resource.name }}</h5>
                </div>
              </div>
            </a>
          </div>
        {% endfor %}
      </div>
    </div>
  </div>

## Privacy

Auto-Instrumentation removes personally identifiable information (PII) from breadcrumbs before they get sent to Segment. No user data is visible to Segment.
