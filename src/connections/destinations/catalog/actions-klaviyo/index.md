---
title: Klaviyo (Actions) Destination
hide-boilerplate: true
hide-dossier: true
hidden: true
id: 650bdf1a62fb34ef0a8058e1
beta: true
---


{% include content/plan-grid.md name="actions" %}

[Klaviyo](https://www.klaviyo.com){:target="_blank"} is a powerful email platform focused on ecommerce that helps companies make more money. It supports segmentation based on category and event triggers like product bought, page viewed, email engagement, or amount spent.

It measures opens, clicks, revenue generated, breakdown of generated revenue based on custom attributes (like campaign type or amount gained per recipient), and provides trend reports, cohort analysis, and subscriber growth

Klaviyo lets you send personalized newsletters, automates triggered emails, product recommendations, welcome campaigns, order announcements, push notifications and sync your data to Facebook custom audiences.

## Benefits of Klaviyo (Actions)

Klaviyo (Actions) provides the following benefits:

- **Simple setup** - Klaviyo (Actions) has a streamlined default setup process making it easier to get started in a way that "just works".
- **More control** - Actions-based destinations enable you to define the mapping between the data Segment receives from your sources, and the data Segment sends to Klaviyo.
- **Default property mappings** - Default mappings from the Segment like event, timestamp, and more, allow data to be mapped correctly without any setup required.


## Getting started

1. From the Segment web app, click **Catalog**.
2. Search for "Klaviyo (Actions)" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Navigate to [Account > Settings > API Keys](https://www.klaviyo.com/account#api-keys-tab){:target="_blank"} in Klaviyo's UI and copy your API Key into the Segment Settings UI.
> info ""
> Klaviyo requires the Private API Key to use the List API. You can find this by going to Klaviyo's UI and clicking [Account > Settings > API Keys > Create API Key](https://www.klaviyo.com/account#api-keys-tab){:target="_blank"}  to generate a Private API Key and copy it into the Segment Settings UI.


{% include components/actions-fields.html %}

## Using Klaviyo with RETL 

Klaviyo (Actions) Destination can accept [RETL](https://segment.com/docs/connections/reverse-etl/) data. You can send the models you created in your dataware house source. Follow the steps [here](https://segment.com/docs/connections/reverse-etl/#step-1-add-a-source) to create your datawarehouse source and set up models. 


| Action          | Added           | Updated        | Deleted         |
| --------------  | --------------- | -------------- | --------------- | 
| Order Completed | &#x2611;        | &#x2612;       | &#x2612;        |
| Track Event     | &#x2611;        | &#x2612;       | &#x2612;        |
| Upsert Profile  | &#x2611;        | &#x2611;       | &#x2612;        |

In order to add users to a list, please use the **Upsert Profile** Action and fill out the **List** field with the Klaviyo list to add the profile to.

Follow the following steps to create a list in Klaviyo: 

1. Navigate to Audience > Lists & Segments.
2. Click Create List/Segment in the upper right corner.
3. Choose List.
4. Give your list a name and add any applicable tags.
5. Click Create List.


## Using Klaviyo with Engage

Klaviyo (Actions) Destination can accept your [Engage](https://segment.com/docs/engage/) data. You **do not** need to create a list in Klaviyo, during the first sync Segment will create a list with the same name as your audience. 

1. Create and configure your Engage Audience.
2. Navigate to **Engage > Engage Settings > Destinations** and click **Add Destination**.
3. Select **Klaviyo (Actions) Audiences**, select your Audience Space as the source, and name your destination.
4. On the **Mappings** tab, click **Add Mapping** and select **Add Profile To List**. 
6. Scroll down and click **Save** and make sure the mapping is enabled. 
7. On the **Mappings** tab, click **Add Mapping** and select **Remove Profile from list**. 
9. Scroll down and click **Save** and make sure the mapping is enabled. 
5. Enable the destination. 
6. On the **Engage > Audiences > (your audience)** page, click **Add Destination** and select the destination just created.
7. In the settings that appear in the side panel, toggle the Send Track option on and do not change the Audience Entered/Audience Exited event names. Click Save Settings

