---
title: ABsmartly (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[ABsmartly](https://absmartly.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides an on-premise, full-stack experimentation platform for engineering and product teams that do continuous experimentation embedded into their development process. ABsmartly's real-time analytics help engineering and product teams ensure that new features will improve the customer experience without breaking or degrading performance and/or business metrics.

This destination is maintained by ABsmartly. For any issues with the destination, [contact ABsmartly's Support](mailto:support@absmartly.com).

## Benefits of ABsmartly (Actions) vs ABsmartly Classic

- **Easier Setup**: Actions-based destinations are easier to configure with clear default settings, letting you quickly get started.
- **Control and clearer mapping**: Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to ABsmartly.

## Getting started

1. From the Segment web app, click **Catalog**.
2. Search for "ABsmartly" in the Catalog, select **ABsmartly (Actions)**, and choose which of your sources to connect the destination to.
3. Add the following Connection Settings:
   - **Collector Endpoint**: Your ABsmartly Collector REST Endpoint. Usually `https://<your-subdomain>.absmartly.io/v1`
   - **API Key**: An existing API Key. Created under Settings > API Keys in the ABsmartly Web Console.
   - **Environment**: The environment where the events are originated matching an existing environment in ABsmartly. Created under Settings->Environments in the ABsmartly Web Console.
5. Enable the _Track Calls_ mapping to send events to ABsmartly.

{% include components/actions-fields.html %}

> info ""
> If you need support setting things up, you can contact the ABsmartly support team on Slack or [via email](mailto:support@absmartly.com).

# Sending exposures to Segment

It can be useful to send experiment exposures to Segment for visibility from 
other destinations. The Segment Spec includes the [Experiment Viewed semantic event](/docs/connections/spec/ab-testing/)
for this purpose.

> info ""
> By default, the _Track Calls_ mapping will filter and not send any events with the name `Experiment Viewed` to ABsmartly.

In the ABsmartly context, we can [install a custom event logger](https://docs.absmartly.com/docs/sdk%20documentation/getting-started/#using-a-custom-event-logger) and send exposures directly to Segment.

```javascript
analytics.ready(function() {
    // initialize ABsmartly SDK
    const sdk = new absmartly.SDK({
        endpoint: 'https://your-absmartly-endpoint.absmartly.io/v1',
        apiKey: '<YOUR-API-KEY>',
        environment: 'development',
        application: 'YOUR-APP',
        eventLogger: (context, eventName, data) => {
            if (eventName == "exposure") {
                // filter only relevant and interesting exposures
                // if the assigned flag is false, this exposure was a treatment call that did not result in an assignment
                // this can happen if, for example, the experiment is no longer running, but treatment() calls are still in the application code
                if (exposure.assigned) {
                    analytics.track("Experiment Viewed", {
                        experiment_id: exposure.id,
                        experiment_name: exposure.name,
                        variation_id: exposure.variant,
                        variation_name: "ABCDEFG"[exposure.variant],
                    });
                }
            }
        },
    });

    const context = sdk.createContext(request);
    context.attribute("user_agent", navigator.userAgent);

    context.ready().then((response) => {
        console.log("ABSmartly Context ready!");
        console.log(context.treatment("test-exp"));
    }).catch((error) => {
        console.log(error);
    });
});
```

### Publishing experiment exposures through Segment

To publish experiment exposures through Segment, you must first configure
and enable the _Exposures (Verbatim)_ mapping in your ABsmartly (Actions) destination.

By enabling the _Exposures (Verbatim)_ mapping in Segment, you replace the direct flow of exposure events from the ABsmartly SDK to the ABsmartly collector and instead send them to Segment
for processing by the destination function.

This can be achieved by instantiating the ABsmartly SDK with a custom context publisher.

The custom publisher will publish an `Experiment Viewed` Segment event with ABsmartly's exposure data in the `properties.exposure` field as well
as the normal semantic data that Segment recommends for this event.

Here is an example in Javascript.

```javascript
analytics.ready(function() {
    // initialize ABSmartly SDK
    const sdk = new absmartly.SDK({
        endpoint: 'https://your-absmartly-endpoint.absmartly.io/v1',
        apiKey: '<YOUR-API-KEY>',
        environment: 'development',
        application: 'YOUR-APP',
    });

    // ABSmartly publisher implementation that publishes ABSmartly exposures to Segment,
    // instead of directly to the ABSmartly Collector
    // these will then be pushed by the ABSmartly segment integration to the ABSmartly collector
    class SegmentContextPublisher extends absmartly.ContextPublisher {
        constructor(segment) {
            super();

            this._segment = segment;
        }

        publish(request, sdk, context) {
            // NOTE: only exposures are expected to come via this route
            // other types of events should be tracked through the Segment API
            if (request.exposures) {
                for (const exposure of request.exposures) {
                    this._segment.track(`Experiment Viewed`, {
                        experiment_id: exposure.id,
                        experiment_name: exposure.name,
                        variation_id: exposure.variant,
                        variation_name: "ABCDEFG"[exposure.variant],
                        exposure: Object.assign({},
                            {
                                exposures: [exposure],
                            },
                            // add anything else in the a/b smartly payload that are not exposures or goals
                            ...Object.entries(request)
                                .filter(e => (e[0] !== 'exposures') && (e[0] !== 'goals'))
                                .map(e => ({[e[0]]: e[1]}))
                        )
                    });
                }
            }

            return Promise.resolve();
        }
    }

    // set this as the default publisher - all contexts created from now on will use it by default
    sdk.setContextPublisher(new SegmentContextPublisher(analytics));

    const request = {
        units: {
            userId: analytics.user().id(),
            anonymousId: analytics.user().anonymousId(),
        },
    };

    window.context = sdk.createContext(request);
    context.attribute("user_agent", navigator.userAgent);

    context.ready().then((response) => {
        console.log("ABSmartly Context ready!");
        console.log(context.treatment("test-exp"));
    }).catch((error) => {
        console.log(error);
    });
});
```


## Migration from the classic A/B Smartly destination

To migrate from the classic ABsmartly destination to ABsmartly (Actions), disconnect the classic ABsmartly destination before enabling the ABsmartly (Actions) destination to avoid duplicate experimentation events.

---

