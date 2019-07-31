---
title: 'Spec: Live Chat Events'
sidebar: 'Live Chat Events'
hidden: true
---

This guide explains what data should be sent to Segment *from* Live Chat tools and hence is targeted to partners who send Live Chat data back into Segment rather than targeted to customers themselves. The [semantic events](/docs/spec/semantic) detailed below represent the ideal for Live Chat events; not every Live Chat tool supports all of these events or all their properties.

## Overview

Every Live Chat tool is built around the concept of "conversations" between an agent at the company and a customer who has a question.

Each [conversation starts](#live-chat-conversation-started) when a customer sends their first message. Within the conversation the customer [receives](#live-chat-message-received) and [sends](#live-chat-message-sent) messages. In some situations the conversation also has a clearly recognizable [end](#live-chat-conversation-ended) when the customer or agent explicitly indicates the conversation has ended.


## Events

The Live Chat category has the following semantic events:

* [Live Chat Conversation Started](#live-chat-conversation-started)
* [Live Chat Conversation Ended](#live-chat-conversation-ended)
* [Live Chat Message Sent](#live-chat-message-sent)
* [Live Chat Message Received](#live-chat-message-received)

### Live Chat Conversation Started

This event should be sent when a customer sends their first message.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`agent_id`              | String | The agent's ID.
`agent_name`            | String | The agent's real name.
`agent_username`        | String | The agent's username.
`conversation_id`       | String | The conversation's ID.
`conversation_duration` | Number | The conversation duration in seconds.
`message_id`            | String | The message's ID.

#### Example

{% comment %}\{\{\{api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Live Chat Conversation Started",
  "properties": {
    "agent_id": "bce89acdd11901",
    "agent_name": "Peter Gibbons",
    "agent_username": "pgibbons",
    "conversation_duration": 0,
    "conversation_id": "abd627dbecffc",
    "message_body": "But my stapler...",
    "message_id": "beaffc193618cbe"
  }
}' }}}{% endcomment %}


### Live Chat Conversation Ended

This event should be sent when customer or agent explicitly indicates the conversation has ended.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`agent_id`              | String | The agent's ID.
`agent_name`            | String | The agent's real name.
`agent_username`        | String | The agent's username.
`conversation_id`       | String | The conversation's ID.
`conversation_duration` | Number | The conversation duration in seconds.
`message_id`            | String | The message's ID.

#### Example

{% comment %}\{\{\{api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Live Chat Conversation Ended",
  "properties": {
    "agent_id": "bce89acdd11901",
    "agent_name": "Peter Gibbons",
    "agent_username": "pgibbons",
    "conversation_duration": 203,
    "conversation_id": "abd627dbecffc",
    "message_body": "I\'ll... set the building on fire",
    "message_id": "bcadac1183618cbe"
  }
}' }}}{% endcomment %}


### Live Chat Message Sent

This event should be sent when customer sends a message to the agent.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`agent_id`              | String | The agent's ID.
`agent_name`            | String | The agent's real name.
`agent_username`        | String | The agent's username.
`conversation_id`       | String | The conversation's ID.
`conversation_duration` | Number | The conversation duration in seconds.
`message_id`            | String | The message's ID.

#### Example

{% comment %}\{\{\{api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Live Chat Message Sent",
  "properties": {
    "agent_id": "bce89acdd11901",
    "agent_name": "Peter Gibbons",
    "agent_username": "pgibbons",
    "conversation_duration": 45,
    "conversation_id": "abd627dbecffc",
    "message_body": "But then they switched from the Swingline to the Boston stapler!",
    "message_id": "beaffc193618cbe"
  }
}' }}}{% endcomment %}


### Live Chat Message Received

This event should be sent when the customer receives a message from the agent.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`agent_id`              | String | The agent's ID.
`agent_name`            | String | The agent's real name.
`agent_username`        | String | The agent's username.
`conversation_id`       | String | The conversation's ID.
`conversation_duration` | Number | The conversation duration in seconds.
`message_id`            | String | The message's ID.

#### Example

{% comment %}\{\{\{api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Live Chat Message Received",
  "properties": {
    "agent_id": "bce89acdd11901",
    "agent_name": "Peter Gibbons",
    "agent_username": "pgibbons",
    "conversation_duration": 98,
    "conversation_id": "abd627dbecffc",
    "message_body": "Yeah, uh huh, okay, Milton",
    "message_id": "beaffc193618cbe"
  }
}' }}}{% endcomment %}
