---
title: Create a New Segment Workspace
hidden: true
---

Flex customers without an existing Segment workspace can create a new Segment workspace and a Unify space to share customer data with Twilio. 

Your new Segment workspace must be on the Business Tier plan with a Unify Plus entitlement. To upgrade to the Business Tier plan, communicate with your sales contact or [request a demo](https://segment.com/demo/){:target="_blank"} from Segment's sales team.

<!--- Oneclick not included in this release ## Sign up for a Unify space
1. From the **Welcome to Segment Unify** page, click **Get Started**. 
2. Sign up for a Segment account with your Twilio credentials by clicking **Sign up with my Twilio credentials**. On the Welcome to Segment popup, click **Continue**. 
3. On the What would you like to do first? page, select either **Explore demo data in a test space** or **Setup a production space with my own data**. --->

## Prerequisites

## Step 1: Create a Unify space

Segment recommends creating a development or sandbox Unify space, verifying that your profiles appear as you would expect, and then creating a production Unify space.

In order to create a Segment Unify space, your Segment workspace must be on the Business Tier plan with a Unify Plus entitlement. To upgrade to the Business Tier plan, communicate with your sales contact or [request a demo](https://segment.com/demo/){:target="_blank"} from Segment's sales team.

To create a Segment Unify space:

1. In Segment, navigate to Unify and click **Create Space**. 
2. Enter a name for your space, select **Dev space**, then click **Create space**.
3. Set identity rules for your space by clicking **Set identity rules**.
4. Connect a source to your Unify space by clicking **Connect sources**.
5. Verify that your profiles appear as expected. When you're confident in the data quality of your profiles, repeat steps 1-4 to create a `prod` space. 
6. After creating your `prod` space, navigate to the settings for your Unify space and select API access. 
7. Copy the Segment Unify Space ID to a safe location, as you'll need this value to connect your Unify space to Twilio Flex.
8. Click **Generate Token**. Enter a name for your Profile API token, enter the password for your Segment account, then click **Generate token**. 
9. Copy your Profile API token to a safe location and click the "I have written down this access token" checkbox, then click **Done**. 

## Step 2: Connect your Unify space to Flex

To connect your Unify space to Flex, follow the [Connect an existing Segment Unify space](https://www.twilio.com/docs/flex/admin-guide/setup/unified-profiles/setup/unify-space){:target="_blank"} instructions in the Flex documentation.  

Before leaving Segment, note the following information about your Segment workspace and Unify space:

- **Workspace ID**: Located in the [General Settings section](https://app.segment.com/goto-my-workspace/settings/basic){:target="_blank"} of your Segment workspace
- **Workspace slug**: Located in the [General Settings section](https://app.segment.com/goto-my-workspace/settings/basic){:target="_blank"} of your Segment workspace
- **Unify space slug**: Located in the address bar between `/spaces/` and `/explorer/`. For example: `app.segment.com/workspace-slug/unify/spaces/unify-space-slug/explorer`
- **Unify space ID**: Located in the API access settings for your Unify space (**Unify > Unify settings > API access**)
- **Profile API access token**: Either the access token you created in [Step 1: Set up your Unify Space](#step-1-set-up-your-unify-space), or for existing Unify spaces, a [new token](/docs/unify/profile-api/#configure-access){:target="_blank"}

## Step 3: Connect your data to Unify
After you've created a Unify space and connected it to Flex, you must return to the Segment app to connect a Salesforce CRM source, a data warehouse, and a Segment Profiles destination to your Unify space to send your customers' data to Unified Profiles.

> success ""
> This section is about setting up a Salesforce source, RETL source, and a Segment Profiles destination to link to your Unify space. If you have an existing Segment Unify space with these connections that you'd like to use, proceed directly to [Step 4: Create Computed Traits and Predictions](#step-4-create-computed-traits-and-predictions).

### Set up Salesforce
1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/sources/catalog/salesforce){:target="_blank"}, select the Salesforce source and click **Add Source**. 
2. Enter a name for your Salesforce source and click **Authenticate**. 
3. You are redirected to the Salesforce login page. Sign in with a username and password of a user that has _View all Permissions_ access. 
4. You are redirected to the Permissions Verified page in Segment. Click **Next**.
5. On the SQL Schema name page, review the schema name and SQL query used to create the schema, then click **Next**. 
6. You've connected Salesforce. Click the **Do it later** button and continue to [Connect a data warehouse ](#connect-a-data-warehouse).

### Connect a data warehouse
1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/destinations/catalog?category=Storage){:target="_blank"}, search for and select a BigQuery, Postgres, Redshift, or Snowflake destination.
2. On the Choose Data Source page, select the Salesforce source you set up in the previous step and click **Next**. 
3. Give your data warehouse destination a name and enter the credentials for a user with read and write access to your database. Click **Connect**. 
4. Review the information on the Next Steps screen and click **Done**.

> info ""
> Segment's initial sync with your data warehouse might take up to 24 hours to complete.

### Add a Reverse ETL source
Reverse ETL (Extract, Transform, Load) sources extract object and event data from a data warehouse using a query you provide and sync the data to your third party destinations. For example, with Reverse ETL, you can sync records from Snowflake, a data warehouse, to Flex, a digital engagement center solution. Reverse ETL supports customer profile data, subscriptions, product tables, shopping cart tables, and more.

Unified Profiles supports Postgres, Snowflake, Redshift, and BigQuery Reverse ETL sources.

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

### Add a Segment Profiles destination

Create a Segment Profiles destination to add a mapping to your Reverse ETL source.

1. From the [catalog page in your workspace](https://app.segment.com/goto-my-workspace/destinations/catalog/actions-segment-profiles){:target="_blank"}, select the Segment Profiles destination and click **Add destination**.
2. On the Choose Data Source page, select the Salesforce source you set up in the previous step and click **Next**.
3. Enter a name for your destination and click **Create destination**.
4. On the Mappings tab, click **Add Mapping**.
5. Search for the model you created when you added your Reverse ETL source, select **Send Identify** and click **Create Mapping**.
6. You're redirected to the Edit Mapping page. Under the Select mappings section, map event fields from your data source to the pre-filled values that Segment expects to receive. Add additional traits by entering your properties and event names in the Traits section. Clicking into an event field lets you search your destination's record fields.<br> **(Optional)**: To test your mapping, click the **Test Mapping** button. 
7. When you've finished mapping all relevant event fields and verified that your test record contains all of the relevant user information, click **Save Mapping.**
8. You're returned to the Mappings page for your Segment Profiles destination. Under the Mapping status column, enable the mapping you created in the previous step.

## Step 4: Create Computed Traits and Predictions

After linking your customer data to Flex through a Unify space, you can set up [computed traits](#computed-traits) and [Predictions](#predictions) to better understand your users. 

> warning "Complete an interaction in Flex before creating computed traits in Segment"
> Before you can create computed traits in Segment, you must connect your Unify space to Flex and then complete a customer interaction in Flex. 

### Computed traits
[Computed traits](/docs/unify/traits/computed-traits){:target="_blank"} allow you to quickly create user or account-level calculations that Segment keeps up-to-date over time. These computations are based on the events and event properties that you are sending through Segment. 

To create a computed trait:
1. Navigate to the Unify space you linked to Flex and click **Traits**. 
2. Click **Create computed trait**. 
3. Select the type of event you'd like to create and click **Next**. 
4. Select an event to be the base of your computed trait.
5. Add conditions and an optionally, an event property.
  - **Conditions**: These restrict the messages considered when calculating the final value of a computed trait. For more information, see the [Conditions](/docs/unify/traits/computed-traits/#conditions){:target="_blank"} documentation.
  - **Event properties**: These refine the computed traits to include only the specified properties. 
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**. 

Segment recommends that you configure the following computed traits for Unified Profiles:
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

<!--- As of 2/28/24 - these traits are not supported for Q1 release
#### Common request
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

#### Last interaction topic
1. Navigate to the Unify space you linked to Flex and click **Traits**.
3. Select **Last** and click **Next**. 
4. Select the "Flex - Wrap Up Completed" event.
5. Add an event property "topic" with a value "Text".
6. Verify that your trait contains at least one member by clicking the **Preview Trait** button. 
7. When you've verified that your trait contains at least one member, click **Next**.
8. On the Select Destinations page, don't add a destination. Instead, click **Next**. 
9. Enter a name for your trait and click **Create Trait**.
--->

### Predictions
[Predictions](/docs/unify/traits/predictions/){:target="_blank"}, Segment’s artificial intelligence and machine learning feature, lets you predict the likelihood that users will perform any event tracked in Segment. With Predictions, you can identify users with, for example, a high propensity to purchase, refer a friend, or use a promo code. Predictions also lets you predict a user’s lifetime value (LTV).

Segment recommends that you select the following Predictions for Unified Profiles: 
- [Likelihood to churn](/docs/unify/traits/predictions/#likelihood-to-churn){:target="_blank"}
- [Predicted Lifetime value](/docs/unify/traits/predictions/#predicted-lifetime-value){:target="_blank"}

For more information about Predictions, see the [Predictions FAQ](/docs/unify/traits/predictions/using-predictions/#faqs){:target="_blank"} and [Predictions Nutrition Label](/docs/unify/traits/predictions/predictions-nutrition-facts/){:target="_blank"}.

## Troubleshooting
You can use the following tools to debug issues you may encounter while configuring your Segment resources for Unified Profiles.

### Source debugger
The Source debugger is a real-time tool that helps you confirm that API calls made from your website, mobile app, or servers arrive to your Segment source, so you can troubleshoot your Segment connections. With the debugger, you can check that calls are sent in the expected format without having to wait for any data processing.

For more information about the Source debugger, see the [Source debugger](/docs/connections/sources/debugger){:target="_blank"} documentation. 

### Profile explorer
Use the Profile explorer to view all user data, including their event history, traits, and identifiers. With the Profile explorer, you have a complete view of your customers.

For more information about the Profile explorer, see the [Profile explorer](/docs/unify/#profile-explorer){:target="_blank"} documentation.

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