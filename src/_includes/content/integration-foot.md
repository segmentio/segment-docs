<hr/>
<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign currentSlug = page.url | split: "/" | last %}
{% assign currentIntegration = site.data.catalog.destinations.items | where: "slug", currentSlug | first %}

{% if currentIntegration.platforms.server == true %}
{% unless page.hide-personas-parital%}
{% include content/personas.md %}
{% endunless %}

{% endif %}


{% if currentIntegration.components.size > 0 %}

## Supported Sources and Connection Modes

{% include content/connection-modes.md %}

To learn more about about Connection Modes and what dictates which we support, [see here](https://segment.com/docs/destinations/#connection-modes).

{% endif %}

{% if currentIntegration.browserUnbundlingSupported == true and currentIntegration.browserUnbundlingPublic == true %}
We offer an optional **Cloud-based** Connection Mode for **Web** data with {{ currentIntegration.display_name }}. As a reminder, this removes the {{ currentIntegration.display_name }} javascript library from your site, improving performance.
{% endif %}

{% if currentIntegration.platforms.mobile == true and destination.platforms.server == true %}}
Segment offers an *optional* **Device-based** Connection Mode for **Mobile** data with {{ currentIntegration.display_name }}. If you'd like to use those features that require client-based functionality, follow the steps above to ensure you have packaged the {{ currentIntegration.display_name }} SDK with Segment's.
{% else %}
This destination *requires* a **Device-based** Connection Mode for **Mobile** data. Follow the steps above to ensure you have packaged the {{ currentIntegration.display_name }} SDK with Segment's.
{% endif %}

## Settings

Segment lets you change these destination settings from your Segment dashboard without having to touch any code.

{% for item in currentIntegration.settings %}
  {% unless item.deprecated == true %}
### {{ item.display_name }}

{{ item.description }}

  {% endunless %}
{% endfor %}

{% assign oldname = currentIntegration.slug | capitalize %}
{% if currentIntegration.display_name != oldname %}

## Adding {{ currentIntegration.display_name }} to the integrations object

To add {{ currentIntegration.display_name }} to the `integrations` JSON object (for example, <a href="https://segment.com/docs/guides/general/filtering-data/#filtering-with-the-integrations-object">to filter data from a specific source</a>), use one of the {{ currentIntegration.previousNames.length }} valid names for this integration:
{% for name in currentIntegration.previousNames %}
        <li><code>{{name}}</code></li>
    {% endfor %}
{% endif %}
