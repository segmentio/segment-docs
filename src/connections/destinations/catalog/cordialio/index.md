---
title: Cordial Destination
beta: true
hidden: true
---

## Getting Started

To enable the destination, you will need to authenticate by entering your Cordial API Key in the Segment dashboard.

To access your Cordial API Key, log in to your Cordial account and open the dropdown menu in the top right corner. Navigate to Administration > API Keys.

## Supported Segment methods

Cordial supports the `identify`, `track`, `group`, `page` methods.

## Identify

When `identify` is called, `user_id` should be a valid identifier that matches the Cordial account's primary key. This will be the contact e-mail address unless you have set up a custom value.

If the `user_id` passed is _valid and known_, the contact in Cordial will be updated with any corresponding property values. For example, `first_name`, `user_id`, `address.state`, and `email` will populate or replace the corresponding values in Cordial.

If the `user_id` passed is _valid but does not correspond_ to a Cordial contact, a new contact will be created and assigned any mapped values.

If the `user_id` passed is _invalid_, an error will be returned.

## Group

If the `user_id` passed is _valid and known_, and the `group_id` passed is _valid and known_, the contact will be added to the list in Cordial.

If the `user_id` passed is _invalid_, an error will be returned.

### Supported data parameters

| Segment key |  Type  | Cordial mapping                     |
| ----------- |:------:| ----------------------------------- |
| `user_id`   | string | email address or custom primary key |
| `group_id`  | string | list ID                             |

## Track
If the `user_id` passed is _valid and known_, the event and its properties will be attributed to the contact in Cordial.

If the `user_id` passed is _invalid_, an error will be returned.

### Supported data parameters

| Segment key  |  Type  | Cordial mapping                     |
| ------------ |:------:| ----------------------------------- |
| `user_id`    | string | email address or custom primary key |
| `event`      | string | event name                          |
| `properties` | object | event properties (optional)         |

## Page
If the `user_id` passed is _valid and known_, a page view event will be  attributed to the contact in Cordial.

If the `user_id` passed is _invalid_, an error will be returned.

### Supported data parameters:

| Segment key |  Type  | Cordial mapping                     |
| ----------- |:------:| ----------------------------------- |
| `user_id`   | string | email address or custom primary key |

## Optional advanced configuration

`POST https://admin.cordial.io/api/integrations/segment`
This endpoint can be used to configure custom mappings for your Segment destination.

```js
{   "name":"segment",
    "enabled":true,
    "attributeMapping":[
        {"segmentField":"first_name","cordialKey":"fname"},
        {"segmentField":"user_id","cordialKey":"extid"},
        {"segmentField":"address.state","cordialKey":"state"},
        {"segmentField":"email","cordialKey":"channels.email.address"}
    ],
    "ignoreFields":["website"],
    "contactsErrorHandling":"ignoreMissingAttributes"   }
```

You will be asked to authenticate. Use your Cordial API key as the username and proceed with the password blank. (To do this, log in to your Cordial account and open the dropdown menu in the top right corner. Navigate to Administration > API Keys. Here you will create a new key by whitelisting your IP with us.)

`PUT https://admin.cordial.io/api/integrations/segment`
Update your Cordial/Segment field mapping using the same JSON format as in the POST call.

`GET https://admin.cordial.io/api/integrations`
Retrieve a JSON list of integrations you have set up with Cordial.
