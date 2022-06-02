---
title: Twilio Source
rewrite: true
id: 43bb279b7
---
{% include content/source-region-unsupported.md %}

[Twilio](http://twilio.com) is a developer platform for communications. Software teams use Twilio APIs to add capabilities like voice, video, and messaging to their applications. This enables businesses to provide the right communications experience for their customers. Behind Twilio APIs is a Super Network, a software layer that connects and optimizes communications networks around the world. This is what allows users to reliably call and message anyone anywhere.

## Getting Started

1. From your workspace's `/sources` page, click `Add source`.

2. Choose Twilio.

3. Give the source a nickname and a schema name. The nickname is a label used in the Segment interface, and the schema name is the namespace you query against in your warehouse. Both can be whatever you like, but we recommend sticking to something that reflects the source itself, like `Twilio` for nickname and `twilio` or `twilio_prod` for the schema name.

   **Note**: You can add multiple instances if you have multiple Twilio accounts. That's why we allow you to customize the source's nickname and schema name!

4. When you click **Connect**, you'll be prompted for your Twilio Account SID. You can find it on your Twilio account under the project settings.

5. You'll be re-directed to Twilio's app and you'll need to authorize Segment to read from your account data. To authorize, click in the "Allow" button. Once approved, you'll be redirected back to the set up page in the Segment app.

6. Click on the "Finish" button and you'll be good to go!

We'll begin syncing your Twilio data into Segment momentarily, and it will be written to your warehouse at your next Warehouse run.

## Components

### Sync

The Twilio source is built with a sync component, which means we'll make requests to their API on your behalf on a 3 hour interval to pull the latest data into Segment. In the initial sync, we'll grab all the Twilio objects (and their corresponding properties) according to the Collections Table below. The objects will be written into a separate schema, corresponding to the source instance's schema name you designated upon creation (ie. `twilio_prod.charges`).

Our sync component uses an upsert API, so the data in your warehouse loaded using sync will reflect the latest state of the corresponding resource in Twilio.  For example, if `ticket_status` goes from `open` to `closed` between syncs, on its next sync that tickets status will be `closed`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources will sync with Segment every 3 hours. Depending on your Warehouses plan, we will push the Source data to your warehouse on the interval associated with your billing plan.

At the moment, we don't support filtering which objects or properties get synced. If you're interested in this feature, [let us know](https://segment.com/help/contact)!


## Collections

Collections are the groupings of resources we pull from your source. In your warehouse, each collection gets its own table.


|  Collection | Type | Description |
|  ------ | ------ | ------ |
|  addresses | object | An [address](https://www.twilio.com/docs/api/rest/addresses) represents your or your customer's physical location within a country |
|  calls | object | A [call](https://www.twilio.com/docs/voice/api/call) represents a connection between a telephone and Twilio |
|  conferences | object | The [conference](https://www.twilio.com/docs/api/rest/conference) allows you to query and manage the state of individual conferences |
|  transcriptions | object | A [transcription](https://www.twilio.com/docs/api/rest/transcription) represents a transcription of a recording |
|  messages | object | A [message](https://www.twilio.com/docs/api/rest/message)represents an inbound or outbound message |
|  call_feedback | object | The [call feedback](https://www.twilio.com/docs/api/rest/call-feedback) subresource provides a simple API to report the quality experienced during a phone call |


## Collection Properties

Below are tables outlining the properties included in the collections listed above.


### Addresses

|  Property Name | Description |
|  ------ | ------ |
|  account_sid | The unique id of the Account responsible for creating this Call |
|  city | The city in which you or your customer is located |
|  customer_name | The caller's name if this Call was an incoming call to a phone number with Caller ID Lookup enabled |
|  emergency_enabled | This is a value that indicates if emergency calling has been enabled on this number. Possible values are true or false |
|  friendly_name | A human-readable description of the address. Maximum 64 characters |
|  iso_country | The ISO country code of your or your customer's address |
|  postal_code | The postal code in which you or your customer is located |
|  region | The state or region in which you or your customer is located |
|  street | The number and street address where you or your customer is located |
|  received_at | This timestamp is added to incoming records as soon as they hit Segment API |
|  validated | This value will be true if the Address has been validated, or false for countries that don't require validation or if the Address is non-compliant |


### Calls

|  Property Name | Description |
|  ------ | ------ |
|  account_sid | The unique id of the Account responsible for creating this Call |
|  api_version | The API Version used to create the Call |
|  caller_name | The caller's name if this Call was an incoming call to a phone number with Caller ID Lookup enabled |
|  date_created | The date that this resource was created, given as GMT in RFC 2822 format |
|  date_updated | The date that this resource was last updated, given as GMT in RFC 2822 format |
|  direction | A string describing the direction of the Call. Values are inbound for inbound calls, outbound-api for calls initiated using the REST API or outbound-dial for calls initiated by a <Dial> verb |
|  duration | The length of the Call in seconds. This value is empty for busy, failed, unanswered or ongoing calls |
|  end_time | The time the Call ended, given as GMT in RFC 2822 format. Empty if the call did not complete successfully |
|  forwarded_from | The forwarding phone number if this Call was an incoming call forwarded from another number (depends on carrier supporting forwarding) |
|  from | The phone number, SIP address, Client identifier or SIM SID that made this Call |
|  parent_call_sid | A 34-character string that uniquely identifies the Call that created this leg |
|  phone_number_sid | If the call was inbound, this is the Sid of the IncomingPhoneNumber that received the call. If the call was outbound, it is the Sid of the OutgoingCallerId from which the call was placed |
|  price | The charge for this Call, in the currency associated with the account. Populated after the call is completed |
|  received_at | This timestamp is added to incoming records as soon as they hit Segment API |
|  start_time | The start time of the call, given as GMT in RFC 2822 format. Empty if the call has not yet been dialed |
|  status | A string representing the status of the Call. May be queued, ringing, in-progress, canceled, completed, failed, busy or no-answer |
|  to | The phone number, SIP address, Client identifier or SIM SID that received this Call |


### Conferences

|  Property Name | Description |
|  ------ | ------ |
|  account_sid	| The unique id of the Account responsible for creating this conference |
|  date_created	| The date that this conference was created, given as GMT in RFC 2822 format |
|  date_updated	| The date that this conference was last updated, given as GMT in RFC 2822 format |
|  friendly_name	| A user provided string that identifies this conference room |
|  region	| A string representing the Twilio Region where the conference audio was mixed |
|  status	| A string representing the status of the conference. May be init, in-progress, or completed |


### Transcriptions

|  Property Name | Description |
|  ------ | ------ |
|  account_sid | The unique id of the Account responsible for creating this Call |
|  date_created | The date that this resource was created, in RFC 2822 format |
|  date_updated	| The date that this resource was last updated, in RFC 2822 format |
|  duration	| The duration of the transcribed audio, in seconds |
|  price	| The charge for this transcript in the currency associated with the account |
|  recording_sid	| The unique id of the Recording that created this Transcription |
|  status	| A string representing the status of the transcription: in-progress, completed or failed |
|  transcription_text	| The text content of the transcription |


### Messages

|  Property Name | Description |
|  ------ | ------ |
|  account_sid | The unique id of the Account responsible for creating this Call |
|  api_version	| The version of the Twilio API used to process the message |
|  body	| The text body of the message. Up to 1600 characters long |
|  date_created	| The date that this resource was created, given in RFC 2822 format |
|  date_sent	| The date that the message was sent. For outgoing messages, this is the date that the message was sent from Twilio's platform |
|  date_updated	| The date that this resource was last updated, given in RFC 2822 format |
|  direction	| The direction of this message. inbound for incoming messages, outbound-api for messages initiated using the REST API, outbound-call for messages initiated during a call or outbound-reply for messages initiated in response to an incoming message |
|  error_code	| The error code, if any, associated with your message |
|  error_message	| The human readable description of the ErrorCode above. If the message status is failed or undelivered it will have one of the values described below, otherwise, it will be null |
|  from	| The phone number (in E.164 format), alphanumeric sender ID, or Wireless SIM that initiated the message |
|  num_media	| This property indicates the number of media files associated with the message. Each message may send up to 10 media files |
|  num_segments	| This property indicates the number of segments that make up the message. If your body is too large to be sent as a single SMS message, it will be segmented and charged accordingly |
|  price	| The amount billed for the message, in the currency associated with the account |
|  status	| The status of this message. Either accepted, queued, sending, sent,failed, delivered, undelivered, receiving or received. See detailed descriptions of these statuses below |
|  to	| The phone number that received the message in E.164 format. For incoming messages, this will be one of your Twilio phone numbers. For outgoing messages, this will be the remote phone |


### Call Feedback

|  Property Name | Description |
|  ------ | ------ |
|  quality_score	| 1 to 5 quality score where 1 represents imperfect experience and 5 represents a perfect call |


## Adding Destinations

Currently, Warehouses are the only supported destination for object-cloud sources.


## Adding sub-accounts

If you'd like to sync multiple twilio sub-accounts, just follow the steps below!
1. Set up a source for each sub-account
2. Disable the source right after creation to avoid syncing data from the default account
3. [Contact us](https://segment.com/help/contact) specifying you would like to add a sub-account to a Twilio source, include a link to the Twilio source(s), and finally, do not forget to include the sub-account SID!
