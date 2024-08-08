---
title: Avo Destination
id: 65c2465d0d7d550aa8e7e5c6
---

**Avo lets you find, fix, and prevent data quality issues upstream.** World class data and product teams at companies like Fender, IKEA, and Wolt use Avo to guarantee event data quality upstream, so they can focus on building great user experiences. With Avo you get reliable data with less effort, by moving from reactive damage control to proactive data management and addressing your data quality issues at the source, where the data is created.

With [Avo](https://avo.app){:target="\_blank”} Inspector, data quality is no longer a dream, it’s a workflow.
[Inspector](https://www.avo.app/data-observability){:target="\_blank”} lets you find, triage, fix, and prevent data quality issues in your event based data. Launch Inspector to discover all your data quality issues and systematically work towards better data, one resolved issue at a time.

The Avo Inspector destination automatically extracts event schemas from your product events, sending only the signatures from the connected Segment sources to the Inspector API. **Avo Inspector receives no PII data from your source**.

{% include content/plan-grid.md name="actions" %}

## Supported methods

### Track events

The Avo destination supports Track events.

Example of Track call:

```js
analytics.track("Login", {
  userName: "John",
  city: "San Fransisco"
  age: 32
});
```

This Track call is translated into an event signature that is sent to Avo's Inspector API.

```js
{
  "eventName": "Login",
  "properties": [
    {"userName": "string"},
    {"city": "string"}
    {"age": "integer"}
  ]
}
```

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Select [Avo](https://app.segment.com/goto-my-workspace/destinations/catalog/actions-avo){:target="\_blank”} from the list of destinations, then click **Add destination**.
4. Select a source to connect to Avo (Actions) and click **Next**.
5. Enter a name for your Avo (Actions) destination and click **Create destination**.

## Configure Avo

### Get the Avo API key

Before connecting the Segment source to Avo, you will need an API key for your source.

1. Create your Avo workspace at avo.app (If you don’t have one already).
2. From the Avo workspace sidebar, select **Sources**.
3. Select an existing source or create a new one. (Avo recommends naming your Avo sources the same as your Segment sources, for example "Web", "iOS", "Android")
   ![Select a source](images/select-source.png)
4. Click the **Inspector Setup** tab in the Avo source
5. Copy the API Key
   ![Copy API key](images/api-key.png)

### Configure Destination

#### Avo Inspector API key

You can copy the API key from your source in Avo. The API key allows Avo to map the events from your Segment source to the Avo source, to accurately compare your source’s event schemas to your Tracking Plan in Avo.

#### Environment

Environment describes which app environment the source is sent from, `Development | Staging | Production`.
Avo only generates issues for events in your `Production` environment, but you can see the event shapes for staging and development environments to make sure they are implemented correctly.

#### App Version Property

App Version Property is an optional **(but recommended)** field. Having accurate app release versions in Avo Inspector allows you to see how events change across releases. This helps you identify which releases an issue is impacting, and monitor for regressions in future releases after an issue has been resolved.

Without app versions, the inspector has no way of differentiating between old and new releases, and might surface irrelevant issues based on old releases. Learn more about how Inspector uses releases in [Avo's documentation](https://www.avo.app/docs/inspector/inspector-issues-view#release-and-source-breakdown){:target="\_blank”}.

For most mobile sources, Avo automatically fetches the app version from Segment Context. If you have an event property describing the app release version of your source (for example, “app_version”) you can provide it under App Version.

If you are unsure of whether this applies to your source, or if you don’t know which event property to use, you can proceed with setting up the source and add this information later.

![Select a source](images/avo-destination.png)

{% include components/actions-fields.html %}
