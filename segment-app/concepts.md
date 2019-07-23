---
title: Concepts
---

## Team Member

Team Members are indiviudals with access to Segment.
They can have access to one or more workspaces, and authenticate either with email/password or Single Sign On.
A Personal Access Token is used to access our Config API.

## Roles

A role is used to give an account access to resources within a workspace.

## Workspace

A Workspace holds your entire Segment configuration, including sources, destinations, warehouses, and so on.

## Resource Types

Resource types are the building blocks of Segment:

- Workspaces
- Sources
- Destinations (Streaming Destinations)
- Warehouses
- Audiences
- Traits
- Tracking Plans

Members can be granted `owner` access to a resource type either globally (for example `owner` access to all warehouses), or to specific instances of a resource (for example only `owner` access to `Redshift`)

## Resource Instances

Your Workspace is a resource instance, as well as everything in it (like your sources `iOS Prod` and `Android Prod`).
We’ve designed access management around these resource types, and you can grant roles to all or instances of each.
