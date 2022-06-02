---
title: Adobe Target Cloud Mode Destination
hide-boilerplate: true
hide-dossier: false
strat: adobe
id: 61aa712b857e8c85c3b5a849
---
Adobe Target is the A/B testing and personalization component of Adobe Experience Cloud. Segment’s Adobe Target integration enables customers to send data from Segment to Adobe Target to create and update user profiles. You can leverage these profiles in Adobe Target to construct audiences and personalize onsite visitor experiences.

Segment offers two destinations for Adobe Target:
- [Adobe Target Web](/docs/connections/destinations/catalog/actions-adobe-target-web/)
- [Adobe Target Cloud Mode](/docs/connections/destinations/catalog/actions-adobe-target-cloud/)

> info ""
> The Adobe Target Cloud Mode destination is in beta and is in active development. Some functionality may change before it becomes generally available.

> success "Good to know"
> This page is about Segment's Adobe Target Cloud Mode destination. There's also a page about Segment's [Adobe Target Web destination](/docs/connections/destinations/catalog/actions-adobe-target-web/). **In order to use Adobe Target Cloud Mode, you must have a parallel web integration with Adobe Target as profiles can only be created by the Adobe Target `at.js` web script.**

## Getting started

The Adobe Target Cloud Mode destination sends user information to the Adobe Target API in order to update user profiles. **You must use the [Adobe Target Web destination](/docs/connections/destinations/catalog/actions-adobe-target-web/) for initial profile creation.**

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for **Adobe Target Cloud Mode** in the Destinations Catalog, and select the destination.
3. Click **Configure Adobe Target Cloud Mode** in the top-right corner of the screen.
4. Select the source that will send data to Adobe Target Cloud Mode and follow the steps to name your destination.
5. On the **Settings** tab, input your Adobe Target destination settings.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).
7. Enable the destination and configured mappings.

{% include components/actions-fields.html %}

## Relationship between Adobe Target Web and Adobe Target Cloud Mode

Adobe Target is unique because you must have a web integration with Adobe Target in order to utilize the Target server-side API for profile updates. This is because Adobe Target only allows creation of user profiles via client-side web. 

To support this, Segment provides an [Adobe Target Web destination](/docs/connections/destinations/catalog/actions-adobe-target-web/) for user profile creation, updates, and page/event tracking and an Adobe Target Cloud Mode destination for additional profile updates. The cloud mode destination is useful if you would like to send Personas data to Adobe Target as profile parameters.

### How does it work?
Adobe Target’s `at.js` script identifies each visitor uniquely through a `PCID`, which is auto-generated in the visitor’s cookies. Since Segment doesn't expect you to include the `PCID` on your Segment events, Segment updates profiles using the `mbox3rdPartyId` instead. 

Segment recommends setting the `mbox3rdPartyId` to `userId` (falling back on `anonymousId`) and sets this as the default for your implementation. This allows for a common identifier that can be used to tie server-side data back to the original profile that was created on the web.

Depending on your user's typical journey, a few scenarios can occur when using web and cloud mode together.

#### Scenario 1. Anonymous user never becomes known.
When an anonymous user arrives on your website, one Adobe Target profile will be created and the `mbox3rdPartyId` will be equal to the Segment `anonymousId`.

If the same anonymous user visits on a different device, they will have a new `anonymousId` and therefore a different `mbox3rdPartyId`, and a separate Adobe Target profile will be created. This is in line with how Adobe’s `PCID` behavior works too.

#### Scenario 2. The user is known from the first point of contact.
This scenario assumes that your users authenticate and have a `userId` upon arriving on your website. When the user arrives on your website, one Adobe Target profile will be created and the `mbox3rdPartyId` will be equal to the Segment `userId`.

If the same known user visits on a different device, assuming they authenticate immediately, they will have the same `userId` and therefore the same `mbox3rdPartyId`. This means you can target known users across devices.

#### Scenario 3. Anonymous user becomes a known user.
When an anonymous user arrives on your website, one Adobe Target profile will be created and the `mbox3rdPartyId` will be equal to the Segment `anonymousId`. However, once the user is identified, they will be assigned a new `mbox3rdPartyId` equal to the Segment `userId`. There will be two profiles in Adobe Target; both will be available for targeting.

### How to use Adobe Target with Personas
Adobe Target Cloud Mode operates as an [Event Destination](/docs/personas/using-personas-data/#personas-destination-types-event-vs-list). This means Personas sends computed traits and audiences as traits in `identify` calls or properties in `track`  calls. Please see [this example](/docs/personas/using-personas-data/#what-do-the-payloads-look-like-for-personas-data) of the payload Personas would send to Adobe Target.

When you connect Adobe Target Cloud Mode to a Personas space, you will need to set up a mapping for Update Profile. Within the Update Profile mapping, please ensure you have something mapped to Profile Attributes. If you plan to send multiple Personas computed traits and/or audiences to Adobe Target, you can click **Edit Object** and set Profile Attributes to the entire `traits` object. This ensures any audience Personas generates sends to Adobe Target.

You can use Profile Attributes in the Adobe Target Audience builder to construct audiences. For example, if you send an audience for `first_time_shopper` to Adobe Target, select **Visitor Profile** in the Audience Builder and look for the `first_time_shopper` attribute. Setting the `first_time_shopper` attribute to `true` replicates the audience for usage in Adobe Target Activities.

> info ""
> Segment does not set Profile Attributes to `traits` by default to avoid unintentionally sending PII to Adobe Target. [Adobe recommends that PII is hashed](https://experienceleague.adobe.com/docs/core-services/interface/services/customer-attributes/privacy-mac.html?lang=en){:target="_blank"} prior to sending to Adobe so please hash your data upstream if you choose to send PII.

## Viewing Segment data in Adobe Target
To view and use your Segment data in Adobe Target, navigate to **Adobe Target > Audiences > Create Audience > Add Rule**.

- Profile Attributes appear under **Visitor Profile** attributes.
- Page Parameters appear under **Custom** attributes. Fields have `page.` prepended to the key.

Adobe Target Audiences can be used in Activities, such as A/B Testing and Experience Targeting. Please note that while Standard and Premium Adobe Target packages allow access to the SDK and API, certain personalization functionality may only be available with Adobe Target Premium. 

## FAQ
### Why am I getting a `Profile Not Found` error?
The Adobe Target API can only be used for profile updates. You must first create profiles on the web by using either Segment’s [Adobe Target Web destination](/docs/connections/destinations/catalog/actions-adobe-target-web/) or a native implementation of `at.js`. Please ensure you create profiles on the web first.

Segment’s Adobe Target Web destination sends data in realtime, but it may take up to 1-hour for a user to be available via the Adobe Target API. This means you may see delivery errors for `Profile Not Found` in Adobe Target Cloud Mode until the profile is available for API updates.

In addition, Adobe Target visitor profiles expire after 14 days. [Profile lifetime](https://experienceleague.adobe.com/docs/target/using/audiences/visitor-profiles/visitor-profile-lifetime.html){:target="_blank"} could be another reason a profile is not found.
