---
title: "System for Cross-domain Identity Management (SCIM) Configuration Guide"
hidden: true
---

The SCIM specification is designed to make managing user identities in cloud-based applications like Segment easier. SCIM allows your Identity Provider (IdP) to manage users and groups within your Segment workspace.

SCIM is offered by most IdPs and compliments SAML. You can think of SAML as a way for your employees to authenticate and SCIM as a way to make sure they have the appropriate permissions.

## Requirements

Before you start, remember that SSO is only available to Business Tier customers and that SSO connections can only be configured by a workspace owner.

To setup SCIM, you must first create an SSO connection. Once you [create your SSO connection](https://segment.com/docs/segment-app/iam/sso/), log back into Segment using SSO.

## Configuration Instructions

Segment officially supports Okta, Azure AD, and OneLogin. However, you may still be able to use SCIM with another Identity Provider (IdP) by adapting the following instructions. If using a supported provider, start by searching for Segment in your provider's app catalog.

When you enable SCIM, your IdP asks for two values. One is the "base URL", the Segment base URL is: https://scim.segmentapis.com/scim/v2

The other value needed is an API key or Authorization Header. To generate one, go to **Settings > Advanced Settings** in the Segment app, and find the SSO Sync section. Click **Generate SSO Token** and copy the generated token. Use this token for the API key or Authorization Header in your IdP.

This page is located as part of the settings sidebar: https://app.segment.com/CUSTOMER_WORKSPACE_SLUG/settings/advanced

![](images/asset_generate_scim_token.png)

## Features

It is important to remember that Segment has a multi-tenant user/workspace relationship, meaning that users can be part of multiple workspaces. In most cases these workspaces will all be related to a single customer (for example, a single company might have individual workspaces for different brands or subsidiaries). However, some users can be members of workspaces for different Segment customers, such as with contractors or consultants.

Because of this, Segment must balance the autonomy of our users with the desired level of control of a workspace owner.

## Creating Users

Even though Segment users exist separately from workspaces, your IdP can create a new Segment user or add an existing Segment user to your workspace using the same IdP workflow. This process is transparent to the IdP and to you as the customer. In other words, you don't need to know if a user exists before adding them to your workspace.

If the person you want to add does not have a Segment account, your IdP will create one. If the person already has a Segment account, you can still add them to your Workspace using your IdP, but it **does not create a new Segment account**.

You can create new users and set their `userName` (email) and `displayName` (single value field that represents a user’s full name) using your IdP.

If a user already has a Segment account, you can add them using their email address using your IdP. However, the `displayName` sent by the IdP is ignored by Segment because we respect the name chosen by the user when they created their account.

## Updating User Attributes

Segment user profiles only contain a `userName` (email) and `displayName`. Once you create a user, these attributes cannot be updated using SCIM. They can only be updated by the user through the Segment UI.

## Deleting or Deactivating Users

Segment workspace owners **cannot** delete Segment workspace member accounts using SCIM, the web UI, or the Segment API. A user must delete their own account using the Segment app. Workspace owners **can** remove members from the workspace using SCIM, the web UI, or the Segment API.

Some IdPs want to set users as "inactive" or "active." Segment does not have an "inactive" state for user accounts. Similar functionality can be achieved by removing a user from your workspace. Setting an existing Segment user to "active" is similar to adding that user to the workspace.

When your IdP updates a user to set `active: false` or attempts to delete a user, Segment removes the user from your Segment workspace. If your IdP attempts to create a user with an existing email, or set `active: true`, the existing user account is added to your workspace.

Any Segment group memberships **must be reassigned** when a user is removed and re-added from your workspace. Newly added workspace users have the "Minimal Workspace Access" permission by default. The "Minimal Workspace Access" role does not have access to any sources, destinations, etc.

This reassignment may happen automatically depending on how you have configured your IdP. If the user was assigned groups via your IdP, your IdP should automatically re-add the user within Segment. For this reason, we **strongly** recommend creating your groups within your IdP, pushing them into Segment, and maintaining an active link between your IdP and Segment.

## Creating Groups

Your IdP can create new groups in Segment using SCIM. All groups are created via SCIM start with "Minimal Workspace Access." The "Minimal Workspace Access" permission does not have access to any sources, destinations, etc. To add more permissions to a group you must use the Segment web app.

## Updating Groups

Your IdP can add or remove workspace members from existing groups via SCIM. Your IdP can also update Segment group names.

## Deleting Groups

Your IdP can use SCIM to delete groups from your Segment workspace. Deleting a group within Segment does **not** remove its members from your workspace. You need to unassign users from Segment within your IdP for them to be removed from the workspace.

## Troubleshooting

When intergrating Segment and your IdP you may need to map attributes for users. The only attributes that Segment supports are `userName` and `displayName`.

You'll need to map an email (IdP) to `userName` (Segment). Depending on your IdP this attribute may be called `email` or simply `mail`. If your IdP uses emails for usernames, you can simply map `userName` (IdP) to `userName` (Segment).

If your IdP supports the `displayName` attribute this can be mapped directly to the Segment `displayName` attribute. If not, most IdPs can create a "macro mapping" which would allow you to map multiple fields to a single field within Segment, such as `{firstName} {lastName}` (IdP) to `displayName` (Segment). If your IdP doesn't support this concept you can map `firstName` (IdP) to `displayName` (Segment).
