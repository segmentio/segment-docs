---
title: Aampe (Actions) Destination
---

[Aampe](https://aampe.com/)'s Agentic AI learns what works for each customer. Then it instantly adapts your messaging and delivers at optimal times to drive better engagement, growth and unlock valuable insights. 

By assigning a dedicated agent for each user, Aampe conducts controlled, parallelized experiments to learn user preferences and optimizes engagement for them. It’s a dynamic, self-improving system that fine-tunes every interaction, ensuring your messaging evolves as fast as your audience does.

This destination is maintained by Aampe. For any issues with the destination, [contact the Aampe Support team](mailto:developer@aampe.com).

## Getting Started


1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Aampe (Actions)" in the Destinations Catalog, and select the "Aampe (Actions)" destination.
3. Choose which Source should send data to the "Aampe" destination.
4. Go to the [Data Integrations page](https://compose.aampe.com/configure/integrations) on Aampe Composer, click on "Add Integration", select "Segment" and click "Next".
5. Copy the Segment API Key from the resulting page.
6. Enter this key in "API Key" in the "Aampe" destination settings in Segment.
7. Enter the appropriate data region as per the privacy policy.

## Supported methods

Aampe supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

Segment sends Track, Page, Screen calls to Aampe as an event. These are used by Aampe agents to learn preferences for your users and take the best action 

Aampe also recevies identify calls and user property update calls from Segment which help in high-level segmentation for eligible audiences