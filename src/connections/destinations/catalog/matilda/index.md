# Matilda (Actions) Destination

## Destination overview

The Matilda (Actions) destination supports `Identify`, `Group`, and `Track` calls.

- In Segment, this destination appears as `Matilda (Actions)` in the Integrations object.
- This is a partner-owned destination. For setup or support issues, contact the Matilda support team.
- This destination is currently in beta.

Matilda helps teams manage customer relationships, coordinate work, and automate workflows with AI-powered agents.
With this destination, you can use your existing Segment events to create and update records in Matilda.
For example, an Identify call can create or update a User and connect that user to a Person in Matilda.

## Getting started

1. In Segment, open Catalog and select Destinations.
2. Search for `Matilda (Actions)` and add it as a destination.
3. Follow the setup steps in Segment.
4. In Matilda, go to Settings and select Segment from the sidebar.
5. Copy your API key from Matilda, then paste it into the Matilda (Actions) destination configuration in Segment.

## Identify: create or update users and people

Use Identify calls to create or update a User record in Matilda.

When an Identify call includes an email address, Matilda will:

- create or update the User using that email address
- look for an existing Person with the same email address
- link the User to that Person if one exists
- create a new Person if no matching Person is found

By default, this mapping runs on Identify events.

### Understanding Users and People

In Matilda:

- a Person represents a real human
- a User represents that person as a user inside your product or SaaS application

A single Person can be related to multiple Users.
For example, the same person may appear in different products, accounts, or workspaces, while still being the same underlying human.

### Required fields

This mapping assumes your Identify call includes:

- an email address, used to create or update the User and match or create the related Person
- an id, used as the external identifier for the User

### Additional attributes

You can map extra fields from your Segment event to Matilda attributes.
For example, you might send product-specific properties such as role, plan, status, or permissions as additional attributes on the User or Person.

On the Edit Mapping page:

- the left column should contain values from your Segment event, or custom text
- the right column should contain the Matilda attribute slug or ID you want to map to

> Info  
> Every Matilda attribute has both an ID and a slug. You can use either one in this destination.  
> To find an attribute slug, go to the relevant object settings page, open the Attributes tab, find the attribute, click the ︙ menu, and select Copy slug.

> Note  
> By default, the User object includes only a small set of attributes. In most cases, you should create any custom User attributes you need in Matilda before sending Identify calls.

## Group: create or update workspaces and companies

Use Group calls to create or update a Workspace record in Matilda.

This mapping uses two keys:

- `domain` (required)
- `groupId` or `workspaceId` (optional secondary key)

When a Group call includes a domain, Matilda will:

- create or update the Workspace/Company record using domain as the primary unique key
- if `groupId` or `workspaceId` is present, use it as a secondary key for better matching
- link or update the related company/workspace record

If no domain is included, Matilda ignores workspace/company create or update for that Group event.

By default, this mapping runs on Group events.

### Understanding Workspaces and Companies

In Matilda:

- a Company represents a real company
- a Workspace represents a workspace, tenant, account, or group inside your product

A Company can be related to multiple Workspaces, and a Workspace can be associated with the Company that it belongs to.

### Required and optional fields

This mapping assumes your Group call includes:

- a required domain, used to match or create the company/workspace record
- an optional id (`groupId` or `workspaceId`) used as a secondary unique key

### Additional attributes

You can also map extra event properties to Workspace or Company attributes.
For example, you might send fields like billing plan, workspace size, lifecycle stage, region, or account owner as additional attributes.

On the Edit Mapping page:

- the left column should contain values from your Segment event, or custom text
- the right column should contain the Matilda attribute slug or ID you want to map to

> Info  
> Every Matilda attribute has both an ID and a slug. You can use either one in this destination.  
> To find an attribute slug, go to the relevant object settings page, open the Attributes tab, find the attribute, click the ︙ menu, and select Copy slug.

> Note  
> By default, the Workspace object includes only a limited set of attributes. You will usually want to create your own custom Workspace attributes in Matilda before sending Group calls.

## Track support

The destination accepts Track calls and can map attributes for downstream activity and enrichment flows.
Use Identify and Group as the primary create/update flows for user/person and workspace/company entities.

## Data model summary

Matilda separates real-world entities from product-specific entities:

- People and Companies represent real people and real companies
- Users and Workspaces represent those entities inside your product or connected SaaS apps

Because of this model:

- one Person can be linked to many Users
- one Company can be linked to many Workspaces
- users and workspaces can carry product-specific attributes
- people and companies can act as the shared real-world records behind them

This structure makes it easier to unify customer data across products, workspaces, and accounts.
