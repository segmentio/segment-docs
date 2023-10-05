title: [integration_name] Destination
(delete after reading) This template is meant for Actions-based destinations that do not have an existing Classic or non-Actions-based version. For Actions Destinations that are a new version of a classic destination, see the doc-template-update.md template.

(delete after reading) In the section above, edit the title field. For example, Slack (Actions) Destination

{% include content/plan-grid.md name="actions" %}

(delete after reading) Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

<integration_name> provides self-serve predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations.

(delete after reading) Update your company name and support email address.

This destination is maintained by <integration_name>. For any issues with the destination, contact their Support team.

(delete after reading) This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component.

{% include content/ajs-upgrade.md %}

(delete after reading) The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination.

Getting started
From the Segment web app, click Catalog, then click Destinations.
Find the Destinations Actions item in the left navigation, and click it.
Click Configure <desintation_name>.
Select an existing Source to connect to <destination_name> (Actions).
(delete after reading) The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions.

{% include components/actions-fields.html %}

(delete after reading) Additional Context

Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.

(delete after reading) Congratulations! 🎉 You’ve finished the documentation for your Segment integration. If there’s any additional information or nuance which did not fit in the above template and that you want to share with our mutual customers, feel free to include these as a separate section for us to review. If not, you may now submit this doc to our team.
