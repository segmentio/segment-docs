---
title: Create a Unified Profiles Workspace
hidden: true
redirect_from: '/unified-profiles/segment-for-flex'
---
Flex users without an existing Segment workspace that includes a Unify space can create a Unified Profiles workspace and a Unify space. The Unified Profiles workspace provides limited access to Segment.

For entitlements and limitations associated with a Unified Profiles workspace, see the [Entitlements and limitations](#segment-for-flex-entitlements-and-limitations) documentation. 

## Prerequisites

Before creating a Unified Profiles workspace, you must have requested access from the [CustomerAI](https://console.twilio.com/us1/develop/flex/customerai/overview){:target="_blank"} page in your Flex Console and been accepted into the Agent Copilot and Unified Profiles beta program.

## Step 1: Select your data source

> warning "You might be unable to change data source selection after taking action"
> For users setting up Salesforce and a data warehouse, a data warehouse, or a website or mobile app source, once you've selected your data source, proceeded to the next step, and taken action, you can't return to this page and make a different selection. Users that opted to upload CSVs can return to this page and make a different selection or upload an additional CSV. For more information about adding additional data sources after completing the Unified Profiles guided setup, see the optional [Add additional sources and destinations to your workspace](#optional-add-additional-sources-and-destinations-to-your-workspace) documentation.

1. In Unified Profiles, select a data source to get started and click **Next**.
2. Review the popup that explains how the data source connects to Segment, and click **Continue**.

## Step 2: Add connections

After you've selected the source of your customer data, set up the connections between your data source(s) and Segment. 

You can set up 1 of the following options: 
- [CSV](#csv)
- [Salesforce and a data warehouse](#salesforce-and-a-data-warehouse)
- [A data warehouse](#data-warehouse)
- [A website or mobile app source](#website-or-mobile-app)

<!---If your data source isn't listed on this page, click **My source isn't listed**.--->

### CSV

> warning "You cannot remove test profiles in your Unified Profiles workspace"
> Contact [Segment support](mailto:friends@segment.com){:target="_blank"} to remove test profiles you uploaded to your Unified Profiles workspace.

1. On the Getting started page, click **Upload CSV**. 
2. Review the information on the Upload profiles and custom traits page. 
3. Click **Download template** to download Segment's template CSV. 
4. Open the template CSV and enter values for the fields you'd like to update identifiers and custom traits for. These values are case sensitive. If you add a new column to your CSV file, Segment adds the data to your profiles as a custom trait. 
5. Return to your Unified Profiles workspace and upload your CSV file. You can upload 1 CSV file at a time. The CSV file that you upload must contain fewer than 10,000 rows and only contain the characters outlined in the [Allowed CSV file characters](/docs/unify/csv-upload/#allowed-csv-file-characters) documentation. 
6. Click **Finish** to return to the Getting started page. 
    _(Optional)_: To upload additional CSV files, repeat steps 1-6.
7. When you've finished uploading your profiles, click **Add identifiers and traits** to review the identifiers and traits Segment extracted from your CSV.

### Salesforce and a data warehouse

> info "Sample queries for importing records into Unified Profiles"
> Not sure where to start with the SQL queries that define your model? See the [RETL Queries for Importing Salesforce Objects into Unified Profiles in Flex](/docs/unified-profiles/create-sql-traits){:target="_blank"} documentation.

1. On the Getting started with Segment page, click **Connect Salesforce**. 
2. You are redirected to the Salesforce login screen. Sign in to Salesforce with a user that has _View all Records_ permissions. 
3. On the Getting started with Segment page, click **Connect data warehouse**. 
4. Select your data warehouse from the list of available warehouses, and click **Next**.
5. Give your destination a name and enter the account credentials for a user that has read and write permissions. Click **Save**. 
6. After you've given your destination a name and entered your credentials, click **Next**.
7. On the Getting started with Segment page, click **Define Model**.
8. Create a SQL query that defines your model. After you've created a model, Segment uses your model to map data to your Reverse ETL destinations.
9. Click **Preview** to return 10 records from your warehouse. When you've verified that your records return as expected, click **Next**.
10. Click **Create Mapping**. On the Select mappings screen, map event fields from your data source to the pre-filled values that Segment expects to receive. Clicking into an event field lets you search your destination's record fields. When you've finished mapping all of the event fields, click **Create mapping.**
11. After Segment marks the "Add connections" tile as complete, click **Add identifiers and traits** and begin [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits). 

> warning "Records from your data warehouse and Salesforce might not be immediately available"
> Segment's initial sync with your data warehouse can take up to 24 hours to complete. Segment syncs with Salesforce immediately after you connect it to your Unified Profiles workspace. This initial sync can take up to 72 hours. After Segment completes the initial sync with Salesforce, Segment initiates a sync with Salesforce every three hours.

### Data warehouse

1. On the Getting started page, click **Connect data warehouse**. 
2. Select your data warehouse from the list of available warehouses, and click **Next**.
3. Give your destination a name and enter the account credentials for a user that has read and write permissions. Click **Save**. 
4. After you've given your destination a name and entered your credentials, click **Next**.
5. On the Getting started page, click **Define model**.
6. Create a SQL query that defines your model. After you've created a model, Segment uses your model to map data to your Reverse ETL destinations.
7. Click **Preview** to return 10 records from your warehouse. When you've verified that your records return as expected, click **Next**.
8. Click **Create Mapping**. On the Select mappings screen, map event fields from your data source to the pre-filled values that Segment expects to receive. Clicking into an event field lets you search your destination's record fields. When you've finished mapping all of the event fields, click **Create mapping.**
9. After Segment marks the "Add connections" tile as complete, add additional connections or click **Add identifiers and traits** to start [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits).

> warning "Records from your data warehouse might not be immediately available"
> Segment's initial sync with your data warehouse can take up to 24 hours to complete. 

### Website or mobile app

Connect to either a website or mobile app to complete this step.

#### Website
1. On the Getting started page, under the Connect your website section, click **Connect Source**.
2. Enter a name for your website in the Website Name field, copy the URL of your website into the Website URL field, and click **Create Source**. 
3. Copy the Segment snippet and paste it into the header of your website. For more information about the Segment snippet, click "What is this?" or view the [Add the Segment Snippet docs](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2a-add-the-segment-snippet){:target="_blank"}.
4. After you've pasted the snippet in the header of your website, click **Next**.
5. On the Test screen, select either **Skip this step** or navigate to your website, view a few pages, then return to Segment and click **Test Connection**. If Segment detects page views on your site, the Page indicator with a check mark appears. When you've verified that your snippet is successfully installed, click **Done**.
6. After Segment marks the "Add connections" tile as complete, click **Add identifiers and traits** and begin [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits).

#### Mobile app

> warning "You can connect to either an iOS app or an Android app during this step"
> If you need to connect additional mobile app sources to your workspace, you can do so after completing the setup process. 

1. On the Getting started page, under the Connect your mobile apps section, click **Connect Source** and select your preferred operating system. 
2. Enter a name for your source and click **Create Source**. 
3. Add the Analytics dependency to your app by following the provided instructions. When you've added the dependency to your app, click **Next**. 
4. On the "Let's test out your connection" page, select either **Skip this step** or navigate to your app, view a few screens, then return to Segment and click **Test connection**. If Segment detects screen views on your site, the Page indicator with a check mark appears. When you've verified that your snippet is successfully installed, click **Done**.
5. After Segment marks the "Add connections" tile as complete, click **Add identifiers and traits** and begin [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits).

## Step 3: Add identifiers and traits
After you've selected which data sources you'd like to integrate customer data from, you can select _identifiers_, or unique pieces of data that allow you to link information about an individual customer across different programs and services, and _traits_, which are pieces of information you know about a particular customer. In this step, you can select one or more of Segment's 11 default identifiers.

1. On the Add identifiers and traits page, click **Add identifier**. 
2. Select either **Select default identifiers** or **Create identifier** and follow the provided steps to configure your identifiers. 
3. When you've finished selecting identifiers, click **Save**.
4. On the Add identifiers and traits page, review the identifiers. If you need to make changes to an identifier, select the menu icon in the row the identifier appears in and click **Edit** or **Delete**.
4. When you're satisfied with your identifiers, click **Add computed traits**.
5. Select up to two traits and click **Save**. <br> _Segment recommends selecting **Total inbounds**, or the number of inbound attempts that resulted in a customer engagement, and **Frequent inbound channel**, which identifies the most frequently used communication channel._
6. _(Optional)_: After events from your data sources populate into your downstream destinations, you can return to the guided setup to configure predictive traits. Return to the guided setup, select the **Set up predictive traits** dropdown, and click **Complete setup** next to one or both traits. For more information about predictive traits, see Segment's [Predictions documentation](/docs/unify/Traits/predictions/){:target="_blank"}.

> warning "Predictions require event data in your sources"
> Before you can configure predictions, you must have data flowing into your connected source. After data is flowing into your source, it can take up to 48 hours for predictions to be ready.

## Step 4: Check configuration
The final step in the Unified Profiles setup process is to check your configuration. After this check succeeds, you can return to Flex to complete the Unified Profiles setup process.

To check your configuration: 
1. Click **Enable Sources and Test Connections**. Segment automatically checks your sources and connections. 
  <br>If you connected your sources and connections to Segment, Segment marks this step as complete.
2. Click **[Return to set up home page](https://console.twilio.com/us1/develop/flex/){:target="_blank"}** to continue the Unified Profiles setup process.

### Additional troubleshooting tools
If the Enable Sources and Test Connections check indicates there are problems with your sources and connections, you can use the advanced troubleshooting and testing tools linked under the Additional Troubleshooting Tools section to debug any issues with your configuration. 

- [Event Debugger](/docs/connections/sources/debugger/){:target="_blank"}: With the Debugger, you can check that calls are sent in the expected format without having to wait for any data processing. 
- [Profile Explorer](/docs/unify/#profile-explorer){:target="_blank"}: Use the Profile Explorer to view all user data, including event history, traits, and identifiers. 
- [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"}: Use the Advanced Segment option to view your full Segment workspace. Segment recommends working with the assistance of Professional Services when accessing Advanced Segment.

## (Optional) Add additional sources, destinations, and custom identifiers to your workspace

After you complete the Unified Profiles guided setup, you can use [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"} to connect your workspace to additional *sources*, or websites, server libraries, mobile SDKs, and cloud applications that can send data into Segment, and *destinations*, or apps and business tools that can receive forwarded data from Segment.

> warning "Editing or deleting the two sources automatically created during the guided setup can lead to data loss"
> During the guided setup process, Segment creates two sources: a [Java source](/docs/connections/sources/catalog/libraries/server/java/quickstart/) named `flex-unify-server-source` that connects your Segment workspace to Flex, and an Personas source, named `Personas [workspace-name]`, that activates your customer data. If you edit or delete these sources, reach out to Flex support for next steps. 

See the [Unified Profiles entitlements and limitations](#segment-for-flex-entitlements-and-limitations) documentation for more information about the sources and destinations supported by Unified Profiles workspaces.

### Add a source to your workspace

> info "Eligible sources"
> You can add up to 4 sources to your Unified Profiles workspace in addition to the 2 sources that Segment automatically generates during workspace setup. For more information about the types of sources you can add to your workspace, see the [Sources](#sources) documentation.  

To add a source to your Unified Profiles workspace:
1. Open your Unified Profiles workspace in [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"} mode. 
2. On the Your Segment Overview page, find the sources column and click **+ Add More**.
3. Select the source you'd like to add to your workspace, and click **Next**.
4. Follow the setup flow, and click **Done** to complete setting up your source.

### Add a destination to your workspace

> info "Eligible destinations"
> You can add up to 3 destinations to your Unified Profiles workspace. For more information about the types of destinations you can add to your workspace, see the [Destinations](#destinations) documentation.  

To add a destination to your Unified Profiles workspace:
1. Open your Unified Profiles workspace in [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"} mode. 
2. On the Your Segment Overview page, find the destinations column and click **Add Destination** if you haven't yet created any additional destinations, or **+ Add More** if you've already created an additional destination.
3. Select the destination you'd like to add to your workspace, and click **Next**.
4. Follow the setup flow, and click **Done** to complete setting up your source. 

### Add custom identifiers to your workspace

You can add an unlimited number of custom identifiers to your workspace in Advanced Segment mode. 

To add custom identifiers to your Unified Profiles workspace: 
1. Open your Unified Profiles workspace in [Advanced Segment](https://app.segment.com/goto-my-workspace/home){:target="_blank"} mode. 
2. Select **Unify** in the sidebar, click the Unify space you created during the guided setup, and select **Unify settings**. 
3. On the Identity resolution page, click **+ Add identifier** and select **Custom identifiers**.
4. On the **Custom Identifier** popup, walk through the steps to create your custom identifier. When you're finished, click **Add new identifier**. 

## Unified Profiles entitlements and limitations

Unified Profiles workspaces created during the Unified Profiles setup process have the following entitlements and limitations:

### Sources

In addition to 2 sources for Flex events that are auto-created during setup, you can create an additional 4 sources.

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

With a Unified Profiles workspace, you can create up to 3 destinations.

These destinations are limited to the following types:
- [Storage connections](/docs/connections/storage/catalog/){:target="_blank"}
- [Analytics destinations](/docs/connections/destinations/catalog/#analytics){:target="_blank"}
- [Event streams](/docs/connections/destinations/#event-streams-destinations){:target="_blank"}
- [Segment Profiles destination](/docs/connections/destinations/catalog/actions-segment-profiles/){:target="_blank"}
- [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/){:target="_blank"}

### Entitlements

Your Unified Profiles workspace has the following entitlements:

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