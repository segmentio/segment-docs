---
title: Identity & Access Management Overview
redirect_from: '/segment-app/iam/add-a-team-member/'
plan: iam
---

Segment's access management tools let Workspace Owners manage which users can access different parts of their Segment workspaces. The Access Management page has three tabs: [Users (team members)](/docs/segment-app/iam/concepts/#team-members), [User Groups](/docs/segment-app/iam/concepts/#user-groups), and [Tokens](/docs/segment-app/iam/concepts/#tokens). 

Access settings are applied at the workspace level. A Segment user can have access to one or more workspaces and can have different [roles](/docs/segment-app/iam/roles/) in each workspace.
Users access their Segment account with either email/password credentials, their [Twilio credentials](#twilio-unified-login), or by using [Single Sign On](/docs/segment-app/iam/sso/).

## Exporting a workspace's user list

[Workspace Owners](/docs/segment-app/roles/#global-roles) can download a CSV list of users who have access to a specific workspace (including their roles) from the Access Management page in the Segment app.

You can select a user in the table to see their [roles](/docs/segment-app/iam/roles). Check out the [Roles documentation](/docs/segment-app/iam/roles/) for more details.

## Twilio Unified Login

With Twilio Unified Login, Twilio users can use their Twilio email, password, and authentication settings to access several Twilio products, including Twilio Messaging, SendGrid, and Segment. You can also use Sign up With Google to create your Twilio account. Once you link your Segment account to your Twilio credentials, you can access Segment directly from the Twilio console using the [Twilio Product Switcher](#twilio-product-switcher).

### Twilio Sign Up

Segment invitations and sign ups that are redirected to Twilio's sign up page must adhere to Twilio's [minimum password and 2FA requirements](https://help.twilio.com/articles/115012261968){:target="_blank”}. To learn more, view Twilio's [Account Management](https://support.twilio.com/hc/en-us/sections/205104908-Account-Management?_gl=1*1xa50pg*_ga*OTUyMjQ4OTU5LjE2NjM2ODQzMDE.*_ga_3JKYB4GBBY*MTcwNzc2ODE1OC4xNDkuMS4xNzA3NzY4MjUzLjAuMC4w){:target="_blank”} documentation.

Any existing Segment user must adhere to existing password requirements and 2FA settings set at the Workspace level.

### Twilio Product Switcher

You can access Segment from the Twilio Console using the Product Switcher. For more information, view the Twilio support article [Getting Started with the Unified Login and Product Switcher](https://support.twilio.com/hc/en-us/articles/19652187501211-Getting-Started-with-the-Unified-Login-and-Product-Switcher){:target="_blank”}.

### User settings

Twilio Unified Login users can manage their Segment user settings, including name, email, password, and 2FA settings, directly in their Twilio account. To learn more about Twilio’s user and password policies, review Twilio's [Account Management](https://support.twilio.com/hc/en-us/sections/205104908-Account-Management){:target="_blank”} documentation. 

### Segment Users and SSO/SCIM

Existing Segment users can still use their credentials to access Segment.

Segment continues to support [SSO](/docs/segment-app/iam/sso/) and SCIM, as users who need to access an SSO enabled workspace will be directed to authenticate through the configured Identity Provider.

## Quick links
- [Invite a team member to your workspace](/docs/segment-app/iam/membership/#invite-a-new-team-member)
- [Create a User Group](/docs/segment-app/iam/membership/#create-a-new-user-group)
- [Update a team member's access](/docs/segment-app/iam/membership#change-a-team-members-access)
- [Remove a team member from a workspace](/docs/segment-app/iam/membership/#remove-a-team-member-from-your-workspace)
- [Add a new user with Single Sign On](/docs/segment-app/iam/membership/#team-management-with-single-sign-on)

<div class="double">
  {% include components/reference-button.html href="/segment-app/iam/membership/" icon="media/academy.svg" title="Invite and manage workspace members" description="Learn how to add members to your workspace, and manage their permissions." variant="related" %}

  {% include components/reference-button.html href="/segment-app/iam/membership/" icon="media/academy.svg" title="Organize Users with User Groups" description="Learn manage workspace members in bulk." variant="related" %}
</div>
