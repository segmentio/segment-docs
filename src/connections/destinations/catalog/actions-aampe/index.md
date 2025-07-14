---
title: Aampe (Actions) Destination
id: 6874c64e5eda096bf3850ee0
private: true
beta: true
---

[Aampe](https://aampe.com/){:target="_blank”}'s Agentic AI learns what works for each customer. Then it instantly adapts your messaging and delivers at optimal times to drive better engagement, growth and unlock valuable insights. 

By assigning a dedicated agent for each user, Aampe conducts controlled, parallelized experiments to learn user preferences and optimizes engagement for them. It’s a dynamic, self-improving system that fine-tunes every interaction, ensuring your messaging evolves as fast as your audience does.

This destination is maintained by Aampe. For any issues with the destination, [contact the Aampe Support team](mailto:developer@aampe.com).

## Getting Started
1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Aampe (Actions)" in the Destinations Catalog, and select the **Aampe (Actions)** destination.
3. Choose which Source should send data to the Aampe destination.
4. Open Aampe Composer and navigate to the [Data Integrations page](https://compose.aampe.com/configure/integrations), click **Add Integration**, select Segment and click **Next**.
5. Copy the Segment API Key from Aampe Composer, then return to the Segment app.
6. On your Aampe destination's settings page, enter the API key that you copied from Aampe Composer.
7. Select the appropriate data region as per the privacy policy and click **Save**. 

## Supported methods

Aampe supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

Segment sends Track, Page, Screen calls to Aampe as an event. These are used by Aampe agents to learn preferences for your users and take action accordingly. 

Aampe also receives Identify calls and user property update calls from Segment which helps with high-level segmentation for eligible Aampe audiences.