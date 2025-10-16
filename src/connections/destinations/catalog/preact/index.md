---
title: Preact Destination
---


## Identify

To create users in in Preact, use the [Identify](/docs/connections/spec/identify) method. Users must be identified on the client side for events to appear in Preact.


## Group

To group users into accounts in Preact, use the [Group](/docs/connections/spec/group) method.


## Track

The [Track](/docs/connections/spec/track) method records events in Preact. Users must be identified on the client side for events to appear in Preact.


## Features

### Recording errors

Preact can be useful for customer support. For that to work, you can send error events to Preact.

Add a "!" as the first character in the event name and Preact recognizes it as an error event. Properties sent with the event also show up in Preact.

Here's a JavaScript example:
```javascript
analytics.track('!Image upload error', {
    File size: '890KB',
    File extension: '.JPG',
    Message: 'File size too large'
    });
```
