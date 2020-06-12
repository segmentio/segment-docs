---
title: Callexa Destination
beta: true
---

> This destination is maintained by Wigzo.

Enhance your existing Segment configuration with Callexa to collect valuable Customer Feedback. Callexa enables you to conduct professional customer surveys using the well-established Net Promoter Score. Surveys can be customized through our WYSIWYG Editor, enriched with additional tag ratings and follow-up questions and regular statistical reports allow you to track development of your NPS. Turn good ratings into testimonials and embed them on your Website.

## Getting Started

- Register your free Starter account at: https://feedback.callexa.com
- Create and style your survey template
- Click the "Recipients" button and open the tab panel labeled "Segment"
- Copy the survey API key to your clipboard
- Head over to your Segment dashboard and enable the Callexa Destination using the API key
- To enable sync back capabilities copy back your "Write Key" (found unter Source Keys) to Callexa
- Back in Callexa enable the Automation and hit "Save"

That's it, new customer records added with the `identify` method will now automatically be surveyed using email.

## Identify

For a survey to take place, the following traits are used by Callexa whenever the `identify` method is invoked:
- `email` (mandatory)
- `createdAt` (recommended)
- `firstName` (optional)
- `lastName` (optional)
- `name` (optional, alternative to firstName / lastName)
- `gender` (optional)

## About Survey Delays

You might not want to send the survey immediately after the `identify` method has been invoked. There are two possible scenarios for setting the min and max delay in days:

- **Survey only new customers at least 3 days after their creation:**
Set the min delay to 3 and the max delay to 14 days. Now new customers will be surveyed 3 days after creation, existing customers on repeated `identify` calls will be ignored if older than 14 days.

- **Survey repeatedly, whenever the identify command is called:**
Set the maximum delay to 0. Now whenever `identify` is invoked, a survey will be sent to that customer unless it happens during the minimum interval set for the survey. To adjust that interval navigate to the edit panel of your survey. The default value is 26 weeks meaning a customer gets surveyed at most twice a year.
__Note:__ _This is the default behavior if the `createdAt` trait is not part of your customer records._

## Sync Back

In order to sync back ratings and comments, copy your "Write Key" into the survey's Segment panel. On a daily basis Callexa will invoke the `identify` method with the following additional traits added to the customer record:

- `NPS_rating` (integer value between 0 and 10)
- `NPS_comment` (text value, empty if the customer didn't answer the follow-up question)
- `NPS_date` (timestamp of the reply)

For repeated surveys, those traits will be overwritten with the most recent rating.

__If you have any questions feel free to contact Callexa at:__ [info@callexa.com](mailto:info@callexa.com?subject=Segment%20Integration)

---
_Net Promoter, Net Promoter Score, and NPS are trademarks of Satmetrix Systems, Inc., Bain & Company, Inc., and Fred Reichheld.
