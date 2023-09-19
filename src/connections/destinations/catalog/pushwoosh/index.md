title: Pushwoosh (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[Pushwoosh](https://pushwoosh.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a customer engagement platform that allows you to create personalized messaging campaigns combining multiple channels: push notifications, in-app messages, emails, and SMS.

This destination is maintained by Pushwoosh. For any issues with the destination, [contact Support team](mailto:help@pushwoosh.com).

{% include content/ajs-upgrade.md %}

## Getting started

##### Pushwoosh SDK integration
- If you configured sending push tokens from your app to Segment, you don't need to integrate the Pushwoosh SDK into your app.
- If Segment does not receive push tokens, integrate the Pushwoosh SDK into your app before setting up integration with Pushwoosh.

##### Segment configuraion
1. In the Segment web interface, navigate to **Connections → Destinations** and click **Add Destination**.
2. Search for **Pushwoosh** and select it as the destination.
3. Choose the sources you want to connect the Pushwoosh destination to.
4. Open the destination settings. 
5. Enter the [**Pushwoosh API key**](https://docs.pushwoosh.com/platform-docs/api-reference/api-access-token/) and **application code** (it can be found below the project name in Pushwoosh). Ensure the **Enable Destination** switch is on and click **Save Changes**.
6. Go to the **Mappings** tab and ensure the **Create or Update User Profile** and **Track Events options** are enabled.

If the integration is configured correctly, Pushwoosh will start receiving Events and user attributes from Segment.

{% include components/actions-fields.html %}
