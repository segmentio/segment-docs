---
title: Unified Profiles in Flex
hidden: true
---

Unified Profiles in Flex, available with Twilio's [Agent Copilot](add a link here!), provides your Flex agents with real-time customer data from multiple enterprise systems within Flex. Agents can view each customer's details and a historical timeline that shows a customer's previous activities, enabling agents to provide personalized support based on a customer's history.

To try out Agent Copilot, which includes Unified Profiles for Flex, request access from the [CustomerAI for Contact Center](https://console.twilio.com/us1/develop/flex/customerai/overview){:target="_blank"} page in your Flex Console. Agent Copilot is currently in beta and access is limited. After you sign up, a Twilio Flex team member will contact you by email. If you are selected to participate in the beta program, the Twilio Flex team will work with you on the next steps to set up Agent Copilot and Unified Profiles. 

For more information about Unified Profiles, see the [Agent Copilot](add a link here!) documentation.

> info "Unified Profiles is in public beta"
> This means that Unified Profiles features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions. <!--- or contact Flex instead?--->

Users without an existing Segment workspace can configure a [Segment for Flex](#configure-a-segment-for-flex-workspace) workspace, which provides tailored access to Segment. Users with an existing Segment workspace can [connect their existing workspace](#connect-an-existing-workspace) to Flex using a Unify space.

## Create a Segment for Flex workspace

Flex users without an existing Segment workspace can create a Segment for Flex workspace, which provides tailored access to Segment. 

### Prerequisites

Before creating a Segment for Flex workspace, you must have requested access from the [CustomerAI for Contact Center](https://console.twilio.com/us1/develop/flex/customerai/overview){:target="_blank"} page in your Flex Console and been accepted into the Agent Copilot beta program.

### Step 1: Select your data sources

<!--- remaining work for this section:
- rewrite warning callout
- 
--->

1. From your Flex account, select **Unify**. 
2. On the Flex Unify overview screen, click **Create Unify space in Segment**.
3. In Segment for Flex, select a data source to get started and click **Next**.
4. Review the popup that explains how the data source that connects to Segment, and click **Continue**.

> warning "WIP: Add a header here"
> Once you've selected your data source and proceeded to the next step in the setup process, you can't return and make a different selection. You can select additional sources in a later step.

### Step 2: Add connections

Once you've selected where your customer data is stored, you must set up the connections between your data sources and Segment. 

You can set up one of the following options: 
- [Salesforce and data warehouse](#salesforce-and-data-warehouse)
- [A data warehouse only](#data-warehouse-only)
- [A website or mobile app source](#website-or-mobile-app)

#### Salesforce and data warehouse

<!--- remaining questions for this section:
- what permissions does the Salesforce user need to have??
--->

1. On the *Getting started with Segment* page, click **Connect Salesforce**. 
2. You are redirected to the Salesforce login screen. Sign in to Salesforce with a user that has XYZ permissions. 
3. On the *Getting started with Segment* page, click **Connect data warehouse**. 
4. Select your data warehouse from the list of available warehouses, and click **Next**.
5. Give your destination a name and enter your account credentials for a user that has read and write permissions. Click **Save**. 
6. Once you've given your destination a name and entered your credentials, click **Next**.
7. On the *Getting started with Segment* page, click **Define Model**.
8. Create a SQL query that defines your model. Once you've created a model, Segment uses your model to map data to your Reverse ETL destinations. <br> Segment recommends a model with the following format: 

``` sql
SELECT * FROM salesforce_unified_profiles.accounts
```

<ol style="counter-reset: none;">
  <li value="9" markdown=1>
  Select a column to act as your unique identifier and click **Preview** to return 10 records from your warehouse. When you've verified that your records return as expected, click **Next**.
  </li>
  <li value="10" markdown=1>
  Click **Create Mapping**. On the Select mappings screen, map event fields from your data source to the pre-filled values that Segment expects to receive. Clicking into an event field lets you search your destination's record fields. When you've finished mapping all of the event fields, click **Create mapping.**
  </li>
  <li value="11" markdown=1>
  After the Add connections tile is marked as complete, click **Add identifiers and traits** and begin [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits). 
  </li>
</ol>



#### Data warehouse only

<!--- remaining questions for this section:
- what does the SQL query for the model look like?
--->

1. On the *Getting started with Segment* page, click **Connect data warehouse**. 
2. Select your data warehouse from the list of available warehouses, and click **Next**.
3. Give your destination a name and enter your account credentials for a user that has read and write permissions. Click **Save**. 
4. Once you've given your destination a name and entered your credentials, click **Next**.
5. On the *Getting started with Segment* page, click **Define Model**.
6. Create a SQL query that defines your model. Once you've created a model, Segment uses your model to map data to your Reverse ETL destinations. <br> Segment recommends a model with the following format: 

``` sql
SELECT * FROM unified_profiles.accounts
```

<ol style="counter-reset: none;">
  <li value="7" markdown=1>
  Select a column to act as your unique identifier and click **Preview** to return 10 records from your warehouse. When you've verified that your records return as expected, click **Next**.
  </li>
  <li value="8" markdown=1>
  Click **Create Mapping**. On the Select mappings screen, map event fields from your data source to the pre-filled values that Segment expects to receive. Clicking into an event field lets you search your destination's record fields. When you've finished mapping all of the event fields, click **Create mapping.**
  </li>
  <li value="9" markdown=1>
  After the Add connections tile is marked as complete, click **Add identifiers and traits** and begin [Step 3: Add identifiers and traits](#step-3-add-identifiers-and-traits). 
  </li>
</ol>

#### Website or mobile app

I don't know what this flow looks like and probably need access to a demo environment with this option selected to click through the setup screens (or have someone explain it to me)

<!--Set up data source
Options:
SFC & DW
DW
Other
Click Next.
Info modal explaining how it works, click Continue.
Getting started with Segment screen
Add connections
Salesforce
Click button under Connect [Connection Name]
Log in to service
Return to Segment
Data Warehouse
Click Connect data warehouse.
Select a data warehouse
Give your data warehouse a name
Authenticate your data warehouse with a user that has read and write permissions-->

### Step 3: Add identifiers and traits
After you've selected which data sources you'd like to integrate customer data from, you can select _identifiers_, or unique pieces of data that allow you to link information about an individual customer across different programs and services, and _traits_, which are pieces of information you know about a particular customer. 

1. On the Add identifiers and traits page, click **Add identifier**. 
2. Select one or more of Segment's 11 default identifiers and click **Add identifiers**.
3. Review the identifiers you've selected. If you need to make changes to the priority order the identifiers appear in, click **Edit Priority**. To make changes to an identifier, select the menu icon in the row the identifier appears in, and click either **Edit** or **Delete**. <!---menu icon??--->
4. When you're satisfied with your identifiers, click **Add computed traits**.
5. Select up to two traits and click **Save**. <br> _Segment recommends selecting **Total inbounds**, or the number of inbound attempts that resulted in a customer engagement, and **Frequent inbound channel**, which identifies the most frequently used communication channel._
6. **(Optional)**: Set up predictive traits by selecting the **Set up predictive traits** dropdown and clicking **Complete setup** next to one or both traits. For more information about predictive traits, see Segment's [Predictions documentation](/docs/unify/Traits/predictions/).

> warning "Predictive traits require event data in your sources"
> Before you can configure predictive traits, you must have data flowing into your connected source. Once data is flowing into your source, it can take up to 48 hours for predictive traits to be ready. <!---rewrite disclaimer about timing. it's jank rn--->

### Step 4: Check configuration
The final step in the Segment for Flex setup process is to check your configuration. After this check succeeds, you can return to Flex to complete the Unified Profiles setup process.

To check your configuration: 
1. Click **Enable Sources and Test Connections**. Segment automatically checks your sources and connections. 
  <br>If you correctly configured the sources and connections you set up in steps 1 and 2, Segment marks this step as complete.
2. To return to Flex and complete the Unified Profiles setup process, click **[Return to Flex](https://console.twilio.com/us1/develop/flex/){:target="_blank"}**. 

#### Additional troubleshooting tools
If the Enable Sources and Test Connections check indicates there are problems with your sources and connections, you can use the advanced troubleshooting and testing tools linked under the Additional Troubleshooting Tools section to debug any issues with your configuration. 

- [Event Debugger](/docs/connections/sources/debugger/): With the Debugger, you can check that calls are sent in the expected format without having to wait for any data processing. 
- [Profile Explorer](/docs/unify/#profile-explorer): Use the Profile Explorer to view all user data, including event history, traits, and identifiers. 
- [Advanced Segment](https://app.segment.com/goto-my-workspace/overview){:target="_blank"}: Use the Advanced Segment option to view your full Segment workspace. Segment recommends working with the assistance of Professional Services when accessing Advanced Segment.

### Segment for Flex entitlements and limitations

Segment for Flex workspaces created during the Unified Profiles setup process have the following entitlements and limitations:

#### Sources

In addition to 1 source for Flex events that is auto-created during setup, you can create an additional 5 sources.

These sources are limited to the following types:
  - [Salesforce CRM](/docs/connections/sources/catalog/cloud-apps/salesforce/)
  - [Storage (RETL)](/docs/connections/reverse-etl/#step-1-add-a-source)
  - [Mobile](/docs/connections/sources/catalog/#mobile) 
  - [Javascript](/docs/connections/sources/catalog/libraries/website/javascript/)
  - [Twilio Event Streams](/docs/connections/sources/catalog/cloud-apps/twilio/) <!---- this is an obj cloud source and not event streams, am I missing something??---> 
  - [HTTP](/docs/connections/sources/catalog/libraries/server/http-api/)
  - [Java](/docs/connections/sources/catalog/libraries/server/java/)

#### Destinations

With a Segment for Flex workspace, you can create up to 3 destinations.

These destinations are limited to the following types:
- [Storage connections](/docs/connections/storage/catalog/)
- [Analytics destinations](/docs/connections/destinations/catalog/#analytics)
- [Event Streams](/docs/connections/destinations/#event-streams-destinations)
- [Segment Profiles](/docs/connections/destinations/catalog/actions-segment-profiles/)
- [Segment Connections](/docs/connections/destinations/catalog/actions-segment/)


#### Entitlements

Your Segment for Flex workspace has the following entitlements:

- 2 [Unify Spaces](/docs/unify/quickstart/)
- 2 [computed traits](/docs/unify/Traits/computed-traits/)
- 2 [predictive traits](/docs/unify/traits/predictions/)


## Connect an existing workspace

If you already have a Segment workspace, you can use a [Unify space](/docs/unify/quickstart/) to connect your customer data to Flex. 

> info "Limited to Business Tier customers with a Unify Plus entitlement"
> Access to Unified Profiles in Flex is limited to Segment customers on the Business Tier plan with a Unify Plus entitlement. 
>
>  
> To upgrade to the Business Tier plan, contact your account executive or [request a demo](https://segment.com/demo/){:target="_blank"} from Segment's sales team. 

#### Prerequisites

Before configuring Unified Profiles, please note the following account information is required: 
- Workplace slug
- Unify Space ID (_if you have an existing Unify space you'd like to connect to Unified Profiles_)
- Profile API token (_if you have an existing Unify space you'd like to connect to Unified Profiles_)
<!--- may take this out. seems silly to note as a prereq if you haven't created it yet- Flex source write key (which you configure during the setup process)--->

<!---Notes/prerequisites
Note that the following account information is required:
Workspace slug
Space ID
Profile API token
Flex source write key (must be a server source(?) can this be an existing source or is this a source that you have to set up during the Unified Profiles setup process?)

Note that you can create a new Unify space/data sources, but you can also use existing ones
Step 1: Reach out to friends@ or similar to start the kickoff process
Step 2: Set up a Unify Space
Can be an existing Unify Space. If it is, proceed directly to step 3
If it needs to be a new space:
Create a dev space
Verify that profiles are created as expected
Create prod space (can copy over settings)
Step 3: Create a Profile API key for your Unify space
Unify > Unify Settings
Select API access
Select +Generate Token button
Enter a name for your Profile API token and enter the password for your Segment account, then click Generate token (does Segment recommend a naming convention, like “Unified Profiles Profile API key”?) Copy token, click checkbox confirming you’ve written down your token, then click Done.
Step 4: Connect data sources to your Unify space
Configure one of the Following arrangements:
Salesforce source + dwh destination
Step 1:
Step 2: etc.
Dwh source
Step 1
Step 2: etc.
Connect your data warehouse to your Unify Space
Enable mapping and verify that profiles populate as expected
Step 5: Create a Server source for Flex (THIS COULD BE SIMPLIFIED/REMOVED BEFORE DOCS ARE REQUIRED)
Step 6: Add Configuration Context
Step 7: Creating Computed and Predictive Traits
Note that the preceding step must be completed in Flex and a user must complete an interaction before this step can be completed
Can link to/copy existing docs to set up a few traits. The PS Guide also has some great screenshots of sample traits.
Troubleshooting
Source Debugger
--->