---
title: Adobe Target Web Destination
hide-boilerplate: true
hide-dossier: false
hidden: true
published: false
beta: true
id: 61fc2ffcc76fb3e73d85c89d
---
Adobe Target is a personalization solution that makes it easy to identify your best content through tests that are easy to execute. So you can deliver the right experience to the right customer. When you have Segment installed, you can make efficient use of your existing tracking implementation by using Segment to fulfill your data collection needs across all your tools that integrate with Segment, including Adobe Target.

Segment offers two destinations for Adobe Target:
- [Adobe Target Web](/docs/connections/destinations/catalog/actions-adobe-target-web/)
- [Adobe Target Cloud Mode](/docs/connections/destinations/catalog/actions-adobe-target-cloud/)

> success ""
> **Good to know**: This page is about Segment's Adobe Target Web destination. There's also a page about Segment's [Adobe Target Cloud Mode destination](/docs/connections/destinations/catalog/actions-adobe-target-cloud/).

## Getting started

The Adobe Target Web destination loads Adobe's `at.js` script for you in order to upsert user profiles, trigger views and track events. 

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for "Adobe Target Web" in the Destinations Catalog, and select the destination.
3. Click **Configure Adobe Target Web** in the top-right corner of the screen.
4. Select the web source that will send data to Adobe Target Web and follow the steps to name your destination. The web source chosen must used Analytics.js 2.0.
5. On the **Settings** tab, input your Adobe Target destination settings.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).
7. Enable the Destination and configured Mappings.

{% include components/actions-fields.html %}

## Relationship between Adobe Target Web and Adobe Target Cloud Mode

Adobe Target is unique because you must have a web integration with Adobe Target in order to utilize the Target server-side API for profile updates. This is because Adobe Target only allows creation of user profiles via client-side web. 

To support this, we provide an Adobe Target Web destination for user profile creation, updates, and page/event tracking and an [Adobe Target Cloud Mode destination](/docs/connections/destinations/catalog/actions-adobe-target-cloud/) for additional profile updates. The cloud mode destination is especially useful if you would like to send Personas data to Adobe Target as profile parameters.

### How does it work?
Adobe Target’s `at.js` script identifies each visitor uniquely through a `PCID`, which is auto-generated in the visitor’s cookies. Since we do not expect you to pass the `PCID` to Segment, Segment will update profiles using the `mbox3rdPartyId`. 

Segment recommends setting the `mbox3rdPartyId` to `userId` (falling back on `anonymousId`) and we set this as the default for your implementation. This allows for a common identifier that can be used to tie server-side data back to the original profile that was created on the web.

Depending on your users’ typical journey, a few scenarios can occur when using web and cloud mode together.

#### Scenario 1. Anonymous user always, never becomes known.
When the user arrives on your website, one Adobe Target profile will be created and the `mbox3rdPartyId` will be equal to the Segment `anonymousId`.

If the same user visits on a different device, they will have a new `anonymousId` and therefore a different `mbox3rdPartyId`, and a separate Adobe Target profile will be created. This is in line with how Adobe’s `PCID` behavior works too.

#### Scenario 2. Known user always, from first point of contact.
This scenario assumes that your users authenticate and have a `userId` upon arriving on your website. When the user arrives on your website, one Adobe Target profile will be created and the `mbox3rdPartyId` will be equal to the Segment `userId`.

If the same known user visits on a different device, assuming they authenticate immediately, they will have the same `userId` and therefore the same `mbox3rdPartyId`. This means you can target known users across devices.

#### Scenario 3. Anonymous user becomes a known user.
When the user first arrives on your website, one Adobe Target profile will be created and the `mbox3rdPartyId` will be equal to the Segment `anonymousId`. However, once the user is identified, they will be assigned a new `mbox3rdPartyId` equal to the Segment `userId`. There will be two profiles in Adobe Target; both will be available for targeting.

### How to use Adobe Target with Personas
For information on how to use Adobe Target with Personas, please see [Adobe Target Cloud Mode destination](/docs/connections/destinations/catalog/actions-adobe-target-cloud/).

## Viewing Segment data in Adobe Target
To view and use your Segment data in Adobe Target, navigate to **Adobe Target > Audiences > Create Audience > Add Rule**.

- Profile Attributes will appear under the “Visitor Profile” attributes.
- Page Parameters will appear under “Custom” attributes. Fields will have `page.` prepended to the key.

Audiences can then be used in Adobe Target **Activities**, such as A/B Testing and Experience Targeting. Please note that while Standard and Premium Adobe Target packages allow access to the SDK and API, certain personalization functionality may only be available with Adobe Target Premium. 