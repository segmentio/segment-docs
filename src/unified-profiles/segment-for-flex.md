---
title: Create a Segment for Flex Workspace
hidden: true
---
Flex users without an existing Segment workspace that includes a Unify space can create a Segment for Flex workspace and a Unify space. The Segment for Flex workspace provides limited access to Segment.

For entitlements and limitations associated with a Segment for Flex workspace, see the [Entitlements and limitations](#segment-for-flex-entitlements-and-limitations) documentation. 

## Prerequisites

Before creating a Segment for Flex workspace, you must have requested access from the [CustomerAI](https://console.twilio.com/us1/develop/flex/customerai/overview){:target="_blank"} page in your Flex Console and been accepted into the Agent Copilot and Unified Profiles beta program.

## Step 1: Select your data sources

> warning "Unable to change data source selection after this step"
> After you've selected your data source and proceeded to the next step, you can't return to this page and make a different selection. You can add additional data sources after setting up your Segment for Flex workspace. For more information about adding additional data sources after completing the Segment for Flex guided setup, see the optional [Add additional sources and destinations to your workspace](#optional-add-additional-sources-and-destinations-to-your-workspace) documentation.

1. In Segment for Flex, select a data source to get started and click **Next**.
2. Review the popup that explains how the data source connects to Segment, and click **Continue**.

## Step 2: Add connections

After you've selected where your customer data is stored, you must set up the connections between your data sources and Segment. 

You can set up one of the following options: 
- [Salesforce and a data warehouse](#salesforce-and-a-data-warehouse)
- [A data warehouse only](#data-warehouse-only)
- [A website or mobile app source](#website-or-mobile-app)

You can add additional data sources after completing the setup process. <br>

### Salesforce and a data warehouse

1. On the Getting started with Segment page, click **Connect Salesforce**. 
2. You are redirected to the Salesforce login screen. Sign in to Salesforce with a user that has _View all Records_ permissions. 
3. On the Getting started with Segment page, click **Connect data warehouse**. 
4. Select your data warehouse from the list of available warehouses, and click **Next**.
5. Give your destination a name and enter the account credentials for a user that has read and write permissions. Click **Save**. 
6. After you've given your destination a name and entered your credentials, click **Next**.
7. On the Getting started with Segment page, click **Define Model**.
8. [Create a SQL query that defines your model](/docs/unified-profiles/create-sql-traits){:target="_blank"}. After you've created a model, Segment uses your model to map data to your Reverse ETL destinations. 
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
6. [Create a SQL query that defines your model](/docs/unified-profiles/create-sql-traits){:target="_blank"} After you've created a model, Segment uses your model to map data to your Reverse ETL destinations.
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

Connect to either a website or mobile app to complete this step.

#### Website
1. On the Getting started with Segment page, under the Connect your website section, click **Connect Source**.
2. Enter a name for your website in the Website Name field, copy the URL of your website into the Website URL field, and click **Create Source**. 
3. Copy the Segment snippet and paste it into the header of your website. For more information about the Segment snippet, click "What is this?" or view the [Add the Segment Snippet docs](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2a-add-the-segment-snippet){:target="_blank"}.
4. After you've pasted the snippet in the header of your website, click **Next**.
5. On the Test screen, select either **Skip this step** or navigate to your website, view a few pages, then return to Segment and click **Test Connection**. If Segment detects page views on your site, the Page indicator with a check mark appears. When you've verified that your snippet is successfully installed, click **Done**.
6. After Segment marks the "Add connections" tile as complete, click **Add identifiers and traits** and begin [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits).

#### Mobile app

> warning "You can connect to either an iOS app or an Android app during this step"
> If you need to connect additional mobile app sources to your workspace, you can do so after completing the setup process. 

1. On the Getting started with Segment page, under the Connect your mobile apps section, click **Connect Source** and select your preferred operating system. 
2. Enter a name for your source and click **Create Source**. 
3. Add the Analytics dependency to your app by following the provided instructions. When you've added the dependency to your app, click **Next**. 
4. On the "Let's test out your connection" page, select either **Skip this step** or navigate to your app, view a few screens, then return to Segment and click **Test connection**. If Segment detects screen views on your site, the Page indicator with a check mark appears. When you've verified that your snippet is successfully installed, click **Done**.
5. After Segment marks the "Add connections" tile as complete, click **Add identifiers and traits** and begin [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits).

## Step 3: Add identifiers and traits
After you've selected which data sources you'd like to integrate customer data from, you can select _identifiers_, or unique pieces of data that allow you to link information about an individual customer across different programs and services, and _traits_, which are pieces of information you know about a particular customer. 

1. On the Add identifiers and traits page, click **Add identifier**. 
2. Select one or more of Segment's 11 default identifiers and click **Add identifiers**.
3. Review the identifiers you've selected. To make changes to an identifier, select the menu icon in the row the identifier appears in, and click **Edit** or **Delete**.
4. When you're satisfied with your identifiers, click **Add computed traits**.
5. Select up to two traits and click **Save**. <br> _Segment recommends selecting **Total inbounds**, or the number of inbound attempts that resulted in a customer engagement, and **Frequent inbound channel**, which identifies the most frequently used communication channel._
6. **(Optional)**: Set up predictive traits by selecting the **Set up predictive traits** dropdown and clicking **Complete setup** next to one or both traits. For more information about predictive traits, see Segment's [Predictions documentation](/docs/unify/Traits/predictions/){:target="_blank"}.

> warning "Predictions require event data in your sources"
> Before you can configure predictions, you must have data flowing into your connected source. After data is flowing into your source, it can take up to 48 hours for predictions to be ready.

## Step 4: Check configuration
The final step in the Segment for Flex setup process is to check your configuration. After this check succeeds, you can return to Flex to complete the Unified Profiles setup process.

To check your configuration: 
1. Click **Enable Sources and Test Connections**. Segment automatically checks your sources and connections. 
  <br>If you correctly configured your sources and connections, Segment marks this step as complete.
2. To return to Flex and complete the Unified Profiles setup process, click **[Return to Flex](https://console.twilio.com/us1/develop/flex/){:target="_blank"}**. 

### Additional troubleshooting tools
If the Enable Sources and Test Connections check indicates there are problems with your sources and connections, you can use the advanced troubleshooting and testing tools linked under the Additional Troubleshooting Tools section to debug any issues with your configuration. 

- [Event Debugger](/docs/connections/sources/debugger/){:target="_blank"}: With the Debugger, you can check that calls are sent in the expected format without having to wait for any data processing. 
- [Profile Explorer](/docs/unify/#profile-explorer){:target="_blank"}: Use the Profile Explorer to view all user data, including event history, traits, and identifiers. 
- [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"}: Use the Advanced Segment option to view your full Segment workspace. Segment recommends working with the assistance of Professional Services when accessing Advanced Segment.

## (Optional) Add additional sources and destinations to your workspace

After you complete the Segment for Flex guided setup, you can use [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"} to connect your workspace to additional *sources*, or websites, server libraries, mobile SDKs, and cloud applications that can send data into Segment, and *destinations*, or apps and business tools that can receive forwarded data from Segment.   

See the [Segment for Flex entitlements and limitations](#segment-for-flex-entitlements-and-limitations) documentation for more information about the sources and destinations supported by Segment for Flex workspaces.

### Add a source to your workspace

> info "Eligible sources"
> You can add up to 5 sources to your Segment for Flex workspace. For more information about the types of sources you can add to your workspace, see the [Sources](#sources) documentation.  

To add a source to your Segment for Flex workspace:
1. Open your Segment for Flex workspace in [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"} mode. 
2. On the Your Segment Overview page, find the sources column and click **+ Add More**.
3. Select the source you'd like to add to your workspace, and click **Next**.
4. Follow the setup flow, and click **Done** to complete setting up your source.

### Add a destination to your workspace

> info "Eligible destinations"
> You can add up to 3 destinations to your Segment for Flex workspace. For more information about the types of destinations you can add to your workspace, see the [Destinations](#destinations) documentation.  

To add a destination to your Segment for Flex workspace:
1. Open your Segment for Flex workspace in [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"} mode. 
2. On the Your Segment Overview page, find the destinations column and click **Add Destination** if you haven't yet created any additional destinations, or **+ Add More** if you've already created an additional destination.
3. Select the destination you'd like to add to your workspace, and click **Next**.
4. Follow the setup flow, and click **Done** to complete setting up your source. 

## Segment for Flex entitlements and limitations

Segment for Flex workspaces created during the Unified Profiles setup process have the following entitlements and limitations:

### Sources

In addition to 1 source for Flex events that is auto-created during setup, you can create an additional 5 sources.

These sources are limited to the following types:
  - [Salesforce CRM](/docs/connections/sources/catalog/cloud-apps/salesforce/){:target="_blank"}
  - [BigQuery (Reverse ETL)](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/bigquery-setup/){:target="_blank"}
  - [Postgres (Reverse ETL)](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/postgres-setup/){:target="_blank"}
  - [Redshift (Reverse ETL)](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/redshift-setup/){:target="_blank"}
  - [Snowflake (Reverse ETL)](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/snowflake-setup/){:target="_blank"}
  - [Swift](/docs/connections/sources/catalog/libraries/mobile/apple/){:target="_blank"}
  - [Kotlin](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/){:target="_blank"}
  - [Javascript](/docs/connections/sources/catalog/libraries/website/javascript/){:target="_blank"}
  - [Twilio Event Streams](/docs/connections/sources/catalog/cloud-apps/twilio/){:target="_blank"}
  - [HTTP](/docs/connections/sources/catalog/libraries/server/http-api/){:target="_blank"}
  - [Java](/docs/connections/sources/catalog/libraries/server/java/){:target="_blank"}

### Destinations

With a Segment for Flex workspace, you can create up to 3 destinations.

These destinations are limited to the following types:
- [Storage connections](/docs/connections/storage/catalog/){:target="_blank"}
- [Analytics destinations](/docs/connections/destinations/catalog/#analytics){:target="_blank"}
- [Event streams](/docs/connections/destinations/#event-streams-destinations){:target="_blank"}
- [Segment Profiles destination](/docs/connections/destinations/catalog/actions-segment-profiles/){:target="_blank"}
- [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/){:target="_blank"}


### Entitlements

Your Segment for Flex workspace has the following entitlements:

- 2 [Unify spaces](/docs/unify/quickstart/){:target="_blank"}
- 2 [Computed traits](/docs/unify/Traits/computed-traits/){:target="_blank"}
- 2 [Predictions](/docs/unify/traits/predictions/){:target="_blank"}

<div class="double">
  {% include components/reference-button.html
    href="/docs/unified-profiles/"
    icon="unified-profiles.svg"
    title="Unified Profiles Overview"
    description="Unified Profiles in Flex provides your Flex agents with real-time customer data from multiple enterprise systems."
  %}

  {% include components/reference-button.html
    href="/docs/unified-profiles/connect-a-workspace"
    icon="api.svg"
    title="Connect an Existing Workspace to Flex"
    description="Flex customers with an existing Segment workspace that has a Unify space can connect their Unify space to Flex."
  %}
</div>
