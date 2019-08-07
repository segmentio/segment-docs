{% assign name = page.path | replace: "connections", "catalog" | remove: "/index.md" %}
<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign destination_from_api = site.data.catalog.destinations.destinations | where: "name", name | first %}
{% assign components_from_api = {{destination_from_api}}.components %}



<h1>{{ destination_from_api }}</h1>
<h1> {{ destination_from_api.display_name }}

<br>

{% for component in components_from_api %}
{{ component }} <br>
{% endfor %}</h1>

<!--
components -> how do we send data
platforms -> what data do we recognize-->

{% for components in components_from_api %}
  {% if components_from_api.type == "IOS" or components_from_api.type == "ANDROID" %}
    {% assign has-mobile = true %}
    {% assign device-mobile = true %}
  {% endif %}
  {% if components_from_api.type == "WEB" %}
    {% assign has-browser = true %}
    {% assign device-web = true %}
  {% endif %}
  {% if components_from_api.type == "CLOUD" %}
    {% assign has-server = true %}
    {% assign device-server = true %}
  {% endif %}
{% endfor %}

<!-- `cloud-web` is complicated -->
{% if has-browser == true and destination_from_api.browserUnbundlingSupported == true && destination_from_api.browserUnbundlingPublic == true %}
  {% assign cloud-web = true %}
{% elsif has-server == true and has-browser == false and destination_from_api.platforms.browser == true %}
  {% assign cloud-web = true %}
{% else %}
  {% assign cloud-web = false %}
{% endif %}

<!-- cloud-mobile only checks for server? -->
{% if has-server == true %}
{% assign cloud-mobile = true %}
{% endif %}

<!-- cloud-server is also complicated -->
{% if has-server == true and destination_from_api.platforms.server == true %}
{% assign cloud-mobile = true %}
{% endif %}

The first step is to make sure {{ destination_from_api.display_name }} supports the source type and connection mode you've chosen to implement. You can learn more about what dictates [the connection modes we support here](https://segment.com/docs/destinations/#connection-modes).

<table>
  <tr>
    <th></th>
    <th>Web</th>
    <th>Mobile</th>
    <th>Server</th>
  </tr>
  <tr>
    <td>📱 Device-based</td>
    <td>{% if device-web == true %} ✅ {% endif %}</td>
    <td>{% if device-mobile == true %} ✅ {% endif %}</td>
    <td>{% if device-server == true %} ✅ {% endif %}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-based</td>
    <td>{% if cloud-web == true %} ✅ {% endif %}</td>
    <td>{% if cloud-mobile == true %} ✅ {% endif %}</td>
    <td>{% if cloud-server == true %} ✅ {% endif %}</td>
  </tr>
</table>
