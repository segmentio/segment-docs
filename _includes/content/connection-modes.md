<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign name = page.path | replace: "connections", "catalog" | remove: "/index.md" %}
{% assign destination_from_api = site.data.catalog.destinations.destinations | where: "name", name | first %}
<!--
components -> how do we send data
platforms -> what data do we recognize-->

{% for item in destination_from_api.components %}
  {% if item.type == "IOS" or item.type == "ANDROID" %}
    {% assign has_mobile = true %}
    {% assign device_mobile = true %}
  {% endif %}
  {% if item.type == "WEB" %}
    {% assign has_browser = true %}
    {% assign device_web = true %}
  {% endif %}
  {% if item.type == "SERVER" %}
    {% assign has_server = true %}
  {% endif %}
{% endfor %}

{% if destination_from_api.direct == true or destination_from_api.platforms.server == true %}
  {% assign has_server = true %}
{% endif %}

<!-- `cloud_web` is complicated -->
{% if has_browser == true and destination_from_api.browserUnbundlingSupported == true && destination_from_api.browserUnbundlingPublic == true %}
  {% assign cloud_web = true %}
{% elsif has_server == true and has_browser == false and destination_from_api.platforms.browser == true %}
  {% assign cloud_web = true %}
{% else %}
  {% assign cloud_web = false %}
{% endif %}

<!-- cloud_mobile only checks for server? -->
{% if has_server == true %}
{% assign cloud_mobile = true %}
{% endif %}

<!-- cloud_server is also complicated -->
{% if has_server == true and destination_from_api.platforms.server == true %}
{% assign cloud_server = true %}
{% endif %}

The first step is to make sure {{ destination_from_api.display_name }} supports the source type and connection mode you've chosen to implement. You can learn more about what dictates [the connection modes we support here](https://segment.com/docs/destinations/#connection-modes).

//cloud_server and device_server are reversed?

<table>
  <tr>
    <th></th>
    <th>Web</th>
    <th>Mobile</th>
    <th>Server</th>
  </tr>
  <tr>
    <td>📱 Device-based</td>
    <td>{% if device_web == true %} ✅ {% endif %}</td>
    <td>{% if device_mobile == true %} ✅ {% endif %}</td>
    <td>{% if device_server == true %} ✅ {% endif %}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-based</td>
    <td>{% if cloud_web == true %} ✅ {% endif %}</td>
    <td>{% if cloud_mobile == true %} ✅ {% endif %}</td>
    <td>{% if cloud_server == true %} ✅ {% endif %}</td>
  </tr>
</table>
