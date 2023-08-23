---
title: Salesforce Marketing Cloud (Actions) Destination
hide-boilerplate: true
hide-dossier: false
strat: salesforce
id: 62e30bad99f1bfb98ee8ce08
versions:
  - name: "Salesforce Marketing Cloud (Classic)"
    link: '/docs/connections/destinations/catalog/salesforce-marketing-cloud/'
---

{% include content/plan-grid.md name="actions" %}

Salesforce Marketing Cloud (SFMC) provides digital marketing automation and analytics software and services. Marketers can use this software to create sophisticated multi-channel campaigns using the [SFMC Journey Builder](https://help.salesforce.com/s/articleView?id=sf.mc_jb_journey_builder.htm&type=5){:target="_blank"}. 

Segment’s Salesforce Marketing Cloud (Actions) destination allows you to create contacts, store contact and event data in data extensions, and send API events to SFMC. Segment sends data to the [SFMC REST API](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/rest-api-overview.html){:target="_blank"}. 

## Benefits of Salesforce Marketing Cloud (Actions) Destination vs Salesforce Marketing Cloud Destination Classic

The Salesforce Marketing Cloud (Actions) destination provides the following benefits over the classic Salesforce Marketing Cloud destination:
- **Fewer settings**. Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to SFMC.
- **Batch support**. Reduce SFMC overages and rate-limit errors by batching your Segment data to data extensions.
- **Flexible primary keys**. Customize the primary keys used to send data to an SFMC data extension and choose any custom property or trait to map to the primary key.
- **API upgrade**. Data is sent to the SFMC REST API, which Salesforce recommends over the SFMC SOAP API.

## Getting started

### Grant Segment API access to Salesforce Marketing Cloud

1. Log in to your Salesforce Marketing Cloud account and go to the **Setup** settings.
2. Under **Platform Tools**, expand Apps and select **Installed Packages**.
3. Click **New** to create a new package. For clarity, Segment recommends using a name like "Segment".
4. Click **Add Component** and select **API Integration**.
5. Select the **Server-to-Server** Integration Type.
6. Enable the following permissions. If you don't add these permissions, you'll see an [Insufficient Privileges](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/error-handling.html#authorization){:target="_blank"} error from SFMC.
    - **Email**: `Read`, `Write`
    - **Web:** `Read`, `Write`
    - **Automations:**  `Read`, `Write`, `Execute`
    - **Journeys:** `Read`
    - **List And Subscribers**: `Read`, `Write`
    - **Data Extensions**: `Read`, `Write`
    - **Tracking Events:** `Read`
    - **Webhooks:** `Read`, `Write`
7. Click **Save**.

Once you save the API integration and add permissions, you will see a Summary page with a Components section. This section will be used to obtain your Client ID, Client Secret, and Subdomain.

### Connect the Salesforce Marketing Cloud (Actions) destination

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for **Salesforce Marketing Cloud (Actions)** in the Destinations Catalog, and select the destination.
3. Click **Configure Salesforce Marketing Cloud (Actions)** in the top-right corner of the screen.
4. Select the source that will send data to SFMC and follow the steps to name your destination.
5. On the **Settings** tab, input your SFMC Account ID (MID). In the Installed Package you created above, locate your Subdomain, Client ID, and Client Secret and input these settings. Your Subdomain can be found under "REST Base URI." Your Subdomain should be a 28-character string starting with the letters `mc`. Do not include the `.rest.marketingcloudapis.com` part of the URL.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).
7. Enable the destination and configured mappings.

{% include components/actions-fields.html settings="true"%}

>info ""
>Under the hood both of the actions **send contact to data extension** and **send event to data extension** do the same thing, but **send contact to data extension** is set up to handle a pre defined structure of contacts being filled into a data extension, for any customization the **send event to data extension action** can be used.
>For example, **contactKey** is the fixed Primary Key that will be available on **send contact to data extension** action and the same has to be created as a Primary Key in SFMC too. But the Primary Key can be set as per our requirement in the **send event to data extension** action.

## FAQ & Troubleshooting

### Batching Data to SFMC

If your organization sends a very high volume of data or has Engage audiences with many people in them, Segment allows you to send data to SFMC data extensions in batches. This can help you reduce your SFMC API quota, reduce the number of rate-limit errors you see, and help speed up transfers of large volumes of data. 

The batch feature is only compatible with the "Send Contact to Data Extension" and "Send Event to Data Extension" actions. To send data in batches, toggle the "Batch data to SFMC" mapping on.

> info ""
> Data **cannot** be delivered in batches for "Create Contact" or "Send API Event" actions.

### Data Extensions & API Events

To use the SFMC Journey Builder to send marketing campaigns to your users, you need to have data about those users in SFMC. The most common way to send data to SFMC is to send Segment data to an SFMC data extension. Data extensions are tables that contain your data. When you send a contact or event to a data extension, it appear will appear as a "row" in your data extension. Any metadata about the particular contact or event are considered attributes and will appear as a "column" in your data extension. 

Data extensions and attributes must be created **before** sending data. You can create a data extension in your SFMC account by navigating to **Audience Builder > Contact Builder > Data Extensions > Create**. Segment recommends creating a single data extension to store all contact data, and individual data extensions for each event type you plan to send. Once a data extension is created, you can add attributes for any traits or properties you plan to send. You must include at least one Primary Key attribute that will be used to uniquely identify each row.

> info ""
> You can include more than one Data Extension Primary Key if needed. For example, you might use more than one primary key if you want to track which store locations a user visited, but you don't care how many times the users visited each location. In this case, you could use `Contact Key` and `Store Location` as Primary Keys. Then, SFMC only deduplicates if *both* Contact Key (the user) and Store Location are the same. This means you would record the stores individual users visited, but not how many times they visited each one.

API events are another way to send your Segment events to SFMC. API events can trigger an email or push notification campaign immediately when they receive data from Segment. You can create an API event in your SFMC account by navigating to **Journey Builder > Events > + New Event > API Event**.

### Sending Engage Audiences & Computed Traits to SFMC

To send an Engage audience to SFMC:
1. Create an attribute in the SFMC data extension that stores your contact data. The attribute should be a boolean data type to store whether or not a user entered the audience. You can name this attribute anything.
2. Set up the Salesforce Marketing Cloud (Actions) destination using the instructions [above](#connect-the-salesforce-marketing-cloud-actions-destination) and connect it to your Engage source.
3. Create a "Send Contact to Data Extension" action in order to map the SFMC attribute to the Engage audience key. The Engage audience key can be found in **Engage > Audiences > Select your audience > Settings > Audience key**. In the Contact Fields mapping, input the name of the attribute you created in SFMC on the left-hand side. On the right-hand side, search for an event variable of `traits.[your-audience-key]` and select "No matches found. Use "traits.[your-audience-key]" as an event variable".
4. Navigate back to your Engage audience and connect the Salesforce Marketing Cloud (Actions) destination to the audience. Keep "Send Identify" toggled on and save.

When you add an Engage audience to SFMC, the first sync contains all the users in that audience. Users are added as rows in your data extension with the attribute you created set to `true` to indicate audience membership. If a user leaves that audience, the attribute value is automatically updated to `false`, but the user is not removed from the data extension. This allows you to see all users who have ever been in the audience, and then optionally create a [filtered data extension](https://help.salesforce.com/s/articleView?id=sf.mc_es_create_filtered_de.htm&type=5){:target="_blank"} if you want a subset of users.

To send an Engage computed trait to SFMC:
1. Create an attribute in the SFMC data extension that stores your contact data. Choose the data type matching the type of computed trait you plan to send; for example, text for traits which produce string values, number or decimal for traits which produce numeric values. You can name this attribute anything.
2. Set up the Salesforce Marketing Cloud (Actions) destination using the instructions [above](#connect-the-salesforce-marketing-cloud-actions-destination) and connect it to your Engage source.
3. Create a "Send Contact to Data Extension" action in order to map the SFMC attribute to the Engage trait key. The Engage trait key can be found in **Engage > Audiences > Computed Traits > Choose your computed trait > Settings > Trait key**. In the Contact Fields mapping, input the name of the attribute you created in SFMC on the left-hand side. On the right-hand side, search for an event variable of `traits.[your-trait-key]` and select "No matches found. Use "traits.[your-trait-key]" as an event variable".
4. Navigate back to your Engage computed trait and connect the Salesforce Marketing Cloud (Actions) destination to the computed trait. Keep "Send Identify" toggled on and save.
