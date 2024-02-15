---
title: Create a Segment for Flex Workspace
hidden: true
---
Unified Profiles users without an existing Segment workspace can create a Segment for Flex workspace, which provides limited access to Segment. 

For entitlements and limitations associated with a Segment for Flex workspace, see the [Entitlements and limitations](#segment-for-flex-entitlements-and-limitations) documentation. 

## Prerequisites

Before creating a Segment for Flex workspace, you must have requested access from the [CustomerAI for Contact Center](https://console.twilio.com/us1/develop/flex/customerai/overview){:target="_blank"} page in your Flex Console and been accepted into the Agent Copilot beta program.

## Step 1: Select your data sources

> warning "Unable to change data source selection after this step"
> After you've selected your data source and proceeded to the next step, you can't return to this page and make a different selection. You can add additional data sources after setting up your Segment for Flex workspace. For more information about sources in a Segment for Flex workspace, see the [Sources](#sources) documentation.

1. From your Flex account, select **Unify**. 
2. On the Flex Unify overview screen, click **Create Unify space in Segment**.
3. In Segment for Flex, select a data source to get started and click **Next**.
4. Review the popup that explains how the data source that connects to Segment, and click **Continue**.

## Step 2: Add connections

After you've selected where your customer data is stored, you must set up the connections between your data sources and Segment. 

You can set up one of the following options: 
- [Salesforce and a data warehouse](#salesforce-and-a-data-warehouse)
- [A data warehouse only](#data-warehouse-only)
- [A website or mobile app source](#website-or-mobile-app)

You can add additional data sources after completing the setup process. <br><br>

### Salesforce and a data warehouse

1. On the Getting started with Segment page, click **Connect Salesforce**. 
2. You are redirected to the Salesforce login screen. Sign in to Salesforce with a user that has XYZ permissions. 
3. On the Getting started with Segment page, click **Connect data warehouse**. 
4. Select your data warehouse from the list of available warehouses, and click **Next**.
5. Give your destination a name and enter the account credentials for a user that has read and write permissions. Click **Save**. 
6. After you've given your destination a name and entered your credentials, click **Next**.
7. On the Getting started with Segment page, click **Define Model**.
8. Create a SQL query that defines your model. After you've created a model, Segment uses your model to map data to your Reverse ETL destinations. <br> Segment recommends a model with the following format: 

``` sql
SELECT * FROM salesforce_unified_profiles.accounts
```

<ol style="counter-reset: none;">
  <li value="9" markdown=1>
  Click **Preview** to return 10 records from your warehouse. When you've verified that your records return as expected, click **Next**.
  </li>
  <li value="10" markdown=1>
  Click **Create Mapping**. On the Select mappings screen, map event fields from your data source to the pre-filled values that Segment expects to receive. Clicking into an event field lets you search your destination's record fields. When you've finished mapping all of the event fields, click **Create mapping.**
  </li>
  <li value="11" markdown=1>
  After Segment marks the "Add connections" tile as complete, click **Add identifiers and traits** and begin [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits). 
  </li>
</ol>


### Data warehouse only

1. On the Getting started with Segment page, click **Connect data warehouse**. 
2. Select your data warehouse from the list of available warehouses, and click **Next**.
3. Give your destination a name and enter the account credentials for a user that has read and write permissions. Click **Save**. 
4. After you've given your destination a name and entered your credentials, click **Next**.
5. On the *Getting started with Segment* page, click **Define Model**.
6. Create a SQL query that defines your model. After you've created a model, Segment uses your model to map data to your Reverse ETL destinations. <br> Segment recommends a model with the following format: 

``` sql
SELECT * FROM unified_profiles.accounts
```

<ol style="counter-reset: none;">
  <li value="7" markdown=1>
  Click **Preview** to return 10 records from your warehouse. When you've verified that your records return as expected, click **Next**.
  </li>
  <li value="8" markdown=1>
  Click **Create Mapping**. On the Select mappings screen, map event fields from your data source to the pre-filled values that Segment expects to receive. Clicking into an event field lets you search your destination's record fields. When you've finished mapping all of the event fields, click **Create mapping.**
  </li>
  <li value="9" markdown=1>
  After Segment marks the "Add connections" tile as complete, click **Add identifiers and traits** and begin [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits). 
  </li>
</ol>

### Website or mobile app

***I don't know what this flow looks like and probably need access to a demo environment with this option selected to click through the setup screens (or have someone explain it to me)***

## Step 3: Add identifiers and traits
After you've selected which data sources you'd like to integrate customer data from, you can select _identifiers_, or unique pieces of data that allow you to link information about an individual customer across different programs and services, and _traits_, which are pieces of information you know about a particular customer. 

1. On the Add identifiers and traits page, click **Add identifier**. 
2. Select one or more of Segment's 11 default identifiers and click **Add identifiers**.
3. Review the identifiers you've selected. If you need to make changes to the priority order of your identifiers, click **Edit Priority**. To make changes to an identifier, select the menu icon in the row the identifier appears in, and click **Edit** or **Delete**.
4. When you're satisfied with your identifiers, click **Add computed traits**.
5. Select up to two traits and click **Save**. <br> _Segment recommends selecting **Total inbounds**, or the number of inbound attempts that resulted in a customer engagement, and **Frequent inbound channel**, which identifies the most frequently used communication channel._
6. **(Optional)**: Set up predictive traits by selecting the **Set up predictive traits** dropdown and clicking **Complete setup** next to one or both traits. For more information about predictive traits, see Segment's [Predictions documentation](/docs/unify/Traits/predictions/).

> warning "Predictions require event data in your sources"
> Before you can configure predictions, you must have data flowing into your connected source. After data is flowing into your source, it can take up to 48 hours for predictions to be ready.

## Step 4: Check configuration
The final step in the Segment for Flex setup process is to check your configuration. After this check succeeds, you can return to Flex to complete the Unified Profiles setup process.

To check your configuration: 
1. Click **Enable Sources and Test Connections**. Segment automatically checks your sources and connections. 
  <br>If you correctly configured the sources and connections you set up in steps 1 and 2, Segment marks this step as complete.
2. To return to Flex and complete the Unified Profiles setup process, click **[Return to Flex](https://console.twilio.com/us1/develop/flex/){:target="_blank"}**. 

### Additional troubleshooting tools
If the Enable Sources and Test Connections check indicates there are problems with your sources and connections, you can use the advanced troubleshooting and testing tools linked under the Additional Troubleshooting Tools section to debug any issues with your configuration. 

- [Event Debugger](/docs/connections/sources/debugger/): With the Debugger, you can check that calls are sent in the expected format without having to wait for any data processing. 
- [Profile Explorer](/docs/unify/#profile-explorer): Use the Profile Explorer to view all user data, including event history, traits, and identifiers. 
- [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"}: Use the Advanced Segment option to view your full Segment workspace. Segment recommends working with the assistance of Professional Services when accessing Advanced Segment.

## Segment for Flex entitlements and limitations

Segment for Flex workspaces created during the Unified Profiles setup process have the following entitlements and limitations:

### Sources

In addition to 1 source for Flex events that is auto-created during setup, you can create an additional 5 sources.

These sources are limited to the following types:
  - [Salesforce CRM](/docs/connections/sources/catalog/cloud-apps/salesforce/)
  - [Storage (RETL)](/docs/connections/reverse-etl/#step-1-add-a-source)
  - [Mobile](/docs/connections/sources/catalog/#mobile) 
  - [Javascript](/docs/connections/sources/catalog/libraries/website/javascript/)
  - [Twilio Event Streams](/docs/connections/sources/catalog/cloud-apps/twilio/)
  - [HTTP](/docs/connections/sources/catalog/libraries/server/http-api/)
  - [Java](/docs/connections/sources/catalog/libraries/server/java/)

### Destinations

With a Segment for Flex workspace, you can create up to 3 destinations.

These destinations are limited to the following types:
- [Storage connections](/docs/connections/storage/catalog/)
- [Analytics destinations](/docs/connections/destinations/catalog/#analytics)
- [Event streams](/docs/connections/destinations/#event-streams-destinations)
- [Segment Profiles destination](/docs/connections/destinations/catalog/actions-segment-profiles/)
- [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/)


### Entitlements

Your Segment for Flex workspace has the following entitlements:

- 2 [Unify Spaces](/docs/unify/quickstart/)
- 2 [computed traits](/docs/unify/Traits/computed-traits/)
- 2 [predictions](/docs/unify/traits/predictions/)