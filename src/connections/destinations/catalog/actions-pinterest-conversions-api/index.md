---
title: Pinterest Conversions API
id: 63e42e512566ad7c7ca6ba9b
hide-personas-partial: true
hide-boilerplate: false
hide-dossier: true
private: false
hidden: false

---
The Pinterest Conversions API destination is a server-to-server integration with [the Pinterest API for Conversions](https://help.pinterest.com/en/business/article/the-pinterest-api-for-conversions){:target="_blank"}. This destination allows advertisers to send conversion events directly to Pinterest without needing a Pinterest tag. These conversions map to Pinterest campaigns for more accurate conversion reporting and improved visibility.

Advertisers can send web, in-app, or offline conversions to Pinterest’s server in real time. Events received within an hour of occurring are reported as web or app events. Events received later, including batch-delayed events, are categorized as offline conversions.

Using the Pinterest API for conversions alongside the [Pinterest tag](https://help.pinterest.com/en/business/article/install-the-pinterest-tag){:target="_blank"} provides a more complete view of campaign performance.

## Benefits of Pinterest Conversions API (Actions)

The Pinterest Conversions API destination provides the following benefits:

- **Simplified setup**. Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer data mapping**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to the Pinterest Conversions API.
- **Prebuilt event mappings**. Standard events like `Add to Cart` come preconfigured with recommended parameters.
- **Deduplication support**. Prevents duplicate events and improving conversion accuracy.
- **Page call support**. You can send [Page calls](/docs/connections/spec/page/) to Pinterest as a standard Page View.
- **Multi-user array support**. User data nested within arrays, like the `User Data` array in the `Order Completed` event, can be sent to Pinterest.
- **Data normalization**. Data is normalized before it's hashed to send to Pinterest Conversions.

## Getting started

Before connecting to the Pinterest Conversions destination, you must have a [Pinterest](https://ads.pinterest.com/login/){:target="_blank"} account and an Ad Account ID.

To connect the Pinterest Conversions API Destination:

1. From the Segment web app, go to **Connections > Catalog**.
2. Search for **Pinterest Conversions API** in the Destinations Catalog and select the destination.
3. Click **Configure Pinterest Conversions API**.
4. Select the source that will send data to Pinterest Conversions API and follow the prompts to name your destination.
5. On the **Basic Settings** page, enter:
   - Destination name
   - [Ad Account ID](https://developers.pinterest.com/docs/conversions/conversions/#Find%20your%20%2Cad_account_id#Find%20your%20%2Cad_account_id#Find%20your%20%2Cad_account_id){:target="_blank”}
   - [Conversions token](https://developers.pinterest.com/docs/conversions/conversions/#Get%20the%20conversion%20token){:target="_blank”}
6. Go to the **Mappings** tab. Prebuilt mappings, like `Checkout`, `Search`, and `Add to Cart`, include predefined parameters. All required, recommended, and optional fields are listed in [Pinterest's Best practices](https://developers.pinterest.com/docs/api-features/conversion-best-practices/#required-recommended-and-optional-fields){:target="_blank”} documentation.
7. To create a new mapping:
   - Click **New Mapping** and select **Report Conversions Event**.
   - Configure and enable the mapping.
8. Follow the steps in [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings).
9. Toggle **Enable Destination** on, then click **Save Changes**.

{% include components/actions-fields.html settings="true"%}

> info "Setting conversion type"
> By default, Segment sends all mappings as `web` conversions. To send events as mobile or offline conversions, set the Action Source in each mapping to `app_android`, `app_ios`, or `offline`.

## FAQ

#### Deduplication with the Pinterest tag

When the Pinterest tag and the API for conversions both report the same event, Pinterest can't automatically determine if they're duplicates. Because Pinterest recommends using both methods together, deduplication is essential to prevent double-counting.

If an event is sent from both the Pinterest tag and the API using the same `event_id`, Pinterest treats them as a single event. This prevents conversions from being counted twice and improves attribution accuracy.

For example:

1. A user adds an item to their cart.
2. The Pinterest tag reports the event with `event_id: 123`.
3. Later, the web server also sends the event to the API with `event_id: 123`.
4. When Pinterest receives both events, Segment checks the `event_id` to confirm they refer to the same action.

By using deduplication, advertisers can report conversions through both methods without inflating conversion counts. If an event is only received from one source, Pinterest still attributes it appropriately.

Conversion events must meet the following requirements to be considered for deduplication: 

- The event includes a non-empty, non-null `event_id` and `event_name`.
- The `action_source` is not `offline` (for example, it occurred in-app or on the web). Supported values include `app_android`, `app_ios`, and `web`.
- The duplicate events arrive within 24 hours of the first recorded event.

> info ""
> Segment offers a client-side destination for the Pinterest tag. See the [Pinterest destination documentation](/docs/connections/destinations/catalog/pinterest-tag/){:target="_blank"} for setup instructions and implementation details.

#### Events fail to send due to missing App Name

The **App Name** field is required for many Pinterest Conversion API destination's mappings. 

Segment's mobile libraries automatically collect and map the App Name to the correct field. However, Segment's web or server-based libraries don't automatically collect and map App Name, which can cause mappings to fail. Segment recommends adding the App Name to the Segment event or hardcoding a static string in the mapping as the App Name.  

## Limited Data Processing

On January 1, 2023, Pinterest introduced the [Limited Data Processing (LDP) flag](https://developers.pinterest.com/docs/api-features/limited-data-processing/){:target="_blank"} to help advertisers comply with the California Consumer Privacy Act (CCPA).

Advertisers are responsible for complying with user opt-outs, as well as identifying the user’s state of residency when implementing the Limited Data Processing flag.

Enabling LDP could impact campaign performance and targeting capabilities. Pinterest recommends applying the LDP flag on a per-user basis for the best results.

LDP is enabled only if all three required fields in the following table are present. If any field is missing, LDP is ignored.

| Field Name     | Field Description                               | Required Value for LDP |
| -------------- | ----------------------------------------------- | ---------------------- |
| `opt_out_type` | Opt out Type based on user’s privacy preference | "LDP"                  |
| `st`           | State of residence                              | "CA"                   |
| `country`      | Country of residence                            | "US"                   |


### PII Hashing

Before sending data to Pinterest, Segment applies SHA-256 hashing to the following personally identifiable information (PII) fields:

- User identifiers: external ID, mobile ad identifier
- Contact information: email, phone
- Demographics: gender, date of birth
- Name details: first name, last name
- Location: city, state, ZIP code, country

### User Data Parameters

Segment automatically maps User Data fields to their corresponding parameters [as expected by the Conversions API](https://developers.pinterest.com/docs/conversions/best/#Authenticating%20for%20the%20Conversion%20Tracking%20endpoint#The%20%2Cuser_data%2C%20and%20%2Ccustom_data%2C%20objects#Required%2C%20recommended%2C%20and%20optional%20fields#Required%2C%20recommended%2C%20and%20optional%20fields#User_data%2C%20and%20%2Ccustom_data%2C%20objects){:target="_blank"} before sending to Pinterest Conversions:

| User Data Field   | Conversions API User Data Parameter |
| ----------------- | ----------------------------------- |
| External ID       | `external_id`                       |
| Mobile Ad Id      | `hashed_maids`                      |
| Client IP Address | `client_ip_address`                 |
| Client User Agent | `client_user_agent`                 |
| Email             | `em`                                |
| Phone             | `ph`                                |
| Gender            | `ge`                                |
| Date of Birth     | `db`                                |
| Last Name         | `ln`                                |
| First Name        | `fn`                                |
| City              | `ct`                                |
| State             | `st`                                |
| Zip Code          | `zp`                                |
| Country           | `country`                           |

### Custom Data Parameters

Segment automatically maps Custom Data fields (excluding `content_ids`, `contents`, `num_items`, `opt_out_type`) to their corresponding parameters [as expected by the Conversions API](https://developers.pinterest.com/docs/conversions/best/#Authenticating%20for%20the%20Conversion%20Tracking%20endpoint#The%20%2Cuser_data%2C%20and%20%2Ccustom_data%2C%20objects#Required%2C%20recommended%2C%20and%20optional%20fields#Required%2C%20recommended%2C%20and%20optional%20fields#User_data%2C%20and%20%2Ccustom_data%2C%20objects){:target="_blank"} before sending to Pinterest Conversions:

| User Data Field | Conversions API Custom Data Parameter |
| --------------- | ------------------------------------- |
| Currency        | `currency`                            |
| Value           | `value`                               |
| Content IDs     | `content_ids`                         |
| Contents        | `contents`                            |
| Number of items | `num_items`                           |
| Order ID        | `order_id`                            |
| Search string   | `search_string`                       |
| Opt out type    | `opt_out_type`                        |

### Server Event Parameter Requirements

Pinterest requires the `action_source` server event parameter for all events sent to the Pinterest Conversions API. This parameter specifies where the conversions occur.

### Verify Events in Pinterest Conversions Dashboard

After you start sending events, you should start seeing them in dashboard. You can confirm that Pinterest received them by following these steps:

1. Go to **Events Overview** in Pinterest.
2. Click **Event History** to see all the events Segment sent to Pinterest conversions.