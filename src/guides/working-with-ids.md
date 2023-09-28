---
title: Working with Identifiers
hidden: true
---

> info "Critical Segment recommendation"
> Segment recommends that you use `uuid4` for `anonymousId`.

As part of your Segment implementation, you’ll come across various identifiers (IDs) that Segment’s systems may process. The three most prominent identifiers you’ll encounter are `anonymousId`, `userId`, and `groupId`. 

This guide explains the most common Segment IDs, why Segment recommends formats like `uuidv4`, and other ID mechanics.

## Understanding the standard identifiers

This section explains the purpose of the three primary IDs and introduces the other two categories that may come into play as you expand your CDP implementation.

### Purpose

A critical component of the Segment CDP is to identify the user through time. To do this, Segment’s default implementations use two identifiers, `anonymousID` and `userID`. 

The following table describes the purposes of these two IDs, as well as `groupId`:

| Identifier    | Purpose                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `anonymousId` | `anonymousId` tracks user activity in CDPs and beyond. It lets you attach an identifier to an anonymous user and helps you ensure that all data is captured before Segment identifies the user through a `userId`. |
| `userId`      | `userId` comes into play once Segment has identified a user, which usually occurs through a form of authentication, like a login.                      |
| `groupId`     | `groupId` lets you capture B2B relationships between individual users and groups they may represent, serving as an identifier for these groups.                                                                    |

### Identifier generation

Here's how Segment generates the IDs you just learned about:

#### `anonymousId` generation 

`anonymousId` generation relates to the two types of libraries (or SDKs) that CDPs offer. Client-side libraries, like web and mobile, automatically generate a [universally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier){:target="_blank"} (UUID), whereas server-side libraries, like .NET, Node.js, and Java, make you generate these IDs yourself. As a result, you have the option to set the `anonymousId` manually in client-side libraries/SDKs.

#### `userId` generation

`userId` is a canonical identifier that you generate on your side, no matter what library or SDK you're using. Because `userId` is woven into your service or product delivery, it has the highest fidelity.

#### `groupId` generation

`groupId` generation is identical to `userId` generation. You generate `groupId` and maintain it off-platform in your customer database.

## Segment's guidance on identifier formats

As you work with identifiers, **Segment recommends that you use `uuidv4` for `anonymousId`**. The following table lists the criteria that Segment recommends your identifiers satisfy, as well as why Segment recommends `uuidv4`:

| Trait                  | Reasoning                                                                                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Global uniqueness      | `uuidv4` generates statistically unique identifiers without needing a central authority or coordination between systems. This is ideal for distributed systems.                                                                         |
| Non-sequential         | Unlike incremental integer IDs, `uuidv4` generates non-sequential IDs. This offers a security advantage, as it makes it harder for malicious users to guess other valid IDs.                                                            |
| No information leakage | `uuidv4` doesn't reveal information about the data its associated with, unlike other ID generation strategies that may encode information about the data, time creation, or, even worse, personal data on the individual it identifies. |
| Standardized           | UUIDs are standardized, which means they are widely recognized and suported across various platforms and languages.                                                                                                                     |
| No collision           | The likelihood of collision, or the generation of two identical UUIDs, is infinitesimally small, even after generation of billions of UUIDs.                                                                                            |
| Easy generation        | You can generate `uuidv4` easily, and it has many deployments across virtually all programming languages.                                                                                                                               |

### Persistence and resetting

This section explains the persistence of client-side and server-side identifiers.

#### Client-side persistence

Most client-side libraries and SDKs write used identifiers into some form of memory, like cookies and `localStorage` on the web or in-memory databases on mobile devices. 

This simplifies persistence and, in most cases, allows libraries and SDKs to fetch IDs automatically from memory, so that you don't have to send all IDs deliberately. Because users may change, though, CDPs offer the functionality to reset these IDs. For Segment, the corresponding method is `analytics.reset()`.

#### Server-side persistence

Servers don't have this kind of memory readily available. Because of this, you'd need to deploy ID persistence as a custom component on your infrastructure. 

Segment finds that this is rarely necessary, however, as most servers only process data on known users instead of anonymous users. As a result, servers will already have access to a `userId`. Because there is no ID persistence in requests to your CDP, you won't need to worry about resetting.

## Going beyond the default

While this guide focused on `anonymousId`, `userId`, and `groupId`, other identifiers also exist, like IDFA, system IDs, and so on. Such identifiers vary in their origin, importance, and persistence. Often, these identifiers are system-generated and, as a result, don't require conscious design decisions as you implement your CDP.

Segment recommends applying the formatting criteria discussed on this page to, at a minimum, `anonymousId`, `userId`, and `groupId`. Segment also recommends that you use these criteria for other identifiers you may work with, even beyond Segment's standard IDs.