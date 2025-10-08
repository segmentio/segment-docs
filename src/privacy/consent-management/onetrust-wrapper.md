---
title: Analytics.js OneTrust Wrapper
plan: consent-management
---

This guide to Segment's Analytics.js OneTrust wrapper contains context about which configurations might cause data loss, steps you can take to remediate data loss, configurations that minimize data loss, and a guide to expected wrapper behavior. 

For questions about OneTrust Consent and Preference Management behavior, see the [OneTrust documentation](https://my.onetrust.com/s/topic/0TO3q000000kIWOGA2/universal-consent-preference-management?language=en_US){:target="_blank"}. 

For questions about the Analytics.js OneTrust wrapper, see the [@segment/analytics-consent-wrapper-onetrust](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-wrapper-onetrust){:target="_blank"} repository. 


## OneTrust consent banner behavior

The OneTrust consent banner has three key UI configurations that control how the banner and consent preferences behave:

- **Banner display:** If the banner should be shown or not when a user lands on your webpage
- **Banner closing:** If the consent banner should automatically close when the user takes an action on your webpage 
- **Consent model:** If the status is automatically set to `true` or `false` for all categories
  - **Opt-In:** The user, by default, does not consent to all categories (except those that you deem to be mandatory). The user is required to select categories that they consent to share data with (or, "opt-in" to data collection)
  - **Opt-out:** The user, by default, does consent to all categories. The user can choose to select categories that they do not consent to share data with (or, "opt-out" of data collection)


> info "Segment's Analytics.js OneTrust wrapper assumes the following"
> **Opt-In** and **Implied** statuses are treated in Segment's OneTrust wrapper as `Opt-In`. **Notice Only**, **Custom**, or **Opt-Out** statuses are treated in Segment's OneTrust wrapper as `Opt-Out`.

<!-- TODO (IG, 4/2024): the above callout would not render correctly in markdown - figure out why that happened-->


You can set the banner display and banner closing settings to create a banner implementation that is either:
- **Mandatory**: A user must interact with a banner before they access your site
- **Optional**: A user does not have to interact with a banner while they access your site. The banner is always present as your end users navigate through your site, disappears after a user takes an action, like clicking or scrolling, or is never shown to your users

Some combinations of banner behaviors and consent models may lead to a [possibility of data loss in your downstream destinations](#scenarios-where-you-might-experience-data-loss).

### Possibility for data loss

Segment has evaluated a combination of banner behaviors, consent models, and load orders to be at either a [low](#low) or [medium](#medium) possibility of data loss.

#### Low 

Segment assesses some behaviors to have a low possibility of data loss because Twilio Segment Analytics.js and third-party device mode libraries are loaded only after the user has provided their consent (for consent banners a user **must** interact with to use your site) or your site assumes that a user consents (if you set your cookie banner on your site to be optional and never displayed to a user).

#### Medium

Segment assesses some banner behaviors, like those that always remain as a user navigates your site and those that disappear after a user action like clicking or scrolling, to be at a medium possibility for data loss and noncompliance.

- **Compliance Risk**: Once device mode libraries are loaded they cannot be unloaded when the user revokes consent to their mapped categories. *Note: Not unloading the third-party library poses a risk **only** if the third-party library is collecting data in addition to collecting Segment events.* 
- **Possibility of data loss**: Once Segment loads, if the user consents to additional categories that map to device mode libraries, then these new libraries will not be loaded until the next time that Segment loads, like after a page reload. This may result in data loss. 

To minimize the possibilities for data loss:

- Set up cookie banners that either must be interacted with in order to use your site, or are set to be optional and never displayed to a user, with the assumption that users rarely go back to update consent preferences
- If using cookie banners that either always remain as a user navigates your site or disappear after a user action, like clicking or scrolling:
  - **Use fewer device mode libraries.** This way, all data flows through Twilio Segment and you can respect an end-user's consent preferences using Consent Management
  - **Regularly audit your device mode libraries.** Audit your device mode libraries to confirm they are not capturing data themselves
  - **Add logic to do a full page refresh when the user’s consent to categories associated with device mode libraries changes.** This will help unload the device mode libraries completely 

> info " "
> Refreshing a page when a user's consent changes could cause duplicate page events in your destinations. This can also cause a loss of form state for your users, if input form fields were present at the time of refresh. However, page refreshes due to changes in consent can also help load additional device mode libraries the user has consented to share data with, eliminating the possibility of data loss in your downstream destinations.

## Segment library desired behavior

| Banner behavior | Cookie banner | User interaction with webpage | Segment loads | Possibility of data loss |
| --------------- | ------------  | ----------------------------- | ------------  | ---- |
| Mandatory | &#x2705; Displayed on page load |  &#x2705;Required to access webpage | After user action | [Low](#low), until a user changes their preferences |
| A banner that always remains as a user navigates your site | !&#x2705; Displayed on page load | &#x1F6AB; Not required to access webpage | With page load | [Medium](#medium) |
| A banner that disappears after a user action, like clicking or scrolling |  &#x2705;Displayed on page load | &#x1F6AB; Not required to access webpage | With page load | [Medium](#medium) |
| A banner that is optional and never displayed to a user | &#x1F6AB; Not displayed on page load | &#x1F6AB; Not required to access webpage | With page load | [Low](#low), until a user changes their preferences |

## Scenarios where you might experience data loss

You might experience data loss if a user navigates away from a landing page before providing their consent or doesn't interact with a consent banner on a website that uses an opt-in consent model. The following tables outline common scenarios that your users might encounter and information about the degree of data loss you can expect for each scenario. 

### First time users

> info ""
> Return users with no valid prior session are treated as first time users.

<table>
  <thead>
    <th> Consent model </th>
    <th> User action </th>
    <th> Expected behavior </th>
    <th> Data loss </th>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">Opt-In <i>(optional banner behavior)</i></td>
      <td>User provides consent preferences and closes banner (with or without the presence of strictly necessary category) </td>
      <td> 1. Website loads <br><br> 2. Website presents consent banner to a user <br><br> 3. Users provide consent preference and close banner <br><br> 4. Segment libraries load <br><br>5. Any events in the buffer for that session are sent to consented destinations (Segment and third-party destinations) <br><br> 6. All events after a user provides their consent will flow to consented destinations (Segment and third-party destinations)</td>
      <td>Data loss is possible if the user navigates away from the landing page before providing consent or if a user closes the banner. <br><br> No data loss if the user provides consent on the landing page </td>
    </tr>
    <tr>
      <td> User does not interact with the consent banner and continues to access the website </td>
      <td> 1. Website loads <br><br> 2. Website presents consent banner to a user <br><br> 3. User does not take a consent action and continues to access the website <br><br> 4. No Segment cookies are set <br><br>5. No events flow to Segment or third-party destinations</td>
      <td> Data loss. No data flows to strictly necessary or unmapped destinations </td>
    </tr>
    <tr>
      <td> User <b>rejects all</b> cookies and closes banner </td>
      <td>1. Website loads <br><br>2. Website presents consent banner to a user<br><br>3. User <b>rejects all</b> cookies and closes banner <br><br>4. If workspace has unmapped destinations or strictly necessary destinations, Segment libraries load<br><br> 5. Any events in the buffer for that session are sent to unmapped or strictly necessary destinations <br><br>6. All events after a user rejects consent flow to unmapped or strictly necessary destinations </td>
      <td>Data loss is possible if the user navigates away from the landing page before providing consent or if a user closes the banner. <br><br> No data loss if the user provides consent on the landing page </td>
    </tr>
    <tr>
      <td>Opt-In <i>(with mandatory consent banner)</i></td>
      <td>User provides consent preferences and closes banner</td>
      <td> 1. Website loads <br><br> 2. Website presents consent banner to a user, who cannot use your website until they interact with the banner <br><br>3. User provides consent preferences and closes banner <br><br> 4. Segment libraries load <br><br> 5. All events flow to consented destinations (Segment and third-party destinations)</td>
      <td> No data loss </td>
    </tr>
    <tr>
      <td rowspan="3">Opt-out</td>
      <td> User provides consent preference and closes banner </td>
      <td> 1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented and unmapped destinations (Segment and third party destinations) <br><br> 4. Website presents consent banner to a user <br><br> 5. User provides consent preferences and closes banner <br><br> 6. Events flow to unmapped destinations and destinations in categories your user consented to share data with. Events do not flow to mapped destinations in categories that your user did not consent to share data with </td>
      <td> No data loss <br><br> Device mode libraries that are passively collecting data and are mapped to categories a user does not consent to share data with might still be collecting data. <br><br><b>Segment is not able to block that data collection.</b></td>
    </tr>
    <tr>
      <td>User does not interact with the consent banner and continues to access the website</td>
      <td> 1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented and unmapped destinations (Segment and third-party destinations) <br><br> 4. Website presents consent banner to a user <br><br> 5. User does not interact with the consent banner and continues to access the website <br><br> 6. Events continue to flow to default consented and unmapped destinations </td>
      <td> No data loss </td>
    </tr>
    <tr>
      <td> User provides consent preferences, <b>rejects all categories</b>, and closes the banner </td>
      <td> 1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented destinations (Segment and third-party destinations) <br><br> 4. Website presents consent banner to a user <br><br> 5. User provides consent preferences, <b>rejects all categories</b> and closes the banner. <br><br><br> If your workspace has <b>no unmapped or strictly necessary destinations</b>, all event data after a user provides their consent data is blocked. <br><br><br> If your workspace has <b>unmapped or strictly necessary destinations</b>, events continue to flow to destinations in the strictly necessary category and unmapped destinations. </td>
      <td> No data loss <br><br> Device mode libraries that are passively collecting data and are mapped to categories a user does not consent to share data with might still be collecting data. <br><br><b>Segment is not able to block that data collection.</b></td>
    </tr>
    <tr>
      <td>Implied</td>
      <td>User does not interact with the consent banner and continues to access the website</td>
      <td> 1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented and unmapped destinations (Segment and third-party destinations) <br><br> 4. Website presents consent banner to a user <br><br> 5. User does not interact with the consent banner and continues to access the website <br><br> 6. Events continue to flow to all connected destinations <br><br><br> If your workspace has <b>unmapped or strictly necessary destinations</b>, events continue to flow to unmapped destinations. </td>
      <td> No data loss </td>
    </tr>
  </tbody>  
</table>


### Return users

<table>
  <thead>
    <th> Consent model </th>
    <th> User action </th>
    <th> Expected behavior </th>
    <th> Data loss </th>
  </thead>
  <tbody>
  <tr>
    <td rowspan="2">Opt-In<i>(with mandatory or optional consent banner)</i></td>
    <td>User does nothing and continues accessing the website</td>
    <td>1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented and unmapped destinations (Segment and third-party destinations) <br><br>4. User does not interact with the consent banner and continues to access the website</td>
    <td>No data loss</td>
  </tr>
  <tr>
    <td> User seeks, opens, and updates cookies on the banner, then closes the banner</td>
    <td> 1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented destinations (Segment and third-party destinations)<br><br>4. User seeks, opens, and updates cookies on the banner<br><br>5. User closes banner<br><br>6. Events flow to consented destinations, are block from flowing to mapped, non-consented destinations.<br>If a user rejects all categories and your Segment workspace has no unmapped destinations, <b>no data will flow to any destination</b><br>If a user rejects all categories and your Segment workspace has unmapped destinations, <b>data will flow to your unmapped destinations</b></td>
    <td> No data loss <br><br> Device mode libraries that are passively collecting data and are mapped to categories a user does not consent to share data with might still be collecting data. <br><br><b>Segment is not able to block that data collection.</b></td>
  </tr>
  <tr>
    <td rowspan="2">Opt-out<i>(with mandatory or optional consent banner)</i></td>
    <td>User does nothing and continues accessing the website</td>
    <td>1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented and unmapped destinations (Segment and third-party destinations) <br><br>4. User does not interact with the consent banner and continues to access the website</td>
    <td>No data loss</td>
  </tr>
  <tr>
    <td> User seeks, opens, and updates cookies on the banner, then closes the banner</td>
    <td> 1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented destinations (Segment and third-party destinations)<br><br>4. User seeks, opens, and updates cookies on the banner<br><br>5. User closes banner<br><br>6. Events flow to consented destinations, are block from flowing to mapped, non-consented destinations.<br>If a user rejects all categories and your Segment workspace has no unmapped destinations, <b>no data will flow to any destination</b><br>If a user rejects all categories and your Segment workspace has unmapped destinations, <b>data will flow to your unmapped destinations</b></td>
    <td> No data loss <br><br> Device mode libraries that are passively collecting data and are mapped to categories a user does not consent to share data with might still be collecting data. <br><br><b>Segment is not able to block that data collection.</b></td>
  </tr>
  <tr>
    <td rowspan="2">Implied</td>
    <td>User does nothing and continues accessing the website</td>
    <td>1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented and unmapped destinations (Segment and third-party destinations) <br><br>4. User does not interact with the consent banner and continues to access the website</td>
    <td>No data loss</td>
  </tr>
  <tr>
    <td> User seeks, opens, and updates cookies on the banner, then closes the banner</td>
    <td> 1. Website loads <br><br> 2. Segment libraries load <br><br> 3. Events flow to default consented destinations (Segment and third-party destinations)<br><br>4. User seeks, opens, and updates cookies on the banner<br><br>5. User closes banner<br><br>6. Events flow to consented destinations, are block from flowing to mapped, non-consented destinations.<br>If a user rejects all categories and your Segment workspace has no unmapped destinations, <b>no data will flow to any destination</b><br>If a user rejects all categories and your Segment workspace has unmapped destinations, <b>data will flow to your unmapped destinations</b></td>
    <td> No data loss <br><br> Device mode libraries that are passively collecting data and are mapped to categories a user does not consent to share data with might still be collecting data. <br><br><b>Segment is not able to block that data collection.</b></td>
  </tr>
</tbody>
</table>

<!-- TODO (IG, 4/2024): the above tables would not render ordered lists in a cell - figure out why this happened-->


## Expected wrapper behavior

The following table explains how Segment's OneTrust wrapper works with different configurations of consent categories and destination behaviors. 

| Consent categories | Unmapped destinations | Mapped destinations | Wrapper behavior |
| ------------------ | --------------------- | ------------------- | ---------------- |
| All categories are disabled | No unmapped destinations <br> **or** <br> All unmapped destinations are disabled | Any configuration | No data flows to Segment | 
| All categories are disabled | At least 1 enabled destination is not mapped to a consent category | Any configuration | Data flows to Segment | 
| All categories are disabled | S3 destination is unmapped | Any configuration | Data flows to Segment |
| One or more categories are enabled | No unmapped destinations <br> **or** <br> All unmapped destinations are disabled | All destinations are disabled | No data flows to Segment |
| One or more categories are enabled | No unmapped destinations <br> **or** <br> All unmapped destinations are disabled | One or more destinations are enabled | Data flows to Segment | 
| One or more categories are enabled | One or more destinations are enabled | All destinations are disabled | Data flows to Segment |
| One or more categories are enabled | One or more destinations are enabled | One or more destinations are enabled | Data flows to Segment |
