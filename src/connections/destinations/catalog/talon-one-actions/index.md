---
title: 'Talon.One (Actions) Destination'
hide-boilerplate: true
hide-dossier: false
id: 6234b137d3b6404a64f2a0f0
redirect_from:
  - '/connections/destinations/catalog/actions-talon-one'
---

<!-- In the section above, edit the `title` field. For example, Slack (Actions) Destination -->

{% include content/plan-grid.md name="actions" %}

Create flexible and targeted promotional and loyalty campaigns with [Talon.One](https://www.talon.one/){:target="_blank"}.
Campaigns can be created and managed by non-technical users like marketers. There is no need to
get your development team involved. Features include coupons, discounts, loyalty
programs, referral tracking, geofencing, and bundling.

This destination is maintained by Talon.One. For any issues with the destination, [contact the Talon.One Support team](mailto:support@talon.one) or refer to [Talon.One's documentation](https://docs.talon.one/docs/dev/technology-partners/segment){:target="_blank"}.
<!-- In the section below, add your destination name where indicated. If you have a classic version of the destination, ensure that its documentation is linked as well. If you don't have a classic version of the destination, remove the second and third sentences. -->

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Talon.One Segment destination. There's also a page about the [non-Actions Talon.One destination](/docs/connections/destinations/catalog/talonone/). Both of these destinations receive data from Segment.

## Benefits of Talon.One (Actions) vs Talon.One Classic

Talon.One (Actions) allows you to share more data than the classic destination.
The classic version only shares customer profile data. The Action version supports sharing the following data:

- Customer profile data
- Audience data
- Tracking events

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

### Creating an API key in Talon.One

Segment needs a Talon.One-generated API key to be able to send data to your Talon.One Application.  To generate an API key specific to Segment:

1. Open your Talon.One Application in the Campaign Manager and click **Settings > Developer settings**.
1. Click **Create API Key**.
1. For **Do you want to use this API Key with a 3rd party service**, select **Yes**.
1. Select **Segment** from the dropdown.
1. Select an expiry date and click **Create API Key**.
1. Copy it for later use.

### Adding a Talon.One destination

To start sending data to Talon.One from Segment, create a Talon.One
[destination](/docs/connections/destinations/) in Segment.

1. In Segment, click **Destinations** > **Add Destination**. The **Destination catalog** opens.
1. Search for **Talon.one** and configure the destination.
1. Enter the details:
   - In **Name**, type a name, for example `Talon.One destination`.
   - In **API key**, paste the API key generated in the previous section.
   - In **Deployment**, type the URI of your Talon.One deployment, for example
     `https://mycompany.europe-west1.talon.one/`.
1. (Optional) Set up your filters.
1. Configure the mapping:
   1. Click **New Mapping** and select the type of action to perform in Talon.One.
      For example _When a new audience is created in Segment, also create it in Talon.One._
   1. Configure the trigger and action fields.
1. Click **Event Tester** and test if you received the data in Talon.One.

Once you receive data, you can start creating rules that rely on that data.

> warning ""
> **Important**: You might need to create custom attributes in Talon.One to be able to map the data from Segment in Talon.One. See the [Talon.One docs](https://docs.talon.one/docs/product/account/dev-tools/managing-attributes#creating-custom-attributes){:target="_blank"}.

### Testing the integration

You can use the following payloads to test and fine-tune your requests.

```json
{
  "messageId": "segment-test-message-t1kx8e",
  "timestamp": "2022-03-22T12:41:20.918Z",
  "type": "track", // or any other type in Segment
  "userId": "test-user-z65zqk",
  "event": "track-event", // or any other event in Segment
  "email": "test@example.org",
  "projectId": "qR6APLKpCBB3ue8pHkBLpo",
  "properties": {
    "eventType": "mySegmentEvent",
    "type": "boolean",
    "customerProfileId": "a_customer_id",
    "attributes": {
      "language": "English" // depends your custom attributes in Talon.One
    }
  }
}
```

### Next steps

Once you receive data from Segment inside Talon.One, start creating your rules in the Campaign Manager. See the [Talon.One documentation](https://docs.talon.one/docs/product/rules/overview){:target="_blank"}.
<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}
<!-- If applicable, add information regarding the migration from a classic destination to an Actions-based version below -->

## Migration from the classic Talon.One destination

To prevent duplicate events being created in Talon.One, ensure that for each Segment source, this destination and the classic Talon.One destination are not both enabled at the same time.


