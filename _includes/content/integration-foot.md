<hr/>
<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign name = page.path | replace: "connections", "catalog" | remove: "/index.md" %}
{% assign destination_from_api = site.data.catalog.destinations.destinations | where: "name", name | first %}
<!-- if it uses Identify calls and is available on Server, you can use personas?  -->
{% if destination_from_api.methods.identify == true and destination_from_api.platforms.server == true %}
{% include content/personas.md %}

{% endif %}


{% if destination_from_api.components %}

## Supported Sources and Connection Modes

{% include content/connection-modes.md %}

To learn more about about Connection Modes and what dictates which we support, [see here](https://segment.com/docs/destinations/#connection-modes).

{% endif %}

{% if destination_from_api.browserUnbundlingSupported == true and destination_from_api.browserUnbundlingPublic == true %}
We offer an optional **Cloud-based** Connection Mode for **Web** data with {{ destination_from_api.display_name }}. As a reminder, this removes the {{ destination.name }} javascript library from your site, improving performance.
<!-- holy crap lets NOT expose the changelog wtf has anyone looked at that content
{% if destination_from_api.browserUnbundlingChangelog %} However, there are a few disparities between the Cloud-based and Device-based connection modes to keep in mind before enabling it in the Segment app. When you enable the **Cloud-based** destination mode, here's what happens:

-->
{% endif %}
{% endif %}

{% if destination_from_api.platforms.mobile == true and destination.platforms.server == true %}}
Segment offers an *optional* **Device-based** Connection Mode for **Mobile** data with {{ destination_from_api.display_name }}. If you'd like to use those features that require client-based functionality, follow the steps above to ensure you have packaged the {{ destination_from_api.display_name }} SDK with Segment's.
{% else %}
This destination *requires* a **Device-based** Connection Mode for **Mobile** data. Follow the steps above to ensure you have packaged the {{ destination_from_api.display_name }} SDK with Segment's.
{% endif %}

## Settings

Segment lets you change these destination settings via your Segment dashboard without having to touch any code.

{% for item in destination_from_api.options %}
{% if item.hidden == false and item.label != "Unused" %}
### {{ item.label }}
{{ item.description }}
{% endif %}
{% endfor %}
