---
title: 'Protocols: APIs and Extensions'
sidebar: APIs and Extensions
---

## Config API

Protocols customers get access to the Segment Config API, which enables programmatic creation, configuration, and fetching of core Segment platform resources such as Sources, Destinations, and now Tracking Plans. The Config API represents Segment's commitment to developers, enabling customers to extend their workflows around customer data collection and activation. The Config API will be generally available to customers in coming months and will be evolving with more functionality throughout next year.

### Supported Operations

- **List Tracking Plans**
- **Get Tracking Plan**
- **Create Tracking Plan**
- **Update Tracking Plan**
- **Delete Tracking Plan**

Comprehensive documentation with Guides, Tutorials, and References for the Config API is available to Protocols customers at [https://segment.com/docs/config-api/](https://segment.com/docs/config-api/).

## Debug Endpoint

This endpoint enables customers to send sample `.track()`, `.identify()`, `.group()`, `.page()` and `.screen()` requests to a debug endpoint that will return an error response if that payload is invalid. The event payload will not be delivered to the Segment Source or any active Destinations.
Customers can use this endpoint in testing suites or to test payloads against current Schema filters or a Tracking Plan spec. Follow the instructions below to test sample payloads without delivering the event to Segment or downstream Destinations.

**Endpoint:** https://debug-api.segment.com/v1/<<Segment request type>>

**Authentication:** This endpoint uses the same Authentication protocol outlined in our [HTTP docs](/docs/sources/server/http/#authentication).

### Enable debug mode with Analytics.js

The following snippet can be added to your dev environment or executed in a web console to use the debug endpoint. When enabled, all outbound Segment events will hit the debug endpoint. Events will not be delivered to Segment Destinations, so make sure to disable this when deploying your code to production.

```
analytics.Integrations["Segment.io"].prototype._enqueue = analytics.Integrations["Segment.io"].prototype.enqueue;
analytics.Integrations["Segment.io"].prototype.enqueue = function(path, msg, fn) {
  this.options.apiHost = 'debug-api.segment.com/v1'
  return this._enqueue(path, msg, fn)
};
```

### Enable debug mode with querystring flag

Analytics.js does not have a built-in ‘debug mode’ flag yet. You can add a querystring flag to your Segment instrumentation with the following snippet:
```  
// Point to the debug-api when the URL contains the query param "?segment_debug=true"

var apiHost;
if (window.location.href.indexOf('segment_debug=true') !== -1) {
  apiHost = 'debug-api.segment.com/v1';
} else {
  apiHost = 'api.segment.io/v1';
}

analytics.load("YOUR_WRITE_KEY", {
  integrations: {'Segment.io': { apiHost: apiHost } }
});
```

**NOTE: Make sure this is only used in development environments since the debug-api does not send data downstream!**

### Error responses

The debug endpoint API will return detailed errors depending on the violation generated.

| Error Response | Description|
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Invalid JSON` | The JSON payload is invalid. Check to make sure your payload contains valid JSON. |
| `Invalid writeKey` | Segment source writekey is not valid. Check your source settings. |
| `Missing writeKey` | Segment source writekey is missing from payload. Make sure writekey is included in request. |
| `Missing event key for track call` | The payload is missing track call name. Make sure your payload includes `"``event``"``:``"``My Event Name``"`.|
| `Event must be a string` | The payload has an event key, but the value is not a string. Make sure the value associated with the `event` key is a string. |
| `Missing userId or anonymousId` | Every Segment event must contain either a `userId`, `anonymousId` or both. Make sure to include 1 or both IDs in your payload.|
| `context integrations must be an object` | When specifying event context or integrations, they must be passed in an object. Make sure the value associated with the `context` or `integrations` key is an object.|
| `Disabled event` | The event has either been disabled in Schema or is not included in your Tracking Plan. If you expect this event to be enabled, check your Source schema tab to see if the event is disabled, or add it to the Tracking Plan associated to the Source. |
| `properties.Required: properties.Required is required` | The event is missing a required property defined in the Tracking Plan. If the event does not require the property, update the Tracking Plan associated to the source. Otherwise, update the request payload. |
| `properties.Optional: Invalid type. Expected: string, given: array` | The event property is passing as an array, but expects a string as defined in the Tracking Plan. If the event property should be an array, update the Tracking Plan associated to the source. Otherwise, update the request payload. |

## End to End API Example

**NOTE: These APIs are beta, which means that their names and functionality might change. If you find any bugs or have any feedback, please [contact us](https://segment.com/help/contact/).**

### Create a Personal Access Token

Programmatic access to the Config API for resources that you own happens through personal access tokens. Personal access tokens belong to Segment users, and can be used to access resources owned by the user who created them.

To set up Segment Protocols through the API you first need to create a personal access token with **full access** to your workspace through the `workspace` scope. Use your Segment account email and password:

```shell
$ USER=me@example.com
$ PASS=<your Segment password>
$ WORKSPACE=<your Segment workspace>

$ curl \
  -d "{'access_token': {'description': 'my access token', 'scopes': 'workspace', 'workspace_names': ['workspaces/$WORKSPACE']}}" \
  -u "$USER:$PASS" \
  https://platform.segmentapis.com/v1beta/access-tokens
```

Example response:

```json
{
  "name": "access-tokens/5",
  "description": "my access token",
  "scopes": "workspace",
  "workspace_names": ["workspaces/example"],
  "create_time": "2018-10-12T22:36:39Z",
  "token": "qiTgISif4zprgBb_5j4hXfp3qhDbxrntWwwOaHgAMr8.gg9ok4Bk7sWlP67rFyXeH3ABBsXyWqNuoXbXZPv1y2g"
}
```

**Note that you can not retrive the plain-text `token` later, so you should save it in a secret manager.**

### Create a Source

The Config API enables you to create event sources, each of which has a corresponding unique "write key" that you configure the Segment SDK with.

Let's create an event source to see how the Tracking Plan works on data we send to it:

```shell
$ ACCESS_TOKEN=<ACCESS-TOKEN-VALUE>

$ curl \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d "{'source': {'name': 'workspaces/$WORKSPACE/sources/js', 'catalog_name': 'catalog/sources/javascript'}}" \
  https://platform.segmentapis.com/v1beta/workspaces/$WORKSPACE/sources
```

Example response:

```json
{
 "name": "workspaces/example/sources/js",
 "parent": "workspaces/example",
 "catalog_name": "catalog/sources/javascript",
 "write_keys": [
  "LxKXARX9IuqR9v0gn7y2Fw1iHi0ephbF"
 ],
 "library_config": {
  "metrics_enabled": false,
  "retry_queue": false,
  "cross_domain_id_enabled": false,
  "api_host": ""
 },
 "create_time": "2018-09-12T21:15:54.169Z"
}
```

For good measure, let's send a couple of events to our new Source. Note that `event` and `userID` are required. See the [Tracking API spec](https://segment.com/docs/sources/server/http/#track) for more details.

```shell
$ WRITE_KEY=LxKXARX9IuqR9v0gn7y2Fw1iHi0ephbF

$ curl https://api.segment.io/v1/track \
  -u $WRITE_KEY: \
  -H 'Content-type: application/json' \
  -d '{
    "event": "User Logged In",
    "userId": "78e56a08-ad10-42b1-88d2-b823623ac875",
    "properties": {
      "username": "user1"
    }
  }'

$ curl https://api.segment.io/v1/track \
  -u $WRITE_KEY: \
  -H 'Content-type: application/json' \
  -d '{
    "event": "User Login",
    "userId": "45677435-e419-475D-a884-c0a01bd36619",
    "properties": {
      "userName": "user2"
    }
  }'
```

To verify your events were sent to the Source, open the event debugger in your browser, e.g. https://app.segment.com/example/sources/js/debugger.

![](../platform-api/images/tracking-plan-debugger.png)

### Create a Tracking Plan

Now we can configure a Tracking Plan on the workspace. Here we define that we only expect a single event `User Logged In` with a required `username` property. This will help us find and eliminate events with subtle differences like the name `User Login` or properties like `userName`, resulting in pristine data in Segment and all Destinations.

```shell
$ curl \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d '{
      "tracking_plan": {
        "display_name": "My Tracking Plan",
        "rules": {
          "events": [
            {
              "rules": {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "type": "object",
              "properties": {
                "properties": {
                  "type": "object",
                  "properties": {
                    "username": {
                    "description": "",
                    "id": "/properties/properties/properties/username",
                    "type": "string"
                    }
                  },
                  "required": [
                    "username"
                  ]
                }
              },
              "required": [
                "properties"
              ]
              },
              "name": "User Logged In",
              "description": "Sent when a user logs into the web app"
            }
          ]
        }
      }
    }' \
    https://platform.segmentapis.com/v1beta/workspaces/$WORKSPACE/tracking-plans
```

Example response:

```json
{
 "name": "workspaces/example/tracking-plans/rs_1AAPTLy8ffAAQth0PvL8rOvU6PJ",
 "display_name": "My Tracking Plan",
 "rules": {
  "events": [
   {
    "name": "User Logged In",
    "description": "Sent when a user logs into the web app",
    "rules": {
     "properties": {
      "properties": {
       "properties": {
        "username": {
         "type": "string",
         "description": "",
         "id": "/properties/properties/properties/username"
        }
       },
       "required": [
        "username"
       ],
       "type": "object"
      }
     },
     "required": [
      "properties"
     ],
     "$schema": "http://json-schema.org/draft-04/schema#",
     "type": "object"
    }
   }
  ]
 },
 "create_time": "2018-09-13T19:20:37Z",
 "update_time": "2018-09-13T19:20:37Z"
}
```

### Update a Tracking Plan

Over time the Tracking Plan will evolve and include more events. We can update the plan to include another event `User Created` with a required `username` property:

```shell
$ curl \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -X PUT \
  -d '{
    "update_mask": {
      "paths": [
        "tracking_plan.display_name",
        "tracking_plan.rules"
      ]
    },
    "tracking_plan": {
      "display_name": "My Updated Tracking Plan",
      "rules": {
        "events": [
          {
            "rules": {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "type": "object",
              "properties": {
                "properties": {
                  "type": "object",
                  "properties": {
                    "username": {
                      "description": "",
                      "id": "/properties/properties/properties/username",
                      "type": "string"
                    }
                  },
                  "required": [
                    "username"
                  ]
                }
              },
              "required": [
                "properties"
              ]
            },
            "name": "User Logged In",
            "description": "Sent when a user logs into the web app"
          },
          {
            "rules": {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "type": "object",
              "properties": {
                "properties": {
                  "type": "object",
                  "properties": {
                    "username": {
                      "description": "",
                      "id": "/properties/properties/properties/username",
                      "type": "string"
                    }
                  },
                  "required": [
                    "username"
                  ]
                }
              },
              "required": [
                "properties"
              ]
            },
            "name": "User Created",
            "description": "Sent when a user is created in the web app"
          }
        ]
      }
    }
  }' \
  https://platform.segmentapis.com/v1beta/workspaces/$WORKSPACE/tracking-plans/rs_1AAPTLy8ffAAQth0PvL8rOvU6PJ
```

```json
{
  "name": "workspaces/example/tracking-plans/rs_1AqjFLhQGTrpI7k3cipnSVF71n2",
  "display_name": "My Updated Tracking Plan",
  "rules": {
    "events": [
      {
        "name": "User Logged In",
        "description": "Sent when a user logs into the web app",
        "rules": {
          "required": [
            "properties"
          ],
          "$schema": "http://json-schema.org/draft-04/schema#",
          "type": "object",
          "properties": {
            "properties": {
              "type": "object",
              "properties": {
                "username": {
                  "description": "",
                  "id": "/properties/properties/properties/username",
                  "type": "string"
                }
              },
              "required": [
                "username"
              ]
            }
          }
        }
      },
      {
        "name": "User Signed Up",
        "description": "Sent when a user signs up for the web app",
        "rules": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "type": "object",
          "properties": {
            "properties": {
              "required": [
                "username"
              ],
              "type": "object",
              "properties": {
                "username": {
                  "type": "string",
                  "description": "",
                  "id": "/properties/properties/properties/username"
                }
              }
            }
          },
          "required": [
            "properties"
          ]
        }
      }
    ]
  },
  "create_time": "2018-09-28T18:55:19Z",
  "update_time": "2018-09-28T18:58:03Z"
}
```

### Review and Start Blocking Non-Conforming Data

Now we can review the Tracking Plan and use it to block events.

Open the Protocols section in your browser, e.g. https://app.segment.com/example/protocols.

Click on "My Tracking Plan" to open the editor and review the events.

![](../../platform-api/images/tracking-plan-editor.png)

Now open the Source Schema in your browser, e.g. https://app.segment.com/example/sources/js/schema2/events. We can see the that one event we sent conforms to the plan, and the other does not.

![](../../platform-api/images/tracking-plan-schema.png)

Now connect the tracking plan to the source:

```shell
$ curl \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -X POST \
  -d "{'source_name': 'workspaces/$WORKSPACE/sources/js'}" \
  https://platform.segmentapis.com/v1beta/workspaces/$WORKSPACE/tracking-plans/rs_1AqjFLhQGTrpI7k3cipnSVF71n2/source-connections
```

Example response:

```json
{
 "source_name": "workspaces/segment-noah/sources/js",
 "tracking_plan_id": "rs_1AqjFLhQGTrpI7k3cipnSVF71n2"
}
```

Now we can go all-in on the Tracking Plan, and block events that don't conform from being sent to Destinations.

Click "Edit" next to "Unplanned Data", and select "Block" for unplanned track calls.

![](../../platform-api/images/tracking-plan-block.png)

From here, we can also configure a Source to receive violation notifications.

You can verify how the Tracking Plan works by sending events to the [`debug-api.segment.com`](#debug-api) endpoint. 

We'll use the write keys returned from the creation operation against the Sources API as the password to the debug tracking API. 

Example command:

```shell
$ curl https://debug-api.segment.com/v1/track \
  -u $WRITE_KEY: \
  -H 'Content-type: application/json' \
  -d '{
    "event": "User Logged In",
    "userId": "78e56a08-ad10-42b1-88d2-b823623ac875",
    "properties": {
      "username": "user1"
    }
  }'
```

Example response:

```json
{
  "success": true
}
```

Example command:

```shell
$ curl https://debug-api.segment.com/v1/track \
  -u $WRITE_KEY: \
  -H 'Content-type: application/json' \
  -d '{
    "event": "User Logged In",
    "userId": "78e56a08-ad10-42b1-88d2-b823623ac875",
    "properties": {
      "userName": "user1"
    }
  }'
```

Example response:

```json
{
  "success": false,
  "message": "properties.username: properties.username is required"
}
```

Example command:

```shell
$ curl https://debug-api.segment.com/v1/track \
  -u $WRITE_KEY: \
  -H 'Content-type: application/json' \
  -d '{
    "event": "User Login",
    "userId": "45677435-e419-475D-a884-c0a01bd36619",
    "properties": {
      "userName": "user2"
    }
  }'
```

Example response:

```json
{
  "success": false,
  "message": "Disabled event"
}
```

## Google Sheets Tracking Plan Uploader

Thousands of Segment customers have used Google Sheets to build Tracking Plans. We created the following template to help you draft a Tracking Plan and easily upload that Tracking Plan to Segment. Keep in mind that uploading changes from Google Sheets will overwrite any changes made within the Segment UI.

[Link to Tracking Plan Google Sheets template](https://docs.google.com/spreadsheets/u/1/d/1ZHGfNrCxBQbEyevmVxNoU0DGjb8cJMro1iwIRZLWjPw/copy) (Feel free to make a copy!)

To upload your Tracking Plan directly from Google Sheets, follow these steps:

1. Generate a Personal Access Token following the steps [here](#create-a-personal-access-token)
2. Copy your Personal Access Token, your Workspace's slug and your tracking plan's `rs_` id (found in the URL path of your Tracking Plan) to the Importer Settings worksheet. Then click on the Segment > Send to Segment menu item to upload your Tracking Plan to Segment.
