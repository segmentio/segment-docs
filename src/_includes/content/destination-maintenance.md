{% capture name %}{{page.title | replace: 'Destination', ''}}{% endcapture %}
{% capture link %}/docs/connections/destinations/catalog/actions-{{name | slugify}}{% endcapture %}
{% if page.maintenance-content %}
{% capture blurb %}{{page.maintenance-content}} {% endcapture %}
{% else %}
{% capture blurb %}A new version of this destination is available. See [{{name}} (Actions)]({{link}}) {% endcapture %}
{% endif %}

<div class="premonition warning"><div class="fa fa-check-square"></div><div class="content"><p class="header">{{page.title | replace: 'Destination', ''}} (Classic) is in Maintenance mode</p>
<p markdown=1>The {{name}} (Classic) Destination has entered maintenance mode. Future updates are limited to security updates and bug fixes. {{blurb}}</p>
</div></div>