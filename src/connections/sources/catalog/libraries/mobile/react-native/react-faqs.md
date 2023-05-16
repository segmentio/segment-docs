---
title: Analytics React Native FAQs
strat: react-native
---
## FAQs
### Can I use the catalog of device-mode destinations from Segment's 1.X.X React-Native release?
No, only the plugins listed above are supported in device-mode for Analytics React Native.
### Will I still see device-mode integrations listed as `false` in the integrations object?
When you successfully package a plugin in device-mode, you won't see the integration listed as `false` in the integrations object for a Segment event. This logic is packaged in the event metadata, and isn't surfaced in the Segment debugger.

### How do I set a distinct writeKey for iOS and android?
You can set different writeKeys for iOS and Android. This is helpful if you want to send data to different destinations based on the client side platform. To set different writeKeys, you can dynamically set the writeKey when you initialize the Segment client:

```js
import {Platform} from 'react-native';
import { createClient } from '@segment/analytics-react-native';

const segmentWriteKey = Platform.iOS ? 'ios-writekey' : 'android-writekey';

const segmentClient = createClient({
  writeKey: segmentWriteKey
});
```
### What is the instanceId set in context?
The instanceId was introduced in [V 2.10.1](https://github.com/segmentio/analytics-react-native/releases/tag/%40segment%2Fanalytics-react-native-v2.10.1) and correlates events to a particular instance of the client in a scenario when you might have multiple instances on a single app. 

### How do I interact with the integrations object?
The integrations object is no longer part of the Segment events method signature. To access the integrations object and control what destinations the event reaches, you can use a Plugin:

```js
import {
    EventType,
    Plugin,
    PluginType,
    SegmentEvent,
  } from '@segment/analytics-react-native';
  
  export class Modify extends Plugin {
    type = PluginType.before;
  
    async execute(event: SegmentEvent) {
      if (event.type == EventType.TrackEvent) {
        let integrations = event.integrations;
        if (integrations !== undefined) {
          integrations['Appboy'] = false;
        }
      }
      //console.log(event);
      return event;
    }
  }
```