---
title: Analytics Overview
layout: engage
engage: true
---

Twilio Engage provides you with analytics that give you insight into the performance of your [email and SMS campaigns](/docs/engage/campaigns/).

On this page, you'll learn how Engage calculates campaign analytics and which specific messaging events you can view.

## How Engage measures campaign analytics

Understanding when and how Engage measures campaign analytics will help you as you review your analytics reports.

Engage begins tracking campaign performance after you send a campaign. As a result, a campaign's analytics only reflect conversions that occurred after campaign publication. For example, suppose you send an email campaign promoting a sale in your online store. If a customer purchases a qualifying product **before** receiving your campaign, their purchase would not count as a conversion.

Campaign engagement metrics are based only on delivered campaigns. Suppose, for example, you send an email campaign to 20 email addresses but only 10 successfully deliver. Engagement metrics like opens, clicks, and conversions would display as a percentage of the 10 delivered campaigns. In this case, then, if five users opened your campaign, you'd see a 50% total opened rate in the campaign's analytics.

## Access a campaign's analytics

You'll find a campaign's analytics within its parent Journey, using the following instructions:

1. Within your Personas space, select the **Journeys** tab.
2. From the Journeys table, select the Journey you want to view.
3. From the Journey overview, select the email or SMS campaign you want to view.
4. A modal pane appears that displays your campaign's analytics.

## Email messaging events

The following table lists the email campaign events that Engage tracks:

| Event          | Description                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------- |
| Sent           | The number of emails campaigns that you sent.                                               |
| Delivered      | The number of emails campaigns that were accepted by the receiving inbox server.            |
| Bounced        | The number of email campaigns that bounced instead of being delivered.                      |
| Total Opened   | The number of times that your email campaigns were opened.                                  |
| Total Clicked  | The number of times that recipients clicked within your email campaigns.                    |
| Unique Opened  | The number of unique recipients that opened your email campaigns.                           |
| Unique Clicked | The number of unique recipients that clicked your email campaign.                           |
| Unsubscribed   | The number of campaign recipients who chose to unsubscribe from within the email campaigns. |
| Spam Reported  | The number of recipients who marked your email as spam.                                     |
| Converted To   | The number of conversions that took place after campaign publication.                       |

SendGrid powers Engage's email campaign event analytics. For more details on email events, view SendGrid's [Marketing Campaigns Statistics Overview](https://docs.sendgrid.com/ui/analytics-and-reporting/marketing-campaigns-stats-overview){:target="_blank"}.


## SMS messaging events

The following table lists the SMS campaign events that Engage tracks:


| Event       | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| Sent        | The number of SMS campaigns that you sent.                            |
| Delivered   | The number of SMS campaigns that were accepted by the user's carrier. |
| Queued      | The number of SMS campaigns queued for delivery, but not yet sent.    |
| Undelivered | The number of undelivered SMS campaigns.                              |
| Failed      | The number of SMS campaigns that didn't send.                         |
