---
title: ABsmartly (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[ABsmartly](https://absmartly.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides an on-premise, full-stack experimentation platform for engineering and product teams that do continuous experimentation embedded into their development process. A/B Smartly's real-time analytics helps engineering and product teams ensure that new features will improve the customer experience without breaking or degrading performance and/or business metrics.

This destination is maintained by ABsmartly. For any issues with the destination, [contact ABsmartly's Support](mailto:support@absmartly.com).

## Benefits of ABsmartly (Actions) vs A/B Smartly Classic

- **Easier Setup**. Actions-based destinations are easier to configure with clear default settings enabling you to get started quickly.
- **Control and clearer mapping**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the ABsmartly.

## Getting started

1. From the Segment web app, click **Catalog**.
2. Search for "ABsmartly" in the Catalog, select **ABsmartly (Actions)**, and choose which of your sources to connect the destination to.
3. Add the following Connection Settings:
   - **Collector Endpoint**: Your ABsmartly Collector REST Endpoint. Usually `https://<your-subdomain>.absmartly.io/v1`
   - **API Key**: An existing API Key. Created under Settings->API Keys in the ABsmartly Web Console.
   - **Environment**: The environment where the events are originated matching an existing environment in ABsmartly. Created under Settings->Environments in the ABsmartly Web Console. 

{% include components/actions-fields.html %}

> info ""
> If you need support setting things up, you can contact the ABsmartly support team on Slack or via email at [ABsmartly's Support](mailto:support@absmartly.com).

# Sending exposures to Segment

It can be useful to send experiment exposures to Segment for visibility from 
other destinations. The Segment spec includes the [Experiment Viewed semantic event](https://segment.com/docs/connections/spec/ab-testing/)
for this purpose.

> info ""
> By default, the _Track Calls_ action will filter and not send to ABsmartly events with name `Experiment Viewed`.

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

## Migration from the classic A/B Smartly destination

To migrate from the classic A/B Smartly destination to ABsmartly (Actions) be sure to disconnect the classic A/B Smartly destination before enabling the ABsmartly (Actions) destination to avoid duplicate experimentation events in ABsmartly.

---

