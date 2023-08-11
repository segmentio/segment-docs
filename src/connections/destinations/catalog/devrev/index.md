---
# The end name should be similar to `Slack  Destination`
title: DevRev (Actions) Destination
hide-boilerplate: true
hide-dossier: true
id: 649adeaa719bd3f55fe81bef
---

<!-- This template is meant for Actions-based destinations that do not have an existing Classic or non-Actions-based version. For Actions Destinations that are a new version of a classic destination, see the doc-template-update.md template. -->

{% include content/plan-grid.md name="actions" %}

<!-- Include a brief description of the destination here, along with a link to your website. -->

DevRev is a business software company that brings developers (dev) and customers (rev) together in the era of product-led growth. We are building an API-first dev-centric CRM that uses data, design, and machine intelligence to empower devs to build, support, and grow their revs. Learn more at [devrev.ai](https://devrev.ai){:target="_blank”}, Twitter [@devrevinc](https://twitter.com/devrevinc){:target="_blank”} and [Medium](https://medium.com/devrev){:target="_blank”}.

The DevRev destination uses Segment's action framework to take action in your DevOrg when particular events or activity is sent from enabled Segment Sources.

<!-- In the section below, explain the value of this actions-based destination. If you don't have a classic version of the destination, remove this section. -->

## Use Cases of the DevRev Destination (Actions)

With this destination, you can have website or external events trigger action within DevRev for instance:

- When a user requests a demo, create work (ticket or issue) with the details
- When a user fills out a form, create a RevUser (lead) object
- Track user events within DevRev
<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for DevRev (Actions) and click it
3. Click **Configure DevRev**.
4. Select an existing Source to connect to DevRev (Actions).
5. Give it a name and choose how to configure the destination
6. You can generate an API key from the [DevRev app](https://app.devrev.ai/). Be sure you're in the DevOrg you want the events sent to and then go to Settings (the gear in the top left) -> Account -> New Token
7. The email blacklist is a comma separated list of domains that you want the integration to consider personal (vs business) email addresses.

### Accounts, Domains, Emails, and the blacklist

By default, the `createRevUser` function will create a new RevUser (Contact) object in DevRev. This contact will be assoicated with an Account as well, based on the following rules:

1. If the email address is a personal email address (defined by having a domain in the domain blacklist), then the Account will be searched for using the email address specifically (aka `test@gmail.com` would look for an account with external_ref of `test@gmail.com`)
2. If the email address is a company address (defined by having a domain not in the domain blacklist), then we will look for an account with the company domain. If found, the RevUser will be created attached to this Account. If there is no existing account, a new one will be created with the company domain (aka `test@company.com` would be added under the Account with the domain `company.com`)

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

<!--
Additional Context

Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.
-->
