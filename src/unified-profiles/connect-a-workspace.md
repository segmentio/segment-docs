---
title: Connect an Existing Segment Workspace
---

If you already have a Segment workspace, you can use a new or pre-existing [Segment Unify space](/docs/unify/quickstart/) to connect your customer data to Unified Profiles.

Your new Segment workspace must be on one of Segment’s [Customer Data Platform (CDP) plans](https://segment.com/pricing/customer-data-platform/){:target="_blank"}. To upgrade to a CDP plan, communicate with your sales contact or [request a demo](https://segment.com/demo/){:target="\_blank"} from Segment's sales team.

## Step 1: Set up your Unify space

> success ""
> This section is about setting up a new Segment Unify space to link to Twilio. If you have an existing Segment Unify space you'd like to use, proceed directly to [Connect your Unify space to Twilio](#step-2-connect-your-unify-space-to-twilio).

Your Unify space acts as a central location for your Profiles, or collated information that you have for each of your customers. 

Segment recommends connecting a development or sandbox Unify space to Twilio before creating a production Unify space.

To create a Segment Unify space:

1. In Segment, navigate to **Unify** and click **Create Space**.  
2. Enter a name for your space, select **Dev space**, then click **Create space**.  
3. Click **Set identity rules** to set identity rules for your space.  
4. Navigate to the settings of your Unify space and select **API access**.  
5. Copy the Segment Unify Space ID to a safe location, as you'll need this value to connect your Unify space to Twilio.  
6. Click **Generate Token**. Enter a name for your Profile API token, enter the password for your Twilio account, then click **Generate token**.  
7. Copy your Profile API token to a safe location and click the *I have written down this access token* checkbox, then click **Done**.

## Step 2: Connect your Unify space to Twilio

To connect your Unify space to Twilio, follow the [Set up your Segment space](https://www.twilio.com/docs/unified-profiles/segment-space){:target="_blank"} instructions in the Unified Profiles documentation. 

By connecting your Unify space to Twilio, you can create a Unified Profiles Service and can use Unified Profiles in Flex and Studio. 

Before leaving Segment, note the following information about your Segment workspace and Unify space:

- **Workspace ID**: Located in the [General Settings section](https://app.segment.com/goto-my-workspace/settings/basic) of your Segment workspace  
- **Workspace slug**: Located in the [General Settings section](https://app.segment.com/goto-my-workspace/settings/basic) of your Segment workspace  
- **Unify space slug**: Located in the address bar between `/spaces/` and `/explorer/`. For example: `app.segment.com/workspace-slug/unify/spaces/unify-space-slug/explorer`  
- **Unify space ID**: Located in the API access settings for your Unify space (**Unify > Unify settings > API access**)  
- **Profile API access token**: Either the access token you created in [Step 1: Set up your Unify Space](#step-1-set-up-your-unify-space), or for existing Unify spaces, a [new token](/docs/unify/profile-api/#configure-access).

Twilio Flex customers have their Flex interactions added to Unify as a customer data source. The customer interactions automatically update the Profiles you have for each of your customers. 

Twilio Studio customers have profile read access through the [Search for a Profile](https://www.twilio.com/docs/studio/widget-library/search-for-a-profile){:target="_blank"} widget and profile write access using [Update Profile Traits](https://www.twilio.com/docs/studio/widget-library/update-profile-traits){:target="_blank"} widget for chatbot and IVR workflows.  

## Step 3: Connect additional customer data sources to Unify

After you've connected your Unify space to Twilio, you can connect additional data sources to your Segment workspace. For example, you can [add a CRM](https://app.segment.com/goto-my-workspace/sources/catalog?category=CRM), like Salesforce or Hubspot, as a data source to create rich, personalized support interactions for your agents in Twilio Flex, implement the [Analytics.js library on your website](https://app.segment.com/goto-my-workspace/sources/catalog?category=Website) to collect more granular data about the way your customers interact with your web properties, or [link your helpdesk](https://app.segment.com/goto-my-workspace/sources/catalog?category=Helpdesk) to your IVR workflow with Twilio Studio to gather a complete view of the reasons your customers are reaching out for support. If a data warehouse is your single source of truth about your customers, use [Reverse ETL](#set-up-reverse-etl) to import that data into Twilio to facilitate personalized interactions across your customer touchpoints, then use [Profiles Sync](#connect-a-warehouse-for-profiles-sync) to hydrate your Profiles with information gathered during customer interactions.  
   
> success ""
> This section is about setting up sources and destinations to link to your Unify space. If you have an existing Segment Unify space with these connections that you'd like to use, proceed directly to [Optional: Create computed traits and Predictions](#optional-create-computed-traits-and-predictions).

### Connect a cloud app or library source
To connect a cloud app or library source: 
1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/sources/), select your preferred business tool and click **Add Source**.  
2. Enter a name for your source, fill in any additional settings, and click **Add Source**.

### Set up Reverse ETL

Reverse ETL (Extract, Transform, Load) sources extract object and event data from a data warehouse using a query you provide and sync the data to your third party destinations. For example, with Reverse ETL, you can sync records from Snowflake, a data warehouse, to Flex, a digital engagement center solution. Reverse ETL supports customer profile data, subscriptions, product tables, shopping cart tables, and more.

To extract customer data from your warehouse, you must: 

1. [**Add a Reverse ETL source:**](#add-a-reverse-etl-source) You can use your Azure, BigQuery, Databricks, Postgres, Redshift, or Snowflake data warehouse as a data source.   
2. [**Add a Segment Profiles destination**](#add-a-segment-profiles-destination): When you connect a Segment Profiles destination to your Reverse ETL source, you can send your warehouse data back to Segment to create and update [Profiles](/docs/profiles/) that can then be accessed through the [Profile API](/docs/profiles/profile-api/) and activated within [Unified Profiles](https://www.twilio.com/docs/unified-profiles){:target="_blank"}.

#### Add a Reverse ETL source
To add a Reverse ETL source:
1. In the [Reverse ETL section of the Sources catalog](https://app.segment.com/goto-my-workspace/sources/catalog?category=Reverse%20ETL), select your preferred data warehouse and click **Add Source**.  
2. Give your source a name and enter the credentials for a user with read and write access to your database.  
3. Click **Test Connection**. If Segment can successfully connect to your warehouse, click **Add Source**.  
4. On the Models page, click **Add Model**.  
5. Select SQL Editor and click **Next**.  
6. Create a SQL query that defines your model. After you've created a model, Segment uses your model to map data to your Reverse ETL destinations.   
7. Click **Preview** to return 10 records from your warehouse. When you've verified that your records return as expected, click **Next**.  
8. Enter a name for your SQL model and click **Create Model**.

#### Add a Segment Profiles destination

Create a Segment Profiles destination to add a mapping to your Reverse ETL source. To add a Segment Profiles destination: 

1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/destinations/catalog/actions-segment-profiles), select the Segment Profiles destination and click **Add destination**.  
2. On the **Choose Data Source** page, select your data source you set up in the previous steps and click **Next**.  
3. Enter a name for your destination and click **Create destination**.  
4. On the **Mappings** tab, click **Add Mapping**.  
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
5. Add conditions and optionally, an event property.  
- **Conditions**: These restrict the messages considered when calculating the final value of a computed trait. For more information, see the [Conditions](/docs/unify/traits/computed-traits/#conditions) documentation.  
- **Event properties**: These refine the computed traits to include only the specified properties.  
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button.  
7. When you've verified that your trait contains at least one member, click **Next**.  
8. On the **Select Destinations** page, don't add a destination. Instead, click **Next**.  
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

If you have the [Twilio Engage add-on](https://segment.com/pricing/customer-data-platform/){:target="_blank"}, you can use [Audiences](docs/engage/audiences/) to build a cohort of Profiles that all share a computed trait. 

For example, you could personalize the marketing your customers receive by creating an Audience of the Profiles that have a frequent inbound channel computed trait of `email` and sending those customers a promotion over email for your newest product. 

## Predictions

[Predictions](/docs/unify/traits/predictions/), Segment’s artificial intelligence and machine learning feature, lets you predict the likelihood that users will perform any event tracked in Segment. With Predictions, you can identify users with, for example, a high propensity to purchase, refer a friend, or use a promo code. Predictions also lets you predict a user’s lifetime value (LTV).

Segment recommends that you select the following Predictions for Unified Profiles:

- [Likelihood to Churn](/docs/unify/traits/predictions/#likelihood-to-churn)  
- [Predicted Lifetime Value](/docs/unify/traits/predictions/#predicted-lifetime-value)

For more information about Predictions, see the [Predictions FAQ](/docs/unify/traits/predictions/using-predictions/#faqs) and [Predictions Nutrition Facts Label](/docs/unify/traits/predictions/predictions-nutrition-facts/).

## Troubleshooting

You can use the following tools to debug issues you may encounter while configuring your Segment resources for Unified Profiles.

### Source debugger

The Source debugger is a real-time tool that helps you confirm that API calls made from your website, mobile app, or servers arrive at your Segment source, so you can troubleshoot your Segment connections. With the debugger, you can check that calls send in the expected format without having to wait for any data processing.

For more information about the Source debugger, see the [Source debugger](/docs/connections/sources/debugger) documentation.

### Delivery Overview

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues for any cloud-streaming destination receiving events from cloud-streaming sources.

For more information about Delivery Overview, see the [Delivery Overview](/docs/connections/delivery-overview/) documentation. 

### Profile explorer

Use the Profile explorer to view all user data, including their event history, traits, and identifiers. With the Profile explorer, you have a complete view of your customers.

For more information about the Profile explorer, see the [Profile explorer](/docs/unify/#profile-explorer) documentation.