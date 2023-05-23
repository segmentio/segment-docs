---
title: Analytics React Native Destination Plugins
strat: react-native
plugins:
  - name: Adjust
    url: connections/sources/catalog/libraries/mobile/react-native/destination-plugins/adjust-react-native/
    logo:
      url: https://cdn.filepicker.io/api/file/IefXQy6fRR27ZG1NvZgW
    mark:
      url: https://cdn.filepicker.io/api/file/lqTYxhVyT5WFDFdLS598
  - name: Amplitude
    url: connections/sources/catalog/libraries/mobile/react-native/destination-plugins/amplitude-react-native/
    logo:
      url: https://d3hotuclm6if1r.cloudfront.net/logos/amplitude-default.svg
    mark:
      url: https://cdn.filepicker.io/api/file/Nmj7LgOQR62rdAmlbnLO
  - name: Appsflyer
    url: connections/sources/catalog/libraries/mobile/react-native/destination-plugins/appsflyer-react-native/
    logo:
      url: https://d3hotuclm6if1r.cloudfront.net/logos/appsflyer-default.svg
    mark:
      url: https://cdn.filepicker.io/api/file/AnJUEBvxRouLLOvIeQuK
  - name: Braze
    url: connections/sources/catalog/libraries/mobile/react-native/destination-plugins/braze-react-native/
    logo:
      url: https://cdn.filepicker.io/api/file/9kBQvmLRR22d365ZqKRK
    mark:
      url: https://cdn.filepicker.io/api/file/HrjOOkkLR8WrUc1gEeeG
  - name: Braze Middleware
    url: connections/sources/catalog/libraries/mobile/react-native/destination-plugins/braze-react-native/
    logo:
      url: https://cdn.filepicker.io/api/file/9kBQvmLRR22d365ZqKRK
    mark:
      url: https://cdn.filepicker.io/api/file/HrjOOkkLR8WrUc1gEeeG
  - name: Clevertap
    url: connections/sources/catalog/libraries/mobile/react-native/destination-plugins/clevertap-react-native/
    logo:
      url: https://cdn.filepicker.io/api/file/lrTbhI5mRbmM9Ax0hyDx
    mark:
      url: https://cdn.filepicker.io/api/file/c6dXBVkSeix8Mw5HnQYQ
  - name: Facebook App Events
    url: connections/sources/catalog/libraries/mobile/react-native/destination-plugins/facebook-app-events-react-native/
    logo:
      url: https://d3hotuclm6if1r.cloudfront.net/logos/facebook-app-events-default.svg
    mark:
      url: https://cdn.filepicker.io/api/file/k1fi9InSu6eint2IHilP
  - name: Firebase
    url: connections/sources/catalog/libraries/mobile/react-native//destination-plugins/firebase-react-native/
    logo:
      url: https://cdn.filepicker.io/api/file/W6teayYkRmKgb8SMqxIn
    mark:
      url: https://cdn.filepicker.io/api/file/ztKtaLBUT7GUZKius5sa
  - name: FullStory
    url: connections/sources/catalog/libraries/mobile/react-native//destination-plugins/fullstory-react-native/
    logo:
      url: https://cdn.filepicker.io/api/file/0ET4vgkqTGNMRtZcFWCA
    mark:
      url: https://cdn.filepicker.io/api/file/O9MoMg8SSallC8bvMmvw
  - name: Mixpanel
    url: connections/sources/catalog/libraries/mobile/react-native/destination-plugins/mixpanel-react-native/
    logo:
      url: https://cdn.filepicker.io/api/file/pUF0kwpTTu0Z5POuzZXV
    mark:
      url: https://cdn.filepicker.io/api/file/0mdiroESxtRQBoR8ieBg
  - name: Taplytics
    url: connections/sources/catalog/libraries/mobile/react-native/destination-plugins/taplytics-react-native/
    logo:
      url: https://d3hotuclm6if1r.cloudfront.net/logos/taplytics-default.svg
    mark:
      url: https://cdn.filepicker.io/api/file/QmY3nWHRStacuvHg097O
---

Analytics React Native uses its timeline/plugin architecture to support sending data to bundled SDKs when a Cloud Mode connection is not possible. Destination Plugins are similar to traditional Device Mode integrations available in Analytics React Native 1.x in that Segment makes calls directly to the destination tool’s API from the device. However, Destination Plugins are more customizable, giving you the ability to control and enrich your data at a much more granular level on the device itself. 

## Device-mode Vs. Cloud-Mode 
Analytics React Native allows you to choose how you send data to Segment and your connected destinations from your app. There are two ways to send data:

**Cloud-mode:** The sources send data directly to the Segment servers, which then translate it for each connected downstream destination, and send it on. Translation is done on the Segment servers, keeping your page size, method count, and load time small.

**Device-mode:** You include additional code on your app which allows Segment to use the data you collect on the device to make calls directly to the destination tool’s API, without sending it to the Segment servers first. (You still send your data to the Segment servers, but this occurs asynchronously.) This is also called wrapping or bundling, and it might be required when the source has to be loaded on the page to work, or loaded directly on the device to function correctly.

### Supported Device-mode Plugins
Analytics React Native supports the following Device-mode Plugins: 

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

### Add a custom Destination Plugin 

You can add custom plugins to Destination Plugins. For example, you could implement the following logic to send events to Braze on weekends only:

```js

import { createClient } from '@segment/analytics-react-native';

import {BrazePlugin} from '@segment/analytics-react-native-plugin-braze';
import {BrazeEventPlugin} from './BrazeEventPlugin';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

const brazeplugin = new BrazePlugin();
const myBrazeEventPlugin = new BrazeEventPlugin();
brazeplugin.add(myBrazeEventPlugin);
segmentClient.add({plugin: brazeplugin});

// Plugin code for BrazeEventPlugin.ts
import {
  Plugin,
  PluginType,
  SegmentEvent,
} from '@segment/analytics-react-native';

export class BrazeEventPlugin extends Plugin {
  type = PluginType.before;

  execute(event: SegmentEvent) {
    var today = new Date();
    if (today.getDay() === 6 || today.getDay() === 0) {
      return event;
    }
  }
}
```

Segment would then send events to the Braze Destination Plugin on Saturdays and Sundays, based on device time.

