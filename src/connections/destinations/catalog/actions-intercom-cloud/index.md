---
title: Intercom Cloud Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 62ded0cf5753c743883ca0f3
versions:
  - name: 'Intercom Web (Actions)'
    link: '/docs/connections/destinations/catalog/actions-intercom-web'
  - name: 'Intercom (Classic)'
    link: '/docs/connections/destinations/catalog/intercom'
---

{% include content/plan-grid.md name="actions" %}

Intercom is a customer communications platform that shows you who is using your product. Intercom allows you to personally communicate with your users with targeted content, behavior-driven messages, and conversational support.

When you use the Intercom Cloud Mode (Actions) destination, Segment will send your data to [Intercom's REST API](https://developers.intercom.com/building-apps/docs/rest-apis){:target="_blank"}.

## Benefits of Intercom Cloud Mode (Actions) vs Intercom Classic
Intercom Cloud Mode (Actions) provides the following benefits over the classic Intercom destination:

- **Fewer settings.** Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data.** Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the destination.
- **Granular control over data sent.** You can customize the conditions under which the events are sent to Intercom.
- **Support for lead creation.** You can create contacts with a role of `lead`, associate them with a company, send events for them, and convert them to a `user`.


## Getting started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for **Intercom Cloud Mode (Actions)** in the Destinations Catalog, and select the destination.
3. Click **Configure Intercom Cloud Mode (Actions)**.
4. Select the source that will send data to Intercom Cloud Mode (Actions) and follow the steps to name your destination.
5. On the **Settings** tab, authenticate with Intercom using OAuth. If you have multiple Intercom workspaces, choose one workspace that you'll connect to Segment.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings).
7. Enable the destination and configured mappings.

{% include components/actions-fields.html %}

## FAQ & Troubleshooting

### Why is a company I created missing from my Intercom dashboard?
If a company is created without an attached user, the company does not appear on Intercom's dashboard. This is expected. Once a user is attached to the company, it should appear in the list of companies.

### Why isn’t a user getting attached to a company?
When you use the Identify Company action, Segment creates or updates a company's information. In the same action, Segment also attaches the user in your group call to that company. If the user doesn't exist in Intercom when the action runs, Segment creates or updates the company but can't attach the user. Ensure the user is created in Intercom first.
