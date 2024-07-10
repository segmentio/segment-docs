---
title: Analytics React Native Plugin Architecture
strat: react-native
---

## Plugin Architecture
Segment's plugin architecture enables you to modify and augment how the events are processed before they're uploaded to the Segment API.  In order to customize what happens after an event is created, you can create and place various Plugins along the processing pipeline that an event goes through. This pipeline is referred to as a timeline.

### Plugin Types

| Plugin Type   | Description                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------- |
| `before`      | Executes before event processing begins.                                                          |
| `enrichment`  | Executes as the first level of event processing.                                                  |
| `destination` | Executes as events begin to pass off to destinations.                                             |
| `after`       | Executes after all event processing is completed. You can use this to perform cleanup operations. |
| `utility`     | Executes only with manual calls such as Logging.                                                  |

> info ""
> Plugins can have their own native code (such as the iOS-only [`IdfaPlugin`](https://github.com/segmentio/analytics-react-native/blob/829fc80bc8c4f59fa99dadd25083efa422d577f0/packages/plugins/plugin-idfa/README.md){:target="_blank"} or wrap an underlying library (such as the [`FirebasePlugin`](https://www.npmjs.com/package/@segment/analytics-react-native-plugin-firebase) which uses `react-native-firebase` under the hood).

### Destination Plugins
Segment is an out-of-the-box `DestinationPlugin`. You can add as many other destination plugins as you like and upload events and data to them.

If you don't want the Segment destination plugin, you can pass `autoAddSegmentDestination = false` in the options when setting up your client. This prevents the `SegmentDestination` plugin from being added automatically for you.

### Adding Plugins
You can add a plugin at any time through the `segmentClient.add()` method.

```js

import { createClient } from '@segment/analytics-react-native';

import { AmplitudeSessionPlugin } from '@segment/analytics-react-native-plugin-amplitude';
import { FirebasePlugin } from '@segment/analytics-react-native-plugin-firebase';
import { IdfaPlugin } from '@segment/analytics-react-native-plugin-idfa';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new AmplitudeSessionPlugin() });
segmentClient.add({ plugin: new FirebasePlugin() });
segmentClient.add({ plugin: new IdfaPlugin() });
```

### Writing your own Plugins
Plugins implement as ES6 Classes. To get started, familiarize yourself with the available classes in `/packages/core/src/plugin.ts`.

The available plugin classes are:
- `Plugin`
- `EventPlugin`
- `DestinationPlugin`
- `UtilityPlugin`
- `PlatformPlugin`

Any plugin must be an extension of one of these classes.
You can then customize the functionality by overriding different methods on the base class. For example, here is a simple `Logger` plugin:

```js
// logger.js

import {
  Plugin,
  PluginType,
  SegmentEvent,
} from '@segment/analytics-react-native';

export class Logger extends Plugin {

  // Note that `type` is set as a class property
  // If you do not set a type your plugin will be a `utility` plugin (see Plugin Types above)
  type = PluginType.before;

  execute(event: SegmentEvent) {
    console.log(event);
    return event;
  }
}
// app.js

import { Logger } from './logger';

segmentClient.add({ plugin: new Logger() });
```

As the plugin overrides the `execute()` method, this `Logger` calls `console.log` for every event going through the Timeline.

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
