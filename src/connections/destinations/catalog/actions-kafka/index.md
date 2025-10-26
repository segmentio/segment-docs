---
title: Kafka Destination
id: 65dde5755698cb0dab09b489
---

{% include content/plan-grid.md name="actions" %}

[Kafka](https://kafka.apache.org/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} provides a highly scalable and fault-tolerant messaging system that enables real-time data processing and stream processing at scale. When integrated with Segment, Kafka serves as a powerful backbone for managing and processing event data collected by Segment, allowing businesses to efficiently ingest, route, and analyze data across various applications and systems in real time.

## Getting started

### Create the Kafka Destination

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Kafka".
2. Select the "Kafka" tile and click **Add Destination**.
3. Select an existing Source to connect to Kafka.
4. Enter a name for your Kafka destination.

### Configure the Kafka Destination

The way you've configured your Kafka Cluster informs the authentication and encryption settings you'll need to apply to the Segment Kafka Destination. You may need the assistance of someone technical to provide values for the following Settings:

1. On the Settings tab, enter values into the **Client ID**, **Brokers** and **Authentication Mechanism** setting fields.
2. Populate fields based on the value you selected from the **Authentication Mechanism** field:
   - **Plain** or **SCRAM-SHA-256 / 512** authentication: provide values for **Username** and **Password** fields.
   - **Client Certificate** authentication: provide values for the **SSL Client Key** and **SSL Client Certificate** fields.
3. Populate the **SSL Certificate Authority** field, if necessary. 
4. Save your changes and proceed to [Configure the Send Action](#configure-the-send-action). 

### Configure the "Send" Action

1. Select the Mappings tab and add a new **Send** mapping. 
2. Select a Topic to send data to. This field should auto-populate based on the credentials you provided in the Settings tab. 
3. Map your payload using the **Payload** field.  
    _(Optional)_: Specify partitioning preferences, Headers and Message Key values.
4. Save and enable the Action, then navigate back to the Kafka destination's Settings tab to enable and save the Destination. 

{% include components/actions-fields.html %}

## FAQ

### Which Kafka Platforms are supported?

The Kafka Destination can send data to Topics on self-hosted Kafka Clusters, or to Clusters hosted on Managed Service platforms like **Confluent Cloud** and **Aiven**.

### Which data formats are supported?

Segment sends data to Kafka in JSON format only. Segment does not yet support other formats, like Avro or Protobuf. 

### Which authentication mechanisms are supported?

The Authentication Mechanism is controlled with the **Authentication Mechanism** Setting field. 

Segment supports the following SASL-based authentication methods: 
- Plain 
- SCRAM-SHA-256
- SCRAM-SHA-512
- AWS 

Segment also supports **Client Certificate** authentication. 

### How is partitioning controlled?

The **Send** Action provides multiple ways to specify which Partition an event should be sent to. 

- **Partition**: Use this field to specify the name of the Partition Segment should send events to. 
- **Default Partition**: Use this field to specify a default Partition. Segment uses this when you don't provide a value in the **Partition** field.
- **Message Key**: Segment uses a hash of this field's value to determine which Partition should receive an event. If you don't provide a Message Key, Segment uses a round robin algorithm to select the partition to send the event to. 

### What is the "SSL - Reject Unauthorized Certificate Authority" field for?

This field specifies if Segment should reject server connections when a certificate is not signed by a trusted Certificate Authority (CA). This can be useful for testing purposes or when using a self-signed certificate. 
