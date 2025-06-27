---
title: Amazon Conversions API (Actions) Destination
id: 683ef14a3f9aac157e3a3446
hide-personas-partial: true
hide-boilerplate: false
hide-dossier: true
private: true
hidden: true
beta: true

---
The Amazon Conversions API (Actions) destination is a server-to-server integration with the Amazon Events API. This destination allows advertisers to send real-time or offline conversion events data from Segment directly to Amazon without needing Amazon Ad Tag (AAT) setup. 

This enables advertisers to evaluate the effectiveness of their Amazon marketing campaigns regardless of the location of the conversion and utilize this information to drive campaign optimization. The Events API can help strengthen performance and decrease cost per action with more complete attribution, improved data reliability, and better optimized delivery.

## Benefits of Amazon Conversions API (Actions)

The Amazon Conversions API destination provides the following benefits:

- **Simplified setup**. Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer data mapping**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to the Amazon Conversions API.
- **Prebuilt event mappings**. Standard events like `Add to Shopping Cart` and `Checkout` come preconfigured with recommended parameters.
- **Multiple event types**. Support for various conversion event types including purchases, sign-ups, leads, and more.
- **Multi-platform support**. Send events from websites, Android apps, iOS apps, Fire TV, or offline sources.
- **Comprehensive user matching**. Multiple matching keys are available including email, phone, name, address, and mobile advertising IDs.
- **Data normalization**. Data is normalized before it's hashed to send to Amazon Conversions.
- **Custom attributes**. Includes additional context with event-specific attributes.
- **Consent management**. Built-in support for various privacy frameworks including Amazon consent options, TCF, and GPP.

## Getting started

Before connecting to the Amazon Conversions API destination, you must have an [Amazon Advertising account](https://advertising.amazon.com/API/docs/en-us/guides/onboarding/overview){:target="_blank"} and an Advertiser ID.

To connect the Amazon Conversions API Destination:

1. From the Segment web app, go to **Connections > Catalog**.
2. Search for **Amazon Conversions Api** in the top right corner.
3. From the search results under **Destinations**, select the **Amazon Conversions Api** destination and then click **Add destination**
4. Select the source that will send data to the Amazon Conversions API destination and follow the prompts to name your destination.
5. On the **Basic Settings** page, enter:
   - Destination name
   - **Region:** - Select North America (NA), Europe (EU), or Far East (FE) based on your Amazon Advertising account
   - **Amazon Advertiser ID:** - Your Amazon Advertising Account ID
6. Authenticate using OAuth when prompted.
7. Go to the **Mappings** tab. Prebuilt mappings, like `Checkout`, `Search`, and `Add to Shopping Cart`, include predefined parameters.
8. To create a new mapping:
   - Click **New Mapping** and select **Track Conversion**.
   - Configure and enable the mapping.
9. Follow the steps in [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings).
10. Toggle **Enable Destination** on, then click **Save Changes**.

{% include components/actions-fields.html settings="true"%}

> info "Event Action Source"
> By default, Segment sends all mappings as `website` conversions. To send events from mobile apps, Fire TV, or offline sources, set the Event Action Source in each mapping to the appropriate value: `android`, `ios`, `fire_tv`, or `offline`.

## Supported event types

Amazon Conversions API supports the following standard event types:

| Event Type | Description |
| ---------- | ----------- |
| ADD_TO_SHOPPING_CART | When a user adds an item to their shopping cart |
| APPLICATION | When a user submits an application |
| CHECKOUT | When a user initiates a checkout process |
| CONTACT | When a user submits contact information |
| LEAD | When a user perform an action that initiates a sales lead |
| OFF_AMAZON_PURCHASES | When a user completes a purchase |
| MOBILE_APP_FIRST_START | When a user opens a mobile app for the first time |
| PAGE_VIEW | When a user views a page |
| SEARCH | When a user performs a search |
| SIGN_UP | When a user creates an account |
| SUBSCRIBE | When a user subscribes to a service |
| OTHER | For custom events that don't fit into the standard types |

## Match keys for user identification

Amazon requires at least one match key to identify the user associated with each conversion event. Amazon Conversions API supports the following match keys:

| Match Key | Description |
| --------- | ----------- |
| email | User's email address (is hashed) |
| phone | User's phone number (is hashed) |
| firstName | User's first name (is hashed) |
| lastName | User's last name (is hashed) |
| address | User's street address (is hashed) |
| city | User's city (is hashed) |
| state | User's state (is hashed) |
| postalCode | User's postal code (is hashed) |
| maid | Mobile advertising ID (ADID, IDFA, or FIREADID) |
| rampId | RAMP ID for attribution to traffic events |
| matchId | Match ID is an anonymous opaque unique identifier that represents a user on an advertiser’s system, like loyalty membership ID and order ID. With Match ID, advertisers can accurately track campaign performance without sharing customer data to Amazon like hashed email/phone while navigating complex customer journeys that spans multiple channels and devices. The advertisers implementing Amazon Advertising Tag (AAT) on their website can send match_id as an attribute along with the online events. Amazon matches this to users via cookies or hashed PII. When these users convert offline, advertisers can report it through Conversions API (CAPI) using the same match_id |

Segment automatically maps these fields from standard identity traits when available.

## Consent management

For EU advertisers and users, Amazon requires consent information to be included with conversion events. The Amazon Conversions API supports several consent mechanisms.

### Geographic consent (IP Address)

For basic consent management, include the user's IP address. Segment automatically maps this from the context.ip field when available.

### Amazon consent format

Amazon-specific consent format with two primary fields:

| Consent Field | Description | Values |
| ------------- | ----------- | ------ |
| amznAdStorage | Whether the user has consented to cookie-based tracking | GRANTED, DENIED |
| amznUserData | Whether the user has consented to use personal data for advertising | GRANTED, DENIED |

### Industry standard consent

For more comprehensive consent management:

| Consent Field | Description |
| ------------- | ----------- |
| tcf | Transparency and Consent Framework (TCF) encoded string |
| gpp | Global Privacy Platform (GPP) encoded string |

## Data processing options

The Amazon Conversions API supports data processing options to control how events are processed:

| Option | Description |
| ------ | ----------- |
| LIMITED_DATA_USE | Signals that an event should be processed with limited data use restrictions. Events marked with this option won't be used for advertising purposes. |

## Custom attributes

You can include custom attributes with your events to provide additional context. Each custom attribute has:

- **Name**: Identifier for the attribute (only letters, numbers, and underscores allowed)
- **Data Type**: STRING, NUMBER, or BOOLEAN
- **Value**: The attribute value (maximum 256 characters)

## FAQ

#### How does deduplication work?

Amazon Conversions API uses the `clientDedupeId` field to prevent duplicate events. By default, Segment maps the messageId to this field. For events with the same clientDedupeId, only the latest event will be processed. Please be advised that deduplication occurs across all event types, rather than being limited to individual event types.

#### What regions are supported?

Amazon Conversions API supports three regions:
- North America (NA)
- Europe (EU)
- Far East (FE)

Select the region that corresponds to your Amazon Advertising account.

#### What are the requirements for OFF_AMAZON_PURCHASES events?

OFF_AMAZON_PURCHASES events have additional optional fields:
- `currencyCode`: The currency of the purchase in ISO-4217 format (e.g., USD, EUR)
- `unitsSold`: The number of items purchased (defaults to 1 if not provided)

#### How are PII fields handled?

Personally identifiable information (PII) fields like email, phone, name, and address are automatically hashed before sending to Amazon.

#### How can I verify events in Amazon?

After you start sending events, you should see them in your Amazon Advertising dashboard under conversion tracking reports. Allow some time for the events to be processed and attributed.

#### Which advertising accounts can access Amazon Conversions API?

- Self-Service (SS) Accounts: Yes
- Managed Service (MS) Accounts: No
- Manager Accounts (MA): Not yet, but we can add if there is enough demand

#### I am an advertiser on Amazon Demand Side Platform. My agency cannot provide access to their entity as they manage other clients. How do I get access to a specific advertiser account?

- **Option 1**: 
1. Ask the agency to provide access to the specific advertiser account (where they wish to run your campaigns) within their agency. Events Manager must be given ‘View and Edit’ permission. Please see help article [here](https://advertising.amazon.com/help/G3ZZ6ZXQWG34DPPM){:target="_blank"}. 
2. Use the Amazon Conversions API to send data to the specific account they have been given access to in step #1.
- **Option 2**: [Not a supported pattern via Segment yet] Upload your data directly to Manager Account. You will see the data in Data Manager. You can then share the data from Data Manager to other advertiser accounts linked to the Manager Account. Learn more [here](https://advertising.amazon.com/API/docs/en-us/adm/1_ads-data-manager-console-overview){:target="_blank"}.
