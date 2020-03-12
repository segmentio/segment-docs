---
title: Interana Destination
rewrite: true
---
[Interana's](https://www.interana.com/segment/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) full stack solution allows you to visually explore trillions of data points from multiple data sets all in real time without the need for ETL, data aggregation, or writing any SQL.

This destination is maintained by Interana. For any issues with the destination, please [reach out to their team](mailto:support@interana.com).

_**NOTE:** The Interana Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on September 24, 2019. If you are interested in joining their beta program or have any feedback to help improve the Interana Destination and its documentation, please [let  their team know](mailto:support@interana.com)!_

## Getting Started

{% include content/connection-modes.md %}

To set up the Interana Integration, first you will need:
The root URL for your destination cloud storage directory
* For AWS S3 this is typically in the format or ``https://{your bucket}.{your region}.amazonaws.com/{your directory}``
* For Azure Blob Storage this is typically in formation of ``https://{your storage account name}.blob.core.windows.net/{your container}``
Credentials to access your cloud storage account
* For AWS and S3 backed clusters you will need S3 credentials with write access to your bucket
* For Azure and Blob Storage backed clusters you will need a Shared Access Signature with write access to your container
To begin sending data to Interana from the Segment portal select Interana as a new destination.
1. In the "API Key" field insert your Blob Shared Access Signature or your S3 credentials.  For S3 credentials, comma separate the access key id & the secret access key in the format of "accessKeyId,secretAccessKey"
2. In the "Bucket Container URL" field insert the URL for the cloud storage directory.
* For S3: ``https://{your bucket}.{your region}.amazonaws.com/{your directory}``
* For Azure Blob Storage: ``https://{your storage account name}.blob.core.windows.net/{your container}``
3. In the "Platform" field insert "AWS" or "Azure" depending on the provider of your cloud storage.


## Methods Supported
All methods will be tracked as a new event in Interana with the associated method as an attribute of the event.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. Identify methods can be used with Actors properties and Flow Properties in Interana to update the associate with the user in the Identify method. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```
