---
title: Analytics Swift Destination Plugins
strat: swift
plugins:
  - name: Adjust
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/adjust-swift/
    logo:
      url: https://cdn.filepicker.io/api/file/IefXQy6fRR27ZG1NvZgW
    mark:
      url: https://cdn.filepicker.io/api/file/lqTYxhVyT5WFDFdLS598
  - name: Amplitude
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/amplitude-swift/
    logo:
      url: https://d3hotuclm6if1r.cloudfront.net/logos/amplitude-default.svg
    mark:
      url: https://cdn.filepicker.io/api/file/Nmj7LgOQR62rdAmlbnLO
  - name: Appsflyer
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/appsflyer-swift/
    logo:
      url: https://d3hotuclm6if1r.cloudfront.net/logos/appsflyer-default.svg
    mark:
      url: https://cdn.filepicker.io/api/file/AnJUEBvxRouLLOvIeQuK
  - name: Braze (Partner-Maintained)
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/braze-swift/
    logo:
      url: https://cdn.filepicker.io/api/file/9kBQvmLRR22d365ZqKRK
    mark:
      url: https://cdn.filepicker.io/api/file/HrjOOkkLR8WrUc1gEeeG
  - name: Bugsnag
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/bugsnag-swift
    logo:
      url: https://cdn.filepicker.io/api/file/GoTtwMELTeWGtu44SBUh
    mark:
      url: https://cdn.filepicker.io/api/file/1ttsQcwwRDGHBG3XjVFT
  - name: Facebook App Events
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/facebook-app-events-swift/
    logo:
      url: https://d3hotuclm6if1r.cloudfront.net/logos/facebook-app-events-default.svg
    mark:
      url: https://cdn.filepicker.io/api/file/k1fi9InSu6eint2IHilP
  - name: Firebase
    url: connections/sources/catalog/libraries/mobile/apple//destination-plugins/firebase-swift/
    logo:
      url: https://cdn.filepicker.io/api/file/W6teayYkRmKgb8SMqxIn
    mark:
      url: https://cdn.filepicker.io/api/file/ztKtaLBUT7GUZKius5sa
  - name: Mixpanel
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/mixpanel-swift/
    logo:
      url: https://cdn.filepicker.io/api/file/pUF0kwpTTu0Z5POuzZXV
    mark:
      url: https://cdn.filepicker.io/api/file/0mdiroESxtRQBoR8ieBg
  - name: Optimizely Full Stack
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/optimizely-full-stack-swift
    logo:
      url: https://cdn.filepicker.io/api/file/fb5lNYEhQoWnABOjynZ6
    mark:
      url: https://cdn.filepicker.io/api/file/kWmScDJ3SvK1QBZTChGQ
  - name: Survicate
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/survicate-swift/
    logo:
      url: https://cdn.filepicker.io/api/file/BUciQq3kSzqCn8EKMtBN
    mark:
      url: https://cdn.filepicker.io/api/file/0H2JyPoRT4K3CnBQcHPn
  - name: Quantcast
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/quantcast-swift/
    logo:
      url: https://cdn.filepicker.io/api/file/zeGaFc7rSEerWyM7dmVQ
    mark:
      url: https://cdn.filepicker.io/api/file/A0pxB2RWTNiVs2VBYGhx
  - name: 1Flow Mobile Plugin
    url: connections/sources/catalog/libraries/mobile/apple/destination-plugins/1flow-swift/
    logo:
      url: https://cdn-devcenter.segment.com/85468e64-4f93-45a0-a30e-20886b933529.svg
    mark:
      url: https://cdn-devcenter.segment.com/a026bddd-e174-4f41-9e56-4eac99d5e825.svg
---
Analytics Swift uses its timeline/plugin architecture to support sending data to bundled SDKs when a Cloud Mode connection is not possible. Destination Plugins are similar to traditional Device Mode integrations available in Analytics-iOS in that Segment makes calls directly to the destination tool’s API from the device. However, Destination Plugins are more customizable, giving you the ability to control and enrich your data at a much more granular level on the device itself. 

> info "Choosing the right destination"
> Segment built device-mode destination [plugins](/docs/connections/sources/catalog/libraries/mobile/apple/swift-plugin-architecture/) for use with the classic and legacy destinations, not Actions destinations. The Amplitude plugin is an exception. The Amplitude plugin is a session plugin meant to be used with Amplitude Actions. If a classic or legacy destination is in maintenance mode, Segment continues to make updates pertaining to the mobile plugins, but not the server or web components. If you run into any issues setting up your destination, reach out to support.

## Device-mode Vs. Cloud-Mode 
Analytics Swift allows you to choose how you send data to Segment and your connected destinations from your app. There are two ways to send data:

**Cloud-mode:** The sources send data directly to the Segment servers, which then translate it for each connected downstream destination, and send it on. Translation is done on the Segment servers, keeping your page size, method count, and load time small.

**Device-mode:** You include additional code on your app which allows Segment to use the data you collect on the device to make calls directly to the destination tool’s API, without sending it to the Segment servers first. (You still send your data to the Segment servers, but this occurs asynchronously.) This is also called wrapping or bundling, and it might be required when the source has to be loaded on the page to work, or loaded directly on the device to function correctly.

### Supported Device-mode Plugins
Analytics Swift supports the following Device-mode Plugins: 

<div class="destinations-catalog">
<div class="destinations-catalog__section markdown" id="{{ category | slugify }}">
 <div class="flex flex--wrap waffle waffle--xlarge">
        {% assign category = "plugin" %}
        {% assign resources = page.plugins %}
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


## Building your own destination

If Segment doesn’t support your Swift destination, you can build your own with the template Segment provides.

To build your own Swift destination using a plugin template:

1. Go to the [Swift Destination Plugin template.](https://github.com/segment-integrations/analytics-swift-destination-template)
2. Click *Use this template*
3. Enter a name for the repository
4. Complete the `TODO` sections in the sample code with the appropriate information for your destination. Segment recommends you to change the package name before you finalize your build.
5. Commit your changes.


> info ""
> For more information about the Analytics Swift Plugin architecture and how it can help you customize your tracking implementation to suit your needs, refer to the [Plugin Architecture Guide.](/docs/connections/sources/catalog/libraries/mobile/swift/swift-plugin-architecture)
