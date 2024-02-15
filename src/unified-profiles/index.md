---
title: Unified Profiles in Flex
hidden: true
---

Unified Profiles in Flex, available with Twilio's [Agent Copilot](https://www.twilio.com/docs/flex/customer-ai){:target="_blank"}, provides your Flex agents with real-time customer data from multiple enterprise systems within Flex. Agents can view each customer's details and a historical timeline that shows a customer's previous activities, enabling agents to provide personalized support based on a customer's history.

To try out Agent Copilot, which includes Unified Profiles for Flex, request access from the [CustomerAI for Contact Center](https://console.twilio.com/us1/develop/flex/customerai/overview){:target="_blank"} page in your Flex Console. Agent Copilot is currently in beta and access is limited. After you sign up, a Twilio Flex team member will contact you by email. If you are selected to participate in the beta program, the Twilio Flex team will work with you on the next steps to set up Unified Profiles. 

For more information about Unified Profiles, see the [Agent Copilot](https://www.twilio.com/docs/flex/customer-ai){:target="_blank"} documentation.

> info "Public Beta"
> Unified Profiles in Flex is currently available as a limited Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

Users without an existing Segment workspace can configure a [Segment for Flex](#create-a-segment-for-flex-workspace) workspace, which provides limited access to Segment. Users with an existing Segment workspace can [connect their existing workspace to Flex](#connect-an-existing-workspace).

## Create a Segment for Flex workspace

Flex users without an existing Segment workspace can create a Segment for Flex workspace, which provides limited access to Segment. 

### Prerequisites

Before creating a Segment for Flex workspace, you must have requested access from the [CustomerAI for Contact Center](https://console.twilio.com/us1/develop/flex/customerai/overview){:target="_blank"} page in your Flex Console and been accepted into the Agent Copilot beta program.

### Step 1: Select your data sources

> warning "Data sources "
> After you've selected your data source and proceeded to the next step, you can't return to this page and make a different selection. You can add additional data sources after setting up your Segment for Flex workspace. For more information about sources in a Segment for Flex workspace, see the [Sources](#sources) documentation.

1. From your Flex account, select **Unify**. 
2. On the Flex Unify overview screen, click **Create Unify space in Segment**.
3. In Segment for Flex, select a data source to get started and click **Next**.
4. Review the popup that explains how the data source that connects to Segment, and click **Continue**.

### Step 2: Add connections

After you've selected where your customer data is stored, you must set up the connections between your data sources and Segment. 

You can set up one of the following options: 
- [Salesforce and a data warehouse](#salesforce-and-a-data-warehouse)
- [A data warehouse only](#data-warehouse-only)
- [A website or mobile app source](#website-or-mobile-app)

You can add additional data sources after completing the setup process. <br><br>

#### Salesforce and a data warehouse

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



#### Data warehouse only

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

#### Website or mobile app

***I don't know what this flow looks like and probably need access to a demo environment with this option selected to click through the setup screens (or have someone explain it to me)***

### Step 3: Add identifiers and traits
After you've selected which data sources you'd like to integrate customer data from, you can select _identifiers_, or unique pieces of data that allow you to link information about an individual customer across different programs and services, and _traits_, which are pieces of information you know about a particular customer. 

1. On the Add identifiers and traits page, click **Add identifier**. 
2. Select one or more of Segment's 11 default identifiers and click **Add identifiers**.
3. Review the identifiers you've selected. If you need to make changes to the priority order of your identifiers, click **Edit Priority**. To make changes to an identifier, select the menu icon in the row the identifier appears in, and click **Edit** or **Delete**.
4. When you're satisfied with your identifiers, click **Add computed traits**.
5. Select up to two traits and click **Save**. <br> _Segment recommends selecting **Total inbounds**, or the number of inbound attempts that resulted in a customer engagement, and **Frequent inbound channel**, which identifies the most frequently used communication channel._
6. **(Optional)**: Set up predictive traits by selecting the **Set up predictive traits** dropdown and clicking **Complete setup** next to one or both traits. For more information about predictive traits, see Segment's [Predictions documentation](/docs/unify/Traits/predictions/).

> warning "Predictions require event data in your sources"
> Before you can configure predictions, you must have data flowing into your connected source. After data is flowing into your source, it can take up to 48 hours for predictions to be ready.

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
  - [Twilio Event Streams](/docs/connections/sources/catalog/cloud-apps/twilio/)
  - [HTTP](/docs/connections/sources/catalog/libraries/server/http-api/)
  - [Java](/docs/connections/sources/catalog/libraries/server/java/)

#### Destinations

With a Segment for Flex workspace, you can create up to 3 destinations.

These destinations are limited to the following types:
- [Storage connections](/docs/connections/storage/catalog/)
- [Analytics destinations](/docs/connections/destinations/catalog/#analytics)
- [Event streams](/docs/connections/destinations/#event-streams-destinations)
- [Segment Profiles destination](/docs/connections/destinations/catalog/actions-segment-profiles/)
- [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/)


#### Entitlements

Your Segment for Flex workspace has the following entitlements:

- 2 [Unify Spaces](/docs/unify/quickstart/)
- 2 [computed traits](/docs/unify/Traits/computed-traits/)
- 2 [predictions](/docs/unify/traits/predictions/)


## Connect an existing workspace

If you already have a Segment workspace, you can use a new or pre-existing [Segment Unify space](/docs/unify/quickstart/) to connect your customer data to Flex. 

> warning "Unified Profiles has limited source and destination support"
> The connections supported by Unified Profiles are limited to the following:
>
> **Sources**: Salesforce, RETL sources (Postgres, Snowflake, Redshift, BigQuery)
>
> **Destinations**: Postgres, Snowflake, Redshift, BigQuery

### Prerequisites

- You must have requested access from the [CustomerAI for Contact Center](https://console.twilio.com/us1/develop/flex/customerai/overview){:target="_blank"} page in your Flex Console and been accepted into the Agent Copilot beta program.
- Your Segment workspace must be on the Business Tier plan with a Unify Plus entitlement. To upgrade to the Business Tier plan, contact your account executive or [request a demo](https://segment.com/demo/){:target="_blank"} from Segment's sales team.

### Step 1: Set up your Unify space

> success ""
> This section is about setting up a new Unify space to link to Twilio Flex. If you have an existing Unify space you'd like to use, proceed directly to [Step 2: Connect your sources to Unify](#step-2-connect-your-data-to-unify).

Segment recommends creating a development or sandbox space, verifying that your profiles appear as you would expect, and then creating a production space.

To create a Unify space:

1. Navigate to Unify and click **Create Space**. 
2. Enter a name for your space, select **Dev space**, then click **Create space**.
3. Set identity rules for your space by clicking **Set identity rules**.
4. Connect a source to your Unify space by clicking **Connect sources**.
5. Verify that your profiles appear as expected. When you're confident in the data quality of your profiles, repeat steps 1-4 to create a `prod` space. 
6. After creating your `prod` space, navigate to the settings for your Unify space and select API access. 
7. Copy the Segment Unify Space ID to a safe location, as you'll need this value to connect your Unify space to Twilio Flex.
8. Click **Generate Token**. Enter a name for your Profile API token, enter the password for your Segment account, then click **Generate token**. 
9. Copy your Profile API token to a safe location and click the "I have written down this access token" checkbox, then click **Done**. 

### Step 2: Connect your data to Unify
After you've created a Unify space, you must also connect a Salesforce CRM source and a data warehouse to your Unify Space to link that data to Unified Profiles. 

#### Set up Salesforce
1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/sources/catalog/salesforce){:target="_blank"}, select the Salesforce source and click **Add Source**. 
2. Enter a name for your Salesforce source and click **Authenticate**. 
3. You are redirected to the Salesforce login page. Sign in with a username and password of a user that has _View all Permissions_ access. 
4. You are redirected to the Permissions Verified page in Segment. Click **Next**.
5. On the SQL Schema name page, review the schema name and SQL query used to create the schema, then click **Next**. 
6. You've connected Salesforce. Click the **Do it later** button and continue to [Connect a data warehouse destination](#connect-a-data-warehouse-destination).

#### Connect a data warehouse
1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/destinations/catalog?category=Storage){:target="_blank"}, search for and select a BigQuery, Postgres, Redshift, or Snowflake destination.
2. On the Choose Data Source page, select the Salesforce source you set up in the previous step and click **Next**. 
3. Give for your data warehouse destination a name and enter the credentials for a user with read and write access to your database. Click **Connect**. 
4. Review the information on the Next Steps screen and click **Done**.

> info ""
> Segment's initial sync with your data warehouse might take up to 24 hours to complete.

#### Add a Reverse ETL source
1. In the [Reverse ETL section of the Sources catalog](https://app.segment.com/goto-my-workspace/sources/catalog?category=Reverse%20ETL){:target="_blank"}, select the warehouse you previously connected to Salesforce and click **Add Source**.
2. Give your source a name and enter the credentials for a user with read and write access to your database.
3. Click **Test Connection**. If Segment can successfully connect to your warehouse, click **Add Source**.
4. On the Models page, click **Add Model**.
5. Select SQL Editor and click **Next**.
6. Create a SQL query that defines your model. After you've created a model, Segment uses your model to map data to your Reverse ETL destinations. <br> Segment recommends a model with the following format: 

``` sql
SELECT * FROM salesforce.accounts
```
<ol style="counter-reset: none;">
  <li value="7" markdown=1>
  Click **Preview** to return 10 records from your warehouse. When you've verified that your records return as expected, click **Next**.
  </li>
  <li value="8" markdown=1>
  Enter a name for your SQL model and click **Create Model**.
  </li>
</ol>

#### Add a Segment Profiles destination

Create a Segment Profiles destination to add a mapping to your Reverse ETL source.

1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/destinations/catalog/actions-segment-profiles){:target="_blank"}, select the Segment Profiles destination and click **Add destination**.
2. On the Choose Data Source page, select the Salesforce source you set up in the previous step and click **Next**.
3. Enter a name for your destination and click **Create destination**.
4. On the Mappings tab, click **Add Mapping**.
5. Search for the model you created when you added your Reverse ETL source, select **Send Identify** and click **Create Mapping**.
6. You're redirected to the Edit Mapping page. Under the Select mappings section, map event fields from your data source to the pre-filled values that Segment expects to receive. Add additional traits by entering your properties and event names in the Traits section. Clicking into an event field lets you search your destination's record fields.<br> **(Optional)**: To test your mapping, click the **Test Mapping** button. 
7. When you've finished mapping all relevant event fields and verified that your test record contains all of the relevant user information, click **Save Mapping.**
8. You're returned to the Mappings page for your Segment Profiles destination. Under the Mapping status column, enable the mapping you created in the previous step.

### Step 3: Confirm your customer identifier settings

***This is a black box for me - how much of this will be the same from the PS guide?***

Before proceeding to Flex to confirm your customer identifier settings, note the following information from your Segment workspace: 

- **Workspace ID**: Located in the [General Settings section](https://app.segment.com/goto-my-workspace/settings/basic){:target="_blank"} of your Segment workspace
- **Workspace slug**: Located in the [General Settings section](https://app.segment.com/goto-my-workspace/settings/basic){:target="_blank"} of your Segment workspace
- **Unify space slug**: Located in the address bar between `/spaces/` and `/explorer/`. For example: `app.segment.com/workspace-slug/unify/spaces/unify-space-slug/explorer`
- **Unify space ID**: Located in the API access settings for your Unify space (**Unify > Unify settings > API access**)
- **Profile API access token**: The access token you created in [Step 1: Set up your Unify Space](#step-1-set-up-your-unify-space)

### Step 4: Create Computed Traits and Predictions

After linking your customer data to Flex using a Unify space, you can set up [Computed Traits](#computed-traits) and [Predictions](#predictions) to better understand your users. 

> warning "Complete an interaction in Flex before creating computed traits in Segment"
> Before you can create computed traits in Segment, you must confirm your customer identifier settings and then complete a customer interaction in Flex. 

#### Computed traits
[Computed traits](/docs/unify/traits/computed-traits) allow you to quickly create user or account-level calculations that Segment keeps up-to-date over time. These computations are based on the events and event properties that you are sending through Segment. 

Segment recommends that you configure the following computed traits for Unified Profiles:
- [Total inbounds](#total-inbounds): Number of inbound attempts resulting in customer engagement
- [Frequent inbound channel](#frequent-inbound-channel): Identifies the user's most frequently used channel of communication

Other computed traits that might be helpful include:
- [Total outbounds](#total-outbounds): Number of outbound attempts resulting in customer engagement
- [Last known service agent](#last-known-service-agent): Identifies the last agent to allow connecting to the same agent
- [Last interaction duration](#last-interaction-duration): The duration (in seconds) of the customer's last interaction with agent(s)
- [Common request](#): Most frequent topic of inbound or outbound engagement
- [Sentiment in last interaction](#sentiment-in-last-interaction): Gen-AI inferred sentiment in last interaction
- [Last interaction topic](#last-interaction-topic): Topic of the last interaction 

#### Total inbounds
1. Navigate to the Unify space you linked to Flex and click **Traits**. 
2. Click **Create computed trait**. 
3. Select **Event counter** and click **Next**. 
4. Select the "Flex - Engagement Completed" event.
5. Add the following conditions:
  - **Event property**: direction
  - **Operator**: equals
  - **Value**: Inbound
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**. 

##### Frequent inbound channel
1. Navigate to the Unify space you linked to Flex and click **Traits**. 
2. Click **Create computed trait**. 
3. Select **Most frequent** and click **Next**. 
4. Select the "Flex - Engagement Completed" event.
5. Add the following conditions:
  - **Event property**: direction
  - **Operator**: equals
  - **Value**: Inbound
6. Add an additional event property "channelType" with a value "Text".
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**. 

##### Total outbounds
1. Navigate to the Unify space you linked to Flex and click **Traits**. 
2. Click **Create computed trait**. 
3. Select **Event counter** and click **Next**. 
4. Select the "Flex - Engagement Completed" event.
5. Add the following conditions:
  - **Event property**: direction
  - **Operator**: equals
  - **Value**: Outbound
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**. 

##### Last known service agent
1. Navigate to the Unify space you linked to Flex and click **Traits**. 
2. Click **Create computed trait**. 
3. Select **Last** and click **Next**. 
4. Select the "Flex - Engagement Completed" event.
6. Add an event property "lastKnownAgentWorkerSid" with a value "Text".
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**.

##### Last interaction duration
1. Navigate to the Unify space you linked to Flex and click **Traits**. 
2. Click **Create computed trait**. 
3. Select **Last** and click **Next**. 
4. Select the "Flex - Engagement Completed" event.
6. Add an event property "duration" with a value "Number(100)".
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**. 

##### Common request
1. Navigate to the Unify space you linked to Flex and click **Traits**. 
2. Click **Create computed trait**. 
3. Select **Most frequent** and click **Next**. 
4. Select the "Flex - Wrap Up Completed" event.
5. Add an additional event property "topic" with a value "Text".
6. Add a minimum frequency of "2".
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**.

##### Sentiment in last interaction
1. Navigate to the Unify space you linked to Flex and click **Traits**. 
3. Select **Last** and click **Next**. 
4. Select the "Flex - Wrap Up Completed" event.
5. Add an additional event property "sentiment" with a value "Text".
6. Add a minimum frequency of "2".
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**.

##### Last interaction topic
1. Navigate to the Unify space you linked to Flex and click **Traits**.
3. Select **Last** and click **Next**. 
4. Select the "Flex - Wrap Up Completed" event.
5. Add an event property "topic" with a value "Text".
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**.

### Predictions
[Predictions](/docs/unify/traits/predictions/), Segment’s artificial intelligence and machine learning feature, let you predict the likelihood that users will perform any event tracked in Segment. With Predictions, you can identify users with, for example, a high propensity to purchase, refer a friend, or use a promo code. Predictions also lets you predict a user’s lifetime value (LTV).

Segment recommends that you select the following Predictions for Unified Profiles: 
- [Likelihood to churn](/docs/unify/traits/predictions/#likelihood-to-churn)
- [Predicted Lifetime value](/docs/unify/traits/predictions/#predicted-lifetime-value)

#### Likelihood to churn
1. Navigate to the Unify space you linked to Flex and click **Traits**. 
2. Click **Create computed trait**. 
3. Select **Predictions** and click **Next**. 
9. Enter a name for your trait and click **Create Trait**. 

For more information about Predictions, see the [Predictions FAQ](/docs/unify/traits/predictions/using-predictions/#faqs)

### Troubleshooting
You can use the following tools to debug issues you may encounter while configuring your Segment resources for Unified Profiles.

#### Source debugger
The Source debugger is a real-time tool that helps you confirm that API calls made from your website, mobile app, or servers arrive to your Segment source, so you can troubleshoot your Segment connections. With the debugger, you can check that calls are sent in the expected format without having to wait for any data processing.

For more information about the Source debugger, see the [Source debugger](/docs/connections/sources/debugger) documentation. 

#### Profile explorer
Use the Profile explorer to view all user data, including their event history, traits, and identifiers. With the Profile explorer, you have a complete view of your customers.

For more information about the Profile explorer, see the [Profile explorer](/docs/unify/#profile-explorer) documentation.