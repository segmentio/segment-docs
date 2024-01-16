---
title: Akita Customer Success Destination
id: 5fc76defdde39f67d4fa85de
---

[Akita](https://www.akitaapp.com.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides Customer Success Management tools for Software-as-a-Service applications--helping you nurture, retain and grow your customer base.

This destination is maintained by Akita. For any issues with the destination, contact [Akita support](mailto:support@akitaapp.com).

> info ""
> The Akita Destination is in beta, which means that they are still actively developing the destination. To join their beta program, or if you have any feedback to help improve the Akita Destination and its documentation, [contact the Akita support team](mailto:support@akitaapp.com)!

## Getting Started

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Akita" in the Destinations Catalog, and select the "Akita Customer Success" destination.
3. Choose which Source should send data to the "Akita Customer Success" destination.
4. Go to the ["Connect Segment" Page](https://beta.akitaapp.com/segment){:target="_blank"}, find and copy the "Segment.com API Key".
5. Enter the "API Key" in the "Akita Customer Success" destination settings in Segment.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify("contact_123", {
  email: "john.doe@example.com",
  groupId: "account_123" /** Optional **/,
});
```

Segment sends Identify calls to Akita as a `contact` event.

You may find a list of useful information to send as traits in your Identify call in the [Segment > Configure](https://beta.akitaapp.com/segment){:target="_blank"} tab in Akita.

Akita adds contacts described using Identify events as Contacts associated with the correct account.

> success ""
> Akita is primarily an Account management tool. All Contacts in Akita must be associated with one-and only one-Account. You must also use the Segment Group event (see below).

For best results, Akita recommends you also send the `groupId` (the identifier you send with Group) as a trait in all Identify events. This allows Akita to identify the Contact if you have not yet made the required Group call.

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("account_123", {
  name: "Initech",
  plan: "Enterprise",
});
```

Segment sends Group calls to Akita as an `account` event.

You may find a list of useful information to send as traits in your Group call in the [Segment > Configure](https://beta.akitaapp.com/segment){:target="_blank"} tab in Akita.

Accounts described using the Group event are added to Akita as Accounts.

> info ""
> Groups identified through Segment Group events become Accounts in Akita.

## Track

If you aren't familiar with the Track Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track("search:submit");
```

Segment sends Track calls to Akita as a `event` event.

## Page

If you aren't familiar with the Page Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page();
```

Segment sends Page calls to Akita as a `page` event.

> success ""
> You must send either `event` or `page` events (or both) for Akita to recognize and store your users Sessions.
