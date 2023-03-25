---
title: Journeys Analytics
redirect_from:
  - '/personas/journeys/journeys-analytics'
---

Segment maintains analytics for each Journey and its individual steps. As a result, you can view both granular and high-level performance metrics that give you insight into your Journeys.

## Journey-Level Analytics

Journeys Level Analytics is a collection of statistics that can help you assess how a Journey is performing.

Where individual messaging analytics give you focused insight into specific Journey events, Journey Level Analytics shows you a high-level overview of a Journey's effectiveness.

### Access a Journey's Analytics

Follow these steps to view the Analytics for a specific Journey:

1. In your Segment workspace, navigate to **Engage > Journeys**.
2. Select a Journey from the Journeys list.
3. The Analytics tiles display as part of the Journey's overview.

> info ""
> Journeys in draft status don’t display Analytics.

## Journey-Level Analytics statistics

The following table shows the statistics available for a Journey:

| Statistic   | Description                                                                   |
| ----------- | ----------------------------------------------------------------------------- |
| Entered     | The total number of users who entered your Journey                            |
| In progress | The total number of users who have entered the Journey without yet exiting it |
| Completed   | The total number of users who entered the Journey and reached any final step  |
| Exits       | The total number of users who have exited the Journey                         |

> info ""
> Completed and exits are mutually exclusive.

Use the date picker to view a Journey's analytics over a specific time frame in any 180 day period.

The following table shows descriptions of the time frames you can select:

| Time frame        | Description (based on UTC)                                 |
| ----------------- | ---------------------------------------------------------- |
| Today             | Today, beginning at midnight                               |
| Yesterday         | The day before today                                       |
| Last 7 days       | The past seven days, not including today                   |
| Last 30 days      | The past 30 days, not including today                      |
| Last 90 days      | The past 90 days, not including today                      |
| Last 180 days     | The past 180 days, not including today                     |
| Custom date range | The period between two dates, including the selected dates |

## Step-Level Analytics

Displayed with each step of your Journey, Step-Level Analytics shows you how many users made it to the step you’re viewing. You can use this data to gain context for how users flow through your Journey.

### Changing the calculation percentage

With Step-Level Analytics, you can configure two settings that give you granular insight into each step’s performance:  

- **Previous step** or **entry step**, which calculates the displayed percentage based on either the number of users in the entry step or the number of users in the previous step
- **Total** or **unique users**, which lets you change the displayed percentage to account for re-entry

#### Previous step or entry step

By default, Engage calculates an individual step’s analytics as a percentage of the number of users in the previous step. However, you can also view step analytics as a percentage of the initial number of users in the Journey’s entry step.  

For example, suppose your Journey’s entry step contained 100 users, and 50 proceeded to the next step. For both calculation options, Engage would display **50% and 50** for the next step. If 25 users from the second step reached step three, however, Engage would display **50% and 25** for previous-step based calculations but **25% and 25** for entry-step based calculations.

To change this base percentage, select **Calculate % based on**, then select **Entry step** or **Previous step**.

#### Total or unique users

If you’ve enabled re-entry for your Journey, you can also configure Step-Level Analytics to calculate the step’s percentage based on unique or total users. Selecting **Unique** generates a percentage based on unique users, while **Total** includes users who have re-entered the Journey.

For more information on re-entry settings in Journeys, view [Journey re-entry](/docs/engage/journeys/build-journey/#journey-re-entry).