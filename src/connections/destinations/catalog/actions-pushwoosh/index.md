title: Pushwoosh (Actions) Destination
id: 64e72af1eabf77368b877a51
private: true
beta: true
---

{% include content/plan-grid.md name="actions" %}

[Pushwoosh](https://pushwoosh.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a customer engagement platform that lets you create personalized messaging campaigns combining multiple channels, like push notifications, in-app messages, emails, and SMS.

Pushwoosh maintains this destination. For any issues with the destination, [contact the Pushwoosh support team](mailto:help@pushwoosh.com){:target="_blank"}.

{% include content/ajs-upgrade.md %}

## Getting started

### Pushwoosh SDK integration

- If you configured Segment to receive push tokens, you don't need to integrate the Pushwoosh SDK into your app.
- If your Segment implementation doesn't receive push tokens, integrate the Pushwoosh SDK into your app before setting up the Pushwoosh integration.

### Segment configuration

1. From the Segment web app, navigate to **Connections > Destinations**, and click **Add Destination**.
2. Search for **Pushwoosh** and select it as the destination.
3. Choose the sources you want to connect the Pushwoosh destination to.
4. Open the destination settings. 
5. Enter your [**Pushwoosh API key**](https://docs.pushwoosh.com/platform-docs/api-reference/api-access-token/){:target="_blank"} and **application code**, which you can find below the project name in Pushwoosh. Verify that the **Enable Destination** switch is toggled on, then click **Save Changes**.
6. Go to the **Mappings** tab and verify that the **Create or Update User Profile** and **Track Events options** are enabled.

Once you've configured the integration, Pushwoosh will receive events and user attributes from Segment.

{% include components/actions-fields.html %}
