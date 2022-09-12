---
# The end name should be similar to `Slack  Destination`
title: Sendgrid Marketing Campaigns Destination
hide-boilerplate: true
hide-dossier: true
private: true
id: 6101bf0e15772f7e12407fa9
---

<!-- This template is meant for Actions-based destinations that do not have an existing Classic or non-Actions-based version. For Actions Destinations that are a new version of a classic destination, see the doc-template-update.md template. -->

{% include content/plan-grid.md name="actions" %}

<!-- Include a brief description of the destination here, along with a link to your website. -->

<!-- This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

{% include content/ajs-upgrade.md %}

[Sendgrid Marketing Campaigns](https://sendgrid.com/solutions/email-marketing/) provides email marketing automation for businesses. With Segment you can add contacts and lists to Sendgrid Marketing Campaigns quickly and easily!

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure Sendgrid Marketing Campaigns**.
4. Select an existing Source to connect to Sendgrid Marketing Campaigns (Actions).
5. In the destination settings, enter your Sendgrid Marketing Campaigns “API key” into the connection settings. You should create a new API key for the Segment destination. You can read more about API keys on [Marketing Campaigns’s docs.](https://docs.sendgrid.com/ui/account-and-settings/api-keys)

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

<!--
Additional Context
Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.
-->

## Recording Custom User Traits
If you want to view any other custom user traits in the Marketing Campaigns list dashboard, you must create a [Custom Field inside Marketing Campaigns’s UI](https://docs.sendgrid.com/ui/managing-contacts/custom-fields#creating-custom-fields) of the traits in your identify calls. Note that you do not need to map all user.traits you are sending inside Marketing Campaigns. You only need to create Custom Fields of the traits you want to see in your list view.

## Custom Fields
To send custom fields/user traits to Marketing Campaigns you need to create the field first in Marketing Campaigns for each trait you want sent to Marketing Campaigns. Then when you call identify with keys that match those traits they will appear in your Marketing Campaigns list.

For any other custom traits just add a Custom Field inside of Sendgrid Marketing Campaigns with a tag that matches the key you are using in your identify call.


## Recording userId
To record a Segment userId in Sendgrid Marketing Campaigns, you must pass the userID as a trait on your identify() calls. We do not automatically map the Segment userID to any Marketing Campaigns properties.
