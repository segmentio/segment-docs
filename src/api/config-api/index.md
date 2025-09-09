---
title: Config API Overview
redirect_from:
  - '/config-api'
---

{% include content/papi-ga.html %}

The Config API lets you programmatically manage Segment workspaces, sources, destinations, and more. 

With the Config API, you can:

- List all your workspace sources and destinations to see how data flows through Segment.
- Create new destinations - or delete them -  with a few lines of code.
- Create new users and assign them to scoped roles.
- Configure, disable, or view sources and manage connected destinations.
- Get a complete view of all the sources and destinations available in Segment's catalog.
- Configure a Tracking Plan to see how data conforms to your expected schema.
- Query Event Delivery metrics to build custom dashboards and alerts to monitor delivery of your events to destinations.
- Filter entire events or individual fields from reaching specific destinations.

The Config API is a set of REST services under segmentapis.com:

| Service                     | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| [Access Tokens](https://reference.segmentapis.com/#cd642f96-0fca-42a1-a727-e16fd33c7e8f){:target="_blank"}          | Manage access tokens                                   |
| [Source Catalog](https://reference.segmentapis.com/#7a63ac88-43af-43db-a987-7ed7d677a8c8){:target="_blank"}         | Get info about all event and cloud sources             |
| [Destination Catalog](https://reference.segmentapis.com/#361ed478-5e53-4835-ab7e-7dbff736524f){:target="_blank"}    | Get info about all destinations                        |
| [Workspaces](https://reference.segmentapis.com/#7ed2968b-c4a5-4cfb-b4bf-7d28c7b38bd2){:target="_blank"}             | Get info about workspaces                              |
| [Sources](https://reference.segmentapis.com/#5a852761-54d5-46da-8437-6e14e63449f3){:target="_blank"}                | Manage workspace sources                               |
| [Destinations](https://reference.segmentapis.com/#39ce0439-0969-48c3-ba49-b22a46c41060){:target="_blank"}           | Manage workspace destinations                          |
| [Tracking Plans](https://reference.segmentapis.com/#c4647e3c-fe1b-4e2f-88b9-6634841eb4e5){:target="_blank"}         | Manage workspace tracking plans                        |
| [Event Delivery Metrics](https://reference.segmentapis.com/#51d89077-efd7-429b-85d4-155ac2cd07aa){:target="_blank"} | Get event delivery metrics for cloud-mode destinations |
| [Destination Filters](https://reference.segmentapis.com/#6c12fbe8-9f84-4a6c-848e-76a2325cb3c5){:target="_blank"}    | Manage destination filters                             |
| [IAM](https://reference.segmentapis.com/?version=latest#c4b14304-9112-4803-aa26-c08678cbe26a){:target="_blank"}                   | Manage workspace users and roles                       |
| [Functions](https://reference.segmentapis.com/?version=latest#c0866f35-2f39-4dfd-9fd3-26a0003ae74c){:target="_blank"}             | Manage Functions                                       |


To see all the API methods and models see the [Segment Config API Reference](https://reference.segmentapis.com/){:target="_blank"}.

At this time there are no language-specific clients. However the [API Reference](https://reference.segmentapis.com/){:target="_blank"} also contains example code snippets for cURL, Go, Node, Python, and more.

## Quick start

You can call the API from the command line. First, install `curl`:

```shell
$ brew install curl
```

### Access tokens

You can use the Config API with an access token to programmatically access Segment resources that the token can access. Access tokens are created by workspace owners using the **Access Management** page, and can only access resources that the token has permission to.

These are currently only suitable for first party, trusted applications, such as your personal local scripts and server side programs. Partners should not prompt Segment users for their username and password and save an access token as a way to delegate access. See the [Authentication](/docs/api/config-api/authentication/) doc for more information.

When you create an access token, you'll give it a description, a workspace, and determine whether it has workspace owner or member access.

> warning "Secret token"
> You can not retrieve the plain-text `token` later, so you should save it in a secret manager. If you lose the `token` you can generate a new one.

> info ""
> As of February 1, 2024, new Config API tokens cannot be created in the app as Segment moves toward exclusive support for the [Public API](/docs/api/public-api/). [Migrate your implementation to the Public API](https://docs.segmentapis.com/tag/Migration){:target="_blank”} to access the latest features and available endpoints. To create a new Config API token, [contact Segment](mailto:friends@segment.com) for support. 

### API requests

Now that you have an access token, you can use this token to access the rest of the Config API by setting it in the `Authorization` header of your requests, for example:

```shell
$ ACCESS_TOKEN=qiTgISif4zprgBb_5j4hXfp3qhDbxrntWwwOaHgAMr8.gg9ok4Bk7sWlP67rFyXeH3ABBsXyWqNuoXbXZPv1y2g

$ curl \
  -X GET \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  https://platform.segmentapis.com/v1beta/workspaces
```

<span class="example">Example response:</span>

```json
{
  "workspaces": [
    {
      "name": "workspaces/myworkspace",
      "display_name": "My Space",
      "id": "e5bdb0902b",
      "create_time": "2018-08-08T13:24:02.651Z"
    }
  ],
  "next_page_token": ""
}
```

## Reference

For an overview of the API's common design patterns and important information about versioning and compatibility, see the [API Design](/docs/api/config-api/api-design) document.

To see all the API methods and models see the [Segment Config API Reference](https://reference.segmentapis.com/){:target="_blank"}.
