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
2. From your Segment workspace, go to **Connections > Catalog** and click **Destinations**.
3. Search for **Listrak** in the Destinations Catalog and select the destination.
4. Click **Add destination**.
5. Select an existing Source to connect to Listrak.
6. On the **Setup** tab, name your destination. For example, `Listrak`.
7. Enter your Listrak API client ID and client secret.
8. Click **Save Changes**.
9. Follow the steps in the Destinations Actions documentation to [customize mappings](/docs/connections/destinations/actions/#customize-mappings) or follow the steps below to Sync an Engage Audience.
10. Enable the destination and configured mappings.

### Sync an Engage Audience

1. Each Engage audience to be synced to Listrak must only include email addresses subscribed to the list. To do this, add a condition to the Engage audience that ensures the custom trait for the list exists (eg. have a Custom Trait listrak_list_12345 exists, where 12345 is the list ID).
2. In Listrak, go to **Contacts > Profile Fields** and click **Create Field Group**. 
3. Enter `Engage Audiences` for the name and Click **Save**.
4. Enter a name for the audience for the **Field Name**.
5. Select **Check Box** for the **Data Type**.
6. Click the **Update** button.
7. Go to **Help & Support > API ID Information** and note the list ID and profile field ID.
8. In Segment, open the previously created Listrak destination.
9. In the **Mappings** tab, click **New Mapping** and select **Update Email Contact Profile Fields**.
10. Under **Select events to map and send**, select **Track** for the **Event Type**.  
11. Click **Add Condition** and create a condition **Event Name** is `Audience Entered`.
12. Under **Select mappings**, enter the list ID, map the email address, enter the profile field ID for the key and `on` for the value
13. Repeat steps 9 through 12 using `Audience Exited` for the **Event Name** and `off` for the profile field value
14. **Enable** both mappings.
15. Go to the **Settings** tab and **Enable** the destination.
16. Select the Engage space and navigate to **Engage > Audiences**. Select the source audience to send to the Listrak destination.
17. Click **Add Destination** and select the Listrak Audience destination. 
18. In the settings that appear on the right-hand side, toggle the **Send Track** option on and disable **Send Identify**.
19. Click **Save**.
20. To filter email sends in Listrak using the new audience profile field, see this [help article](https://help.listrak.com/en/articles/3951597-introduction-to-building-filter-2-0-segments)
21. If you want to sync another audience, repeat steps 1 through 20.

{% include components/actions-fields.html %}

---