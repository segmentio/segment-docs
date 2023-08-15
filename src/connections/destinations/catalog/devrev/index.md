---
title: DevRev (Actions) Destination
hide-boilerplate: true
hide-dossier: true
id: 649adeaa719bd3f55fe81bef
---

{% include content/plan-grid.md name="actions" %}

DevRev is a business software company that brings developers (dev) and customers (rev) together in the era of product-led growth. DevRev is building an API-first dev-centric CRM that uses data, design, and machine intelligence to empower devs to build, support, and grow their revs. Learn more at [devrev.ai](https://devrev.ai){:target="\_blank”}, Twitter [@devrevinc](https://twitter.com/devrevinc){:target="\_blank”}, and [Medium](https://medium.com/devrev){:target="\_blank”}.

The DevRev destination uses Segment's action framework to take action in your DevOrg when particular events or activity is sent from enabled Segment Sources.

## DevRev Destination (Actions) use cases

With this destination, website or external events can trigger action within DevRev.

For example:

- When a user requests a demo, DevRev creates a work ticket or issue with the details
- When a user fills out a form, create a RevUser (lead) object
- Track user events within DevRev
<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

1.  Generate an API key from the [DevRev app](https://app.devrev.ai/){:target="_blank"}. Be sure you're in the DevOrg you want the events sent to and then navigate to **Settings** (the gear in the top left) > **Account** > **New Token**. Copy this API key, as you'll need it when setting up your DevRev (Actions) destination in Segment.
2.  Open the Segment web app, click **Catalog**, then click **Destinations**.
3.  Search for DevRev (Actions) and click it.
4.  Click **Configure DevRev**.
5.  Select an existing Source to connect to DevRev (Actions).
6.  Give it a name and choose how to configure the destination
7.  The email blacklist is a comma separated list of domains that you want the integration to consider personal (vs business) email addresses.

### Accounts, domains, emails, and the blacklist

By default, the `createRevUser` function will create a new RevUser (Contact) object in DevRev. This contact will be associated with an Account as well, based on the following rules:

1. If the email address is a personal email address (defined by having a domain in the domain blacklist), then the Account will be searched for using the email address specifically (for example, `test@gmail.com` would look for an account with external_ref of `test@gmail.com`)
2. If the email address is a company address (not having a domain in the domain blacklist), then DevRev looks for an account with the company domain. If found, the RevUser will be attached to this Account. If there is no existing account, a new one will be created with the company domain (for example, DevRev would add `test@company.com` under the Account with the domain `company.com`)

{% include components/actions-fields.html %}