---
title: Build a Source
---

Sources send data into Segment, and serve as the origin for your data. Segment empowers companies of all sizes to use their customer data to grow their business. When you create a Segment source for your organization, you enable customers to use data from your tool wherever it's most useful to them.

## Get access and log in

Before you begin, you need access to the Developer Portal. To access the Developer portal:

1. Apply to become a [Segment Select Partner](https://segment.com/partners/integration/){:target="_blank"}.
2. Once approved, you'll receive an invitation to join the Segment Developer Portal.
3. Log in to Segment, navigate to the User dropdown in the top right of the screen, and click [**Developer Portal**](https://app.segment.com/dev-portal){:target="_blank"}.

## Build the Source

1. Once in the Developer Portal, navigate to **Integrations** and click **Build integration** > **Build a source**

2. On the Source setup screen, enter a name and slug for your source, and click **Create source**.

3. From the Integrations screen, click on the source you just created. You should see your source in **Private building** status.

4. Select the **Catalog info** tab and add relevant metadata and catalog information for your source.

The code for your source should follow the format of Segment's [HTTP API](/docs/connections/sources/catalog/libraries/server/http-api/).

## Test your Source

1. From your source's page in the Developer Portal, navigate to **Settings** > **Add to workspace**. From the dropdown, select the Segment workspace you'll use to test your source, and click **Add to workspace**. The selected workspace will open in a new tab.

When the selected workspace opens in a new tab, with your source's configuration page visible, copy the workspace ID, and add it to your source.

Use the [Source Debugger](/docs/connections/sources/debugger/) to observe inbound data when you generate events in your source. For example, if your source sends email data to Segment, you should:

- Create an email campaign that includes one hyperlink and an unsubscribe option
- Send the email to yourself
- When you receive the email
  - Open it
  - Click the link
  - Unsubscribe

Check the Source Debugger to verify that the events arrive and are formatted according to the Segment Spec.

## Write your source's documentation

Documentation is integral to enabling Segment's users to self-serve and onboard with your integration. Segment's documentation team will work with you during this part of the process to ensure your documentation matches the Segment style and is as instructive as possible.

To create your documentation, follow the instructions outlined [in this template](https://github.com/segmentio/segment-docs/blob/develop/templates/partners/source.md){:target="_blank"}. When submitting your source integration for review, you will need to include a link to the pull request you made to add your documentation.

## Launch your source

When you've verified that your source sends the correct information, submit it for review. The Segment team will review your source's functionality, catalog metadata, and documentation. If your source is approved, it will appear in the Segment catalog, marked with a "beta" badge for a period of two weeks. After this period, the source is considered generally available.
