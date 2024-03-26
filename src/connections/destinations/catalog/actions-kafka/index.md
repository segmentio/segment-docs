---
title: Kafka Destination
---

{% include content/plan-grid.md name="actions" %}

[Kafka](https://kafka.apache.org/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} provides a highly scalable and fault-tolerant messaging system that enables real-time data processing and stream processing at scale. When integrated with Segment, Kafka serves as a powerful backbone for managing and processing event data collected by Segment, allowing businesses to efficiently ingest, route, and analyze data across various applications and systems in real time.

This destination is maintained by Segment. 

## Getting started

### Create the Kafka Destination

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Kafka"
2. Select the "Kafka" tile and click **Add Destination**
3. Select an existing Source to connect to Kafka.
4. Give your Kafka Destination a name.

### Configure the Kafka Destination

Authentication and Encryption settings for Kafka depend on the way your cluster is configured. You may need the assistance of someone technical to provide values for the following configuration Settings:  

5. On the Settings tab, provide values for the **Client ID**, **Brokers** and **Authentication Mechanism** Setting fields. 
6. Populate fields for your selected **Authentication Mechanism**:  
   For **Plain** or **SCRAM-SHA-256 / 512**: provide values for **Username** and **Password** fields.
   For **AWS**: Provide values for **AWS Access Key ID** and **AWS Secret Key** fields, and optionally for the **AWS Authorization Identity** field. 
   For **Client Certificate** you will need to provide values for the **SSL Client Key** and **SSL Client Certificate** Settings fields. 
7. Optionally populate the **SSL Certificate Authority** field. 
8. Save your changes before proceeding to the next step. 

### Configure the "Send" Action

9. Click to the Mappings tab and add a new **Send** Mapping. 
10. Select a Topic to send data to. This field should auto-populate based on the credentials provided in the Settings tab. 
11. Map your payload using the **Payload** field. 
12. Optionally specify Partitioning preferences, Headers and Message Key values. 
13. Save and enable the Action, then navigate back to the Destination's Settings tab and enable and save the Destination. 

The Destination should now be configured to send data to your Kafka cluster.  

{% include components/actions-fields.html %}

## FAQ

### Which Kafka Platforms are supported?

The Kafka Destination can send data to Topics on self hosted Kafka Clusters, or to Clusters hosted on Managed Service platforms such as **Confluent Cloud** and **Aiven**.

### Which data formats are supported?

Data will be sent to Kafka in JSON format only. Avro, Protobuf and other formats are not yet supported. 

### Which authentication mechanisms are supported?

The Authentication Mechanism is controlled with the **Authentication Mechanism** Setting field. 

The following SASL based authentication mechanisms are supported: **Plain**, **SCRAM-SHA-256**, **SCRAM-SHA-512** and **AWS**. 
**Client Certificate** auth is also supported. 

### How is Partitioning controlled?

The **Send** Action provides multiple ways to specify which Partition an event should be sent to. 

1) The **Partition** field: Use this field to specify the name of the Partition to send the event to. 
2) The **Default Partition** field: Use this field to specify a default Partition. This will be used when value is provided in the **Partition** field.
3) The **Message Key** field: A hash of the field's value will be used to determine which Partition to send the event to. If no value is provided in the **Message Key** field a round robin algorithm is used.

### What is the "SSL - Reject Unauthorized Certificate Authority" field for?

This field specifies if Segment should reject server connections when a certificate is notsigned by a trusted Certificate Authority (CA). This can be useful for testing purposes or when using a self-signed certificate. 