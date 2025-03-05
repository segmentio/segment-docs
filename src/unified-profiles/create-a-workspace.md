---
title: Create a New Segment Workspace
---

Twilio customers without an existing Segment workspace can create a new Segment workspace and a Unify space to share customer data with Twilio.

Your new Segment workspace must be on one of Segment’s [Customer Data Platform (CDP) plans](https://segment.com/pricing/customer-data-platform/){:target="_blank"}. To upgrade to a CDP plan, communicate with your sales contact or [request a demo](https://segment.com/demo/){:target="_blank"} from Segment's sales team.

To set up your Segment workspace and Unify space, you’ll complete the following steps: 

1. **Set up your Unify space**: Your Unify space acts as a central location for your Profiles, or collated information that you have for each of your customers.   
2. **Connect your Unify space to Twilio:** By connecting your Unify space to Twilio, you’ll start linking customer interaction history to your Profiles and begin enriching your customer profiles with information collected during customer interactions.   
3. **Add an additional data source to your workspace**: Import data into your Segment workspace from a business tool like a CRM or data warehouse, further enriching your customer data. 

Once you’ve connected your Unify space to Twilio, you can also add optional [business tools that Segment will receive data from](/docs/connections/sources/) or [forward data to](/docs/connections/destinations/), create [Computed Traits](/docs/unify/Traits/computed-traits/), which allows you to quickly create user or account-level calculations that Segment keeps up-to-date over time, and generate [Predictions](/docs/unify/traits/predictions/), which let you predict the likelihood that users will perform any event tracked in Segment. 

## Step 1: Set up your Unify space

Your Unify space acts as a central location for your Profiles, or the collated information that you have for each of your customers. 

Segment recommends connecting a development or sandbox Unify space to Twilio before creating a production Unify space.

To create a Segment Unify space:

1. In Segment, navigate to Unify and click **Create Space**.  
2. Enter a name for your space, select **Dev space**, then click **Create space**.  
3. Set identity rules for your space by clicking **Set identity rules**.  
4. Navigate to the settings for your Unify space and select API access.  
5. Copy the Segment Unify Space ID to a safe location, as you'll need this value to connect your Unify space to Twilio.  
6. Click **Generate Token**. Enter a name for your Profile API token, enter the password for your Twilio account, then click **Generate token**.  
7. Copy your Profile API token to a safe location and click the "I have written down this access token" checkbox, then click **Done**.

## Step 2: Connect your Unify space to Twilio

To connect your Unify space to Twilio, follow the [Connect your Segment space](https://www.twilio.com/docs/unified-profiles/segment-space){:target="_blank"} instructions in the Unified Profiles documentation.

Before leaving Segment, note the following information about your Segment workspace and Unify space:

- **Workspace ID**: Located in the [General Settings section](https://app.segment.com/goto-my-workspace/settings/basic) of your Segment workspace  
- **Workspace slug**: Located in the [General Settings section](https://app.segment.com/goto-my-workspace/settings/basic) of your Segment workspace  
- **Unify space slug**: Located in the address bar between `/spaces/` and `/explorer/`. For example: `app.segment.com/workspace-slug/unify/spaces/unify-space-slug/explorer`  
- **Unify space ID**: Located in the API access settings for your Unify space (**Unify > Unify settings > API access**)  
- **Profile API access token**: The access token you created in [Step 1: Set up your Unify Space](#step-1-set-up-your-unify-space).

## Step 3: Add a data source to your workspace

After you’ve successfully connected your Unify space to Twilio you must add a Source: a website, CRM, server library, mobile SDK, or cloud application that sends data into Segment. 

You can add a source to your workspace using one of the following methods: 

* **Use Case Onboarding**: Use Cases are pre-built Segment setup guides tailored to common business goals. Segment recommends that you set up your workspace using one of the [Personalize communications and product experiences use cases](/docs/getting-started/use-cases/guide/#personalize-communications-and-product-experiences), but you can select any of the use cases outlined on the [Choosing a Use Case](/docs/getting-started/use-cases/guide/) page.  
* **Manually add a data source:** If you have a data source in mind that you’d like to set up directly, you can do so by following the instructions in the [Manually add a data source](#manually-add-a-data-source) section. 

### Use Case Onboarding

At a high level, Segment’s onboarding flow walks you through the following steps: 

1. **Pick your business goal:** What do you want to achieve? Choose from 4 common business goals:  
   * Optimize advertising  
   * Personalize first conversion  
   * Boost retention, upsell, and cross-sell  
   * Personalize communications and product experiences.   
2. **Select a use case**: After you pick your business goal, Segment shows you several potential use cases from which to choose.  
3. **Follow the in-app guide**: After you’ve selected a use case, Segment shows you an interactive checklist of events to track, as well as sources and destinations that Segment recommends you connect. You’ll carry these steps out in a sandboxed development environment.  
4. **Test and launch your setup**: Push your connections to a production environment and verify that events flow as expected through the debugger. After you’re done, your Segment instance is up and running.

### Manually add a data source

To add a data source to your workspace:

1. Navigate to Connections and click **Add Source**.  
2. Select the source you’d like to add from the Source Catalog.   
3. Click **Add Source**.  
4. Enter a name for your source and complete any source-specific setup steps, then click **Add Source**.

Once you’ve created a source, the source is automatically enabled and can immediately receive events. You can review your new events in that source’s [Debugger](/docs/connections/sources/debugger/) tab.

## Connect additional business tools to Unify

After you've added a source of data, you can connect additional business tools to your Unify space. You can add data sources, or "sources" that flow data into Segment, and "destinations," the business tools or apps that Segment forwards your data to. 

For example, you can [add a CRM](https://app.segment.com/goto-my-workspace/sources/catalog?category=CRM), like Salesforce or Hubspot, as a data source to create rich, personalized support interactions for your agents in Twilio Flex, implement the [Analytics.js library on your website](https://app.segment.com/goto-my-workspace/sources/catalog?category=Website) to collect more granular data about the way your customers interact with your web properties, or [link your helpdesk](https://app.segment.com/goto-my-workspace/sources/catalog?category=Helpdesk) to your IVR workflow with Twilio Studio to gather a complete view of the reasons your customers are reaching out for support. If a data warehouse is your single source of truth about your customers, use [Reverse ETL](#set-up-reverse-etl) to import that data into Twilio to facilitate personalized interactions across your customer touchpoints, then use [Profiles Sync](#connect-a-warehouse-for-profiles-sync) to hydrate your Profiles with information gathered during customer interactions. 

### Connect a cloud app or library source

1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/sources/catalog/), select the business tool that you’re using as a source of data and click **Add Source**.  
2. Enter a name for your source, fill in any additional settings, and click **Add Source**.

### Set up Reverse ETL

Reverse ETL (Extract, Transform, Load) sources extract object and event data from a data warehouse using a query you provide and sync the data to your third party destinations. For example, with Reverse ETL, you can sync records from Snowflake, a data warehouse, to Flex, a digital engagement center solution. Reverse ETL supports customer profile data, subscriptions, product tables, shopping cart tables, and more.

To extract customer data from your warehouse, you must: 

1. [**Add a Reverse ETL source:**](#add-a-reverse-etl-source) You can use your Azure, BigQuery, Databricks, Postgres, Redshift, or Snowflake data warehouse as a data source.   
2. [**Add a Segment Profiles destination**](#add-a-segment-profiles-destination): When you connect a Segment Profiles destination to your Reverse ETL source, you can send your warehouse data back to Segment to create and update [Profiles](/docs/profiles/) that can then be accessed through the [Profile API](/docs/profiles/profile-api/) and activated through [Unified Profiles](https://www.twilio.com/docs/unified-profiles).

#### Add a Reverse ETL source

1. In the [Reverse ETL section of the Sources catalog](https://app.segment.com/goto-my-workspace/sources/catalog?category=Reverse%20ETL), select your data warehouse and click **Add Source**.  
2. Give your source a name and enter the credentials for a user with read and write access to your database.  
3. Click **Test Connection**. If Segment can successfully connect to your warehouse, click **Add Source**.  
4. On the Models page, click **Add Model**.  
5. Select SQL Editor and click **Next**.  
6. Create a SQL query that defines your model. After you've created a model, Segment uses your model to map data to your Reverse ETL destinations.   
7. Click **Preview** to return 10 records from your warehouse. When you've verified that your records return as expected, click **Next**.  
8. Enter a name for your SQL model and click **Create Model**.

#### Add a Segment Profiles destination

Create a Segment Profiles destination to add a mapping to your Reverse ETL source.

1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/destinations/catalog/actions-segment-profiles), select the Segment Profiles destination and click **Add destination**.  
2. On the Choose Data Source page, select your data source you set up in the previous steps and click **Next**.  
3. Enter a name for your destination and click **Create destination**.  
4. On the Mappings tab, click **Add Mapping**.  
5. Search for the model you created when you added your Reverse ETL source, select **Send Identify** and click **Create Mapping**.  
6. You're redirected to the Edit Mapping page. Under the Select mappings section, map event fields from your data source to the pre-filled values that Segment expects to receive. Add additional traits by entering your properties and event names in the Traits section. Clicking into an event field lets you search your destination's record fields.  
     
   **(Optional)**: To test your mapping, click the **Test Mapping** button.  
     
7. When you've finished mapping all relevant event fields and verified that your test record contains all of the relevant user information, click **Save Mapping.**  
8. You're returned to the Mappings page for your Segment Profiles destination. Under the Mapping status column, enable the mapping you created in the previous step.

### Connect a warehouse for Profiles Sync

Profiles Sync connects identity-resolved customer profiles to a data warehouse of your choice.

To set up Profiles Sync, complete the instructions in the [Set up Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/) documentation. 

## Optional: Create Computed Traits and Predictions

After linking your customer data to Twilio through a Unify space, you can set up [computed traits](#computed-traits) and [Predictions](#predictions) to better understand your users.

> warning "Flex customers must complete an interaction in Flex before creating computed traits in Segment"
> Before you can create computed traits in Segment, you must connect your Unify space to Flex and then complete a customer interaction in Flex.

### Computed traits

[Computed traits](/docs/unify/traits/computed-traits) allow you to quickly create user or account-level calculations that Segment keeps up-to-date over time. These computations are based on the events and event properties that you are sending through Segment.

To create a computed trait:

1. Navigate to the Unify space you linked to Twilio and click **Traits**.  
2. Click **Create computed trait**.  
3. Select the type of event you'd like to create and click **Next**.  
4. Select an event to be the base of your computed trait.  
5. Add conditions and an optionally, an event property.  
- **Conditions**: These restrict the messages considered when calculating the final value of a computed trait. For more information, see the [Conditions](/docs/unify/traits/computed-traits/#conditions) documentation.  
- **Event properties**: These refine the computed traits to include only the specified properties.  
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button.  
7. When you've verified that your trait contains at least one member, click **Next**.  
8. On the Select Destinations page, don't add a destination. Instead, click **Next**.  
9. Enter a name for your trait and click **Create Trait**.

#### Computed Traits for Flex

Segment recommends the following computed traits created using Flex customer interaction data:

- [Total inbounds](#total-inbounds): Number of inbound attempts resulting in customer engagement  
- [Frequent inbound channel](#frequent-inbound-channel): Identifies the user's most frequently used channel of communication

Other computed traits that might be helpful include:

- [Total outbounds](#total-outbounds): Number of outbound attempts resulting in customer engagement  
- [Last known service agent](#last-known-service-agent): Identifies the last agent to allow connecting to the same agent  
- [Last interaction duration](#last-interaction-duration): The duration (in seconds) of the customer's last interaction with an agent  
- [Sentiment in last interaction](#sentiment-in-last-interaction): AI-inferred sentiment in last interaction

#### Total inbounds

Create an Event counter trait based on the "Flex - Engagement Initiated" event and add the following:

- **Event property**: direction  
- **Operator**: equals  
- **Value**: Inbound

#### Frequent inbound channel

Create a Most frequent trait based on the "Flex - Engagement Initiated" event and add the following:

- **Event property**: direction  
- **Operator**: equals  
- **Value**: Inbound

Add the following event property:

- **Event property**: channelType  
- **Value**: Text

And add a Minimum frequency of 2.

#### Total outbounds

Create an Event counter trait based on the "Flex - Engagement Initiated" event and add the following:

- **Event property**: direction  
- **Operator**: equals  
- **Value**: Outbound

#### Last known service agent

Create a Last trait based on the "Flex - Engagement Initiated" event and add the following:

- **Event property**: lastKnownAgentWorkerSid  
- **Value**: Text

#### Last interaction duration

Create a Last trait based on the "Flex - Engagement Initiated" event and add the following:

- **Event property**: duration  
- **Value**: Number(100)

##### Sentiment in last interaction

Create a Last trait based on the "Flex - Engagement Completed" event and add the following:

- **Event property**: sentiment  
- **Value**: Text

If you have the [Twilio Engage add on](https://segment.com/pricing/customer-data-platform/){:target="_blank”}, you can use [Audiences](/docs/engage/audiences/) to build a cohort of Profiles that all share a computed trait. 

For example, you could personalize the marketing your customers receive by creating an Audience of the Profiles that have a frequent inbound channel computed trait of `email` and sending those customers a promotion over email for your newest product. 

### Predictions

[Predictions](/docs/unify/traits/predictions/), Segment’s artificial intelligence and machine learning feature, lets you predict the likelihood that users will perform any event tracked in Segment. With Predictions, you can identify users with, for example, a high propensity to purchase, refer a friend, or use a promo code. Predictions also lets you predict a user’s lifetime value (LTV).

Segment recommends that you select the following Predictions for Unified Profiles:

- [Likelihood to Churn](/docs/unify/traits/predictions/#likelihood-to-churn)  
- [Predicted Lifetime Value](/docs/unify/traits/predictions/#predicted-lifetime-value)

For more information about Predictions, see the [Predictions FAQ](/docs/unify/traits/predictions/using-predictions/#faqs) and [Predictions Nutrition Facts Label](/docs/unify/traits/predictions/predictions-nutrition-facts/).

## Troubleshooting

You can use the following tools to debug issues you may encounter while configuring your Segment resources for Unified Profiles.

### Source debugger

The Source debugger is a real-time tool that helps you confirm that API calls made from your website, mobile app, or servers arrive at your Segment source, so you can troubleshoot your Segment connections. With the debugger, you can check that calls are sent in the expected format without having to wait for any data processing.

For more information about the Source debugger, see the [Source debugger](/docs/connections/sources/debugger) documentation.

### Delivery Overview

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues for any cloud-streaming destination receiving events from cloud-streaming sources.

For more information about Delivery Overview, see the [Delivery Overview](/docs/connections/delivery-overview/) documentation. 

### Profile explorer

Use the Profile explorer to view all user data, including their event history, traits, and identifiers. With the Profile explorer, you have a complete view of your customers.

For more information about the Profile explorer, see the [Profile explorer](/docs/unify/#profile-explorer) documentation.
