---
title: Snapchat Audience Destination
id: 5f289f7639d45a397a1fb880
---
The [Snapchat Ads](https://forbusiness.snapchat.com/advertising/targeting) product provides a way to target advertisements to a global audience and drive meaningful results.

Segment's integration with Snapchat Ad's Snap Audience Match (SAM) enables Segment customers to sync audiences created in Personas with Snapchat Advertising

For more information about advertising with Snapchat:
- [SAM Audiences](https://businesshelp.snapchat.com/s/article/create-sam-audience?language=en_US)
- [Snap Audience Match](https://developers.snapchat.com/api/docs/#create-an-audience-segment) (for developers)

## Details

**Requirements**
- Personas enabled with an existing personas space
- A Snapchat Ads account with permission to create audiences

**Supported identifiers**
- email
- phone number
- iOS IDFA
- Android IDFA

**Connection type**
- Server-side

## Set up
The Snapchat Audiences destination syncs audience data from Segment Personas to Snapchat Ads. To begin:

1. Navigate to the Destinations section of your Personas space, and click **Add Destination**.
2. Search for `Snapchat Audience ` and click **Configure**.
3. On the Snapchat Audiences configuration screen, click **Connect to Snapchat Audiences**. Log in to Snapchat with an account that has access to Ads Manager. Once authenticated, confirm the connection to Segment.
4. Select the Snap Ads account that will receive audience data. This accounts represents an advertising entity or business, and not your personal Snapchat user account. You may belong to several Ad Accounts; make sure to select the correct account here. After the Ad Account is specified, the destination is active.
5. Add the Snapchat Audiences Destination to an existing Personas Audience.
   1. Navigate to the Personas Space that contains the audience, and select it from the Audiences tab.
   2. Click **Add Destination**.
   3. The configured Snapchat Audiences destination should appear in the *Send as User List* category of available destinations.
   4. Click the destination and confirm the identifier: `Email`, `Phone`, or `Mobile ID`. Click **Save**.

      - Segment sends hashed `email` or `idfa` values to Snapchat so that they can match those identifiers against Snapchat users.
      - Segment also supports `phoneNumber` if it is present on the user's profile. Please make sure you pass phone numbers in a format that Snapchat supports. Read more in Snapchat's documentation regarding [Normalizing and Hashing](https://developers.snapchat.com/api/docs/#normalizing-hashing).

         **NOTE**: [Protocols](/docs/protocols) customers can use [Transformations](/docs/protocols/transform/) to change `phoneNumber` values to meet Snapchat's requirements.

   1. Click **Add Destination** to activate the destination for your Personas Audience

The initial synchronization of audience data may take several hours, depending on the size of the audience. Once the initial sync occurs, you'll notice a new Audience in the Snap Ads dashboard.

## FAQ

### I'm passing phone number as the identifier to Snapchat, why doesn't the audience populate?

Verify the following:
- You're collecting user phone numbers when users are added to the Personas Audience, and that you have configured the destination to send `Phone`.
- You're collecting phone numbers in a format that Snapchat supports. For more information, see Snapchat's documentation regarding [Normalizing and Hashing](https://developers.snapchat.com/api/docs/#normalizing-hashing).

### Why can't I select our Ads Account during the destination setup?

Ensure the following criteria are met:

- Your personal Snapchat login has appropriate permissions within your business. Snapchat Account Admin or Data Manager permissions are required to configure and add audiences.
- Your Snap Ads account is in `Active` status.

### How do I view the sync status?

Status will be shown in the Event Delivery tool. When you view the audience, you can open the side bar which directs you  to [Event Delivery](/docs/getting-started/06-testing-debugging/#event-delivery).
