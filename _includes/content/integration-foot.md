<hr/>

<!-- if it uses Identify calls and is available on Server, you can use personas?  -->
{% if destination.methods.identify == true and destination.platforms.server == true %}
{% include content/personas.md %}
{% endif }


{% if destination.components %}

## Supported Sources and Connection Modes

{% include content/connection-modes.md %}

To learn more about about Connection Modes and what dictates which we support, [see here](https://segment.com/docs/destinations/#connection-modes).

{% endif %}

{% if destination.browserUnbundlingSupported == true and destination.browserUnbundlingPublic == true %}
We offer an optional **Cloud-based** Connection Mode for **Web** data with {{ destination.name }}. As a reminder, this removes the {{ destination.name }} javascript library from your site, improving performance.
{% if destination.browserUnbundlingChangelog %} However, there are a few disparities between the Cloud-based and Device-based connection modes to keep in mind before enabling it in the Segment app. When you enable the **Cloud-based** destination mode, here's what happens:

<!-- holy crap lets NOT expose the changelog wtf has anyone looked at that content-->
{% endif %}
{% endif %}

{% if destination.platforms.mobile == true and destination.platforms.server == true %}}
Segment offers an *optional* **Device-based** Connection Mode for **Mobile** data with {{ destination.name }}. If you'd like to use those features that require client-based functionality, follow the steps above to ensure you have packaged the {{ destination.name }} SDK with Segment's.
{% else %}
This destination *requires* a **Device-based** Connection Mode for **Mobile** data. Follow the steps above to ensure you have packaged the {{ destination.name }} SDK with Segment's.
{% endif %}

## Settings

Segment lets you change these destination settings via your Segment dashboard without having to touch any code.

<!-- I'm not sure how to handle the `each` here  -->
{% for options in destination %}
{% if destination.option.hidden == false and destination.option.label != "Unused" %}
### {{ destination.option.label }}
{{ destination.option.description }}
{% endif %}
{% endfor %}
