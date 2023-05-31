---
title: Pinterest Conversions API
id: 63e42e512566ad7c7ca6ba9b
hide-personas-partial: true
hide-boilerplate: false
hide-dossier: true
private: false
hidden: false

---
The Pinterest Conversions API destination is a server-to-server integration with [The Pinterest API for Conversions](https://help.pinterest.com/en/business/article/the-pinterest-api-for-conversions){:target="_blank"} that allows advertisers to send conversions directly to Pinterest without requiring a Pinterest Tag. These conversions map to Pinterest campaigns for conversion reporting to improve conversion visibility. When you pass events to Pinterest, advertisers can use Pinterest's insights to evaluate an ad's effectiveness to improve content, targeting, and placement of future ads.

Advertisers can send web, in-app, or offline conversions to Pinterest’s server to server endpoint in real-time. Events received in real time or within an hour of the event occurring are reported as web or app events. Events received outside of this window, as well as delayed batch events are considered as offline events.

The API for Conversions helps Pinterest provide a more comprehensive view of your campaign performance. All advertisers who currently use the Pinterest Tag will benefit from using it in tandem with the API for Conversions.

## Benefits of Pinterest Conversions API (Actions)

The Pinterest Conversions API destination provides the following benefits:

- **Fewer settings**. Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the Pinterest Conversions API.
- **Prebuilt mappings**. Mappings for standard Pinterest Conversions API events, like `Add to Cart`, are prebuilt with the prescribed parameters and available for customization.
- **Support Deduplication**. Deduplication removes duplicates events which improves the accuracy of your conversions
- **Support for page calls**. Page calls can be sent to Pinterest as a standard Page View.
- **Support for multi-user arrays**. User data nested within arrays, like the `User Data` array in the Order Completed event, can be sent to Pinterest.
- **Data normalization**. Data is normalized before it's hashed to send to Pinterest Conversions.

## Getting started

Before connecting to the Pinterest Conversions destination, you must have a [Pinterest](https://ads.pinterest.com/login/){:target="_blank"} account and an Ad Account ID.

To connect the Pinterest Conversions API Destination:

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for **Pinterest Conversions API** in the Destinations Catalog, and select the destination.
3. Click **Configure Pinterest Conversions API**.
4. Select the source that will send data to Pinterest Conversions API and follow the steps to name your destination.
5. On the **Basic Settings** page, configure the following fields:
   - Destination Name
   - [Ad Account ID](https://developers.pinterest.com/docs/conversions/conversions/#Find%20your%20%2Cad_account_id#Find%20your%20%2Cad_account_id#Find%20your%20%2Cad_account_id)
   - [Conversions Token]((https://developers.pinterest.com/docs/conversions/conversions/#Get%20the%20conversion%20token))
6. Navigate to the **Mappings** tab, there are already Prebuilt mapping like `Checkout,Search,Add to Cart` defined with prescribed parameter . All required ,recommended and optional fields are listed [here](https://developers.pinterest.com/docs/conversions/best/#Authenticating%20for%20the%20Conversion%20Tracking%20endpoint#The%20%2Cuser_data%2C%20and%20%2Ccustom_data%2C%20objects#Required%2C%20recommended%2C%20and%20optional%20fields#Required%2C%20recommended%2C%20and%20optional%20fields)
7. If you want to create **New Mapping**, and select **Report Conversions Event** ,configure and enable it.
8. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings).
9. Enable the destination using the **Enable Destination** toggle switch and click **Save Changes**.


{% include components/actions-fields.html settings="true"%}

> warning ""
> By default, all mappings send as `web` conversions. If you want to send events as mobile or offline conversions, update the Action Source in each mapping to be `app_android`, `app_ios`, `offline`.

## FAQ & Troubleshooting

### Deduplication with Pinterest Tag

Pinterest cannot know if a conversion reported by the Tag and another reported by the API for Conversions are the same.

Because Pinterest recommends using both the API for Conversions and the Pinterest Tag, deduplication is an essential part of the implementation process. It helps to avoid double-counting of a single event when it’s sent through multiple sources, such as the Pinterest Tag and the Pinterest API for Conversions.

For example, if a user triggers an add to cart event and the tag reports the data using `123` as the event ID. Later, their web server reports the conversion to the API and uses `123` as the event ID. When Pinterest receives the events, Segment looks at the event IDs to confirm they correspond to the same event. 

By using deduplication advertisers can report conversions using both the tag and the API without having to worry about over-counting conversions. This will result in more conversions being attributed than either alone, because if the tag doesn’t match an event, but the API does (or vice versa), the event can still be linked. 

Advertisers should use deduplication for any events they expect to be reported by multiple sources across the API and the Pinterest Tag.

Conversion Events must meet the following requirements to be considered for deduplication: 

1. The event has non-empty and non-null values for `event_id` and `event_name`
2. The `action_source` of the event is not `offline` (for example, events that occurred in the physical world, like in a local store)  The `action_source` parameter is an enum that gives the source of the event –  `app_android`, `app_ios`, `web`, or `offline`.
3. The duplicate events arrived within 24 hours of the time of receipt of the first unique event.

> info ""
> Segment offers a client-side destination specifically designed for the Pinterest Tag. You can find detailed documentation and further information on how to implement this integration by following this [link](https://segment.com/catalog/integrations/pinterest-tag/).

## Limited Data Processing
Starting from Jan 1, 2023, Pinterest introduced the Limited Data Processing flag as per California Consumer Privacy Act (CCPA). With this flag set Pinterest will allow advertisers  to comply with CCPA.

Advertisers are responsible for complying with user opt-outs, as well as identifying the user’s state of residency when implementing the Limited Data Processing flag.

Keep in mind that the Limited Data Processing flag could impact campaign performance and targeting use cases. Pinterest recommends using the Limited Data Processing flag on a per-user basis for best results.

LDP relies on 3 fields and is enabled only when all 3 combinations are met, if one of them is not met then LDP is disabled / ignored.

| Field Name     | Field Description                               | Required Value for LDP |
| -------------- | ----------------------------------------------- | ---------------------- |
| `opt_out_type` | Opt Out Type based on User’s privacy preference | "LDP"                  |
| `st`           | State of Residence                              | "CA"                   |
| `country`      | Country of Residence                            | "US"                   |



### PII Hashing

Segment creates a SHA-256 hash of the following fields before sending to Pinterest:
- External ID
- Mobile Ad Identifier
- Email
- Phone
- Gender
- Date of Birth
- Last Name
- First Name
- City  
- State
- Zip Code
- Country

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

Segment automatically maps Custom Data fields to their corresponding parameters [as expected by the Conversions API](https://developers.pinterest.com/docs/conversions/best/#Authenticating%20for%20the%20Conversion%20Tracking%20endpoint#The%20%2Cuser_data%2C%20and%20%2Ccustom_data%2C%20objects#Required%2C%20recommended%2C%20and%20optional%20fields#Required%2C%20recommended%2C%20and%20optional%20fields#User_data%2C%20and%20%2Ccustom_data%2C%20objects){:target="_blank"} before sending to Pinterest Conversions:

| User Data Field | Conversions API Custom Data Parameter |
| --------------- | ------------------------------------- |
| Currency        | `currency`                            |
| Value           | `value`                               |
| Content IDs     | `content_ids`                         |
| Contents        | `contents`                            |
| Number of Items | `num_items`                           |
| Order ID        | `order_id`                            |
| Search String   | `search_string`                       |
| Opt Out Type    | `opt_out_type`                        |

### Server Event Parameter Requirements

Pinterest requires the `action_source` server event parameter for all events sent to the Pinterest Conversions API. This parameter specifies where the conversions occur.

### Verify Events in Pinterest Conversions Dashboard

After you start sending events, you should start seeing them in dashboard. You can confirm that Pinterest received them:

1. Go to the Events Overview.
2. Click on the Event History to see all the events sent to pinterest conversions.

