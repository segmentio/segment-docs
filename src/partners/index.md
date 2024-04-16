---
title: Developer Center Overview
---
Welcome! Here are the steps you’ll follow to build an integration on Dev Center 2.0, launch your destination to Private Beta so customers can test it, and then launch it as Public in the Segment catalog.

{% comment %}
Before you continue, read the [Code of Conduct](./CODE_OF_CONDUCT.md). By contributing to this project, you are expected to uphold this code.
{% endcomment %}

## Build on Segment

Over 19,000 companies use Segment as their central hub for collecting and synthesizing first-party customer data. Customers use Segment [sources](/docs/connections/sources/) to collect data across all their properties (for example, web, mobile, CRMs, or email) and send this data into [destinations](/docs/connections/destinations/) (SaaS tools, internal databases or queues, or a data warehouse) to perform analytics, run marketing campaigns and much more.

### Integration types

Segment provides two different integration types to support bringing your data into Segment, and sending your data downstream to other third-party tools.

#### Sources

[Sources](/docs/connections/sources/) bring users' first-party data into Segment. While there are several *types* of sources (for example, web or server libraries, mobile integrations, and Cloud), the Developer Center enables you to build your own [*Cloud Event*](/docs/connections/sources/#event-cloud-sources) sources. These sources enable users to import data directly from your application into Segment.

#### Destinations

[Destinations](/docs/connections/destinations/) send data to other tools for processing or analysis. For example, a Segment user may want to send their data to your advertising platform or analytics tool. To accomplish this, they'll connect your Segment destination to their workspace.

All new Segment Destinations are built on the [Actions framework](/docs/connections/destinations/actions/), which enables a simplified build experience for you and a more straightforward configuration experience for your users.

## Development process

To develop your integration in the Developer Center, complete the following steps:
1. [Become a Segment Partner](#become-a-segment-partner)
2. [Understand Segment's conceptual model and Spec](#understand-segments-conceptual-model-and-spec)
3. [Follow Segment's security guidance](#follow-segments-security-guidance)
4. [Request access to the Segment Developer Center](#request-access-to-the-segment-developer-center)
5. [Create your integration](#create-your-integration)
6. [Write your integration's documentation](#write-your-integrations-documentation)


### Become a Segment Partner

Sign up for the [Segment Select Partner Program](https://segment.com/partners/integration/). During the sign-up process, you’ll agree to the [Segment Partner Program Agreement](https://segment.com/legal/partnersagreement/) and [Privacy Policy](https://segment.com/legal/privacy/).

### Understand Segment's conceptual model and Spec

Segment's [Conceptual Model](/docs/partners/conceptual-model) is a high-level overview of how Segment works and explains how your integration fits into the Segment catalog.

The [Segment Spec](/docs/connections/spec) provides best practices for the specific data you should capture and the best way to format that data based on your use case. The Spec outlines the semantic definition of the customer data that Segment captures across all its libraries and APIs, and will be a main building block for your integration.

### Follow Segment's security guidance

Security for both customers and partners is a priority at Segment. Before you start building on the Developer Center, review the [Acceptable Use Policy](https://segment.com/legal/acceptable-use-policy/) and ensure you're following these guidelines:

- Follow a secure software-development lifecycle, which enables you to create code that is safe for Segment customers and their end users, and that enables you to maintain and raise the security of that code over time
- If you or your code comes into contact with Segment customer- or end-user data for any reason, protect it with commercially reasonable methods throughout its data lifecycle, including creation, handling, transporting, storing and destruction.
- If you suspect a security event, incident or breach while working on this project or afterward, contact [Segment Security](mailto:security@segment.com?subject=Developer%20Center%20Security) for assistance with your investigation and communications
- Practice modern and common-sense security for any scenario that is not explicitly stated.

### Request access to the Segment Developer Center

Segment provides access to the developer on request. [Click here](https://segment.com/partners/developer-center/){:target="_blank"} to request access. A Segment account is required for this step.

Segment receives a large volume of requests so please include a valid company website and email address, answer all questions with details about integration's use case as well as highlighting specific customer requests to expedite the approval process.

### Create your integration

Follow the steps to build your [source](/docs/partners/sources) or [destination](/docs/partners/destinations).

### Write your integration's documentation

Documentation is integral to enabling Segment's users to self-serve and onboard with your integration. Segment's documentation team will work with you during this part of the process to ensure your documentation matches the Segment style and is as instructive as possible.

- [Source Documentation Instructions](/docs/partners/sources/#write-your-sources-documentation)
- [Destination Documentation Instructions](/docs/partners/destinations/#write-documentation)


### Submit your integration for review

Before users can go hands on with your integration, a review by Segment engineers is required to ensure the integration meets security and usability standards.

#### Destinations

To submit your destination for review, follow the destination-specific instructions [here](/docs/partners/destinations#submit-a-pull-request).

#### Sources

To submit your source for review, complete the steps described in the Developer Portal, and click **Submit for review**.

{% comment %}
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

During Private Beta, the integration will not be publicly listed in the catalog. You and your customers can access the catalog page using a special URL: `https://app.segment.com/goto-my-workspace/destinations/catalog/${destination-slug}` (This will direct users to the install page in their workspace).

1. Open the install URL for your integration (https://app.segment.com/goto-my-workspace/destinations/catalog/${destination-slug}) and verify that the catalog entry renders correctly. 

2. Invite one or more customers to test the integration by giving them the URL. At least one customer must verify that the destination works before it becomes available to the public.

## Release to Public in the Segment catalog

1. Once at least one customer successfully uses the integration, contact the Developer Center team, who will make your destination Public. When a destination is Public, any Segment customer can find it in the catalog and it will be featured on the New & Noteworthy page.

2. Write a blog post for your company’s blog, write a [recipe](https://segment.com/recipes/) to help customers solve a specific problem using your Integration, and/or work with Segment's Marketing team to be featured in the Segment blog.

3. Maintain your integration: fix bugs, update it if your APIs change, and add functionality as requested by customers.

{% endcomment %}