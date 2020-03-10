---
title: 'Spec: Email Events'
hidden: true
---

This guide explains what data should be sent to Segment *from* Email tools and hence is targeted to partners who send Email data back into Segment rather than targeted to customers themselves. The [semantic events](/docs/connections/spec/semantic) detailed below represent the ideal for Email events; not every Email tool supports all of these events or all of their properties.

## Overview

Every Email tool is built around the idea of delivering emails to recipients. A user sends one or many emails through an email tool, and the email is either [delivered](#email-delivered) to a recipient or [bounces](#email-bounced) if the email is undeliverable.

When an email is [delivered](#email-delivered), a recipient can take one or many actions on it: They might [open the email](#email-opened), [click on a link](#email-link-clicked) in the email's body, [mark the email as spam](#email-marked-as-spam), or [unsubscribe](#unsubscribed)

## Events

The email category has the following semantic events:

- [Email Bounced](#email-bounced)
- [Email Delivered](#email-delivered)
- [Email Link Clicked](#email-link-clicked)
- [Email Marked as Spam](#email-marked-as-spam)
- [Email Opened](#email-opened)
- [Unsubscribed](#unsubscribed)

### Email Bounced

This event should be sent when an email tool receives notice from an email server that an email is undeliverable.

#### Properties

This event supports the following semantic properties:

Property        | Type   | Description
--------        | ----   | -----------
`email_id`      | String | An ID used to identify the email.
`email_subject` | String | The email's subject line.
`campaign_id`   | String | An id used to identify a campaign
`campaign_name` | String | A name used to identify a campaign

#### Context

This event supports the following semantic context properties:

Property               | Type   | Description
--------               | ----   | -----------
`context.traits`       | Object | An associative array about the email's intended recipient.
`context.traits.email` | String | The intended recipient's email address.

##### Example

{% comment %} api-example '{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Bounced",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "pgibbons@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount"
  }
}'}}} {% endcomment %}

```js
{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Bounced",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "pgibbons@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount"
  }
}
```


### Email Delivered

This event should be fired when the receiving mail server confirms receipt of an email.

#### Properties

This event supports the following semantic properties:

Property        | Type   | Description
--------        | ----   | -----------
`email_id`      | String | An ID used to identify the email.
`email_subject` | String | The email's subject line.
`campaign_id`   | String | An id used to identify a campaign
`campaign_name` | String | A name used to identify a campaign

#### Context

This event supports the following semantic context properties:

Property               | Type   | Description
--------               | ----   | -----------
`context.traits`       | Object | An associative array about the email's intended recipient.
`context.traits.email` | String | The intended recipient's email address.

##### Example

{% comment %} api-example '{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Delivered",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "pgibbons@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount"
  }
}'}}} {% endcomment %}

```js
{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Delivered",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "pgibbons@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount"
  }
}
```


### Email Link Clicked

This event should be fired when the recipient clicks on a link in the email's body.

#### Properties

This event supports the following semantic properties:

Property        | Type   | Description
--------        | ----   | -----------
`email_id`      | String | An ID used to identify the email.
`email_subject` | String | The email's subject line.
`campaign_id`   | String | An id used to identify a campaign
`campaign_name` | String | A name used to identify a campaign
`link_id`       | String | An id used to identify a link
`link_url`      | String | The URL the link points to.


#### Context

This event supports the following semantic context properties:

Property               | Type   | Description
--------               | ----   | -----------
`context.ip`           | Object | The opening computer's public IP address.
`context.traits`       | Object | An associative array describing the email's intended recipient.
`context.traits.email` | String | The intended recipient's email address.
`context.user_agent`   | String | The opening browser's user agent.

#### Example

{% comment %} api-example '{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Link Clicked",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "joanna@chotchkies.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount",
    "link_id": "101",
    "link_url": "https://www.buymyshirts.com?promo=NEWCUSTOMER"
  }
}'}}} {% endcomment %}

```js
{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Link Clicked",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "joanna@chotchkies.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount",
    "link_id": "101",
    "link_url": "https://www.buymyshirts.com?promo=NEWCUSTOMER"
  }
}
```


### Email Marked as Spam

This event should be fired when a recipient marks an email as spam.

#### Properties

This event supports the following semantic properties:

Property        | Type   | Description
--------        | ----   | -----------
`email_id`      | String | An ID used to identify the email.
`email_subject` | String | The email's subject line.
`campaign_id`   | String | An id used to identify a campaign
`campaign_name` | String | A name used to identify a campaign

#### Context

This event supports the following semantic context properties:

Property               | Type   | Description
--------               | ----   | -----------
`context.ip`           | Object | The opening computer's public IP address.
`context.traits`       | Object | An associative array describing the email's intended recipient.
`context.traits.email` | String | The intended recipient's email address.
`context.user_agent`   | String | The opening browser's user agent.

#### Example

{% comment %} api-example '{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Marked as Spam",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "mwaddams@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount"
  }
}'}}} {% endcomment %}

```js
{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Marked as Spam",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "mwaddams@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount"
  }
}
```


### Email Opened

This event should be fired when the recipient opens the email.

#### Properties

This event supports the following semantic properties:

Property        | Type   | Description
--------        | ----   | -----------
`email_id`      | String | An ID used to identify the email.
`email_subject` | String | The email's subject line.
`campaign_id`   | String | An id used to identify a campaign
`campaign_name` | String | A name used to identify a campaign

#### Context

This event supports the following semantic context properties:

Property               | Type   | Description
--------               | ----   | -----------
`context.ip`           | String | The opening computer's public IP address.
`context.traits`       | Object | An associative array describing the email's intended recipient.
`context.traits.email` | String | The intended recipient's email address.
`context.user_agent`   | String | The opening browser's user agent.

#### Example

{% comment %} api-example '{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Opened",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "pgibbons@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount"
  }
}'}}} {% endcomment %}

```js
{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Email Opened",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "pgibbons@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount"
  }
}
```


### Unsubscribed

This event should be fired when the recipient unsubscribes from the email. The unsubscription can either happen for a particular list, or globally from all marketing emails, depending on the tool. Typically you cannot unsubscribe from a transactional email such as a password reset.

#### Properties

This event supports the following semantic properties:

Property        | Type   | Description
--------        | ----   | -----------
`email_id`      | String | An ID used to identify the email.
`email_subject` | String | The email's subject line.
`campaign_id`   | String | An id used to identify a campaign
`campaign_name` | String | A name used to identify a campaign
`list_id`   | String | An optional id used to identify a list
`list_name` | String | An optional name used to identify a list


#### Context

This event supports the following semantic context properties:

Property               | Type   | Description
--------               | ----   | -----------
`context.ip`           | String | The opening computer's public IP address.
`context.traits`       | Object | An associative array describing the email's intended recipient.
`context.traits.email` | String | The intended recipient's email address.
`context.user_agent`   | String | The opening browser's user agent.

#### Example

{% comment %} api-example '{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Unsubscribed",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "pgibbons@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount",
    "list_id": "1425",
    "list_name": "New customers"
  }
}'}}} {% endcomment %}

```js
{
  "user_id": "019mr8mf4r",
  "action": "track",
  "event": "Unsubscribed",
  "context": {
    "ip": "67.207.109.102",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
    "traits": {
      "email": "pgibbons@example.com"
    }
  },
  "properties": {
    "email_id": "18vzF7u3z",
    "email_subject": "First shirt on us!",
    "campaign_id": "123",
    "campaign_name": "New Customer Discount",
    "list_id": "1425",
    "list_name": "New customers"
  }
}
```
