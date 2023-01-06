---
title: Build a Source
---

Sources send data into Segment, and serve as the origin for your data. Segment empowers companies of all sizes to use their customer data to grow their business. When you create a Segment Source for your organization, you enable customers to use data from your tool wherever it's most useful to them.

## Get access and log in

Before you begin, you need access to the Developer Portal. To access the Developer portal:

1. Apply to become a [Segment Select Partner](https://segment.com/partners/integration/){:target="_blank"}
2. Once approved, you'll receive an invitation to join the Segment Developer Portal.
3. Log in to Segment, and navigate to the User dropdown in the top right of the screen, and click [**Developer Portal**](https://app.segment.com/dev-portal){:target="_blank"}.
4. Navigate to **Integrations** and click **Build an integration** > **Build a source**.

## Build the Source

Once in the Developer Portal, navigate to **Integrations** and click **Build integration** > **Build a source**

On the Source setup screen, enter a name and slug for your source, and click **Create source**.

From the Integrations screen, find the Source you just created, and click it. You should see your Source in **Private building** status.

From here, add relevant metadata and catalog information for your Source on the **Catalog info** tab.

Your Source's code should follow the format of Segment's [HTTP API](/docs/connections/sources/catalog/libraries/server/http-api/).

## Test your Source

From your Source's page in the Developer Portal, navigate to **Settings** > **Add to workspace**. From the dropdown, select a Segment workspace you'll use to test your source, and click **Add to workspace**.

When the selected workspace opens in a new tab, with your Source's configuration page visible, copy the workspace ID, and add it to the your source.

Use the Source [Debugger](/docs/connections/sources/debugger/) to observe inbound data when you generate events in your Source. For example, if your Source sends email data to Segment, you should:

- Create an email campaign that includes one hyperlink and an unsubscribe option
- Send the email to yourself
- When you receive the email
  - Open it
  - Click the link
  - Unsubscribe

Check the Source Debugger to verify that the events arrive and are formatted according to the Segment Spec.

## Launch your source

When you've verified that your Source sends the correct information, submit it for review. The Segment team will review your Source's functionality, catalog metadata, and documentation. If your Source is approved, it will appear in teh Segment catalog, marked with a "beta" badge for a period of two weeks. After this period, the Source is considered generally available.
