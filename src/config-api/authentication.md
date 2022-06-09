---
title: Authentication
---

You can access the Config API programmatically using access tokens. When you authenticate with an access token, you have access to any resource and permission assigned to the token.

## Create an Access Token

As a workspace owner, you can create access tokens from the Access Management page in Admin settings. You can assign the same granularity of permissions as you can for a logged-in user. As best practice, tokens should be assigned the least permissions needed to perform a required API action. All tokens must have a description.

> warning "Secret Token"
> You can not retrieve the plain-text `token` later, so you should save it in a secret manager. If you lose the `token` you can generate a new one.

## Use an Access Token

Now that you have an access token, you can use this token to access the Config API by setting it in the `Authorization` header of your requests, for example:

```shell
$ ACCESS_TOKEN=qiTgISif4zprgBb_5j4hXfp3qhDbxrntWwwOaHgAMr8.gg9ok4Bk7sWlP67rFyXeH3ABBsXyWqNuoXbXZPv1y2g

$ curl \
  -X GET \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  https://platform.segmentapis.com/v1beta/workspaces
```

Example response:

```json
{
  "workspaces": [
    {
      "name": "myworkspace",
      "display_name": "My Space",
      "id": "e5bdb0902b",
      "create_time": "2018-08-08T13:24:02.651Z"
    }
  ]
}
```

## Scopes

You cannot use access tokens created with the `workspace:read` scope to create or update resources. If you do so, you'll get the following error:

```json
{
  "error": "insufficient scope",
  "code": 7
}
```

See [Config API Errors](/docs/config-api/api-design/#errors) for error codes.
