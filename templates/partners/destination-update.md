# 💥 Segment Partner Source Documentation Template

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

---

## Template begins here...

---

## title: <integration_name> Destination

> (delete after reading) This template is meant for Actions-based destinations that represent a new version of an existing, or Classic Segment destination. For new Actions-based destinations, see destination-new-template.md template.

> (delete after reading) In the section above, edit the `title` field. For example, Slack (Actions) Destination.

{% include content/plan-grid.md name="actions" %}

> (delete after reading) Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

[<integration_name>](https://yourintegration.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides self-serve predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations.

> (delete after reading) Update your company name and support email address.

This destination is maintained by <integration_name>. For any issues with the destination, [contact their Support team](mailto:support@<integration_name>.com).

> (delete after reading) In the section below, add your destination name where indicated. If you have a classic version of the destination, ensure that its documentation is linked as well. If you don't have a classic version of the destination, remove the second and third sentences.

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) <destination_name> Segment destination. There's also a page about the [non-Actions <destination_name> destination](/docs/connections/destinations/catalog/<destination_name>/). Both of these destinations receives data from Segment.

> (delete after reading) This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component.

{% include content/ajs-upgrade.md %}

> (delete after reading) In the section below, explain the value of this actions-based destination over the classic version, if applicable. If you don't have a classic version of the destination, remove this section.

## Benefits of <destination_name> (Actions) vs <destination_name> Classic

<destination_name> (Actions) provides the following benefits over the classic <destination_name> destination:

- **Main point 1**. One or two sentences that back up the main point.
- **Main point 2**. One or two sentences that back up the main point.

> (delete after reading) The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure <desintation_name>**.
4. Select an existing Source to connect to <destination_name> (Actions).

> (delete after reading) The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions.

{% include components/actions-fields.html %}


> (delete after reading) Additional Context
>
> Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.



## Migration from the classic <destination_name> destination

> (delete after reading) If applicable, add information regarding the migration from a classic destination to an Actions-based version below.

---

> (delete after reading) Congratulations! 🎉 You’ve finished the documentation for your Segment integration. If there’s any additional information or nuance which did not fit in the above template and that you want to share with our mutual customers, feel free to include these as a separate section for us to review. If not, you may now submit this doc to our team.
