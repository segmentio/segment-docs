---
rewrite: true
title: MSG91 Destination
---

[MSG91](https://msg91.com/) provides SMS marketing/transactional automation for businesses. With Segment you can send SMS with a single call.

This document was last updated on April 05, 2019. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please let us know!

This destination is maintained by MSG91. For any issues with the destination, please [reach out to their team](mailto:support@msg91.com).

_**NOTE:** The MSG91 Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on January 23, 2019. If you are interested in joining their beta program or have any feedback to help improve the MSG91 Destination and its documentation, please [let  their team know](mailto:support@msg91.com)!_



## Getting Started

{% include content/connection-modes.md %}

1.  From your Segment UI's Destinations page click on "Add Destination".

2.  Search for "MSG91" within the Destinations Catalog and confirm the Source you'd like to connect to.

3. Drop in the "API Key" into your Segment Settings UI which you can find from your [MSG91 dashboard](https://control.msg91.com/signin/) in the API page using the ['API' option in the sidebar](https://help.msg91.com/article/177-where-can-i-find-my-authentication-key). It is recommended that you create a brand new API key for the Segment destination.


## Identify
If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
{
  "messageId": "test-message-7krupg",
  "timestamp": "2019-04-16T06:33:14.682Z",
  "type": "identify",
  "email": "test@example.org",
  "traits": {
    "phone": "phone number to send SMS on",
    "firstName": "Firstname of SMS receiver",
    "message": "Thank you for singup, this is test SMS",
    "senderID": "Ex. flipKT, MSGIND, Vodaphn"
  },
  "userId": "test-user-0md4g"
}
```

Identify calls will be sent to MSG91 as an `Send SMS` event.



## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. Make sure you send the following Properties with `page` method to send SMS. An example call would look like:

```
{
  "type": "page",
  "name": "Home",
  "properties": {
    "phone": "Phone number to send SMS",
    "firstName": "John",
    "message": "Thank you for singup, this is test SMS",
    "senderID": "Ex. flipKT, MSGIND, Vodaph"
  }
}

```
Page calls will be sent to MSG91 as a `Send SMS`.

## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/screen/) does. Make sure you send the following Properties with `Screen` method to send SMS. An example call would look like:

```
{
  "type": "screen",
  "name": "Home",
  "properties": {
    "phone": "Phone number to send SMS",
    "firstName": "John",
    "message": "Thank you for singup, this is test SMS",
    "senderID": "Ex. flipKT, MSGIND, Vodaph"
  }
}
```
Screen calls will be sent to MSG91 as a `Send SMS`.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. Make sure you send the following Properties with `track` method to send SMS. An example call would look like:

```
{
  "type": "track",
  "event": "Clicked Login Button",
  "properties": {
    "phone": "Phone number to send SMS",
    "firstName": "John",
    "message": "Thank you for singup, this is test SMS",
    "senderID": "Ex. flipKT, MSGIND, Vodaph"
  }
}
```
Track calls will be sent to MSG91 as a `Send SMS` event.



## Troubleshooting

You can check [MSG91's API doc](https://docs.msg91.com/collection/msg91-api-integration/5/send-sms/T26A6X72) to read more about APIs and also test and create API from there.

### Not seeing events?

Make sure you send the following properties/ traits to send SMS.

```
"properties": {
  "phone": "Phone number to send SMS",
  "firstName": "John",
  "message": "Thank you for singup, this is test SMS",
  "senderID": "Ex. flipKT, MSGIND, Vodaph"
  },
```

| **Property/ Trait** | **Type** | **Description** |
| --- | --- | --- |
| `phone` | Number | Phone number with coutry code, on which you want to send SMS: `167554321`, `918818888758`
| `firstName` | String | First name of SMS receiver |
| `message` | String | SMS content you want to get delivered on mobile number.  |
| `senderID` | String | Identity which will display on mobile when SMS received. Also depeded upon [country rule](https://help.msg91.com/article/53-sender-id-in-various-countries)|


For more parameters, visit [MSG91 API doc](https://docs.msg91.com/collection/msg91-api-integration/5/send-sms/T26A6X72)
)
