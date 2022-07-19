---
title: Promoter Destination
id: 55b6983e0a20f4e22f0fb3da
---
## Getting Started

Once the Segment library is integrated with your service, add your Promoter API Key and enable Promoter in your Segment destinations page. You can find your API key in Promoter.io under **Accounts Settings > Segment Destination**.

- - -

Promoter supports the `identify` and `track` methods from Segment and will allow you to:

- Add a contact to a list
- Send a survey to a contact

Both `identify` and `track` will need to be called in order to use the full power of Promoter.

## Identify

By calling `identify`, you will effectively be creating a new contact for your organization.

Within the `identify` event, Promoter requires a `userId` and `email`, while `firstName` and `lastName` are optional. However, it is encouraged that you pass in as many attributes that are meaningful to your organization around the context of NPS. You will be able to filter your score by every single attribute or combination of attributes provided.

Here's an example:

{% comment %} api-example '{
  "userId": "12345",
  "action": "identify",
  "traits": {
    "email": "ted@mosbiusdesigns.com",
    "firstName": "Ted",
    "lastName": "Mosby",
    "plan": "Premium"
  }
}'}}} {% endcomment %}

```js
{
  "userId": "12345",
  "action": "identify",
  "traits": {
    "email": "ted@mosbiusdesigns.com",
    "firstName": "Ted",
    "lastName": "Mosby",
    "plan": "Premium"
  }
}
```


## Track

By creating a track event you will effectively trigger a survey to be sent to your contact.

The track event should have an associated userId sent with it. That userId **needs** to match the userId sent with the `identify` event. This is the only way we know which contact you would like to associate this event to. We will send a survey to that contact using the campaign that's associated to Segment within Promoter.

Note: if you are using Segment's client-side JavaScript library ([Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript)) and already called `identify` we will automatically include the `userId` with every `track` call.

Here's an example:

{% comment %} api-example '{
  "userId": "12345",
  "action": "track",
  "event": "Friend Invited",
  "properties": {
    "category": "viral",
    "totalInvites": 50
  }
}'}}} {% endcomment %}

```js
{
  "userId": "12345",
  "action": "identify",
  "traits": {
    "email": "ted@mosbiusdesigns.com",
    "firstName": "Ted",
    "lastName": "Mosby",
    "plan": "Premium"
  }
}
```


### Order Completed

When you `track` an event with the name `Order Completed` using the [e-commerce tracking API](/docs/connections/spec/ecommerce/v2/), we will send the event and data to Promoter as a custom event with the data stored with Promoter for future use.
