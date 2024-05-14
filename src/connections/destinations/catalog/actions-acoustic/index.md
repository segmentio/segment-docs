---
title: Acoustic (Actions) Destination
id: 64edec5a4f881f992e432b81
beta: true
hidden: true
---
{% include content/plan-grid.md name="actions" %}

[Acoustic Connect](https://acoustic.com/?utm_source=segmentio&utm_medium=docs&utm_Connect=partners){:target="_blank”}, provides multichannel marketing without all the hassle. Automate campaigns and messages across SMS, mobile push, group messaging, email, and social media based on real-time customer signals and intent across the customer journey. 

Trigger promotional and transactional messages based on customer preferences and behaviors to support onboarding, customer activation, cross-sell, and re-engagement strategies. Scale personalization and treat your customers as individuals with an automated view and understanding of the customer by pulling real-time behavior like intent so marketers do not have to manually segment users and audiences.

The Acoustic (Actions) Destination is maintained by Acoustic. For support, visit help.goacoustic.com

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item "Acoustic (Actions)" in the left navigation, and click it.
3. Click **Configure Acoustic (Actions)**.
4. Select an existing Source to connect to <destination_name> (Actions).

{% include components/actions-fields.html %}

### Edit Basic Settings

For some configuration options you will need information from your Connect Org. and others will need the help of your Customer Success and/or Services resources. If you do not recognize the options here or need help, reach out to your Acoustic Customer Success or Services resource for help.

Name  -	Enter a name to help you identify this destination definition in Segment.

Customer Prefix - *Important* - It's recommended that you use your Acoustic Connect Org name and a dataflow tag, as in eg., *CustomerAcme_Prod_* or *CustomerAcme_test1_* or *CustomerAcme_MktData3_*. Be sure to replace any spaces with an underscore and **be sure to end the string with an underscore '_'**.

> You will want to work with your Acoustic Customer Success or Services resource to align this string with the Acoustic definition that defines your unique table for this data set.

S3 Bucket Access Point Alias - The Alias of the Access Point created for your access to the S3 Bucket. Available from your Acoustic Customer Success or Services resource.

S3 Access Key  -  S3 Access Key for the S3 bucket. Available from your Acoustic Customer Success or Services resource.

S3 Secret -  S3 Secret credential for the S3 bucket. Available from your Acoustic Customer Success or Services resource.

- **S3 Region**: Should always be us-east-1 unless directed by Acoustic otherwise.

- **Version**: No Need to Edit - Provides a metatag to confirm the version currently in effect.
Last-Modified: 02.01.2024 10.30.43
Version 1.7

When all config options are defined and confirmed, as well as all Filter and Mapping configurations completed (see below), be sure to "Enable" and "Save Changes" for the Destination.

When enabled, Segment will send data to Acoustic (Actions) based on configuration in the Mappings tab.

> info ""
> Keep in mind, you can define multiple Destinations to send unique data to different Connect Tables, simply create the definition with a unique name and Customer Prefix to align the mapped data to the respective Connect table.


### Defining Filters

The Destination dialog includes a Filter tab. If you have a significant volume of Events and data attributes from the Source you wish to use, a good first step would be to define Filter(s) to limit the data being sent to the Connection from the defined Source(s). Mapping is then used to define the specific set of attribute data and columns to be written to Acoustic.

For example, for a Connection definition of an Audience source, a Traits.email or similar attribute filter would be necessary to assure only "Identify" Events with a valid value in the traits section (to be mapped to UniqueRecipientId) will be sent to the Acoustic Destination.

![](assets/20240422_152921_image.png)

Keep in mind that the Acoustic (Actions) Destination ignores any Events that do not contain a valid UniqueRecipientId attribute, therefore a common filter would be to avoid sending any Events to the Connection that do not have a valid attribute to be mapped to UniqueRecipientId. In many cases this will be a valid email address but other Unique Id attribute, such as CustID, can be used.




### Defining Mapping:

The Destination dialog also contains a Mapping tab. The Acoustic (Action) Destination currently supports Segment Track and Identity Events along with all attributes of those events. In the Mapping dialog initial Mapping templates are included as an aid. All of the provided mapping fields are optional but you will need to use at least one, in addition to the required attributes, to map the data you want to write to Acoustic Connect.

![](assets/20240422_153616_image.png)

Keep in mind, Mapping provides the means to map Segment Event data to Connect Columns. The Value you map to a Key, is the Value of the Column with the same name as the Key in Connect. That is, if you map the Value of trait.firstName to the Key "firstname", the value mapped will show up in Connect in the column "firstname".

To that, you will want to work with the Acoustic Services team to define a Connect Table that will **have all of the Columns you intend to map**. The details of this Table are also needed in the Destination's Settings dialog (see previous).

Here we can see the mapping for UniqueRecipientID. UniqueRecipientId is required. The Acoustic (Actions) Destination will not accept any event that does not contain a UniqueRecipientId attribute.

Also, do not edit 'type' or 'timestamp' mappings. These are required and are pre-mapped for you. As noted above, even these Values will show up in the respective Columns as the Key names, that is, there will be a column in your table in Connect of 'type' and 'timestamp', each will hold the respective mapped Values of the Event data.

![](assets/20240422_152537_image.png)

Following the required attributes are a series of helpful predefined mapping structures. Each of these are optional but at least one must be used to provide data beyond the required attributes previously noted.

The first is a simple, straightforward Key and Value mapping dialog. You can use this dialog to map each attribute provided by the Track or Identify Event data one by one. That is, you can map traits.firstname to "firstname", then another Key/Value of traits.lastname to "lastname", and on and on until you have mapped all that you want to store in Connect.

![](assets/20240422_155823_image.png)

The mapping sections that follow allow you to map whole sections or even the special use-case of an array of data that needs to be flattened in order to be useful, as in this example of flattening the properties.products array to individual attributes.

![](assets/20240422_155857_image.png)

Lastly, if it makes sense to do so you can map whole sections, which will provide all of the attributes of the section mapped through to Connect.

![](assets/20240422_160007_image.png)

With the Mapping completed, be sure to click "Save".

With all configuration completed you will want to confirm data being written to the defined Table in Connect.

### Delivery Report

Additionally, if you see `Nesting Depth Exceeded` in your Delivery report, this indicates that an array of data is being sent through that is too deep, that is, has too many levels and cannot be flattened. If this is the case you will need to revisit mapping that data to a flatter structure, that is, the attribute has a simple value versus the complex value structure that is coming through. Complex values, many layered values, are not useable and will not be accepted.

![](assets/20240422_161221_image.png)

