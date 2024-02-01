---
title: Destinations
---

[Destination Actions](/docs/connections/destinations/actions/) allow users to create subscriptions, or sets of conditions in which data is sent to the destinations, and data mappings, which format that data for the destination tool. Segment watches for data that matches the conditions you create (triggers) for the subscription, and when the conditions are met, uses an explicit mapping to transform the incoming data to an output format that your destination can use.

## Development process

Follow the high-level steps below to create your destination.

### Become a partner

Sign up for the [Segment Select Partner Program](https://segment.com/partners/integration/). During the sign-up process, you’ll agree to the [Segment Partner Program Agreement](https://segment.com/legal/partnersagreement/) and [Privacy Policy](https://segment.com/legal/privacy/).


### Plan your integration

Before you begin development, consider the following points:

1. Decide the type of destination you want to build. Developer Center supports building cloud-mode and device-mode web destinations. Segment recommends building a cloud-mode destination, because data is sent to Segment prior to going to your API, so customers can take advantage of Segment features like filters, transformations, and replays. You can learn more [here](https://segment.com/docs/connections/destinations/#connection-modes). Developer Center does not support building device-mode mobile destinations. Segment recommends building a plugin to get information like session ID from the device.

2. Spec out the integration. If you want some guidance, you can use this [template](https://docs.google.com/document/d/1dIJxYge9N700U9Nhawapy25WMD8pUuey72S5qo3uejA/edit#heading=h.92w309fjzhti){:target="_blank"}, which will prompt you to think about the connection mode of the destination, the method of authentication, the settings, and the Actions and default Field Mappings that you want to build.

### Build your integration

1. You don't need to access a Segment dev environment to build an integration. You’ll test it locally on your machine. Destinations are written in TypeScript. For more information about TypeScript, see TypeScript's [documentation](https://www.typescriptlang.org/docs/){:target="_blank}.

2. To work with Segment's actions repository, download and install the following:
  - [node](https://nodejs.org/en/){:target="_blank"}
  - [nvm](https://github.com/nvm-sh/nvm){:target="_blank"}
  - [yarn](https://yarnpkg.com/){:target="_blank"}


3. To test your integration:

   - For cloud-mode destinations, follow these instructions: [Test Cloud Destinations](/docs/partners/destinations/testing).
   - If you are building a device-mode destination, see the [Test Browser Destinations](#).

4. When you have questions, reach out to partner-support@segment.com.

For more information, see [Build a Destination](/docs/partners/destinations/build).

### Submit a pull request

Once you’ve finished making your changes, added unit tests for new functionality, and tested end-to-end using the local server, you can [create a pull request](https://github.com/segmentio/action-destinations/compare){:target="_blank”}.

- When you create a pull request, include a description of the changes made and why. This will help during the code review process.
- Verify that you have thoroughly tested your changes by selecting the appropriate checkboxes.
- A Segment developer will review the PR. They may ask for changes to be completed before the PR can be merged. Once all changes are made, the Segment developer will approve the PR.
- When you submit a PR, the Segment team is automatically notified. The turnaround time for reviews may take up to 2-3 business days.


Your PR is merged!

- Congratulations! Once your PR is merged by a Segment developer, they will deploy your changes and notify you when it’s publicly available. If the destination is in private beta, Segment provides a link to access your destination. Once the destination is ready for general availability and has been approved, the destination will be visible in the integrations catalog.
- The Developer Center deploys on Wednesdays for all non-emergency changes. Changes should be approved and merged by Tuesday 5pm Pacific time to make the Wednesday release.


### Join the Developer Portal

After your code is deployed, you'll receive an invitation to join the Segment Developer Portal. You'll use this portal to provide additional metadata for the Segment catalog.

### Write documentation

Documentation is integral to enabling Segment's users to self-serve and onboard with your integration. Segment's documentation team will work with you during this part of the process to ensure your documentation matches the Segment style and is as instructive as possible. 

To create your documentation, follow the instructions outlined [in this template](https://github.com/segmentio/segment-docs/blob/develop/templates/partners/destination-new.md){:target="_blank"} if your destination is net new; If your destination is an updated version of a classic destination, follow the instructions outlined [in this template](https://github.com/segmentio/segment-docs/blob/develop/templates/partners/destination-update.md){:target="_blank"}.

### Release your Destination

Once documentation is complete, your Destination will enter Public Beta status. Destinations remain in Public Beta status for a minimum of two weeks, and until the destination is added and configured by two users. Once these criteria are met, the destination moves to General Availability.
