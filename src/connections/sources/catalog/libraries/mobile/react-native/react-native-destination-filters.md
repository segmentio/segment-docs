---
title: Analytics for React Native Destination Filters
strat: react-native
---


> info ""
> Destination filters are in beta and only available to Business Tier customers.


Use Analytics-React-Native to set up [destination filters](/docs/connections/destinations/destination-filters/) on your mobile device-mode destinations.

> warning ""
> You must use Analytics-React-Native version 2.9 or higher to implement destination filters.
>
> Keep [these limitations](/docs/connections/destinations/destination-filters/#limitations) in mind when using destination filters.

To get started with destination filters on mobile device-mode destinations using Analytics-React-Native:
1. Download and install the `@segment/analytics-react-native-plugin-destination-filters` package as a dependency in your project.
    * Using NPM:
      ```npm
      npm install --save @segment/analytics-react-native-plugin-destination-filters
      ```
    * Using Yarn:
      ```yarn
      yarn add @segment/analytics-react-native-plugin-destination-filters
      ```
2. Follow the instructions for [adding plugins](/docs/connections/sources/catalog/libraries/mobile/react-native/#adding-plugins) on the main Analytics client.
3. Add `DestinationFiltersPlugin` after you create your Segment client.

```kotlin
    import { createClient } from '@segment/analytics-react-native';

    import { DestinationFiltersPlugin } from '@segment/analytics-react-native-plugin-destination-filters';

    const segmentClient = createClient({
      writeKey: 'SEGMENT_KEY'
    });

    segmentClient.add({ plugin: new DestinationFiltersPlugin() });
    segment.add({ plugin: new FirebasePlugin() })
```
