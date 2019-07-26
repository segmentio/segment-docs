---
rewrite: true
---
[Amazon Kinesis](https://aws.amazon.com/kinesis/) enables you to build custom applications that process or analyze streaming data for specialized needs. Amazon Kinesis Streams can continuously capture and store terabytes of data per hour from hundreds of thousands of sources such as website clickstreams, financial transactions, social media feeds, IT logs, and location-tracking events.

This document was last updated on July 17, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. Create a Kinesis stream. A stream is composed of multiple shards, each of which provides a fixed unit of capacity. The total capacity of the stream is the sum of the capacities of its shards. Each shard corresponds to 1 MB/s of write capacity and 2 MB/s of read capacity. See the [Amazon Kinesis Developer Guide](http://docs.aws.amazon.com/streams/latest/dev/introduction.html) for more information on estimating number of shards needed for your stream. Follow these [instructions](http://docs.aws.amazon.com/streams/latest/dev/learning-kinesis-module-one-create-stream.html) in order to create a new AWS Kinesis Stream.
  2. Create an IAM policy. Sign in to the [Identity and Access Management (IAM) console](https://console.aws.amazon.com/iam/) and follow these instructions to [Create an IAM policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html) to allow Segment permission to write to your Kinesis Stream.
Select the **Create Policy from JSON** option and use the following template policy in the `Policy Document` field. Be sure to change the {region}, {account-id} and {stream-name} with the applicable values.
```
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "kinesis:PutRecord"
           ],
           "Resource": [
               "arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}"
           ]
       }
   ]
}
```
  3. Create an IAM role. Follow these instructions to [Create an IAM role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html#roles-creatingrole-user-console) to allow Segment permission to write to your Kinesis Stream. When prompted to enter an Account ID, enter "595280932656". Make sure to enable 'Require External ID' and enter your Segment Source ID as the External ID*. This can be found by navigating to Settings > API Keys from your Segment source homepage. When adding permissions to your new role, find the policy you created above and attach it.
**Note:** If you have multiple sources using Kinesis, enter one of their source IDs here for now and then follow the procedure outlined in the Multiple Sources section at the bottom of this doc once you've completed this step and saved your IAM role.
  4. Create a new Kinesis destination. In the Segment source that you want to connect to your Kinesis destination, click the "Add Destination" button. Search and select the Amazon Kinesis destination and enter the options: `Role Address`, `region`, `stream`.

## Page
If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:
```javascript
  analytics.page();
```

## Identify
If you haven’t had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does.  An example call would look like:
```javascript
analytics.identify('97980cfea0085', {
  email: 'gibbons@initech.com',
  name: 'John Gibbons'
});
```

## Track
If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```javascript
analytics.track("User Registered", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

### Data Model
Let's say you're connecting your Segment customer data stream to Kinesis Stream `arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}`. If you send Segment the following in a `track` call:
```
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
kinesis.putRecord({
  Data: new Buffer(JSON.stringify(msg)).toString('base64')
  PartitionKey: msg.userId() || msg.anonymousId(),
  StreamName: 'stream-name'
});
```

Segment will use the the `userId || anonymousId` as the `PartitionKey`. The partition key is used by Amazon Kinesis to distribute data across shards. Amazon Kinesis segregates the data records that belong to a stream into multiple shards, using the partition key associated with each data record to determine which shard a given data record belongs to.

**Note:** The json payload is base64 stringified.

## Group
If you haven’t had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/spec/group/) does.

An example group call is shown below:
```
analytics.group("0e8c78ea9d9dsasahjg", {
  name: "group_name",
  employees: 3, 
  plan: "enterprise",
  industry: "Technology"
});  
```

## Troubleshooting
When you get started, we recommend using any of the open source [Kinesis tailing utility](https://github.com/search?utf8=%E2%9C%93&q=kinesis-tail) to validate that data is flowing correctly!

## Best Practices

### Multiple Sources
If you have multiple sources using Kinesis/Firehose, you have two options:

### Attach multiple sources to your IAM role
Find the IAM role you created for this destination in the AWS Console in Services > IAM > Roles. Click on the role, and navigate to the ‘Trust Relationships’ tab. Click ‘Edit trust relationship’. You should see a snippet that looks something that looks like this:
```
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
```
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

### Use a single secret ID
If you have so many sources using Kinesis that it is impractical to attach all of their IDs to your IAM role, you can instead opt to set a single ID to use instead. This approach should be avoided in favor of the above approach if possible since it will result in you having to keep track of a secret value. To set this value, go to the Kinesis destination settings from each of your Segment sources and set the 'Secret ID' to a value of your choosing. This value is a secret and should be treated as sensitively as a password. Once all of your sources have been updated to use this value, find the IAM role you created for this destination in the AWS Console in Services > IAM > Roles. Click on the role, and navigate to the ‘Trust Relationships’ tab. Click ‘Edit trust relationship’. You should see a snippet that looks something that looks like this:

```
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
