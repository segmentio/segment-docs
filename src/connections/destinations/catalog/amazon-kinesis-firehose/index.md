---
rewrite: true
title: Amazon Kinesis Firehose Destination
---
[Amazon Kinesis Firehose](https://aws.amazon.com/kinesis/data-firehose/) is the easiest way to load streaming data into AWS. It can capture, transform, and load streaming data into Amazon Kinesis Analytics, Amazon S3, Amazon Redshift, and Amazon Elasticsearch Service, enabling near real-time analytics with existing business intelligence tools and dashboards you're already using today. It is a fully managed service that automatically scales to match the throughput of your data and requires no ongoing administration. It can also batch, compress, and encrypt the data before loading it, minimizing the amount of storage used at the destination and increasing security.

This document was last updated on February 05, 2020. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. Create at least one Kinesis Firehose delivery stream. You can follow these [instructions](http://docs.aws.amazon.com/firehose/latest/dev/basic-create.html) to create a new delivery stream.
  2. Create an IAM policy.
	  - Sign in to the [Identity and Access Management (IAM) console](https://console.aws.amazon.com/iam/).
	  - Follow [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html#access_policies_create-json-editor) to create an IAM policy on the JSON to allow Segment permission to write to your Kinesis Firehose Stream.
     - Use the following template policy in the **Policy Document** field. Be sure to change the `{region}`, `{account-id}` and `{stream-name}` with the applicable values.


		```
		{
		   "Version": "2012-10-17",
		   "Statement": [
		       {
		           "Effect": "Allow",
		           "Action": [
		               "firehose:PutRecord"
		           ],
		           "Resource": [
		               "arn:aws:firehose:{region}:{account-id}:deliverystream/{stream-name}"
		           ]
		       }
		   ]
		}
		```


  3. Create an IAM role.
	  - Follow [these instructions](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html#roles-creatingrole-user-console) to create an IAM role to allow Segment permission to write to your Kinesis Firehose Stream.
	  - When prompted to enter an Account ID, enter `595280932656`.
	  - Select the checkbox to enable **Require External ID**.
	  - Enter your Segment Source ID as the **External ID**. This can be found in Segment by navigating to **Connections > Sources** and choosing the source you want to connect to your Kinesis Firehose destination. Click the **Settings** tab and choose **API Keys**.  
    - **Note:** If you have multiple sources using Kinesis, enter one of their source IDs here for now and then follow the procedure outlined in the [Multiple Sources](#best-practices) section at the bottom of this doc once you’ve completed this step and saved your IAM role.
      - When adding permissions to your new role, find the policy you created in step 2 and attach it.

4. Create a new Kinesis Firehose Destination.
    - In the Segment source that you want to connect to your Kinesis Firehose destination, click **Add Destination**.
    - Search and select the **Amazon Kinesis Firehose** destination and enter details for [these settings options](#settings).

## Page
Take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:
```javascript
  analytics.page();
```

## Identify
Take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example identify call is shown below:
```javascript
analytics.identify('97980cfea0085', {
  email: 'gibbons@example.com',
  name: 'John Gibbons'
});
```

## Track
Take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example identify call is shown below:

```javascript
analytics.track("User Registered", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

### Event Mapping
To begin using the Kinesis Firehose destination, you must first decide on which Segment events you would like to route to which Firehose delivery streams. This mapping then needs to be defined in your destination settings.

Segment `track` events can map based on their **event name**. For example, if you have an event called `User Registered`, and you want these events to be published to a Firehose delivery stream called `new_users`, you would create a row in your destination settings that looks like this:

![track event mapping screenshot](images/track_mapping.png)

Any Segment **event type** (ie. `page`, `track`, `identify`, `screen`, etc.) can also be mapped. This enables you to publish all instances of a given Segment event type to a given stream. To do this, create a row with the event type and its corresponding delivery stream:

![page event mapping screenshot](images/page_mapping.png)

Events can be defined **insensitive to case** so `Page` will be equivalent to `page`. The delivery stream name however needs to be formatted exactly as it is on AWS.

If you would like to route all events to a stream, use an `*` as the event name.

### Data Model
Let's say you've decided to publish your Segment track events named `User Registered` to your Kinesis Firehose delivery stream named `online_registrations`. If you send Segment the following `track` call:

```json
{
  "userId": "user_1",
  "event": "User Registered",
  "properties": {
    "plan": "Pro Annual",
    "account_type" : "Facebook"
  }
}
```

The Segment Kinesis destination will issue a `PutRecord` request with the following parameters:

```
firehose.putRecord({
  Record: {
    Data: JSON.stringify(msg)) + '/n'
  },
  DeliveryStreamName: 'online_registrations'
});
```

Segment will append a newline character to each record to allow for easy downstream parsing.

## Group
Take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example group call is shown below:

```js
analytics.group("0e8c78ea9d9dsasahjg", {
  name: "group_name",
  employees: 3,
  plan: "enterprise",
  industry: "Technology"
});
```

## Best Practices

### Multiple Sources
If you have multiple sources using Kinesis/Firehose, you have two options:

#### Attach multiple sources to your IAM role
Find the IAM role you created for this destination in the AWS Console in Services > IAM > Roles. Click on the role, and navigate to the **Trust Relationships** tab. Click **Edit trust relationship**. You should see a snippet that looks something that looks like this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::595280932656:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "YOUR_SEGMENT_SOURCE_ID"
        }
      }
    }
  ]
}
```

Replace that snippet with the following, and replace the contents of the array with all of your source IDs.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::595280932656:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": ["YOUR_SEGMENT_SOURCE_ID", "ANOTHER_SOURCE_ID", "A_THIRD_SOURCE_ID"]
        }
      }
    }
  ]
}
```

#### Use a single secret ID

If you have so many sources using Kinesis that it is impractical to attach all of their IDs to your IAM role, you can set a single ID to use instead. **This approach requires that you securely store a secret value, so we recommend that you use the method above if at all possible. **

To set this value, go to the Kinesis Firehose destination settings from each of your Segment sources and set the **Secret ID'** to a value of your choosing. This value is a secret and should be treated as sensitively as a password. Once all of your sources have been updated to use this value, find the IAM role you created for this destination in the AWS Console in Services > IAM > Roles. Click on the role, and navigate to the **Trust Relationships** tab. Click **Edit trust relationship**. You should see a snippet that looks something that looks like this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::595280932656:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "YOUR_SEGMENT_SOURCE_ID"
        }
      }
    }
  ]
}
```
Replace your source ID (found at "YOUR_SEGMENT_SOURCE_ID") with your secret ID.
