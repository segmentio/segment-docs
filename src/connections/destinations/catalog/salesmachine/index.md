---
title: Salesmachine Destination
id: 560a21320a20f4e22f0fb5ca
---
This destination is maintained by Salesmachine.

## Getting Started

In order to push segment data to Salesmachine.io, you need to provide Salesmachine.io api_token and api_secret. This tokens are available on the [administration panel](https://my.salesmachine.io/app/api/edit).

Salemachine.io supports the `identify`, `track`, `page`, `group` and `alias` methods.

## Page

When you call a `page` event, we send a pageview to Salesmachine.io which manages automatically new sessions.
When your page is [named](/docs/connections/spec/page/#name), we send a pageview to Salesmachine.io and an event with the name of this page.
_You must add `account_uid` in event parameters to automatically link this pageview to an account. However, if the contact that performed the pageview has only one account, Salesmachine.io will automatically link the event to his account._

## Identify

When you `identify` a user, we'll pass that user's information to Salesmachine.io. For a better experience with Salesmachine.io we encourage you to add at least `name` and `email` traits.
_You must add `account_uid` in traits to automatically link this user to a Salesmachine.io account.
_
## Track

When you `track` an event, we will send that event to Salesmachine.io.(include details about how that event is sent).
_You must add `account_uid` in event parameters to automatically link this event to an account. However, if the contact that performed the event has only one account, Salesmachine.io will automatically link the event to his account._

## Group

When you call `group`, we will send an account call to Salesmachine.io and link the provided user to this account. Group's traits will be sent as Salesmachine.io account's information.

## Alias

When you call `alias`, we will send an alias call to Salesmachine.io.
