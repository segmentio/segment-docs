---
rewrite: true
---
[Userlist.io](https://userlist.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows you to send behavior-based messages to your SaaS users. It’s great for onboarding users as well as nurturing them throughout their journey. 

This destination is maintained by Userlist.io. For any issues with the destination, please [reach out to their team](mailto:support@userlist.io).

_**NOTE:** The Userlist.io Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 5, 2019. If you are interested in joining their beta program or have any feedback to help improve the Userlist Destination and its documentation, please [let  their team know](mailto:support@userlist.io)!_


## Getting Started

{{>connection-modes}} 

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for “Userlist” within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the “Push API Key" into your Segment Settings UI which you can find from your [Userlist.io Push API settings](https://app.userlist.io/settings/push).

_**NOTE:** The Userlist.io Destination does not support tracking of anonymous users, so please make sure to call `identify` before calling `track`. If you do call `track` on unidentified users, you will receive a 400 error which you can disregard if it was intentional._

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

	analytics.identify('userId123', {
	  email: 'john.doe@segment.com',
	  name: 'John Doe',
	  role: 'Owner',
	  createdAt: '2019-03-21T12:12:54.735+01:00'
	});

Identify calls will be sent to Userlist.io as user records. If the `userId` is already known, it’ll update the user record, otherwise it’ll create a new one. 

Here’s how Segment fields map to Userlist users:

| Segment field | Userlist field | Description      
|-------------|---------------|-----------
| `userId` | `identifier` | The unique identifier for this user. |
| `traits` | `properties` | Additional properties describing the user. |
| `traits.email` | `email` | The user’s email address. |
| `traits.createdAt` | `signed_up_at` | The time when the user was created. |


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

	analytics.track('Project created', {
	  projectName: 'Party Planning'
	});

Track calls will be sent to Userlist.io as a new event. You may send additional properties to describe the event in more detail. Both the event name and additional properties will be stored with the event and normalized to snake case (`project_created` and `project_name`) automatically within Userlist.io. 
