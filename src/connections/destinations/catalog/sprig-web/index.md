---
title: 'Sprig Actions'
hidden: false
hide-boilerplate: true
hide-dossier: true
redirect_from:
  - '/connections/destinations/catalog/actions-sprig-web'
  - '/connections/destinations/catalog/vendor-sprig'
id: 61d8c74d174a9acd0e138b31
versions:
  - name: Sprig Cloud
    link: /docs/connections/destinations/catalog/sprig-cloud
---
<!-- In the section above, edit the `title` field. For example, Slack (Actions) Destination -->

{% include content/plan-grid.md name="actions" %}

[Sprig](https://sprig.com/?&utm_source=segmentio&utm_medium=docs_actions&utm_campaign=integration) is an in-context user research platform that makes it fast and effortless for product teams to learn from their actual customers in real-time, through In-Product Surveys, Concept and Usability tests.

Sprig maintains this destination. For any issues with the destination, consult [Sprig's documentation](https://docs.sprig.com/docs/segment) or contact [support@sprig.com](mailto:support@sprig.com).


## Benefits of Sprig Actions versus Sprig Classic

Sprig Actions provides the following benefits over the Sprig Classic destination:

- **Trigger studies**. As Sprig Actions integrate into your browser-based JavaScript Segment source, they can be used to trigger Sprig studies.
- **Code-free Sprig installation**. You can intall Sprig Actions on your website, without you having to update any code. 

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting Started with Actions

1. In the Segment web app, click **Catalog**, then click **Destinations**.
2. Type Sprig in the **Filter Destinations** field.
3. Click **Sprig**, then click **Configure Sprig**.
4. Select an existing JavaScript website source to connect to Sprig and click **Next**.
5. Type in a **Destination name**, Select **Actions**, and click **Save**.
6. Type in the Environment ID and click Save Changes. You your Environment ID can be found in [Connect > JavaScript](https://app.sprig.com/connect). For for information, click [here](https://docs.sprig.com/docs/products-and-environments#environments).
7. Select **Enable Destinations** and click **Save Changes**.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}
<!-- If applicable, add information regarding the migration from a classic destination to an Actions-based version below -->

## Migration from Sprig Classic

Segment has placed the Classic destination framework in maintenance mode. Sprig encourages all customers to move to the Actions destination framework when convenient. To prevent duplicate events being generated in Sprig, ensure that this destination and a Sprig Cloud destination are not both enabled for the same Source.


