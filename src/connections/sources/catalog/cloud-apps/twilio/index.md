---
title: Twilio Source
rewrite: true
id: 43bb279b7
---

[Twilio](http://twilio.com){:target="_blank”} is a developer platform for communications. Software teams use Twilio APIs to add capabilities like voice, video, and messaging to their applications. This enables businesses to provide the right communications experience for their customers. Behind Twilio APIs is a Super Network, a software layer that connects and optimizes communications networks around the world. This is what allows users to reliably call and message anyone anywhere.

## Getting started

1. Navigate to **Connections > Catalog** and from the sources tab, search for “Twilio” and click on the tile.
2. Click **Add Source**, to create a new Twilio source. **Note**: This source only supports [warehouses](docs/connections/storage/warehouses/) as a destination.
3. Give the source a meaningful name and (optional) add labels. Add the Twilio SID, which can be found in your Twilio account.
   > **Note**: Segment recommends that you give your source a name that reflects the source itself as this name populates the schema name. For example, `Twilio` for nickname and `twilio` or `twilio_prod` for the schema name. You can add multiple instances if you have multiple Twilio accounts.
4. Sign into your Twilio account and select the account that you want to sync data from to Segment.
5. Add the Twilio SID, which can be found in your Twilio account, in **Project Settings**. Click **Authenticate**.
6. Once connected successfully, click **Next** to setup the SQL schema.
7. Verify the schema and click **Next**.
8. Set up **Selective Sync**. You have the options to:
  > * **Configure the source sync schedule**. This is how often the data syncs. The default option is every three hours.
  > * **Select the start date**. This is the date from which the first sync happens. If left blank, a full sync is initiated.
  > * **Select the collections to sync**. The collections that you select are synced from the start date.
9. Click **Done** to complete integrating your Twilio account with Segment. Some things to note:
10. To set the date from which the sync should start, go to **Settings > Basic Settings**, and configure the start date. Some things to note:
  > - Changing the start date after the first sync doesn't change anything unless a full manual sync is initiated. 
  > - Changing the collections to be synced takes effect after the next sync. The previous data synced for any collection that has been unselected is stored in the warehouse.
  > - The default value for Source Sync Schedule in 3 hours. To change the sync schedule, send a message to [friends@segment.com](mailto:friends@segment.com){:target="_blank”}.
11. Toggle **Enable source** on to start syncing data.
12. The first sync begins after you successfully create the source. To review the collections and number of rows synced, go to the **Overview** tab.

## Components

### Sync

The Twilio source is built with a sync component, which means Segment makes requests to Twilio's API on a three hour interval to pull in the latest data. In the initial sync, Segment grabs all the Twilio objects (and their corresponding properties) according to the [Collections table](#collections). The objects are written into a separate schema, corresponding to the source instance's schema name you designated upon creation (for example, `twilio_prod.charges`).

Segment's sync component uses an upsert API, so the data in your warehouse loaded using sync reflects the latest state of the corresponding resource in Twilio.  For example, if `ticket_status` goes from `open` to `closed` between syncs, on its next sync that tickets status will be `closed`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources sync with Segment every 3 hours. Depending on your Warehouses plan, Segment pushes the source data to your warehouse on the interval associated with your billing plan.

> warning ""
> Segment doesn't support filtering which objects or properties get synced.

## Collections

Collections are the groupings of resources we pull from your source. In your warehouse, each collection gets its own table.

|  Collection | Type | Description |
|  ------ | ------ | ------ |
|  addresses | object | An [address](https://www.twilio.com/docs/api/rest/addresses){:target="_blank”} represents your or your customer's physical location within a country. |
|  calls | object | A [call](https://www.twilio.com/docs/voice/api/call){:target="_blank”} represents a connection between a telephone and Twilio. |
|  conferences | object | The [conference](https://www.twilio.com/docs/api/rest/conference){:target="_blank”} allows you to query and manage the state of individual conferences. |
|  transcriptions | object | A [transcription](https://www.twilio.com/docs/api/rest/transcription){:target="_blank”} represents a transcription of a recording. |
|  messages | object | A [message](https://www.twilio.com/docs/api/rest/message){:target="_blank”} represents an inbound or outbound message. |
|  call_feedback | object | The [call feedback](https://www.twilio.com/docs/api/rest/call-feedback){:target="_blank”} subresource provides a simple API to report the quality experienced during a phone call. |


## Collection properties

The following tables outline the properties included in collections:

### Addresses

|  Property Name | Description |
|  ------ | ------ |
|  account_sid | The unique ID of the account responsible for creating this call. |
|  city | The city in which you or your customer is located. |
|  customer_name | The caller's name if this call was an incoming call to a phone number with Caller ID Lookup enabled. |
|  emergency_enabled | This is a value that indicates if emergency calling has been enabled on this number. Possible values are `true` or `false`. |
|  friendly_name | A human-readable description of the address. Maximum 64 characters. |
|  iso_country | The ISO country code of your or your customer's address. |
|  postal_code | The postal code in which you or your customer is located. |
|  region | The state or region in which you or your customer is located. |
|  street | The number and street address where you or your customer is located. |
|  received_at | This timestamp is added to incoming records as soon as they hit Segment API. |
|  validated | This value is `true` if the address has been validated, or `false` for countries that don't require validation or if the address is non-compliant. |


### Calls

|  Property Name | Description |
|  ------ | ------ |
|  account_sid | The unique ID of the account responsible for creating this call. |
|  api_version | The API version used to create the call. |
|  caller_name | The caller's name if this call was an incoming call to a phone number with Caller ID Lookup enabled. |
|  date_created | The date that this resource was created, given as GMT in [RFC 2822](https://en.wikipedia.org/wiki/Email#Message_format){:target="_blank"} format. |
|  date_updated | The date that this resource was last updated, given as GMT in RFC 2822 format. |
|  direction | A string describing the direction of the call. Values are inbound for inbound calls, outbound-api for calls initiated using the REST API or outbound-dial for calls initiated by a `<Dial>` verb. |
|  duration | The length of the call in seconds. This value is empty for `busy`, `failed`, `unanswered`, or `ongoing calls`. |
|  end_time | The time the call ended, given as GMT in RFC 2822 format. Empty if the call did not complete successfully. |
|  forwarded_from | The forwarding phone number if this call was an incoming call forwarded from another number (depends on carrier supporting forwarding). |
|  from | The phone number, SIP address, client identifier or SIM SID that made this call. |
|  parent_call_sid | A 34-character string that uniquely identifies the call that created this leg. |
|  phone_number_sid | If the call was inbound, this is the SID of the `IncomingPhoneNumber` that received the call. If the call was outbound, it is the SID of the `OutgoingCallerId` from which the call was placed. |
|  price | The charge for this call, in the currency associated with the account. Populated after the call is completed. |
|  received_at | This timestamp is added to incoming records as soon as they hit Segment API. |
|  start_time | The start time of the call, given as GMT in RFC 2822 format. Empty if the call has not yet been dialed. |
|  status | A string representing the status of the call. May be `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy`, or `no-answer`. |
|  to | The phone number, SIP address, client identifier, or SIM SID that received this call. |


### Conferences

|  Property Name | Description |
|  ------ | ------ |
|  account_sid	| The unique ID of the account responsible for creating this conference. |
|  date_created	| The date that this conference was created, given as GMT in RFC 2822 format. |
|  date_updated	| The date that this conference was last updated, given as GMT in RFC 2822 format. |
|  friendly_name	| A user provided string that identifies this conference room. |
|  region	| A string representing the Twilio region where the conference audio was mixed. |
|  status	| A string representing the status of the conference. May be `init`, `in-progress`, or `completed`. |


### Transcriptions

|  Property Name | Description |
|  ------ | ------ |
|  account_sid | The unique ID of the account responsible for creating this call. |
|  date_created | The date that this resource was created, in RFC 2822 format. |
|  date_updated	| The date that this resource was last updated, in RFC 2822 format. |
|  duration	| The duration of the transcribed audio, in seconds. |
|  price	| The charge for this transcript in the currency associated with the account. |
|  recording_sid	| The unique ID of the recording that created this transcription. |
|  status	| A string representing the status of the transcription: `in-progress`, `completed`, or `failed`. |
|  transcription_text	| The text content of the transcription. |


### Messages

|  Property Name | Description |
|  ------ | ------ |
|  account_sid | The unique ID of the account responsible for creating this call. |
|  api_version	| The version of the Twilio API used to process the message. |
|  body	| The text body of the message. Up to 1600 characters long. |
|  date_created	| The date that this resource was created, given in RFC 2822 format. |
|  date_sent	| The date that the message was sent. For outgoing messages, this is the date that the message was sent from Twilio's platform. |
|  date_updated	| The date that this resource was last updated, given in RFC 2822 format. |
|  direction	| The direction of this message: `inbound` for incoming messages, `outbound-API` for messages initiated using the REST API, `outbound-call` for messages initiated during a call or `outbound-reply` for messages initiated in response to an incoming message. |
|  error_code	| The error code associated with your message. |
|  error_message	| The human readable description of the `ErrorCode`. If the message status is `failed` or `undelivered` it will have one of the values described in the [Call feedback table](#call-feedback), or it will otherwise be `null`. |
|  from	| The phone number (in E.164 format), alphanumeric sender ID, or wireless SIM that initiated the message. |
|  num_media	| This property indicates the number of media files associated with the message. Each message can send up to 10 media files. |
|  num_segments	| This property indicates the number of segments that make up the message. If your body is too large to be sent as a single SMS message, it is segmented and charged accordingly. |
|  price	| The amount billed for the message, in the currency associated with the account. |
|  status	| The status of this message. Either `accepted`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, or `received`.|
|  to	| The phone number that received the message in E.164 format. For incoming messages, this is one of your Twilio phone numbers. For outgoing messages, this is the remote phone. |


### Call feedback

|  Property Name | Description |
|  ------ | ------ |
|  quality_score	| A 1-to-5 quality score, where 1 represents imperfect experience and 5 represents a perfect call. |


## Adding destinations

Currently, warehouses are the only supported destination for [object-cloud](docs/connections/sources/about-cloud-sources/#object-cloud-app-sources]) sources.

## Adding sub-accounts

To sync multiple twilio sub-accounts, follow these steps:
1. Set up a source for each sub-account.
2. Disable the source right after creation to avoid syncing data from the default account.
3. [Contact Segment](https://segment.com/help/contact){:target="_blank”} specifying you'd like to add a sub-account to a Twilio source, including a link to the Twilio source. Do not forget to include the sub-account SID.
