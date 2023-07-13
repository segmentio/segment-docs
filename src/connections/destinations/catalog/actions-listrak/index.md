---
title: Listrak Destination
id: <integration_id>
---

{% include content/plan-grid.md name="actions" %}

> info ""
> The Listrak Destination is in beta, and Listrak is still developing the destination. To join Listrak's beta program or to give any feedback to help improve the Listrak Destination and its documentation, [let Listrak know](mailto:support@listrak.com).

[Listrak](https://www.listrak.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is the retail industry’s leading customer engagement platform. Listrak delivers results for more than 1,000 retailers by providing best-in-class email, text message marketing, identity resolution marketing and push notifications through seamless cross-channel orchestration. Listrak’s data-first approach delivers 1:1 personalization at scale so you can send messages at precisely the right time across the right combination of channels and devices to maximize customer engagement, revenue, and lifetime value.

This destination is maintained by Listrak. For any issues with the destination, [contact their Support team](mailto:support@listrak.com).

## Getting started

1. Before connecting to the Listrak Destination, set up the [Listrak Source](/docs/connections/sources/catalog/cloud-apps/listrak/). Note the API client ID and client secret after creating the integration in Listrak.
1. From your Segment workspace, go to **Connections > Catalog** and click **Destinations**.
1. Search for **Listrak** in the Destinations Catalog and select the destination.
1. Click **Add destination**.
1. Select an existing Source to connect to Listrak.
1. On the **Setup** tab, name your destination. For example, `Listrak`.
1. Enter your Listrak API client ID and client secret.
1. Click **Save Changes**.
1. Follow the steps in the Destinations Actions documentation on [Customize mappings](/docs/connections/destinations/actions/#customize-mappings).
1. Enable the destination and configured mappings.

### Sync an Engage Audience

1. Each Engage audience to be synced to Listrak must only include email addresses subscribed to the list. To do this, add a condition to the Engage audience that ensures the custom trait for the list exists (eg. have a Custom Trait listrak_list_12345 exists, where 12345 is the list ID).
1. In Listrak, go to **Contacts > Profile Fields** and click **Create Field Group**. 
1. Enter `Engage Audiences` for the name and Click **Save**.
1. Enter a name for the audience for the **Field Name**.
1. Select **Check Box** for the **Data Type**.
1. Click the **Update** button.
1. Go to **Help & Support > API ID Information** and note the list ID and field ID.
1. In Segment, open the previously created Listrak destination.

1. In the **Mappings** tab, click **New Mapping** and select **Update Email Contact Profile Fields**.

1. Under **Select events to map and send**, select **Track** for the **Event Type**.  

1. Click **Add Condition** and create a condition **Event Name** is **Audience Entered**.

1. Under **Select mappings**, enter the list ID, map the email address, 

1. Repeat steps 2 through 4 for **Event Name** is **Audience Exited**.

8. **Enable** both mappings.

9. Go to the **Settings** tab and **Enable** the destination.

10. Select your space, and navigate to **Engage > Audiences**. Select the source audience that you want to send to your Criteo Audiences destination.

11. Click **Add Destinations** and select the Criteo Audience destination you created. In the settings that appear on the right-hand side, toggle the **Send Track** option on and disable **Send Identify**. Click **Save**. 

Your Criteo destination is now ready to receive audiences, and your Persona audiences now reflect in your Criteo Advertiser dashboard. Be aware, it takes 12-24 hours for the number of identifiers to populate in Criteo's Management Center.

> warning ""
> You can connect **ONE** Engage audience to a single instance of Criteo Audience destination. If you have multiple audiences, repeat the above process to create a new Criteo audience destination and connect the audience to new destination each time.

{% include components/actions-fields.html %}

---