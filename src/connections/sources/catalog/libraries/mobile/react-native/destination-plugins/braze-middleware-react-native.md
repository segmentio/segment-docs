[Braze](https://www.braze.com/), formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.

Braze’s middleware plugin code is open source and available on GitHub. You can view it [here.](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-braze-middleware).

The Braze middleware plugin is a `BeforePlugin` used to debounce `identify` events for [Braze](https://www.braze.com). This Plugin should be used with a [Cloud Mode](https://segment.com/docs/connections/destinations/#connection-modes) connection to Braze. To connect to Braze with a Device Mode connection use the [Braze Destination Plugin]((https://www.npmjs.com/package/@segment/analytics-react-native-plugin-braze))instead. It is not possible to use both plugins in one `Analytics React Native` instance. 

## Installation

You need to install the `@segment/analytics-react-native-plugin-braze-middleware`.

Using NPM:
```bash
npm install --save @segment/analytics-react-native-plugin-braze-middleware 
```

Using Yarn:
```bash
yarn add @segment/analytics-react-native-plugin-braze-middleware
```
## Usage

Follow the [instructions for adding plugins](https://github.com/segmentio/analytics-react-native#adding-plugins) on the main Analytics client:

In your code where you initialize the analytics client call the `.add(plugin)` method with an `BrazeMiddlewarePlugin` instance:

```ts
import { createClient } from '@segment/analytics-react-native';

import { BrazePlugin } from '@segment/analytics-react-native-plugin-braze-middleware';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new BrazeMiddlewarePlugin() });
```
Once enabled, this plugin will make it possible to use Braze with a Cloud Mode connection while limiting the number of `identify` calls from the client. 