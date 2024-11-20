# 💥 Segment Partner Actions Destination Documentation Template

> Hi Partners 👋🏼
>
> Welcome to Segment - glad to have you onboard! This doc serves as a guideline for your team to create best-in-class documentation alongside your amazing product.
>
> Here are the guidelines we want you to have in mind when writing out your documentation:
>
> - Be succinct and simple in your writing. Reduce text bloat where possible.
> - Avoid 1st person language as it’s confusing for customers if they don’t know who wrote the docs (Segment or the Partner).
> - Where pre-reading is required, hyperlink to other more generic parts of Segment’s (or your) documentation.
>
> - Screenshots/Images are generally discouraged unless absolutely necessary
>
> The below template intends to provide a standardized structure. To submit your documentation, complete the following steps:
>
> 1. Fork and clone the `segment-docs` repo locally
> 2. Create a new branch (e.g., partner-name/destination)
> 3. Create an `index.md` file in the following path `src/connections/destinations/catalog/{destination-slug}/index.md
> 4. Copy the template below into your `index.md` file, and edit it to be in line with how your integration operates
> 5. Add, commit, and push your code, then submit a pull request to the `segment-docs` repo
>
> If a section does not apply to your integration, feel free to remove. Please don’t create separate sections unless absolutely necessary. In most cases, creating a H3 (###) sub-heading under an existing section is the best option!
>
> If you have any questions in the meantime, please reach out to our team at partner-support@segment.com.

## Template begins here...

---
title: Drip (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[Drip](https://www.getdrip.com){:target="_blank”} is a nurture marketing platform Empowering B2C SMBs to convert long-sales cycle prospects into lifelong buyers with sophisticated and personalized marketing automation.

This destination is maintained by Drip. For any issues with the destination, [contact their Support team](mailto:support@drip.com).

> (delete after reading) The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination.

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Drip".
2. Select Drip and click **Add Destination**.
3. Select an existing Source to connect to Drip (Actions).
4. Go to the [Drip dashboard](https://www.getdrip.com/dashboard){:target="_blank"}
5. In the Settings tab, select the User Settings, find and copy the **API key** at the bottom of the page.
6. In a terminal, run `echo <your-api-key>: | base64` to encode the API key.
7. Enter the encoded **API Key** in the Drip destination settings in Segment.
8. Your account ID is a seven digit number that can be found in the address bar of your browser when you are logged into Drip. It is the number after `https://www.getdrip.com/`.
9. Enter the **Account ID** in the Drip destination settings in Segment.

{% include components/actions-fields.html %}

For more information about developing with Drip, check out their [documentation](https://developer.drip.com/){:target="_blank”}.
