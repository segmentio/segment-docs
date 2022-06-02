---
title: Mailjet Destination
id: 55b27b5d0a20f4e22f0fb3d5
---
This destination is maintained by Mailjet. For any issues with the destination, you may [contact the Mailjet Support team](mailto:support@mailjet.com).

## Getting Started

Navigate to the "App Connections" page* (Account -> App Connections) and click on the "Segment" destination block to find your Segment Authentication key. * If you do not see the App Connections page for any reason, contact us at plugins@mailjet.com. Select a Contact list from the drop down menu that you wish to have Segment send contact property data to.

Be sure and note the contact list id inside the field below the chosen list because you will need to paste it into your Segment account so Segment knows where to send the data to.

Once you have this, navigate over to Segment. Within your existing or new workspace, find Mailjet in the Destinations tab. Click open the tile and paste your Authentication key within the Settings slide out.

Confirm that the contact list id is the same, click save, and then Enable Destination.

## Sending Data from Mailjet

Mailjet supports sending [email events](/docs/connections/spec/email/) to data warehouses and other tools on the Segment platform. These events will be sent as `track` calls to the other destinations you've turned on.

You will have the option to enable this feature when you're on the App Connections page. Simply grab Segment's write-key and paste it in the box and save. You will see the Sources come in as `track` events in your debugger.
