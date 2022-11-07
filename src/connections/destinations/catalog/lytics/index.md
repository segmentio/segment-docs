---
title: Lytics Destination
hide-device: true
id: 54521fd925e721e32a72eed2
---
## Getting Started

1. Lytics uses Segment's JavaScript library so make sure to [go through our quickstart guide to get set up on that first](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/).

2) Once you're recording data enable Lytics on your destination page using your Customer ID number, which can be found in the admin section of your Lytics account: **Account** -> **Manage Accounts**.

![cid](https://lyticspublic.s3.amazonaws.com/images/Segment.io/segment_cid.png)

You can also enter your Data API Key under **Advanced Options**.  The data API Key can send data to Lytics, but not edit your account info.  The Full API Key has access to edit all of your account info, so it should not be used for sending data.

![api](https://lyticspublic.s3.amazonaws.com/images/Segment.io/segment_api.png)

Paste into your Destination page:

![key](images/lyticsapikey.png)

## Features

You can see what [data fields Lytics pulls in by default](https://admin.lytics.io/#/documentation/jstag).
