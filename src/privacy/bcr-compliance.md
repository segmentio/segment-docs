---
title: Twilio's Binding Corporate Rules (BCRs)
---

In response to the passage of the General Data Protection Regulation (GDPR) policy in the European Union, Twilio implemented a set of [Binding Corporate Rules (BCRs)](https://www.twilio.com/legal/binding-corporate-rules) that inform how Segment stores and processes personal data. To be in alignment with Twilio's BCRs, Segment introduced a new data deletion process that allows customers to remove all of their workspace data within 30 days of deleting their workspace. 

## What are Binding Corporate Rules?

[Binding Corporate Rules (BCRs)](https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/binding-corporate-rules-bcr_en) are enforceable, legally binding codes of conduct that explain the ways companies store and process personal data. These codes contain information about data protection principles, tools used to protect the security of your data, and a method of accountability, or some way that proves the BCRs are externally (outside of the company) and internally (inside of the company) binding.  BCRs are often specific to the storage and transfer (Controller) or processing (Processor) of personal data. 

Twilio has two sets of BCRs: a [Controller policy](https://www.twilio.com/legal/bcr/controller) and a [Processor policy](https://www.twilio.com/legal/bcr/processor). Segment, as a processor of individual data, complies with the Processor policy.

### Where can I learn more about Twilio's Binding Corporate Rules?
 
You can learn more about Twilio's Binding Corporate Rules (BCRs) by reading the [latest version of the BCRs](https://www.twilio.com/legal/bcr) or by reaching out to privacy@twilio.com.

### What do Twilio's Binding Corporate Rules mean for my data?

Twilio's BCRs inform the way your user data must be stored and processed. While the ways Segment processes and stores user data are already in compliance with Twilio BCRs, [additional data deletion methods](#how-can-i-delete-data-from-my-workspace) were added to comply with the ["Storage limitation"](https://www.twilio.com/legal/bcr/processor#part-ii-our-obligations) section of the Processor policy. These new data deletion methods allow you to delete the data associated with [individual users](#deleting-individual-user-data), [sources](#deleting-data-from-a-source), and your [workspace](#deleting-your-workspace-data). 

## How can I delete data from my workspace?

You can choose to delete the data from an individual user, from an entire source, or from your entire workspace. 

### Deleting individual user data
To delete the data for an individual user from you workspace, follow the instructions on the [User Deletion and Suppression](/docs/privacy/user-deletion-and-suppression) page.

### Deleting data from a source
To delete the data for an entire source, send a request to the the Customer Success team by emailing [friends@segment.com](mailto:friends@segment.com) with your workplace slug, the source you'd like to delete data from, and the time frame for the data you'd like to delete. 

> note "Deleting source data"
> When Segment deletes your data for a particular source, the deletion is not forwarded to sources or data storage providers associated with your account. To remove your data from external sources, reach out to the individual source about their deletion practices. 

### Deleting your workspace data

To delete all data from your workspace, including customer data:

1. Open the Segment app, and select **Settings.**
2. On the General Settings page, click the **Delete Workspace** button. 
3. Follow the prompts on the pop-up to delete your workspace. 

After you delete your workspace, Segment removes all data associated with your workspace within 30 days in a process called a [complete data purge](#what-is-a-complete-data-purge). For a data purge status update, create a support ticket with the Customer Success team by emailing [friends@segment.com](mailto:friends@segment.com).

> warning "Purging data from workspaces deleted prior to March 31, 2022"
> If you deleted your workspace prior to March 31, 2022, and would like to have data associated with your workspace purged from Segment servers, raise a support ticket with the Customer Success team by emailing [friends@segment.com](mailto:friends@segment.com). In your email to Customer Success, include either the slug or the ID of the workspace you'd like to have purged from Segment servers. 

If you do not delete your data after you stop using Segment, it remains in Segment's internal servers until you submit a written request that your data be deleted. 

### What is a complete data purge?

A complete data purge is the mechanism Segment uses to completely remove all workspace and customer data from internal Segment servers. To trigger a complete data purge, either [delete your workspace](#how-can-i-delete-data-from-my-workspace) or raise a support ticket with the Customer Success team [friends@segment.com](mailto:friends@segment.com) that contains either the workplace slug or the workspace ID of the workspace that you'd like to delete.
