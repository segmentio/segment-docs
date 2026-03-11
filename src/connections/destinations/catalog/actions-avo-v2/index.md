---
title: Avo Inspector v2 Destination
id: <DESTINATION_ID>
---

{% include content/plan-grid.md name="actions" %}

[Avo](https://www.avo.app/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} lets you find, fix, and prevent data quality issues upstream. With [Avo Inspector](https://www.avo.app/data-observability?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}, you can discover all your data quality issues and systematically work towards better data, one resolved issue at a time.

This destination is maintained by Avo. For any issues with the destination, [contact the Avo Support team](mailto:support@avo.app).

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Avo Inspector v2 Segment destination. There's also a page about the [Avo Inspector v1 destination](/docs/connections/destinations/catalog/actions-avo/). Both of these destinations receive data from Segment.

## Benefits of Avo Inspector v2 (Actions) vs Avo Inspector v1

Avo Inspector v2 (Actions) provides the following benefits over the v1 destination:

- **Batch processing**. Events are processed in batches for improved performance and efficiency at scale.
- **Property value validation**. In Development and Staging environments, event property values can be validated against your Avo Tracking Plan constraints (allowed values, regex patterns, numeric ranges) using end-to-end encryption.

> info "Schema only"
> Avo Inspector only receives your event schemas (event names and property names/types). No actual event data or property values are sent to Avo.

## Supported methods

### Track events

Avo Inspector v2 supports Track events. Each Track call is translated into an event schema signature that is sent to the Inspector API.

Example Track call:

```js
analytics.track("Login", {
  userName: "John",
  city: "San Francisco",
  age: 32
});
```

This is translated into an event signature:

```js
{
  "eventName": "Login",
  "properties": [
    {"userName": "string"},
    {"city": "string"},
    {"age": "integer"}
  ]
}
```

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "Avo Inspector".
2. Select **Avo Inspector v2** and click **Add Destination**.
3. Select an existing Source to connect to Avo Inspector v2 (Actions).
4. Name your destination connection descriptively (for example, "Avo Web Prod").
5. In your [Avo workspace](https://www.avo.app){:target="_blank"}, navigate to **Inspector** > **Sources** and either create a new source or select an existing one. Avo recommends naming your Avo sources the same as your Segment sources (for example, "Web", "iOS", "Android").
6. Go to the **Inspector Setup** tab and copy the **API Key**.
7. Enter the **API Key** in the Avo Inspector v2 destination settings in Segment.
8. Select the **Environment** that matches your source (Development, Staging, or Production). Avo only generates issues for events in your Production environment, but you can see event shapes for all environments.

### App Version Property (recommended)

Having accurate app release versions in Avo Inspector allows you to see how events change across releases. This helps you identify which releases an issue impacts, and monitor for regressions after an issue has been resolved.

Set the **App Version Property Name** field to the name of a custom event property containing your app version (for example, `app_version`). If not provided, Inspector falls back to `context.app.version`.

Without app versions, Inspector has no way of differentiating between old and new releases, and might surface irrelevant issues based on old releases. Learn more about how Inspector uses releases in [Avo's documentation](https://www.avo.app/docs/inspector/inspector-issues-view#release-and-source-breakdown){:target="_blank"}.

For most mobile sources, Avo automatically fetches the app version from Segment Context. If you are unsure whether this applies to your source, you can proceed with setting up the source and add this information later.

### Property Value Validation (optional)

In Development and Staging environments, Avo Inspector v2 can validate property values against constraints defined in your Avo Tracking Plan, such as allowed values, pinned values, regex patterns, and min/max ranges. This validation does not run in Production — in Production, only event schemas are sent.

Property values are encrypted end-to-end before transmission using elliptic curve cryptography. Avo only stores encrypted values and cannot decrypt them. Only you can decrypt the values using your private key, which you can use in the [Inspector Debugger](https://www.avo.app/docs/inspector/inspector-debuggers){:target="_blank"} to inspect the actual reported values.

To set this up:

1. Enable property value validation in your Avo workspace settings.
2. Generate an elliptic curve key pair:
   ```
   node -e "const { createECDH } = require('crypto'); const ecdh = createECDH('prime256v1'); ecdh.generateKeys(); console.log('Private Key:', ecdh.getPrivateKey('hex')); console.log('Public Key:', ecdh.getPublicKey('hex', 'compressed'));"
   ```
3. Save your private key in a secure location like a password manager. Never share or expose your private key with a third party.
4. Add the **Public Encryption Key** (the compressed public key from step 2) to the Avo Inspector v2 destination settings in Segment.

For more details, see [Property Value Validation](https://www.avo.app/docs/inspector/connect-inspector-to-segment#property-value-validation-optional){:target="_blank"} in the Avo documentation.

{% include components/actions-fields.html %}

## Monitoring

After connecting, navigate to **Inspector** > **Events** in your Avo workspace to monitor incoming data. Events typically appear within 2 minutes. Make sure to select the correct environment in Inspector to see your data.

For production environments, data may take up to 2 hours to fully populate.

## Migration from Avo Inspector v1

To migrate from the Avo Inspector v1 destination to v2, add the Avo Inspector v2 destination alongside your existing v1 destination, configure it with the same API key and environment settings, verify that events appear correctly in your Avo workspace, and then disable the v1 destination.
