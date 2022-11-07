---
title: Scuba Analytics Destination
rewrite: true
redirect_from: '/connections/destinations/catalog/interana/'
id: 5d098d7fd748d200010cd081
---
[Scuba Analytics's](https://www.scuba.io/){:target="_blank"} full stack solution allows you to visually explore trillions of data points from multiple data sets all in real time without the need for ETL, data aggregation, or writing any SQL.

This destination is maintained by Scuba Analytics. For any issues with the destination, [contact the Scuba Analytics Support team](mailto:support@interana.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

To set up the Scuba Analytics Integration, first you will need:
The root URL for your destination cloud storage directory
* For AWS S3 this is typically in the format or ``https://{your bucket}.{your region}.amazonaws.com/{your directory}``
* For Azure Blob Storage this is typically in formation of ``https://{your storage account name}.blob.core.windows.net/{your container}``
Credentials to access your cloud storage account
* For AWS and S3 backed clusters you will need S3 credentials with write access to your bucket
* For Azure and Blob Storage backed clusters you will need a Shared Access Signature with write access to your container
To begin sending data to Scuba Analytics from the Segment portal select Scuba Analytics as a new destination.
1. In the "API Key" field insert your Blob Shared Access Signature or your S3 credentials.  For S3 credentials, comma separate the access key id & the secret access key in the format of "accessKeyId,secretAccessKey"
2. In the "Bucket Container URL" field insert the URL for the cloud storage directory.
* For S3: ``https://{your bucket}.{your region}.amazonaws.com/{your directory}``
* For Azure Blob Storage: ``https://{your storage account name}.blob.core.windows.net/{your container}``
3. In the "Platform" field insert "AWS" or "Azure" depending on the provider of your cloud storage.


## Methods Supported
All methods will be tracked as a new event in Scuba Analytics with the associated method as an attribute of the event.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. Identify methods can be used with Actors properties and Flow Properties in Scuba Analytics to update the associate with the user in the Identify method. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```
