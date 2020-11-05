---
title: API Design
---

## API Evolution: Versioning and Compatibility

Segment strives to maintain a strict contract around the stability of our APIs once they reach maturity.

The Config API is versioned statically by path prefix. The current version, `/v1beta`, is stable and suitable for production use, but not 100% mature. We will not ship any backwards incompatible breaking changes after its public launch on December 12, 2018. However, we may release new versions of the API as further `/v1betaX` releases or as major version releases (such as `/v1`).

The reason the path is currently `/v1beta` is to signify both that Segment's product model is evolving and that we are looking for feedback from developers on how best to expose that model for public consumption, extension, and automation.

Therefore, `/v1beta` is subject to deprecation with 3 months of written notice after the release of `/v1`, should we decide to land any breaking changes in the final `/v1` release.

We're always actively seeking feedback on the ergonomics and breadth of our APIs. If you have ideas of how we can improve them that you'd like to see as extensions to `/v1beta` or considered for changes in `/v1`, don't hesitate to [get in touch](https://segment.com/help/contact/).

## Common Methods and Fields

The Config API is a set of REST APIs for managing Segment resources. The primary Segment resources are:

* Personal Access Tokens
* Workspaces
* Sources
* Destinations
* Tracking Plans

You can manage each resource using standard methods:

| Method | HTTP Mapping          |
|--------|-----------------------|
| List   | GET <collection URL>  |
| Get    | GET <resource URL>    |
| Create | POST <collection URL> |
| Update | PATCH <resource URL>  |
| Delete | DELETE <resource URL> |

## Errors

| Error              | HTTP Status               | Code | Reasons                                                                                               |
|--------------------|---------------------------|------|-------------------------------------------------------------------------------------------------------|
| Invalid Argument   | 400 Bad Request           | 3    | The request contains invalid JSON or a field contains an invalid value                                |
| Unauthenticated    | 401 Unauthorized          | 16   | The access token is missing or invalid                                                                |
| PermissionDenied   | 403 Forbidden             | 7    | An access token with `write` scope is required for the Create, Update and Delete methods              |
| Not Found          | 404 Not Found             | 5    | The request or resource could not be found. Either the request method or path is incorrect, or the resource does not exist in this workspace (sometimes because of a typo). |
| Already Exists     | 409 Conflict              | 6    | A resource (e.g. source) already exists with the given name                                           |
| Resource Exhausted | 429 Too Many Requests     | 8    | The 60 req / sec rate limit was exhausted                                                             |
| Internal           | 500 Internal Server Error | 13   | Segment encountered an error processing the request                                                   |
| Unimplemented      | 501 Not Implemented       | 12   | The method is not supported or implemented                                                            |
| Unavailable        | 503 Service Unavailable   | 14   | The API is down                                                                                       |
| upstream connect error <br /> or disconnect/reset before headers | 503 Service Unavailable | n/a | The URL is invalid so the requesst can't route to an upstream API service          |

## Pagination

The List method is paginated. Requests take an optional `page_size` parameter which generally defaults to 10 or 100 items. If there are more than `page_size` items in a collection, the response includes a `next_page_token` field. You can then supply this as `page_token` parameter to the next List request. If there are no more items in the collection, `next_page_token` will be empty.

## Update Mask

Update methods follow PATCH semantics. In addition to the data to update, the method requires an explicit set of field names to update. This removes all ambiguity around empty values.

```shell
$ curl -X PATCH \
  -h "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
	"destination": {
		"enabled": true,
    "update_mask": {
		  "paths": [
  			"destination.enabled"
	  	]
    }
  }'
  'https://platform.segmentapis.com/v1beta/workspaces/myworkspace/sources/js/destinations/google-analytics'
```

Note that specifying an update path with no value will change the field to an empty value (e.g. "", 0, or false). For example this will result in `enabled` false:

```shell
$ curl -X PATCH \
  -h "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
	"destination": {
    "update_mask": {
		  "paths": [
  			"destination.enabled"
	  	]
    }
  }'
  'https://platform.segmentapis.com/v1beta/workspaces/myworkspace/sources/js/destinations/google-analytics'
```

And note that specifying data but no paths will not change the field value. For example this has no effect:

```shell
$ curl -X PATCH \
  -h "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
	"destination": {
    "enabled": true
  }'
  'https://platform.segmentapis.com/v1beta/workspaces/myworkspace/sources/js/destinations/google-analytics'
```

## Resource Names

Resources are named entities exposed by our services and APIs, and resource names are their identifiers. Each resource has its own unique resource name made up of the ID or slug of the resource itself and the IDs or slugs of any parent resources.

So a given Source resource might look like:

`workspaces/<customer-workspace-slug>/sources/<customer-source-slug>`

Segment APIs use scheme-less URIs for resource names. This allows us to generally follow REST URL conventions and provides a machine and human-legible standard for our identifiers.

Segment favors "slugs" over opaque IDs when the resource is customer- or Segment-named and unlikely to change, such as sources and destinations. For resources whose name is subject to change frequently, such as Tracking Plans, we will autogenerate prefixed IDs for you upon creation and use that in the fully qualified resource name.

While full resource names resemble normal URLs, they are not the same thing. A single resource may be exposed by different API versions, API protocols, or API network endpoints as Segment's APIs evolve.
