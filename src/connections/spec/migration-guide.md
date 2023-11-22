---
title: Migration Guide
hidden: true
---

Use this document if you intend to migrate from the old webhooks format to the new [data format (version 2)][format].

Webhooks will continue to send along _both_ sets of keys until April 6th, 2015. For any strings which have become objects, the _old_ format will be sent until April 6th, 2015.

## Common fields

The following changes affect all API calls which contain these fields:

* added `receivedAt` timestamp field
* added `sentAt` timestamp field
* `action` field is now lowercased and called `type`
* `sessionId` fields are now called `anonymousId`

## Context

The following changes affect only the `options` or `context` object. The standard naming going forward will be `context`.

* `options` is now `context`
* `options.providers` is now top-level `integrations`
* `library` is now an `Object`
* `library` now contains `name` and `version`
* `screenWidth` is now `screen.width`
* `screenHeight` is now `screen.height`
* `appReleaseVersion` is now `app.version`
* `appVersion` is now `app.build`
* `library-version` is now `library.version`
* `deviceModel` is now `device.model`
* `deviceManufacturer` is now `device.manufacturer`
* `idForAdvertiser` is now `device.idfa`
* `osVersion` is now `os.version`
* `options.os` is now an `Object`

## Alias

The following changes only affect the Alias method.

* `from` is now `previousId`
* `to` is now `userId`

If you're using node, you can use our [`segmentio/transform-legacy`][transform-legacy] library to convert your messages into the `version 1` format. This is the same library that will be integrated into our webhooks until April 6th, 2015.


[transform-legacy]: https://github.com/segmentio/transform-legacy
[format]: /docs/connections/spec
