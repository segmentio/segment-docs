---
title: Migrate to the Public API
---

The Segment Public API helps you manage your Segment workspaces and resources. You can perform CRUD (create, read, update, delete) operations on your Sources, Destinations, Warehouses with the Public API at no extra charge.

All endpoints follow REST conventions and use standard HTTP methods. URL endpoints represent various resources within your workspace.

## Getting started
Follow the steps below to generate a Public API token and make your first request.

### Generate a token
Similar to the [Config API](/config-api), the Segment Public API requires you to generate and apply an authentication token before you send requests.

> warning ""
> The Public API uses an `Authorization` header to authenticate requests, with a token format which is not compatible with existing Config API tokens.

To generate a Public API token in an existing workspace:

1. Log in to the Segment App, and select the workspace for which you want to generate the token. Tokens are scoped to the workspace in which they are generated, so each workspace needs its own token.
2. Navigate to **Settings** in the left menu. On the **Access Management** tab, click **Tokens**.
3. Click **+ Create Token** and follow the prompts. Select **Public API** as the token type.
4. Once you generate the token, store it somewhere safe, like a password store or other secrets manager.

### Add the token to your request

Copy the API token generated for your workspace, and send it as an `Authorization` header in your requests. Use the `Authorization: Bearer $TOKEN` format and substitute the `$TOKEN` variable for your token's key.

For example:

```curl

curl \
  --request GET \
  --url https://api.segmentapis.com/ \
  --header 'Authorization: Bearer $TOKEN'
```

> info ""
> If the Segment workspace is in the EU, make Public API requests to `eu1.api.segmentapis.com`.

## Migrate from the Config API
The Config API and Public API do not share common endpoints, although they are conceptually similar. 

To begin a migration, Segment recommends that you inspect the Config API endpoints you use, and find their counterparts in the Public API.

### Differences in operation
This section identifies areas where the Config API and Public API have fundamental differences.

#### URL patterns
The Public API uses a new and simplified URL format. Most URLs in the Public API follow this format:
```
VERB /object
VERB /object/id
VERB /object/id/nested-object
VERB /object/id/nested-object/id
```

For example:

```
GET /sources
PUT /destinations/fP7qoQw2HTWt9WdMr718gn
GET /destinations/fP7qoQw2HTWt9WdMr718gn/subscriptions/aJCn6DQsTLw9aBTqd34uQf
```

There are a few rare exceptions to this, where further nesting is required. For example, `GET /warehouses/{warehouseId}/connected-sources/{sourceId}/selective-syncs`.

#### Slugs vs IDs
The Config API uses slugs, for example `my-source` or `google-analytics`. The Public API uses IDs exclusively. This change brings the following benefits:
- There are no guarantees or expectations regarding the size, ordering, collation, or format to ID values.
- Once an object has an ID, it will not change over the lifespan of that object.
- All ID values are unique.

#### Workspace IDs are implied in the Public API
The Public API scopes all operations to a workspace. The workspace ID itself is not passed into requests, but is inferred as a result of authorizing the request.

Fields like `parent` or `workspace` in the Config API are removed from their Public API counterparts.

#### Enum values
All enumerated values in the Public API use `SCREAMING_UNDERSCORE` casing in all cases. These values are formatted the same in inputs and outputs.

### Rate limits
The Public API has limits on the number of requests you can send to Segment at one time. Segment calculates these limits globally for each sender IP address using a token. This means that if you have two IP addresses using the same token, each has its own rate limit. Specific endpoints may have custom rate limits based on the complexity or specific requirements of the operation.

#### Rate limit errors
Rate limited requests fail with the `429` status code. The failure includes a descriptive response, which contains metadata about the request limits.

| Field                  | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `message`              | A message that explains the rate limit error.                   |
| `data.msBeforeNext`    | The number of milliseconds before the rate limit expires.       |
| `data.remainingPoints` | The points remaining in the budget allocated for the operation. |
| `data.consumedPoints`  | The number of points used in the request                        |

#### Common causes of rate limits
The most common causes for a request to be rate limited include:
- Too many requests made against a resource in a short period of time.
- Requesting a large page count, or too many pages in a paginated resource to quickly.
- N+1 requests that are issued in a `for` loop with a large number of elements.
- Programs that restart automatically after crashing.

#### Address rate limit issues
Segment's Public API includes generous rate limits that allow normal workflows to complete. If you receive a rate limit error, review your requests to identify areas where you can reduce the number of individual calls, and use the following best practices to avoid or mitigate rate limit overages:

- Use list-based endpoints whenever possible. Avoid loading multiple hundreds of items using single-resource endpoints. For example, request a batch of destinations, rather than iterating over a list of single destinations.
- Consider using exponential backoffs when retrying operations.
- Avoid writing code that invokes the Segment Public API in a `for` loop. If you must use `for` loops, consider stopping code execution briefly using `sleep` calls between items in a list.
- Contact [Segment support](https://segment.com/help/contact/){:target="_blank"} if you think your workflows are being affected by unreasonable rate limits.

### Object limits
Some objects, like Sources, are subject to limits that depend on the account tier (free, team, business) of the workspace used to make the request.

### Size limits
Customers often ask about the size limits fro some endpoints, for example `Create Tracking Plan` and `Update Function`. For now,
- Tracking Plan endpoint requests are capped at **2mb**.
- Functions endpoint requests are capped at **25mb**.

## Endpoint mapping

