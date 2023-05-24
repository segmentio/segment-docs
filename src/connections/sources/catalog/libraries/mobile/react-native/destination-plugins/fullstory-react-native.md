---
title: Analytics React Native FullStory Plugin
strat: react-native
---

[FullStory](https://www.fullstory.com/) lets product and support teams easily understand everything about the customer experience. The Segment integration for FullStory helps accurately identify your customers within the FullStory dashboard.

> info ""
> The [FullStory Analytics React Native destination plugin](https://github.com/fullstorydev/segment-react-native-plugin-fullstory) was built and is maintained by the FullStory team. For implementation questions and guidance, reach out to them. 


Please make sure that your application is correctly set up with FullStory. See [FullStory's React Native documentation](https://help.fullstory.com/hc/en-us/articles/360052419133-Getting-Started-with-FullStory-React-Native-Capture) to get started.

## Installation

Install the `@fullstory/segment-react-native-plugin-fullstory` and `@fullstory/react-native` dependencies.

```bash
yarn add @fullstory/segment-react-native-plugin-fullstory @fullstory/react-native
# or
npm install --save @fullstory/segment-react-native-plugin-fullstory @fullstory/react-native
```

Run `pod install` after the installation to autolink the FullStory SDK.

## Usage

In your code where you initialize the analytics client call the `.add({ plugin })` method with an `FullStoryPlugin` instance.

```ts
// App.js

import { createClient } from '@segment/analytics-react-native';
import { FullStoryPlugin } from '@fullstory/segment-react-native-plugin-fullstory';

const segmentClient = createClient({
  writeKey: 'SEGMENT_WRITE_KEY',
});

const plugin = new FullStoryPlugin({
  // configurations
  enableFSSessionUrlInEvents: true,
});

segmentClient.add({ plugin });
```

### Configurations

The plugin accepts a configuration object with the following properties:

| Property                    | Description                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| enableFSSessionUrlInEvents  | Insert FS session URL to Segment event properties. Defaults to `true`.                                         |
| allowlistAllTrackEvents     | Send all track events as FS custom events. Defaults to `false`.                                                |
| enableIdentifyEvents        | Enable Segment identify events to be sent as FS identify events. Defaults to `true`.                           |
| allowlistTrackEvents        | An array of event names to allow to send to FullStory. To allowlist all events, use `allowlistAllTrackEvents`. |
| enableSendScreenAsEvents    | Send screen events as FS custom events. Defaults to `false`.                                                   |
| enableGroupTraitsAsUserVars | Enable group event traits to be passed into FS user vars. Defaults to `false`.                                 |

## Example

FullStory has included a simple React Native app that implements the plugin. See [example README](https://github.com/fullstorydev/segment-react-native-plugin-fullstory/tree/master/example) for additional instructions.