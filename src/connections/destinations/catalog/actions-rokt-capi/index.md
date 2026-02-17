---
title: Rokt Conversions API (Actions) Destination
hide-boilerplate: true
hide-dossier: false
---

{% include content/plan-grid.md name="actions" %}

[Rokt](https://www.rokt.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is the world's leading ecommerce technology, using machine learning and AI to make transactions more relevant. The Rokt Conversions API (CAPI) destination is a server-to-server integration that allows advertisers to send web, app, and offline conversion events from Segment directly to Rokt. This enables better attribution, audience targeting, and campaign optimization.

This destination is maintained by Rokt. For any issues with the destination, contact [Rokt Support](mailto:support@rokt.com).

## Benefits of Rokt Conversions API (Actions)

The Rokt Conversions API destination provides the following benefits:

- **Clear mapping of data**: Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to Rokt.
- **Privacy-focused**: Support compliance with privacy requirements through automatic SHA-256 PII hashing with flexible controls over what data is hashed.
- **Maximum event measurement**: Capture more events with improved accuracy across different browsers, apps, and devices to get a unified view of your customer journey.
- **Audience sync support**: Seamlessly sync Segment Engage audiences to Rokt for advanced targeting and suppression.
- **Browser plugin integration**: Automatically capture Rokt transaction IDs (RTID) from web sources when combined with the Rokt Browser Plugin.
- **Flexible batching**: Send events individually or in batches with configurable batch sizes for optimal performance.

## Getting started

### Prerequisites

Before connecting to the Rokt Conversions API destination, you must have an account with Rokt and receive your API credentials. Contact your Rokt representative to obtain:
- **API Key**: Your Rokt CAPI API Key
- **API Secret**: Your Rokt CAPI API Secret

### Add the destination

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"}, search for "Rokt Conversions API".
2. Select **Rokt Conversions API (Actions)** and click **Add Destination**.
3. Select an existing Source to connect to Rokt Conversions API (Actions).
4. Enter your **API Key** provided by your Rokt representative.
5. Enter your **API Secret** provided by your Rokt representative.
6. Click **Save Changes**.
7. On the **Mappings** tab, review and customize the default mappings for your use case.
8. Enable the destination by toggling the **Enabled** switch on the **Settings** tab.

{% include components/actions-fields.html %}

## Browser plugin integration

When connecting a JavaScript source (website) to the Rokt Conversions API destination, Segment automatically includes the Rokt Browser Plugin. This plugin:

- Extracts the Rokt transaction ID (RTID) from URL query parameters when visitors arrive on your site
- Stores the RTID in browser storage for use across the session
- Automatically includes the RTID with all events sent to the Rokt Conversions API

This seamless integration ensures proper attribution when users interact with Rokt placements and complete conversions on your site.

## Syncing Engage audiences

The Rokt Conversions API destination supports syncing Segment Engage audiences to Rokt for advanced targeting and suppression use cases.

### Using Engage Audience Sync

1. Connect an Engage Space as your source when setting up the destination.
2. The **Sync Engage Audience** preset mapping is automatically configured to handle audience membership events.
3. Navigate to **Engage > Audiences** and select the audience you want to sync.
4. Click **Add Destinations** and select your Rokt Conversions API destination.
5. Toggle on **Send Track** and **Send Identify** options.
6. Click **Save**.

Users will be added to or removed from Rokt audiences based on their Engage audience membership.

### Using regular analytics events

You can also manage audience membership using standard analytics events from any Segment source:

1. Send `track` or `identify` events with the following properties:
   - `audience_name`: The name of the audience
   - `audience_membership`: Boolean indicating whether to add (`true`) or remove (`false`) the user

2. The destination will automatically process these events and update audience membership in Rokt.

## PII hashing

The Rokt Conversions API destination supports automatic SHA-256 hashing of personally identifiable information (PII) before sending data to Rokt. You can configure hashing for the following fields:

- Email address
- First name
- Last name
- Mobile number
- Billing zip code

By default, hashing is disabled for all fields. To enable hashing:

1. Navigate to the **Mappings** tab in your destination settings.
2. Select the mapping you want to configure.
3. Expand the **Hashing Configuration** section.
4. Toggle on hashing for the fields you want to hash.
5. Click **Save**.

> warning ""
> If you hash identifiers upstream before sending to Segment, the destination will hash them again, resulting in a double hash that cannot be matched. Ensure your fields are not hashed prior to sending through the Rokt Conversions API destination.

## Batching

The Rokt Conversions API destination supports batching to optimize performance when sending high volumes of events.

By default:
- Batching is **enabled**
- Batch size is set to **100 events** (maximum)

To configure batching:

1. Navigate to the **Mappings** tab in your destination settings.
2. Select the **Send** mapping.
3. Adjust the **Batch Size** (1-100 events) or disable **Enable Batching** if needed.
4. Click **Save**.

Batching is particularly useful when syncing large audiences or processing high-volume conversion events.

## Required user identifiers

To successfully send events to Rokt, you must include at least one of the following user identifiers:

- Email address
- Customer ID (User ID)
- Mobile advertising ID (IDFA for iOS, AAID for Android)
- IP address and User Agent

When possible, include multiple identifiers to improve matching and attribution accuracy.

## FAQ and Troubleshooting

### Authentication errors

If you receive authentication errors (401 Unauthorized), verify that:
- Your API Key and API Secret are correct
- Your credentials have not expired
- You have the necessary permissions

Contact your Rokt representative if authentication issues persist.

### Events not appearing in Rokt

If events are not appearing in your Rokt dashboard:
- Verify that at least one required user identifier is included in your events
- Check that your destination is enabled in the Settings tab
- Review your mapping configuration to ensure events are properly mapped
- Allow up to 1 hour for events to appear in Rokt reporting

### RTID not being captured

If the Rokt transaction ID (RTID) is not being captured from your website:
- Verify that you're using a JavaScript source (the browser plugin only works with web sources)
- Check that the RTID is present in the URL query string when users arrive on your site
- Verify that cookies and local storage are enabled in the user's browser

### Audience sync delays

When syncing large Engage audiences (millions of users), allow 12-24 hours for the initial sync to complete. Subsequent updates occur in near real-time.

## Support

For questions or issues with the Rokt Conversions API destination:
- **Segment-related issues**: Contact [Segment Support](https://segment.com/help/){:target="_blank"}
- **Rokt platform and campaign questions**: Contact your Rokt representative or [Rokt Support](mailto:support@rokt.com)
