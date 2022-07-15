---
title: Preact Destination
---


## Identify

To create users in in Preact you'll use our [`identify`](/docs/connections/spec/identify) method. Users must be identified on the client side for events to appear in Preact.


## Group

To group users into accounts in preact you'll use our [`group`](/docs/connections/spec/group) method.


## Track

Our [`track`](/docs/connections/spec/track) method will record events in Preact. Users must be identified on the client side for events to appear in Preact.

- - -


## Features

### Recording Errors

Preact can be really useful for customer support. For that to work well you'll want to send error events to Preact.

All you have to do is add a "!" as the first character in the event name and Preact will recognize it as an error event. Properties sent with the event will also show up in Preact.

Here's a JavaScript example:
```javascript
analytics.track('!Image upload error', {
    File size: '890kb',
    File extension: '.JPG',
    Message: 'File size too large'
    });
```
