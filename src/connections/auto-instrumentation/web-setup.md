---
title: Auto-Instrumentation Setup
hidden: true
---

This guide outlines the steps required to set up the Signals SDK in your JavaScript website.

You'll learn how to add Auto-Instrumentation sources, integrate dependencies, and ensure that your setup captures and processes data as intended.  

> info "Auto-Instrumentation Pilot"
> Auto-Instrumentation is currently in pilot and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. Segment is actively iterating on and improving the Auto-Instrumentation user experience.

> success "Enable Auto-Instrumentation"
> To enable Auto-Instrumentation in your Segment workspace, reach out to your dedicated account manager.

## Step 1: Add a source and get its write key

You'll first need to add a source and copy its write key: 

1. In your Segment workspace, navigate to **Connections > Auto-Instrumentation** and click **Add source**.
2. Select a source, give the source a name, and click **Save**.
3. Return to **Connections > Sources** to view your sources. 
4. In the **My sources** table, find and click the new source you just set up.
5. In the **Initialize the Client** section, look for and copy the `writeKey` displayed in the code block. 

## Step 2: Add dependencies and initialization code

Next, you'll need to add the Signals SDKs to your web environment. 

Follow these steps to integrate the Signals SDK into your website:

1. Add the Signals SDK to your project: 

```bash
    # npm
    npm install @segment/analytics-signals
    # yarn
    yarn add @segment/analytics-signals
    # pnpm
    pnpm install @segment/analytics-signals 
```

2. Add the initialization code and configuration options:

> success ""
> see [configuration options](#configuration-options) for a complete list.

```ts
// analytics.js/ts
import { AnalyticsBrowser } from '@segment/analytics-next'
import { SignalsPlugin } from '@segment/analytics-signals'

const analytics = new AnalyticsBrowser()
const signalsPlugin = new SignalsPlugin()
analytics.register(signalsPlugin)

analytics.load({
  writeKey: '<YOUR_WRITE_KEY>'
})
```

Verify that you replaced `<WRITE_KEY>` with the actual write key you copied in Step 1.

4. Build and run your app.

## Step 3: Verify and deploy events

After integrating the SDK and running your app, verify that Segment is collecting signals:

1. In your Segment workspace, return to **Connections > Sources**, then select the Source you created for Auto-Instrumentation.
2. In the Source header, look for the **Event Builder** tab. If the tab does not appear, make sure you’ve installed the SDK correctly and are triggering signal activity using the debug URL.
    ![The Event Builder tab shown in the navigation bar between Debugger and Schema in a Segment Source](/images/event-builder-tab.png)
3. Open the **Event Builder** and follow the on-screen instructions to trigger signal detection. You’ll need to open your app in a browser using the custom debug URL Segment provides (for example,`?segment_signals_debug=true`).
4. Interact with your app to trigger signals: click buttons, navigate pages, or submit forms. Segment collects and displays these as signals in the Event Builder.
5. From the signals list, click **Configure event** to define a new event based on one or more signals. After configuring the event, click **Publish event rules**.


### Debugging
#### Enable debug mode
Values sent to the signals API are redacted by default.
This adds a local storage key.  To disable redaction, add a magic query string:
```
https://my-website.com?segment_signals_debug=true
```
You can *turn off debugging* by doing:
```
https://my-website.com?segment_signals_debug=false
```

### Advanced

#### Emitting custom signals 
If you need to listen for data that is unavailable to the Signals plugin by default, you can create and emit a custom signal:

```ts
import { signalsPlugin } from './analytics' // assuming you exported your plugin instance.

signalsPlugin.addSignal({
  type: 'userDefined',
  data: { foo: 'bar' }
})
```

#### Listening to signals
```ts
const signalsPlugin = new SignalsPlugin()
signalsPlugin.onSignal((signal) => console.log(signal))
```

### Emitting Signals
```ts
const signalsPlugin = new SignalsPlugin()
signalsPlugin.addSignal({
  type: 'userDefined',
  data: { foo: 'bar' }
})
```

## Configuration Options

Using the Signals Configuration object, you can control the destination, frequency, and types of signals that Segment automatically tracks within your application. The following table details the configuration options for Signals-Kotlin.

| `Option`            | Required | Value                     | Description                                                                                                                                                                                           |
| ------------------- | -------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `writeKey`          | Yes      | string                    | Source write key                                                                                                                                                                                      |
| `maxBufferSize` | No       | number                  | The number of signals to be kept for JavaScript inspection. This buffer is first-in, first-out. Default is `1000`.                                                                                    |
| `processSignal` | No       | string                  | Override the default signal processing function from the edge function. If this is set, the edge function will not be used.
| `enableDebugLogging` | No       | boolean                  | Enable debug logs.
| `disableSignalRedaction` | No       | boolean                  | Disable default Signal data redaction.
| `apiHost` | No       | string                 | Override the default signals API host. Default is `signals.segment.io/v1`.
| `functionHost` | No       | string                 | Override the default edge host. Default is `cdn.edgefn.segment.com`
| `flushAt` | No       | number                   | How many signals to flush at once when sending to the signals API. Default is `5` .                                                                                                                                         |
| `flushInterval`      | No       | number | How many ms to wait before flushing signals to the API. The default is `2000`. |

## Next steps

This guide walked you through initial Signals SDK/Auto-Instrumentation setup. Next, read the [Auto-Instrumentation Signals Implementation Guide](/docs/connections/auto-instrumentation/configuration/), which dives deeper into Signals and offers example rules. 
