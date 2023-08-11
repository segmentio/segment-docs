---
title: LiveRamp Audiences Destination
hide-boilerplate: true
hide-dossier: false
id: 644ad6c6c4a87a3290450602
private: true
---

[LiveRamp](https://liveramp.com/) gives companies and their partners the power to connect, control, and activate data to transform customer experiences and generate more valuable business outcomes. Our integration with LiveRamp enables you to push user audiences created in [Twilio Engage](https://www.twilio.com/en-us/engage) into your LiveRamp account to execute various marketing use cases.
Our integration will allow users to connect their Engage Audiences to LiveRamp via their SFTP or a customer managed S3 cloud storage bucket. Users will be able to configure their delivery preferences within Segment.

The LiveRamp Audiences destination can be connected to **Twilio Engage sources only**. 

## Getting started

### Setup your file drop

#### SFTP
1. Contact your LiveRamp representative to gain a set of [SFTP](https://docs.liveramp.com/connect/en/upload-a-file-via-liveramp-s-sftp.html) credentials.
2. Connect to the SFTP server using the client of your choice, and create a new folder under `/uploads` with the name of your audience.

#### S3
1. Create a new S3 bucket.
2. Create a new IAM Role with `PutObject` access to the S3 bucket.
3. Create a new IAM User and assign them the role.
4. Generate a new Access Key pair for the user and note them down as we will use it for the settings.

### Connect LiveRamp Audiences
1. Create and configure your Engage Audience.
2. Navigate to **Engage > Engage Settings > Destinations** tab and click **Add Destination**.
3. Select **LiveRamp Audiences**, select your Audience Space as the source, and name your destination.
4. On the **Mappings** tab, click **Add Mapping** and choose whether your will be using S3 or SFTP to upload the files. Within the mapping, configure which fields from your payload will be included in the files.
5. Enable the destination and configured mappings.
6. On the **Engage > Audiences > (your audience)** page, click **Add Destination** and select the destination just created.
7. Disable *Send Identify* and Enable *Send Track*. Keep event names as they are.

{% include components/actions-fields.html settings="false"%}

## Limitations 

* Audience must have at least 25 unique members, otherwise the destination will fail and the data will not be synced.
* Audience sync happens once per day.
* Audience sync is a full sync.
* Files are created per audience.
* After initial ingestion is complete, changing the mappings will cause the LiveRamp ingestion to start failing until ingestion setup is run again.

## FAQ

