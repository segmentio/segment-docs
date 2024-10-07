---
title: Google Campaign Manager 360
strat: google
hide-boilerplate: true
hide-dossier: false
id: 123456
hidden: true
private: true
versions:
  - name: "Google Campaign Manager 360"
    link: '/docs/connections/destinations/catalog/actions-google-campaign-manager-360/'
---

The Google Campaign Manager 360 destination allows users to upload [conversions](https://developers.google.com/doubleclick-advertisers/guides/conversions_upload){:target="_blank"} and [conversion enhancements](https://developers.google.com/doubleclick-advertisers/guides/conversions_ec){:target="_blank"} to Google Campaign Manager 360. Marketers can use this integration to attribute conversions to specific campaigns, ad groups, and ads.

## Getting Started

> info ""
> You can connect the Google Campaign Manager 360 Destination to an event source, Reverse ETL source, or Engage space. 

### Prerequisites

Before you begin, you need to have a Google Campaign Manager 360 account, with a Profile ID and a Floodlight Configuration ID. It'll be also necessary to configure the Floodlight activities you want to track.

### Connect to Google Campaign Manager 360

1. From the Segment web app, navigate to **Catalog > Destinations**.
2. Search for “Google Campaign Manager 360” in the Destinations Catalog, and select it.
3. Click **Add destination**.
4. Select the source that will send data to Google Campaign Manager 360. 
  * If you select an Engage space, you'll be redirected to Engage to complete the following steps.
  * If you select a Reverse ETL source, you must enter a name for your destination and click **Create destination**.
5. On the **Settings** tab for your Google Campaign Manager destination:
  * Enter your **Profile ID**. Optionally, you can also provide your default **Floodlight Configuration ID** and/or your default **Floodlight Activity ID**. These fields are optional, but if you provide them, they will be used as defaults for all events sent to Google Campaign Manager 360. Otherwise, you can override these values in your mappings.
6. Click **Save**.
7. Follow the steps in the Destinations Actions documentation to [customize your mappings](/docs/connections/destinations/actions/#customize-mappings).

## Hashing

Google requires you to hash all PII before sending it to the Google API.

The Google Campaign Manager 360 destination supports hashing for the following fields:

* Email
* Phone
* First Name
* Last Name
* Street Address

The hashing algorithm used is SHA-256. If incoming data arrives already hashed, the destination will not hash it again. The values will be sent as-is to Google.

{% include components/actions-fields.html settings="true"%}

## FAQ and troubleshooting

### Refreshing access tokens

When you use OAuth to authenticate into the Google Campaign Manager 360 destination, Segment stores an access token and refresh token. Access tokens for Google Campaign Manager 360 expire after one hour. Once expired, Segment receives an error and then uses the refresh token to fetch a new access token. This results in two API requests to Google Campaign Manager 360, one failure and one success.

Because of the duplicate API requests, you may see a warning in Google for unprocessed conversions due to incorrect or missing OAuth credentials. This warning is expected and does not indicate data loss. Google has confirmed that conversions are being processed, and OAuth retry behavior will not cause any issues for your web conversions. Whenever possible, Segment caches access tokens to reduce the total number of requests made to Google Campaign Manager 360.