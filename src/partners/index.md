---
title: Developer Center Overview
---
Welcome! Here are the steps you’ll follow to build an integration on Dev Center 2.0, launch your destination to Private Beta so customers can test it, and then launch it as Public in the Segment catalog.

{% comment %}
Before you continue, read the [Code of Conduct](./CODE_OF_CONDUCT.md). By contributing to this project, you are expected to uphold this code.
{% endcomment %}

## Become a Segment Partner

Sign up for the [Segment Select Partner Program](https://segment.com/partners/integration/). During the sign-up process, you’ll agree to the [Segment Partner Program Agreement](https://segment.com/legal/partnersagreement/) and [Privacy Policy](https://segment.com/legal/privacy/).

## Plan your integration

Before you begin development, consider the following points:

1. Decide the type of destination you want to build. Developer Center supports building cloud-mode and device-mode web destinations. Segment recommends building a cloud-mode destination, because data is sent to Segment prior to going to your API, so customers can take advantage of Segment features like filters, transformations, and replays. You can learn more here. Developer Center does not support building device-mode mobile destinations. Segment recommends building a plugin to get information like session ID from the device.

2. Spec out the integration. If you want some guidance, you can use this [template](https://docs.google.com/document/d/1dIJxYge9N700U9Nhawapy25WMD8pUuey72S5qo3uejA/edit#heading=h.92w309fjzhti){:target="_blank"}, which will prompt you to think about the connection mode of the destination, the method of authentication, the settings, and the Actions and default Field Mappings that you want to build.

3. Join the Segment Partners Slack workspace.

## Build your integration

1. You don't need to access a Segment dev environment to build an integration. You’ll test it with a locally on your machine. Destinations are written in Typescript. For more information about Typescript, see Typescripts [documentation](https://www.typescriptlang.org/docs/){:target="_blank}.

2. To work with Segment's actions repository, download and install the following:
  - node
  - nvm
  - yarn

3. To test your integration:

   - For cloud-mode destinations, follow these instructions: [Test Cloud Destinations](/docs/partners/destinations/testing).
   - If you are building a device-mode destination, see the [Test Browser Destinations](#).

4. When you have questions, ask in the Segment Partners Slack workspace.

## Submit a pull request

1. Once you’ve finished making your changes, added unit tests for new functionality, and tested end-to-end using the local server, you can create a pull request.

   - When you create a pull request, include a description of the changes made and why. This will help during the code review process.
   - Verify that you have thoroughly tested your changes by selecting the appropriate checkboxes.
   - A Segment developer will review the PR. They may ask for changes to be completed before the PR can be merged. Once all changes are made, the Segment developer will approve the PR.
   - _Note:_ When you submit a PR, the Segment team is automatically notified. The turnover time for reviews may take up to 2-3 business days.

2. Your PR is merged!
   - Congratulations! Once your PR is merged by a Segment developer, they will deploy your changes and notify you when it’s publicly available. If the destination is in private beta, Segment provides a link to access your destination. Once the destination is ready for general availability and has been approved, the destination will be visible in the integrations catalog.
   - *Note*: The Developer Center deploys on Wednesdays for all non-emergency changes. Changes should be approved and merged by Tuesday EOD to make the Wednesday release.


## Provide integration metadata for the catalog

Send the following information to partner-support@segment.com using the below template:

Please find the below info for _Name of integration_ Catalog entry.

- **Name:** _Name of integration_
- **Link to your most recent PR on the actions-destination repository:** _Link to PR_
- **Description:** _Brief description of your integration, up to ~500 characters. Descriptions can include formatted text and lists. Optionally, you can include up to two images, such as screenshots, with or without captions._
- **Website:** _Website for your company or product, for example https://amplitude.com_
- **Categories:** _Select a primary and (optional) secondary category where your integration will appear in the catalog._
  - Choose from: A/B Testing, Advertising, Analytics, Attribution, CRM, Customer Success, Deep Linking, Email Marketing, Enrichment, Feature Flagging, Heatmaps & Recordings, Live chat, Marketing Automation, Performance Monitoring, Personalization, Raw Data, Referrals, Security & Fraud, SMS & Push Notifications, Surveys, Tag Managers, Video
- **Logo:** _Your logo includes the name of your company. A horizontal lockup is best. File type must be SVG._
- **Mark:** _Your mark is square and does not include the name of your company. File type must be SVG._
- **Customer support email address:** _Email address for customer support inquiries. This email address will not be surfaced to users of the integration; instead it will be used by Segment customer support. Should Segment receive an inquiry about the integration from a Segment customer, Segment support will send the inquiry to this email address._

## Release to Private Beta for customer testing

1. During Private Beta, the integration will not be publicly listed in the catalog. You and your customers can access the catalog page using a special URL: `https://app.segment.com/goto-my-workspace/destinations/catalog/${destination-slug}` (This will direct users to the install page in their workspace).

2. Verify that the catalog entry renders correctly,

3. Invite one or more customers to test the integration by giving them the URL. At least 1 customer must verify that the destination works before it becomes available to the public.

## Release to Public in the Segment catalog

1. Once at least 1 customer successfully uses the integration, contact the Developer Center team. The team will make your destination Public. Any Segment customer can find it in the catalog, and it will be featured on the New & Noteworthy page..

2. Write a blog post for your company’s blog, write a [recipe](https://segment.com/recipes/) to help customers solve a specific problem using your Integration, and/or work with Segment's Marketing team to be featured in the Segment blog.

3. Maintain your integration. Fix bugs, update it if your APIs change, add functionality as requested by customers.