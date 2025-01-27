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

> info "Auto-Instrumentation Pilot"
> Auto-Instrumentation is currently in pilot and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. Segment is actively iterating on and improving the Auto-Instrumentation user experience.

> success "Enable Auto-Instrumentation in your workspace"
> To enable Auto-Instrumentation in your Segment workspace, reach out to your dedicated account manager.

## Background

Gathering actionable and timely data is crucial to the success of your business. However, collecting this data in real time has historically proven to be challenging. 

As your business needs change, keeping instrumentation up-to-date across all of your digital properties can be time-consuming, often taking weeks or months. This delay can lead to lost insights, frustration for your marketers and developers, and open-ended support of your Segment instrumentation.

## Auto-Instrumentation as a solution

With just a few lines of code, Auto-Instrumentation handles device tracking for you, helping you focus on collecting the data that's essential to your business and letting your marketers and data analysts gather and update data without relying on engineering teams.

Some Auto-Instrumentation advantages include:

- **JavaScript-based instrumentation logic**: Configure and refine your instrumentation logic entirely within JavaScript, simplifying the development process and reducing dependencies on other environments.
- **Rapid iteration**: Update your instrumentation logic without the need to constantly release new versions of your mobile app, enabling faster iterations and improvements.
- **Bypass update delays**: Avoid the typical delays associated with app update cycles and app store approvals. Auto-Instrumentation lets you update your tracking setups or fix errors immediately, ensuring your data collection remains accurate and timely.

## How it works

Once you integrate the Analytics SDK and Signals SDK into your website or application, Segment begins to passively monitor user activity like button clicks, page navigation, and network data. Segment captures these events as "signals" and sends them to your Auto-Instrumentation source in real time.

In Segment, the Auto-Instrumentation source lets you view raw signals. You can then [use this data to create detailed analytics events](/docs/connections/auto-instrumentation/configuration/) based on those signals, enriching your insights into user behavior and application performance.

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
