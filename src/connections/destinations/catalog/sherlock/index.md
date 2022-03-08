---
rewrite: true
title: Sherlock Destination
id: 5a947eee1ad6310001435883
---
Sherlock is the first engagement scoring application for SaaS businesses who want to truly understand user engagement. Build an engagement algorithm and understand the engagement of your users, accounts and segments.

This integration is maintained by Sherlock. For questions or help with your integration, contact [Sherlock support][support@sherlockscore.com].


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Sherock" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter your Sherlock API Key in the Segment UI.
4. Start sending data!

## Data Tracking

Sherlock's system processes data for all tracking calls with the following notes.

### Page and Screen

When Sherlock receives `page` calls, they record a `Viewed Page` event. Sherlock sets a `Viewed Page: Page Name` property on it with the `name` from the page call.

Similarly when Sherlock receives a `screen` call, they record a `Viewed Screen` event with a `Viewed Screen: Screen Name` property.

### Group

When Sherlock receives a `group` call, they record all traits specified for the group. They also assign a `Group ID` trait to to the user indicating membership.

### Alias

When they receive an `alias` call, they record an alias for the specified `userId` and `previousId`. Data under both names are then merged into a single record.

### Nested Objects and Arrays

Sherlock's system flattens nested property and trait values into key/value pairs. Consider an object:

```javascript
{
  "id": 42,
  "item": {
    "name": "Hat",
    "details": {
      "color": "red",
      "size": "small"
    }
  }
}
```

This would be flattened into pairs with keys for each path delimited by `.`:

```javascript
{
  "id": 42,
  "item.name": "Hat",
  "item.details.color": "red",
  "item.details.size": "small"
}
```

Array values are unsupported and ignored by Sherlock's system.
