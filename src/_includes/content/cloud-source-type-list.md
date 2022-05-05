
{% assign type = include.type %}
{% if type == "event" %}
{% assign source-list = site.data.catalog.sources.items | where: "isCloudEventSource", "true" %}
{% elsif type == "object" %}
{% assign source-list = site.data.catalog.sources.items | where: "source_type", "cloud-app" | where: "hidden", "false" | where: "isCloudEventSource", "false" %}

{% endif %}



{% for source in source-list %}
- [{{source.display_name}}](/docs/{{source.url}})
{% endfor %}